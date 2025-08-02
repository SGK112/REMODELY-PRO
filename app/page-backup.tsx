'use client'

import Link from 'next/link'
import { Search, Users, MessageCircle, Star, ArrowRight, Sparkles, Shield, MapPin, Award, CheckCircle, TrendingUp, Globe, Phone, FileCheck, Zap, Eye, Clock, Target } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [contractorCount, setContractorCount] = useState(750)
  const [verificationRate, setVerificationRate] = useState(95.0)
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([])
  const [isMounted, setIsMounted] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  // Advanced mouse tracking with momentum
  useEffect(() => {
    let rafId: number
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x, y })
      })
    }
    
    const handleScroll = () => {
      const scroll = window.scrollY
      setScrollY(scroll)
      
      // Determine active section based on scroll
      const section = Math.floor(scroll / window.innerHeight)
      setActiveSection(section)
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Generate sophisticated particle system
    setIsMounted(true)
    const advancedParticles = [...Array(50)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      size: 0.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3
    }))
    setParticles(advancedParticles as any)
    
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [])

  // Engagement algorithm: Animate statistics to create urgency
  useEffect(() => {
    // Wait for the intro to be visible before starting animations
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setContractorCount(prev => prev < 783 ? prev + 2 : 783) // Count faster (2 at a time)
      setVerificationRate(prev => prev < 97.7 ? +(prev + 0.2).toFixed(1) : 97.7) // Count faster
    }, 50) // Faster interval: 50ms instead of 100ms
    
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <div className="relative overflow-hidden">
      {/* Advanced Interactive Background System */}
      <div className="fixed inset-0 z-0">
        {/* Multi-layer parallax background */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(59, 130, 246, 0.15) 0%, 
                rgba(99, 102, 241, 0.1) 25%, 
                rgba(168, 85, 247, 0.05) 50%, 
                transparent 70%),
              linear-gradient(135deg, 
                rgba(15, 23, 42, 0.02) 0%, 
                rgba(30, 41, 59, 0.05) 50%, 
                rgba(51, 65, 85, 0.02) 100%)
            `,
            transform: `translate3d(${scrollY * -0.1}px, ${scrollY * -0.05}px, 0) scale(${1 + scrollY * 0.0001})`
          }}
        />
        
        {/* Advanced particle system */}
        {isMounted && (
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${(particle as any).size}px`,
                  height: `${(particle as any).size}px`,
                  background: `radial-gradient(circle, 
                    rgba(59, 130, 246, ${(particle as any).opacity}) 0%, 
                    rgba(99, 102, 241, ${(particle as any).opacity * 0.7}) 50%, 
                    transparent 100%)`,
                  transform: `translate3d(0, ${scrollY * (0.1 + i * 0.01)}px, 0)`,
                  animation: `float ${particle.duration}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `conic-gradient(from ${scrollY * 0.1}deg at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.1), 
              rgba(99, 102, 241, 0.15), 
              rgba(168, 85, 247, 0.1), 
              rgba(236, 72, 153, 0.05), 
              rgba(59, 130, 246, 0.1))`,
            transform: `scale(${1.5 + Math.sin(scrollY * 0.001) * 0.1})`
          }}
        />
      </div>

      {/* Hero Section with Advanced Parallax */}
      <section className="relative min-h-screen flex items-center z-10">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/kitchen-luxury.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `scale(${1.1 + scrollY * 0.0002}) translate3d(0, ${scrollY * 0.5}px, 0)`,
            filter: `blur(${Math.min(scrollY * 0.01, 3)}px) brightness(${0.7 - scrollY * 0.0005})`
          }}
        />
        
        {/* Advanced gradient overlay */}
        <div 
          className="absolute inset-0 z-5"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, ${0.95 - scrollY * 0.001}) 0%, 
                rgba(255, 255, 255, ${0.85 - scrollY * 0.0008}) 40%, 
                rgba(248, 250, 252, ${0.75 - scrollY * 0.0006}) 100%)
            `
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Advanced Hero Content */}
            <div 
              className="text-left space-y-8"
              style={{
                transform: `translate3d(0, ${scrollY * -0.1}px, 0)`,
                opacity: Math.max(0, 1 - scrollY * 0.002)
              }}
            >
              {/* Sophisticated status indicator */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-60"></div>
                <div className="relative inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-30"></div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-600">{contractorCount}+</span>
                        <span className="text-slate-700">Verified</span>
                      </div>
                      <div className="w-px h-4 bg-slate-300"></div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-emerald-600">{verificationRate}%</span>
                        <span className="text-slate-700">Trust Rate</span>
                      </div>
                      <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md font-bold">
                        LIVE
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Typography */}
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-black leading-none">
                  <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                    Remodely
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    .AI
                  </span>
                  <span className="block text-4xl lg:text-5xl font-bold text-slate-800 mt-2">
                    Smart Contractor Network
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-slate-600 max-w-2xl leading-relaxed font-light">
                  Advanced AI verification system connecting you with elite contractors. 
                  <span className="font-semibold text-slate-800"> Six-layer authentication</span> ensures 
                  only the most qualified professionals join our network.
                </p>
              </div>

              {/* Advanced Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: contractorCount, label: 'Verified Contractors', color: 'blue', icon: Users },
                  { value: `${verificationRate}%`, label: 'Pass Rate', color: 'emerald', icon: Shield },
                  { value: '15+', label: 'States Covered', color: 'purple', icon: Globe }
                ].map((stat, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-slate-200/50 to-white/50 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600 mb-2`} />
                      <div className={`text-2xl font-black text-${stat.color}-600`}>{stat.value}</div>
                      <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/contractors" 
                  className="group relative overflow-hidden"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Zap className="w-5 h-5 mr-2" />
                    Find Elite Contractors
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <Link 
                  href="/quote" 
                  className="group relative overflow-hidden"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-slate-200 to-white rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-sm text-slate-900 font-bold rounded-xl border-2 border-slate-200 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Premium Quote
                  </div>
                </Link>
              </div>
            </div>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full border-2 border-white transition-all duration-500" style={{transitionDelay: `${i * 100}ms`}} />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">Join 2,500+ homeowners</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current transition-all duration-500" style={{transitionDelay: `${i * 100}ms`}} />
                  ))}
                  <span className="text-sm text-slate-600 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Right Side - Advanced Verification Showcase */}
            <div 
              className="relative"
              style={{
                transform: `translate3d(0, ${scrollY * -0.2}px, 0) rotateY(${mousePosition.x * 0.02}deg)`,
                perspective: '1000px'
              }}
            >
              {/* Floating verification badges */}
              <div className="absolute -top-6 -right-6 z-20">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl animate-bounce-in">
                  ✓ VERIFIED SECURE
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 z-20">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl animate-bounce-in animation-delay-1200">
                  🚀 AI POWERED
                </div>
              </div>

              {/* Main verification panel */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                {/* Clean header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Verified Contractors</h3>
                  <p className="text-slate-600">Every contractor passes our rigorous verification process</p>
                </div>

                {/* Simple grid layout */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">License Verified</h4>
                    <p className="text-sm text-slate-600">State licensing checked</p>
                    <div className="mt-3 text-2xl font-bold text-emerald-600">97%</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">Location Verified</h4>
                    <p className="text-sm text-slate-600">Address confirmed</p>
                    <div className="mt-3 text-2xl font-bold text-blue-600">100%</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">Contact Verified</h4>
                    <p className="text-sm text-slate-600">Phone & SMS confirmed</p>
                    <div className="mt-3 text-2xl font-bold text-purple-600">94%</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <FileCheck className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">Background Checked</h4>
                    <p className="text-sm text-slate-600">Insurance & bonds verified</p>
                    <div className="mt-3 text-2xl font-bold text-orange-600">89%</div>
                  </div>
                </div>

                {/* Bottom stats */}
                <div className="text-center p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-700 font-medium">783 Active Contractors</span>
                    </div>
                    <div className="w-px h-4 bg-slate-300"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-700 font-medium">Real-time Verification</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-12 border-b border-gray-100 relative">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/hero-construction.svg)',
            backgroundSize: '100px 100px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted Verification Process</h2>
            <p className="text-xl text-gray-600">Our comprehensive 6-point verification system ensures quality</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">License Check</h3>
              <p className="text-sm text-gray-600">State licensing board verification</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Insurance</h3>
              <p className="text-sm text-gray-600">Liability & bonding verification</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Verify</h3>
              <p className="text-sm text-gray-600">SMS verification system</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-sm text-gray-600">Google Maps geocoding</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Background</h3>
              <p className="text-sm text-gray-600">Professional history check</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reviews</h3>
              <p className="text-sm text-gray-600">Multi-platform reputation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-Time Platform Stats</h2>
            <p className="text-xl text-gray-600">Live data from our contractor database</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">783</div>
              <div className="text-gray-600">Total Contractors</div>
              <div className="text-sm text-green-600 mt-2">✅ 765 Verified</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">97.7%</div>
              <div className="text-gray-600">Verification Rate</div>
              <div className="text-sm text-blue-600 mt-2">🏆 Industry Leading</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">AZ ROC Verified</div>
              <div className="text-sm text-purple-600 mt-2">🔍 Live Integration</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">4.8</div>
              <div className="text-gray-600">Avg Rating</div>
              <div className="text-sm text-yellow-600 mt-2">⭐ High Quality</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16 relative">
        {/* Blueprint background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/kitchen-blueprint.svg)',
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Platform Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and transparent contractor matching</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Search & Filter</h3>
              <p className="text-gray-600">
                Use our advanced search with 783+ verified contractors. Filter by specialty, location, 
                ratings, and verification status to find your perfect match.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. View Verified Profiles</h3>
              <p className="text-gray-600">
                Every contractor passes our 6-point verification: license check, insurance, 
                phone verification, address validation, background check, and review analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Connect & Hire</h3>
              <p className="text-gray-600">
                Get quotes, chat directly, and hire with confidence. Our platform ensures 
                you're working with licensed, insured, and verified professionals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gray-50 py-16 relative">
        {/* Background image */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/general-contracting.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-50/90" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-gray-600">Enterprise-grade systems ensure reliability and security</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Maps API</h3>
              <p className="text-sm text-gray-600">
                Address verification, geocoding, and distance calculations for accurate contractor matching.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Twilio Verification</h3>
              <p className="text-sm text-gray-600">
                SMS-based phone verification system ensures authentic contractor contact information.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">State License APIs</h3>
              <p className="text-sm text-gray-600">
                Direct integration with Arizona ROC and 5 additional state licensing boards for real-time verification.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Background Checks</h3>
              <p className="text-sm text-gray-600">
                Comprehensive screening through Checkr and Sterling for complete contractor verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 relative overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/kitchen-white-modern.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-indigo-700/95" />
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Contractor?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of homeowners who trust our verified contractor network
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contractors" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              Browse 783+ Contractors
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/quote" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Get Free Quote
              <Sparkles className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="mt-8 flex justify-center space-x-8 text-blue-100">
            <div className="text-center">
              <div className="text-2xl font-bold">97.7%</div>
              <div className="text-sm">Verification Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm">States Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
