import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

// This is a one-time setup endpoint for creating the super admin
// After creating the admin, this endpoint should be disabled or removed for security
export async function POST(request: NextRequest) {
  try {
    // Check if any admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        userType: 'ADMIN'
      }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists. This endpoint is disabled.' },
        { status: 400 }
      )
    }

    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash the password
    const hashedPassword = await hash(password, 12)

    // Create the super admin user
    const adminUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        userType: 'ADMIN',
        emailVerified: new Date(), // Auto-verify admin
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Super admin created successfully',
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        userType: adminUser.userType
      }
    })

  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check if admin exists (for debugging)
export async function GET() {
  try {
    const adminCount = await prisma.user.count({
      where: {
        userType: 'ADMIN'
      }
    })

    return NextResponse.json({
      adminExists: adminCount > 0,
      adminCount
    })
  } catch (error) {
    console.error('Error checking admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
