import { NextRequest, NextResponse } from 'next/server'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1/text-to-speech/'

export async function POST(req: NextRequest) {
  const { text, voiceId } = await req.json()
  if (!text || !voiceId) {
    return NextResponse.json({ error: 'Missing text or voiceId' }, { status: 400 })
  }

  const response = await fetch(`${ELEVENLABS_BASE_URL}${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY || '',
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    const error = await response.text()
    return NextResponse.json({ error }, { status: response.status })
  }

  const audioBuffer = await response.arrayBuffer()
  return new Response(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  })
}
