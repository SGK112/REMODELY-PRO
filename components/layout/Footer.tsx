'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Star, Shield, Award, Brain } from 'lucide-react'

export function Footer() {
    return (
        <footer className="relative z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="h-10 w-auto flex items-center justify-center">
                                {/* REMODELY Logo - Enhanced Footer version */}
                                <div className="flex items-center space-x-3">
                                    {/* AI Brain Icon with glow effect */}
                                    <div className="relative">
                                        {/* Glow effect background */}
                                        <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl blur-sm opacity-75"></div>
                                        {/* Main icon */}
                                        <div className="relative w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Brain className="h-5 w-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Text with gradient styling */}
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline space-x-1">
                                            <span className="text-lg font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">REMODELY</span>
                                            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">.ai</span>
                                        </div>
                                        <span className="text-xs text-gray-300 -mt-1">AI Brains for your House</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-stone-300 mb-8 max-w-md leading-relaxed text-lg">
                            North America's premier AI-powered renovation marketplace connecting property owners with verified professional contractors and renovation specialists.
                        </p>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="text-center bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                                <div className="flex items-center justify-center text-blue-400 mb-2">
                                    <Star className="w-6 h-6 mr-1 fill-current" />
                                    <span className="font-bold text-xl">4.9</span>
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Professional Rating</div>
                            </div>
                            <div className="text-center bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                                <div className="flex items-center justify-center text-blue-400 mb-2">
                                    <Shield className="w-6 h-6 mr-1" />
                                    <span className="font-bold text-xl">3200+</span>
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Certified Pros</div>
                            </div>
                            <div className="text-center bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                                <div className="flex items-center justify-center text-blue-400 mb-2">
                                    <Award className="w-6 h-6 mr-1" />
                                    <span className="font-bold text-xl">$15M+</span>
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Projects Value</div>
                            </div>
                        </div>

                        <div className="flex space-x-6">
                            <a href="https://facebook.com/RemodelyAI" className="text-stone-400 hover:text-blue-400 transition-all duration-200 hover:scale-110">
                                <Facebook size={24} />
                            </a>
                            <a href="https://twitter.com/RemodelyAI" className="text-stone-400 hover:text-blue-400 transition-all duration-200 hover:scale-110">
                                <Twitter size={24} />
                            </a>
                            <a href="https://instagram.com/RemodelyAI" className="text-stone-400 hover:text-blue-400 transition-all duration-200 hover:scale-110">
                                <Instagram size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Solutions</h3>
                        <ul className="space-y-3">
                            <li><Link href="/contractors" className="text-blue-100 hover:text-white transition-colors">Find Contractors</Link></li>
                            <li><Link href="/ai-chat" className="text-blue-100 hover:text-white transition-colors">AI Assistant</Link></li>
                            <li><Link href="/white-label" className="text-blue-100 hover:text-white transition-colors">White Label</Link></li>
                            <li><Link href="/plans" className="text-blue-100 hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-blue-100 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/careers" className="text-blue-100 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="text-blue-100 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <Phone size={18} />
                            </div>
                            <div>
                                <div className="font-semibold">
                                    <a href="tel:+16028337194" className="hover:text-blue-400 transition-colors">
                                        +1 (602) 833-7194
                                    </a>
                                </div>
                                <div className="text-sm text-gray-400">24/7 Support</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <Mail size={18} />
                            </div>
                            <div>
                                <div className="font-semibold">hello@remodely.ai</div>
                                <div className="text-sm text-gray-400">Get in Touch</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <div className="font-semibold">Phoenix, Arizona</div>
                                <div className="text-sm text-gray-400">Serving North America</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 REMODELY AI. All rights reserved.
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
