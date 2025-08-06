'use client'

import { DollarSign, TrendingUp, Users, Building, Brain, Zap } from 'lucide-react'
import Link from 'next/link'

export default function BusinessModelPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            REMODELY.AI Business Model
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            AI-powered marketplace disrupting the $472B home improvement industry with intelligent contractor matching and pay-as-you-go pricing.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="/auth/signup"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Join the Platform
                            </Link>
                            <Link
                                href="/plans"
                                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Market Opportunity */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Opportunity</h2>
                        <p className="text-xl text-gray-600">Massive, underserved market ready for AI disruption</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-8 shadow-lg">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <DollarSign className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">$472B</h3>
                                <p className="text-gray-600">Annual home improvement spending</p>
                                <p className="text-sm text-gray-500 mt-2">$200B residential + $272B commercial</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-lg">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">140M+</h3>
                                <p className="text-gray-600">US households planning renovations</p>
                                <p className="text-sm text-gray-500 mt-2">600K+ specialized contractors</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-lg">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">15%</h3>
                                <p className="text-gray-600">Annual market growth rate</p>
                                <p className="text-sm text-gray-500 mt-2">Accelerated by AI adoption</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Streams */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Revenue Streams</h2>
                        <p className="text-xl text-gray-600">Multiple monetization channels for sustainable growth</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Subscription Plans</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Homeowner Pro: $29/month</li>
                                <li>• Contractor Professional: $99/month</li>
                                <li>• Enterprise: $199/month</li>
                            </ul>
                            <p className="text-green-600 font-semibold mt-3">Recurring Revenue</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Transaction Fees</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Residential: 3-5% commission</li>
                                <li>• Commercial: 1-3% commission</li>
                                <li>• Payment processing: 2.9% + $0.30</li>
                            </ul>
                            <p className="text-green-600 font-semibold mt-3">Transaction-based</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Lead Generation</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Qualified leads: $25-50 each</li>
                                <li>• Premium matching: $15 per match</li>
                                <li>• Featured listings: $29.99/month</li>
                            </ul>
                            <p className="text-green-600 font-semibold mt-3">Performance-based</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Premium Services</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Background checks: $9.99</li>
                                <li>• Priority support: $19.99/month</li>
                                <li>• API licensing: $199/month</li>
                            </ul>
                            <p className="text-green-600 font-semibold mt-3">Value-added</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Competitive Advantage */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Competitive Advantage</h2>
                        <p className="text-xl text-gray-600">AI-powered platform beating traditional marketplaces</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">vs. Houzz (Market Leader)</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Brain className="w-5 h-5 text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">AI-Powered Matching</p>
                                        <p className="text-sm text-gray-600">Intelligent project-contractor compatibility vs basic search</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <DollarSign className="w-5 h-5 text-green-600 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Pay-as-You-Go Pricing</p>
                                        <p className="text-sm text-gray-600">Performance-based fees vs expensive monthly subscriptions</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Zap className="w-5 h-5 text-purple-600 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Voice AI Assistant</p>
                                        <p className="text-sm text-gray-600">SARAH voice consultations vs limited chat support</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Position</h3>
                            <div className="bg-blue-50 rounded-lg p-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Houzz Market Share</span>
                                        <span className="font-semibold">65M+ users</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Annual Revenue</span>
                                        <span className="font-semibold">$400M+</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Our Opportunity</span>
                                        <span className="font-semibold text-blue-600">Capture #2 position</span>
                                    </div>
                                    <div className="border-t pt-3 mt-3">
                                        <p className="text-sm text-gray-600">
                                            No strong second player exists. AI differentiation and fair pricing create massive opportunity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Growth Strategy */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Growth Strategy</h2>
                        <p className="text-xl text-gray-600">Scalable approach to market dominance</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Phase 1: Foundation</h3>
                            <ul className="text-left space-y-2 text-gray-600">
                                <li>• 500+ contractors across major metros</li>
                                <li>• 1,000+ homeowner accounts</li>
                                <li>• AI matching system deployed</li>
                                <li>• Voice assistant SARAH launched</li>
                            </ul>
                            <p className="text-sm text-blue-600 font-semibold mt-3">Months 1-6</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Phase 2: Scale</h3>
                            <ul className="text-left space-y-2 text-gray-600">
                                <li>• 2,500+ contractors in 50+ markets</li>
                                <li>• 10,000+ homeowner accounts</li>
                                <li>• $1M+ contractor earnings facilitated</li>
                                <li>• Break-even operations</li>
                            </ul>
                            <p className="text-sm text-green-600 font-semibold mt-3">Months 6-12</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-purple-600 font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Phase 3: Dominate</h3>
                            <ul className="text-left space-y-2 text-gray-600">
                                <li>• 10,000+ contractors nationwide</li>
                                <li>• 100,000+ homeowner accounts</li>
                                <li>• $10M+ marketplace transactions</li>
                                <li>• Series A funding for expansion</li>
                            </ul>
                            <p className="text-sm text-purple-600 font-semibold mt-3">Months 12-24</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Join the AI Revolution in Home Improvement
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Whether you're a homeowner planning your dream renovation or a contractor looking to grow your business,
                        REMODELY.AI provides the intelligent tools you need to succeed.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            href="/auth/signup?tab=customer"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Start as Homeowner
                        </Link>
                        <Link
                            href="/auth/signup?tab=contractor"
                            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                        >
                            Join as Contractor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
