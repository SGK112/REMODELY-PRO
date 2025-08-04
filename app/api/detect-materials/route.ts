import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Placeholder for material detection functionality
    return NextResponse.json({
      success: true,
      materials: [
        { type: 'granite', confidence: 0.95 },
        { type: 'quartz', confidence: 0.85 }
      ],
      message: 'Material detection completed'
    })
  } catch (error) {
    console.error('Material Detection Error:', error)
    return NextResponse.json(
      { error: 'Failed to detect materials' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Material Detection API',
    status: 'active'
  })
}
