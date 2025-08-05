import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get contractor profile
        const contractor = await prisma.contractor.findUnique({
            where: { userId: session.user.id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        })

        if (!contractor) {
            return NextResponse.json({ error: 'Contractor profile not found' }, { status: 404 })
        }

        // Parse JSON fields
        const contractorWithParsedFields = {
            ...contractor,
            specialties: contractor.specialties ? JSON.parse(contractor.specialties) : [],
            portfolioImages: contractor.portfolioImages ? JSON.parse(contractor.portfolioImages) : []
        }

        return NextResponse.json({ contractor: contractorWithParsedFields })
    } catch (error) {
        console.error('Failed to get contractor profile:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await request.json()

        // Update contractor profile
        const updatedContractor = await prisma.contractor.update({
            where: { userId: session.user.id },
            data: {
                businessName: data.businessName,
                description: data.description,
                phone: data.phone,
                website: data.website,
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                specialties: data.specialties ? JSON.stringify(data.specialties) : undefined,
                yearsExperience: data.yearsExperience,
                licenseNumber: data.licenseNumber,
                portfolioImages: data.portfolioImages ? JSON.stringify(data.portfolioImages) : undefined,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        })

        // Parse JSON fields for response
        const contractorWithParsedFields = {
            ...updatedContractor,
            specialties: updatedContractor.specialties ? JSON.parse(updatedContractor.specialties) : [],
            portfolioImages: updatedContractor.portfolioImages ? JSON.parse(updatedContractor.portfolioImages) : []
        }

        return NextResponse.json(contractorWithParsedFields)
    } catch (error) {
        console.error('Failed to update contractor profile:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
