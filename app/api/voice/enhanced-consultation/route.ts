import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { customerInfo, projectDetails, preferredTime } = await request.json()

    // Enhanced voice consultation scheduling
    return NextResponse.json({
      success: true,
      consultationId: 'consult_' + Date.now(),
      scheduledTime: preferredTime,
      callDetails: {
        duration: '30 minutes',
        type: 'voice_consultation',
        expert: 'Sarah AI Assistant',
        phoneNumber: '+1-555-REMODEL'
      },
      preparation: [
        'Have project photos ready',
        'Prepare list of questions',
        'Know your budget range'
      ]
    })
  } catch (error) {
    console.error('Enhanced Voice Consultation Error:', error)
    return NextResponse.json(
      { error: 'Failed to schedule consultation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Enhanced Voice Consultation API',
    status: 'active'
  })
}
