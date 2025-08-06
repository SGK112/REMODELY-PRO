'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
    Eye, ArrowLeft, Play, CheckCircle, Sparkles, Phone, DollarSign,
    Clock, Users, TrendingUp, Zap
} from 'lucide-react'

export default function CountertopAnalyzerDemo() {
    const [currentStep, setCurrentStep] = useState(0)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const demoSteps = [
        {
            title: "Take a Photo",
            description: "Point your phone camera at any countertop surface",
            image: "/demo/step1-camera.jpg",
            duration: 2000
        },
        {
            title: "AI Analysis",
            description: "Our computer vision AI analyzes the material patterns",
            image: "/demo/step2-analysis.jpg",
            duration: 2000
        },
        {
            title: "Instant Results",
            description: "Get precise material identification and pricing",
            image: "/demo/step3-results.jpg",
            duration: 3000
        }
    ]

    useEffect(() => {
        if (currentStep < demoSteps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(currentStep + 1)
            }, demoSteps[currentStep].duration)
            return () => clearTimeout(timer)
        } else if (currentStep === demoSteps.length - 1) {
            const timer = setTimeout(() => {
                setShowResult(true)
            }, demoSteps[currentStep].duration)
            return () => clearTimeout(timer)
        }
    }, [currentStep])

    const restartDemo = () => {
        setCurrentStep(0)
        setIsAnalyzing(false)
        setShowResult(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link href="/apps/countertop-analyzer" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </Link>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                    <Eye className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-gray-900">Material ID Demo</h1>
                                    <p className="text-xs text-gray-500">Interactive demonstration</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={restartDemo}
                            className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors flex items-center space-x-1"
                        >
                            <Play className="h-4 w-4" />
                            <span>Restart</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Demo Interface */}
            <section className="pt-8 pb-12 px-4">
                <div className="max-w-2xl mx-auto">

                    {!showResult ? (
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                <Sparkles className="h-4 w-4" />
                                <span>Live Demo</span>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-4">
                                Watch Material ID AI in Action
                            </h1>
                            <p className="text-gray-300 mb-8">
                                See how our AI identifies countertop materials in real-time
                            </p>

                            {/* Progress Steps */}
                            <div className="flex justify-center space-x-4 mb-8">
                                {demoSteps.map((step, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${index <= currentStep ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <span className={`text-xs mt-2 transition-colors ${index <= currentStep ? 'text-emerald-400' : 'text-gray-500'
                                            }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Demo Visualization */}
                            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                                <div className="aspect-video bg-gray-800 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                                    {currentStep < demoSteps.length && (
                                        <>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                    <Eye className="h-8 w-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">
                                                    {demoSteps[currentStep].title}
                                                </h3>
                                                <p className="text-gray-300">
                                                    {demoSteps[currentStep].description}
                                                </p>
                                            </div>

                                            {/* Animated progress bar */}
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                                                <div
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all ease-linear"
                                                    style={{
                                                        width: `${((Date.now() % demoSteps[currentStep].duration) / demoSteps[currentStep].duration) * 100}%`,
                                                        animation: `progress ${demoSteps[currentStep].duration}ms linear infinite`
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="text-center">
                                    <p className="text-gray-400 text-sm">
                                        Step {currentStep + 1} of {demoSteps.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Demo Results */
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Analysis Complete</span>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    Material Identified!
                                </h1>
                            </div>

                            {/* Sample Result */}
                            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white">Analysis Results</h3>
                                    <div className="flex items-center space-x-1 text-emerald-400">
                                        <CheckCircle className="h-5 w-5" />
                                        <span className="font-medium">99.2% Confident</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-xl p-4 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-2xl font-bold text-white">Granite</h4>
                                        <span className="text-emerald-400 font-bold text-lg">$45-65/sq ft</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Natural stone', 'Heat resistant', 'Unique patterns'].map((feature, index) => (
                                            <span key={index} className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-xl font-bold text-white">3</div>
                                        <div className="text-gray-400 text-sm">Local Suppliers</div>
                                    </div>
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-xl font-bold text-white">12</div>
                                        <div className="text-gray-400 text-sm">Available Samples</div>
                                    </div>
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-xl font-bold text-white">2.1s</div>
                                        <div className="text-gray-400 text-sm">Analysis Time</div>
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

                            <div className="text-center space-y-4">
                                <button
                                    onClick={restartDemo}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                                >
                                    Try Demo Again
                                </button>

                                <Link
                                    href="/apps/countertop-analyzer"
                                    className="block w-full border-2 border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                                >
                                    Use Real App
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Demo Stats */}
            <section className="pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white text-center mb-6">
                            Why Material ID AI Works
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">99.8%</div>
                                <div className="text-gray-400 text-sm">Accuracy Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">2s</div>
                                <div className="text-gray-400 text-sm">Average Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">500K+</div>
                                <div className="text-gray-400 text-sm">Materials ID'd</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">50K+</div>
                                <div className="text-gray-400 text-sm">Users</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
        </div>
    )
}
