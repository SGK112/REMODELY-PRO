import { NextRequest, NextResponse } from 'next/server'

// Apps API route - provides information about available AI applications
export async function GET(request: NextRequest) {
  try {
    const apps = [
      {
        id: 'countertop-analyzer',
        name: 'Material ID AI',
        description: 'Instantly identify stone materials with your phone camera.',
        category: 'Kitchen',
        pricing: 'Free',
        status: 'active'
      },
      {
        id: 'voice-translation',
        name: 'Voice Translator',
        description: 'Real-time voice translation for construction crews.',
        category: 'Communication',
        pricing: '$29/mo',
        status: 'active'
      },
      {
        id: 'cabinet-designer',
        name: 'Cabinet Designer',
        description: 'AI cabinet design with 3D preview.',
        category: 'Kitchen',
        pricing: '$39/mo',
        status: 'active'
      },
      {
        id: 'handyman-assistant',
        name: 'Handyman AI',
        description: 'Complete business management with AI.',
        category: 'Business',
        pricing: '$49/mo',
        status: 'active'
      },
      {
        id: 'framing-calculator',
        name: 'Framing Calculator',
        description: 'Advanced load calculations and code compliance.',
        category: 'Structural',
        pricing: '$59/mo',
        status: 'active'
      },
      {
        id: 'roofing-measurement',
        name: 'Roof Measurement',
        description: 'Measure roofs from satellite images.',
        category: 'Roofing',
        pricing: '$39/mo',
        status: 'active'
      },
      {
        id: 'ai-voice-assistants',
        name: 'Voice Assistants',
        description: 'AI construction assistants with specialized expertise.',
        category: 'Communication',
        pricing: '$29/mo',
        status: 'active'
      }
    ]

    return NextResponse.json({
      success: true,
      apps,
      total: apps.length
    })
  } catch (error) {
    console.error('Error fetching apps:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch apps',
        apps: [],
        total: 0
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle app analytics or usage tracking
    const { appId, action, metadata } = body
    
    if (!appId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: appId, action' },
        { status: 400 }
      )
    }

    // Log app usage for analytics
    console.log(`App usage: ${appId} - ${action}`, metadata)
    
    return NextResponse.json({
      success: true,
      message: 'App usage tracked successfully'
    })
  } catch (error) {
    console.error('Error tracking app usage:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track app usage' },
      { status: 500 }
    )
  }
}