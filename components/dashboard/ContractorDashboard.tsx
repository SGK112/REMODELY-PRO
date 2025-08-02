// Contractor/PRO Dashboard for REMODELY AI PRO
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {
    Home,
    Briefcase,
    MessageSquare,
    Calendar,
    CreditCard,
    Settings,
    Star,
    MapPin,
    Phone,
    Clock,
    DollarSign,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    Users,
    Award,
    Target,
    Eye
} from 'lucide-react'
import Link from 'next/link'

interface Lead {
    id: string
    projectName: string
    projectType: string
    budget: string
    location: string
    homeowner: string
    postedAt: Date
    status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost'
    urgency: 'low' | 'medium' | 'high'
    description: string
    timeframe: string
}

interface ContractorStats {
    totalLeads: number
    responseRate: number
    winRate: number
    averageQuoteValue: number
    monthlyRevenue: number
    rating: number
    reviewCount: number
    profileViews: number
}

export default function ContractorDashboard() {
    const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState('overview')
    const [leads, setLeads] = useState<Lead[]>([])
    const [stats, setStats] = useState<ContractorStats>({
        totalLeads: 0,
        responseRate: 0,
        winRate: 0,
        averageQuoteValue: 0,
        monthlyRevenue: 0,
        rating: 0,
        reviewCount: 0,
        profileViews: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            // Mock data - would come from API
            const mockLeads: Lead[] = [
                {
                    id: '1',
                    projectName: 'Modern Kitchen Renovation',
                    projectType: 'Kitchen Remodeling',
                    budget: '$$$ (Premium)',
                    location: 'Phoenix, AZ (5.2 miles)',
                    homeowner: 'Sarah Johnson',
                    postedAt: new Date('2025-08-01T10:30:00'),
                    status: 'new',
                    urgency: 'high',
                    description: 'Complete kitchen renovation including granite countertops, custom cabinets, and tile backsplash. Looking for experienced contractor with modern design expertise.',
                    timeframe: 'Next 2-3 weeks'
                },
                {
                    id: '2',
                    projectName: 'Bathroom Vanity Installation',
                    projectType: 'Bathroom Remodeling',
                    budget: '$$ (Standard)',
                    location: 'Round Rock, TX (12.8 miles)',
                    homeowner: 'Michael Chen',
                    postedAt: new Date('2025-07-31T14:15:00'),
                    status: 'contacted',
                    urgency: 'medium',
                    description: 'Replace existing vanity with new double sink vanity, including plumbing connections and countertop installation.',
                    timeframe: 'Flexible timing'
                },
                {
                    id: '3',
                    projectName: 'Granite Countertop Replacement',
                    projectType: 'Countertop Installation',
                    budget: '$$$ (Premium)',
                    location: 'Cedar Park, TX (18.3 miles)',
                    homeowner: 'Jennifer Williams',
                    postedAt: new Date('2025-07-30T09:45:00'),
                    status: 'quoted',
                    urgency: 'low',
                    description: 'Replace laminate countertops with granite in kitchen and bathroom. Prefer neutral colors.',
                    timeframe: 'Within 6 weeks'
                }
            ]

            setLeads(mockLeads)
            setStats({
                totalLeads: 47,
                responseRate: 94,
                winRate: 68,
                averageQuoteValue: 8750,
                monthlyRevenue: 42300,
                rating: 4.9,
                reviewCount: 127,
                profileViews: 1847
            })
            setLoading(false)
        } catch (error) {
            console.error('Failed to load dashboard data:', error)
            setLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800'
            case 'contacted': return 'bg-yellow-100 text-yellow-800'
            case 'quoted': return 'bg-purple-100 text-purple-800'
            case 'won': return 'bg-green-100 text-green-800'
            case 'lost': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'high': return 'text-red-600'
            case 'medium': return 'text-yellow-600'
            case 'low': return 'text-green-600'
            default: return 'text-gray-600'
        }
    }

    const formatTimeAgo = (date: Date) => {
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return 'Just now'
        if (diffInHours === 1) return '1 hour ago'
        if (diffInHours < 24) return `${diffInHours} hours ago`

        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays === 1) return '1 day ago'
        return `${diffInDays} days ago`
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-stone-900">
                                PRO Dashboard
                            </h1>
                            <p className="text-stone-600">Welcome back, {session?.user?.name || 'Professional'}!</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm text-stone-600">Your Rating</div>
                                <div className="flex items-center space-x-1">
                                    <Star className="text-yellow-400 fill-current" size={16} />
                                    <span className="font-semibold text-stone-900">{stats.rating}</span>
                                    <span className="text-sm text-stone-600">({stats.reviewCount} reviews)</span>
                                </div>
                            </div>
                            <Link href="/contractor/profile" className="btn-primary">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <nav className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <div className="space-y-2">
                                {[
                                    { id: 'overview', label: 'Overview', icon: Home },
                                    { id: 'leads', label: 'Leads', icon: Target },
                                    { id: 'projects', label: 'Active Projects', icon: Briefcase },
                                    { id: 'messages', label: 'Messages', icon: MessageSquare },
                                    { id: 'schedule', label: 'Schedule', icon: Calendar },
                                    { id: 'billing', label: 'Billing', icon: CreditCard },
                                    { id: 'settings', label: 'Settings', icon: Settings },
                                ].map(tab => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                ? 'bg-amber-100 text-amber-800 font-medium'
                                                : 'text-stone-600 hover:bg-stone-100'
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span>{tab.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {activeTab === 'overview' && (
                            <>
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-stone-600">New Leads</p>
                                                <p className="text-3xl font-bold text-stone-900">{stats.totalLeads}</p>
                                                <p className="text-xs text-green-600">+12% this month</p>
                                            </div>
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <Target className="text-blue-600" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-stone-600">Response Rate</p>
                                                <p className="text-3xl font-bold text-stone-900">{stats.responseRate}%</p>
                                                <p className="text-xs text-green-600">+5% this month</p>
                                            </div>
                                            <div className="bg-green-100 p-3 rounded-full">
                                                <MessageSquare className="text-green-600" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-stone-600">Win Rate</p>
                                                <p className="text-3xl font-bold text-stone-900">{stats.winRate}%</p>
                                                <p className="text-xs text-green-600">+8% this month</p>
                                            </div>
                                            <div className="bg-amber-100 p-3 rounded-full">
                                                <Award className="text-amber-600" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-stone-600">Monthly Revenue</p>
                                                <p className="text-3xl font-bold text-stone-900">${(stats.monthlyRevenue / 1000).toFixed(0)}k</p>
                                                <p className="text-xs text-green-600">+15% this month</p>
                                            </div>
                                            <div className="bg-purple-100 p-3 rounded-full">
                                                <TrendingUp className="text-purple-600" size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Leads */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold text-stone-900">Recent Leads</h2>
                                        <Link href="#" onClick={() => setActiveTab('leads')} className="text-amber-600 hover:text-amber-700">
                                            View All
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        {leads.slice(0, 3).map(lead => (
                                            <div key={lead.id} className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <h3 className="font-semibold text-stone-900">{lead.projectName}</h3>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                                                {lead.status}
                                                            </span>
                                                            <span className={`text-xs font-medium ${getUrgencyColor(lead.urgency)}`}>
                                                                {lead.urgency} priority
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-stone-600 mb-2">
                                                            <div className="flex items-center space-x-1">
                                                                <MapPin size={16} />
                                                                <span>{lead.location}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <DollarSign size={16} />
                                                                <span>{lead.budget}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock size={16} />
                                                                <span>{formatTimeAgo(lead.postedAt)}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-stone-600 line-clamp-2">{lead.description}</p>
                                                    </div>
                                                    <div className="ml-4 flex flex-col space-y-2">
                                                        {lead.status === 'new' && (
                                                            <button className="btn-primary text-sm">
                                                                Respond Now
                                                            </button>
                                                        )}
                                                        <button className="btn-outline text-sm">
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Performance Metrics */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">Profile Performance</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-stone-600">Profile Views</span>
                                                <span className="font-semibold text-stone-900">{stats.profileViews.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-stone-600">Contact Rate</span>
                                                <span className="font-semibold text-stone-900">23%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-stone-600">Avg. Quote Value</span>
                                                <span className="font-semibold text-stone-900">${stats.averageQuoteValue.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">Recent Activity</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-sm text-stone-600">New 5-star review received</span>
                                                <span className="text-xs text-stone-400">2h ago</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm text-stone-600">Lead responded to your quote</span>
                                                <span className="text-xs text-stone-400">4h ago</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                <span className="text-sm text-stone-600">Profile viewed 47 times today</span>
                                                <span className="text-xs text-stone-400">1d ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'leads' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-stone-900">All Leads</h2>
                                    <div className="flex items-center space-x-4">
                                        <select className="border border-stone-300 rounded-lg px-3 py-2 text-sm">
                                            <option>All Status</option>
                                            <option>New</option>
                                            <option>Contacted</option>
                                            <option>Quoted</option>
                                        </select>
                                        <select className="border border-stone-300 rounded-lg px-3 py-2 text-sm">
                                            <option>All Types</option>
                                            <option>Kitchen Remodeling</option>
                                            <option>Bathroom Remodeling</option>
                                            <option>Countertop Installation</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {leads.map(lead => (
                                        <div key={lead.id} className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <h3 className="text-lg font-semibold text-stone-900">{lead.projectName}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
                                                            {lead.status}
                                                        </span>
                                                        <span className={`text-sm font-medium ${getUrgencyColor(lead.urgency)}`}>
                                                            {lead.urgency} priority
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <Users size={16} />
                                                            <span>{lead.homeowner}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <MapPin size={16} />
                                                            <span>{lead.location}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <DollarSign size={16} />
                                                            <span>{lead.budget}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <Clock size={16} />
                                                            <span>{lead.timeframe}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-stone-700 mb-3">{lead.description}</p>

                                                    <div className="text-sm text-stone-500">
                                                        Posted: {formatTimeAgo(lead.postedAt)}
                                                    </div>
                                                </div>

                                                <div className="ml-6 flex flex-col space-y-2">
                                                    {lead.status === 'new' && (
                                                        <button className="btn-primary text-sm">
                                                            Respond Now
                                                        </button>
                                                    )}
                                                    {lead.status === 'contacted' && (
                                                        <button className="btn-primary text-sm">
                                                            Send Quote
                                                        </button>
                                                    )}
                                                    <button className="btn-outline text-sm">
                                                        View Details
                                                    </button>
                                                    <button className="text-sm text-stone-600 hover:text-stone-800">
                                                        Contact Info
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Other tabs would go here */}
                        {activeTab === 'billing' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold text-stone-900 mb-4">Subscription & Billing</h2>
                                <div className="space-y-6">
                                    {/* Current Plan */}
                                    <div className="border border-stone-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">Current Plan</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-stone-900">Professional Plan</p>
                                                <p className="text-stone-600">$99.99/month • Up to 50 leads</p>
                                            </div>
                                            <Link href="/pricing" className="btn-primary">
                                                Upgrade Plan
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Usage */}
                                    <div className="border border-stone-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">This Month's Usage</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm text-stone-600 mb-1">
                                                    <span>Leads Received</span>
                                                    <span>{stats.totalLeads} of 50 used</span>
                                                </div>
                                                <div className="w-full bg-stone-200 rounded-full h-2">
                                                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${(stats.totalLeads / 50) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
