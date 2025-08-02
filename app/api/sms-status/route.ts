import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

export async function GET(request: NextRequest) {
  if (!accountSid || !authToken) {
    return NextResponse.json({ error: 'Twilio credentials not configured' }, { status: 500 })
  }

  const client = twilio(accountSid, authToken)
  
  try {
    // Get recent messages
    const messages = await client.messages.list({ limit: 5 })
    
    const messageDetails = messages.map(msg => ({
      sid: msg.sid,
      to: msg.to,
      from: msg.from,
      body: msg.body.substring(0, 50) + '...',
      status: msg.status,
      errorCode: msg.errorCode,
      errorMessage: msg.errorMessage,
      dateCreated: msg.dateCreated
    }))

    return NextResponse.json({ 
      success: true,
      messages: messageDetails,
      totalMessages: messages.length
    })
    
  } catch (error) {
    console.error('Error fetching message status:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch message status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
