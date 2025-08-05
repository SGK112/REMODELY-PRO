import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // David AI agent configuration
    const davidAgent = {
      agentId: 'david_agent_001',
      name: 'David',
      type: 'Technical Voice Assistant',
      capabilities: [
        'Technical construction advice',
        'Building code compliance',
        'Material specifications',
        'Project troubleshooting',
        'Safety guidelines'
      ],
      status: 'active',
      conversationUrl: '/voice-consultation?agent=david'
    }

    return NextResponse.json({ success: true, data: davidAgent })
  } catch (error) {
    console.error('Error getting David agent info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { message, userId } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would process the message with David AI
    const response = {
      agentId: 'david_agent_001',
      message: `David AI: I understand you're asking about "${message}". As your technical assistant, I can help with construction details, building codes, and safety requirements. What specific technical aspects would you like to discuss?`,
      timestamp: new Date().toISOString(),
      conversationId: `conv_david_${Date.now()}`
    }

    return NextResponse.json({ success: true, data: response })
  } catch (error) {
    console.error('Error communicating with David agent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}