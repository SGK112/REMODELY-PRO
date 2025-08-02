'use client'

import { Logo } from '@/components/ui/Logo'

export default function LogoPreviewPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
                    REMODELY.AI Logo Preview
                </h1>

                <div className="space-y-12">
                    {/* Full Logo */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Full Logo</h2>
                        <div className="flex justify-center">
                            <Logo variant="full" width={300} height={90} />
                        </div>
                    </div>

                    {/* Different sizes */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Different Sizes</h2>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <span className="text-sm font-medium text-gray-500 w-20">Large:</span>
                                <Logo variant="full" width={250} height={75} />
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="text-sm font-medium text-gray-500 w-20">Medium:</span>
                                <Logo variant="full" width={200} height={60} />
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="text-sm font-medium text-gray-500 w-20">Small:</span>
                                <Logo variant="full" width={150} height={45} />
                            </div>
                        </div>
                    </div>

                    {/* Icon Only */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Icon Only (Favicon Style)</h2>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <span className="text-sm font-medium text-gray-500 w-20">64px:</span>
                                <Logo variant="icon" width={64} height={64} />
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="text-sm font-medium text-gray-500 w-20">44px:</span>
                                <Logo variant="icon" width={44} height={44} />
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="text-sm font-medium text-gray-500 w-20">32px:</span>
                                <Logo variant="icon" width={32} height={32} />
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="text-sm font-medium text-gray-500 w-20">16px:</span>
                                <Logo variant="icon" width={16} height={16} />
                            </div>
                        </div>
                    </div>

                    {/* Text Only */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Text Only</h2>
                        <div className="flex justify-center">
                            <Logo variant="text" />
                        </div>
                    </div>

                    {/* Dark Background Test */}
                    <div className="bg-gray-900 p-8 rounded-lg">
                        <h2 className="text-xl font-semibold mb-6 text-white">On Dark Background</h2>
                        <div className="flex justify-center">
                            <Logo variant="full" width={250} height={75} />
                        </div>
                    </div>

                    {/* Color Background Test */}
                    <div className="bg-blue-100 p-8 rounded-lg">
                        <h2 className="text-xl font-semibold mb-6 text-blue-900">On Colored Background</h2>
                        <div className="flex justify-center">
                            <Logo variant="full" width={250} height={75} />
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600">
                        The new <strong>REMODELY.AI</strong> brand features:
                    </p>
                    <ul className="mt-4 text-sm text-gray-500 space-y-1">
                        <li>• Modern "R" lettermark with AI accent indicators</li>
                        <li>• Same blue gradient color scheme (#1e40af → #3b82f6)</li>
                        <li>• Orange accent colors (#f59e0b → #f97316)</li>
                        <li>• Scalable from 16px favicon to large hero displays</li>
                        <li>• Clear AI positioning with the .AI extension</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
