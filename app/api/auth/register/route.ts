import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { TwoFactorAuth } from '@/lib/two-factor-auth'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  userType: z.enum(["CUSTOMER", "CONTRACTOR", "ADMIN"]).default("CUSTOMER")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await TwoFactorAuth.hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        userType: validatedData.userType,
        emailVerified: new Date() // Auto-verify for simplicity
      }
    })

    // Create role-specific profile
    if (validatedData.userType === "CUSTOMER") {
      await prisma.customer.create({
        data: {
          userId: user.id,
          firstName: validatedData.name.split(' ')[0] || '',
          lastName: validatedData.name.split(' ').slice(1).join(' ') || '',
          phone: validatedData.phone || ''
        }
      })
    } else if (validatedData.userType === "CONTRACTOR") {
      await prisma.contractor.create({
        data: {
          userId: user.id,
          businessName: validatedData.name,
          description: `Professional ${validatedData.name} contractor`,
          phone: validatedData.phone || '',
          isVerified: false,
          specialties: JSON.stringify([]),
          serviceArea: JSON.stringify([])
        }
      })
    }

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    })

  } catch (error) {
    console.error("Registration error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
