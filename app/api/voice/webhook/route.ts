import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log('Voice Webhook:', body)

        // Handle voice call status updates
        const { CallSid, CallStatus, Duration } = body

        if (CallStatus === 'completed') {
            console.log(`Call ${CallSid} completed. Duration: ${Duration} seconds`)
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Voice webhook error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        message: "Voice webhook endpoint for call status updates",
        timestamp: new Date().toISOString()
    })
}
