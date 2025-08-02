'use client'

import { useState, useEffect } from 'react'
import {
    Calculator,
    Plus,
    Save,
    Send,
    Download,
    Copy,
    DollarSign,
    Percent,
    AlertCircle,
    Lightbulb,
    TrendingUp,
    FileText,
    Users,
    Calendar,
    Edit,
    Trash2,
    Eye,
    Crown
} from 'lucide-react'
import Link from 'next/link'

interface EstimateLineItem {
    id: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    total: number
    category: 'LABOR' | 'MATERIALS' | 'EQUIPMENT' | 'OTHER'
}

interface Estimate {
    id: string
    title: string
    customerName: string
    customerEmail: string
    projectDescription: string
    status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED'
    lineItems: EstimateLineItem[]
    subtotal: number
    taxRate: number
    taxAmount: number
    totalAmount: number
    markup: number
    profitMargin: number
    validUntil: Date
    createdAt: Date
}

// Mock pricing data for AI suggestions
const pricingDatabase = {
    'Kitchen Remodeling': {
        'Cabinet Installation': { min: 150, max: 300, unit: 'linear foot', avg: 225 },
        'Countertop Installation': { min: 40, max: 120, unit: 'sq ft', avg: 80 },
        'Appliance Installation': { min: 200, max: 500, unit: 'each', avg: 350 },
        'Electrical Work': { min: 100, max: 200, unit: 'hour', avg: 150 },
        'Plumbing': { min: 80, max: 150, unit: 'hour', avg: 115 },
        'Flooring Installation': { min: 8, max: 25, unit: 'sq ft', avg: 16 },
        'Painting': { min: 3, max: 8, unit: 'sq ft', avg: 5.5 },
        'Permits': { min: 500, max: 2000, unit: 'project', avg: 1000 }
    },
    'Bathroom Remodeling': {
        'Tile Installation': { min: 12, max: 30, unit: 'sq ft', avg: 21 },
        'Vanity Installation': { min: 300, max: 800, unit: 'each', avg: 550 },
        'Toilet Installation': { min: 200, max: 400, unit: 'each', avg: 300 },
        'Shower Installation': { min: 1200, max: 3000, unit: 'each', avg: 2100 },
        'Electrical Work': { min: 100, max: 200, unit: 'hour', avg: 150 },
        'Plumbing': { min: 80, max: 150, unit: 'hour', avg: 115 }
    }
}

const mockEstimates: Estimate[] = [
    {
        id: '1',
        title: 'Kitchen Remodel - Johnson Home',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@email.com',
        projectDescription: 'Complete kitchen renovation including cabinets, countertops, and appliances',
        status: 'SENT',
        lineItems: [
            {
                id: '1',
                description: 'Cabinet Installation',
                quantity: 20,
                unit: 'linear foot',
                unitPrice: 225,
                total: 4500,
                category: 'LABOR'
            },
            {
                id: '2',
                description: 'Granite Countertops',
                quantity: 45,
                unit: 'sq ft',
                unitPrice: 80,
                total: 3600,
                category: 'MATERIALS'
            }
        ],
        subtotal: 8100,
        taxRate: 0.087,
        taxAmount: 704.7,
        totalAmount: 8804.7,
        markup: 20,
        profitMargin: 15,
        validUntil: new Date('2024-03-15'),
        createdAt: new Date('2024-02-01')
    }
]

export default function SmartEstimatingPage() {
    const [estimates, setEstimates] = useState<Estimate[]>(mockEstimates)
    const [currentEstimate, setCurrentEstimate] = useState<Estimate | null>(null)
    const [showNewEstimate, setShowNewEstimate] = useState(false)
    const [projectType, setProjectType] = useState<string>('Kitchen Remodeling')
    const [suggestions, setSuggestions] = useState<any[]>([])

    // Smart pricing suggestions based on project type
    const getSuggestions = (type: string) => {
        const typeData = pricingDatabase[type as keyof typeof pricingDatabase]
        if (typeData) {
            return Object.entries(typeData).map(([item, pricing]) => ({
                item,
                ...pricing
            }))
        }
        return []
    }

    useEffect(() => {
        setSuggestions(getSuggestions(projectType))
    }, [projectType])

    const calculateStats = () => {
        return {
            totalEstimates: estimates.length,
            sent: estimates.filter(e => e.status === 'SENT').length,
            accepted: estimates.filter(e => e.status === 'ACCEPTED').length,
            totalValue: estimates.reduce((sum, e) => sum + e.totalAmount, 0),
            avgValue: estimates.length > 0 ? estimates.reduce((sum, e) => sum + e.totalAmount, 0) / estimates.length : 0
        }
    }

    const stats = calculateStats()

    const startNewEstimate = () => {
        const newEstimate: Estimate = {
            id: Date.now().toString(),
            title: '',
            customerName: '',
            customerEmail: '',
            projectDescription: '',
            status: 'DRAFT',
            lineItems: [],
            subtotal: 0,
            taxRate: 0.087,
            taxAmount: 0,
            totalAmount: 0,
            markup: 20,
            profitMargin: 15,
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            createdAt: new Date()
        }
        setCurrentEstimate(newEstimate)
        setShowNewEstimate(true)
    }

    const addSuggestedItem = (suggestion: any) => {
        if (!currentEstimate) return

        const newItem: EstimateLineItem = {
            id: Date.now().toString(),
            description: suggestion.item,
            quantity: 1,
            unit: suggestion.unit,
            unitPrice: suggestion.avg,
            total: suggestion.avg,
            category: 'LABOR'
        }

        setCurrentEstimate({
            ...currentEstimate,
            lineItems: [...currentEstimate.lineItems, newItem]
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Smart Estimating</h1>
                        <p className="text-gray-600 mt-2">Create accurate estimates with AI-powered pricing suggestions</p>
                    </div>
                    <button
                        onClick={startNewEstimate}
                        className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center"
                    >
                        <Plus className="mr-2" size={20} />
                        New Estimate
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Estimates</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalEstimates}</p>
                            </div>
                            <Calculator className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Sent</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
                            </div>
                            <Send className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Accepted</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Value</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Value</p>
                                <p className="text-2xl font-bold text-gray-900">${Math.round(stats.avgValue).toLocaleString()}</p>
                            </div>
                            <Percent className="h-8 w-8 text-indigo-600" />
                        </div>
                    </div>
                </div>

                {/* New Estimate Builder */}
                {showNewEstimate && currentEstimate && (
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Create New Estimate</h2>
                            <button
                                onClick={() => setShowNewEstimate(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                                <input
                                    type="text"
                                    value={currentEstimate.title}
                                    onChange={(e) => setCurrentEstimate({ ...currentEstimate, title: e.target.value })}
                                    placeholder="Kitchen Remodel - Johnson Home"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                                <select
                                    value={projectType}
                                    onChange={(e) => setProjectType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                                    <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                                    <option value="General Contracting">General Contracting</option>
                                    <option value="Roofing">Roofing</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Plumbing">Plumbing</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                                <input
                                    type="text"
                                    value={currentEstimate.customerName}
                                    onChange={(e) => setCurrentEstimate({ ...currentEstimate, customerName: e.target.value })}
                                    placeholder="John Smith"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                                <input
                                    type="email"
                                    value={currentEstimate.customerEmail}
                                    onChange={(e) => setCurrentEstimate({ ...currentEstimate, customerEmail: e.target.value })}
                                    placeholder="john@email.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* AI Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <Lightbulb className="h-5 w-5 text-orange-600 mr-2" />
                                    <h3 className="text-lg font-medium text-gray-900">AI Pricing Suggestions</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {suggestions.map((suggestion, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-gray-900 text-sm">{suggestion.item}</h4>
                                                <button
                                                    onClick={() => addSuggestedItem(suggestion)}
                                                    className="text-orange-600 hover:text-orange-700"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <div>Avg: ${suggestion.avg}/{suggestion.unit}</div>
                                                <div className="text-xs text-gray-500">
                                                    Range: ${suggestion.min} - ${suggestion.max}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Line Items */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Line Items</h3>
                            {currentEstimate.lineItems.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <Calculator className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600">No line items yet. Add items from suggestions or create custom items.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {currentEstimate.lineItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        const updatedItems = currentEstimate.lineItems.map(i =>
                                                            i.id === item.id ? { ...i, description: e.target.value } : i
                                                        )
                                                        setCurrentEstimate({ ...currentEstimate, lineItems: updatedItems })
                                                    }}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="w-20">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const quantity = parseFloat(e.target.value) || 0
                                                        const total = quantity * item.unitPrice
                                                        const updatedItems = currentEstimate.lineItems.map(i =>
                                                            i.id === item.id ? { ...i, quantity, total } : i
                                                        )
                                                        setCurrentEstimate({ ...currentEstimate, lineItems: updatedItems })
                                                    }}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                                                />
                                            </div>
                                            <div className="w-16 text-sm text-gray-600">{item.unit}</div>
                                            <div className="w-24">
                                                <input
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={(e) => {
                                                        const unitPrice = parseFloat(e.target.value) || 0
                                                        const total = item.quantity * unitPrice
                                                        const updatedItems = currentEstimate.lineItems.map(i =>
                                                            i.id === item.id ? { ...i, unitPrice, total } : i
                                                        )
                                                        setCurrentEstimate({ ...currentEstimate, lineItems: updatedItems })
                                                    }}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                                                />
                                            </div>
                                            <div className="w-24 text-right font-medium">${item.total.toLocaleString()}</div>
                                            <button
                                                onClick={() => {
                                                    const updatedItems = currentEstimate.lineItems.filter(i => i.id !== item.id)
                                                    setCurrentEstimate({ ...currentEstimate, lineItems: updatedItems })
                                                }}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Subtotal: ${currentEstimate.lineItems.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                            </div>
                            <div className="flex space-x-3">
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                    Save Draft
                                </button>
                                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                    Send Estimate
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estimates List */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Estimates</h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {estimates.map((estimate) => (
                            <div key={estimate.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">{estimate.title}</h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                            <div className="flex items-center">
                                                <Users className="mr-1" size={14} />
                                                {estimate.customerName}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="mr-1" size={14} />
                                                {estimate.createdAt.toLocaleDateString()}
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${estimate.status === 'SENT' ? 'bg-yellow-100 text-yellow-800' :
                                                    estimate.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                                        estimate.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                }`}>
                                                {estimate.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{estimate.projectDescription}</p>
                                    </div>

                                    <div className="text-right ml-4">
                                        <div className="text-2xl font-bold text-gray-900 mb-1">
                                            ${estimate.totalAmount.toLocaleString()}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                                <Eye size={18} />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                                <Copy size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upgrade Notice */}
                <div className="mt-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Crown className="h-6 w-6 mr-3" />
                            <div>
                                <h3 className="font-semibold">Upgrade for Advanced Estimating</h3>
                                <p className="text-orange-100 text-sm">Get unlimited estimates, custom templates, and advanced AI pricing recommendations</p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/contractor/tools#pricing"
                            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                        >
                            Upgrade Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
