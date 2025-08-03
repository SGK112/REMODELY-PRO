'use client'

import Link from 'next/link'
import { Brain, Palette, Users, Crown, CheckCircle, ArrowRight, Sparkles, Target, Clock } from 'lucide-react'

export default function ForDesignersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 border border-purple-400/30 rounded-full mb-6">
                            <Palette className="w-5 h-5 text-purple-400 mr-2" />
                            <span className="text-purple-300 font-medium">For Interior Designers</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Partner with Elite Renovation
                            <span className="block text-purple-400">Professionals</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                            Access our network of 3,200+ pre-vetted contractors, exclusive designer materials, and professional-grade
                            project management tools. Bring your vision to life with guaranteed quality execution.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/signup?type=designer"
                                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg text-lg"
                            >
                                Join Designer Network
                            </Link>
                            <Link
                                href="/contractors?filter=designer-preferred"
                                className="bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all border border-slate-600 text-lg"
                            >
                                Browse Partners
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-purple-400 mr-2" />
                                <span>500+ Active Designers</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-purple-400 mr-2" />
                                <span>Designer-Only Materials</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-purple-400 mr-2" />
                                <span>Trade Pricing Available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Designer Benefits */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Why Leading Designers Choose REMODELY AI
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Pre-Vetted Partners</h3>
                            <p className="text-slate-400">Work only with contractors who meet our strict quality and reliability standards</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-pink-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Exclusive Materials</h3>
                            <p className="text-slate-400">Access designer-only surfaces, finishes, and materials not available to the public</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Client Collaboration</h3>
                            <p className="text-slate-400">Share project progress, timelines, and updates with your clients in real-time</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Crown className="w-8 h-8 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Trade Pricing</h3>
                            <p className="text-slate-400">Access professional discounts and bulk pricing on all materials and services</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services for Designers */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Perfect for Every Design Project
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Luxury Residential</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Premium stone selections</li>
                                <li>• Custom fabrication services</li>
                                <li>• Unique edge profiles & finishes</li>
                                <li>• Coordinated installation teams</li>
                            </ul>
                            <div className="text-purple-400 font-semibold">High-end materials available</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Commercial Spaces</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Restaurant & hospitality</li>
                                <li>• Corporate office lobbies</li>
                                <li>• Retail environments</li>
                                <li>• Healthcare facilities</li>
                            </ul>
                            <div className="text-purple-400 font-semibold">Commercial-grade contractors</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Multi-Unit Projects</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Apartment complexes</li>
                                <li>• Condominiums</li>
                                <li>• Model homes</li>
                                <li>• Mixed-use developments</li>
                            </ul>
                            <div className="text-purple-400 font-semibold">Volume pricing available</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Kitchen Design</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Designer stone collections</li>
                                <li>• Integrated appliance solutions</li>
                                <li>• Custom backsplash coordination</li>
                                <li>• Waterfall edge specialists</li>
                            </ul>
                            <div className="text-purple-400 font-semibold">Trend-forward materials</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Complete Home Design</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Whole home renovations</li>
                                <li>• Open concept transformations</li>
                                <li>• Multi-room coordination</li>
                                <li>• Integrated smart home features</li>
                            </ul>
                            <div className="text-purple-400 font-semibold">Comprehensive solutions</div>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Outdoor Living</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Outdoor kitchen design</li>
                                <li>• Pool deck coordination</li>
                                <li>• Fire feature integration</li>
                                <li>• Weather-resistant surfaces</li>
                            </ul>
                            <div className="text-purple-400 font-semibold">Climate-specific solutions</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Designer Tools */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Professional Designer Tools
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Everything You Need to Manage Projects
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Project Timeline Management</h4>
                                        <p className="text-slate-400">Coordinate installation schedules with your overall project timeline</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Client Communication Portal</h4>
                                        <p className="text-slate-400">Keep clients updated with progress photos and milestone notifications</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Material Specification Tools</h4>
                                        <p className="text-slate-400">Browse and specify materials with detailed technical specifications</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Quality Assurance Tracking</h4>
                                        <p className="text-slate-400">Monitor installation quality with our verified contractor network</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-900/40 to-slate-800/60 p-8 rounded-2xl border border-purple-400/20">
                            <h4 className="text-xl font-bold text-white mb-6">Designer Dashboard Preview</h4>

                            <div className="space-y-4">
                                <div className="bg-slate-700/40 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-300 text-sm">Luxury Kitchen Project</span>
                                        <span className="text-emerald-400 text-sm">On Schedule</span>
                                    </div>
                                    <div className="w-full bg-slate-600 rounded-full h-2">
                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/40 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-300 text-sm">Master Bath Renovation</span>
                                        <span className="text-blue-400 text-sm">Material Selection</span>
                                    </div>
                                    <div className="w-full bg-slate-600 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/40 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-300 text-sm">Commercial Lobby</span>
                                        <span className="text-amber-400 text-sm">Installation Phase</span>
                                    </div>
                                    <div className="w-full bg-slate-600 rounded-full h-2">
                                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-600">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">12</div>
                                    <div className="text-slate-400 text-sm">Active Projects</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        What Designers Are Saying
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">LM</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Lisa Martinez Design</div>
                                    <div className="text-slate-400 text-sm">Phoenix, AZ</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "REMODELY AI has transformed how I work with contractors. The quality control and project management tools are exactly what I needed."
                            </p>
                            <div className="text-purple-400 font-semibold">
                                Interior Designer • 8 years experience
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">RD</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Rodriguez Designs</div>
                                    <div className="text-slate-400 text-sm">Scottsdale, AZ</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "The access to designer-only materials and trade pricing has improved my project margins significantly. My clients love the exclusive options."
                            </p>
                            <div className="text-pink-400 font-semibold">
                                Commercial Designer • 12 years experience
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold">KW</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Wilson Interiors</div>
                                    <div className="text-slate-400 text-sm">Tempe, AZ</div>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "Finally, contractors who understand design timelines and quality standards. The pre-vetting process really shows - I haven't had a single problem."
                            </p>
                            <div className="text-blue-400 font-semibold">
                                Luxury Residential Designer • 15 years experience
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Elevate Your Design Projects?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Join our exclusive network of interior designers and access premium contractors, materials, and tools
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/signup?type=designer"
                            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg text-lg"
                        >
                            Join Designer Network
                            <ArrowRight className="w-6 h-6 ml-2" />
                        </Link>
                        <Link
                            href="/contractors?filter=designer-preferred"
                            className="inline-flex items-center bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all border border-slate-600 text-lg"
                        >
                            Browse Partners
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
