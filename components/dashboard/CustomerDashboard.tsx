// Customer Dashboard for REMODELY AI PRO
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {
    Home,
    Search,
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
    Plus
} from 'lucide-react'
import Link from 'next/link'
import { smartMatchingService, SmartMatchCriteria } from '@/lib/smartMatching'
import { subscriptionService } from '@/lib/subscriptionService'

interface DashboardProject {
    id: string
    name: string
    type: string
    status: 'planning' | 'quotes' | 'in_progress' | 'completed'
    budget: string
    location: string
    createdAt: Date
    quotesReceived: number
    contractorMatches: number
    nextStep?: string
}

interface DashboardStats {
    activeProjects: number
    quotesReceived: number
    totalSavings: number
    contractorsConnected: number
}

export default function CustomerDashboard() {
    const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState('overview')
    const [projects, setProjects] = useState<DashboardProject[]>([])
    const [stats, setStats] = useState<DashboardStats>({
        activeProjects: 0,
        quotesReceived: 0,
        totalSavings: 0,
        contractorsConnected: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            // Mock data - would come from API
            const mockProjects: DashboardProject[] = [
                {
                    id: '1',
                    name: 'Kitchen Renovation',
                    type: 'Kitchen Remodeling',
                    status: 'quotes',
                    budget: '$$$ (Premium)',
                    location: 'Phoenix, AZ',
                    createdAt: new Date('2025-07-15'),
                    quotesReceived: 3,
                    contractorMatches: 8,
                    nextStep: 'Review and compare quotes'
                },
                {
                    id: '2',
                    name: 'Master Bathroom Update',
                    type: 'Bathroom Remodeling',
                    status: 'planning',
                    budget: '$$ (Standard)',
                    location: 'Phoenix, AZ',
                    createdAt: new Date('2025-07-28'),
                    quotesReceived: 0,
                    contractorMatches: 12,
                    nextStep: 'Connect with contractors'
                },
                {
                    id: '3',
                    name: 'Granite Countertops',
                    type: 'Countertop Installation',
                    status: 'completed',
                    budget: '$$$ (Premium)',
                    location: 'Phoenix, AZ',
                    createdAt: new Date('2025-06-01'),
                    quotesReceived: 5,
                    contractorMatches: 6
                }
            ]

            setProjects(mockProjects)
            setStats({
                activeProjects: mockProjects.filter(p => p.status !== 'completed').length,
                quotesReceived: mockProjects.reduce((sum, p) => sum + p.quotesReceived, 0),
                totalSavings: 3247,
                contractorsConnected: 15
            })
            setLoading(false)
        } catch (error) {
            console.error('Failed to load dashboard data:', error)
            setLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'planning': return 'bg-blue-100 text-blue-800'
            case 'quotes': return 'bg-yellow-100 text-yellow-800'
            case 'in_progress': return 'bg-green-100 text-green-800'
            case 'completed': return 'bg-gray-100 text-gray-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'planning': return <AlertCircle size={16} />
            case 'quotes': return <DollarSign size={16} />
            case 'in_progress': return <Clock size={16} />
            case 'completed': return <CheckCircle size={16} />
            default: return <AlertCircle size={16} />
        }
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
                                Welcome back, {session?.user?.name || 'User'}!
                            </h1>
                            <p className="text-stone-600">Manage your home improvement projects</p>
                        </div>
                        <Link
                            href="/quote"
                            className="btn-primary flex items-center space-x-2"
                        >
                            <Plus size={20} />
                            <span>New Project</span>
                        </Link>
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
                                    { id: 'projects', label: 'My Projects', icon: Search },
                                    { id: 'messages', label: 'Messages', icon: MessageSquare },
                                    { id: 'appointments', label: 'Appointments', icon: Calendar },
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
                                                <p className="text-sm text-stone-600">Active Projects</p>
                                                <p className="text-3xl font-bold text-stone-900">{stats.activeProjects}</p>
                                            </div>
                                            <div className="bg-amber-100 p-3 rounded-full">
                                                <Home className="text-amber-600" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-stone-600">Quotes Received</p>
                                                <p className="text-3xl font-bold text-stone-900">{stats.quotesReceived}</p>
                                            </div>
                                            <div className="bg-green-100 p-3 rounded-full">
                                                <DollarSign className="text-green-600" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-stone-600">Est. Savings</p>
                                                <p className="text-3xl font-bold text-stone-900">${stats.totalSavings.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <TrendingUp className="text-blue-600" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-stone-600">Contractors Connected</p>
                                                <p className="text-3xl font-bold text-stone-900">{stats.contractorsConnected}</p>
                                            </div>
                                            <div className="bg-purple-100 p-3 rounded-full">
                                                <MessageSquare className="text-purple-600" size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Projects */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold text-stone-900 mb-4">Recent Projects</h2>
                                    <div className="space-y-4">
                                        {projects.slice(0, 3).map(project => (
                                            <div key={project.id} className="border border-stone-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <h3 className="font-semibold text-stone-900">{project.name}</h3>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                                                                {getStatusIcon(project.status)}
                                                                <span className="capitalize">{project.status.replace('_', ' ')}</span>
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-stone-600">
                                                            <div className="flex items-center space-x-1">
                                                                <MapPin size={16} />
                                                                <span>{project.location}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <DollarSign size={16} />
                                                                <span>{project.budget}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <MessageSquare size={16} />
                                                                <span>{project.quotesReceived} quotes</span>
                                                            </div>
                                                        </div>
                                                        {project.nextStep && (
                                                            <div className="mt-2 text-sm text-amber-600 font-medium">
                                                                Next: {project.nextStep}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Link
                                                        href={`/dashboard/projects/${project.id}`}
                                                        className="ml-4 btn-outline text-sm"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => setActiveTab('projects')}
                                            className="btn-outline"
                                        >
                                            View All Projects
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'projects' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-stone-900">All Projects</h2>
                                    <Link href="/quote" className="btn-primary">
                                        <Plus size={20} className="mr-2" />
                                        New Project
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {projects.map(project => (
                                        <div key={project.id} className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <h3 className="text-lg font-semibold text-stone-900">{project.name}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                                                            {getStatusIcon(project.status)}
                                                            <span className="capitalize">{project.status.replace('_', ' ')}</span>
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <MapPin size={16} />
                                                            <span>{project.location}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <DollarSign size={16} />
                                                            <span>{project.budget}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <MessageSquare size={16} />
                                                            <span>{project.quotesReceived} quotes</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <Star size={16} />
                                                            <span>{project.contractorMatches} matches</span>
                                                        </div>
                                                    </div>

                                                    <div className="text-sm text-stone-500">
                                                        Created: {project.createdAt.toLocaleDateString()}
                                                    </div>

                                                    {project.nextStep && (
                                                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                                            <div className="flex items-center space-x-2">
                                                                <AlertCircle size={16} className="text-amber-600" />
                                                                <span className="text-sm font-medium text-amber-800">
                                                                    Next Step: {project.nextStep}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="ml-6 flex flex-col space-y-2">
                                                    <Link
                                                        href={`/dashboard/projects/${project.id}`}
                                                        className="btn-primary text-sm"
                                                    >
                                                        View Details
                                                    </Link>
                                                    {project.status === 'quotes' && (
                                                        <Link
                                                            href={`/dashboard/projects/${project.id}/quotes`}
                                                            className="btn-outline text-sm"
                                                        >
                                                            Compare Quotes
                                                        </Link>
                                                    )}
                                                    {project.status === 'planning' && (
                                                        <Link
                                                            href={`/contractors?project=${project.id}`}
                                                            className="btn-outline text-sm"
                                                        >
                                                            Find Contractors
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold text-stone-900 mb-4">Messages</h2>
                                <div className="text-center py-12">
                                    <MessageSquare size={64} className="mx-auto text-stone-400 mb-4" />
                                    <h3 className="text-lg font-medium text-stone-900 mb-2">No messages yet</h3>
                                    <p className="text-stone-600 mb-4">Connect with contractors to start conversations</p>
                                    <Link href="/contractors" className="btn-primary">
                                        Find Contractors
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === 'billing' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold text-stone-900 mb-4">Subscription & Billing</h2>
                                <div className="space-y-6">
                                    {/* Current Plan */}
                                    <div className="border border-stone-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">Current Plan</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-stone-900">Basic Plan</p>
                                                <p className="text-stone-600">Free • 2 projects per month</p>
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
                                                    <span>Projects Created</span>
                                                    <span>2 of 2 used</span>
                                                </div>
                                                <div className="w-full bg-stone-200 rounded-full h-2">
                                                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm text-stone-600 mb-1">
                                                    <span>Contractor Connections</span>
                                                    <span>3 of 5 used</span>
                                                </div>
                                                <div className="w-full bg-stone-200 rounded-full h-2">
                                                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: '60%' }}></div>
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
