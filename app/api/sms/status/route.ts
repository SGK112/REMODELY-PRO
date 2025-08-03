import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log('SMS Status webhook:', body)

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('SMS status error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        message: "SMS status webhook endpoint",
        timestamp: new Date().toISOString()
    })
}
