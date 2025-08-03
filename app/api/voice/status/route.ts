import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log('Voice Status webhook:', body)

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Voice status error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        message: "Voice status webhook endpoint",
        timestamp: new Date().toISOString()
    })
}
