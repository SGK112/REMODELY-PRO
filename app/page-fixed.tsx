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
    const [particles, setParticles] = useState<Array<{ left: number, top: number, delay: number, duration: number, size: number, opacity: number }>>([])
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
        setParticles(advancedParticles)

        const timer = setTimeout(() => setIsVisible(true), 100)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(rafId)
            clearTimeout(timer)
        }
    }, [])

    // Engagement algorithm: Animate statistics
    useEffect(() => {
        if (!isVisible) return

        const interval = setInterval(() => {
            setContractorCount(prev => prev < 783 ? prev + 2 : 783)
            setVerificationRate(prev => prev < 97.7 ? +(prev + 0.2).toFixed(1) : 97.7)
        }, 50)

        return () => clearInterval(interval)
    }, [isVisible])

    return (
        <div className="relative overflow-hidden">
            {/* Advanced Interactive Background System - C++ Level Design */}
            <div className="fixed inset-0 z-0">
                {/* Multi-layer parallax background with advanced mouse tracking */}
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

                {/* Advanced particle system - 50 particles with sophisticated physics */}
                {isMounted && (
                    <div className="absolute inset-0">
                        {particles.map((particle, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    left: `${particle.left}%`,
                                    top: `${particle.top}%`,
                                    width: `${particle.size}px`,
                                    height: `${particle.size}px`,
                                    background: `radial-gradient(circle, 
                    rgba(59, 130, 246, ${particle.opacity}) 0%, 
                    rgba(99, 102, 241, ${particle.opacity * 0.7}) 50%, 
                    transparent 100%)`,
                                    transform: `translate3d(0, ${scrollY * (0.1 + i * 0.01)}px, 0)`,
                                    animation: `float ${particle.duration}s ease-in-out infinite`,
                                    animationDelay: `${particle.delay}s`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Dynamic gradient overlay with conic gradients */}
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

            {/* Hero Section - Professional Grade with Advanced Parallax */}
            <section className="relative min-h-screen flex items-center z-10">
                {/* Background with parallax effects */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(/kitchen-luxury.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: `center ${50 + scrollY * 0.1}%`,
                        transform: `scale(${1.1 + scrollY * 0.0001}) translate3d(0, ${scrollY * 0.3}px, 0)`,
                        filter: `blur(${Math.min(scrollY * 0.005, 2)}px) brightness(${0.8 - scrollY * 0.0003})`
                    }}
                />

                {/* Advanced gradient overlay */}
                <div
                    className="absolute inset-0 z-5"
                    style={{
                        background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, ${0.95 - scrollY * 0.0005}) 0%, 
                rgba(255, 255, 255, ${0.85 - scrollY * 0.0004}) 40%, 
                rgba(248, 250, 252, ${0.75 - scrollY * 0.0003}) 100%)
            `
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Advanced Hero Content */}
                        <div
                            className="text-left space-y-8"
                            style={{
                                transform: `translate3d(0, ${scrollY * -0.1}px, 0)`,
                                opacity: Math.max(0, 1 - scrollY * 0.001)
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

                            {/* Advanced Typography - C++ Level Design */}
                            <div className="space-y-6">
                                <h1 className="text-6xl lg:text-7xl font-black leading-none">
                                    <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                                        Remodely
                                    </span>
                                    <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        .AI
                                    </span>
                                    <span className="block text-4xl lg:text-5xl font-bold text-slate-800 mt-2">
                                        Elite Contractor Network
                                    </span>
                                </h1>

                                <p className="text-xl lg:text-2xl text-slate-600 max-w-2xl leading-relaxed font-light">
                                    Advanced AI verification system connecting you with
                                    <span className="font-semibold text-slate-800"> elite contractors</span>.
                                    Six-layer authentication ensures only the most qualified professionals join our network.
                                </p>
                            </div>

                            {/* Advanced Stats Grid with Professional Animations */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { value: contractorCount, label: 'Verified Contractors', color: 'blue', icon: Users },
                                    { value: `${verificationRate}%`, label: 'Pass Rate', color: 'emerald', icon: Shield },
                                    { value: '15+', label: 'States Covered', color: 'purple', icon: Globe }
                                ].map((stat, i) => (
                                    <div key={i} className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-br from-slate-200/50 to-white/50 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                            <stat.icon className={`w-6 h-6 text-${stat.color}-600 mb-2`} />
                                            <div className={`text-2xl font-black text-${stat.color}-600`}>{stat.value}</div>
                                            <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Premium CTA Buttons - C++ Level Design */}
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

                        {/* Right Side - Advanced Verification Showcase with 3D Effects */}
                        <div
                            className="relative"
                            style={{
                                transform: `translate3d(0, ${scrollY * -0.2}px, 0) perspective(1000px) rotateY(${mousePosition.x * 0.01}deg)`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Floating verification badges with advanced animations */}
                            <div className="absolute -top-6 -right-6 z-20">
                                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl animate-bounce-in">
                                    ✓ VERIFIED SECURE
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 z-20">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl">
                                    🚀 AI POWERED
                                </div>
                            </div>

                            {/* Main verification panel with advanced glassmorphism */}
                            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                                {/* Advanced header with premium styling */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-2xl">
                                        <Shield className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-2">Elite Verification</h3>
                                    <p className="text-slate-600">Six-layer AI authentication system</p>
                                </div>

                                {/* Premium grid layout with advanced hover effects */}
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    {[
                                        { label: 'License Verified', desc: 'State licensing confirmed', percent: '97%', color: 'emerald', icon: Shield },
                                        { label: 'Location Verified', desc: 'Address authenticated', percent: '100%', color: 'blue', icon: MapPin },
                                        { label: 'Contact Verified', desc: 'Multi-channel confirmation', percent: '94%', color: 'purple', icon: Phone },
                                        { label: 'Background Cleared', desc: 'Insurance & bonds verified', percent: '89%', color: 'orange', icon: FileCheck }
                                    ].map((item, i) => (
                                        <div key={i} className={`group text-center p-6 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-2xl border border-${item.color}-200 hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
                                            <div className={`w-12 h-12 bg-${item.color}-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h4 className="font-bold text-slate-900 mb-1">{item.label}</h4>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                            <div className={`mt-3 text-2xl font-bold text-${item.color}-600`}>{item.percent}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Advanced stats footer with live indicators */}
                                <div className="text-center p-6 bg-gradient-to-r from-slate-50/80 to-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                                    <div className="flex items-center justify-center space-x-6 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-slate-700 font-medium">783 Elite Contractors</span>
                                        </div>
                                        <div className="w-px h-4 bg-slate-300"></div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-slate-700 font-medium">AI-Powered Verification</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Advanced "How It Works" Section with Parallax */}
            <section className="relative py-20 z-10" style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">How Remodely.AI Works</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Our advanced AI system ensures every contractor meets the highest standards through comprehensive verification and continuous monitoring.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'AI Screening', desc: 'Advanced algorithms analyze contractor credentials, licenses, and professional background', icon: Zap },
                            { step: '02', title: 'Verification Process', desc: 'Six-layer authentication including insurance verification and reference checks', icon: Shield },
                            { step: '03', title: 'Elite Network', desc: 'Only top-tier contractors join our verified professional network', icon: Star }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                    <div className="text-blue-600 text-3xl font-bold mb-4">{item.step}</div>
                                    <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advanced Features Section with Dynamic Backgrounds */}
            <section className="relative py-20 z-10">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        transform: `translate3d(${scrollY * 0.1}px, ${scrollY * 0.05}px, 0)`
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Why Choose Remodely.AI?</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Experience the future of contractor verification with our cutting-edge AI technology and comprehensive vetting process.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'AI-Powered Matching', desc: 'Advanced algorithms match you with the perfect contractor', icon: Zap, color: 'blue' },
                            { title: 'Verified Professionals', desc: 'Every contractor undergoes rigorous background checks', icon: Shield, color: 'emerald' },
                            { title: 'Real-Time Tracking', desc: 'Monitor your project progress with live updates', icon: Eye, color: 'purple' },
                            { title: 'Instant Communication', desc: 'Direct messaging and video calls with contractors', icon: MessageCircle, color: 'orange' }
                        ].map((feature, i) => (
                            <div key={i} className="relative group">
                                <div className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-2xl p-6 shadow-lg border border-${feature.color}-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                                    <div className={`w-12 h-12 bg-${feature.color}-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
