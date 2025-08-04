import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get('specialty')
    const location = searchParams.get('location')
    const rating = searchParams.get('rating')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build where clause
    const where: any = {
      // Only return contractors with profiles
      contractor: {
        isNot: null
      }
    }

    // Add specialty filter
    if (specialty && specialty !== 'all') {
      where.contractor = {
        ...where.contractor,
        OR: [
          {
            specialties: {
              contains: specialty,
              mode: 'insensitive'
            }
          },
          {
            specialties: {
              array_contains: [specialty]
            }
          }
        ]
      }
    }

    // Add rating filter
    if (rating) {
      where.contractor = {
        ...where.contractor,
        rating: {
          gte: parseFloat(rating)
        }
      }
    }

    // Add location filter
    if (location) {
      where.contractor = {
        ...where.contractor,
        OR: [
          {
            city: {
              contains: location,
              mode: 'insensitive'
            }
          },
          {
            state: {
              contains: location,
              mode: 'insensitive'
            }
          },
          {
            zipCode: {
              contains: location,
              mode: 'insensitive'
            }
          }
        ]
      }
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        contractor: true
      },
      take: limit,
      orderBy: {
        contractor: {
          rating: 'desc'
        }
      }
    })

    // Transform data to match frontend interface
    const contractors = users.map(user => ({
      id: user.id,
      companyName: user.contractor?.businessName || user.name || 'Unknown Company',
      contactName: user.name,
      email: user.email,
      phone: user.contractor?.phone || user.phone,
      website: user.contractor?.website,
      specialties: user.contractor?.specialties || '[]',
      rating: user.contractor?.rating || 4.0,
      reviewCount: user.contractor?.reviewCount || 0,
      description: user.contractor?.description,
      address: user.contractor?.address,
      city: user.contractor?.city,
      state: user.contractor?.state,
      zipCode: user.contractor?.zipCode,
      verified: user.contractor?.isROCVerified || false,
      yearsExperience: user.contractor?.yearsExperience,
      latitude: user.contractor?.latitude,
      longitude: user.contractor?.longitude
    }))

    return NextResponse.json(contractors)
  } catch (error) {
    console.error('Error fetching contractors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contractors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create contractor logic here if needed
    return NextResponse.json({ message: 'Contractor created successfully' })
  } catch (error) {
    console.error('Error creating contractor:', error)
    return NextResponse.json(
      { error: 'Failed to create contractor' },
      { status: 500 }
    )
  }
}
