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
        color: 'from-blue-500 to-purple-600'
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
        color: 'from-purple-500 to-pink-600'
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
        color: 'from-purple-500 to-indigo-600'
    }
]

const categories = ['All', 'Kitchen', 'Communication', 'Business', 'Structural', 'Roofing']

export default function AppsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState('grid')

    const filteredApps = aiToolApps.filter(app => {
        const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.category.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="relative flex-1 flex flex-col">
            {/* Background Image with Parallax */}
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat transform-gpu parallax-bg"
                style={{
                    backgroundImage: 'url(/kitchen-luxury.jpg)',
                    backgroundAttachment: 'fixed',
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                }}
            ></div>

            {/* Background Overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/80"></div>

            {/* Main Content - This allows footer to show */}
            <div className="relative z-10 flex flex-col flex-1">
                {/* Header Section */}
                <section className="pt-24 pb-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center space-x-2 mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl blur-md opacity-75"></div>
                                    <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-xl">
                                        <Brain className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                    AI Construction Apps
                                </h1>
                            </div>

                            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                                Powerful AI tools designed specifically for construction professionals.
                                Each app solves real jobsite challenges with cutting-edge technology.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                                    <div className="text-2xl font-bold text-white">{aiToolApps.length}</div>
                                    <div className="text-gray-300 text-sm">Apps Available</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                                    <div className="text-2xl font-bold text-white">50k+</div>
                                    <div className="text-gray-300 text-sm">Users</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                                    <div className="text-2xl font-bold text-white">4.9★</div>
                                    <div className="text-gray-300 text-sm">Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                {/* Search */}
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search apps..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category} className="bg-gray-900 text-white">
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                </div>

                                {/* View Toggle */}
                                <div className="flex bg-white/10 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Results count */}
                            <div className="mt-4 text-gray-300 text-sm">
                                Showing {filteredApps.length} of {aiToolApps.length} apps
                                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                                {searchTerm && ` matching "${searchTerm}"`}
                            </div>
                        </div>

                        {/* Apps Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredApps.map((app) => {
                                const IconComponent = app.icon

                                return (
                                    <div key={app.id} className="group relative">
                                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
                                            {/* App Icon and Badges */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`w-14 h-14 bg-gradient-to-r ${app.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconComponent className="h-7 w-7 text-white" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    {app.popular && (
                                                        <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full">Popular</span>
                                                    )}
                                                    {app.trending && (
                                                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">Trending</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* App Info */}
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                                    {app.name}
                                                </h3>
                                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                                    {app.description}
                                                </p>

                                                {/* Features */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {app.features.map((feature, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                                <div className="flex flex-col">
                                                    <span className="text-blue-400 text-sm">{app.category}</span>
                                                    <span className="text-green-400 font-semibold">{app.pricing}</span>
                                                </div>

                                                <div className="flex gap-2">
                                                    {app.demoUrl && (
                                                        <Link
                                                            href={app.demoUrl}
                                                            className="p-2 border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors"
                                                        >
                                                            <Play className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={app.href}
                                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                                                    >
                                                        <span>Open</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* No Results */}
                        {filteredApps.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No apps found</h3>
                                <p className="text-gray-400 mb-4">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('')
                                        setSelectedCategory('All')
                                    }}
                                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to Transform Your Work?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Join thousands of contractors using AI to work smarter, not harder.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/auth/signup"
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <span>Get Started Free</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/voice-consultation"
                                    className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Brain className="w-5 h-5" />
                                    <span>Talk to AI</span>
                                </Link>
                            </div>

                            <p className="text-blue-200 mt-6 text-sm">
                                No credit card required • 14-day free trial • Cancel anytime
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}