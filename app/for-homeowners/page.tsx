'use client'

import Link from 'next/link'
import { Home, CheckCircle, Star, ArrowRight, Zap, Shield, Clock, DollarSign } from 'lucide-react'

export default function ForHomeownersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full mb-6">
                            <Home className="w-5 h-5 text-blue-400 mr-2" />
                            <span className="text-blue-300 font-medium">For Homeowners</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Transform Your Home with
                            <span className="block text-blue-400">Trusted Renovation Professionals</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                            From kitchen countertops to complete home makeovers, find pre-vetted contractors who deliver exceptional results.
                            Our AI matches you with the perfect professional for any renovation project.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/search"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semybold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-lg"
                            >
                                Find My Contractor
                            </Link>
                            <Link
                                href="/quote"
                                className="bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all border border-slate-600 text-lg"
                            >
                                Get Free Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Why Homeowners Choose REMODELY AI
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Matching</h3>
                            <p className="text-slate-400">Our AI analyzes your project details to find contractors with the exact expertise you need</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Pre-Vetted Professionals</h3>
                            <p className="text-slate-400">Every contractor is verified for licensing, insurance, and quality work history</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Save Time & Stress</h3>
                            <p className="text-slate-400">No more calling dozens of contractors. Get matched with qualified pros in minutes</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="w-8 h-8 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Transparent Pricing</h3>
                            <p className="text-slate-400">Compare quotes easily with detailed breakdowns and no hidden fees</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Types */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Perfect for Every Home Project
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Kitchen Renovations</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Granite & quartz countertops</li>
                                <li>• Custom backsplashes</li>
                                <li>• Island installations</li>
                                <li>• Sink & faucet integration</li>
                            </ul>
                            <Link href="/search?category=kitchen" className="text-blue-400 hover:text-blue-300 font-semibold">
                                Find Kitchen Contractors →
                            </Link>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Bathroom Remodels</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Vanity countertops</li>
                                <li>• Shower & tub surrounds</li>
                                <li>• Floor tile installation</li>
                                <li>• Custom stone features</li>
                            </ul>
                            <Link href="/search?category=bathroom" className="text-blue-400 hover:text-blue-300 font-semibold">
                                Find Bathroom Experts →
                            </Link>
                        </div>

                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Outdoor Spaces</h3>
                            <ul className="space-y-2 text-slate-300 mb-6">
                                <li>• Outdoor kitchen counters</li>
                                <li>• Patio & walkway stone</li>
                                <li>• Fire pit installations</li>
                                <li>• Pool deck surfaces</li>
                            </ul>
                            <Link href="/search?category=outdoor" className="text-blue-400 hover:text-blue-300 font-semibold">
                                Find Outdoor Specialists →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        What Homeowners Are Saying
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "REMODELY AI found us the perfect contractor for our kitchen remodel. The whole process was seamless and the results exceeded our expectations."
                            </p>
                            <div className="text-sm text-slate-400">
                                <div className="font-semibold text-white">Sarah Johnson</div>
                                <div>Phoenix, AZ • Kitchen Remodel</div>
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "Instead of spending weeks calling contractors, I got three qualified quotes in one day. The AI matching really works!"
                            </p>
                            <div className="text-sm text-slate-400">
                                <div className="font-semibold text-white">Mike Rodriguez</div>
                                <div>Scottsdale, AZ • Bathroom Vanity</div>
                            </div>
                        </div>

                        <div className="bg-slate-700/40 p-6 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-300 mb-4">
                                "The contractor we found through REMODELY AI was professional, on-time, and did beautiful work on our outdoor kitchen."
                            </p>
                            <div className="text-sm text-slate-400">
                                <div className="font-semibold text-white">Lisa Chen</div>
                                <div>Tempe, AZ • Outdoor Kitchen</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Start Your Dream Project?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Join thousands of satisfied homeowners who found their perfect contractor through REMODELY AI
                    </p>
                    <Link
                        href="/search"
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-lg"
                    >
                        Get Started Free Today
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
