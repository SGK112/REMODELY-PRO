import { NextRequest } from 'next/server'

const CSRF_SECRET = process.env.CSRF_SECRET || 'fallback-secret-change-in-production'

/**
 * Generate a CSRF token using Web Crypto API (compatible with Edge Runtime)
 */
export function generateCSRFToken(): string {
  // Simple token generation that works in edge runtime
  const array = new Uint8Array(32)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  
  const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  const timestamp = Date.now().toString()
  const payload = `${token}:${timestamp}`
  
  // Simple hash without requiring Node.js crypto
  let hash = 0
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  const signature = Math.abs(hash).toString(16)
  
  return btoa(`${payload}:${signature}`)
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  try {
    const decoded = atob(token)
    const [tokenPart, timestamp, signature] = decoded.split(':')
    
    if (!tokenPart || !timestamp || !signature) {
      return false
    }
    
    // Check if token is expired (1 hour expiry)
    const tokenTime = parseInt(timestamp)
    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    
    if (now - tokenTime > oneHour) {
      return false
    }
    
    // Verify signature using same simple hash
    const payload = `${tokenPart}:${timestamp}`
    let hash = 0
    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    const expectedSignature = Math.abs(hash).toString(16)
    
    return signature === expectedSignature
  } catch (error) {
    return false
  }
}

/**
 * Extract CSRF token from request headers or body
 */
export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  // Check headers first
  const headerToken = request.headers.get('x-csrf-token')
  if (headerToken) {
    return headerToken
  }
  
  // For form submissions, token might be in body
  // This would need to be handled in the route handler
  return null
}

/**
 * Middleware helper to validate CSRF token
 */
export function validateCSRFFromRequest(request: NextRequest): boolean {
  // Skip CSRF validation for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return true
  }
  
  const token = getCSRFTokenFromRequest(request)
  if (!token) {
    return false
  }
  
  return validateCSRFToken(token)
}
