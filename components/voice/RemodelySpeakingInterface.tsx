'use client'

import { useConversation } from '@elevenlabs/react'
import { useCallback, useState } from 'react'
import { Mic, MicOff, Phone, PhoneOff, Home, Wrench, Calculator } from 'lucide-react'

export function RemodelySpeakingInterface() {
    const [customerName, setCustomerName] = useState('')
    const [projectType, setProjectType] = useState('')

    const conversation = useConversation({
        onConnect: () => {
            console.log('Connected to Sarah, your REMODELY AI renovation consultant')
        },
        onDisconnect: () => {
            console.log('Sarah has ended the consultation')
        },
        onMessage: (message) => {
            console.log('Sarah says:', message)
            // Could analyze message for project details, contractor preferences, etc.
        },
        onError: (error) => {
            console.error('Voice consultation error:', error)
        },
    })

    const startConsultation = useCallback(async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true })

            // Start conversation with REMODELY AI renovation consultant
            await conversation.startSession({
                agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'your-agent-id-here',
                connectionType: 'websocket'
            })
        } catch (error) {
            console.error('Failed to start voice consultation:', error)
            alert('Unable to start voice consultation. Please check microphone permissions.')
        }
    }, [conversation])

    const endConsultation = useCallback(async () => {
        await conversation.endSession()
    }, [conversation])

    const getStatusColor = () => {
        switch (conversation.status) {
            case 'connected':
                return conversation.isSpeaking ? 'border-amber-400 bg-amber-500/20' : 'border-green-400 bg-green-500/20'
            case 'connecting':
                return 'border-blue-400 bg-blue-500/20'
            default:
                return 'border-slate-400 bg-slate-500/20'
        }
    }

    const getButtonColor = () => {
        if (conversation.status === 'connected') {
            return conversation.isSpeaking
                ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/50'
                : 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/50'
        }
        if (conversation.status === 'connecting') {
            return 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/50'
        }
        return 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-500/50'
    }

    return (
        <div className="flex flex-col items-center gap-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 justify-center p-8">

            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    REMODELY<span className="text-amber-600">.AI</span>
                </h1>
                <p className="text-xl text-slate-600 mb-1">Voice Renovation Consultant</p>
                <p className="text-slate-500">Talk directly with Sarah about your project</p>
            </div>

            {/* Main Voice Interface */}
            <div className="relative">

                {/* Animated Rings - Only when connected */}
                {conversation.status === 'connected' && (
                    <div className="absolute inset-0">
                        {/* Speaking Animation (outward waves) */}
                        {conversation.isSpeaking && (
                            <>
                                <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-ping" style={{
                                    width: '280px',
                                    height: '280px',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    animationDuration: '1.5s'
                                }}></div>

                                <div className="absolute inset-0 rounded-full border-2 border-amber-400/60" style={{
                                    width: '220px',
                                    height: '220px',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    animation: 'ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
                                    animationDelay: '0.2s'
                                }}></div>
                            </>
                        )}

                        {/* Listening Animation (gentle pulse) */}
                        {!conversation.isSpeaking && (
                            <>
                                <div className="absolute inset-0 rounded-full border-2 border-green-400/50" style={{
                                    width: '200px',
                                    height: '200px',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    animation: 'reverse-pulse 3s ease-in-out infinite'
                                }}></div>

                                <div className="absolute inset-0 rounded-full border-2 border-green-400/30" style={{
                                    width: '240px',
                                    height: '240px',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    animation: 'reverse-pulse 3s ease-in-out infinite',
                                    animationDelay: '0.5s'
                                }}></div>
                            </>
                        )}
                    </div>
                )}

                {/* Glow Effect */}
                {conversation.status === 'connected' && (
                    <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${conversation.isSpeaking
                            ? 'bg-amber-500/30'
                            : 'bg-green-500/30'
                        }`} style={{
                            width: '160px',
                            height: '160px',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            animationDuration: conversation.isSpeaking ? '1s' : '2.5s'
                        }}></div>
                )}

                {/* Main Voice Button */}
                <button
                    onClick={conversation.status === 'connected' ? endConsultation : startConsultation}
                    className={`relative z-10 w-40 h-40 rounded-full text-white font-semibold transition-all duration-300 shadow-2xl hover:scale-105 ${getButtonColor()}`}
                >
                    <div className="flex flex-col items-center justify-center">
                        {conversation.status === 'connecting' ? (
                            <>
                                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                                <span className="text-sm">Connecting to Sarah...</span>
                            </>
                        ) : (
                            <>
                                <div className={`w-12 h-12 mb-2 ${conversation.status === 'connected' && conversation.isSpeaking ? 'animate-pulse' : ''
                                    }`}>
                                    {conversation.status === 'connected' ? (
                                        conversation.isSpeaking ? (
                                            <Mic className="w-full h-full" />
                                        ) : (
                                            <MicOff className="w-full h-full" />
                                        )
                                    ) : (
                                        <Phone className="w-full h-full" />
                                    )}
                                </div>
                                <span className="text-sm leading-tight">
                                    {conversation.status === 'connected' ? 'End Consultation' : 'Start Voice Consultation'}
                                </span>
                            </>
                        )}
                    </div>
                </button>
            </div>

            {/* Status Display */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${getStatusColor()} ${conversation.status === 'connected' || conversation.status === 'connecting' ? 'animate-pulse' : ''
                        }`}></div>
                    <p className="text-slate-700 font-medium text-lg">
                        {conversation.status === 'connected' ?
                            (conversation.isSpeaking ? 'Sarah is speaking...' : 'Sarah is listening...') :
                            conversation.status === 'connecting' ? 'Connecting to Sarah...' :
                                'Ready to start consultation'
                        }
                    </p>
                </div>

                {conversation.status === 'connected' && (
                    <p className="text-sm text-slate-500 text-center max-w-md">
                        Tell Sarah about your renovation project. She'll help you find the perfect contractors
                        and make your renovation dreams come true!
                    </p>
                )}
            </div>

            {/* Quick Action Buttons */}
            {conversation.status !== 'connected' && (
                <div className="flex flex-wrap gap-3 justify-center max-w-lg">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <Home className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">Kitchen Remodel</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <Wrench className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">Bathroom Renovation</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <Calculator className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">Get Quote</span>
                    </button>
                </div>
            )}

            {/* Custom animations */}
            <style jsx>{`
        @keyframes reverse-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
        }
      `}</style>
        </div>
    )
}
