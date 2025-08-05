'use client'

import { useState } from 'react'
import { Check, Star, Users, Building2, Zap, Shield, ArrowRight, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Building2,
    title: 'Custom Branding',
    description: 'Complete white-label solution with your company branding, colors, and logo throughout the platform.'
  },
  {
    icon: Users,
    title: 'Client Management',
    description: 'Dedicated client portal with your branding where customers can track projects and communicate directly.'
  },
  {
    icon: Zap,
    title: 'AI Integration',
    description: 'Full access to our AI tools including SARAH voice assistant, material detection, and smart matching.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security, custom domains, SSL certificates, and compliance with industry standards.'
  }
]

const plans = [
  {
    name: 'Startup',
    price: 299,
    description: 'Perfect for small contracting businesses',
    features: [
      'White-label platform',
      'Custom domain',
      'Up to 100 customers',
      'Basic AI tools',
      'Email support',
      'Mobile app'
    ],
    buttonText: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Business',
    price: 599,
    description: 'For growing contracting companies',
    features: [
      'Everything in Startup',
      'Up to 500 customers',
      'Advanced AI & voice tools',
      'Custom integrations',
      'Priority support',
      'Analytics dashboard',
      'API access'
    ],
    buttonText: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large contracting organizations',
    features: [
      'Everything in Business',
      'Unlimited customers',
      'Custom AI training',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom features',
      'On-premise deployment'
    ],
    buttonText: 'Contact Sales',
    popular: false
  }
]

const testimonials = [
  {
    name: 'Michael Rodriguez',
    company: 'Rodriguez Construction',
    content: 'The white-label platform transformed our business. Our customers love the professional experience.',
    rating: 5
  },
  {
    name: 'Sarah Chen',
    company: 'Elite Renovations',
    content: 'Having our own branded platform gives us a huge competitive advantage. The AI tools are incredible.',
    rating: 5
  },
  {
    name: 'David Thompson',
    company: 'Thompson & Associates',
    content: 'ROI was immediate. Our customer satisfaction scores increased by 40% after launching our branded portal.',
    rating: 5
  }
]

export default function WhiteLabelPage() {
  const [selectedPlan, setSelectedPlan] = useState(1)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Launch Your Own
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Marketplace Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Get your own fully-branded contractor marketplace with AI-powered tools, 
              voice consultation, and everything you need to grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>View Pricing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our white-label solution provides all the tools and features you need to create 
              a professional marketplace that reflects your brand.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">See how contractors are transforming their businesses</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start with a 30-day free trial on any plan</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-lg ${
                  plan.popular 
                    ? 'border-blue-500 ring-4 ring-blue-100 relative' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    {typeof plan.price === 'number' ? (
                      <div>
                        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                    ) : (
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  href={plan.buttonText === 'Contact Sales' ? '#contact' : '/checkout?plan=white-label'}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-24 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-12">
            Schedule a demo to see how our white-label platform can transform your business.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a
              href="tel:+1-555-REMODEL"
              className="bg-white text-blue-900 p-6 rounded-2xl hover:bg-blue-50 transition-colors flex items-center space-x-4"
            >
              <Phone className="w-8 h-8" />
              <div className="text-left">
                <p className="font-semibold">Call Us</p>
                <p className="text-blue-700">+1 (555) REMODEL</p>
              </div>
            </a>
            
            <a
              href="mailto:enterprise@remodely.ai"
              className="bg-white text-blue-900 p-6 rounded-2xl hover:bg-blue-50 transition-colors flex items-center space-x-4"
            >
              <Mail className="w-8 h-8" />
              <div className="text-left">
                <p className="font-semibold">Email Us</p>
                <p className="text-blue-700">enterprise@remodely.ai</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
