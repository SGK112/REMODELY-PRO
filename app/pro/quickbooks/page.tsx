'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Calculator,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Download,
  Upload,
  RefreshCw,
  Clock,
  Building2,
  Receipt,
  CreditCard,
  PieChart,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';

const quickbooksTools = [
  {
    id: 'auto-sync',
    name: 'Auto Transaction Sync',
    description: 'Automatically sync all transactions between REMODELY and QuickBooks. No manual data entry required.',
    icon: RefreshCw,
    features: ['Real-time sync', 'Two-way integration', 'Error handling', 'Conflict resolution'],
    status: 'connected',
    usage: '2,847 transactions synced'
  },
  {
    id: 'invoice-generator',
    name: 'Smart Invoice Generator',
    description: 'Create and send professional invoices that automatically sync with QuickBooks.',
    icon: FileText,
    features: ['Professional templates', 'Progress billing', 'Auto reminders', 'Payment tracking'],
    status: 'connected',
    usage: '156 invoices created'
  },
  {
    id: 'expense-tracker',
    name: 'Expense Categorizer',
    description: 'AI-powered receipt scanning and expense categorization for perfect QuickBooks integration.',
    icon: Receipt,
    features: ['Receipt scanning', 'Auto categorization', 'Mileage tracking', 'Tax deductions'],
    status: 'connected',
    usage: '423 expenses tracked'
  },
  {
    id: 'payroll-sync',
    name: 'Payroll Integration',
    description: 'Sync employee hours, wages, and payroll data seamlessly with QuickBooks Payroll.',
    icon: Users,
    features: ['Time tracking', 'Wage calculations', 'Tax withholdings', '1099 management'],
    status: 'available',
    usage: 'Not connected'
  },
  {
    id: 'project-costing',
    name: 'Project Cost Tracking',
    description: 'Track job costs in real-time and sync with QuickBooks for accurate profitability analysis.',
    icon: PieChart,
    features: ['Job costing', 'Material tracking', 'Labor allocation', 'Profit margins'],
    status: 'connected',
    usage: '89 projects tracked'
  },
  {
    id: 'tax-center',
    name: 'Tax Preparation Suite',
    description: 'Organize all tax documents and sync with QuickBooks for seamless tax preparation.',
    icon: Calculator,
    features: ['Tax categorization', 'Deduction tracking', 'Quarterly reports', 'Year-end summaries'],
    status: 'connected',
    usage: '2024 tax year ready'
  }
];

const syncStats = [
  { label: 'Transactions Synced', value: '2,847', change: '+12% this month' },
  { label: 'Time Saved', value: '47 hrs', change: 'This month' },
  { label: 'Accuracy Rate', value: '99.7%', change: 'Data accuracy' },
  { label: 'Money Saved', value: '$3,240', change: 'Bookkeeping costs' }
];

const recentSyncActivity = [
  {
    id: '1',
    type: 'invoice',
    description: 'Invoice #1247 - Kitchen Remodel Johnson',
    amount: '$15,600',
    status: 'synced',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'expense',
    description: 'Material Purchase - Home Depot',
    amount: '$847.32',
    status: 'synced',
    timestamp: '15 minutes ago'
  },
  {
    id: '3',
    type: 'payment',
    description: 'Payment Received - Davis Bathroom',
    amount: '$8,200',
    status: 'synced',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'expense',
    description: 'Fuel Expense - Company Vehicle',
    amount: '$67.45',
    status: 'pending',
    timestamp: '2 hours ago'
  }
];

export default function QuickBooksPage() {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [autoSync, setAutoSync] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'pending': return Clock;
      case 'error': return AlertCircle;
      default: return AlertCircle;
    }
  };

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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-600 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">QuickBooks Integration</h1>
                  <p className="text-sm text-blue-300">Seamless accounting automation</p>
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
            QuickBooks Integration That Actually Works
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto">
            Stop double-entering data and eliminate bookkeeping errors. Our two-way QuickBooks integration
            automatically syncs all your contractor transactions, invoices, and expenses in real-time.
          </p>
        </div>

        {/* Connection Status */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">QuickBooks Online</h3>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Connected & Syncing</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm">Last sync</div>
              <div className="text-white font-semibold">2 minutes ago</div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {syncStats.map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm mb-1">{stat.label}</div>
                <div className="text-green-400 text-xs">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Tools */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white mb-8">Integration Tools</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickbooksTools.map((tool) => {
              const StatusIcon = getStatusIcon(tool.status);
              return (
                <div key={tool.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-600 rounded-xl flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(tool.status)}`} />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">{tool.name}</h4>
                  <p className="text-white/70 mb-4">{tool.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, index) => (
                        <span key={index} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-blue-400">{tool.usage}</div>
                  </div>

                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${tool.status === 'connected'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                    {tool.status === 'connected' ? 'Manage Settings' : 'Connect Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Recent Sync Activity</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-white/70 text-sm">Auto-sync</span>
                <button
                  onClick={() => setAutoSync(!autoSync)}
                  className={`w-12 h-6 rounded-full transition-all ${autoSync ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${autoSync ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </button>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Sync Now
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <div className="space-y-4">
              {recentSyncActivity.map((activity) => {
                const StatusIcon = getStatusIcon(activity.status);
                return (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        {activity.type === 'invoice' && <FileText className="h-5 w-5 text-blue-400" />}
                        {activity.type === 'expense' && <Receipt className="h-5 w-5 text-orange-400" />}
                        {activity.type === 'payment' && <CreditCard className="h-5 w-5 text-green-400" />}
                      </div>
                      <div>
                        <div className="text-white font-medium">{activity.description}</div>
                        <div className="text-white/60 text-sm">{activity.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-white font-semibold">{activity.amount}</div>
                        <div className={`text-sm ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </div>
                      </div>
                      <StatusIcon className={`h-5 w-5 ${getStatusColor(activity.status)}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Setup Guide */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Setup Guide</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Connect QuickBooks</h4>
              <p className="text-white/70 text-sm">
                Securely connect your QuickBooks Online or Desktop account with one-click authentication.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Configure Mapping</h4>
              <p className="text-white/70 text-sm">
                Map your REMODELY categories to QuickBooks accounts for perfect data organization.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Start Syncing</h4>
              <p className="text-white/70 text-sm">
                Enable auto-sync and watch your data flow seamlessly between platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-blue-500/20 to-green-600/20 border border-blue-500/30 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Contractors Love Our QuickBooks Integration</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Save 15+ Hours</h4>
              <p className="text-white/70 text-sm">Per month on data entry and reconciliation</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">99.7% Accuracy</h4>
              <p className="text-white/70 text-sm">Eliminate manual entry errors</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Real-time Sync</h4>
              <p className="text-white/70 text-sm">Data updates instantly across platforms</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Better Insights</h4>
              <p className="text-white/70 text-sm">Real-time profitability and cash flow</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-green-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Automate Your Bookkeeping?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of contractors who've eliminated manual data entry and bookkeeping errors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                Connect QuickBooks Now
              </button>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
