'use client';

import React, { useState } from 'react';
import { Building2, Palette, Zap, Shield, Users, TrendingUp, ChevronRight, Check, Star } from 'lucide-react';

export default function WhiteLabelPage() {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [showDemo, setShowDemo] = useState(false);
  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    currentCustomers: '',
    integrationType: 'full_platform'
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 499,
      description: 'Perfect for small contracting companies',
      features: [
        'Branded web portal',
        'Basic QuickBooks integration',
        'Up to 100 customers',
        'Email support',
        'Basic customization',
        'Monthly reporting'
      ],
      limitations: ['Limited API calls', 'Basic branding only'],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 999,
      description: 'For growing contracting businesses',
      features: [
        'Full platform customization',
        'Advanced QuickBooks integration',
        'Up to 1,000 customers',
        'Priority support',
        'Custom domain & SSL',
        'Advanced analytics',
        'White-label mobile app',
        'Revenue sharing (5%)'
      ],
      limitations: [],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 2499,
      description: 'For large contractors and agencies',
      features: [
        'Unlimited customization',
        'Full QuickBooks Enterprise sync',
        'Unlimited customers',
        'Dedicated account manager',
        'Custom integrations',
        'On-premise deployment option',
        'SLA guarantee',
        'Revenue sharing (3%)',
        'Training & onboarding'
      ],
      limitations: [],
      popular: false
    }
  ];

  const integrationOptions = [
    {
      id: 'full_platform',
      name: 'Full Platform White Label',
      description: 'Complete Remodely.AI platform with your branding',
      features: ['All AI tools', 'Complete contractor marketplace', 'Full admin dashboard'],
      price: 'Starting at $999/month'
    },
    {
      id: 'quickbooks_tools',
      name: 'QuickBooks-Focused Tools',
      description: 'Specialized tools that integrate with QuickBooks Online',
      features: ['Estimation tools', 'Invoice automation', 'Project tracking', 'Customer management'],
      price: 'Starting at $299/month'
    },
    {
      id: 'api_only',
      name: 'API Integration Only',
      description: 'Integrate our AI tools into your existing platform',
      features: ['Material detection API', 'Voice translation API', 'Smart matching API'],
      price: 'Starting at $199/month'
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/white-label/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          selectedPlan,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert('Thank you for your interest! Our team will contact you within 24 hours.');
        setContactForm({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          currentCustomers: '',
          integrationType: 'full_platform'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              White Label Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Offer cutting-edge remodeling technology to your customers under your own brand.
              Complete QuickBooks integration for seamless business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowDemo(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                View Demo
              </button>
              <a
                href="#contact"
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Options */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Integration Options</h2>
            <p className="text-lg text-gray-600">Choose the solution that fits your business model</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {integrationOptions.map((option) => (
              <div
                key={option.id}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 cursor-pointer transition-all hover:shadow-xl ${contactForm.integrationType === option.id ? 'border-blue-500' : 'border-gray-200'
                  }`}
                onClick={() => setContactForm({ ...contactForm, integrationType: option.id })}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.name}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-lg font-bold text-blue-600">{option.price}</div>
              </div>
            ))}
          </div>

          {/* QuickBooks Integration Highlight */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Native QuickBooks Integration</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-3" />
                    Automatic invoice generation and sync
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-3" />
                    Customer data synchronization
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-3" />
                    Payment tracking and reconciliation
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-3" />
                    Real-time financial reporting
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-3" />
                    Tax preparation assistance
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-center">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-white/80" />
                  <h4 className="text-lg font-bold mb-2">Developer Credentials</h4>
                  <p className="text-sm text-white/80 mb-4">
                    Use your QuickBooks app credentials for complete white-label integration
                  </p>
                  <div className="bg-white/20 rounded p-3 text-xs font-mono">
                    Client ID: ABTRjb7VQCO417Bp...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">White Label Pricing</h2>
            <p className="text-lg text-gray-600">Flexible plans that grow with your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-xl border-2 p-8 cursor-pointer transition-all hover:shadow-lg ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                  } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Limitations:</h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="text-xs text-gray-500">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started Today</h2>
              <p className="text-lg text-gray-600">
                Contact our team to discuss your white-label requirements
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={contactForm.companyName}
                    onChange={(e) => setContactForm({ ...contactForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={contactForm.contactName}
                    onChange={(e) => setContactForm({ ...contactForm, contactName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Use @remodely.ai for agent assignment"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Customer Count
                  </label>
                  <select
                    value={contactForm.currentCustomers}
                    onChange={(e) => setContactForm({ ...contactForm, currentCustomers: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select range</option>
                    <option value="1-50">1-50 customers</option>
                    <option value="51-200">51-200 customers</option>
                    <option value="201-1000">201-1,000 customers</option>
                    <option value="1000+">1,000+ customers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Plan
                  </label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - ${plan.price}/month
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
                >
                  Request Consultation
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Our team will contact you within 24 hours to discuss your requirements
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-300">
                © 2025 Remodely.AI. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://remodely.ai/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                End-User License Agreement
              </a>
              <a
                href="https://remodely.ai/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="mailto:support@remodely.ai"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
