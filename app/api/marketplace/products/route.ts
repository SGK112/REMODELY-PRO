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
        const category = searchParams.get('category')
        const vendor = searchParams.get('vendor')
        const limit = searchParams.get('limit')

        const products = await shopifyService.getProducts({
            product_type: category || undefined,
            vendor: vendor || undefined,
            limit: limit ? parseInt(limit) : undefined,
        })

        return NextResponse.json({ products })
    } catch (error) {
        console.error('Error fetching marketplace products:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, price, sku, inventory_quantity, images, category } = body

        if (!title || !description || !price || !category) {
            return NextResponse.json(
                { error: 'Missing required fields: title, description, price, category' },
                { status: 400 }
            )
        }

        // Create product for contractor
        const product = await shopifyService.createContractorProduct(session.user.id, {
            title,
            description,
            price,
            sku,
            inventory_quantity,
            images,
            category,
        })

        return NextResponse.json({ product }, { status: 201 })
    } catch (error) {
        console.error('Error creating marketplace product:', error)
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
}
