import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema, validateInput } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = validateInput(registerSchema, body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { name, email, password, userType, businessName, serviceArea, specialties, yearsExperience, phone, phoneVerified } = validation.data

    // Check if user already exists
    const exists = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user with phone verification info
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType: userType || 'CUSTOMER',
        phone: phone || null,
        phoneVerified: phoneVerified || false,
        phoneVerifiedAt: phoneVerified ? new Date() : null
      }
    })

    // Create role-specific profile
    if (userType === 'CONTRACTOR') {
      await prisma.contractor.create({
        data: {
          userId: user.id,
          businessName: businessName || `${name} Contracting`,
          serviceArea: JSON.stringify(serviceArea || ['Austin, TX']),
          specialties: JSON.stringify(specialties || ['General Contracting']),
          yearsExperience: yearsExperience || 1,
          phone: phone || '555-0000',
          address: '123 Business St', // Default values for required fields
          city: 'Austin',
          state: 'TX',
          zipCode: '78701'
        }
      })
    } else {
      await prisma.customer.create({
        data: {
          userId: user.id,
          firstName: name?.split(' ')[0] || 'Customer',
          lastName: name?.split(' ')[1] || 'User'
        }
      })
    }

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
