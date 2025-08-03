import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation for required fields
    const {
      name,
      email,
      password,
      userType,
      rocLicenseNumber,
      phone,
      businessName,
      serviceArea,
      specialties,
      yearsExperience
    } = body

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
    }

    // ROC License verification for contractors
    let rocContractor = null
    if (userType === 'CONTRACTOR' && rocLicenseNumber) {
      try {
        rocContractor = await prisma.contractor.findFirst({
          where: {
            licenseNumber: rocLicenseNumber
          }
        })
      } catch (error) {
        console.error('ROC verification error:', error)
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType,
        phone: phone || null,
        phoneVerified: false,
        phoneVerifiedAt: null,
        emailVerified: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Create contractor profile if user is contractor
    if (userType === 'CONTRACTOR') {
      if (rocContractor) {
        // Update existing ROC contractor with user information
        await prisma.contractor.update({
          where: { id: rocContractor.id },
          data: {
            userId: user.id,
            phone: phone || rocContractor.phone,
            profileComplete: true,
            isVerified: true,
            verified: true
          }
        })
      } else {
        // Create new contractor profile
        await prisma.contractor.create({
          data: {
            userId: user.id,
            businessName: businessName || `${name} Contracting`,
            description: `Professional contractor based in Arizona.`,
            serviceArea: JSON.stringify(serviceArea || ['Phoenix, AZ']),
            specialties: JSON.stringify(specialties || ['General Contracting']),
            address: '',
            city: '',
            state: 'AZ',
            zipCode: '',
            phone: phone || '',
            website: '',
            isVerified: false,
            verified: false,
            profileComplete: false,
            rating: 4.0,
            reviewCount: 0,
            yearsExperience: yearsExperience || 1,
            yearsInBusiness: yearsExperience || 1,
            rocLicenseNumber: rocLicenseNumber || null,
          }
        })
      }
    }

    // Return success response (without sensitive data)
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        hasROCLicense: !!rocContractor
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { status: 500 }
    )
  }
}
