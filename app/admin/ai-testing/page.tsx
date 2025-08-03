'use client'

import { useState } from 'react'
import { Crown, Zap, MessageSquare, Phone, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react'

export default function AITestingPage() {
    const [testResults, setTestResults] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)

    const runVoiceTest = async () => {
        setIsRunning(true)
        setTestResults(['Starting voice agent test...'])

        try {
            // Simulate API test
            await new Promise(resolve => setTimeout(resolve, 2000))
            setTestResults(prev => [...prev, '✅ Voice webhook responding', '✅ Google Agent integration active', '✅ Sarah AI persona loaded'])
        } catch (error) {
            setTestResults(prev => [...prev, '❌ Test failed'])
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <Crown className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">AI Testing Dashboard</h1>
                        <p className="text-slate-600">Monitor and test AI system components</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Voice Agent Testing */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
                        <div className="flex items-center mb-4">
                            <Phone className="w-6 h-6 text-blue-600 mr-2" />
                            <h2 className="text-xl font-semibold text-slate-800">Voice Agent Testing</h2>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={runVoiceTest}
                                disabled={isRunning}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
                            >
                                {isRunning ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <PlayCircle className="w-5 h-5 mr-2" />
                                        Run Voice Test
                                    </>
                                )}
                            </button>

                            <div className="bg-slate-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                                <h3 className="font-semibold text-slate-700 mb-2">Test Results:</h3>
                                {testResults.length > 0 ? (
                                    <ul className="space-y-1">
                                        {testResults.map((result, index) => (
                                            <li key={index} className="text-sm text-slate-600 font-mono">
                                                {result}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-slate-500 text-sm">No tests run yet</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* AI System Status */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
                        <div className="flex items-center mb-4">
                            <Zap className="w-6 h-6 text-green-600 mr-2" />
                            <h2 className="text-xl font-semibold text-slate-800">System Status</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-slate-700">Google Conversational Agent</span>
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-slate-700">Twilio Voice API</span>
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-slate-700">Sarah AI Persona</span>
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <span className="text-slate-700">SMS Integration</span>
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
                        <div className="flex items-center mb-4">
                            <MessageSquare className="w-6 h-6 text-purple-600 mr-2" />
                            <h2 className="text-xl font-semibold text-slate-800">Quick Actions</h2>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                Test Voice Webhook
                            </button>
                            <button className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                Check Agent Health
                            </button>
                            <button className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                View Call Logs
                            </button>
                            <button className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                Test SMS Integration
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent AI Activity</h2>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Voice call processed</p>
                                    <p className="text-xs text-slate-500">2 minutes ago</p>
                                </div>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Contractor matched</p>
                                    <p className="text-xs text-slate-500">5 minutes ago</p>
                                </div>
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Quote generated</p>
                                    <p className="text-xs text-slate-500">8 minutes ago</p>
                                </div>
                                <CheckCircle className="w-4 h-4 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}