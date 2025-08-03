import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const verifyTokenSchema = z.object({
  token: z.string().min(1)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = verifyTokenSchema.parse(body)

    // Find user with this reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date() // Token must not be expired
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    return NextResponse.json({ valid: true })

  } catch (error) {
    console.error('Verify token error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
