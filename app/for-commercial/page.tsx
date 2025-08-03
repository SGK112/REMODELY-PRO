'use client'

import Link from 'next/link'
import { Building2, Users, Shield, BarChart3, CheckCircle, ArrowRight, Zap, Clock, Globe, Target } from 'lucide-react'

export default function ForCommercialPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-amber-600/20 border border-amber-400/30 rounded-full mb-6">
                            <Building2 className="w-5 h-5 text-amber-400 mr-2" />
                            <span className="text-amber-300 font-medium">For Commercial & Facilities</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Enterprise-Grade Contractor
                            <span className="block text-amber-400">Management at Scale</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                            Manage multiple properties, coordinate large-scale renovations, and maintain consistent quality across
                            your entire portfolio with our commercial-grade contractor network and management tools.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/signup?type=commercial"
                                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg text-lg"
                            >
                                Get Enterprise Access
                            </Link>
                            <Link
                                href="/contractors?filter=commercial-grade"
                                className="bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all border border-slate-600 text-lg"
                            >
                                Browse Contractors
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
                                <span>Enterprise-Grade Security</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
                                <span>Multi-Property Management</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
                                <span>Dedicated Account Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commercial Benefits */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Built for Commercial Success
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Multi-Location Management</h3>
                            <p className="text-slate-400">Coordinate projects across multiple properties and locations from one central dashboard</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Compliance & Insurance</h3>
                            <p className="text-slate-400">All contractors pre-verified for licensing, bonding, and commercial insurance requirements</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Enterprise Analytics</h3>
                            <p className="text-slate-400">Detailed reporting on project costs, timelines, and contractor performance across your portfolio</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Dedicated Support</h3>
                            <p className="text-slate-400">Personal account manager and 24/7 support for mission-critical projects</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commercial Use Cases */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Perfect for Every Commercial Environment
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Hospitality & Restaurants</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Kitchen & bar surface installations</li>
                                <li>• Lobby & reception areas</li>
                                <li>• Guest bathroom renovations</li>
                                <li>• Pool deck & outdoor dining</li>
                            </ul>
                            <div className="text-amber-400 font-semibold">24/7 emergency service available</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Office Buildings & Corporate</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Executive office renovations</li>
                                <li>• Lobby & entrance upgrades</li>
                                <li>• Break room & kitchen areas</li>
                                <li>• Conference room installations</li>
                            </ul>
                            <div className="text-amber-400 font-semibold">After-hours scheduling</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Healthcare Facilities</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Hospital & clinic surfaces</li>
                                <li>• Laboratory countertops</li>
                                <li>• Patient room bathrooms</li>
                                <li>• Antimicrobial surface options</li>
                            </ul>
                            <div className="text-amber-400 font-semibold">Healthcare-certified contractors</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Retail & Shopping Centers</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Store renovation projects</li>
                                <li>• Food court installations</li>
                                <li>• Restroom upgrades</li>
                                <li>• Common area improvements</li>
                            </ul>
                            <div className="text-amber-400 font-semibold">Minimal disruption scheduling</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Multi-Family Housing</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Apartment complex renovations</li>
                                <li>• Common area upgrades</li>
                                <li>• Leasing office improvements</li>
                                <li>• Bulk unit renovations</li>
                            </ul>
                            <div className="text-amber-400 font-semibold">Volume pricing available</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Educational Institutions</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Cafeteria & dining halls</li>
                                <li>• Laboratory installations</li>
                                <li>• Dormitory common areas</li>
                                <li>• Athletic facility upgrades</li>
                            </ul>
                            <div className="text-amber-400 font-semibold">Academic calendar scheduling</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Features */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Enterprise Project Management Tools
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Complete Commercial Project Control
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Multi-Site Coordination</h4>
                                        <p className="text-slate-400">Manage projects across multiple locations with synchronized scheduling and resource allocation</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Compliance Tracking</h4>
                                        <p className="text-slate-400">Monitor contractor certifications, insurance, and safety compliance across all projects</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Budget & Cost Control</h4>
                                        <p className="text-slate-400">Real-time budget tracking with automated alerts for cost overruns and approval workflows</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Stakeholder Communication</h4>
                                        <p className="text-slate-400">Keep all stakeholders informed with automated progress reports and milestone notifications</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-900/40 to-slate-800/60 p-8 rounded-2xl border border-amber-400/20">
                            <h4 className="text-xl font-bold text-white mb-6">Enterprise Dashboard</h4>

                            <div className="space-y-4">
                                <div className="bg-slate-700/40 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-300 text-sm">Phoenix Office Complex</span>
                                        <span className="text-emerald-400 text-sm">On Budget</span>
                                    </div>
                                    <div className="text-xs text-slate-400 mb-2">15 units • $2.3M budget</div>
                                    <div className="w-full bg-slate-600 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/40 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-300 text-sm">Hotel Chain Renovation</span>
                                        <span className="text-blue-400 text-sm">Phase 2</span>
                                    </div>
                                    <div className="text-xs text-slate-400 mb-2">8 properties • $5.7M budget</div>
                                    <div className="w-full bg-slate-600 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/40 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-300 text-sm">Restaurant Chain Rollout</span>
                                        <span className="text-amber-400 text-sm">Installation</span>
                                    </div>
                                    <div className="text-xs text-slate-400 mb-2">12 locations • $1.8M budget</div>
                                    <div className="w-full bg-slate-600 rounded-full h-2">
                                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-600 grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">28</div>
                                    <div className="text-slate-400 text-sm">Active Projects</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-amber-400">$12.8M</div>
                                    <div className="text-slate-400 text-sm">Total Value</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Commercial Success Stories
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">HC</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Hospitality Corp</div>
                                    <div className="text-slate-400 text-sm">Multi-State Hotel Chain</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "REMODELY AI managed our 15-property renovation project flawlessly. The coordination and quality control across multiple states was exceptional."
                            </p>
                            <div className="text-amber-400 font-semibold">
                                15 properties • $8.5M project value
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">RM</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Regional Medical</div>
                                    <div className="text-slate-400 text-sm">Healthcare System</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "The healthcare-certified contractors and antimicrobial surface options were exactly what we needed. Zero downtime during critical installations."
                            </p>
                            <div className="text-blue-400 font-semibold">
                                8 facilities • 100% uptime maintained
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">UP</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Urban Properties</div>
                                    <div className="text-slate-400 text-sm">Multi-Family Developer</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "Managing 50+ unit renovations simultaneously would be impossible without REMODELY AI's enterprise tools. The cost savings were substantial."
                            </p>
                            <div className="text-green-400 font-semibold">
                                250 units • 25% cost reduction
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Enterprise Pricing
                    </h2>
                    <p className="text-slate-400 text-center mb-12">
                        Custom pricing based on your portfolio size and project volume
                    </p>

                    <div className="bg-gradient-to-br from-amber-900/40 to-slate-800/60 p-8 rounded-2xl border border-amber-400/30 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">REMODELY AI Enterprise</h3>
                        <div className="text-4xl font-bold text-amber-400 mb-6">Custom Pricing</div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                            <ul className="space-y-3">
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    Unlimited projects & locations
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    Dedicated account manager
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    24/7 priority support
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    Custom integrations & API access
                                </li>
                            </ul>

                            <ul className="space-y-3">
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    Enterprise analytics & reporting
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    Volume pricing on all services
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    White-label options available
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-amber-400 mr-3" />
                                    Custom SLA agreements
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/contact?enterprise=true"
                            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg"
                        >
                            Request Enterprise Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Scale Your Commercial Projects?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Join enterprise clients who manage billions in commercial renovations through REMODELY AI
                    </p>
                    <Link
                        href="/contact?type=enterprise"
                        className="inline-flex items-center bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg text-lg"
                    >
                        Schedule Enterprise Demo
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
