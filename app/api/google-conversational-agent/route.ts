import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic Google Conversational Agent webhook handler
    return NextResponse.json({
      fulfillmentText: "Hello from Remodely AI! How can I help you today?",
      source: "remodely-ai"
    })
  } catch (error) {
    console.error('Google Conversational Agent error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Google Conversational Agent endpoint is active",
    timestamp: new Date().toISOString()
  })
}
