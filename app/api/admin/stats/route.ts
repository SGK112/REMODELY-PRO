import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id || session.user.userType !== 'ADMIN') {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
        }

        // Get admin statistics
        const [
            totalUsers,
            totalContractors,
            totalCustomers,
            pendingContractors,
            activeQuotes
        ] = await Promise.all([
            prisma.user.count(),
            prisma.contractor.count(),
            prisma.customer.count(),
            prisma.contractor.count({ where: { isVerified: false } }),
            prisma.quote.count({ where: { status: 'PENDING' } })
        ])

        // Mock revenue for now (you can implement actual revenue calculation)
        const monthlyRevenue = 125000

        const stats = {
            totalUsers,
            totalContractors,
            totalCustomers,
            pendingApprovals: pendingContractors,
            activeQuotes,
            monthlyRevenue
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error('Failed to get admin stats:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
