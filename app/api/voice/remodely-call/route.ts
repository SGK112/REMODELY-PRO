import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, callType, projectType } = await request.json()

    // REMODELY call initiation
    return NextResponse.json({
      success: true,
      callId: 'call_' + Date.now(),
      status: 'initiated',
      estimatedWaitTime: '2-3 minutes',
      callDetails: {
        phoneNumber,
        callType: callType || 'consultation',
        projectType: projectType || 'general',
        agent: 'Sarah AI'
      }
    })
  } catch (error) {
    console.error('REMODELY Call Error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'REMODELY Call API',
    status: 'active'
  })
}
