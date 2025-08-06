import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // AI tools usage endpoint
    return NextResponse.json({ 
      usage: { tokens: 0, requests: 0 },
      message: 'Usage tracking coming soon' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Log usage endpoint
    return NextResponse.json({ 
      success: true,
      message: 'Usage logged' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
