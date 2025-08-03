import { NextRequest, NextResponse } from 'next/server'
import { TwilioService } from '@/lib/twilio'

// Demo endpoint - not protected for testing purposes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, message } = body

    if (!to) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    const defaultMessage = message || 'Hello! This is a demo call from Remodely.AI. Thank you for testing our voice API system!'

    console.log('🎉 DEMO VOICE CALL INITIATED')
    console.log('📞 Calling:', to)
    console.log('🎙️  Voice Message:', defaultMessage)
    console.log('⏰ Time:', new Date().toLocaleString())

    // Use the Twilio service to make the call
    const result = await TwilioService.makeVoiceCall({
      to,
      message: defaultMessage,
      type: 'reminder'
    })

    if (result.success) {
      console.log('✅ Voice call initiated successfully!')
      console.log('📋 Call SID:', result.callSid)

      return NextResponse.json({
        success: true,
        message: 'Demo voice call initiated successfully',
        callSid: result.callSid,
        phoneNumber: to,
        voiceMessage: defaultMessage,
        timestamp: new Date().toISOString()
      })
    } else {
      console.error('❌ Voice call failed:', result.error)
      return NextResponse.json(
        { error: result.error || 'Failed to initiate demo call' },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('💥 Demo voice call error:', error)

    return NextResponse.json({
      error: error.message || 'Failed to initiate demo call',
      code: error.code,
      details: error.moreInfo || null
    }, { status: 500 })
  }
}
