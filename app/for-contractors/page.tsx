'use client'

import Link from 'next/link'
import { Building2, TrendingUp, Users, DollarSign, Star, CheckCircle, ArrowRight, Target, BarChart3, Clock } from 'lucide-react'

export default function ForContractorsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-emerald-600/20 border border-emerald-400/30 rounded-full mb-6">
                            <Building2 className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-emerald-300 font-medium">For Contractors</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Grow Your Renovation
                            <span className="block text-emerald-400">Business with AI-Powered Leads</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                            Stop chasing leads. Our AI automatically matches you with qualified homeowners, designers, and commercial clients
                            who need your renovation expertise. Join 3,200+ contractors already growing their business.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/signup/contractor"
                                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg text-lg"
                            >
                                Join as Professional
                            </Link>
                            <Link
                                href="/marketplace/sell"
                                className="bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all border border-slate-600 text-lg"
                            >
                                Start Selling
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                                <span>3,200+ Active Contractors</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                                <span>$2.3M+ in Monthly Projects</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                                <span>97% Client Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Why Top Contractors Choose REMODELY AI
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Qualified Leads Only</h3>
                            <p className="text-slate-400">Our AI pre-qualifies every lead, so you only talk to serious clients ready to hire</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Business Analytics</h3>
                            <p className="text-slate-400">Track your performance, revenue, and client satisfaction with detailed insights</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Sell Materials Too</h3>
                            <p className="text-slate-400">Use our marketplace to sell stone, tools, and materials directly to customers</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Build Your Reputation</h3>
                            <p className="text-slate-400">Showcase your work and collect verified reviews to attract premium clients</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services You Can Offer */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Perfect for Every Renovation Service
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Kitchen & Bathroom Renovation</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Complete kitchen remodels</li>
                                <li>• Bathroom renovations</li>
                                <li>• Countertop installation</li>
                                <li>• Tile & flooring work</li>
                            </ul>
                            <div className="text-emerald-400 font-semibold">High-demand service</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Flooring & Surfaces</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Hardwood floor installation</li>
                                <li>• Tile & stone work</li>
                                <li>• Carpet & vinyl installation</li>
                                <li>• Surface refinishing</li>
                            </ul>
                            <div className="text-emerald-400 font-semibold">Year-round demand</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Outdoor Hardscaping</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Patio & walkway installation</li>
                                <li>• Outdoor kitchen surfaces</li>
                                <li>• Pool deck & coping</li>
                                <li>• Retaining walls</li>
                            </ul>
                            <div className="text-emerald-400 font-semibold">Premium pricing</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Commercial Projects</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Restaurant & hotel surfaces</li>
                                <li>• Office building lobbies</li>
                                <li>• Healthcare facilities</li>
                                <li>• Multi-unit residential</li>
                            </ul>
                            <div className="text-emerald-400 font-semibold">Recurring contracts</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Repair & Restoration</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Stone polishing & sealing</li>
                                <li>• Crack & chip repair</li>
                                <li>• Re-grouting services</li>
                                <li>• Surface refinishing</li>
                            </ul>
                            <div className="text-emerald-400 font-semibold">Quick turnaround</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">General Contracting</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Home additions & extensions</li>
                                <li>• Whole house renovations</li>
                                <li>• Structural modifications</li>
                                <li>• Project management</li>
                            </ul>
                            <div className="text-emerald-400 font-semibold">High-margin work</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Contractor Success Stories
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">MG</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Mesa Granite Works</div>
                                    <div className="text-slate-400 text-sm">Phoenix, AZ</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "Since joining REMODELY AI, we've increased our monthly revenue by 340%. The quality of leads is incredible - every call is a potential sale."
                            </p>
                            <div className="text-emerald-400 font-semibold">
                                +340% revenue increase
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">ST</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Southwest Tile Co.</div>
                                    <div className="text-slate-400 text-sm">Scottsdale, AZ</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "The AI matching is amazing. Instead of bidding against 10+ contractors, I'm usually one of only 2-3 qualified for each project."
                            </p>
                            <div className="text-blue-400 font-semibold">
                                75% win rate on quotes
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">PC</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Premier Countertops</div>
                                    <div className="text-slate-400 text-sm">Tempe, AZ</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "The marketplace feature is a game-changer. I'm selling materials directly to customers and earning extra revenue on every project."
                            </p>
                            <div className="text-purple-400 font-semibold">
                                30% additional margin
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Simple, Transparent Pricing
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">REMODELY AI</h3>
                                <div className="text-4xl font-bold text-emerald-400 mb-2">FREE</div>
                                <p className="text-slate-400">Perfect for getting started</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Basic contractor profile
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Up to 5 leads per month
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Customer reviews & ratings
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Basic marketplace access
                                </li>
                            </ul>

                            <Link
                                href="/signup/contractor"
                                className="block w-full bg-slate-700 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all"
                            >
                                Get Started Free
                            </Link>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800/60 p-8 rounded-2xl border border-emerald-400/30 relative">
                            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                POPULAR
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">REMODELY AI PRO</h3>
                                <div className="text-4xl font-bold text-emerald-400 mb-2">$97<span className="text-lg text-slate-400">/mo</span></div>
                                <p className="text-slate-400">For serious contractors</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Premium contractor profile
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Unlimited qualified leads
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Advanced analytics & reporting
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Full marketplace selling tools
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Priority customer support
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                                    Featured listing placement
                                </li>
                            </ul>

                            <Link
                                href="/signup/contractor?plan=pro"
                                className="block w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all"
                            >
                                Upgrade to PRO
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Grow Your Contracting Business?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Join thousands of contractors already earning more with REMODELY AI's smart lead generation
                    </p>
                    <Link
                        href="/signup/contractor"
                        className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg text-lg"
                    >
                        Start Growing Today
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
