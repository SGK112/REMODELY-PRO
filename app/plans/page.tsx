'use client'

import { useState } from 'react'
import { Check, Star, Zap, Shield, Users, Building, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const plans = [
    {
        name: 'Starter',
        price: 0,
        description: 'Perfect for homeowners starting their renovation journey',
        features: [
            'Basic contractor search',
            'Up to 3 quote requests per month',
            'AI chat assistance (10 messages/day)',
            'Basic project planning tools',
            'Email support'
        ],
        limitations: [
            'Limited AI interactions',
            'Basic contractor profiles',
            'No priority support'
        ],
        cta: 'Get Started Free',
        popular: false
    },
    {
        name: 'Pro',
        price: 29,
        description: 'Best for active renovators and small contractors',
        features: [
            'Unlimited contractor search',
            'Unlimited quote requests',
            'Advanced AI assistant (unlimited)',
            'Voice SARAH consultations',
            'Advanced project planning',
            'Smart contractor matching',
            'Priority customer support',
            '2FA security',
            'Advanced analytics'
        ],
        limitations: [],
        cta: 'Start Pro Trial',
        popular: true
    },
    {
        name: 'Business',
        price: 99,
        description: 'For contractors and renovation businesses',
        features: [
            'Everything in Pro',
            'Business profile & verification',
            'Lead generation tools',
            'Advanced contractor dashboard',
            'Client management system',
            'Marketing tools & analytics',
            'White-label options',
            'API access',
            'Dedicated account manager',
            'Custom integrations'
        ],
        limitations: [],
        cta: 'Contact Sales',
        popular: false
    }
]

const features = [
    {
        icon: Zap,
        title: 'AI-Powered Matching',
        description: 'Our advanced AI matches you with the perfect contractors for your specific project needs.'
    },
    {
        icon: Shield,
        title: 'Verified Professionals',
        description: 'All contractors are thoroughly vetted, licensed, and carry proper insurance coverage.'
    },
    {
        icon: Users,
        title: 'Expert Support',
        description: '24/7 customer support from renovation experts who understand your project needs.'
    },
    {
        icon: Building,
        title: 'Project Management',
        description: 'Comprehensive tools to manage your renovation from planning to completion.'
    }
]

export default function PlansPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Choose Your Perfect Plan
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            From free basic access to enterprise solutions, find the right plan for your renovation needs.
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center space-x-4 mb-12">
                            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                Monthly
                            </span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                Yearly
                            </span>
                            {billingCycle === 'yearly' && (
                                <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                                    Save 20%
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl border-2 p-8 ${plan.popular
                                    ? 'border-blue-500 bg-white shadow-xl'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                } transition-all duration-200`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                                        <Star className="w-4 h-4" />
                                        <span>Most Popular</span>
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-6">{plan.description}</p>
                                <div className="flex items-baseline justify-center space-x-1">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ${billingCycle === 'yearly' && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                                    </span>
                                    <span className="text-gray-500">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                                </div>
                                {billingCycle === 'yearly' && plan.price > 0 && (
                                    <p className="text-sm text-green-600 mt-1">
                                        Save ${Math.round(plan.price * 2.4)} per year
                                    </p>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start space-x-3">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.price === 0 ? '/auth/signup' : `/checkout?plan=${plan.name.toLowerCase()}`}
                                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${plan.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                <span>{plan.cta}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose REMODELY.AI?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform combines cutting-edge AI technology with human expertise to deliver the best renovation experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                            <p className="text-gray-600">Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the AI matching work?</h3>
                            <p className="text-gray-600">Our AI analyzes your project requirements, location, budget, and preferences to match you with the most suitable contractors in your area.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Space?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of homeowners who have successfully completed their renovation projects with REMODELY.AI
                    </p>
                    <Link
                        href="/auth/signup"
                        className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        <span>Start Your Free Trial</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
