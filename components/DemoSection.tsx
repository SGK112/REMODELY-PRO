'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Eye } from 'lucide-react'

const demoScenarios = [
    {
        id: 'contractor-search',
        title: 'Live Contractor Discovery',
        description: 'Watch how we automatically find and verify contractors from multiple sources',
        duration: '30s',
        preview: '/images/demo-contractor-search.jpg'
    },
    {
        id: 'quote-matching',
        title: 'Instant Quote Matching',
        description: 'See how projects get matched with qualified contractors in real-time',
        duration: '45s',
        preview: '/images/demo-quote-matching.jpg'
    },
    {
        id: 'project-tracking',
        title: 'Project Management',
        description: 'Experience our automated project tracking and communication system',
        duration: '60s',
        preview: '/images/demo-project-tracking.jpg'
    }
]

export default function DemoSection() {
    const [activeDemo, setActiveDemo] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const startDemo = (demoId: string) => {
        setActiveDemo(demoId)
        setIsPlaying(true)
    }

    const resetDemo = () => {
        setActiveDemo(null)
        setIsPlaying(false)
    }

    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        See Remodely.AI in Action
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Experience our platform's capabilities with interactive demos. No signup required.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {demoScenarios.map((demo) => (
                        <motion.div
                            key={demo.id}
                            className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer"
                            whileHover={{ y: -5 }}
                            onClick={() => startDemo(demo.id)}
                        >
                            <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                                <Play className="w-12 h-12 text-white opacity-80" />
                                <div className="absolute bottom-3 right-3 bg-black/50 px-2 py-1 rounded text-sm">
                                    {demo.duration}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{demo.title}</h3>
                                <p className="text-gray-400 text-sm">{demo.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Demo Player */}
                {activeDemo && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 rounded-2xl p-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-semibold">
                                {demoScenarios.find(d => d.id === activeDemo)?.title}
                            </h3>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                                </button>
                                <button
                                    onClick={resetDemo}
                                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>Reset</span>
                                </button>
                            </div>
                        </div>

                        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                            {activeDemo === 'contractor-search' && (
                                <div className="w-full h-full p-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-green-400">Scanning Arizona ROC database...</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-blue-400">Cross-referencing with Yelp API...</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                            <span className="text-purple-400">Verifying insurance status...</span>
                                        </div>
                                        <div className="mt-8 p-4 bg-green-900/30 rounded-lg border border-green-700">
                                            <p className="text-green-300">
                                                ✓ Found 23 new verified contractors in Phoenix area<br />
                                                ✓ Average response time: 1.2 hours<br />
                                                ✓ All contractors licensed and insured
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeDemo === 'quote-matching' && (
                                <div className="w-full h-full p-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4">Project Details</h4>
                                            <div className="space-y-2 text-sm">
                                                <div>Type: Kitchen Countertops</div>
                                                <div>Material: Quartz</div>
                                                <div>Size: 45 sq ft</div>
                                                <div>Budget: $5,000-$15,000</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4">AI Matching Process</h4>
                                            <div className="space-y-3">
                                                {['Analyzing project requirements', 'Filtering by location & availability', 'Matching contractor expertise', 'Ranking by reviews & pricing'].map((step, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: i * 0.8 }}
                                                        className="flex items-center space-x-2 text-sm"
                                                    >
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        <span>{step}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!isPlaying && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <button
                                        onClick={() => setIsPlaying(true)}
                                        className="bg-blue-500 hover:bg-blue-600 p-4 rounded-full transition-colors"
                                    >
                                        <Play className="w-8 h-8" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors mr-4">
                                Try This Feature Live
                            </button>
                            <button className="text-blue-400 hover:text-blue-300 px-4 py-3 font-medium transition-colors">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                )}

                <div className="text-center mt-12">
                    <p className="text-gray-400 mb-4">
                        Ready to experience the full platform?
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Start Your Free Project
                    </button>
                </div>
            </div>
        </section>
    )
}
