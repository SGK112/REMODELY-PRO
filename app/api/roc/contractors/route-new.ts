export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Check if database is properly configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        contractors: [], 
        message: 'Database not configured',
        stats: {
          totalCount: 0,
          withContactCount: 0,
          licensedCount: 0,
          activeCount: 0
        }
      })
    }

    // For build time, return empty data
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL.startsWith('postgresql')) {
      return NextResponse.json({ 
        contractors: [], 
        message: 'Build mode - no data',
        stats: {
          totalCount: 0,
          withContactCount: 0,
          licensedCount: 0,
          activeCount: 0
        }
      })
    }

    // Fetch ROC contractors with pagination
    const contractors = await prisma.contractor.findMany({
      where: {
        isROCVerified: true
      },
      select: {
        id: true,
        businessName: true,
        dbaName: true,
        rocLicenseNumber: true,
        licenseClass: true,
        licenseType: true,
        licenseStatus: true,
        city: true,
        state: true,
        specialties: true,
        yearsInBusiness: true,
        phone: true,
        website: true,
        licenseExpiration: true,
        qualifyingParty: true,
        rocImportDate: true
      },
      orderBy: {
        businessName: 'asc'
      },
      take: 1000 // Limit for performance
    })

    // Calculate statistics
    const totalCount = await prisma.contractor.count({
      where: { isROCVerified: true }
    })

    const withContactCount = await prisma.contractor.count({
      where: {
        isROCVerified: true,
        OR: [
          { phone: { not: null } },
          { website: { not: null } }
        ]
      }
    })

    const licensedCount = await prisma.contractor.count({
      where: {
        isROCVerified: true,
        licenseStatus: 'ACTIVE'
      }
    })

    const activeCount = await prisma.contractor.count({
      where: {
        isROCVerified: true,
        licenseStatus: 'ACTIVE',
        OR: [
          { phone: { not: null } },
          { website: { not: null } }
        ]
      }
    })

    // Process specialties and group contractors
    const processedContractors = contractors.map(contractor => ({
      ...contractor,
      specialties: typeof contractor.specialties === 'string' 
        ? JSON.parse(contractor.specialties) 
        : contractor.specialties || []
    }))

    const response = {
      success: true,
      contractors: processedContractors,
      stats: {
        totalCount,
        withContactCount,
        licensedCount,
        activeCount
      },
      pagination: {
        page: 1,
        limit: 1000,
        total: totalCount
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error fetching ROC contractors:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contractors' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
