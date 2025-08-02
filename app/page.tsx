'use client'

import Link from 'next/link'
import { ArrowRight, Brain, Bot, BarChart3, Target, TrendingUp, Building2, Home, Calendar, CheckCircle } from 'lucide-react'
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
    <div className="relative bg-gradient-to-br from-slate-50 to-stone-100 min-h-screen">
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-stone-800/80 to-amber-900/75 z-5"></div>

        {/* Floating Elements - Professional Tones */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-amber-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-left space-y-6 lg:space-y-8 order-1 lg:order-1">
              {/* Professional Status Badge */}
              <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-amber-600/20 to-orange-700/20 backdrop-blur-sm border border-amber-400/30 rounded-full mt-4 lg:mt-6">
                <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400 mr-2 lg:mr-3" />
                <span className="text-white font-medium text-sm lg:text-base">Professional AI-Powered Matching</span>
                <div className="ml-2 lg:ml-3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-white">REMODELY</span>
                  <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent">AI PRO</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-stone-200 max-w-2xl leading-relaxed">
                  Professional <span className="text-amber-400 font-semibold">AI-driven construction marketplace</span> connecting contractors with commercial and residential projects across North America.
                </p>
              </div>

              {/* Stats Grid - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                <div className="text-center p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400">{contractorCount.toLocaleString()}</div>
                  <div className="text-xs lg:text-sm text-stone-300">Verified Contractors</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-emerald-400">{aiMatchAccuracy}%</div>
                  <div className="text-xs lg:text-sm text-stone-300">Match Accuracy</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-400">{projectsCompleted.toLocaleString()}</div>
                  <div className="text-xs lg:text-sm text-stone-300">Projects Completed</div>
                </div>
              </div>

              {/* CTA Buttons - Mobile First */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Link
                  href="/search"
                  className="group inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm lg:text-base"
                >
                  <Brain className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
                  Start Professional Matching
                  <ArrowRight className="ml-2 lg:ml-3 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-slate-800/60 backdrop-blur-sm text-white font-semibold rounded-xl border border-amber-400/30 hover:bg-slate-700/70 hover:border-amber-400/50 transition-all duration-300 text-sm lg:text-base"
                >
                  <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
                  Get Professional Quote
                </Link>
              </div>
            </div>

            {/* Right Panel - Mobile Optimized */}
            <div className="relative order-2 lg:order-2 mb-8 lg:mb-0">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl border border-amber-200/50 transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-amber-600 to-orange-700 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                    <Brain className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">Professional AI Platform</h3>
                  <p className="text-slate-600 text-sm lg:text-base">Intelligent project management & contractor matching</p>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300">
                    <Target className="w-6 h-6 lg:w-8 lg:h-8 text-amber-700 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-amber-800 text-sm lg:text-base">Smart Matching</div>
                    <div className="text-xs lg:text-sm text-slate-600">AI contractor selection</div>
                  </div>

                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-orange-50 to-red-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300">
                    <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-orange-700 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-orange-800 text-sm lg:text-base">Price Intelligence</div>
                    <div className="text-xs lg:text-sm text-slate-600">Market-based pricing</div>
                  </div>

                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300">
                    <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-700 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-emerald-800 text-sm lg:text-base">Project AI</div>
                    <div className="text-xs lg:text-sm text-slate-600">Smart scheduling</div>
                  </div>

                  <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-300">
                    <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-blue-700 mx-auto mb-2 lg:mb-3" />
                    <div className="font-bold text-blue-800 text-sm lg:text-base">Auto-Verify</div>
                    <div className="text-xs lg:text-sm text-slate-600">Credential validation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Professional Services Section with Parallax */}
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
              Professional Construction Solutions
            </h2>
            <p className="text-lg lg:text-xl text-stone-200 max-w-3xl mx-auto leading-relaxed">
              From residential renovations to commercial developments, our AI platform delivers
              specialized solutions for every construction project scale and complexity.
            </p>
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Transform Your Vision Into Reality
          </h2>
          <p className="text-lg lg:text-xl text-stone-200 mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of property owners and contractors who trust REMODELY AI PRO
            for intelligent project matching and professional construction management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12">
            <Link
              href="/search"
              className="group inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-stone-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-sm lg:text-base"
            >
              <Brain className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
              Start Professional Matching
              <ArrowRight className="ml-2 lg:ml-3 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contractors"
              className="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-semibold rounded-xl hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 text-sm lg:text-base"
            >
              <Building2 className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
              Join as Professional
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
    </div>
  )
}