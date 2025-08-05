import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const callSid = searchParams.get('callSid')

    if (!callSid) {
      return NextResponse.json({ error: 'Call SID is required' }, { status: 400 })
    }

    // In a real implementation, you would check the call status with Twilio
    // For now, we'll return a mock response
    const callStatus = {
      callSid,
      status: 'completed',
      duration: '120',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: callStatus })
  } catch (error) {
    console.error('Error checking call status:', error)
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
    const { callSid, status } = body

    if (!callSid || !status) {
      return NextResponse.json(
        { error: 'Call SID and status are required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would update the call status in your database
    console.log(`Call ${callSid} status updated to: ${status}`)

    return NextResponse.json({ success: true, message: 'Call status updated' })
  } catch (error) {
    console.error('Error updating call status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}