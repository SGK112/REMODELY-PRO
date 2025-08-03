'use client'

import Link from 'next/link'
import { ArrowRight, Brain, Bot, BarChart3, Target, TrendingUp, Building2, Home, Calendar, CheckCircle, Zap, Crown, Users } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'

export default function HomePage() {
  const [contractorCount, setContractorCount] = useState(2750)
  const [projectsCompleted, setProjectsCompleted] = useState(15000)
  const [aiMatchAccuracy, setAiMatchAccuracy] = useState(94.0)
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Memoized parallax transforms for performance
  const parallaxTransforms = useMemo(() => ({
    hero: isClient ? `translateY(${scrollY * 0.5}px)` : 'translateY(0px)',
    services: isClient ? `translateY(${scrollY * 0.3}px)` : 'translateY(0px)',
    cta: isClient ? `translateY(${scrollY * 0.2}px)` : 'translateY(0px)',
  }), [scrollY, isClient])

  useEffect(() => {
    // Set client-side flag
    setIsClient(true)

    // Bulletproof stats animation
    const interval = setInterval(() => {
      setContractorCount(prev => Math.min(prev < 3247 ? prev + 2 : 3247, 3247))
      setProjectsCompleted(prev => Math.min(prev < 18500 ? prev + 5 : 18500, 18500))
      setAiMatchAccuracy(prev => Math.min(prev < 97.8 ? +(prev + 0.1).toFixed(1) : 97.8, 97.8))
    }, 80)

    // Bulletproof scroll handler with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (typeof window !== 'undefined') {
            setScrollY(window.scrollY || 0)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // Safe event listener attachment
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (interval) clearInterval(interval)
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Bulletproof Parallax Background */}
        <div
          className="absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: parallaxTransforms.hero,
          }}
        />

        {/* Professional Construction Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 z-5"></div>

        {/* Floating Elements - Professional Tones */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-left space-y-6 lg:space-y-8 order-1 lg:order-1">
              {/* Free Version Status Badge */}
              <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm border border-slate-500/30 rounded-full mt-4 lg:mt-6">
                <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-slate-300 mr-2 lg:mr-3" />
                <span className="text-white font-medium text-sm lg:text-base">Professional AI Contractor Matching</span>
                <div className="ml-2 lg:ml-3 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {/* Version Toggle */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-1 border border-slate-600/30">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-slate-700 to-slate-600 text-white text-sm font-semibold">
                      REMODELY AI
                    </button>
                    <button className="px-4 py-2 rounded-lg text-slate-300 hover:text-white text-sm font-semibold transition-colors">
                      Upgrade to PRO
                    </button>
                  </div>
                  <span className="text-blue-400 text-sm font-medium">Free Version</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-white">REMODELY</span>
                  <span className="block bg-gradient-to-r from-slate-300 via-slate-200 to-white bg-clip-text text-transparent">AI</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 max-w-2xl leading-relaxed">
                  The complete <span className="text-blue-400 font-semibold">AI-powered renovation marketplace</span> connecting homeowners, contractors, designers, and facilities with qualified renovation professionals.
                </p>

                {/* Target Audience Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium">Homeowners</span>
                  <span className="px-3 py-1 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium">Contractors</span>
                  <span className="px-3 py-1 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium">Designers</span>
                  <span className="px-3 py-1 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium">Facilities</span>
                  <span className="px-3 py-1 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium">Commercial</span>
                </div>

                {/* PRO Features Teaser */}
                <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm border border-slate-500/30 rounded-xl p-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-blue-400 font-semibold text-sm">Professional Features Available</div>
                      <div className="text-slate-300 text-sm">Advanced AI matching, unlimited projects, enterprise support</div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
                      Upgrade to PRO →
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Grid - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                <div className="text-center p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400">{contractorCount.toLocaleString()}</div>
                  <div className="text-xs lg:text-sm text-slate-300">Verified Contractors</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400">{aiMatchAccuracy}%</div>
                  <div className="text-xs lg:text-sm text-slate-300">Match Accuracy</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400">{projectsCompleted.toLocaleString()}</div>
                  <div className="text-xs lg:text-sm text-slate-300">Projects Completed</div>
                </div>
              </div>

              {/* CTA Buttons - FREE Version */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Link
                  href="/search"
                  className="group inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm lg:text-base"
                >
                  <Brain className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
                  Start Free Matching
                  <ArrowRight className="ml-2 lg:ml-3 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-slate-800/60 backdrop-blur-sm text-white font-semibold rounded-xl border border-blue-400/30 hover:bg-slate-700/70 hover:border-blue-400/50 transition-all duration-300 text-sm lg:text-base"
                >
                  <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
                  Get Free Quote
                </Link>
              </div>
            </div>

            {/* Right Panel - Mobile Optimized */}
            <div className="relative order-2 lg:order-2 mb-8 lg:mb-0">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl border border-amber-200/50 transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-600 to-cyan-700 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                    <Brain className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">REMODELY AI - Free Platform</h3>
                  <p className="text-slate-600 text-sm lg:text-base">Smart contractor matching & basic project tools</p>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300">
                    <Target className="w-6 h-6 lg:w-8 lg:h-8 text-blue-700 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-blue-800 text-sm lg:text-base">Basic Matching</div>
                    <div className="text-xs lg:text-sm text-slate-600">3 contractor matches</div>
                  </div>

                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-cyan-50 to-teal-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300">
                    <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-700 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-cyan-800 text-sm lg:text-base">Price Estimates</div>
                    <div className="text-xs lg:text-sm text-slate-600">Basic cost calculator</div>
                  </div>

                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300">
                    <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-700 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-emerald-800 text-sm lg:text-base">Simple Planning</div>
                    <div className="text-xs lg:text-sm text-slate-600">Basic timeline tools</div>
                  </div>

                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300 relative">
                    <div className="absolute top-1 right-1 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">PRO</div>
                    <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-gray-400 text-sm lg:text-base">Auto-Verify</div>
                    <div className="text-xs lg:text-sm text-gray-400">Upgrade required</div>
                  </div>
                </div>

                {/* Upgrade CTA */}
                <div className="mt-4 lg:mt-6 text-center">
                  <button className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-amber-700 hover:to-orange-800 transition-all">
                    🚀 Upgrade to PRO for Full Features
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Use REMODELY AI - Audience Specific Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Who Benefits from REMODELY AI?
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Our platform serves every stakeholder in the home renovation ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Homeowners */}
            <div className="bg-gradient-to-br from-blue-900/40 to-slate-800/60 p-6 lg:p-8 rounded-2xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Home className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Homeowners</h3>
              </div>
              <p className="text-slate-300 mb-4">Transform your kitchen, bathroom, or outdoor space with confidence</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• AI-powered contractor matching based on your project</li>
                <li>• Transparent pricing and verified professional reviews</li>
                <li>• Access to 3,200+ pre-vetted renovation contractors</li>
                <li>• Project management tools and timeline tracking</li>
                <li>• Direct marketplace access to materials and services</li>
              </ul>
              <Link href="/search" className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold text-sm">
                Find Your Contractor →
              </Link>
            </div>

            {/* Contractors */}
            <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800/60 p-6 lg:p-8 rounded-2xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Building2 className="w-8 h-8 text-emerald-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Contractors & Installers</h3>
              </div>
              <p className="text-slate-300 mb-4">Grow your business with qualified leads and professional tools</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Automated lead generation from our matching system</li>
                <li>• Professional business listing with portfolio showcase</li>
                <li>• Sell materials and services directly through marketplace</li>
                <li>• Project management and invoicing tools</li>
                <li>• Verified reviews and reputation building</li>
              </ul>
              <Link href="/signup/contractor" className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 font-semibold text-sm">
                Join as Professional →
              </Link>
            </div>

            {/* Designers */}
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-800/60 p-6 lg:p-8 rounded-2xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Brain className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Interior Designers</h3>
              </div>
              <p className="text-slate-300 mb-4">Access qualified contractors and premium materials for your projects</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Pre-vetted contractor network for reliable partnerships</li>
                <li>• Access to exclusive designer materials and finishes</li>
                <li>• Project collaboration tools with contractors</li>
                <li>• Client project tracking and progress updates</li>
                <li>• Professional trade pricing and bulk ordering</li>
              </ul>
              <Link href="/signup" className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-semibold text-sm">
                Designer Access →
              </Link>
            </div>

            {/* Facilities & Commercial */}
            <div className="bg-gradient-to-br from-amber-900/40 to-slate-800/60 p-6 lg:p-8 rounded-2xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Building2 className="w-8 h-8 text-amber-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Facilities & Commercial</h3>
              </div>
              <p className="text-slate-300 mb-4">Large-scale projects with enterprise-grade contractor matching</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Commercial-grade contractor verification process</li>
                <li>• Bulk project management and multiple site coordination</li>
                <li>• Enterprise pricing and volume discounts</li>
                <li>• Compliance tracking and certification verification</li>
                <li>• Dedicated account management (PRO only)</li>
              </ul>
              <Link href="/signup" className="inline-block mt-4 text-amber-400 hover:text-amber-300 font-semibold text-sm">
                Enterprise Solutions →
              </Link>
            </div>

            {/* Property Managers */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-slate-800/60 p-6 lg:p-8 rounded-2xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-cyan-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Property Managers</h3>
              </div>
              <p className="text-slate-300 mb-4">Streamline maintenance and renovation across multiple properties</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Multi-property project coordination</li>
                <li>• Emergency repair contractor network</li>
                <li>• Standardized pricing and service agreements</li>
                <li>• Tenant communication and scheduling tools</li>
                <li>• Maintenance history and warranty tracking</li>
              </ul>
              <Link href="/signup" className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 font-semibold text-sm">
                Property Management →
              </Link>
            </div>

            {/* General Contractors */}
            <div className="bg-gradient-to-br from-orange-900/40 to-slate-800/60 p-6 lg:p-8 rounded-2xl border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-white">General Contractors</h3>
              </div>
              <p className="text-slate-300 mb-4">Find specialized subcontractors and coordinate complex renovation projects</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Network of specialized renovation contractors</li>
                <li>• Subcontractor reliability and quality ratings</li>
                <li>• Project coordination and scheduling tools</li>
                <li>• Material sourcing and delivery coordination</li>
                <li>• Progress tracking and milestone management</li>
              </ul>
              <Link href="/contractors" className="inline-block mt-4 text-orange-400 hover:text-orange-300 font-semibold text-sm">
                Find Subcontractors →
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 lg:mt-16">
            <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm border border-slate-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Next Project?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied customers who've found their perfect contractor match through REMODELY AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/search"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  Start Free Today
                </Link>
                <Link
                  href="/marketplace"
                  className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-slate-700 hover:to-slate-800 transition-all border border-slate-500"
                >
                  Browse Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path - Quick Access to Audience Pages */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Get started with solutions designed specifically for your role and project needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/for-homeowners"
              className="group bg-gradient-to-br from-blue-900/60 to-slate-800/80 p-6 rounded-2xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <Home className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Homeowners</h3>
                <p className="text-slate-400 text-sm mb-4">Transform your home with trusted professionals</p>
                <div className="text-blue-400 font-semibold text-sm group-hover:text-blue-300">
                  Start Your Project →
                </div>
              </div>
            </Link>

            <Link
              href="/for-contractors"
              className="group bg-gradient-to-br from-emerald-900/60 to-slate-800/80 p-6 rounded-2xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-600/30 transition-colors">
                  <Building2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Contractors</h3>
                <p className="text-slate-400 text-sm mb-4">Grow your business with qualified leads</p>
                <div className="text-emerald-400 font-semibold text-sm group-hover:text-emerald-300">
                  Join as Professional →
                </div>
              </div>
            </Link>

            <Link
              href="/for-designers"
              className="group bg-gradient-to-br from-purple-900/60 to-slate-800/80 p-6 rounded-2xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/30 transition-colors">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Designers</h3>
                <p className="text-slate-400 text-sm mb-4">Access elite contractors & materials</p>
                <div className="text-purple-400 font-semibold text-sm group-hover:text-purple-300">
                  Designer Access →
                </div>
              </div>
            </Link>

            <Link
              href="/for-commercial"
              className="group bg-gradient-to-br from-amber-900/60 to-slate-800/80 p-6 rounded-2xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600/30 transition-colors">
                  <Users className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Commercial</h3>
                <p className="text-slate-400 text-sm mb-4">Enterprise solutions at scale</p>
                <div className="text-amber-400 font-semibold text-sm group-hover:text-amber-300">
                  Enterprise Demo →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Services Section with Parallax */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        {/* Bulletproof Parallax Background Layer */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: parallaxTransforms.services,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-stone-800/85 to-amber-900/80 z-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Smart Renovation Solutions
            </h2>
            <p className="text-lg lg:text-xl text-stone-200 max-w-3xl mx-auto leading-relaxed">
              Whether you're planning a kitchen renovation, bathroom remodel, or complete home makeover, REMODELY AI helps you
              find the right contractors with smart matching and transparent pricing.
            </p>

            {/* Free vs PRO distinction */}
            <div className="flex justify-center mt-6">
              <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2">
                <span className="text-blue-400 font-semibold">✨ Available in FREE version</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Residential Projects */}
            <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-500 transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-amber-600 to-orange-700 rounded-xl lg:rounded-2xl flex items-center justify-center mr-4">
                  <Home className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white">Residential Projects</h3>
                  <p className="text-amber-200 text-sm lg:text-base">Premium home renovation solutions</p>
                </div>
              </div>

              <div className="space-y-3 lg:space-y-4 mb-6">
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-sm lg:text-base">AI-powered kitchen & bathroom design matching</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Budget optimization with predictive cost analysis</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Premium material sourcing and coordination</span>
                </div>
              </div>

              <div className="p-4 lg:p-6 bg-slate-700/50 rounded-xl border border-amber-400/20">
                <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-1">140M+</div>
                <div className="text-xs lg:text-sm text-stone-300">US households planning renovations annually</div>
              </div>
            </div>

            {/* Commercial Projects */}
            <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-orange-400/20 hover:border-orange-400/40 transition-all duration-500 transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-orange-600 to-red-700 rounded-xl lg:rounded-2xl flex items-center justify-center mr-4">
                  <Building2 className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white">Commercial Projects</h3>
                  <p className="text-orange-200 text-sm lg:text-base">Enterprise construction management</p>
                </div>
              </div>

              <div className="space-y-3 lg:space-y-4 mb-6">
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Multi-phase commercial project coordination</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Enterprise resource planning and optimization</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Compliance management and regulatory oversight</span>
                </div>
              </div>

              <div className="p-4 lg:p-6 bg-slate-700/50 rounded-xl border border-orange-400/20">
                <div className="text-2xl lg:text-3xl font-bold text-orange-400 mb-1">$472B</div>
                <div className="text-xs lg:text-sm text-stone-300">Annual North American construction market</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section with Parallax */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        {/* Bulletproof Parallax Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: parallaxTransforms.cta,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-slate-800/90 to-amber-900/85 z-5"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium mb-6 border border-cyan-400/20">
            <Zap className="w-4 h-4 mr-2" />
            Free Forever • No Credit Card Required
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Start Your Project Journey Today
          </h2>
          <p className="text-lg lg:text-xl text-stone-200 mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of property owners who use REMODELY AI for smart contractor matching.
            Start free, upgrade to PRO for unlimited access and premium features.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12">
            <Link
              href="/search"
              className="group inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl text-sm lg:text-base"
            >
              <Brain className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
              Start Free Matching
              <ArrowRight className="ml-2 lg:ml-3 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/upgrade"
              className="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-semibold rounded-xl hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 text-sm lg:text-base"
            >
              <Crown className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
              Upgrade to PRO
            </Link>
          </div>

          {/* Professional Stats Grid - Mobile Optimized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 text-center">
            <div className="p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-amber-400/20">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{contractorCount.toLocaleString()}+</div>
              <div className="text-xs lg:text-sm text-stone-300">Verified Professionals</div>
            </div>
            <div className="p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-emerald-400/20">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{projectsCompleted.toLocaleString()}+</div>
              <div className="text-xs lg:text-sm text-stone-300">Projects Delivered</div>
            </div>
            <div className="p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-orange-400/20">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{aiMatchAccuracy}%</div>
              <div className="text-xs lg:text-sm text-stone-300">Match Accuracy</div>
            </div>
            <div className="p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-red-400/20">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">27</div>
              <div className="text-xs lg:text-sm text-stone-300">Data Sources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer and Contractor CTAs */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Choose Your Path
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking to renovate your home or grow your contracting business,
              REMODELY AI provides the tools and connections you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer CTA */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-500/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 hover:border-slate-400/40">
              <Home className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">For Homeowners</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Get professional stone surface installation with verified contractors.
                Competitive quotes, quality assurance, and seamless project management.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  Free quotes from verified contractors
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  AI-powered contractor matching
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  Project management tools
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  Professional marketplace access
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-blue-900/25"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/marketplace"
                  className="inline-flex items-center bg-transparent border-2 border-blue-600 text-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  Browse Products
                </Link>
              </div>
            </div>

            {/* Contractor CTA */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-500/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 hover:border-slate-400/40">
              <Building2 className="h-10 w-10 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">For Contractors</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Join our verified network of stone surface professionals.
                Access qualified leads, manage projects, and grow your business.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  High-quality verified leads
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  Professional profile showcase
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  Business management tools
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  Marketplace to sell products
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/auth/register?type=contractor"
                  className="inline-flex items-center bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-amber-900/25"
                >
                  Join Network
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/marketplace"
                  className="inline-flex items-center bg-transparent border-2 border-amber-600 text-amber-400 px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 hover:text-white transition-all duration-200"
                >
                  View Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}