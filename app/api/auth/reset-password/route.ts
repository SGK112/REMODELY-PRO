import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { resetPasswordSchema, validateInput } from '@/lib/validation'
import { sendEmail, emailTemplates } from '@/lib/email'

// Store reset tokens in memory (use Redis in production)
const resetTokens = new Map<string, { email: string; expires: number }>()

// Simple token generation function
function generateResetToken(): string {
  const array = new Uint8Array(32)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'request') {
      // Request password reset
      const { email } = body

      if (!email || typeof email !== 'string') {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      }

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })

      // Always return success to prevent email enumeration
      if (!user) {
        return NextResponse.json({
          message: 'If an account with that email exists, we sent a password reset link.'
        })
      }

      // Generate reset token
      const token = generateResetToken()
      const expires = Date.now() + 15 * 60 * 1000 // 15 minutes

      resetTokens.set(token, { email: email.toLowerCase(), expires })

      // Create reset link
      const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3007'}/auth/reset-password?token=${token}`

      // Send password reset email
      if (!user.email) {
        return NextResponse.json(
          { error: 'User email not found' },
          { status: 400 }
        )
      }

      const emailResult = await sendEmail({
        to: user.email,
        ...emailTemplates.passwordReset(resetLink, user.name || 'User')
      })

      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error)
        // Still return success to prevent email enumeration, but log the error
      }

      return NextResponse.json({
        message: 'If an account with that email exists, we sent a password reset link.'
      })

    } else if (action === 'reset') {
      // Reset password with token
      const validation = validateInput(resetPasswordSchema, body)
      if (!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 })
      }

      const { token, password } = validation.data

      // Validate token
      const tokenData = resetTokens.get(token)
      if (!tokenData || tokenData.expires < Date.now()) {
        return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 })
      }

      // Hash new password
      const hashedPassword = await hash(password, 12)

      // Update user password
      await prisma.user.update({
        where: { email: tokenData.email },
        data: { password: hashedPassword }
      })

      // Remove used token
      resetTokens.delete(token)

      return NextResponse.json({ message: 'Password reset successfully' })

    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
