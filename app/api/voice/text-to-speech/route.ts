import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { text, voice = 'sarah', language = 'en' } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for speech synthesis' },
        { status: 400 }
      )
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Text must be less than 5000 characters' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use ElevenLabs API
    // For now, we'll return a mock response
    const speechResponse = {
      audioUrl: `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      voice,
      language,
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      duration: Math.ceil(text.length / 15), // Approximate duration in seconds
      timestamp: new Date().toISOString(),
      status: 'generated'
    }

    return NextResponse.json({ 
      success: true, 
      data: speechResponse,
      message: 'Text-to-speech conversion completed successfully'
    })
  } catch (error) {
    console.error('Error in text-to-speech conversion:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return available voices and languages
    const voiceOptions = {
      voices: [
        {
          id: 'sarah',
          name: 'Sarah',
          description: 'Professional female voice for consultation',
          language: 'en-US',
          gender: 'female'
        },
        {
          id: 'david',
          name: 'David',
          description: 'Technical male voice for construction advice',
          language: 'en-US',
          gender: 'male'
        }
      ],
      languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' }
      ],
      maxTextLength: 5000,
      supportedFormats: ['mp3', 'wav', 'ogg']
    }

    return NextResponse.json({ success: true, data: voiceOptions })
  } catch (error) {
    console.error('Error getting voice options:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}