'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Upload, DollarSign, MapPin, Star, ArrowRight, Crown, Building2, Home, Package, Truck, Shield, CheckCircle } from 'lucide-react'

export default function MarketplaceSellPage() {
  const [productType, setProductType] = useState('')
  const [location, setLocation] = useState('')
  const [businessName, setBusinessName] = useState('')

  const productCategories = [
    { id: 'countertops', name: 'Countertops & Surfaces', icon: Home },
    { id: 'flooring', name: 'Flooring & Tiles', icon: Package },
    { id: 'fixtures', name: 'Fixtures & Fittings', icon: Building2 },
    { id: 'tools', name: 'Tools & Equipment', icon: Shield },
    { id: 'installation', name: 'Installation Services', icon: Truck }
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Commission',
      description: 'Only 8% commission - industry leading rates for verified suppliers'
    },
    {
      icon: Star,
      title: 'Verified Buyer Network',
      description: 'Access to 15,000+ verified contractors and 50,000+ homeowners'
    },
    {
      icon: Truck,
      title: 'Logistics Support',
      description: 'Integrated shipping and delivery management system'
    },
    {
      icon: Shield,
      title: 'Payment Protection',
      description: 'Secure transactions with guaranteed payment processing'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm border border-slate-500/30 rounded-full mb-6">
              <Package className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-white font-medium">Sell on REMODELY AI</span>
              <Crown className="w-4 h-4 text-amber-400 ml-2" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block text-white">Expand Your</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200 bg-clip-text text-transparent">
                Business Reach
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Join REMODELY AI Marketplace and connect with verified contractors, designers, and homeowners. 
              AI-powered matching ensures your products reach the right customers.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-emerald-400/20">
                <div className="text-2xl font-bold text-emerald-400">15,000+</div>
                <div className="text-sm text-slate-300">Active Buyers</div>
              </div>
              <div className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-blue-400/20">
                <div className="text-2xl font-bold text-blue-400">$2.8M</div>
                <div className="text-sm text-slate-300">Monthly Volume</div>
              </div>
              <div className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-amber-400/20">
                <div className="text-2xl font-bold text-amber-400">8%</div>
                <div className="text-sm text-slate-300">Commission Only</div>
              </div>
            </div>

            <Link 
              href="#signup"
              className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 text-lg"
            >
              Start Selling Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Sell on REMODELY AI?</h2>
            <p className="text-slate-300">Join the leading AI-powered construction marketplace</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/30 hover:border-emerald-400/40 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Can You Sell?</h2>
            <p className="text-slate-300">Multiple categories with high-demand products</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.id} className="p-6 bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 hover:border-blue-400/40 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex items-center text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    High Demand Category
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-16 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Start Selling in Minutes</h2>
            <p className="text-slate-300">Join our verified supplier network</p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30">
            <form className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your business name"
                  className="w-full p-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Primary Product Category</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full p-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select a category</option>
                  {productCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Business Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                    className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-emerald-600 bg-slate-700 border-slate-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="text-slate-300 text-sm">
                  I agree to the <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">Terms of Service</Link> and <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 flex items-center justify-center"
              >
                Submit Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Already a supplier? <Link href="/auth/signin" className="text-emerald-400 hover:text-emerald-300">Sign in to your account</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Our supplier success team is here to help you maximize your sales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
            >
              Contact Support
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/marketplace"
              className="bg-transparent border-2 border-blue-600 text-blue-400 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}