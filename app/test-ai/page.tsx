'use client'

import { useState, useRef } from 'react'
import {
  Brain,
  MessageSquare,
  Mic,
  MicOff,
  Camera,
  Image,
  Calculator,
  Palette,
  Zap,
  TestTube,
  Settings,
  Play,
  Square,
  Upload,
  Download,
  BarChart3,
  Eye,
  Volume2,
  VolumeX,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Activity
} from 'lucide-react'

export default function TestAIPage() {
  const [activeTest, setActiveTest] = useState('chat')
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const aiServices = [
    {
      id: 'chat',
      name: 'AI Chat Assistant',
      icon: MessageSquare,
      description: 'Test conversational AI for customer inquiries and contractor matching',
      endpoint: '/api/ai'
    },
    {
      id: 'voice',
      name: 'Voice Consultation',
      icon: Mic,
      description: 'Test voice AI for customer consultations and contractor interviews',
      endpoint: '/api/voice/test'
    },
    {
      id: 'image',
      name: 'Image Recognition',
      icon: Camera,
      description: 'Test AI image analysis for project photos and material identification',
      endpoint: '/api/ai-services/image-recognition'
    },
    {
      id: 'quote',
      name: 'Smart Quoting',
      icon: Calculator,
      description: 'Test AI-powered project cost estimation and budget analysis',
      endpoint: '/api/ai-services/smart-quote'
    },
    {
      id: 'design',
      name: 'Design Assistant',
      icon: Palette,
      description: 'Test AI design recommendations and style matching',
      endpoint: '/api/ai-designer'
    },
    {
      id: 'matching',
      name: 'Contractor Matching',
      icon: Brain,
      description: 'Test AI contractor-customer matching algorithms',
      endpoint: '/api/ai-services/matching'
    }
  ]

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return

    const userMessage = { role: 'user', content: chatInput }
    setChatHistory(prev => [...prev, userMessage])
    setChatInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput })
      })
      
      const data = await response.json()
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response || 'AI response received' }])
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Error: Unable to get AI response' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceTest = async () => {
    if (isRecording) {
      setIsRecording(false)
      // Stop recording logic
    } else {
      setIsRecording(true)
      // Start recording logic
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const runImageAnalysis = async () => {
    if (!uploadedImage) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-services/image-recognition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadedImage, analysisType: 'general' })
      })
      
      const data = await response.json()
      setTestResults(prev => ({ ...prev, image: data }))
    } catch (error) {
      setTestResults(prev => ({ ...prev, image: { error: 'Analysis failed' } }))
    } finally {
      setIsLoading(false)
    }
  }

  const runQuoteTest = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-services/smart-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: 'Kitchen Renovation',
          roomSize: '12x15',
          materials: ['Quartz Countertops', 'Hardwood Cabinets'],
          location: 'Phoenix, AZ'
        })
      })
      
      const data = await response.json()
      setTestResults(prev => ({ ...prev, quote: data }))
    } catch (error) {
      setTestResults(prev => ({ ...prev, quote: { error: 'Quote generation failed' } }))
    } finally {
      setIsLoading(false)
    }
  }

  const runDesignTest = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-designer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: 'kitchen',
          style: 'modern',
          colorScheme: 'neutral',
          budget: 50000
        })
      })
      
      const data = await response.json()
      setTestResults(prev => ({ ...prev, design: data }))
    } catch (error) {
      setTestResults(prev => ({ ...prev, design: { error: 'Design generation failed' } }))
    } finally {
      setIsLoading(false)
    }
  }

  const runHealthCheck = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-health')
      const data = await response.json()
      setTestResults(prev => ({ ...prev, health: data }))
    } catch (error) {
      setTestResults(prev => ({ ...prev, health: { error: 'Health check failed' } }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <TestTube className="w-8 h-8 mr-3 text-blue-600" />
                AI Testing Laboratory
              </h1>
              <p className="text-gray-600 mt-2">Test and validate all AI services in the Remodely.AI platform</p>
            </div>
            <button 
              onClick={runHealthCheck}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
            >
              <Activity className="w-4 h-4 mr-2" />
              Health Check
            </button>
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {aiServices.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTest(service.id)}
              className={`p-6 rounded-xl text-left transition-all ${
                activeTest === service.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white hover:bg-gray-50 shadow-md'
              }`}
            >
              <service.icon className={`w-8 h-8 mb-3 ${activeTest === service.id ? 'text-blue-200' : 'text-blue-600'}`} />
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className={`text-sm ${activeTest === service.id ? 'text-blue-100' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </button>
          ))}
        </div>

        {/* Test Interface */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {aiServices.find(s => s.id === activeTest)?.name} Testing
            </h2>
          </div>

          <div className="p-6">
            {/* Chat AI Test */}
            {activeTest === 'chat' && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Start a conversation with the AI assistant</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border shadow-sm'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white border shadow-sm px-4 py-2 rounded-lg">
                            <div className="flex items-center">
                              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                              AI is thinking...
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                    placeholder="Ask the AI about contractors, renovations, or anything..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleChatSubmit}
                    disabled={isLoading || !chatInput.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Voice AI Test */}
            {activeTest === 'voice' && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {isRecording ? (
                    <div className="animate-pulse">
                      <Mic className="w-12 h-12 text-white" />
                    </div>
                  ) : (
                    <MicOff className="w-12 h-12 text-white" />
                  )}
                </div>
                <div>
                  <button
                    onClick={handleVoiceTest}
                    className={`px-8 py-4 rounded-lg font-semibold transition-colors ${
                      isRecording
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-5 h-5 inline mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 inline mr-2" />
                        Start Voice Test
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-600">
                  Test the voice AI consultation system. Speak about your renovation needs.
                </p>
              </div>
            )}

            {/* Image AI Test */}
            {activeTest === 'image' && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img src={uploadedImage} alt="Uploaded" className="max-w-md mx-auto rounded-lg shadow-md" />
                      <button
                        onClick={runImageAnalysis}
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                      >
                        {isLoading ? 'Analyzing...' : 'Run AI Analysis'}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Upload an image to test AI recognition</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Upload className="w-4 h-4 inline mr-2" />
                        Upload Image
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                {testResults.image && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Analysis Results:</h3>
                    <pre className="text-sm overflow-auto">{JSON.stringify(testResults.image, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Quote AI Test */}
            {activeTest === 'quote' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Test Parameters</h3>
                    <div className="space-y-3 text-sm">
                      <div><strong>Project:</strong> Kitchen Renovation</div>
                      <div><strong>Size:</strong> 12x15 feet</div>
                      <div><strong>Materials:</strong> Quartz Countertops, Hardwood Cabinets</div>
                      <div><strong>Location:</strong> Phoenix, AZ</div>
                    </div>
                    <button
                      onClick={runQuoteTest}
                      disabled={isLoading}
                      className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                      {isLoading ? 'Generating Quote...' : 'Generate AI Quote'}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Quote Results</h3>
                    {testResults.quote ? (
                      <pre className="text-xs overflow-auto h-32">{JSON.stringify(testResults.quote, null, 2)}</pre>
                    ) : (
                      <p className="text-gray-500">No quote generated yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Design AI Test */}
            {activeTest === 'design' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Design Parameters</h3>
                    <div className="space-y-3 text-sm">
                      <div><strong>Room:</strong> Kitchen</div>
                      <div><strong>Style:</strong> Modern</div>
                      <div><strong>Colors:</strong> Neutral</div>
                      <div><strong>Budget:</strong> $50,000</div>
                    </div>
                    <button
                      onClick={runDesignTest}
                      disabled={isLoading}
                      className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                      {isLoading ? 'Generating Design...' : 'Generate AI Design'}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Design Results</h3>
                    {testResults.design ? (
                      <pre className="text-xs overflow-auto h-32">{JSON.stringify(testResults.design, null, 2)}</pre>
                    ) : (
                      <p className="text-gray-500">No design generated yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Matching AI Test */}
            {activeTest === 'matching' && (
              <div className="space-y-6">
                <div className="text-center">
                  <Brain className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Contractor Matching Algorithm</h3>
                  <p className="text-gray-600 mb-6">Test the AI matching system with sample project data</p>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Run Matching Test
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Health Check Results */}
        {testResults.health && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              System Health Status
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(testResults.health).map(([service, status]: [string, any]) => (
                <div key={service} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">{service}</span>
                    {status?.healthy ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Response: {status?.responseTime || 'N/A'}ms
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}