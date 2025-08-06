import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
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
        AND: [
          { isROCVerified: true },
          { phone: { not: null } }
        ]
      }
    })

    // Get license class distribution
    const licenseClasses = await prisma.contractor.groupBy({
      by: ['licenseClass'],
      where: { isROCVerified: true },
      _count: {
        licenseClass: true
      }
    })

    // Get city distribution
    const cities = await prisma.contractor.groupBy({
      by: ['city'],
      where: { isROCVerified: true },
      _count: {
        city: true
      },
      orderBy: {
        _count: {
          city: 'desc'
        }
      },
      take: 50 // Top 50 cities
    })

    const byClass = licenseClasses.reduce((acc, item) => {
      if (item.licenseClass) {
        acc[item.licenseClass] = item._count.licenseClass
      }
      return acc
    }, {} as Record<string, number>)

    const byCities = cities.reduce((acc, item) => {
      if (item.city) {
        acc[item.city] = item._count.city
      }
      return acc
    }, {} as Record<string, number>)

    // Parse specialties JSON strings
    const processedContractors = contractors.map(contractor => ({
      ...contractor,
      specialties: contractor.specialties ? JSON.parse(contractor.specialties) : []
    }))

    const stats = {
      total: totalCount,
      withContact: withContactCount,
      byClass,
      byCities
    }

    return NextResponse.json({
      success: true,
      contractors: processedContractors,
      stats
    })
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
