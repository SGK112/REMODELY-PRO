import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { phoneNumber, agentType = 'sarah' } = body

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use Twilio to make the call
    // For now, we'll return a mock response
    const callResponse = {
      callSid: `CA${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      status: 'initiated',
      phoneNumber,
      agentType,
      timestamp: new Date().toISOString(),
      estimatedWaitTime: '30 seconds'
    }

    // Log the call attempt
    console.log(`Voice call initiated to ${phoneNumber} with agent ${agentType}`)

    return NextResponse.json({ 
      success: true, 
      data: callResponse,
      message: 'Call initiated successfully. You should receive a call shortly.'
    })
  } catch (error) {
    console.error('Error making voice call:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return available calling options
    const callingOptions = {
      directPhone: '(602) 833-7194',
      availableAgents: ['sarah', 'david'],
      businessHours: {
        timezone: 'America/Phoenix',
        hours: '9:00 AM - 6:00 PM MST',
        days: 'Monday - Friday'
      },
      emergencySupport: 'Available 24/7 for urgent issues'
    }

    return NextResponse.json({ success: true, data: callingOptions })
  } catch (error) {
    console.error('Error getting calling options:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}