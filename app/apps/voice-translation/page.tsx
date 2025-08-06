'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
    ArrowLeft, Mic, MicOff, Volume2, VolumeX, Languages, Play,
    Pause, RotateCcw, Sparkles, Users, Clock, CheckCircle,
    Globe, MessageSquare, Phone, Headphones, Settings, X
} from 'lucide-react'

// Supported languages database
const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' }
]

interface TranslationResult {
    originalText: string
    translatedText: string
    fromLang: string
    toLang: string
    confidence: number
    timestamp: Date
}

export default function VoiceTranslationApp() {
    const [isListening, setIsListening] = useState(false)
    const [isTranslating, setIsTranslating] = useState(false)
    const [fromLang, setFromLang] = useState('en')
    const [toLang, setToLang] = useState('es')
    const [translations, setTranslations] = useState<TranslationResult[]>([])
    const [currentText, setCurrentText] = useState('')
    const [showDemo, setShowDemo] = useState(false)
    const [volume, setVolume] = useState(0.8)
    const [autoSpeak, setAutoSpeak] = useState(true)

    const startListening = () => {
        setIsListening(true)
        setCurrentText('')
        
        // Simulate voice recognition
        setTimeout(() => {
            simulateTranslation("Hello, I need to discuss the kitchen renovation timeline with you.")
        }, 2000)
    }

    const stopListening = () => {
        setIsListening(false)
    }

    const simulateTranslation = (text: string) => {
        setIsTranslating(true)
        setCurrentText(text)
        
        setTimeout(() => {
            const translations: Record<string, string> = {
                'en_es': 'Hola, necesito discutir contigo el cronograma de renovación de la cocina.',
                'en_fr': 'Bonjour, je dois discuter avec vous du calendrier de rénovation de la cuisine.',
                'en_zh': '你好，我需要和你讨论厨房装修的时间安排。',
                'es_en': 'Hello, I need to discuss the kitchen renovation timeline with you.',
                'demo': getLangName(toLang) === 'Spanish' ? 
                    'Hola, necesito discutir contigo el cronograma de renovación de la cocina.' :
                    'Bonjour, je dois discuter avec vous du calendrier de rénovation de la cuisine.'
            }
            
            const translatedText = translations[`${fromLang}_${toLang}`] || translations['demo']
            
            const newTranslation: TranslationResult = {
                originalText: text,
                translatedText: translatedText,
                fromLang: fromLang,
                toLang: toLang,
                confidence: 98.5,
                timestamp: new Date()
            }
            
            setTranslations(prev => [newTranslation, ...prev])
            setIsTranslating(false)
            setIsListening(false)
            
            if (autoSpeak) {
                speakTranslation(translatedText)
            }
        }, 1500)
    }

    const speakTranslation = (text: string) => {
        // Simulate text-to-speech
        console.log(`Speaking: ${text}`)
    }

    const getLangName = (code: string) => {
        return supportedLanguages.find(lang => lang.code === code)?.name || code
    }

    const getLangFlag = (code: string) => {
        return supportedLanguages.find(lang => lang.code === code)?.flag || '🌐'
    }

    const startDemo = () => {
        setShowDemo(true)
        setFromLang('en')
        setToLang('es')
        simulateTranslation("Hello, I need to discuss the kitchen renovation timeline with you.")
    }

    const swapLanguages = () => {
        const temp = fromLang
        setFromLang(toLang)
        setToLang(temp)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </Link>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                    <Languages className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-gray-900">Voice Translator</h1>
                                    <p className="text-xs text-gray-500">Real-time construction translation</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={startDemo}
                                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center space-x-1"
                            >
                                <Play className="h-4 w-4" />
                                <span>Demo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-8 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="h-4 w-4" />
                            <span>12 Languages Supported</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Break Language Barriers
                            <span className="block text-purple-400">On Every Job Site</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Instantly translate conversations between contractors and homeowners. 
                            Crystal-clear communication in real-time with professional construction terminology.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">12</div>
                            <div className="text-gray-400 text-xs">Languages</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">98%</div>
                            <div className="text-gray-400 text-xs">Accuracy</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">2s</div>
                            <div className="text-gray-400 text-xs">Translation</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Language Selection */}
            <section className="pb-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">Select Languages</h3>
                        
                        <div className="flex items-center justify-between space-x-4">
                            {/* From Language */}
                            <div className="flex-1">
                                <label className="block text-sm text-gray-300 mb-2">From</label>
                                <select 
                                    value={fromLang} 
                                    onChange={(e) => setFromLang(e.target.value)}
                                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    {supportedLanguages.map(lang => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Swap Button */}
                            <button
                                onClick={swapLanguages}
                                className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors mt-6"
                            >
                                <RotateCcw className="h-5 w-5" />
                            </button>

                            {/* To Language */}
                            <div className="flex-1">
                                <label className="block text-sm text-gray-300 mb-2">To</label>
                                <select 
                                    value={toLang} 
                                    onChange={(e) => setToLang(e.target.value)}
                                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    {supportedLanguages.map(lang => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Voice Interface */}
            <section className="pb-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center">
                        
                        {/* Microphone Button */}
                        <div className="mb-8">
                            <button
                                onClick={isListening ? stopListening : startListening}
                                disabled={isTranslating}
                                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                                    isListening 
                                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                        : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-xl'
                                } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isListening ? (
                                    <MicOff className="h-10 w-10 text-white" />
                                ) : (
                                    <Mic className="h-10 w-10 text-white" />
                                )}
                            </button>
                            
                            <h3 className="text-xl font-bold text-white mb-2">
                                {isListening ? 'Listening...' : isTranslating ? 'Translating...' : 'Tap to Speak'}
                            </h3>
                            <p className="text-gray-300">
                                {isListening 
                                    ? `Speaking in ${getLangName(fromLang)}` 
                                    : isTranslating 
                                        ? 'Processing your speech...'
                                        : `Translate from ${getLangName(fromLang)} to ${getLangName(toLang)}`
                                }
                            </p>
                        </div>

                        {/* Current Translation */}
                        {currentText && (
                            <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                                <div className="text-gray-300 text-sm mb-2">{getLangFlag(fromLang)} {getLangName(fromLang)}</div>
                                <div className="text-white">{currentText}</div>
                            </div>
                        )}

                        {/* Demo Button */}
                        {!isListening && !isTranslating && translations.length === 0 && (
                            <button
                                onClick={startDemo}
                                className="w-full border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Play className="h-5 w-5" />
                                <span>Try Demo Translation</span>
                            </button>
                        )}

                        {/* Settings */}
                        <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-white/10">
                            <label className="flex items-center space-x-2 text-sm text-gray-300">
                                <input 
                                    type="checkbox" 
                                    checked={autoSpeak} 
                                    onChange={(e) => setAutoSpeak(e.target.checked)}
                                    className="rounded"
                                />
                                <span>Auto-speak translations</span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Translation History */}
            {translations.length > 0 && (
                <section className="pb-12 px-4">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">Translation History</h3>
                        
                        <div className="space-y-4">
                            {translations.map((translation, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-gray-300 text-sm">
                                                    {getLangFlag(translation.fromLang)} {getLangName(translation.fromLang)}
                                                </span>
                                                <div className="text-xs text-gray-500">
                                                    {translation.confidence}% confidence
                                                </div>
                                            </div>
                                            <div className="text-white">{translation.originalText}</div>
                                        </div>
                                        
                                        <div className="border-l-2 border-purple-500 pl-4">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-gray-300 text-sm">
                                                    {getLangFlag(translation.toLang)} {getLangName(translation.toLang)}
                                                </span>
                                                <button 
                                                    onClick={() => speakTranslation(translation.translatedText)}
                                                    className="p-1 text-purple-400 hover:text-purple-300"
                                                >
                                                    <Volume2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="text-purple-300 font-medium">{translation.translatedText}</div>
                                        </div>
                                        
                                        <div className="text-xs text-gray-500 text-right">
                                            {translation.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            <section className="pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-white text-center mb-8">Perfect for Construction Teams</h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
                            <Users className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                            <h4 className="font-semibold text-white mb-2">Team Communication</h4>
                            <p className="text-gray-300 text-sm">Connect diverse crews and homeowners seamlessly</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
                            <Clock className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                            <h4 className="font-semibold text-white mb-2">Real-time</h4>
                            <p className="text-gray-300 text-sm">Instant translations for urgent job site needs</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
                            <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                            <h4 className="font-semibold text-white mb-2">Construction Focus</h4>
                            <p className="text-gray-300 text-sm">Optimized for renovation and building terminology</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
