import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      password,
      phone,
      userType,
      businessName,
      licenseNumber,
      description
    } = body

    // Validate required fields
    if (!name || !email || !password || !phone || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate userType
    const validUserTypes = ['CUSTOMER', 'CONTRACTOR', 'ADMIN']
    if (!validUserTypes.includes(userType)) {
      return NextResponse.json(
        { error: "Invalid user type" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          userType: userType as "CUSTOMER" | "CONTRACTOR" | "ADMIN",
          phoneVerified: false,
        }
      })

      // Create role-specific profile
      if (userType === "CONTRACTOR") {
        await tx.contractor.create({
          data: {
            userId: newUser.id,
            businessName: businessName || name,
            licenseNumber: licenseNumber || null,
            description: description || null,
            serviceArea: "[]", // Default empty JSON array
            specialties: "[]", // Default empty JSON array
            isVerified: false,
            rating: 0,
          }
        })
      } else if (userType === "CUSTOMER") {
        const nameParts = name.split(' ')
        await tx.customer.create({
          data: {
            userId: newUser.id,
            firstName: nameParts[0] || name,
            lastName: nameParts[1] || '',
          }
        })
      }

      return newUser
    })

    // Return success (exclude password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "User created successfully",
      user: userWithoutPassword
    }, { status: 201 })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
