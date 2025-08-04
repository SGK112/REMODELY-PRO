/**
 * Comprehensive API Testing Panel for Administrators
 * Test all integrated APIs: Stripe, Twilio, Google Cloud, Shopify, etc.
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Play, CheckCircle, XCircle, AlertCircle, Eye, EyeOff, Copy, Download, RefreshCw } from 'lucide-react'
import { useSession } from 'next-auth/react'

export interface APIEndpoint {
  id: string
  name: string
  service: 'stripe' | 'twilio' | 'google' | 'shopify' | 'openai' | 'elevenlabs' | 'internal'
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  description: string
  requiredAuth: boolean
  testPayload?: any
  expectedResponse?: any
  headers?: Record<string, string>
  category: 'payment' | 'communication' | 'ai' | 'data' | 'auth' | 'integration'
}

export interface TestResult {
  endpointId: string
  status: 'success' | 'error' | 'warning'
  statusCode?: number
  responseTime: number
  response: any
  error?: string
  timestamp: Date
}

interface APITestingPanelProps {
  className?: string
}

export const APITestingPanel: React.FC<APITestingPanelProps> = ({ className }) => {
  const { data: session } = useSession()
  const [endpoints] = useState<APIEndpoint[]>(getAPIEndpoints())
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({})
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSecrets, setShowSecrets] = useState(false)
  const [bulkTesting, setBulkTesting] = useState(false)

  // Auto-run health checks on mount
  useEffect(() => {
    if (session?.user?.userType === 'admin') {
      runHealthChecks()
    }
  }, [session])

  const runHealthChecks = async () => {
    const healthEndpoints = endpoints.filter(e =>
      e.category === 'auth' || e.method === 'GET'
    )

    for (const endpoint of healthEndpoints) {
      await runTest(endpoint.id)
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  const runTest = async (endpointId: string) => {
    const endpoint = endpoints.find(e => e.id === endpointId)
    if (!endpoint) return

    setRunningTests(prev => {
      const newSet = new Set(prev)
      newSet.add(endpointId)
      return newSet
    })

    const startTime = Date.now()

    try {
      const result = await executeAPITest(endpoint)
      const responseTime = Date.now() - startTime

      const testResult: TestResult = {
        endpointId,
        status: result.success ? 'success' : 'error',
        statusCode: result.statusCode,
        responseTime,
        response: result.response,
        error: result.error,
        timestamp: new Date()
      }

      setTestResults(prev => ({
        ...prev,
        [endpointId]: testResult
      }))
    } catch (error) {
      const testResult: TestResult = {
        endpointId,
        status: 'error',
        responseTime: Date.now() - startTime,
        response: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      }

      setTestResults(prev => ({
        ...prev,
        [endpointId]: testResult
      }))
    } finally {
      setRunningTests(prev => {
        const newSet = new Set(prev)
        newSet.delete(endpointId)
        return newSet
      })
    }
  }

  const executeAPITest = async (endpoint: APIEndpoint): Promise<{
    success: boolean
    statusCode?: number
    response: any
    error?: string
  }> => {
    try {
      const response = await fetch('/api/admin/test-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: endpoint.url,
          method: endpoint.method,
          headers: endpoint.headers,
          payload: endpoint.testPayload,
          service: endpoint.service
        })
      })

      const data = await response.json()

      return {
        success: response.ok,
        statusCode: response.status,
        response: data
      }
    } catch (error) {
      return {
        success: false,
        response: null,
        error: error instanceof Error ? error.message : 'Network error'
      }
    }
  }

  const runAllTests = async () => {
    setBulkTesting(true)

    for (const endpoint of filteredEndpoints) {
      await runTest(endpoint.id)
      // Add delay between bulk tests
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    setBulkTesting(false)
  }

  const exportResults = () => {
    const resultsData = {
      timestamp: new Date().toISOString(),
      results: Object.values(testResults),
      summary: generateSummary()
    }

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `api-test-results-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateSummary = () => {
    const results = Object.values(testResults)
    const total = results.length
    const successful = results.filter(r => r.status === 'success').length
    const failed = results.filter(r => r.status === 'error').length
    const warnings = results.filter(r => r.status === 'warning').length

    return {
      total,
      successful,
      failed,
      warnings,
      successRate: total > 0 ? (successful / total * 100).toFixed(1) : '0'
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const categories = ['all', 'payment', 'communication', 'ai', 'data', 'auth', 'integration']

  const filteredEndpoints = selectedCategory === 'all'
    ? endpoints
    : endpoints.filter(e => e.category === selectedCategory)

  const summary = generateSummary()

  if (session?.user?.userType !== 'admin') {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">This panel is only available to administrators.</p>
      </div>
    )
  }

  return (
    <div className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Testing Panel</h2>
          <p className="text-gray-600">Test and monitor all integrated APIs</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {showSecrets ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {showSecrets ? 'Hide' : 'Show'} Secrets
          </button>

          <button
            onClick={exportResults}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4 mr-1" />
            Export Results
          </button>

          <button
            onClick={runAllTests}
            disabled={bulkTesting}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {bulkTesting ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
            {bulkTesting ? 'Running Tests...' : 'Run All Tests'}
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total APIs</span>
            <span className="text-2xl font-bold text-gray-900">{summary.total}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Successful</span>
            <span className="text-2xl font-bold text-green-600">{summary.successful}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Failed</span>
            <span className="text-2xl font-bold text-red-600">{summary.failed}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Success Rate</span>
            <span className="text-2xl font-bold text-blue-600">{summary.successRate}%</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="space-y-4">
        {filteredEndpoints.map(endpoint => {
          const result = testResults[endpoint.id]
          const isRunning = runningTests.has(endpoint.id)

          return (
            <div key={endpoint.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                          endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {endpoint.method}
                  </span>

                  <h3 className="font-semibold text-gray-900">{endpoint.name}</h3>

                  <span className={`px-2 py-1 text-xs rounded ${endpoint.service === 'stripe' ? 'bg-purple-100 text-purple-800' :
                      endpoint.service === 'twilio' ? 'bg-red-100 text-red-800' :
                        endpoint.service === 'google' ? 'bg-blue-100 text-blue-800' :
                          endpoint.service === 'openai' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {endpoint.service}
                  </span>

                  {result && (
                    <div className="flex items-center space-x-1">
                      {result.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {result.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                      {result.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                      <span className="text-sm text-gray-500">{result.responseTime}ms</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => runTest(endpoint.id)}
                  disabled={isRunning}
                  className="flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRunning ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
                  {isRunning ? 'Testing...' : 'Test'}
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-3">{endpoint.description}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <span>URL: <code className="bg-gray-100 px-1 rounded">{endpoint.url}</code></span>
                {endpoint.requiredAuth && <span className="text-yellow-600">⚠️ Requires Auth</span>}
              </div>

              {/* Test Result */}
              {result && (
                <div className="mt-4 p-3 bg-gray-50 rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">Test Result</span>
                    <span className="text-xs text-gray-500">
                      {result.timestamp.toLocaleString()}
                    </span>
                  </div>

                  {result.statusCode && (
                    <div className="mb-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${result.statusCode >= 200 && result.statusCode < 300 ? 'bg-green-100 text-green-800' :
                          result.statusCode >= 400 ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {result.statusCode}
                      </span>
                    </div>
                  )}

                  {result.error && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                      <span className="text-red-800 text-sm font-medium">Error: </span>
                      <span className="text-red-700 text-sm">{result.error}</span>
                    </div>
                  )}

                  {result.response && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600">Response:</span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(result.response, null, 2))}
                          className="text-xs text-blue-500 hover:text-blue-700"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto max-h-32 overflow-y-auto">
                        {JSON.stringify(result.response, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredEndpoints.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No APIs Found</h3>
          <p className="text-gray-600">No APIs match the selected category.</p>
        </div>
      )}
    </div>
  )
}

// API Endpoints Configuration
function getAPIEndpoints(): APIEndpoint[] {
  return [
    // Stripe Payment APIs
    {
      id: 'stripe-payment-intent',
      name: 'Create Payment Intent',
      service: 'stripe',
      method: 'POST',
      url: '/api/stripe/payment-intent',
      description: 'Create a new payment intent for processing payments',
      requiredAuth: true,
      category: 'payment',
      testPayload: {
        amount: 1000,
        currency: 'usd',
        metadata: { test: true }
      }
    },
    {
      id: 'stripe-customers',
      name: 'List Customers',
      service: 'stripe',
      method: 'GET',
      url: '/api/stripe/customers',
      description: 'Retrieve list of Stripe customers',
      requiredAuth: true,
      category: 'payment'
    },

    // Twilio Communication APIs  
    {
      id: 'twilio-send-sms',
      name: 'Send SMS',
      service: 'twilio',
      method: 'POST',
      url: '/api/twilio/sms',
      description: 'Send SMS notification to users',
      requiredAuth: true,
      category: 'communication',
      testPayload: {
        to: '+1234567890',
        message: 'Test message from Remodely.AI'
      }
    },
    {
      id: 'twilio-voice-call',
      name: 'Initiate Voice Call',
      service: 'twilio',
      method: 'POST',
      url: '/api/twilio/voice',
      description: 'Start voice call with AI assistant',
      requiredAuth: true,
      category: 'communication',
      testPayload: {
        to: '+1234567890',
        type: 'consultation'
      }
    },

    // Google Cloud APIs
    {
      id: 'google-places',
      name: 'Places Search',
      service: 'google',
      method: 'GET',
      url: '/api/google/places',
      description: 'Search for contractor locations using Google Places API',
      requiredAuth: true,
      category: 'data',
      testPayload: {
        query: 'contractors Phoenix AZ',
        radius: 50000
      }
    },
    {
      id: 'google-speech',
      name: 'Speech-to-Text',
      service: 'google',
      method: 'POST',
      url: '/api/google/speech',
      description: 'Convert audio to text using Google Speech API',
      requiredAuth: true,
      category: 'ai'
    },

    // OpenAI APIs
    {
      id: 'openai-chat',
      name: 'Chat Completion',
      service: 'openai',
      method: 'POST',
      url: '/api/openai/chat',
      description: 'Generate AI responses using OpenAI GPT',
      requiredAuth: true,
      category: 'ai',
      testPayload: {
        message: 'Help me find a good contractor for kitchen renovation',
        context: 'customer_inquiry'
      }
    },
    {
      id: 'openai-image-analysis',
      name: 'Image Analysis',
      service: 'openai',
      method: 'POST',
      url: '/api/openai/vision',
      description: 'Analyze renovation project images',
      requiredAuth: true,
      category: 'ai'
    },

    // ElevenLabs Voice APIs
    {
      id: 'elevenlabs-tts',
      name: 'Text-to-Speech',
      service: 'elevenlabs',
      method: 'POST',
      url: '/api/elevenlabs/tts',
      description: 'Convert text to natural speech',
      requiredAuth: true,
      category: 'ai',
      testPayload: {
        text: 'Hello, I\'m your Remodely AI assistant. How can I help you today?',
        voice: 'sarah'
      }
    },

    // Internal APIs
    {
      id: 'auth-verify',
      name: 'Verify Authentication',
      service: 'internal',
      method: 'GET',
      url: '/api/auth/verify',
      description: 'Verify user authentication status',
      requiredAuth: true,
      category: 'auth'
    },
    {
      id: 'contractors-search',
      name: 'Search Contractors',
      service: 'internal',
      method: 'GET',
      url: '/api/contractors/search',
      description: 'Search for contractors in database',
      requiredAuth: false,
      category: 'data',
      testPayload: {
        location: 'Phoenix, AZ',
        service: 'kitchen renovation'
      }
    },
    {
      id: 'quotes-create',
      name: 'Create Quote Request',
      service: 'internal',
      method: 'POST',
      url: '/api/quotes',
      description: 'Create new quote request',
      requiredAuth: true,
      category: 'data',
      testPayload: {
        projectType: 'kitchen',
        budget: '$10000-$25000',
        timeline: '2-3 months'
      }
    }
  ]
}

export default APITestingPanel
