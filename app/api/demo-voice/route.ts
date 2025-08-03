import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json()
    
    console.log('🎉 DEMO VOICE CALL SIMULATION')
    console.log('📞 Calling:', to)
    console.log('🎙️  Voice Message:', message)
    console.log('⏰ Time:', new Date().toLocaleString())
    
    // Simulate the TwiML that would be spoken
    const twiml = `<Response><Say voice="alice">${message}</Say></Response>`
    
    console.log('🎵 TwiML Generated:', twiml)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Demo voice call simulated successfully!',
      callDetails: {
        to: to,
        status: 'simulated',
        duration: 'estimated 30-45 seconds',
        voice: 'alice',
        twiml: twiml,
        timestamp: new Date().toISOString()
      },
      note: 'This is a simulation. Add Twilio credentials to make real calls.'
    })
    
  } catch (error) {
    console.error('Demo voice call error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to simulate voice call' 
    }, { status: 500 })
  }
}
