'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mic, MicOff, Volume2, Languages, ArrowLeftRight } from 'lucide-react'

export default function VoiceTranslatorPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [originalText, setOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' }
  ]

  const handleStartRecording = () => {
    setIsRecording(true)
    // Placeholder for recording logic
    setTimeout(() => {
      setIsRecording(false)
      setOriginalText("Hello, I need help with my kitchen renovation project.")
      handleTranslate("Hello, I need help with my kitchen renovation project.")
    }, 3000)
  }

  const handleTranslate = async (text: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/voice-translation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLanguage,
          targetLanguage
        })
      })

      const data = await response.json()
      if (data.success) {
        setTranslatedText(data.translatedText)
      }
    } catch (error) {
      console.error('Translation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setOriginalText(translatedText)
    setTranslatedText(originalText)
  }

  const playAudio = (text: string) => {
    // Placeholder for text-to-speech
    console.log('Playing audio for:', text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Languages className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Voice Translator Pro</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time voice translation for construction sites and client communication
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Language Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="h-5 w-5 mr-2" />
                Language Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center">
                            <span className="mr-2">{lang.flag}</span>
                            {lang.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={swapLanguages}
                  className="mt-6"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center">
                            <span className="mr-2">{lang.flag}</span>
                            {lang.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice Recording */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Voice Input</CardTitle>
              <CardDescription>
                Tap the microphone to start recording your voice
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                size="lg"
                onClick={handleStartRecording}
                disabled={isRecording || isLoading}
                className={`w-32 h-32 rounded-full ${isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600'
                  }`}
              >
                {isRecording ? (
                  <MicOff className="h-12 w-12 text-white" />
                ) : (
                  <Mic className="h-12 w-12 text-white" />
                )}
              </Button>
              <p className="mt-4 text-gray-600">
                {isRecording ? 'Recording... Speak now!' : 'Tap to start recording'}
              </p>
            </CardContent>
          </Card>

          {/* Translation Results */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Original</span>
                  {originalText && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playAudio(originalText)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  {languages.find(l => l.code === sourceLanguage)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="min-h-[120px] p-4 bg-gray-50 rounded-lg">
                  {originalText ? (
                    <p className="text-gray-900">{originalText}</p>
                  ) : (
                    <p className="text-gray-500 italic">Your speech will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Translation</span>
                  {translatedText && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playAudio(translatedText)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  {languages.find(l => l.code === targetLanguage)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="min-h-[120px] p-4 bg-blue-50 rounded-lg">
                  {isLoading ? (
                    <p className="text-blue-600 italic">Translating...</p>
                  ) : translatedText ? (
                    <p className="text-blue-900">{translatedText}</p>
                  ) : (
                    <p className="text-gray-500 italic">Translation will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Phrases */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Construction Phrases</CardTitle>
              <CardDescription>
                Common phrases for construction and remodeling projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "What is your budget for this project?",
                  "When would you like to start construction?",
                  "Do you have all the necessary permits?",
                  "What materials would you prefer to use?",
                  "How long will this project take?",
                  "Can you show me examples of your work?"
                ].map((phrase, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => {
                      setOriginalText(phrase)
                      handleTranslate(phrase)
                    }}
                    className="justify-start h-auto p-3 text-left"
                  >
                    {phrase}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
