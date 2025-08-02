import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const location = searchParams.get('location')
    const specialty = searchParams.get('specialty')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const where: any = {
      // Show all contractors, not just verified ones
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { specialties: { hasSome: [search] } }
      ]
    }

    if (location) {
      where.serviceArea = {
        hasSome: [location]
      }
    }

    if (specialty) {
      where.specialties = {
        hasSome: [specialty]
      }
    }

    const contractors = await prisma.contractor.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        portfolio: {
          take: 3,
          orderBy: { createdAt: 'desc' }
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            customer: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' }
      ]
    })

    const total = await prisma.contractor.count({ where })

    return NextResponse.json({
      contractors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
