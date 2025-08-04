const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn('Invalid token attempt', {
        token: token.substring(0, 20) + '...',
        error: err.message,
        ip: req.ip
      })

      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }

    req.user = user
    next()
  })
}

// Service-to-service authentication
const authenticateService = (req, res, next) => {
  const serviceKey = req.headers['x-service-key']

  if (!serviceKey || serviceKey !== process.env.SERVICE_API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Service authentication required'
    })
  }

  next()
}

module.exports = {
  authenticateToken,
  authenticateService
}
