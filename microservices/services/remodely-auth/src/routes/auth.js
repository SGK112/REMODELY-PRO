const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const { PrismaClient } = require('@prisma/client')
const twilio = require('twilio')

const logger = require('../utils/logger')
const { validateRequest } = require('../middleware/validation')
const { authenticateToken } = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  phone: z.string().min(10).max(15),
  userType: z.enum(['CUSTOMER', 'CONTRACTOR']),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "Must agree to terms and conditions"
  })
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

const verifyPhoneSchema = z.object({
  phone: z.string().min(10).max(15),
  code: z.string().length(6)
})

const resetPasswordSchema = z.object({
  email: z.string().email()
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(100)
})

// Generate JWT token
const generateToken = (userId, userType) => {
  return jwt.sign(
    { userId, userType },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  )
}

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// POST /api/auth/register
router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const { name, email, password, phone, userType, agreeToTerms } = req.body

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email
          ? 'User with this email already exists'
          : 'User with this phone number already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate verification code
    const verificationCode = generateVerificationCode()

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        userType,
        phoneVerificationCode: verificationCode,
        phoneVerificationExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        agreeToTerms,
        agreeToTermsDate: new Date()
      }
    })

    // Send verification SMS
    try {
      await twilioClient.messages.create({
        body: `Your Remodely.AI verification code is: ${verificationCode}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      })
    } catch (twilioError) {
      logger.error('Failed to send verification SMS', { error: twilioError, phone })
      // Don't fail registration if SMS fails
    }

    // Generate token
    const token = generateToken(user.id, user.userType)

    logger.info('User registered successfully', { userId: user.id, email, userType })

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your phone number.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        phoneVerified: user.phoneVerified,
        createdAt: user.createdAt
      }
    })

  } catch (error) {
    logger.error('Registration failed', { error, email: req.body.email })
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    })
  }
})

// POST /api/auth/login
router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate token
    const token = generateToken(user.id, user.userType)

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    })

    logger.info('User logged in successfully', { userId: user.id, email })

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        phoneVerified: user.phoneVerified,
        lastLogin: user.lastLogin
      }
    })

  } catch (error) {
    logger.error('Login failed', { error, email: req.body.email })
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    })
  }
})

// POST /api/auth/verify-phone
router.post('/verify-phone', authenticateToken, validateRequest(verifyPhoneSchema), async (req, res) => {
  try {
    const { phone, code } = req.body
    const userId = req.user.userId

    // Find user and verify code
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    if (user.phone !== phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number mismatch'
      })
    }

    if (user.phoneVerificationCode !== code) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      })
    }

    if (user.phoneVerificationExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired'
      })
    }

    // Update user as verified
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        phoneVerified: true,
        phoneVerificationCode: null,
        phoneVerificationExpires: null,
        phoneVerifiedAt: new Date()
      }
    })

    logger.info('Phone verified successfully', { userId, phone })

    res.json({
      success: true,
      message: 'Phone number verified successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        userType: updatedUser.userType,
        phoneVerified: updatedUser.phoneVerified,
        phoneVerifiedAt: updatedUser.phoneVerifiedAt
      }
    })

  } catch (error) {
    logger.error('Phone verification failed', { error, userId: req.user?.userId })
    res.status(500).json({
      success: false,
      message: 'Phone verification failed. Please try again.'
    })
  }
})

// GET /api/auth/profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        userType: true,
        phoneVerified: true,
        phoneVerifiedAt: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      user
    })

  } catch (error) {
    logger.error('Profile fetch failed', { error, userId: req.user?.userId })
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    })
  }
})

// POST /api/auth/logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    // In a JWT system, logout is primarily client-side (remove token)
    // But we could implement token blacklisting here if needed

    logger.info('User logged out', { userId })

    res.json({
      success: true,
      message: 'Logged out successfully'
    })

  } catch (error) {
    logger.error('Logout failed', { error, userId: req.user?.userId })
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    })
  }
})

// GET /api/auth/validate-token
router.get('/validate-token', authenticateToken, async (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: {
      userId: req.user.userId,
      userType: req.user.userType
    }
  })
})

module.exports = router
