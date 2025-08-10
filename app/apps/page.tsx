'use client'

import Link from 'next/link'
import { Brain, Hammer, Calculator, Mic, Eye, Palette, ArrowRight, Zap, Shield, Award, Home, Play, Filter, Search, Grid, List } from 'lucide-react'
import { useState } from 'react'

// Mobile-optimized AI tool applications
const aiToolApps = [
    {
        id: 'countertop-analyzer',
        name: 'Material ID AI',
        shortName: 'Material AI',
        description: 'Instantly identify stone materials with your phone camera. Get accurate results in seconds.',
        icon: Eye,
        category: 'Kitchen',
        pricing: 'Free',
        features: ['Photo ID', 'Cost estimates', 'Supplier info'],
        href: '/apps/countertop-analyzer',
        demoUrl: '/apps/countertop-analyzer/demo',
        color: 'from-emerald-500 to-teal-600',
        popular: true
    },
    {
        id: 'voice-translation',
        name: 'Voice Translator',
        shortName: 'Translator',
        description: 'Real-time voice translation for your construction crew. Works offline.',
        icon: Mic,
        category: 'Communication',
        pricing: '$29/mo',
        features: ['12+ languages', 'Offline mode', 'Construction terms'],
        href: '/apps/voice-translation',
        demoUrl: '/apps/voice-translation/demo',
        color: 'from-blue-500 to-cyan-600'
    },
    {
        id: 'cabinet-designer',
        name: 'Cabinet Designer',
        shortName: 'Designer',
        description: 'AI cabinet design with 3D preview. Measure with your phone.',
        icon: Palette,
        category: 'Kitchen',
        pricing: '$39/mo',
        features: ['3D preview', 'Auto measure', 'Style match'],
        href: '/apps/cabinet-designer',
        demoUrl: '/apps/cabinet-designer/demo',
        color: 'from-blue-400 to-cyan-500'
    },
    {
        id: 'handyman-assistant',
        name: 'Handyman AI',
        shortName: 'Handyman',
        description: 'Complete business management. AI handles scheduling and estimates.',
        icon: Hammer,
        category: 'Business',
        pricing: '$49/mo',
        features: ['AI scheduling', 'Auto estimates', 'Customer chat'],
        href: '/apps/handyman-assistant',
        demoUrl: '/apps/handyman-assistant/demo',
        color: 'from-orange-500 to-red-600',
        trending: true
    },
    {
        id: 'framing-calculator',
        name: 'Framing Calculator',
        shortName: 'Framing',
        description: 'Advanced load calculations and code compliance checking.',
        icon: Calculator,
        category: 'Structural',
        pricing: '$59/mo',
        features: ['Load calc', 'Code check', 'Cost analysis'],
        href: '/apps/framing-calculator',
        demoUrl: '/apps/framing-calculator/demo',
        color: 'from-indigo-500 to-blue-600'
    },
    {
        id: 'roofing-measurement',
        name: 'Roof Measurement',
        shortName: 'Roofing',
        description: 'Measure roofs from satellite images. Accurate material estimates.',
        icon: Home,
        category: 'Roofing',
        pricing: '$39/mo',
        features: ['Satellite measure', 'Material calc', 'Safety plan'],
        href: '/apps/roofing-measurement',
        demoUrl: '/apps/roofing-measurement/demo',
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 'ai-voice-assistants',
        name: 'Voice Assistants',
        shortName: 'Voice AI',
        description: 'Meet David and Sarah - your AI construction assistants with specialized expertise.',
        icon: Brain,
        category: 'Communication',
        pricing: '$29/mo',
        features: ['Expert advice', 'Voice commands', '24/7 support'],
        href: '/apps/ai-voice-assistants',
        demoUrl: '/apps/ai-voice-assistants/demo',
        color: 'from-blue-500 to-cyan-600'
    }
]

const categories = ['All', 'Kitchen', 'Communication', 'Business', 'Structural', 'Roofing']

export default function AppsPage() {
    // Placeholder AI tools for future expansion
    const placeholderApps = Array(6).fill(null).map((_, i) => ({
        id: `placeholder-${i}`,
        name: 'Coming Soon',
        description: 'New AI tool launching soon. Stay tuned!',
        icon: Zap,
        category: 'TBD',
        pricing: 'TBD',
        features: ['AI-powered', 'Cutting-edge', 'Beta'],
        href: '#',
        demoUrl: '',
        color: 'from-gray-800 to-gray-900',
        isPlaceholder: true as true
    }))

    return (
        <div className="relative flex-1 flex flex-col min-h-screen bg-gray-950 text-gray-100">
            {/* Remove gradient backgrounds */}
            <div className="fixed inset-0 bg-gray-950"></div>
            <div className="fixed inset-0 bg-grid-slate-800/10 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
            <div className="fixed inset-0"></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col flex-1">
                <section className="pt-24 pb-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center space-x-2 mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 w-12 h-12 bg-green-500 rounded-xl blur-md opacity-75"></div>
                                    <div className="relative w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-xl border-2 border-green-400">
                                        <Brain className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-bold text-green-400">
                                    RemodelyPro AI Tools
                                </h1>
                            </div>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                                Discover our suite of AI-powered tools for construction, remodeling, and home improvement. More coming soon!
                            </p>
                        </div>

                        {/* Modern AI Tool Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {placeholderApps.map((app) => {
                                const IconComponent = app.icon
                                const isPlaceholder = app.isPlaceholder
                                return (
                                    <div key={app.id} className="group relative">
                                        <div className={`bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border-2 ${isPlaceholder ? 'border-green-400 border-dashed' : 'border-orange-400'} shadow-lg hover:bg-gray-900 transition-all duration-300 h-full flex flex-col`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-green-400`}>
                                                    <IconComponent className="h-7 w-7 text-white" />
                                                </div>
                                                {isPlaceholder && (
                                                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full border-2 border-green-400">Coming Soon</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                                                    {app.name}
                                                </h3>
                                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                                    {app.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {app.features.map((feature: string, index: number) => (
                                                        <span key={index} className="px-2 py-1 bg-gray-800 text-green-300 text-xs rounded-lg border border-green-400">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                                <div className="flex flex-col">
                                                    <span className="text-orange-400 text-sm">{app.category}</span>
                                                    <span className="text-green-400 font-semibold">{app.pricing}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Modern CTA Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-green-600 backdrop-blur-sm rounded-3xl p-8 border-2 border-green-400 shadow-xl">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to Build with AI?
                            </h2>
                            <p className="text-xl text-green-100 mb-8">
                                Sign up to get early access to new tools and features.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/auth/signup" className="bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-green-400">
                                    <span>Get Started Free</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/voice-consultation" className="border-2 border-green-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-900 transition-all duration-300 flex items-center justify-center space-x-2">
                                    <Brain className="w-5 h-5" />
                                    <span>Talk to AI</span>
                                </Link>
                            </div>
                            <p className="text-green-200 mt-6 text-sm">
                                No credit card required • 14-day free trial • Cancel anytime
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}