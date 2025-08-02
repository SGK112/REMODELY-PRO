import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get customer profile
        const customer = await prisma.customer.findUnique({
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

        if (!customer) {
            return NextResponse.json({ error: 'Customer profile not found' }, { status: 404 })
        }

        return NextResponse.json({ customer })
    } catch (error) {
        console.error('Failed to get customer profile:', error)
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

        // Update customer profile
        const updatedCustomer = await prisma.customer.update({
            where: { userId: session.user.id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
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

        return NextResponse.json(updatedCustomer)
    } catch (error) {
        console.error('Failed to update customer profile:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
