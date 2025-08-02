'use client'

import { Logo } from '@/components/ui/Logo'
import { useState, useEffect } from 'react'

export default function AnimatedLogoDemo() {
    const [showDemo, setShowDemo] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowDemo(true), 500)
        return () => clearTimeout(timer)
    }, [])

    const resetAnimation = () => {
        setShowDemo(false)
        setTimeout(() => setShowDemo(true), 100)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
                    REMODELY Logo with Animated RE Badge
                </h1>

                <div className="space-y-12">
                    {/* Main Animated Demo */}
                    <div className="bg-white p-12 rounded-2xl shadow-lg">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Full Logo Animation</h2>
                            <button
                                onClick={resetAnimation}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                Replay Animation
                            </button>
                        </div>

                        {showDemo && (
                            <div className="flex justify-center">
                                <div className="animate-fade-in-up">
                                    <Logo variant="full" width={350} height={105} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Icon Sizes with RE Badge */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Icon with Animated RE Badge</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                            <div className="text-center">
                                <Logo variant="icon" width={64} height={64} />
                                <p className="text-sm text-gray-500 mt-2">64px</p>
                            </div>
                            <div className="text-center">
                                <Logo variant="icon" width={48} height={48} />
                                <p className="text-sm text-gray-500 mt-2">48px</p>
                            </div>
                            <div className="text-center">
                                <Logo variant="icon" width={32} height={32} />
                                <p className="text-sm text-gray-500 mt-2">32px</p>
                            </div>
                            <div className="text-center">
                                <Logo variant="icon" width={24} height={24} />
                                <p className="text-sm text-gray-500 mt-2">24px</p>
                            </div>
                        </div>
                    </div>

                    {/* Clean Text Version */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Clean Text Only</h2>
                        <div className="flex justify-center">
                            <Logo variant="text" />
                        </div>
                    </div>

                    {/* Different Backgrounds */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 p-8 rounded-2xl">
                            <h3 className="text-lg font-semibold mb-6 text-white">Dark Background</h3>
                            <div className="flex justify-center">
                                <Logo variant="full" width={280} height={84} />
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl">
                            <h3 className="text-lg font-semibold mb-6 text-white">Gradient Background</h3>
                            <div className="flex justify-center">
                                <Logo variant="full" width={280} height={84} />
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Animation Features</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">RE Badge Animation</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Scale-in entrance (0.3s delay)</li>
                                    <li>• Text fade-in (0.8s delay)</li>
                                    <li>• Subtle pulse effect (continuous)</li>
                                    <li>• Orange gradient (#f59e0b → #f97316)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Design Principles</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Crisp, clean typography</li>
                                    <li>• Single "REMODELY" wordmark</li>
                                    <li>• RE badge provides brand recognition</li>
                                    <li>• Scalable vector animations</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
        </div>
    )
}
