'use client'

import Link from 'next/link'
import { Brain, Hammer, Calculator, Mic, Eye, Palette, ArrowRight, Zap, Shield, Award, Home, Play, PhoneCall, CheckCircle, Star, TrendingUp } from 'lucide-react'
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
  }
]

export default function HomePage() {
  const [showAllApps, setShowAllApps] = useState(false)
  const displayedApps = showAllApps ? aiToolApps : aiToolApps.slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Mobile-First Hero Section */}
      <section className="relative pt-6 pb-12 px-4 overflow-hidden">
        {/* Background Effects - Subtle for mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-10 right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>

        <div className="relative max-w-6xl mx-auto">
          {/* Mobile Logo/Brand */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="relative">
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl blur-md opacity-75"></div>
              <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">REMODELY</span>
                <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">.ai</span>
              </div>
              <span className="text-xs text-gray-300 -mt-1">AI Apps for Construction</span>
            </div>
          </div>

          {/* Mobile-Optimized Headlines */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight px-2">
              AI Apps for
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-1">
                Construction Pros
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed px-2">
              Transform your business with AI. Each app solves specific construction challenges.
            </p>

            {/* Mobile-First CTA Buttons */}
            <div className="flex flex-col space-y-3 mb-8 max-w-sm mx-auto">
              <Link
                href="#apps"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 w-full"
              >
                <span>Explore AI Apps</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex space-x-3">
                <Link
                  href="/demo"
                  className="flex-1 border-2 border-white/30 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Demo</span>
                </Link>

                <Link
                  href="/consultation"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to AI</span>
                </Link>
              </div>
            </div>

            {/* Mobile Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-gray-400 text-sm">Accuracy</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized AI Apps Section */}
      <section id="apps" className="py-12 px-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              AI Construction Apps
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto px-2">
              Each app is designed for mobile-first usage. Get AI power in your pocket.
            </p>
          </div>

          {/* Mobile-First Apps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayedApps.map((app) => (
              <div key={app.id} className="group relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${app.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

                {/* Mobile-Optimized Card */}
                <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  {/* Header with Icon and Badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${app.color} rounded-xl flex items-center justify-center group-hover:shadow-2xl transition-shadow duration-300`}>
                      <app.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      {app.popular && (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Popular</span>
                        </span>
                      )}
                      {app.trending && (
                        <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Trending</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="text-blue-400 text-sm font-medium mb-2">{app.category}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">{app.name}</h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">{app.description}</p>

                  {/* Features - Mobile Optimized */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.features.map((feature, index) => (
                      <span key={index} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="text-blue-400 font-semibold mb-4">{app.pricing}</div>

                  {/* Mobile Actions - Stacked */}
                  <div className="flex flex-col space-y-2">
                    <Link
                      href={app.href}
                      className={`group/btn bg-gradient-to-r ${app.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center space-x-2`}
                    >
                      <span>Launch App</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={app.demoUrl}
                      className="border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Try Demo</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Apps Button */}
          {!showAllApps && aiToolApps.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllApps(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <span>View All {aiToolApps.length} Apps</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Benefits Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose REMODELY.ai?
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white/5 rounded-xl p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Mobile-First AI</h3>
                <p className="text-gray-300 text-sm">Designed specifically for mobile use. Access powerful AI from any jobsite.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/5 rounded-xl p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Voice AI Ready</h3>
                <p className="text-gray-300 text-sm">Every app includes voice commands. Work hands-free on the jobsite.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/5 rounded-xl p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Offline Capable</h3>
                <p className="text-gray-300 text-sm">Key features work offline. No internet? No problem on remote jobsites.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/5 rounded-xl p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Instant Results</h3>
                <p className="text-gray-300 text-sm">Get calculations and estimates in under 2 seconds. Built for speed.</p>
              </div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-sm mx-auto">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-white mb-1">99.8%</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-white mb-1">&lt;2s</div>
              <div className="text-gray-400 text-sm">Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Go Mobile?
          </h2>
          <p className="text-lg text-blue-100 mb-8 px-2">
            Join thousands using AI on their phones to streamline construction work.
          </p>

          <div className="flex flex-col space-y-3 max-w-sm mx-auto">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Free Trial
            </Link>

            <Link
              href="/consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Talk to Sarah AI</span>
            </Link>
          </div>

          <p className="text-blue-200 mt-6 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}
