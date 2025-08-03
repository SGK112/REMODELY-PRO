'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function AuthTestPage() {
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

    const testLogin = async (email: string, password: string, userType: string) => {
        setLoading(true)
        addResult(`🔄 Testing ${userType} login: ${email}`)
        
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            })
            
            if (result?.error) {
                addResult(`❌ ${userType} login failed: ${result.error}`)
            } else if (result?.ok) {
                addResult(`✅ ${userType} login successful!`)
                
                setTimeout(async () => {
                    const newSession = await getSession()
                    addResult(`👤 Session: ${newSession?.user?.email} (${newSession?.user?.userType})`)
                }, 1000)
            }
        } catch (error) {
            addResult(`❌ ${userType} login error: ${error}`)
        }
        
        setLoading(false)
    }

    const createTestUsers = async () => {
        setLoading(true)
        addResult('🔄 Creating test users...')
        
        const users = [
            {
                name: 'Admin User',
                email: 'admin@remodely.ai',
                password: 'admin123',
                userType: 'ADMIN',
                phone: '555-ADMIN'
            },
            {
                name: 'Test Contractor',
                email: 'contractor@remodely.ai',
                password: 'contractor123',
                userType: 'CONTRACTOR',
                phone: '555-CONTRACTOR',
                businessName: 'Test Contracting LLC'
            },
            {
                name: 'Test Customer',
                email: 'customer@remodely.ai',
                password: 'customer123',
                userType: 'CUSTOMER',
                phone: '555-CUSTOMER'
            }
        ]
        
        for (const user of users) {
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                })
                
                const data = await response.json()
                
                if (response.ok) {
                    addResult(`✅ Created ${user.userType}: ${user.email}`)
                } else {
                    addResult(`⚠️ ${user.userType} (${user.email}): ${data.error || 'Already exists'}`)
                }
            } catch (error) {
                addResult(`❌ Error creating ${user.userType}: ${error}`)
            }
        }
        
        setLoading(false)
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
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">🔐 REMODELY AI Authentication Test</h1>
                
                {/* Current Status */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Current Session</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p><strong>Status:</strong> <span className={`px-2 py-1 rounded ${
                                status === 'authenticated' ? 'bg-green-100 text-green-800' :
                                status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>{status}</span></p>
                            <p><strong>User:</strong> {session?.user?.email || 'Not logged in'}</p>
                            <p><strong>Type:</strong> {session?.user?.userType || 'N/A'}</p>
                        </div>
                        <div>
                            <p><strong>ID:</strong> {session?.user?.id || 'N/A'}</p>
                            <p><strong>Name:</strong> {session?.user?.name || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Test Controls */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Tests</h2>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">1. Create Test Users</h3>
                        <button
                            onClick={createTestUsers}
                            disabled={loading}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
                        >
                            {loading ? '⏳ Creating...' : '👥 Create All Test Users'}
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">2. Test Login by User Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => testLogin('customer@remodely.ai', 'customer123', 'CUSTOMER')}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                🏠 Test Customer Login
                            </button>
                            
                            <button
                                onClick={() => testLogin('contractor@remodely.ai', 'contractor123', 'CONTRACTOR')}
                                disabled={loading}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                            >
                                🔨 Test Contractor Login
                            </button>
                            
                            <button
                                onClick={() => testLogin('admin@remodely.ai', 'admin123', 'ADMIN')}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
                            >
                                👑 Test Admin Login
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {session && (
                            <button
                                onClick={() => signOut({ redirect: false })}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                🚪 Sign Out
                            </button>
                        )}
                        
                        <button
                            onClick={clearResults}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            🧹 Clear Results
                        </button>
                    </div>
                </div>

                {/* Test Results */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Test Results</h2>
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
                        {testResults.length === 0 ? (
                            <p className="text-gray-400">No test results yet. Click a test button above.</p>
                        ) : (
                            <div className="space-y-1">
                                {testResults.map((result, index) => (
                                    <div key={index}>{result}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Access Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">🎯 Access Different Dashboards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-800">
                        <div className="bg-blue-100 p-4 rounded">
                            <h3 className="font-bold mb-2">👑 Admin Access</h3>
                            <p className="text-sm mb-2">Email: admin@remodely.ai</p>
                            <p className="text-sm mb-2">Password: admin123</p>
                            <a href="/dashboard/admin" className="text-blue-600 underline text-sm">→ Admin Dashboard</a>
                        </div>
                        
                        <div className="bg-green-100 p-4 rounded">
                            <h3 className="font-bold mb-2">🔨 Contractor Access</h3>
                            <p className="text-sm mb-2">Email: contractor@remodely.ai</p>
                            <p className="text-sm mb-2">Password: contractor123</p>
                            <a href="/dashboard/contractor" className="text-green-600 underline text-sm">→ Contractor Dashboard</a>
                        </div>
                        
                        <div className="bg-purple-100 p-4 rounded">
                            <h3 className="font-bold mb-2">🏠 Customer Access</h3>
                            <p className="text-sm mb-2">Email: customer@remodely.ai</p>
                            <p className="text-sm mb-2">Password: customer123</p>
                            <a href="/dashboard/customer" className="text-blue-600 underline text-sm">→ Customer Dashboard</a>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-100 rounded">
                        <h3 className="font-bold text-yellow-900 mb-2">🤖 AI Tools & APIs</h3>
                        <div className="text-yellow-800 text-sm space-y-1">
                            <p>• <a href="/api/ai" className="underline">AI Chat API</a> - Smart contractor matching</p>
                            <p>• <a href="/voice-consultation" className="underline">Voice Consultation</a> - AI voice assistant</p>
                            <p>• <a href="/api/ai-services/smart-quote" className="underline">Smart Quote API</a> - AI quote generation</p>
                            <p>• <a href="/api/ai-services/image-recognition" className="underline">Image Recognition API</a> - Project analysis</p>
                            <p>• <a href="/dashboard/contractor/tools" className="underline">Contractor AI Tools</a> - Full toolkit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
