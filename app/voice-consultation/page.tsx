'use client'

import { useState } from 'react'
import { Phone, Mic, MessageCircle, Brain, ArrowRight, Star, CheckCircle, Users, PhoneCall } from 'lucide-react'
import Link from 'next/link'

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export default function VoiceConsultationPage() {
  const [callStatus, setCallStatus] = useState<string>('')

  const features: Feature[] = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Sarah uses advanced AI to understand your project needs and provide intelligent recommendations"
    },
    {
      icon: Phone,
      title: "Real Phone Conversations", 
      description: "Talk directly to Sarah at (602) 833-7194 - no apps or downloads required"
    },
    {
      icon: MessageCircle,
      title: "Expert Guidance",
      description: "Get professional advice on materials, timeline, budget, and contractor selection"
    },
    {
      icon: Users,
      title: "Contractor Matching",
      description: "Sarah connects you with pre-screened, licensed contractors based on your specific needs"
    }
  ]

  const testimonials: Testimonial[] = [
    {
      name: "Mike Johnson",
      role: "Kitchen Renovation",
      content: "Sarah helped me understand all my options and connected me with the perfect contractor. The whole process was seamless!",
      rating: 5
    },
    {
      name: "Lisa Chen",
      role: "Bathroom Remodel",
      content: "I was overwhelmed with choices, but Sarah's guidance made everything clear. Saved me thousands on my project.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      role: "Home Addition",
      content: "The AI analysis was spot-on. Sarah understood exactly what I needed and found contractors within my budget.",
      rating: 5
    }
  ]

  const handleDirectCall = () => {
    setCallStatus('Initiating phone call to Sarah...')
    window.location.href = 'tel:+16028337194'
    // Clear status after a moment
    setTimeout(() => setCallStatus(''), 3000)
  }

  const handleElevenLabsAgent = () => {
    setCallStatus('Opening Sarah\'s AI Voice interface...')
    
    // Open ElevenLabs directly
    const agentUrl = 'https://elevenlabs.io/app/talk-to?agent_id=agent_5401k1we1dkbf1mvt22mme8wz82a'
    window.open(agentUrl, '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes')
    
    setTimeout(() => setCallStatus(''), 3000)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
          <div className="text-center">
            {/* Main Heading */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Mic className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Talk to{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Sarah
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Your AI renovation consultant is ready to help you plan, budget, and execute your dream project
            </p>

            {/* Call Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleDirectCall}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 text-lg"
              >
                <PhoneCall className="h-6 w-6 group-hover:animate-bounce" />
                <span>Call Now: (602) 833-7194</span>
              </button>

              <button
                onClick={handleElevenLabsAgent}
                className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 text-lg"
              >
                <Mic className="h-6 w-6 group-hover:animate-pulse" />
                <span>Talk to Sarah (AI Voice)</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Wait Times</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Sarah for Your Renovation?
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Get expert guidance from our AI consultant trained on thousands of successful renovation projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 text-center">{feature.title}</h3>
                <p className="text-blue-200 text-center text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-blue-200">
              Get started with your renovation project in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Call or Chat</h3>
              <p className="text-blue-200">
                Reach out to Sarah via phone or our chat interface. She's available 24/7 to discuss your project.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Get Expert Analysis</h3>
              <p className="text-blue-200">
                Sarah analyzes your needs, budget, and timeline to provide personalized recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Connect with Contractors</h3>
              <p className="text-blue-200">
                Get matched with pre-screened, licensed contractors who are perfect for your specific project.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-blue-200">
              Join thousands of satisfied homeowners who've transformed their spaces with Sarah's help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-100 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-blue-200 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Dream Renovation?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Sarah is standing by to help you plan, budget, and execute your perfect home improvement project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleDirectCall}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 text-lg"
            >
              <Phone className="h-6 w-6 group-hover:animate-bounce" />
              <span>Call Sarah Now</span>
            </button>

            <button
              onClick={handleElevenLabsAgent}
              className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 text-lg"
            >
              <Mic className="h-6 w-6 group-hover:animate-pulse" />
              <span>Voice Chat with Sarah</span>
            </button>
          </div>

          {/* Call Status Display */}
          {callStatus && (
            <div className="mt-6 p-4 bg-blue-600/20 border border-blue-400/30 rounded-lg">
              <p className="text-blue-200">{callStatus}</p>
            </div>
          )}
        </div>
      </div>

      </div>
    </>
  )
}