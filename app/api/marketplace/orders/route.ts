import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { shopifyService } from '@/lib/shopify'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const searchParams = request.nextUrl.searchParams
        const status = searchParams.get('status')
        const limit = searchParams.get('limit')

        const orders = await shopifyService.getOrders({
            status: status || undefined,
            limit: limit ? parseInt(limit) : undefined,
        })

        return NextResponse.json({ orders })
    } catch (error) {
        console.error('Error fetching marketplace orders:', error)
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        )
    }
}
