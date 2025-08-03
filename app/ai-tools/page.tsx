'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {
    Bot,
    MessageSquare,
    Camera,
    Calculator,
    Palette,
    Phone,
    Zap,
    Settings,
    TestTube,
    Activity
} from 'lucide-react'

export default function AIToolsTestPage() {
    const { data: session, status } = useSession()
    const [testResults, setTestResults] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const addResult = (result: string) => {
        setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
    }

    const testAIChat = async () => {
        setLoading(true)
        addResult('🤖 Testing AI Chat API...')

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'I need help finding a contractor for kitchen renovation in Phoenix',
                    userLocation: 'Phoenix, AZ',
                    projectType: 'Kitchen Remodeling'
                })
            })

            const data = await response.json()

            if (response.ok) {
                addResult('✅ AI Chat API working!')
                addResult(`💬 Response: ${data.message?.substring(0, 100)}...`)
            } else {
                addResult(`❌ AI Chat API failed: ${data.error}`)
            }
        } catch (error) {
            addResult(`❌ AI Chat API error: ${error}`)
        }

        setLoading(false)
    }

    const testSmartQuote = async () => {
        setLoading(true)
        addResult('💰 Testing Smart Quote API...')

        try {
            const response = await fetch('/api/ai-services/smart-quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectType: 'Kitchen Renovation',
                    roomSize: '12x15',
                    materials: ['Quartz Countertops', 'Hardwood Cabinets'],
                    location: 'Phoenix, AZ',
                    timeline: '4-6 weeks'
                })
            })

            const data = await response.json()

            if (response.ok) {
                addResult('✅ Smart Quote API working!')
                addResult(`💰 Estimated cost: $${data.estimatedCost || 'N/A'}`)
            } else {
                addResult(`❌ Smart Quote API failed: ${data.error}`)
            }
        } catch (error) {
            addResult(`❌ Smart Quote API error: ${error}`)
        }

        setLoading(false)
    }

    const testImageRecognition = async () => {
        setLoading(true)
        addResult('📷 Testing Image Recognition API...')

        try {
            const response = await fetch('/api/ai-services/image-recognition', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3',
                    analysisType: 'kitchen-countertop'
                })
            })

            const data = await response.json()

            if (response.ok) {
                addResult('✅ Image Recognition API working!')
                addResult(`🔍 Analysis: ${data.analysis?.substring(0, 100)}...`)
            } else {
                addResult(`❌ Image Recognition API failed: ${data.error}`)
            }
        } catch (error) {
            addResult(`❌ Image Recognition API error: ${error}`)
        }

        setLoading(false)
    }

    const testVoiceAPI = async () => {
        setLoading(true)
        addResult('🎤 Testing Voice API...')

        try {
            const response = await fetch('/api/voice/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'test-connection',
                    phoneNumber: '+15551234567'
                })
            })

            const data = await response.json()

            if (response.ok) {
                addResult('✅ Voice API working!')
                addResult(`📞 Status: ${data.status}`)
            } else {
                addResult(`❌ Voice API failed: ${data.error}`)
            }
        } catch (error) {
            addResult(`❌ Voice API error: ${error}`)
        }

        setLoading(false)
    }

    const testAIDesigner = async () => {
        setLoading(true)
        addResult('🎨 Testing AI Designer API...')

        try {
            const response = await fetch('/api/ai-designer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomType: 'kitchen',
                    style: 'modern',
                    colorScheme: 'neutral',
                    budget: 15000
                })
            })

            const data = await response.json()

            if (response.ok) {
                addResult('✅ AI Designer API working!')
                addResult(`🎨 Design suggestions generated`)
            } else {
                addResult(`❌ AI Designer API failed: ${data.error}`)
            }
        } catch (error) {
            addResult(`❌ AI Designer API error: ${error}`)
        }

        setLoading(false)
    }

    const testAllAPIs = async () => {
        addResult('🚀 Running comprehensive AI API test suite...')
        await testAIChat()
        await testSmartQuote()
        await testImageRecognition()
        await testVoiceAPI()
        await testAIDesigner()
        addResult('🎉 All API tests completed!')
    }

    const clearResults = () => {
        setTestResults([])
    }

    if (!mounted) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-lg">Loading...</div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">🤖 REMODELY AI Tools Testing Suite</h1>

                {/* Auth Status */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${status === 'authenticated' ? 'bg-green-100 text-green-800' :
                                status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                            }`}>
                            {status}
                        </span>
                        <span>{session?.user?.email || 'Not logged in'}</span>
                        <span className="text-gray-500">({session?.user?.userType || 'N/A'})</span>
                    </div>
                </div>

                {/* AI API Tests */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">🤖 AI Service Tests</h2>
                        <div className="space-y-3">
                            <button
                                onClick={testAIChat}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Test AI Chat
                            </button>

                            <button
                                onClick={testSmartQuote}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                            >
                                <Calculator className="w-4 h-4" />
                                Test Smart Quote
                            </button>

                            <button
                                onClick={testImageRecognition}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
                            >
                                <Camera className="w-4 h-4" />
                                Test Image Recognition
                            </button>

                            <button
                                onClick={testVoiceAPI}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:bg-gray-400"
                            >
                                <Phone className="w-4 h-4" />
                                Test Voice API
                            </button>

                            <button
                                onClick={testAIDesigner}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:bg-gray-400"
                            >
                                <Palette className="w-4 h-4" />
                                Test AI Designer
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">🚀 Quick Actions</h2>
                        <div className="space-y-3">
                            <button
                                onClick={testAllAPIs}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-400"
                            >
                                <Zap className="w-4 h-4" />
                                {loading ? 'Running Tests...' : 'Test All APIs'}
                            </button>

                            <button
                                onClick={clearResults}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Clear Results
                            </button>

                            <div className="pt-4 border-t">
                                <h3 className="font-semibold mb-2">🔗 Direct Access Links</h3>
                                <div className="space-y-2 text-sm">
                                    <a href="/voice-consultation" className="block text-blue-600 hover:underline">
                                        🎤 Voice Consultation Demo
                                    </a>
                                    <a href="/dashboard/contractor/tools" className="block text-green-600 hover:underline">
                                        🔨 Contractor AI Tools
                                    </a>
                                    <a href="/api/ai-health" className="block text-purple-600 hover:underline">
                                        📊 AI Health Check
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Test Results */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">🧪 Test Results</h2>
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
                        {testResults.length === 0 ? (
                            <p className="text-gray-400">No test results yet. Click a test button above to start.</p>
                        ) : (
                            <div className="space-y-1">
                                {testResults.map((result, index) => (
                                    <div key={index}>{result}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* API Documentation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">📚 Available AI APIs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-blue-800 text-sm">
                        <div>
                            <h3 className="font-bold mb-2">/api/ai</h3>
                            <p>Smart contractor matching and chat AI</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">/api/ai-services/smart-quote</h3>
                            <p>AI-powered project cost estimation</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">/api/ai-services/image-recognition</h3>
                            <p>Analyze project photos and materials</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">/api/voice/*</h3>
                            <p>Voice consultation and Twilio integration</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">/api/ai-designer</h3>
                            <p>AI interior design suggestions</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">/api/ai-health</h3>
                            <p>Health check for all AI services</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
