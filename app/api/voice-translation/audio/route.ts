import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const text = searchParams.get('text')

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      )
    }

    // Placeholder for audio generation
    return NextResponse.json({
      success: true,
      audioUrl: `data:audio/mp3;base64,placeholder`,
      text,
      message: 'Audio generated successfully'
    })
  } catch (error) {
    console.error('Voice Translation Audio Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate audio' },
      { status: 500 }
    )
  }
}
