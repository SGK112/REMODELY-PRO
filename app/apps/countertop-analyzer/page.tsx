'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import {
    Eye, Camera, Upload, ArrowLeft, Zap, Shield, Star, CheckCircle,
    Play, Mic, Phone, Users, TrendingUp, Award, DollarSign, Clock,
    ChevronRight, Info, X, Sparkles, Brain, Home
} from 'lucide-react'

// Material types database
const materialTypes = [
    { name: 'Granite', confidence: 99.2, price: '$45-65/sq ft', features: ['Natural stone', 'Heat resistant', 'Unique patterns'] },
    { name: 'Quartz', confidence: 97.8, price: '$50-90/sq ft', features: ['Engineered', 'Non-porous', 'Consistent color'] },
    { name: 'Marble', confidence: 95.5, price: '$60-100/sq ft', features: ['Luxury stone', 'Heat sensitive', 'Veining patterns'] },
    { name: 'Quartzite', confidence: 92.1, price: '$55-85/sq ft', features: ['Natural stone', 'Very durable', 'Heat resistant'] }
]

interface AnalysisResult {
    material: string
    confidence: number
    price: string
    features: string[]
    suppliers: number
    samples: number
}

export default function CountertopAnalyzerApp() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [showDemo, setShowDemo] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    setUploadedImage(e.target.result as string)
                    simulateAnalysis()
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const simulateAnalysis = () => {
        setIsAnalyzing(true)
        setTimeout(() => {
            setAnalysisResult({
                material: 'Granite',
                confidence: 99.2,
                price: '$45-65/sq ft',
                features: ['Natural stone', 'Heat resistant', 'Unique patterns'],
                suppliers: 3,
                samples: 12
            })
            setIsAnalyzing(false)
        }, 2000)
    }

    const startDemo = () => {
        setShowDemo(true)
        setUploadedImage('/demo-granite.jpg') // Demo image
        simulateAnalysis()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </Link>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                    <Eye className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-gray-900">Material ID AI</h1>
                                    <p className="text-xs text-gray-500">Instant countertop identification</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={startDemo}
                                className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors flex items-center space-x-1"
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
                        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="h-4 w-4" />
                            <span>99.8% Accuracy Rate</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Identify Any Countertop Material
                            <span className="block text-emerald-400">In 2 Seconds</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Simply take a photo with your phone. Our AI instantly identifies granite, quartz, marble, and more with professional-grade accuracy.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">99.8%</div>
                            <div className="text-gray-400 text-xs">Accuracy</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">2s</div>
                            <div className="text-gray-400 text-xs">Analysis Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">500K+</div>
                            <div className="text-gray-400 text-xs">Materials ID'd</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Upload Interface */}
            <section className="pb-12 px-4">
                <div className="max-w-2xl mx-auto">
                    {!uploadedImage ? (
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Camera className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Upload Countertop Photo</h3>
                                <p className="text-gray-300 mb-6">Take a clear photo of the countertop surface for best results</p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Upload className="h-5 w-5" />
                                    <span>Choose Photo</span>
                                </button>

                                <button
                                    onClick={startDemo}
                                    className="w-full border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Play className="h-5 w-5" />
                                    <span>Try Demo Instead</span>
                                </button>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Uploaded Image */}
                            <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
                                <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative">
                                    {uploadedImage && (
                                        <img
                                            src={uploadedImage}
                                            alt="Uploaded countertop"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {isAnalyzing && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                                <p className="text-white font-medium">Analyzing material...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        setUploadedImage(null)
                                        setAnalysisResult(null)
                                        setShowDemo(false)
                                    }}
                                    className="absolute top-6 right-6 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Analysis Results */}
                            {analysisResult && (
                                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">Analysis Results</h3>
                                        <div className="flex items-center space-x-1 text-emerald-400">
                                            <CheckCircle className="h-5 w-5" />
                                            <span className="font-medium">{analysisResult.confidence}% Confident</span>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-xl p-4 mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-2xl font-bold text-white">{analysisResult.material}</h4>
                                            <span className="text-emerald-400 font-bold text-lg">{analysisResult.price}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {analysisResult.features.map((feature, index) => (
                                                <span key={index} className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="text-center p-3 bg-white/5 rounded-lg">
                                            <div className="text-xl font-bold text-white">{analysisResult.suppliers}</div>
                                            <div className="text-gray-400 text-sm">Local Suppliers</div>
                                        </div>
                                        <div className="text-center p-3 bg-white/5 rounded-lg">
                                            <div className="text-xl font-bold text-white">{analysisResult.samples}</div>
                                            <div className="text-gray-400 text-sm">Available Samples</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                                            <Phone className="h-5 w-5" />
                                            <span>Find Local Suppliers</span>
                                        </button>

                                        <button className="w-full border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                                            <DollarSign className="h-5 w-5" />
                                            <span>Get Cost Estimate</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Try Another Photo */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border-2 border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Camera className="h-5 w-5" />
                                <span>Analyze Another Photo</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                        Powered by Advanced AI
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Computer Vision AI</h3>
                            <p className="text-gray-300 text-sm">Advanced neural networks trained on millions of countertop images for precise material identification.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Instant Analysis</h3>
                            <p className="text-gray-300 text-sm">Get results in under 2 seconds with professional-grade accuracy that contractors trust.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Privacy Protected</h3>
                            <p className="text-gray-300 text-sm">Your photos are processed securely and automatically deleted after analysis.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Industry Trusted</h3>
                            <p className="text-gray-300 text-sm">Used by 50,000+ contractors and homeowners for accurate material identification.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing/CTA Section */}
            <section className="py-12 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Start Identifying Materials
                    </h2>
                    <p className="text-lg text-emerald-100 mb-8">
                        Free for 5 analyses per month. Unlimited access starting at just $19/month.
                    </p>

                    <div className="space-y-4">
                        <button className="w-full bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            Start Free Trial
                        </button>

                        <button className="w-full border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                            <Mic className="h-5 w-5" />
                            <span>Talk to Sarah AI</span>
                        </button>
                    </div>

                    <p className="text-emerald-200 mt-6 text-sm">
                        No credit card required • 14-day free trial • Cancel anytime
                    </p>
                </div>
            </section>
        </div>
    )
}
