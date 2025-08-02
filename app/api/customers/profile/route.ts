import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the customer profile
    const customer = await prisma.customer.findUnique({
      where: {
        userId: session.user.id
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer profile not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.user.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zipCode: customer.zipCode,
      propertyType: customer.propertyType,
      homeSize: customer.homeSize,
      preferredBudget: customer.preferredBudget,
      projectTimeline: customer.projectTimeline,
      preferences: customer.preferences,
      createdAt: customer.createdAt
    })
  } catch (error) {
    console.error('Error fetching customer profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zipCode,
      propertyType,
      homeSize,
      preferredBudget,
      projectTimeline,
      preferences
    } = body

    // Update or create the customer profile
    const customer = await prisma.customer.upsert({
      where: {
        userId: session.user.id
      },
      update: {
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        propertyType,
        homeSize,
        preferredBudget,
        projectTimeline,
        preferences
      },
      create: {
        userId: session.user.id,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        propertyType,
        homeSize,
        preferredBudget,
        projectTimeline,
        preferences
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.user.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zipCode: customer.zipCode,
      propertyType: customer.propertyType,
      homeSize: customer.homeSize,
      preferredBudget: customer.preferredBudget,
      projectTimeline: customer.projectTimeline,
      preferences: customer.preferences,
      createdAt: customer.createdAt
    })
  } catch (error) {
    console.error('Error updating customer profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
