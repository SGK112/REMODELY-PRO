'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AIToolUsageTracker from '@/components/ai/AIToolUsageTracker';
import {
  ArrowLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  TrendingUp,
  Users,
  Brain,
  Hammer,
  Building2,
  Zap,
  Home,
  Layers3,
  Eye,
  Calculator,
  Mic,
  Target,
  CheckCircle,
  Clock,
  DollarSign,
  Download
} from 'lucide-react';

const aiTools = [
  {
    id: 'countertop-analyzer',
    name: 'Countertop Material AI',
    description: 'Instantly identify granite, quartz, marble, and engineered stone materials with 99% accuracy.',
    icon: Eye,
    category: 'Kitchen & Bath',
    pricing: 'Free - $49/month',
    rating: 4.9,
    users: '2.3K',
    href: '/ai-transform',
    tags: ['Popular', 'AI Vision'],
    features: ['Photo identification', 'Material database', 'Cost estimation', 'Supplier network'],
    userType: 'Both' as const
  },
  {
    id: 'voice-translation',
    name: 'Voice Translation Pro',
    description: 'Real-time voice translation in 12+ languages for seamless crew communication.',
    icon: Mic,
    category: 'Communication',
    pricing: 'Free - $29/month',
    rating: 4.8,
    users: '1.8K',
    href: '/voice-translator',
    tags: ['New', 'Voice AI'],
    features: ['12+ languages', 'Real-time translation', 'Crew communication', 'Mobile app'],
    userType: 'Contractors' as const
  },
  {
    id: 'cabinet-layout',
    name: 'Cabinet Design Assistant',
    description: 'Generate custom cabinet layouts with hardware specifications and cut lists.',
    icon: Calculator,
    category: 'Kitchen & Bath',
    pricing: '$19 - $99/month',
    rating: 4.7,
    users: '950',
    href: '/ai-transform',
    tags: ['3D Design'],
    features: ['Layout design', 'Hardware selection', 'Cut lists', 'Cost estimation']
  },
  {
    id: 'handyman-pricing',
    name: 'Handyman Service AI',
    description: 'Instant pricing for repair jobs from photos. Multi-trade analysis and estimates.',
    icon: Hammer,
    category: 'Handyman',
    pricing: '$15 - $79/month',
    rating: 4.8,
    users: '1.2K',
    href: '/handyman',
    tags: ['Popular', 'Photo AI'],
    features: ['Photo analysis', 'Multi-trade pricing', 'Time estimates', 'Market rates']
  },
  {
    id: 'framing-calculator',
    name: 'Framing Calculator Pro',
    description: 'Calculate lumber requirements and optimize cuts for any framing project.',
    icon: Building2,
    category: 'Framing',
    pricing: '$25 - $99/month',
    rating: 4.6,
    users: '780',
    href: '/framing',
    tags: ['Optimization'],
    features: ['Lumber calculations', 'Cut optimization', 'Material lists', 'Waste reduction']
  },
  {
    id: 'roofing-measurement',
    name: 'Roofing Measurement AI',
    description: 'Measure roofs from satellite imagery with precision calculations.',
    icon: Home,
    category: 'Roofing',
    pricing: '$39 - $149/month',
    rating: 4.9,
    users: '1.5K',
    href: '/roofing',
    tags: ['Satellite AI', 'Popular'],
    features: ['Satellite measurement', 'Material calculations', 'Labor estimates', 'Safety planning']
  },
  {
    id: 'concrete-calculator',
    name: 'Concrete Volume Calculator',
    description: 'Calculate exact concrete needs with reinforcement and weather planning.',
    icon: Layers3,
    category: 'Concrete',
    pricing: '$19 - $89/month',
    rating: 4.5,
    users: '650',
    href: '/concrete',
    tags: ['Planning'],
    features: ['Volume calculations', 'Reinforcement planning', 'Cost estimation', 'Weather planning']
  },
  {
    id: 'hvac-load-calculator',
    name: 'HVAC Load Calculator',
    description: 'Manual J compliant heating and cooling load calculations.',
    icon: Zap,
    category: 'HVAC',
    pricing: '$29 - $129/month',
    rating: 4.7,
    users: '890',
    href: '/hvac',
    tags: ['Trending', 'Manual J'],
    features: ['Load calculations', 'System sizing', 'Manual J compliant', 'Energy optimization']
  },
  {
    id: 'ai-customer-service',
    name: 'AI Customer Service Agent',
    description: 'Sarah AI handles customer calls 24/7 with natural conversation.',
    icon: Brain,
    category: 'Communication',
    pricing: '$99 - $499/month',
    rating: 4.9,
    users: '2.1K',
    href: '/voice-consultation',
    tags: ['24/7', 'Popular'],
    features: ['24/7 availability', 'Natural conversation', 'Appointment booking', 'Lead qualification']
  }
];

const categories = ['All', 'Kitchen & Bath', 'Communication', 'Handyman', 'Framing', 'Roofing', 'Concrete', 'HVAC', 'Project Management'];
const userTypes = ['All', 'Homeowners', 'Contractors', 'Both'];

export default function AIToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUserType, setSelectedUserType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const filteredTools = aiTools
    .filter(tool =>
      (selectedCategory === 'All' || tool.category === selectedCategory) &&
      (selectedUserType === 'All' || tool.userType === selectedUserType || tool.userType === 'Both') &&
      (searchTerm === '' ||
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .sort((a, b) => {
      if (sortBy === 'popular') return parseFloat(b.users.replace('K', '')) - parseFloat(a.users.replace('K', ''));
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Tools Marketplace</h1>
                <p className="text-sm text-blue-300">Professional construction tools powered by AI</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/chat" className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                <Brain className="h-4 w-4" />
                <span>Ask Sarah</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Usage Tracker */}
        <div className="mb-8">
          <AIToolUsageTracker className="max-w-md mx-auto" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI-Powered Construction Tools
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Access our complete collection of AI-powered tools designed specifically for construction professionals.
            From material identification to project management, we've got your trade covered.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">15+ AI Tools</h3>
              <p className="text-white/70 text-sm">Complete suite for all trades</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">8K+ Users</h3>
              <p className="text-white/70 text-sm">Trusted by professionals</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">31% ROI</h3>
              <p className="text-white/70 text-sm">Average profit increase</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">40% Faster</h3>
              <p className="text-white/70 text-sm">Project completion time</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search tools, features, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-white/70" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* User Type Filter */}
            <div className="flex items-center space-x-4">
              <Users className="h-5 w-5 text-white/70" />
              <select
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                {userTypes.map(userType => (
                  <option key={userType} value={userType} className="bg-slate-800">
                    {userType}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="popular" className="bg-slate-800">Most Popular</option>
                <option value="rating" className="bg-slate-800">Highest Rated</option>
                <option value="name" className="bg-slate-800">Name A-Z</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-white/70'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-white/70'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/70">
            Showing {filteredTools.length} of {aiTools.length} tools
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Tools Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="block">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${tag === 'Popular' ? 'bg-green-500/20 text-green-400' :
                            tag === 'Trending' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-white/70 mb-4">{tool.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-white font-medium">{tool.rating}</span>
                        <span className="text-white/50">({tool.users} users)</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{tool.pricing}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tool.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 3 && (
                        <span className="text-xs text-blue-400">+{tool.features.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Try Now
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="block">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                          <div className="flex flex-wrap gap-1">
                            {tool.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${tag === 'Popular' ? 'bg-green-500/20 text-green-400' :
                                  tag === 'Trending' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-blue-500/20 text-blue-400'
                                  }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-white/70 mb-2">{tool.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-white">{tool.rating}</span>
                          </div>
                          <span className="text-white/50">{tool.users} users</span>
                          <span className="text-blue-400 font-semibold">{tool.pricing}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                      Try Now
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
            <p className="text-white/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of contractors already using AI to work smarter, faster, and more profitably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                Start Free Trial
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
