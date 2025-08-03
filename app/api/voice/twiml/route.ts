import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const callSid = formData.get('CallSid')
    const from = formData.get('From')
    
    console.log('TwiML request:', { callSid, from })
    
    // Generate TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">Hello! This is Sarah from Remodely AI. Thanks for calling! We're connecting you with our team.</Say>
    <Pause length="1"/>
    <Say voice="alice">Please hold while we process your request.</Say>
</Response>`
    
    return new NextResponse(twiml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    })
  } catch (error) {
    console.error('TwiML error:', error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, there was an error. Please try again later.</Say></Response>',
      {
        headers: {
          'Content-Type': 'text/xml',
        },
      }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "TwiML endpoint for voice calls",
    timestamp: new Date().toISOString()
  })
}
