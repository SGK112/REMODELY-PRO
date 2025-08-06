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
            AI Handyman Assistant
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Get expert handyman advice and project guidance from our AI assistant
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

import { useState, useRef, useEffect } from 'react'
import { Camera, Upload, MessageCircle, Wrench, Clock, CheckCircle, Star, ArrowLeft, Mic, Volume2, Square, Loader2, Send } from 'lucide-react'
import Link from 'next/link'

interface TaskStep {
    id: string
    title: string
    description: string
    estimatedTime: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    tools: string[]
    completed: boolean
}

interface ProjectAnalysis {
    projectType: string
    complexity: string
    estimatedTime: string
    estimatedCost: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    steps: TaskStep[]
    warnings: string[]
    tips: string[]
}

export default function HandymanAssistant() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null)
    const [description, setDescription] = useState('')
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAnalyze = async () => {
        if (!selectedImage && !description.trim()) {
            return
        }

        setIsAnalyzing(true)

        // Simulate AI analysis
        setTimeout(() => {
            const mockAnalysis: ProjectAnalysis = {
                projectType: 'Bathroom Faucet Replacement',
                complexity: 'Medium complexity project',
                estimatedTime: '2-3 hours',
                estimatedCost: '$75-150',
                difficulty: 'Medium',
                steps: [
                    {
                        id: '1',
                        title: 'Turn off water supply',
                        description: 'Locate and turn off the water supply valves under the sink. Turn counterclockwise to close.',
                        estimatedTime: '5 minutes',
                        difficulty: 'Easy',
                        tools: ['Adjustable wrench'],
                        completed: false
                    },
                    {
                        id: '2',
                        title: 'Remove old faucet',
                        description: 'Disconnect supply lines and remove mounting nuts. Lift out the old faucet assembly.',
                        estimatedTime: '30 minutes',
                        difficulty: 'Medium',
                        tools: ['Basin wrench', 'Adjustable wrench', 'Flashlight'],
                        completed: false
                    },
                    {
                        id: '3',
                        title: 'Clean mounting surface',
                        description: 'Remove old putty and debris from the sink surface. Ensure clean, smooth mounting area.',
                        estimatedTime: '15 minutes',
                        difficulty: 'Easy',
                        tools: ['Putty knife', 'Cleaning cloth'],
                        completed: false
                    },
                    {
                        id: '4',
                        title: 'Install new faucet',
                        description: 'Place new faucet through mounting holes, secure with nuts, and connect supply lines.',
                        estimatedTime: '45 minutes',
                        difficulty: 'Medium',
                        tools: ['Basin wrench', 'Plumber\'s putty', 'Teflon tape'],
                        completed: false
                    },
                    {
                        id: '5',
                        title: 'Test installation',
                        description: 'Turn water supply back on and test for leaks. Check hot and cold water operation.',
                        estimatedTime: '10 minutes',
                        difficulty: 'Easy',
                        tools: ['Paper towels'],
                        completed: false
                    }
                ],
                warnings: [
                    'Always turn off water supply before starting',
                    'Have a bucket ready to catch water from supply lines',
                    'Take photos before disconnecting for reference'
                ],
                tips: [
                    'Apply plumber\'s putty around the base for a watertight seal',
                    'Use Teflon tape on threaded connections',
                    'Test fit everything before final installation'
                ]
            }

            setAnalysis(mockAnalysis)
            setIsAnalyzing(false)
        }, 3000)
    }

    const toggleStepCompletion = (stepId: string) => {
        const newCompleted = new Set(completedSteps)
        if (newCompleted.has(stepId)) {
            newCompleted.delete(stepId)
        } else {
            newCompleted.add(stepId)
        }
        setCompletedSteps(newCompleted)
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-600 bg-green-100'
            case 'Medium': return 'text-yellow-600 bg-yellow-100'
            case 'Hard': return 'text-red-600 bg-red-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const completionPercentage = analysis ? (completedSteps.size / analysis.steps.length) * 100 : 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                <span className="hidden sm:inline">Back to Home</span>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Wrench className="w-6 h-6 text-blue-600" />
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Handyman Assistant AI</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm text-gray-600 hidden sm:inline">AI-Powered Project Guidance</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!analysis ? (
                    /* Upload and Input Section */
                    <div className="space-y-8">
                        {/* Hero Section */}
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Get Expert Guidance for Any Project
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Upload a photo or describe your project and get step-by-step instructions,
                                tool lists, and professional tips from our AI handyman assistant.
                            </p>
                        </div>

                        {/* Upload Section */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50">
                            <div className="space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Project Photo (Optional)
                                    </label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer bg-white/80 backdrop-blur-sm"
                                    >
                                        {selectedImage ? (
                                            <div className="space-y-4">
                                                <img
                                                    src={selectedImage}
                                                    alt="Selected project"
                                                    className="mx-auto max-h-64 rounded-lg shadow-md"
                                                />
                                                <p className="text-sm text-gray-600 font-medium">Click to change image</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto">
                                                    <Camera className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-700 font-medium">Click to upload project photo</p>
                                                    <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 10MB</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>

                                {/* Text Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Describe Your Project
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="e.g., I need to replace my bathroom faucet, install a ceiling fan, fix a leaky pipe..."
                                            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 text-gray-900 shadow-sm hover:border-gray-400"
                                        />
                                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                            {description.length}/500
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Be as detailed as possible for better AI analysis
                                    </p>
                                </div>

                                <button
                                    onClick={handleAnalyze}
                                    disabled={(!selectedImage && !description.trim()) || isAnalyzing}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2 shadow-md"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Analyzing Project...</span>
                                        </>
                                    ) : (
                                        <>
                                            <MessageCircle className="w-5 h-5" />
                                            <span>
                                                {!selectedImage && !description.trim()
                                                    ? 'Add photo or description first'
                                                    : 'Get Step-by-Step Instructions'
                                                }
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                                <Clock className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Time Estimates</h3>
                                <p className="text-gray-600 text-sm">Get accurate time estimates for each step of your project</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                                <Wrench className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Tool Lists</h3>
                                <p className="text-gray-600 text-sm">Complete tool and material lists for every project</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                                <Star className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Pro Tips</h3>
                                <p className="text-gray-600 text-sm">Professional tips and warnings to ensure success</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Results Section */
                    <div className="space-y-8">
                        {/* Project Overview */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {analysis.projectType}
                                    </h2>
                                    <p className="text-gray-600">{analysis.complexity}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(analysis.difficulty)}`}>
                                    {analysis.difficulty}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                                    <div className="text-sm text-gray-600">Estimated Time</div>
                                    <div className="font-semibold">{analysis.estimatedTime}</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-6 h-6 bg-green-600 rounded mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold">$</div>
                                    <div className="text-sm text-gray-600">Est. Cost</div>
                                    <div className="font-semibold">{analysis.estimatedCost}</div>
                                </div>
                                <div className="text-center col-span-2 sm:col-span-1">
                                    <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                                    <div className="text-sm text-gray-600">Progress</div>
                                    <div className="font-semibold">{Math.round(completionPercentage)}%</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="bg-gray-200 rounded-full h-2 mb-6">
                                <div
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${completionPercentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Step-by-Step Instructions */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Step-by-Step Instructions</h3>
                            <div className="space-y-4">
                                {analysis.steps.map((step, index) => (
                                    <div key={step.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-start space-x-4">
                                            <button
                                                onClick={() => toggleStepCompletion(step.id)}
                                                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${completedSteps.has(step.id)
                                                        ? 'bg-green-600 border-green-600 text-white'
                                                        : 'border-gray-300 hover:border-blue-400'
                                                    }`}
                                            >
                                                {completedSteps.has(step.id) ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <span className="text-sm font-medium">{index + 1}</span>
                                                )}
                                            </button>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                    <h4 className={`font-semibold ${completedSteps.has(step.id) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                                        {step.title}
                                                    </h4>
                                                    <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                                                            {step.difficulty}
                                                        </span>
                                                        <span className="text-sm text-gray-500">{step.estimatedTime}</span>
                                                    </div>
                                                </div>
                                                <p className={`text-gray-600 mb-3 ${completedSteps.has(step.id) ? 'line-through' : ''}`}>
                                                    {step.description}
                                                </p>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-700 mb-1">Tools needed:</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {step.tools.map((tool, toolIndex) => (
                                                            <span key={toolIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                                                {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Warnings and Tips */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Warnings */}
                            <div className="bg-red-50/60 backdrop-blur-sm rounded-xl p-6 border border-red-200/50">
                                <h3 className="text-lg font-semibold text-red-800 mb-4">⚠️ Important Warnings</h3>
                                <ul className="space-y-2">
                                    {analysis.warnings.map((warning, index) => (
                                        <li key={index} className="text-red-700 text-sm flex items-start">
                                            <span className="w-1 h-1 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                            {warning}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tips */}
                            <div className="bg-green-50/60 backdrop-blur-sm rounded-xl p-6 border border-green-200/50">
                                <h3 className="text-lg font-semibold text-green-800 mb-4">💡 Pro Tips</h3>
                                <ul className="space-y-2">
                                    {analysis.tips.map((tip, index) => (
                                        <li key={index} className="text-green-700 text-sm flex items-start">
                                            <span className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    setAnalysis(null)
                                    setSelectedImage(null)
                                    setDescription('')
                                    setCompletedSteps(new Set())
                                }}
                                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 shadow-sm"
                            >
                                Analyze New Project
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 shadow-sm">
                                Save Instructions
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
