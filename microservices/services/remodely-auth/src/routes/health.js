const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// GET /health
router.get('/', async (req, res) => {
  const healthData = {
    service: 'remodely-auth',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    checks: {
      database: 'checking...',
      twilio: 'checking...'
    }
  }

  try {
    // Database health check
    await prisma.$queryRaw`SELECT 1`
    healthData.checks.database = 'healthy'
  } catch (error) {
    healthData.checks.database = 'unhealthy'
    healthData.status = 'degraded'
  }

  // Twilio health check (basic env var check)
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    healthData.checks.twilio = 'configured'
  } else {
    healthData.checks.twilio = 'not configured'
    healthData.status = 'degraded'
  }

  const statusCode = healthData.status === 'healthy' ? 200 : 503

  res.status(statusCode).json(healthData)
})

// GET /health/ready
router.get('/ready', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    res.json({
      ready: true,
      service: 'remodely-auth',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(503).json({
      ready: false,
      service: 'remodely-auth',
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    })
  }
})

// GET /health/live
router.get('/live', (req, res) => {
  res.json({
    alive: true,
    service: 'remodely-auth',
    timestamp: new Date().toISOString()
  })
})

module.exports = router
