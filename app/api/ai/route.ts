import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'AI API endpoint - coming soon' })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'AI API endpoint - coming soon' })
}