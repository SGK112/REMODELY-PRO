'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Zap, Shield, Clock, Star, MapPin } from 'lucide-react'

const capabilities = [
    {
        icon: Search,
        title: "AI-Powered Contractor Discovery",
        description: "Our system automatically finds and verifies contractors from 27+ sources including Yelp, Google, and manufacturer networks.",
        stats: "10,000+ contractors verified",
        demo: "Live contractor scraping from Arizona ROC database"
    },
    {
        icon: Zap,
        title: "Instant Quote Matching",
        description: "Get matched with 3-5 qualified contractors in under 2 minutes based on your specific project needs.",
        stats: "< 2 min average response",
        demo: "See how quotes are matched in real-time"
    },
    {
        icon: Shield,
        title: "Automated Verification",
        description: "Every contractor is automatically verified for licensing, insurance, and business credentials.",
        stats: "99.2% accuracy rate",
        demo: "Watch our verification process"
    },
    {
        icon: Clock,
        title: "Real-Time Project Tracking",
        description: "Track your project from quote to completion with automated updates and milestone notifications.",
        stats: "24/7 monitoring",
        demo: "Live project dashboard preview"
    }
]

export default function CapabilitiesShowcase() {
    const [activeCapability, setActiveCapability] = useState(0)

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Why Remodely.AI is Different
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our automated platform connects you with verified contractors faster and more reliably than traditional methods.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Capability Cards */}
                    <div className="space-y-4">
                        {capabilities.map((capability, index) => (
                            <motion.div
                                key={index}
                                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${activeCapability === index
                                        ? 'bg-white shadow-lg border-2 border-blue-500'
                                        : 'bg-white/70 hover:bg-white hover:shadow-md'
                                    }`}
                                onClick={() => setActiveCapability(index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-lg ${activeCapability === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        <capability.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {capability.title}
                                        </h3>
                                        <p className="text-gray-600 mb-3">
                                            {capability.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-blue-600">
                                                {capability.stats}
                                            </span>
                                            <button className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                                                {capability.demo} →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Demo Visualization */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <motion.div
                            key={activeCapability}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Live Demo: {capabilities[activeCapability].title}
                            </h3>

                            {activeCapability === 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm">Scanning Arizona ROC database...</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm">Verifying contractor licenses...</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm">Cross-referencing with Yelp reviews...</span>
                                    </div>
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            <strong>Result:</strong> Found 127 new verified contractors in the last 24 hours
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeCapability === 1 && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                                        <p className="text-sm font-medium mb-2">Your Project: Kitchen Countertop Replacement</p>
                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div>Material: Quartz</div>
                                            <div>Size: 45 sq ft</div>
                                            <div>Location: Phoenix, AZ</div>
                                            <div>Timeline: 2-3 weeks</div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="inline-flex items-center space-x-2 text-sm text-blue-600">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                            <span>Matching with qualified contractors...</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="p-3 bg-green-50 rounded-lg flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-sm font-medium">Contractor Match #{i}</span>
                                                </div>
                                                <span className="text-xs text-green-600">98% compatibility</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                    Try This Feature
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
