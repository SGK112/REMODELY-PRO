import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { shopifyService } from '@/lib/shopify'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.userType !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const stats = await shopifyService.getMarketplaceStats()
        return NextResponse.json(stats)
    } catch (error) {
        console.error('Error fetching marketplace stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch marketplace statistics' },
            { status: 500 }
        )
    }
}
