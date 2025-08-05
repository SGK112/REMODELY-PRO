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
    const { text, targetLanguage, sourceLanguage = 'auto' } = body

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: 'Text must be less than 10,000 characters' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use Google Translate API or similar
    // For now, we'll return a mock translation
    const mockTranslations: Record<string, string> = {
      'es': 'Traducción del texto al español',
      'fr': 'Traduction du texte en français',
      'de': 'Übersetzung des Textes ins Deutsche',
      'it': 'Traduzione del testo in italiano',
      'pt': 'Tradução do texto para português'
    }

    const translatedText = mockTranslations[targetLanguage] || `Translated: ${text}`

    const translationResponse = {
      originalText: text,
      translatedText,
      sourceLanguage: sourceLanguage === 'auto' ? 'en' : sourceLanguage,
      targetLanguage,
      confidence: 0.95,
      timestamp: new Date().toISOString(),
      characterCount: text.length
    }

    return NextResponse.json({ 
      success: true, 
      data: translationResponse,
      message: 'Text translated successfully'
    })
  } catch (error) {
    console.error('Error in text translation:', error)
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

    // Return supported languages for translation
    const supportedLanguages = {
      languages: [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'es', name: 'Spanish', nativeName: 'Español' },
        { code: 'fr', name: 'French', nativeName: 'Français' },
        { code: 'de', name: 'German', nativeName: 'Deutsch' },
        { code: 'it', name: 'Italian', nativeName: 'Italiano' },
        { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
        { code: 'zh', name: 'Chinese', nativeName: '中文' },
        { code: 'ja', name: 'Japanese', nativeName: '日本語' },
        { code: 'ko', name: 'Korean', nativeName: '한국어' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
      ],
      features: {
        autoDetection: true,
        maxCharacters: 10000,
        supportedFormats: ['text', 'html']
      }
    }

    return NextResponse.json({ success: true, data: supportedLanguages })
  } catch (error) {
    console.error('Error getting supported languages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}