'use client'

import { ArrowLeft, Palette, Wrench, Star, Play } from 'lucide-react'
import Link from 'next/link'

export default function CabinetDesigner() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
                                <Palette className="w-6 h-6 text-purple-600" />
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Cabinet Designer AI</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm text-gray-600 hidden sm:inline">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Coming Soon Section */}
                <div className="text-center space-y-8">
                    {/* Icon */}
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                        <Palette className="w-12 h-12 text-white" />
                    </div>

                    {/* Title */}
                    <div className="space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                            Cabinet Designer AI
                        </h2>
                        <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                            <Wrench className="w-4 h-4" />
                            <span className="font-semibold">In Development</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="max-w-2xl mx-auto space-y-6">
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Our AI-powered cabinet designer is coming soon! Design custom cabinets with intelligent 3D preview,
                            automatic measurements, and style matching technology.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <Play className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">3D Preview</h3>
                                <p className="text-gray-600 text-sm">See your designs in realistic 3D before building</p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <Wrench className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Auto Measure</h3>
                                <p className="text-gray-600 text-sm">AI-powered measurement from your phone camera</p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <Star className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Style Match</h3>
                                <p className="text-gray-600 text-sm">Match existing décor with AI style analysis</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-4">Be the First to Know</h3>
                            <p className="text-purple-100 mb-6">
                                Get notified when Cabinet Designer AI launches. Join our early access program.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                                    Join Early Access
                                </button>
                                <Link
                                    href="/"
                                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors text-center"
                                >
                                    Explore Other Apps
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
