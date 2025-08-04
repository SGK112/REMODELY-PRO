'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Zap,
  DollarSign,
  CheckCircle,
  Clock,
  Brain,
  Shield,
  TrendingUp,
  Users,
  Globe,
  Building2,
  Wallet,
  QrCode,
  Receipt,
  BarChart3,
  ArrowUpRight,
  Star,
  Banknote,
  RefreshCw
} from 'lucide-react';

const paymentApps = [
  {
    id: 'stripe-connect',
    name: 'Stripe Connect',
    logo: '💳',
    description: 'Industry-leading payment processing with instant payouts and global reach.',
    features: ['2.9% + 30¢ fees', 'Instant payouts', 'Chargeback protection', 'Global payments'],
    rating: 4.8,
    users: '2.3M+',
    integration: 'Native',
    status: 'connected',
    monthlyVolume: '$47,200'
  },
  {
    id: 'square',
    name: 'Square',
    logo: '⬜',
    description: 'Complete POS system with in-person and online payment processing.',
    features: ['2.6% + 10¢ fees', 'POS hardware', 'Inventory tracking', 'Team management'],
    rating: 4.6,
    users: '4M+',
    integration: 'Full API',
    status: 'available',
    monthlyVolume: '$0'
  },
  {
    id: 'paypal',
    name: 'PayPal Business',
    logo: '🅿️',
    description: 'Trusted global payment platform with buyer and seller protection.',
    features: ['2.9% + 30¢ fees', 'Buyer protection', 'International', 'Easy checkout'],
    rating: 4.4,
    users: '429M+',
    integration: 'API',
    status: 'connected',
    monthlyVolume: '$12,800'
  },
  {
    id: 'quickbooks-payments',
    name: 'QuickBooks Payments',
    logo: '📊',
    description: 'Seamless payment processing built into QuickBooks with automatic reconciliation.',
    features: ['2.4% + 25¢ fees', 'QB integration', 'Auto reconciliation', 'Same-day deposit'],
    rating: 4.5,
    users: '7M+',
    integration: 'Native',
    status: 'connected',
    monthlyVolume: '$31,600'
  },
  {
    id: 'venmo-business',
    name: 'Venmo Business',
    logo: '💙',
    description: 'Social payments platform popular with younger customers.',
    features: ['1.9% + 10¢ fees', 'Social features', 'Instant transfer', 'Mobile-first'],
    rating: 4.3,
    users: '83M+',
    integration: 'API',
    status: 'available',
    monthlyVolume: '$0'
  },
  {
    id: 'zelle-business',
    name: 'Zelle for Business',
    logo: '⚡',
    description: 'Bank-to-bank transfers with no fees for participating banks.',
    features: ['No fees*', 'Bank integration', 'Instant transfer', 'High limits'],
    rating: 4.2,
    users: '120M+',
    integration: 'Bank API',
    status: 'available',
    monthlyVolume: '$0'
  },
  {
    id: 'cashapp-business',
    name: 'Cash App Business',
    logo: '💰',
    description: 'Growing mobile payment platform with business features.',
    features: ['2.75% fees', 'Instant deposits', 'Cash Card', 'Tax features'],
    rating: 4.1,
    users: '51M+',
    integration: 'API',
    status: 'available',
    monthlyVolume: '$0'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    logo: '🍎',
    description: 'Secure contactless payments for iOS users.',
    features: ['Same as processor', 'Touch/Face ID', 'Secure element', 'NFC payments'],
    rating: 4.7,
    users: '507M+',
    integration: 'Via processor',
    status: 'connected',
    monthlyVolume: '$8,400'
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    logo: '🔍',
    description: 'Google\'s payment platform for Android and web.',
    features: ['Same as processor', 'Android integration', 'Loyalty cards', 'P2P payments'],
    rating: 4.5,
    users: '150M+',
    integration: 'Via processor',
    status: 'connected',
    monthlyVolume: '$5,200'
  }
];

const paymentStats = [
  { label: 'Total Volume', value: '$105,200', change: '+18% this month', icon: TrendingUp },
  { label: 'Success Rate', value: '99.7%', change: 'Last 30 days', icon: CheckCircle },
  { label: 'Avg Settlement', value: '1.2 days', change: 'Faster than average', icon: Clock },
  { label: 'Customer Satisfaction', value: '4.8/5', change: 'Payment experience', icon: Star }
];

const recentPayments = [
  {
    id: '1',
    customer: 'Johnson Kitchen Remodel',
    amount: '$15,600',
    method: 'stripe',
    methodName: 'Stripe (Credit Card)',
    status: 'completed',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    customer: 'Davis Bathroom Renovation',
    amount: '$8,200',
    method: 'quickbooks',
    methodName: 'QuickBooks Payments',
    status: 'completed',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    customer: 'Smith Home Addition',
    amount: '$2,500',
    method: 'paypal',
    methodName: 'PayPal',
    status: 'pending',
    timestamp: '2 days ago'
  }
];

export default function PaymentAppsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSetup, setShowSetup] = useState(false);

  const categories = ['All', 'Connected', 'Available', 'Popular'];

  const filteredApps = selectedCategory === 'All'
    ? paymentApps
    : selectedCategory === 'Connected'
      ? paymentApps.filter(app => app.status === 'connected')
      : selectedCategory === 'Available'
        ? paymentApps.filter(app => app.status === 'available')
        : paymentApps.filter(app => parseFloat(app.rating.toString()) >= 4.5);

  const totalVolume = paymentApps
    .filter(app => app.status === 'connected')
    .reduce((sum, app) => sum + parseFloat(app.monthlyVolume.replace(/[$,]/g, '')), 0);

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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Payment Apps Hub</h1>
                  <p className="text-sm text-purple-300">Accept payments anywhere, anytime</p>
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
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-6">
            Accept Payments Like a Fortune 500 Company
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto">
            Integrate with every major payment platform to give your customers maximum flexibility.
            From credit cards to crypto, Venmo to Zelle - accept payments however your customers prefer.
          </p>
        </div>

        {/* Payment Stats Dashboard */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Payment Overview</h3>
            <div className="text-right">
              <div className="text-white/60 text-sm">This month</div>
              <div className="text-3xl font-bold text-white">${totalVolume.toLocaleString()}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {paymentStats.map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm mb-1">{stat.label}</div>
                <div className="text-purple-400 text-xs">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSetup(!showSetup)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Setup Guide
            </button>
          </div>
        </div>

        {/* Payment Apps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredApps.map((app) => (
            <div key={app.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                    {app.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{app.name}</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-white/70">{app.rating}</span>
                      <span className="text-white/50">({app.users})</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {app.status === 'connected' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <button className="text-purple-400 hover:text-purple-300 text-sm">
                      Connect
                    </button>
                  )}
                </div>
              </div>

              <p className="text-white/70 mb-4 text-sm">{app.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Integration</span>
                  <span className="text-purple-400 text-sm font-medium">{app.integration}</span>
                </div>
                {app.status === 'connected' && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Monthly Volume</span>
                    <span className="text-green-400 text-sm font-medium">{app.monthlyVolume}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {app.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>

              <button className={`w-full py-3 rounded-lg font-semibold transition-all ${app.status === 'connected'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg'
                }`}>
                {app.status === 'connected' ? 'Manage Settings' : 'Connect Now'}
              </button>
            </div>
          ))}
        </div>

        {/* Recent Payments */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Recent Payments</h3>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{payment.customer}</div>
                      <div className="text-white/60 text-sm">{payment.methodName}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{payment.amount}</div>
                    <div className="text-white/60 text-sm">{payment.timestamp}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${payment.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {payment.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Setup Guide Modal */}
        {showSetup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Payment Setup Guide</h3>
                <button
                  onClick={() => setShowSetup(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">1. Choose Your Primary Processor</h4>
                  <p className="text-white/70 mb-3">
                    Start with Stripe or Square for the best all-around experience. They handle credit cards,
                    ACH, and have the best developer tools.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">2. Add Popular Mobile Apps</h4>
                  <p className="text-white/70 mb-3">
                    Connect Venmo, Cash App, and Zelle to capture younger customers who prefer mobile payments.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">3. Enable Contactless</h4>
                  <p className="text-white/70 mb-3">
                    Set up Apple Pay and Google Pay through your primary processor for tap-to-pay functionality.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">4. Test Everything</h4>
                  <p className="text-white/70 mb-3">
                    Use test transactions to make sure all payment methods work correctly before going live.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSetup(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold mt-6"
              >
                Got It!
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Never Lose a Sale Due to Payment Issues
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Give your customers every payment option they want. Higher satisfaction, faster payments, better cash flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                Start Integration Setup
              </button>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all">
                Get Expert Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
