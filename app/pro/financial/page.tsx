'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  DollarSign,
  Calculator,
  CreditCard,
  TrendingUp,
  PieChart,
  FileText,
  Calendar,
  Banknote,
  Wallet,
  Shield,
  Zap,
  Brain,
  CheckCircle,
  Clock,
  Users,
  Building2,
  Star,
  ArrowRight,
  Download,
  Upload,
  Smartphone
} from 'lucide-react';

const financialTools = [
  {
    id: 'expense-tracker',
    name: 'AI Expense Tracker',
    description: 'Automatically categorize receipts and track job costs. Integrates with QuickBooks and handles multi-project budgets.',
    icon: Calculator,
    category: 'Expense Management',
    features: ['Receipt scanning', 'Auto categorization', 'Project tracking', 'QuickBooks sync'],
    pricing: '$29/month',
    rating: 4.9,
    users: '1.2K',
    popular: true
  },
  {
    id: 'invoice-generator',
    name: 'Smart Invoice Generator',
    description: 'Create professional invoices with progress billing, payment tracking, and automated follow-ups.',
    icon: FileText,
    category: 'Invoicing',
    features: ['Progress billing', 'Payment tracking', 'Auto follow-ups', 'Multiple templates'],
    pricing: '$19/month',
    rating: 4.8,
    users: '2.1K'
  },
  {
    id: 'payment-processor',
    name: 'Multi-Payment Processor',
    description: 'Accept credit cards, ACH, crypto payments, and traditional checks. Instant deposits available.',
    icon: CreditCard,
    category: 'Payment Processing',
    features: ['Credit/debit cards', 'ACH transfers', 'Crypto payments', 'Instant deposits'],
    pricing: '2.9% + $0.30',
    rating: 4.7,
    users: '890',
    trending: true
  },
  {
    id: 'cash-flow',
    name: 'Cash Flow Predictor',
    description: 'AI-powered cash flow forecasting based on project pipelines, payment history, and seasonal trends.',
    icon: TrendingUp,
    category: 'Financial Planning',
    features: ['Cash flow forecasts', 'Pipeline analysis', 'Seasonal trends', 'Risk assessment'],
    pricing: '$39/month',
    rating: 4.6,
    users: '654'
  },
  {
    id: 'project-profitability',
    name: 'Project Profitability AI',
    description: 'Track real-time profitability per project with cost overrun alerts and margin optimization.',
    icon: PieChart,
    category: 'Profitability',
    features: ['Real-time tracking', 'Cost alerts', 'Margin optimization', 'ROI analysis'],
    pricing: '$49/month',
    rating: 4.8,
    users: '743'
  },
  {
    id: 'payroll-assistant',
    name: 'Contractor Payroll AI',
    description: 'Manage crew payroll, track hours, handle 1099s, and ensure compliance with labor laws.',
    icon: Users,
    category: 'Payroll',
    features: ['Time tracking', '1099 management', 'Compliance checks', 'Direct deposit'],
    pricing: '$25/month + $5/employee',
    rating: 4.5,
    users: '432'
  },
  {
    id: 'tax-optimizer',
    name: 'Tax Optimization Suite',
    description: 'Maximize deductions, track equipment depreciation, and prepare quarterly estimates.',
    icon: Shield,
    category: 'Tax Management',
    features: ['Deduction tracking', 'Depreciation calc', 'Quarterly estimates', 'Tax calendar'],
    pricing: '$59/month',
    rating: 4.7,
    users: '321'
  },
  {
    id: 'financial-dashboard',
    name: 'Executive Dashboard',
    description: 'Real-time financial overview with KPIs, profit margins, and business health metrics.',
    icon: Brain,
    category: 'Analytics',
    features: ['Real-time KPIs', 'Profit tracking', 'Health metrics', 'Custom reports'],
    pricing: '$79/month',
    rating: 4.9,
    users: '567'
  },
  {
    id: 'loan-calculator',
    name: 'Business Loan AI',
    description: 'Calculate loan scenarios, compare rates, and get pre-qualified for equipment financing.',
    icon: Banknote,
    category: 'Financing',
    features: ['Loan scenarios', 'Rate comparison', 'Pre-qualification', 'Equipment financing'],
    pricing: 'Free',
    rating: 4.4,
    users: '1.8K'
  },
  {
    id: 'crypto-wallet',
    name: 'Crypto Payment Hub',
    description: 'Accept TON, Bitcoin, Ethereum payments. Automatic conversion to USD with low fees.',
    icon: Wallet,
    category: 'Crypto Payments',
    features: ['TON payments', 'Multi-crypto', 'Auto conversion', 'Low fees'],
    pricing: '1.5% + network fees',
    rating: 4.6,
    users: '234',
    trending: true
  }
];

const integrations = [
  {
    name: 'QuickBooks Online',
    logo: '📊',
    description: 'Seamless sync with QuickBooks for accounting',
    connected: true
  },
  {
    name: 'QuickBooks Desktop',
    logo: '💻',
    description: 'Import/export data with desktop version',
    connected: false
  },
  {
    name: 'Stripe',
    logo: '💳',
    description: 'Credit card and ACH processing',
    connected: true
  },
  {
    name: 'Square',
    logo: '⬜',
    description: 'POS and mobile payments',
    connected: false
  },
  {
    name: 'TON Wallet',
    logo: '💎',
    description: 'TON cryptocurrency payments',
    connected: true
  },
  {
    name: 'Bank of America',
    logo: '🏦',
    description: 'Bank account integration',
    connected: true
  }
];

export default function FinancialToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Expense Management', 'Invoicing', 'Payment Processing', 'Financial Planning', 'Profitability', 'Payroll', 'Tax Management', 'Analytics', 'Financing', 'Crypto Payments'];

  const filteredTools = selectedCategory === 'All'
    ? financialTools
    : financialTools.filter(tool => tool.category === selectedCategory);

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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">PRO Financial Suite</h1>
                  <p className="text-sm text-green-300">Complete financial management for contractors</p>
                </div>
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Financial Tools That Actually Work for Contractors
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto">
            Stop losing money to poor financial tracking. Our AI-powered suite handles everything from expense
            tracking to crypto payments, with seamless QuickBooks integration and real-time profitability analysis.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">31% Profit Increase</h3>
              <p className="text-white/70 text-sm">Average ROI with our tools</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">6 Hours Saved</h3>
              <p className="text-white/70 text-sm">Per week on bookkeeping</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">100% Compliant</h3>
              <p className="text-white/70 text-sm">Tax and labor law compliance</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Wallet className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Crypto Ready</h3>
              <p className="text-white/70 text-sm">Accept TON and other payments</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {tool.popular && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      Popular
                    </span>
                  )}
                  {tool.trending && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">
                      Trending
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-white/70 mb-4">{tool.description}</p>
              <p className="text-sm text-green-400 mb-4">{tool.category}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-white font-medium">{tool.rating}</span>
                    <span className="text-white/50">({tool.users} users)</span>
                  </div>
                  <span className="text-green-400 font-semibold">{tool.pricing}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tool.features.slice(0, 4).map((feature, index) => (
                    <span key={index} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all group-hover:scale-105">
                Try Free for 14 Days
              </button>
            </div>
          ))}
        </div>

        {/* Integrations Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Seamless Integrations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{integration.logo}</span>
                    <div>
                      <h4 className="text-white font-semibold">{integration.name}</h4>
                      <p className="text-white/60 text-sm">{integration.description}</p>
                    </div>
                  </div>
                  {integration.connected ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Connect</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator Preview */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-8 mb-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">See Your Potential Savings</h3>
            <p className="text-white/80 mb-6 text-lg">
              Calculate how much time and money you could save with our financial suite
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">$2,340</div>
                <div className="text-white/70">Monthly savings</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">24 hrs</div>
                <div className="text-white/70">Time saved per month</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">31%</div>
                <div className="text-white/70">Profit increase</div>
              </div>
            </div>
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
              Calculate Your ROI
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Take Control of Your Finances?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of contractors already using REMODELY PRO to streamline their financial operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                Start 14-Day Free Trial
              </button>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
