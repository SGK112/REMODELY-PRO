import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Sarah AI agent configuration
    const sarahAgent = {
      agentId: 'agent_5401k1we1dkbf1mvt22mme8wz82a',
      name: 'Sarah',
      type: 'AI Voice Assistant',
      capabilities: [
        'Home renovation consultation',
        'Contractor matching',
        'Project planning',
        'Cost estimation',
        'Material recommendations'
      ],
      status: 'active',
      conversationUrl: 'https://elevenlabs.io/convai/conversation/5401k1we1dkbf1mvt22mme8wz82a'
    }

    return NextResponse.json({ success: true, data: sarahAgent })
  } catch (error) {
    console.error('Error getting Sarah agent info:', error)
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

    // In a real implementation, you would send the message to ElevenLabs
    // and get a response from Sarah
    const response = {
      agentId: 'agent_5401k1we1dkbf1mvt22mme8wz82a',
      message: `Sarah AI: Thank you for your message about "${message}". I'm here to help with your home renovation needs. Let's discuss your project requirements.`,
      timestamp: new Date().toISOString(),
      conversationId: `conv_${Date.now()}`
    }

    return NextResponse.json({ success: true, data: response })
  } catch (error) {
    console.error('Error communicating with Sarah agent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}