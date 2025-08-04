'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Mic,
  Eye,
  Zap,
  Building2,
  Target,
  Globe,
  CheckCircle,
  Diamond,
  Wand2,
  Crown,
  ShoppingCart,
  Palette,
  Calculator,
  Layers3,
  Home,
  Hammer,
  Store,
  Users,
  TrendingUp,
  ChevronDown
} from 'lucide-react';

const aiTools = [
  {
    id: 'countertop-analyzer',
    name: 'Countertop Material AI',
    description: 'Instantly identify granite, quartz, marble, and engineered stone. Get accurate square footage and cost estimates in seconds.',
    icon: Eye,
    category: 'Countertops',
    price: '$0.15/scan',
    features: ['Identifies 200+ stone types', 'Instant square footage', 'Real-time pricing'],
    tier: 'Pro',
    popular: true,
    trades: ['Countertop Fabricators', 'Kitchen Designers']
  },
  {
    id: 'cabinet-estimator',
    name: 'Cabinet Layout AI',
    description: 'Upload kitchen photos and get complete cabinet counts, hardware lists, and installation time estimates.',
    icon: Calculator,
    category: 'Cabinetry',
    price: '$3.00/kitchen',
    features: ['Cabinet count accuracy', 'Hardware calculations', 'Labor time estimates'],
    tier: 'Pro',
    popular: true,
    trades: ['Cabinet Makers', 'Kitchen Installers']
  },
  {
    id: 'tile-calculator',
    name: 'Tile & Flooring AI',
    description: 'Calculate exact tile quantities, grout needs, and installation patterns. Reduces waste by 40% and prevents costly overorders.',
    icon: Layers3,
    category: 'Flooring',
    price: '$1.50/room',
    features: ['Waste reduction', 'Pattern optimization', 'Grout calculations'],
    tier: 'Pro',
    popular: false,
    trades: ['Tile Installers', 'Flooring Contractors']
  },
  {
    id: 'plumbing-layout',
    name: 'Plumbing Layout AI',
    description: 'Optimize fixture placement and pipe routing. Reduces installation time by 30% and prevents costly rework.',
    icon: Zap,
    category: 'Plumbing',
    price: '$4.00/layout',
    features: ['Code compliance', 'Optimal routing', 'Fixture compatibility'],
    tier: 'Pro',
    popular: false,
    trades: ['Plumbers', 'Bathroom Specialists']
  },
  {
    id: 'electrical-planning',
    name: 'Electrical Planning AI',
    description: 'Plan outlet placement, lighting circuits, and load calculations. Ensures code compliance and prevents inspection failures.',
    icon: Wand2,
    category: 'Electrical',
    price: '$2.50/plan',
    features: ['Code compliance', 'Load calculations', 'Circuit optimization'],
    tier: 'Pro',
    popular: false,
    trades: ['Electricians', 'Lighting Specialists']
  },
  {
    id: 'project-coordinator',
    name: 'Multi-Trade Coordinator',
    description: 'Coordinate schedules across all trades. Reduces project delays by 60% and improves customer satisfaction.',
    icon: Users,
    category: 'Project Management',
    price: '$15/project',
    features: ['Schedule optimization', 'Trade coordination', 'Milestone tracking'],
    tier: 'Enterprise',
    popular: true,
    trades: ['General Contractors', 'Project Managers']
  },
  {
    id: 'voice-translation',
    name: 'Real-Time Voice Translation',
    description: 'Communicate with Spanish-speaking crews instantly. Translate technical instructions, safety protocols, and job details in real-time.',
    icon: Mic,
    category: 'Communication',
    price: '$0.05/minute',
    features: ['12+ languages', 'Construction terminology', 'Instant translation'],
    tier: 'Pro',
    popular: true,
    trades: ['General Contractors', 'All Trades']
  },
  {
    id: 'ai-customer-service',
    name: 'AI Customer Service Agent',
    description: 'Handle customer calls 24/7 with AI Sarah. Books appointments, answers questions, and qualifies leads while you focus on the work.',
    icon: Brain,
    category: 'Communication',
    price: '$99/month',
    features: ['24/7 availability', 'Appointment booking', 'Lead qualification'],
    tier: 'Pro',
    popular: true,
    trades: ['All Contractors', 'Business Owners']
  },
  {
    id: 'progress-updates',
    name: 'AI Progress Reporter',
    description: 'Automatically update customers with project photos, timelines, and next steps. Reduces "when will you be done?" calls by 80%.',
    icon: Target,
    category: 'Communication',
    price: '$5/project',
    features: ['Photo updates', 'Timeline tracking', 'Automated messaging'],
    tier: 'Pro',
    popular: false,
    trades: ['General Contractors', 'Project Managers']
  },
  {
    id: 'handyman-estimator',
    name: 'Handyman Service AI',
    description: 'Instantly price repair jobs from photos. Covers electrical fixes, plumbing repairs, drywall patches, and general maintenance tasks.',
    icon: Hammer,
    category: 'Handyman',
    price: '$0.75/estimate',
    features: ['Photo-based pricing', 'Multi-trade repairs', 'Time estimates'],
    tier: 'Pro',
    popular: true,
    trades: ['Handyman Services', 'Maintenance Contractors']
  },
  {
    id: 'framing-calculator',
    name: 'Framing Layout AI',
    description: 'Calculate lumber needs, layout wall framing, and optimize material cuts. Reduces lumber waste by 25% on residential projects.',
    icon: Building2,
    category: 'Framing',
    price: '$2.00/plan',
    features: ['Lumber calculations', 'Cut optimization', 'Code compliance'],
    tier: 'Pro',
    popular: false,
    trades: ['Framers', 'General Contractors']
  },
  {
    id: 'roofing-analyzer',
    name: 'Roofing Measurement AI',
    description: 'Measure roof areas from satellite imagery. Calculate shingle needs, underlayment, and flashing requirements with 95% accuracy.',
    icon: Home,
    category: 'Roofing',
    price: '$3.50/roof',
    features: ['Satellite measurement', 'Material calculations', 'Pitch analysis'],
    tier: 'Pro',
    popular: true,
    trades: ['Roofing Contractors', 'Storm Restoration']
  },
  {
    id: 'concrete-estimator',
    name: 'Concrete Volume AI',
    description: 'Calculate concrete needs for driveways, patios, and foundations. Includes rebar, forms, and finishing material requirements.',
    icon: Layers3,
    category: 'Concrete',
    price: '$1.25/pour',
    features: ['Volume calculations', 'Rebar requirements', 'Finishing materials'],
    tier: 'Pro',
    popular: false,
    trades: ['Concrete Contractors', 'Foundation Specialists']
  },
  {
    id: 'hvac-load-calculator',
    name: 'HVAC Load Calculator AI',
    description: 'Manual J compliant heating and cooling load calculations. Size equipment correctly and prevent callbacks for comfort issues.',
    icon: Zap,
    category: 'HVAC',
    price: '$4.00/calculation',
    features: ['Manual J compliant', 'Equipment sizing', 'Energy optimization'],
    tier: 'Pro',
    popular: true,
    trades: ['HVAC Contractors', 'Energy Auditors']
  }
];

const stats = [
  { label: 'Construction Projects', value: '45K+', icon: Brain },
  { label: 'Trades Supported', value: '18', icon: Hammer },
  { label: 'Customer Calls Handled', value: '280K+', icon: Mic },
  { label: 'Average ROI Increase', value: '31%', icon: TrendingUp }
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Countertops', 'Cabinetry', 'Flooring', 'Plumbing', 'Electrical', 'Project Management', 'Communication', 'Handyman', 'Framing', 'Roofing', 'Concrete', 'HVAC'];

  const filteredTools = selectedCategory === 'All'
    ? aiTools
    : aiTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-indigo-200 mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">AI-Powered Remodeling Technology Platform</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                Transform Your Business with
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent block">
                  REMODELY AI Technology
                </span>
              </h1>

              <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
                Revolutionize your remodeling business with AI-powered technology. From material identification to financial management,
                our comprehensive platform integrates cutting-edge tools, crypto payments, and QuickBooks automation to streamline
                every aspect of your operation. Join 8K+ contractors using REMODELY AI to increase profits by 31%.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/marketplace" className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Calculator className="inline mr-2 h-5 w-5" />
                Start Saving Money
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/developers" className="group bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                <Target className="inline mr-2 h-5 w-5" />
                See ROI Calculator
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Mic className="inline mr-2 h-5 w-5" />
                Talk to AI Sarah
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur rounded-lg mb-3">
                    <stat.icon className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </section>

      {/* AI Tools Marketplace Preview */}
      <section id="marketplace" className="py-20 bg-black/20 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              AI Tools for Every Kitchen & Bath Trade
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              From countertop fabricators to electricians, every specialist has unique challenges. Our AI tools solve the
              specific problems each trade faces, plus handle customer communication and language barriers automatically.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* AI Tools Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 relative"
              >
                {tool.popular && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      🔥 Popular
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${tool.tier === 'Enterprise'
                        ? 'bg-amber-500/20 text-amber-300'
                        : tool.tier === 'Pro'
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-green-500/20 text-green-300'
                        }`}>
                        {tool.tier}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">{tool.description}</p>
                    <p className="text-indigo-300 font-semibold">{tool.price}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-white/60 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <p className="text-white/50 text-xs font-medium mb-2">Perfect for:</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.trades.map((trade, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                        {trade}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Start Saving
                  </button>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200">
                    Demo
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/marketplace" className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              View All Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="container mx-auto px-6 text-center">
          <div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Real Results from Kitchen & Bath Professionals
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
              Don't just take our word for it. See how contractors across every trade are saving time,
              reducing waste, and increasing profits with our AI tools.
            </p>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <Hammer className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Countertop Fabricators</h3>
                <p className="text-white/80 mb-4">"Reduced material waste by 35% and eliminated costly remeasurements"</p>
                <p className="text-sm text-white/60">- Arizona Granite Works</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <Building2 className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">General Contractors</h3>
                <p className="text-white/80 mb-4">"Cut project coordination time in half, customers love the transparency"</p>
                <p className="text-sm text-white/60">- Phoenix Kitchen Pros</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <Mic className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Customer Communication</h3>
                <p className="text-white/80 mb-4">"AI Sarah handles 90% of customer calls, I can focus on the actual work"</p>
                <p className="text-sm text-white/60">- Elite Bath Remodeling</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <Zap className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Multi-Language Teams</h3>
                <p className="text-white/80 mb-4">"No more miscommunication with Spanish crews, safety incidents down 60%"</p>
                <p className="text-sm text-white/60">- Southwest Kitchen Solutions</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                See Your ROI Potential
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/marketplace" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
