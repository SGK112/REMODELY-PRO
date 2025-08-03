import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to } = body

    if (!to) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Get Twilio credentials from environment
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      return NextResponse.json(
        { error: 'Twilio credentials not configured' },
        { status: 500 }
      )
    }

    const client = twilio(accountSid, authToken)

    // Format phone number to E.164 format if not already
    const formattedNumber = to.startsWith('+') ? to : `+1${to.replace(/\D/g, '')}`

    // Create the call using inline TwiML instead of URL for testing
    const call = await client.calls.create({
      from: twilioPhoneNumber,
      to: formattedNumber,
      twiml: `<Response><Say voice="alice">Hello! This is a test call from Remodely.AI. Your voice API is working correctly!</Say></Response>`,
    })

    console.log('Test call SID:', call.sid)
    
    return NextResponse.json({
      success: true,
      message: 'Test voice call initiated successfully',
      callSid: call.sid,
      to: formattedNumber,
      from: twilioPhoneNumber
    })

  } catch (error: any) {
    console.error('Test voice call error:', error)
    
    return NextResponse.json({
      error: error.message || 'Failed to initiate test call',
      code: error.code,
      details: error.moreInfo || null
    }, { status: 500 })
  }
}
