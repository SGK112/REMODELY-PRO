import Link from 'next/link'
import { Crown, Zap, MessageSquare, Brain, Mic, Phone, Eye, Users, TrendingUp, ArrowRight, CheckCircle, Star, Clock } from 'lucide-react'

export default function AIShowcasePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-lg border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/" className="flex items-center">
                            <Crown className="w-8 h-8 text-blue-600 mr-2" />
                            <span className="text-2xl font-bold text-slate-800">Remodely.AI</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/auth/signin"
                                className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                            >
                                Try Sarah AI
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center bg-white/60 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
                            <Brain className="w-5 h-5 text-indigo-600 mr-2" />
                            <span className="text-indigo-700 font-semibold">AI Technology Showcase</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                            Meet Sarah AI
                            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Your Intelligent Assistant
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
                            Experience the future of home renovation with our advanced AI that understands your vision,
                            connects you with perfect contractors, and manages your entire project with human-like intelligence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center group text-lg">
                                <Phone className="w-5 h-5 mr-2" />
                                Call Sarah Now: (555) REMODEL
                            </button>
                            <Link
                                href="/quote"
                                className="bg-white/80 backdrop-blur-lg text-slate-800 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all duration-200 flex items-center group text-lg border border-white/20"
                            >
                                Try Text Chat
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Capabilities */}
            <div className="py-24 bg-white/50 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Sarah's AI Capabilities</h2>
                        <p className="text-xl text-slate-600">Advanced intelligence meets human understanding</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                <MessageSquare className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Natural Conversation</h3>
                            <p className="text-slate-600 mb-4">
                                Sarah understands context, remembers your preferences, and speaks naturally about your renovation dreams.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-1">
                                <li>• Multi-turn conversations</li>
                                <li>• Context awareness</li>
                                <li>• Memory of past interactions</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Visual Recognition</h3>
                            <p className="text-slate-600 mb-4">
                                Send photos of your space and Sarah analyzes materials, measurements, and design possibilities.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-1">
                                <li>• Material identification</li>
                                <li>• Space analysis</li>
                                <li>• Design suggestions</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Smart Matching</h3>
                            <p className="text-slate-600 mb-4">
                                AI analyzes 1000+ contractor profiles to find perfect matches based on your specific needs.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-1">
                                <li>• Skills matching</li>
                                <li>• Location optimization</li>
                                <li>• Budget alignment</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Predictive Pricing</h3>
                            <p className="text-slate-600 mb-4">
                                Get accurate cost estimates using AI analysis of market data, materials, and labor trends.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-1">
                                <li>• Real-time market analysis</li>
                                <li>• Material cost tracking</li>
                                <li>• Labor rate optimization</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Project Management</h3>
                            <p className="text-slate-600 mb-4">
                                Sarah tracks timelines, coordinates schedules, and keeps your project on track automatically.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-1">
                                <li>• Timeline optimization</li>
                                <li>• Progress tracking</li>
                                <li>• Automated updates</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                <Mic className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Voice Interface</h3>
                            <p className="text-slate-600 mb-4">
                                Call Sarah anytime for instant consultations, quotes, and project updates using natural speech.
                            </p>
                            <ul className="text-sm text-slate-500 space-y-1">
                                <li>• Natural speech processing</li>
                                <li>• 24/7 availability</li>
                                <li>• Multi-language support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Demo Section */}
            <div className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Experience Sarah AI</h2>
                        <p className="text-xl text-slate-600">See how natural and intelligent our AI assistant really is</p>
                    </div>

                    {/* Chat Demo */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Sarah AI</h3>
                                <p className="text-slate-500">Online • Ready to help</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1">
                                    <span className="text-white text-sm font-bold">S</span>
                                </div>
                                <div className="bg-blue-50 rounded-2xl rounded-tl-sm p-4 max-w-md">
                                    <p className="text-slate-800">Hi! I'm Sarah, your AI renovation assistant. I'd love to help you transform your space. What project are you considering?</p>
                                </div>
                            </div>

                            <div className="flex items-start justify-end">
                                <div className="bg-slate-100 rounded-2xl rounded-tr-sm p-4 max-w-md">
                                    <p className="text-slate-800">I want to update my kitchen countertops. I'm thinking about quartz but not sure about colors.</p>
                                </div>
                                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center ml-3 mt-1">
                                    <span className="text-slate-600 text-sm font-bold">Y</span>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1">
                                    <span className="text-white text-sm font-bold">S</span>
                                </div>
                                <div className="bg-blue-50 rounded-2xl rounded-tl-sm p-4 max-w-md">
                                    <p className="text-slate-800">Excellent choice! Quartz is durable and low-maintenance. I can help you visualize different colors. What's your kitchen style - modern, traditional, or transitional? Also, what's your approximate budget range?</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href="/quote"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-center"
                            >
                                Start Your Project
                            </Link>
                            <button className="bg-white border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center">
                                <Phone className="w-5 h-5 mr-2" />
                                Call Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Comparison */}
            <div className="py-24 bg-white/50 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Sarah AI is Different</h2>
                        <p className="text-xl text-slate-600">Advanced AI that understands home renovation</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-red-100 rounded-2xl p-6 mb-6">
                                <h3 className="text-xl font-bold text-red-800 mb-4">Traditional Approach</h3>
                                <ul className="text-left text-red-700 space-y-2">
                                    <li>❌ Generic lead forms</li>
                                    <li>❌ Wait for contractor calls</li>
                                    <li>❌ Limited communication</li>
                                    <li>❌ No project insights</li>
                                    <li>❌ Manual coordination</li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-yellow-100 rounded-2xl p-6 mb-6">
                                <h3 className="text-xl font-bold text-yellow-800 mb-4">Basic AI Tools</h3>
                                <ul className="text-left text-yellow-700 space-y-2">
                                    <li>⚠️ Simple chatbots</li>
                                    <li>⚠️ Limited understanding</li>
                                    <li>⚠️ No visual analysis</li>
                                    <li>⚠️ Basic matching</li>
                                    <li>⚠️ No project memory</li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 rounded-2xl p-6 mb-6">
                                <h3 className="text-xl font-bold text-green-800 mb-4">Sarah AI</h3>
                                <ul className="text-left text-green-700 space-y-2">
                                    <li>✅ Natural conversations</li>
                                    <li>✅ Instant intelligent responses</li>
                                    <li>✅ Visual space analysis</li>
                                    <li>✅ Smart contractor matching</li>
                                    <li>✅ Complete project management</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Experience the Future?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12">
                        Join thousands who've transformed their homes with Sarah AI
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center group text-lg">
                            <Phone className="w-5 h-5 mr-2" />
                            Call Sarah: (555) REMODEL
                        </button>

                        <Link
                            href="/quote"
                            className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 transition-all duration-200 flex items-center group text-lg"
                        >
                            Start Text Chat
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center mb-4">
                                <Crown className="w-8 h-8 text-blue-400 mr-2" />
                                <span className="text-2xl font-bold">Remodely.AI</span>
                            </div>
                            <p className="text-slate-400 mb-4">
                                The future of home renovation powered by advanced artificial intelligence.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">AI Features</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><Link href="/voice-consultation" className="hover:text-white">Voice Assistant</Link></li>
                                <li><Link href="/smart-matching" className="hover:text-white">Smart Matching</Link></li>
                                <li><Link href="/predictive-pricing" className="hover:text-white">Price Prediction</Link></li>
                                <li><Link href="/project-ai" className="hover:text-white">Project AI</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Get Started</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><Link href="/quote" className="hover:text-white">Get Quote</Link></li>
                                <li><Link href="/contractors" className="hover:text-white">Find Contractors</Link></li>
                                <li><Link href="/signup" className="hover:text-white">Create Account</Link></li>
                                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
                        <p>&copy; 2024 Remodely.AI. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}