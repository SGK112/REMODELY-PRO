import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 })
    }

    // Forward to Python grader service
    const response = await fetch('https://remodely-grader.onrender.com/api/grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Grader error:', error)
    return NextResponse.json({ success: false, error: 'Grading failed' }, { status: 500 })
  }
}
