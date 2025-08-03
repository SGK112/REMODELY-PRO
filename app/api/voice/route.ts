import { NextRequest, NextResponse } from 'next/server'
import { TwilioService } from '@/lib/twilio'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, message } = body

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Phone number and message are required' },
        { status: 400 }
      )
    }

    // Use the voice call method
    const success = await TwilioService.makeVoiceCall({
      to,
      message,
      type: 'reminder'
    })

    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Voice call initiated successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to initiate voice call' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Voice call API error:', error)
    
    // Handle Twilio-specific errors
    if (error.code === 21219) {
      return NextResponse.json(
        { 
          error: 'Phone number not verified. Trial accounts can only call verified numbers. Please verify your phone number in the Twilio Console first.',
          code: 'UNVERIFIED_NUMBER'
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
