import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const toolName = searchParams.get('tool')
    const timeframe = searchParams.get('timeframe') || '30d'

    // Calculate date range based on timeframe
    const now = new Date()
    let startDate = new Date()
    
    switch (timeframe) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Mock usage data for now - in production, you'd query your database
    const usageData = {
      userId: session.user.id,
      timeframe,
      totalUsage: 156,
      toolUsage: {
        'countertop-analyzer': 45,
        'cabinet-designer': 32,
        'roofing-measurement': 28,
        'framing-calculator': 25,
        'handyman-assistant': 26
      },
      dailyUsage: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        usage: Math.floor(Math.random() * 10) + 1
      })),
      limits: {
        daily: 50,
        monthly: 1000,
        remaining: 844
      }
    }

    // Filter by specific tool if requested
    if (toolName && usageData.toolUsage[toolName as keyof typeof usageData.toolUsage]) {
      return NextResponse.json({
        success: true,
        data: {
          tool: toolName,
          usage: usageData.toolUsage[toolName as keyof typeof usageData.toolUsage],
          timeframe
        }
      })
    }

    return NextResponse.json({ success: true, data: usageData })
  } catch (error) {
    console.error('Error fetching AI tool usage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { toolName, action = 'use', metadata = {} } = body

    if (!toolName) {
      return NextResponse.json(
        { error: 'Tool name is required' },
        { status: 400 }
      )
    }

    // Validate tool name
    const validTools = [
      'countertop-analyzer',
      'cabinet-designer',
      'roofing-measurement',
      'framing-calculator',
      'handyman-assistant',
      'voice-translation'
    ]

    if (!validTools.includes(toolName)) {
      return NextResponse.json(
        { error: 'Invalid tool name' },
        { status: 400 }
      )
    }

    // In a real implementation, you would save this to your database
    const usageRecord = {
      userId: session.user.id,
      toolName,
      action,
      metadata,
      timestamp: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    console.log('AI Tool Usage Recorded:', usageRecord)

    // Mock response - in production, you'd save to database and return the record
    return NextResponse.json({
      success: true,
      data: {
        id: `usage_${Date.now()}`,
        ...usageRecord,
        message: `Usage recorded for ${toolName}`
      }
    })
  } catch (error) {
    console.error('Error recording AI tool usage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { usageId, status, result } = body

    if (!usageId) {
      return NextResponse.json(
        { error: 'Usage ID is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would update the usage record
    const updatedRecord = {
      usageId,
      status,
      result,
      updatedAt: new Date().toISOString(),
      userId: session.user.id
    }

    console.log('AI Tool Usage Updated:', updatedRecord)

    return NextResponse.json({
      success: true,
      data: updatedRecord,
      message: 'Usage record updated successfully'
    })
  } catch (error) {
    console.error('Error updating AI tool usage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const usageId = searchParams.get('usageId')

    if (!usageId) {
      return NextResponse.json(
        { error: 'Usage ID is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would delete the usage record
    console.log(`Deleting AI tool usage record: ${usageId} for user: ${session.user.id}`)

    return NextResponse.json({
      success: true,
      message: 'Usage record deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting AI tool usage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}