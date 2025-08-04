import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, model } = await request.json()

    // Test Gemini 2 functionality
    return NextResponse.json({
      success: true,
      model: model || 'gemini-2.0',
      response: `Gemini 2.0 response to: ${prompt}`,
      tokens: {
        input: prompt?.length || 0,
        output: 150
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test Gemini 2 Error:', error)
    return NextResponse.json(
      { error: 'Failed to test Gemini 2' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test Gemini 2 API',
    status: 'active',
    model: 'gemini-2.0'
  })
}
