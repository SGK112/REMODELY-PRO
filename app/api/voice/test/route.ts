import { NextRequest, NextResponse } from 'next/server'
import { TwilioService } from '@/lib/twilio'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, testType = 'basic' } = await request.json()
    
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    const testMessage = "This is a test call from Remodely AI. Your voice system is working correctly!"
    
    const result = await TwilioService.makeVoiceCall({
      to: phoneNumber,
      message: testMessage,
      type: 'welcome'
    })
    
    return NextResponse.json({ 
      success: result,
      message: result ? 'Test call initiated' : 'Test call failed'
    })
  } catch (error) {
    console.error('Voice test error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Voice test endpoint",
    availableTests: ["basic", "advanced"],
    timestamp: new Date().toISOString()
  })
}
