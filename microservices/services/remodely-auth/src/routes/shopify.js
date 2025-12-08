/**
 * Shopify OAuth Routes
 * Handles multi-store Shopify OAuth flow for any user
 */

const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')
const logger = require('../utils/logger')
const { authenticateToken } = require('../middleware/auth')

const prisma = new PrismaClient()

// Shopify OAuth Configuration
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET
const SHOPIFY_SCOPES = 'read_products,write_products,read_inventory,write_inventory,read_orders'
const APP_URL = process.env.APP_URL || 'https://remodely-auth.onrender.com'

// Store pending OAuth states (in production, use Redis)
const pendingOAuthStates = new Map()

/**
 * Generate OAuth URL for a store
 * POST /api/shopify/oauth/authorize
 */
router.post('/oauth/authorize', authenticateToken, async (req, res) => {
  try {
    const { storeDomain } = req.body
    const userId = req.user.userId

    if (!storeDomain) {
      return res.status(400).json({
        success: false,
        message: 'Store domain is required'
      })
    }

    // Normalize domain
    const normalizedDomain = storeDomain.includes('.myshopify.com')
      ? storeDomain
      : `${storeDomain}.myshopify.com`

    // Generate state for CSRF protection
    const state = crypto.randomBytes(16).toString('hex')

    // Store state with user info (expires in 10 minutes)
    pendingOAuthStates.set(state, {
      userId,
      storeDomain: normalizedDomain,
      createdAt: Date.now()
    })

    // Clean up old states
    setTimeout(() => pendingOAuthStates.delete(state), 10 * 60 * 1000)

    // Build OAuth URL
    const redirectUri = `${APP_URL}/api/shopify/callback`
    const authUrl = `https://${normalizedDomain}/admin/oauth/authorize?` +
      `client_id=${SHOPIFY_API_KEY}&` +
      `scope=${SHOPIFY_SCOPES}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `state=${state}`

    logger.info('Generated Shopify OAuth URL', { userId, storeDomain: normalizedDomain })

    res.json({
      success: true,
      url: authUrl,
      state
    })
  } catch (error) {
    logger.error('Error generating OAuth URL:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to generate authorization URL'
    })
  }
})

/**
 * OAuth Callback - Shopify redirects here after authorization
 * GET /api/shopify/callback
 */
router.get('/callback', async (req, res) => {
  try {
    const { code, state, shop, hmac } = req.query

    logger.info('Shopify OAuth callback received', { shop, state: state?.substring(0, 8) })

    // Validate state
    const pendingAuth = pendingOAuthStates.get(state)
    if (!pendingAuth) {
      logger.error('Invalid or expired OAuth state')
      return res.redirect('remodely://shopify-callback?error=invalid_state')
    }

    // Verify HMAC if provided
    if (hmac && SHOPIFY_API_SECRET) {
      const message = Object.keys(req.query)
        .filter(key => key !== 'hmac')
        .sort()
        .map(key => `${key}=${req.query[key]}`)
        .join('&')

      const generatedHmac = crypto
        .createHmac('sha256', SHOPIFY_API_SECRET)
        .update(message)
        .digest('hex')

      if (hmac !== generatedHmac) {
        logger.error('HMAC validation failed')
        return res.redirect('remodely://shopify-callback?error=invalid_hmac')
      }
    }

    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code
      })
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      logger.error('Token exchange failed:', errorText)
      return res.redirect('remodely://shopify-callback?error=token_exchange_failed')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const scope = tokenData.scope

    // Get shop info
    const shopResponse = await fetch(`https://${shop}/admin/api/2024-01/shop.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken }
    })

    let shopInfo = { name: shop.replace('.myshopify.com', '') }
    if (shopResponse.ok) {
      const shopData = await shopResponse.json()
      shopInfo = shopData.shop
    }

    // Get product count
    const productCountResponse = await fetch(`https://${shop}/admin/api/2024-01/products/count.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken }
    })
    let productCount = 0
    if (productCountResponse.ok) {
      const countData = await productCountResponse.json()
      productCount = countData.count
    }

    // Save or update store connection
    const existingStore = await prisma.shopifyStore.findUnique({
      where: { storeDomain: shop }
    })

    if (existingStore) {
      // Update existing connection
      await prisma.shopifyStore.update({
        where: { storeDomain: shop },
        data: {
          userId: pendingAuth.userId,
          accessToken,
          scope,
          storeName: shopInfo.name,
          productCount,
          currency: shopInfo.currency || 'USD',
          isActive: true,
          connectedAt: new Date(),
          lastSyncAt: new Date()
        }
      })
    } else {
      // Create new connection
      await prisma.shopifyStore.create({
        data: {
          userId: pendingAuth.userId,
          storeDomain: shop,
          storeName: shopInfo.name,
          accessToken,
          scope,
          productCount,
          currency: shopInfo.currency || 'USD',
          isActive: true
        }
      })
    }

    // Clean up state
    pendingOAuthStates.delete(state)

    logger.info('Shopify store connected successfully', {
      userId: pendingAuth.userId,
      shop,
      productCount
    })

    // Redirect back to app
    res.redirect(`remodely://shopify-callback?success=true&shop=${encodeURIComponent(shop)}`)
  } catch (error) {
    logger.error('Shopify callback error:', error)
    res.redirect('remodely://shopify-callback?error=server_error')
  }
})

/**
 * Exchange auth code for token (alternative endpoint for mobile)
 * POST /api/shopify/oauth/token
 */
router.post('/oauth/token', authenticateToken, async (req, res) => {
  try {
    const { code, shop, state } = req.body
    const userId = req.user.userId

    if (!code || !shop) {
      return res.status(400).json({
        success: false,
        message: 'Code and shop are required'
      })
    }

    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code
      })
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      logger.error('Token exchange failed:', errorText)
      return res.status(400).json({
        success: false,
        message: 'Failed to exchange authorization code'
      })
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const scope = tokenData.scope

    // Get shop info
    const shopResponse = await fetch(`https://${shop}/admin/api/2024-01/shop.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken }
    })

    let shopInfo = { name: shop.replace('.myshopify.com', '') }
    if (shopResponse.ok) {
      const shopData = await shopResponse.json()
      shopInfo = shopData.shop
    }

    // Get product count
    const productCountResponse = await fetch(`https://${shop}/admin/api/2024-01/products/count.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken }
    })
    let productCount = 0
    if (productCountResponse.ok) {
      const countData = await productCountResponse.json()
      productCount = countData.count
    }

    // Save store connection
    const store = await prisma.shopifyStore.upsert({
      where: { storeDomain: shop },
      update: {
        userId,
        accessToken,
        scope,
        storeName: shopInfo.name,
        productCount,
        currency: shopInfo.currency || 'USD',
        isActive: true,
        connectedAt: new Date(),
        lastSyncAt: new Date()
      },
      create: {
        userId,
        storeDomain: shop,
        storeName: shopInfo.name,
        accessToken,
        scope,
        productCount,
        currency: shopInfo.currency || 'USD'
      }
    })

    logger.info('Shopify store connected via token exchange', { userId, shop })

    res.json({
      success: true,
      store: {
        id: store.id,
        domain: store.storeDomain,
        name: store.storeName,
        productCount: store.productCount,
        currency: store.currency,
        connectedAt: store.connectedAt
      }
    })
  } catch (error) {
    logger.error('Token exchange error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to complete authorization'
    })
  }
})

/**
 * Get connected stores for current user
 * GET /api/shopify/stores
 */
router.get('/stores', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    const stores = await prisma.shopifyStore.findMany({
      where: { userId, isActive: true },
      select: {
        id: true,
        storeDomain: true,
        storeName: true,
        productCount: true,
        orderCount: true,
        currency: true,
        connectedAt: true,
        lastSyncAt: true
      }
    })

    res.json({
      success: true,
      stores: stores.map(store => ({
        id: store.id,
        domain: store.storeDomain,
        name: store.storeName,
        productCount: store.productCount,
        orderCount: store.orderCount,
        currency: store.currency,
        connectedAt: store.connectedAt,
        lastSyncAt: store.lastSyncAt
      }))
    })
  } catch (error) {
    logger.error('Error fetching stores:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch connected stores'
    })
  }
})

/**
 * Get connection status
 * GET /api/shopify/status
 */
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    const store = await prisma.shopifyStore.findFirst({
      where: { userId, isActive: true },
      orderBy: { connectedAt: 'desc' }
    })

    if (!store) {
      return res.json({
        success: true,
        connected: false
      })
    }

    res.json({
      success: true,
      connected: true,
      store: {
        id: store.id,
        domain: store.storeDomain,
        name: store.storeName,
        productCount: store.productCount,
        orderCount: store.orderCount,
        currency: store.currency,
        connectedAt: store.connectedAt,
        lastSyncAt: store.lastSyncAt
      }
    })
  } catch (error) {
    logger.error('Error checking status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to check connection status'
    })
  }
})

/**
 * Disconnect a store
 * DELETE /api/shopify/stores/:storeId
 */
router.delete('/stores/:storeId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { storeId } = req.params

    const store = await prisma.shopifyStore.findFirst({
      where: { id: storeId, userId }
    })

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      })
    }

    await prisma.shopifyStore.update({
      where: { id: storeId },
      data: { isActive: false }
    })

    logger.info('Shopify store disconnected', { userId, storeId })

    res.json({
      success: true,
      message: 'Store disconnected successfully'
    })
  } catch (error) {
    logger.error('Error disconnecting store:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to disconnect store'
    })
  }
})

/**
 * Get products from connected store
 * GET /api/shopify/products
 */
router.get('/products', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { limit = 50, page_info } = req.query

    const store = await prisma.shopifyStore.findFirst({
      where: { userId, isActive: true }
    })

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'No connected store found'
      })
    }

    let url = `https://${store.storeDomain}/admin/api/2024-01/products.json?limit=${limit}`
    if (page_info) {
      url = `https://${store.storeDomain}/admin/api/2024-01/products.json?page_info=${page_info}&limit=${limit}`
    }

    const response = await fetch(url, {
      headers: { 'X-Shopify-Access-Token': store.accessToken }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products from Shopify')
    }

    const data = await response.json()

    // Parse pagination links
    const linkHeader = response.headers.get('link')
    let nextPageInfo = null
    if (linkHeader) {
      const nextMatch = linkHeader.match(/<[^>]+page_info=([^>&]+)[^>]*>;\s*rel="next"/)
      if (nextMatch) {
        nextPageInfo = nextMatch[1]
      }
    }

    res.json({
      success: true,
      products: data.products,
      pagination: {
        hasNext: !!nextPageInfo,
        nextPageInfo
      }
    })
  } catch (error) {
    logger.error('Error fetching products:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    })
  }
})

module.exports = router
