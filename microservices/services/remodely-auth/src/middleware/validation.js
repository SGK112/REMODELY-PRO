const { z } = require('zod')
const logger = require('../utils/logger')

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))

        logger.warn('Validation failed', { 
          errors: validationErrors,
          path: req.path,
          ip: req.ip 
        })

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        })
      }

      logger.error('Unexpected validation error', { error, path: req.path })
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
}

module.exports = {
  validateRequest
}
