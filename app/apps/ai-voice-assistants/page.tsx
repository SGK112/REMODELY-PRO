'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
    ArrowLeft, Phone, PhoneCall, Mic, MicOff, Volume2, VolumeX,
    MessageSquare, Send, Loader2, User, Bot, Settings, Star,
    Brain, Zap, Construction, Palette, Users, CheckCircle, Play, Pause
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

interface Message {
    role: 'user' | 'assistant'
    message: string
    timestamp: Date
    agent: 'david' | 'sarah'
}

interface VoiceAssistant {
    id: 'david' | 'sarah'
    name: string
    role: string
    expertise: string[]
    color: string
    icon: any
    description: string
    phone: string
}

const assistants: VoiceAssistant[] = [
    {
        id: 'david',
        name: 'David',
        role: 'Project Manager',
        expertise: ['Construction Project Management', 'Team Coordination', 'Multi-language Communication', 'Safety Protocols'],
        color: 'blue',
        icon: Construction,
        description: 'Expert project manager specializing in construction coordination and team communication.',
        phone: '+1-602-DAVID-01'
    },
    {
        id: 'sarah',
        name: 'Sarah',
        role: 'Interior Designer',
        expertise: ['Interior Design', 'Color Coordination', 'Space Planning', 'Furniture Selection', 'Style Matching'],
        color: 'purple',
        icon: Palette,
        description: 'Creative interior designer helping you transform spaces into beautiful, functional environments.',
        phone: '+1-602-SARAH-01'
    }
]

export default function AIVoiceAssistants() {
    const [selectedAssistant, setSelectedAssistant] = useState<VoiceAssistant | null>(null)
    const [conversations, setConversations] = useState<Record<string, Message[]>>({
        david: [],
        sarah: []
    })
    const [conversationIds, setConversationIds] = useState<Record<string, string>>({})
    const [messageInput, setMessageInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
    const [isOnCall, setIsOnCall] = useState(false)
    const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle')

    const audioRef = useRef<HTMLAudioElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            const recognitionInstance = new SpeechRecognition()

            recognitionInstance.continuous = true
            recognitionInstance.interimResults = true
            recognitionInstance.lang = 'en-US'

            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                let finalTranscript = ''

                for (let i = event.results.length - 1; i >= 0; i--) {
                    if (event.results[i].isFinal) {
                        finalTranscript = event.results[i][0].transcript
                        break
                    }
                }

                if (finalTranscript) {
                    setMessageInput(finalTranscript)
                    setIsListening(false)
                    recognitionInstance.stop()
                }
            }

            recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error)
                setIsListening(false)
            }

            recognitionInstance.onend = () => {
                setIsListening(false)
            }

            setRecognition(recognitionInstance)
        }
    }, [])

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [conversations, selectedAssistant])

    const startListening = () => {
        if (recognition) {
            setIsListening(true)
            recognition.start()
        }
    }

    const stopListening = () => {
        if (recognition) {
            setIsListening(false)
            recognition.stop()
        }
    }

    const speakResponse = async (text: string, assistantId: 'david' | 'sarah') => {
        setIsSpeaking(true)

        try {
            const response = await fetch(`/api/voice/${assistantId}-agent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    conversationId: conversationIds[assistantId],
                    requestType: 'tts-only'
                }),
            })

            if (response.ok) {
                const data = await response.json()
                if (data.audioUrl && audioRef.current) {
                    audioRef.current.src = data.audioUrl
                    audioRef.current.onended = () => setIsSpeaking(false)
                    await audioRef.current.play()
                }
            } else {
                // Fallback to browser TTS
                const utterance = new SpeechSynthesisUtterance(text)
                utterance.onend = () => setIsSpeaking(false)
                speechSynthesis.speak(utterance)
            }
        } catch (error) {
            console.error('Error speaking response:', error)
            // Fallback to browser TTS
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.onend = () => setIsSpeaking(false)
            speechSynthesis.speak(utterance)
        }
    }

    const sendMessage = async () => {
        if (!messageInput.trim() || !selectedAssistant || isLoading) return

        setIsLoading(true)
        const userMessage = messageInput.trim()
        setMessageInput('')

        // Add user message to conversation
        const newUserMessage: Message = {
            role: 'user',
            message: userMessage,
            timestamp: new Date(),
            agent: selectedAssistant.id
        }

        setConversations(prev => ({
            ...prev,
            [selectedAssistant.id]: [...prev[selectedAssistant.id], newUserMessage]
        }))

        try {
            const response = await fetch(`/api/voice/${selectedAssistant.id}-agent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationId: conversationIds[selectedAssistant.id]
                }),
            })

            if (!response.ok) {
                throw new Error(`Failed to communicate with ${selectedAssistant.name}`)
            }

            const data = await response.json()

            // Update conversation ID if new
            if (data.conversationId && !conversationIds[selectedAssistant.id]) {
                setConversationIds(prev => ({
                    ...prev,
                    [selectedAssistant.id]: data.conversationId
                }))
            }

            // Add assistant's response
            const assistantMessage: Message = {
                role: 'assistant',
                message: data.response || data.fallback || "I'm sorry, I didn't catch that. Could you please repeat?",
                timestamp: new Date(),
                agent: selectedAssistant.id
            }

            setConversations(prev => ({
                ...prev,
                [selectedAssistant.id]: [...prev[selectedAssistant.id], assistantMessage]
            }))

            // Auto-play assistant's response
            if (data.audioUrl && audioRef.current) {
                audioRef.current.src = data.audioUrl
                audioRef.current.onended = () => setIsSpeaking(false)
                setIsSpeaking(true)
                audioRef.current.play()
            }

        } catch (error) {
            console.error(`Error communicating with ${selectedAssistant.name}:`, error)

            const errorMessage: Message = {
                role: 'assistant',
                message: `Sorry, I'm having trouble connecting right now. As your ${selectedAssistant.role.toLowerCase()}, I'm here to help. Please try again in a moment.`,
                timestamp: new Date(),
                agent: selectedAssistant.id
            }

            setConversations(prev => ({
                ...prev,
                [selectedAssistant.id]: [...prev[selectedAssistant.id], errorMessage]
            }))
        } finally {
            setIsLoading(false)
        }
    }

    const makeCall = async (assistant: VoiceAssistant) => {
        setCallStatus('connecting')
        setIsOnCall(true)

        try {
            const response = await fetch('/api/voice/make-call', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assistant: assistant.id,
                    userPhoneNumber: '+14802555887' // This would come from user profile
                }),
            })

            if (response.ok) {
                const data = await response.json()
                setCallStatus('connected')

                // Show call interface
                setTimeout(() => {
                    setCallStatus('ended')
                    setIsOnCall(false)
                }, 30000) // Auto-end demo call after 30 seconds
            } else {
                throw new Error('Failed to initiate call')
            }
        } catch (error) {
            console.error('Error making call:', error)
            setCallStatus('ended')
            setIsOnCall(false)
        }
    }

    const endCall = () => {
        setCallStatus('ended')
        setIsOnCall(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    if (!selectedAssistant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/dashboard/customer"
                                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5 mr-2" />
                                    Dashboard
                                </Link>
                                <div className="h-6 w-px bg-gray-300" />
                                <h1 className="text-xl font-semibold text-gray-900">AI Voice Assistants</h1>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="flex items-center text-sm text-green-600">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    All Systems Online
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                                <Brain className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            AI Voice Assistants
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Talk to our specialized AI assistants for expert help with your construction and design projects.
                            Chat or call directly for real-time assistance.
                        </p>
                    </div>

                    {/* Assistants Grid */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {assistants.map((assistant) => {
                            const IconComponent = assistant.icon
                            const colorClasses = {
                                blue: {
                                    bg: 'bg-blue-50',
                                    border: 'border-blue-200',
                                    icon: 'bg-blue-500',
                                    button: 'bg-blue-600 hover:bg-blue-700',
                                    callButton: 'bg-green-600 hover:bg-green-700'
                                },
                                purple: {
                                    bg: 'bg-purple-50',
                                    border: 'border-purple-200',
                                    icon: 'bg-purple-500',
                                    button: 'bg-purple-600 hover:bg-purple-700',
                                    callButton: 'bg-green-600 hover:bg-green-700'
                                }
                            }[assistant.color] || {
                                bg: 'bg-gray-50',
                                border: 'border-gray-200',
                                icon: 'bg-gray-500',
                                button: 'bg-gray-600 hover:bg-gray-700',
                                callButton: 'bg-green-600 hover:bg-green-700'
                            }

                            return (
                                <div
                                    key={assistant.id}
                                    className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
                                >
                                    {/* Assistant Header */}
                                    <div className="flex items-center mb-4">
                                        <div className={`${colorClasses.icon} p-3 rounded-full mr-4`}>
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{assistant.name}</h3>
                                            <p className="text-gray-600">{assistant.role}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 mb-4">{assistant.description}</p>

                                    {/* Expertise */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {assistant.expertise.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-white rounded-full text-xs text-gray-700 border border-gray-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setSelectedAssistant(assistant)}
                                            className={`w-full ${colorClasses.button} text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center`}
                                        >
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Start Chat
                                        </button>

                                        <button
                                            onClick={() => makeCall(assistant)}
                                            className={`w-full ${colorClasses.callButton} text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center`}
                                        >
                                            <Phone className="h-4 w-4 mr-2" />
                                            Call {assistant.phone}
                                        </button>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-gray-900">24/7</div>
                                            <div className="text-xs text-gray-600">Available</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center">
                                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                                <span className="text-lg font-bold text-gray-900">4.9</span>
                                            </div>
                                            <div className="text-xs text-gray-600">Rating</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-gray-900">1k+</div>
                                            <div className="text-xs text-gray-600">Chats</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Features */}
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <Phone className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Calls</h3>
                            <p className="text-gray-600">Call directly and have natural conversations with our AI assistants.</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <Zap className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Response</h3>
                            <p className="text-gray-600">Get immediate expert advice and guidance for your projects.</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <Users className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Specialized Experts</h3>
                            <p className="text-gray-600">Each assistant is trained in their specific field of expertise.</p>
                        </div>
                    </div>
                </div>

                {/* Call Modal */}
                {isOnCall && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="mb-4">
                                    <Phone className="h-12 w-12 text-green-600 mx-auto" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {callStatus === 'connecting' ? 'Connecting...' :
                                        callStatus === 'connected' ? 'Connected' : 'Call Ended'}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {callStatus === 'connecting' ? 'Connecting to assistant...' :
                                        callStatus === 'connected' ? 'You are now connected with the AI assistant.' :
                                            'Call has ended. Thank you!'}
                                </p>

                                {callStatus === 'connected' && (
                                    <button
                                        onClick={endCall}
                                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                                    >
                                        End Call
                                    </button>
                                )}

                                {callStatus === 'ended' && (
                                    <button
                                        onClick={() => setIsOnCall(false)}
                                        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    // Chat Interface
    const currentConversation = conversations[selectedAssistant.id] || []
    const colorClasses = {
        blue: {
            header: 'bg-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700',
            userBubble: 'bg-blue-600',
            assistantBubble: 'bg-gray-100'
        },
        purple: {
            header: 'bg-purple-600',
            button: 'bg-purple-600 hover:bg-purple-700',
            userBubble: 'bg-purple-600',
            assistantBubble: 'bg-gray-100'
        }
    }[selectedAssistant.color] || {
        header: 'bg-gray-600',
        button: 'bg-gray-600 hover:bg-gray-700',
        userBubble: 'bg-gray-600',
        assistantBubble: 'bg-gray-100'
    }

    const IconComponent = selectedAssistant.icon

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Chat Header */}
            <div className={`${colorClasses.header} text-white p-4`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setSelectedAssistant(null)}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                        <div className="bg-white bg-opacity-20 p-2 rounded-full">
                            <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{selectedAssistant.name}</h1>
                            <p className="text-sm opacity-90">{selectedAssistant.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => makeCall(selectedAssistant)}
                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors"
                        >
                            <PhoneCall className="h-5 w-5" />
                        </button>
                        <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors">
                            <Settings className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <IconComponent className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Start a conversation with {selectedAssistant.name}
                        </h3>
                        <p className="text-gray-600">
                            Ask anything about {selectedAssistant.role.toLowerCase()} topics. I'm here to help!
                        </p>
                    </div>
                )}

                {currentConversation.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                                    ? `${colorClasses.userBubble} text-white`
                                    : `${colorClasses.assistantBubble} text-gray-900`
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{message.message}</p>
                            <p className="text-xs mt-1 opacity-70">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className={`${colorClasses.assistantBubble} px-4 py-2 rounded-lg flex items-center space-x-2`}>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-gray-600">Thinking...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                        <textarea
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={`Ask ${selectedAssistant.name} anything...`}
                            className="w-full resize-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={1}
                            style={{ minHeight: '42px', maxHeight: '120px' }}
                        />
                    </div>

                    <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={isLoading}
                        className={`p-2 rounded-lg transition-colors ${isListening
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                    >
                        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>

                    <button
                        onClick={sendMessage}
                        disabled={!messageInput.trim() || isLoading}
                        className={`${colorClasses.button} disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors`}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>

                {isListening && (
                    <div className="mt-2 text-center">
                        <span className="text-sm text-gray-600 flex items-center justify-center">
                            <Mic className="h-4 w-4 mr-1 text-red-600" />
                            Listening... Speak now
                        </span>
                    </div>
                )}

                {isSpeaking && (
                    <div className="mt-2 text-center">
                        <span className="text-sm text-gray-600 flex items-center justify-center">
                            <Volume2 className="h-4 w-4 mr-1 text-blue-600" />
                            {selectedAssistant.name} is speaking...
                        </span>
                    </div>
                )}
            </div>

            {/* Audio element for TTS */}
            <audio ref={audioRef} className="hidden" />

            {/* Call Modal */}
            {isOnCall && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="mb-4">
                                <Phone className="h-12 w-12 text-green-600 mx-auto" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {callStatus === 'connecting' ? 'Connecting...' :
                                    callStatus === 'connected' ? `Connected with ${selectedAssistant.name}` : 'Call Ended'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {callStatus === 'connecting' ? `Connecting to ${selectedAssistant.name}...` :
                                    callStatus === 'connected' ? `You are now talking with ${selectedAssistant.name}, your ${selectedAssistant.role.toLowerCase()}.` :
                                        'Call has ended. Thank you for using our AI voice assistant!'}
                            </p>

                            {callStatus === 'connected' && (
                                <div className="space-y-3">
                                    <div className="flex justify-center space-x-4">
                                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition-colors">
                                            <MicOff className="h-5 w-5" />
                                        </button>
                                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition-colors">
                                            <VolumeX className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={endCall}
                                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                                    >
                                        End Call
                                    </button>
                                </div>
                            )}

                            {callStatus === 'ended' && (
                                <button
                                    onClick={() => setIsOnCall(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
