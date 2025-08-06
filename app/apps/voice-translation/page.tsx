'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench } from 'lucide-react'

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Voice Translation
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Real-time voice translation for multilingual home consultations
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Wrench className="mx-auto h-16 w-16 text-blue-400 mb-4" />
            <CardTitle className="text-2xl text-white">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-blue-200">
              This feature is currently under development and will be available soon.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
    Mic, ArrowLeft, Volume2, VolumeX, Globe, Wifi, WifiOff,
    Languages, Zap, Shield, Star, Loader2, Send, RotateCcw
} from 'lucide-react'

// TypeScript declaration for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any
        webkitSpeechRecognition: any
    }
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    start(): void
    stop(): void
    abort(): void
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string
}

interface SpeechRecognitionResultList {
    length: number
    item(index: number): SpeechRecognitionResult
    [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
    length: number
    item(index: number): SpeechRecognitionAlternative
    [index: number]: SpeechRecognitionAlternative
    isFinal: boolean
}

interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
}

// Supported languages
const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
]

export default function VoiceTranslationApp() {
    const [isListening, setIsListening] = useState(false)
    const [isOffline, setIsOffline] = useState(false)
    const [sourceLanguage, setSourceLanguage] = useState('en')
    const [targetLanguage, setTargetLanguage] = useState('es')
    const [currentText, setCurrentText] = useState('')
    const [translatedText, setTranslatedText] = useState('')
    const [isTranslating, setIsTranslating] = useState(false)
    const [audioLevel, setAudioLevel] = useState(0)
    const [conversationHistory, setConversationHistory] = useState<Array<{
        source: string
        target: string
        sourceText: string
        targetText: string
        timestamp: Date
    }>>([])
    const [isPlayingSource, setIsPlayingSource] = useState(false)
    const [isPlayingTarget, setIsPlayingTarget] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState<'source' | 'target' | null>(null)
    const [textInput, setTextInput] = useState('')
    const [isTranslatingText, setIsTranslatingText] = useState(false)

    const recognition = useRef<SpeechRecognition | null>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    const getLanguageCode = (code: string) => {
        const codeMap: Record<string, string> = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'pt': 'pt-PT',
            'it': 'it-IT',
            'pl': 'pl-PL',
            'ru': 'ru-RU',
            'zh': 'zh-CN',
            'ja': 'ja-JP',
            'ko': 'ko-KR',
            'ar': 'ar-SA'
        }
        return codeMap[code] || 'en-US'
    }

    // Handle text translation using Google Cloud Translation
    const handleTextTranslation = async () => {
        if (!textInput.trim()) {
            return
        }

        setIsTranslatingText(true)
        setCurrentText(textInput)

        try {
            // Call Google Cloud Translation API
            const response = await fetch('/api/voice/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: textInput,
                    sourceLanguage,
                    targetLanguage
                }),
            })

            if (!response.ok) {
                throw new Error('Translation failed')
            }

            const data = await response.json()

            setTimeout(() => {
                setTranslatedText(data.translatedText)
                setIsTranslatingText(false)

                // Add to conversation history
                setConversationHistory(prev => [...prev, {
                    source: sourceLanguage,
                    target: targetLanguage,
                    sourceText: textInput,
                    targetText: data.translatedText,
                    timestamp: new Date()
                }])

                setTextInput('') // Clear input after translation
            }, 1000)

        } catch (error) {
            console.error('Translation error:', error)
            setIsTranslatingText(false)
            alert('Translation failed. Please try again.')
        }
    }

    // Voice recognition for translation
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser')
            return
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognitionInstance = new SpeechRecognition()

        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = getLanguageCode(sourceLanguage)

        recognitionInstance.onstart = () => {
            setIsListening(true)
            setCurrentText('')
            setTranslatedText('')
        }

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript
            setCurrentText(transcript)
            setIsListening(false)
            setIsTranslating(true)

            // Automatically translate the recognized text
            translateText(transcript)
        }

        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error)
            setIsListening(false)
        }

        recognitionInstance.onend = () => {
            setIsListening(false)
        }

        recognition.current = recognitionInstance
        recognitionInstance.start()
    }

    const stopListening = () => {
        if (recognition.current) {
            recognition.current.stop()
            setIsListening(false)
        }
    }

    const translateText = async (text: string) => {
        try {
            const response = await fetch('/api/voice/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    sourceLanguage,
                    targetLanguage
                }),
            })

            if (!response.ok) {
                throw new Error('Translation failed')
            }

            const data = await response.json()

            setTimeout(() => {
                setTranslatedText(data.translatedText)
                setIsTranslating(false)

                // Add to conversation history
                setConversationHistory(prev => [...prev, {
                    source: sourceLanguage,
                    target: targetLanguage,
                    sourceText: text,
                    targetText: data.translatedText,
                    timestamp: new Date()
                }])
            }, 1000)

        } catch (error) {
            console.error('Translation error:', error)
            setIsTranslating(false)
            alert('Translation failed. Please try again.')
        }
    }

    const swapLanguages = () => {
        const temp = sourceLanguage
        setSourceLanguage(targetLanguage)
        setTargetLanguage(temp)
    }

    const getLanguageName = (code: string) => {
        return supportedLanguages.find(lang => lang.code === code)?.name || 'Unknown'
    }

    const getLanguageFlag = (code: string) => {
        return supportedLanguages.find(lang => lang.code === code)?.flag || '🏳️'
    }

    const playText = async (text: string, language: string, type: 'source' | 'target') => {
        setLoadingAudio(type)

        try {
            // Use Web Speech API for text-to-speech
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = getLanguageCode(language)
            utterance.rate = 0.9

            utterance.onstart = () => {
                setLoadingAudio(null)
                if (type === 'source') {
                    setIsPlayingSource(true)
                } else {
                    setIsPlayingTarget(true)
                }
            }

            utterance.onend = () => {
                if (type === 'source') {
                    setIsPlayingSource(false)
                } else {
                    setIsPlayingTarget(false)
                }
                setLoadingAudio(null)
            }

            utterance.onerror = () => {
                setLoadingAudio(null)
                if (type === 'source') {
                    setIsPlayingSource(false)
                } else {
                    setIsPlayingTarget(false)
                }
            }

            speechSynthesis.speak(utterance)

        } catch (error) {
            console.error('TTS error:', error)
            setLoadingAudio(null)
        }
    }

    const clearHistory = () => {
        setConversationHistory([])
        setCurrentText('')
        setTranslatedText('')
    }

    // Simulate audio level animation while listening
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isListening) {
            interval = setInterval(() => {
                setAudioLevel(Math.random() * 100)
            }, 100)
        } else {
            setAudioLevel(0)
        }
        return () => clearInterval(interval)
    }, [isListening])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </Link>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Languages className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-gray-900">Voice Translator</h1>
                                    <p className="text-xs text-gray-500">Google Cloud Translation</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsOffline(!isOffline)}
                                className={`p-2 rounded-lg transition-colors ${isOffline ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                            >
                                {isOffline ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
                            </button>
                            <button
                                onClick={clearHistory}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Clear conversation history"
                            >
                                <RotateCcw className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-8 pb-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            <Globe className="h-4 w-4" />
                            <span>Google Cloud Translation</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Professional Translation
                            <span className="block text-blue-400">Powered by Google AI</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                            Accurate voice and text translation with construction-specific terminology support.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">12+</div>
                            <div className="text-gray-400 text-xs">Languages</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">99%</div>
                            <div className="text-gray-400 text-xs">Accuracy</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">Real-time</div>
                            <div className="text-gray-400 text-xs">Speed</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Language Selection */}
            <section className="pb-6 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 text-center">Select Languages</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                            {/* Source Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
                                <select
                                    value={sourceLanguage}
                                    onChange={(e) => setSourceLanguage(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    {supportedLanguages.map((lang) => (
                                        <option key={lang.code} value={lang.code} className="bg-gray-800">
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Swap Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={swapLanguages}
                                    className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors text-white"
                                    title="Swap languages"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Target Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
                                <select
                                    value={targetLanguage}
                                    onChange={(e) => setTargetLanguage(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    {supportedLanguages.map((lang) => (
                                        <option key={lang.code} value={lang.code} className="bg-gray-800">
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Voice Translation Section */}
            <section className="pb-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6 text-center">Voice Translation</h3>

                        {/* Voice Input Button */}
                        <div className="text-center mb-6">
                            <button
                                onClick={isListening ? stopListening : startListening}
                                className={`relative w-20 h-20 rounded-full transition-all duration-300 ${isListening
                                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white shadow-lg hover:shadow-xl`}
                                disabled={isTranslating}
                            >
                                <Mic className="h-8 w-8 mx-auto" />
                                {isListening && (
                                    <div className="absolute inset-0 rounded-full border-4 border-white animate-ping" />
                                )}
                            </button>
                            <p className="text-gray-300 text-sm mt-2">
                                {isListening ? 'Listening...' : 'Tap to speak'}
                            </p>
                        </div>

                        {/* Translation Results */}
                        {(currentText || translatedText) && (
                            <div className="space-y-4">
                                {/* Source Text */}
                                {currentText && (
                                    <div className="bg-white/10 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-blue-400 text-sm font-medium">
                                                {getLanguageFlag(sourceLanguage)} {getLanguageName(sourceLanguage)}
                                            </span>
                                            <button
                                                onClick={() => playText(currentText, sourceLanguage, 'source')}
                                                disabled={loadingAudio === 'source' || isPlayingSource}
                                                className="p-1 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                                            >
                                                {loadingAudio === 'source' ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : isPlayingSource ? (
                                                    <VolumeX className="h-4 w-4" />
                                                ) : (
                                                    <Volume2 className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-white">{currentText}</p>
                                    </div>
                                )}

                                {/* Translation Loading */}
                                {isTranslating && (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="flex items-center space-x-3 text-blue-400">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>Translating...</span>
                                        </div>
                                    </div>
                                )}

                                {/* Translated Text */}
                                {translatedText && !isTranslating && (
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-green-400 text-sm font-medium">
                                                {getLanguageFlag(targetLanguage)} {getLanguageName(targetLanguage)}
                                            </span>
                                            <button
                                                onClick={() => playText(translatedText, targetLanguage, 'target')}
                                                disabled={loadingAudio === 'target' || isPlayingTarget}
                                                className="p-1 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                                            >
                                                {loadingAudio === 'target' ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : isPlayingTarget ? (
                                                    <VolumeX className="h-4 w-4" />
                                                ) : (
                                                    <Volume2 className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-white font-medium">{translatedText}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Text Translation Section */}
            <section className="pb-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 text-center">Text Translation</h3>

                        <div className="space-y-4">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !isTranslatingText && handleTextTranslation()}
                                    placeholder={`Type in ${getLanguageName(sourceLanguage)}...`}
                                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleTextTranslation}
                                    disabled={!textInput.trim() || isTranslatingText}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {isTranslatingText ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                    <span>Translate</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conversation History */}
            {conversationHistory.length > 0 && (
                <section className="pb-8 px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-white">Recent Translations</h3>
                                <button
                                    onClick={clearHistory}
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="space-y-4 max-h-64 overflow-y-auto">
                                {conversationHistory.slice(-5).reverse().map((item, index) => (
                                    <div key={index} className="bg-white/5 rounded-lg p-3">
                                        <div className="text-xs text-gray-400 mb-2">
                                            {item.timestamp.toLocaleTimeString()}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-sm">
                                                <span className="text-blue-400">{getLanguageFlag(item.source)}</span>
                                                <span className="text-white ml-2">{item.sourceText}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-green-400">{getLanguageFlag(item.target)}</span>
                                                <span className="text-white ml-2">{item.targetText}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            <section className="py-12 px-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                        Google Cloud Translation Features
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Neural Translation</h3>
                            <p className="text-gray-300 text-sm">Advanced AI-powered translation with context understanding and natural language processing.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                                <Languages className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Multi-Language</h3>
                            <p className="text-gray-300 text-sm">Support for 12+ languages with professional-grade accuracy and industry terminology.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Real-Time Speed</h3>
                            <p className="text-gray-300 text-sm">Lightning-fast translation processing for seamless communication on the job site.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Construction Focus</h3>
                            <p className="text-gray-300 text-sm">Specialized in construction terminology, safety phrases, and technical language.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Professional Translation
                    </h2>
                    <p className="text-lg text-blue-100 mb-8">
                        Powered by Google Cloud AI for accurate, fast, and reliable translation services.
                    </p>

                    <div className="space-y-4">
                        <Link href="/apps/ai-voice-assistants" className="block">
                            <button className="w-full bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Try AI Voice Assistants
                            </button>
                        </Link>

                        <button className="w-full border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                            <Star className="h-5 w-5" />
                            <span>Rate Translation Quality</span>
                        </button>
                    </div>

                    <p className="text-blue-200 mt-6 text-sm">
                        Powered by Google Cloud Translation API • Professional Grade • Construction Optimized
                    </p>
                </div>
            </section>

            {/* Hidden audio element for TTS playback */}
            <audio ref={audioRef} className="hidden" />
        </div>
    )
}
