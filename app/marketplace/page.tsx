'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Star,
  ArrowLeft,
  Sparkles,
  Brain,
  Calculator,
  Eye,
  Mic,
  ChevronDown
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
    tags: ['Popular', 'AI Vision']
  },
  {
    id: 'voice-translator',
    name: 'Voice Translation Pro',
    description: 'Real-time voice translation for multilingual job sites and customer communication.',
    icon: Mic,
    category: 'Communication',
    pricing: 'Free - $29/month',
    rating: 4.8,
    users: '1.8K',
    href: '/voice-translator',
    tags: ['New', 'Voice AI']
  },
  {
    id: 'project-calculator',
    name: 'Smart Project Calculator',
    description: 'AI-powered cost estimation with material prices, labor, and timeline predictions.',
    icon: Calculator,
    category: 'Estimation',
    pricing: 'Free - $39/month',
    rating: 4.7,
    users: '3.1K',
    href: '/ai-tools',
    tags: ['Popular', 'Estimation']
  },
  {
    id: 'sarah-ai-assistant',
    name: 'Sarah AI Assistant',
    description: 'Your intelligent business partner for project management, customer service, and operations.',
    icon: Brain,
    category: 'Business',
    pricing: 'Free - $99/month',
    rating: 4.9,
    users: '5.2K',
    href: '/chat',
    tags: ['Featured', 'AI Assistant']
  }
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Kitchen & Bath', 'Communication', 'Estimation', 'Business'];

  const filteredTools = selectedCategory === 'All'
    ? aiTools
    : aiTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="py-12 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">AI Marketplace</h1>
              <p className="text-white/80 text-lg">Discover intelligent tools that transform your remodeling business</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Search and Filter */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="group">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-white/80 text-sm">{tool.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-white/70 mb-4 text-sm">{tool.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-medium">{tool.pricing}</span>
                  <span className="text-white/60 text-sm">{tool.users} users</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of contractors using AI to work smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                Talk to Sarah AI
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}