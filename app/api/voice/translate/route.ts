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
    const { text, targetLanguage, sourceLanguage = 'auto', format = 'text' } = body

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    // Validate language codes
    const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar']
    if (!supportedLanguages.includes(targetLanguage)) {
      return NextResponse.json(
        { error: 'Unsupported target language' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use Google Translate API
    // For now, we'll return construction-specific mock translations
    const constructionTranslations: Record<string, Record<string, string>> = {
      'es': {
        'bathroom remodel': 'remodelación de baño',
        'kitchen renovation': 'renovación de cocina',
        'home improvement': 'mejoras para el hogar',
        'contractor': 'contratista',
        'quote': 'cotización'
      },
      'fr': {
        'bathroom remodel': 'rénovation de salle de bain',
        'kitchen renovation': 'rénovation de cuisine',
        'home improvement': 'amélioration de la maison',
        'contractor': 'entrepreneur',
        'quote': 'devis'
      }
    }

    let translatedText = text
    if (constructionTranslations[targetLanguage]) {
      const translations = constructionTranslations[targetLanguage]
      Object.keys(translations).forEach(key => {
        translatedText = translatedText.replace(new RegExp(key, 'gi'), translations[key])
      })
    } else {
      translatedText = `[${targetLanguage.toUpperCase()}] ${text}`
    }

    const translationResult = {
      originalText: text,
      translatedText,
      sourceLanguage: sourceLanguage === 'auto' ? 'en' : sourceLanguage,
      targetLanguage,
      format,
      confidence: 0.92,
      timestamp: new Date().toISOString(),
      service: 'Remodely Translation Service'
    }

    return NextResponse.json({ 
      success: true, 
      data: translationResult,
      message: 'Translation completed successfully'
    })
  } catch (error) {
    console.error('Error in translation service:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Public endpoint for translation capabilities
    const translationInfo = {
      service: 'Remodely Translation API',
      version: '1.0.0',
      supportedLanguages: [
        'en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar'
      ],
      specializations: [
        'Construction terminology',
        'Home renovation phrases',
        'Contractor communication',
        'Project descriptions'
      ],
      features: {
        autoLanguageDetection: true,
        contextAwareTranslation: true,
        constructionTerminology: true
      },
      limits: {
        maxTextLength: 5000,
        requestsPerMinute: 100
      }
    }

    return NextResponse.json({ success: true, data: translationInfo })
  } catch (error) {
    console.error('Error getting translation info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}