'use client'

import { useState, useEffect } from 'react'
import {
    Calculator,
    FileText,
    CreditCard,
    BarChart3,
    Calendar,
    Users,
    Settings,
    Crown,
    Zap,
    PieChart,
    Clock,
    DollarSign,
    CheckSquare,
    Camera,
    MessageSquare,
    Globe,
    Palette,
    Briefcase,
    TrendingUp,
    Award,
    Smartphone
} from 'lucide-react'
import Link from 'next/link'

// Subscription Plans
const subscriptionPlans = [
    {
        name: 'FREE',
        price: 0,
        yearlyPrice: 0,
        description: 'Get started with basic tools',
        features: [
            '3 Active Projects',
            '10 Clients',
            '5 Invoices/month',
            '10 Estimates/month',
            'Basic Project Management',
            'Simple Time Tracking',
            'Email Support'
        ],
        limitations: [
            'Remodely.AI branding on documents',
            'Limited templates',
            'Basic reporting'
        ],
        color: 'gray',
        icon: CheckSquare
    },
    {
        name: 'BASIC',
        price: 29,
        yearlyPrice: 290,
        description: 'Essential tools for growing contractors',
        features: [
            '25 Active Projects',
            '50 Clients',
            'Unlimited Invoices',
            'Unlimited Estimates',
            'Advanced Project Management',
            'Time Tracking with Reports',
            'Client Portal',
            'Custom Branding',
            'Professional Templates',
            'Priority Support'
        ],
        popular: false,
        color: 'blue',
        icon: Briefcase
    },
    {
        name: 'PROFESSIONAL',
        price: 59,
        yearlyPrice: 590,
        description: 'Complete toolkit for established contractors',
        features: [
            'Unlimited Projects',
            'Unlimited Clients',
            'Advanced Invoicing & Payments',
            'Smart Estimating with AI',
            'Comprehensive Project Management',
            'Team Collaboration Tools',
            'Custom Client Portals',
            'Advanced Reporting & Analytics',
            'Inventory Management',
            'Mobile App Access',
            'API Integration',
            'Phone Support'
        ],
        popular: true,
        color: 'orange',
        icon: Crown
    },
    {
        name: 'ENTERPRISE',
        price: 99,
        yearlyPrice: 990,
        description: 'Full-scale solution for large contractors',
        features: [
            'Everything in Professional',
            'Multi-location Management',
            'Advanced Team Permissions',
            'Custom Integrations',
            'White-label Client Portals',
            'Advanced Financial Reporting',
            'Subcontractor Management',
            'Equipment Tracking',
            'Advanced Scheduling',
            'Custom Training',
            'Dedicated Account Manager'
        ],
        popular: false,
        color: 'purple',
        icon: Award
    }
]

// Tool Categories
const toolCategories = [
    {
        id: 'project-management',
        name: 'Project Management',
        description: 'Organize projects, tasks, and timelines',
        icon: CheckSquare,
        color: 'blue',
        tools: [
            { name: 'Project Dashboard', description: 'Overview of all projects', premium: false },
            { name: 'Task Management', description: 'Create and assign tasks', premium: false },
            { name: 'Timeline & Milestones', description: 'Track project progress', premium: true },
            { name: 'Resource Planning', description: 'Manage materials and labor', premium: true },
            { name: 'Document Management', description: 'Store and share project files', premium: true }
        ]
    },
    {
        id: 'estimating',
        name: 'Smart Estimating',
        description: 'Create accurate estimates quickly',
        icon: Calculator,
        color: 'green',
        tools: [
            { name: 'Quick Estimates', description: 'Basic estimate creation', premium: false },
            { name: 'Template Library', description: 'Pre-built estimate templates', premium: true },
            { name: 'AI-Powered Pricing', description: 'Smart material and labor costs', premium: true },
            { name: 'Markup Calculator', description: 'Automatic profit calculations', premium: true },
            { name: 'Comparative Analysis', description: 'Compare estimates to actuals', premium: true }
        ]
    },
    {
        id: 'invoicing',
        name: 'Invoicing & Payments',
        description: 'Professional billing and payment processing',
        icon: CreditCard,
        color: 'purple',
        tools: [
            { name: 'Basic Invoicing', description: 'Create and send invoices', premium: false },
            { name: 'Automated Reminders', description: 'Payment follow-up automation', premium: true },
            { name: 'Online Payments', description: 'Accept credit cards and ACH', premium: true },
            { name: 'Recurring Billing', description: 'Set up subscription services', premium: true },
            { name: 'Payment Analytics', description: 'Track payment patterns', premium: true }
        ]
    },
    {
        id: 'client-portal',
        name: 'Client Portal',
        description: 'Professional client experience',
        icon: Globe,
        color: 'orange',
        tools: [
            { name: 'Basic Portal', description: 'Simple client dashboard', premium: true },
            { name: 'Custom Branding', description: 'Your logo and colors', premium: true },
            { name: 'Project Updates', description: 'Real-time progress sharing', premium: true },
            { name: 'Document Sharing', description: 'Secure file exchange', premium: true },
            { name: 'Payment Integration', description: 'Online payment processing', premium: true }
        ]
    },
    {
        id: 'reporting',
        name: 'Analytics & Reports',
        description: 'Business intelligence and insights',
        icon: BarChart3,
        color: 'indigo',
        tools: [
            { name: 'Basic Reports', description: 'Simple project and financial reports', premium: false },
            { name: 'Advanced Analytics', description: 'Detailed business insights', premium: true },
            { name: 'Profit Analysis', description: 'Job profitability tracking', premium: true },
            { name: 'Time Reports', description: 'Labor efficiency analysis', premium: true },
            { name: 'Custom Dashboards', description: 'Personalized KPI tracking', premium: true }
        ]
    },
    {
        id: 'scheduling',
        name: 'Scheduling & Calendar',
        description: 'Manage appointments and resources',
        icon: Calendar,
        color: 'teal',
        tools: [
            { name: 'Basic Calendar', description: 'Simple appointment scheduling', premium: false },
            { name: 'Team Scheduling', description: 'Coordinate multiple workers', premium: true },
            { name: 'Client Booking', description: 'Online appointment booking', premium: true },
            { name: 'Resource Calendar', description: 'Equipment and material planning', premium: true },
            { name: 'Mobile Sync', description: 'Sync with phone calendars', premium: true }
        ]
    }
]

export default function ContractorToolsPage() {
    const [currentPlan, setCurrentPlan] = useState('FREE')
    const [billingCycle, setBillingCycle] = useState('monthly')
    const [activeCategory, setActiveCategory] = useState('project-management')

    const getCurrentPlanFeatures = () => {
        const plan = subscriptionPlans.find(p => p.name === currentPlan)
        return plan?.features || []
    }

    const getToolAccess = (toolName: string, isPremium: boolean) => {
        if (!isPremium) return 'available'
        if (currentPlan === 'FREE') return 'upgrade'
        return 'available'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Zap className="text-orange-600 mr-3" size={40} />
                        <h1 className="text-4xl font-bold text-gray-900">Contractor Tools</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Complete professional toolkit to manage projects, create estimates, send invoices, and grow your contracting business
                    </p>
                </div>

                {/* Current Plan Status */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-xl ${currentPlan === 'FREE' ? 'bg-gray-100' : 'bg-orange-100'} mr-4`}>
                                {currentPlan === 'FREE' ?
                                    <CheckSquare className="text-gray-600" size={24} /> :
                                    <Crown className="text-orange-600" size={24} />
                                }
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Current Plan: {currentPlan}
                                </h3>
                                <p className="text-gray-600">
                                    {currentPlan === 'FREE' ? 'Start with our free tools' : `$${subscriptionPlans.find(p => p.name === currentPlan)?.price}/month`}
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors">
                            {currentPlan === 'FREE' ? 'Upgrade Plan' : 'Manage Subscription'}
                        </button>
                    </div>
                </div>

                {/* Tool Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Category Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Categories</h3>
                            <nav className="space-y-2">
                                {toolCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full text-left p-3 rounded-xl transition-colors flex items-center ${activeCategory === category.id
                                                ? 'bg-orange-100 text-orange-900 border border-orange-200'
                                                : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                    >
                                        <category.icon size={20} className="mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium">{category.name}</div>
                                            <div className="text-sm opacity-75">{category.description}</div>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Tool Details */}
                    <div className="lg:col-span-3">
                        {toolCategories.map((category) => (
                            activeCategory === category.id && (
                                <div key={category.id}>
                                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                                        <div className="flex items-center mb-6">
                                            <div className={`p-4 rounded-xl bg-${category.color}-100 mr-4`}>
                                                <category.icon className={`text-${category.color}-600`} size={32} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                                                <p className="text-gray-600">{category.description}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {category.tools.map((tool) => {
                                                const access = getToolAccess(tool.name, tool.premium)
                                                return (
                                                    <div
                                                        key={tool.name}
                                                        className={`p-4 rounded-xl border transition-all ${access === 'available'
                                                                ? 'border-green-200 bg-green-50'
                                                                : 'border-orange-200 bg-orange-50'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center mb-1">
                                                                    <h4 className="font-semibold text-gray-900 mr-2">{tool.name}</h4>
                                                                    {tool.premium && (
                                                                        <Crown className="text-orange-600" size={16} />
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-600 text-sm">{tool.description}</p>
                                                            </div>
                                                            <div className="ml-4">
                                                                {access === 'available' ? (
                                                                    <Link
                                                                        href={`/dashboard/contractor/tools/${category.id}/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                                                                    >
                                                                        Launch Tool
                                                                    </Link>
                                                                ) : (
                                                                    <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors">
                                                                        Upgrade to Use
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Subscription Plans */}
                <div className="mt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Start free and upgrade as your business grows
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center mt-6">
                            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                Monthly
                            </span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${billingCycle === 'yearly' ? 'bg-orange-600' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                Yearly
                            </span>
                            {billingCycle === 'yearly' && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Save 20%
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {subscriptionPlans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${plan.popular ? 'border-orange-500 transform scale-105' : 'border-gray-200'
                                    } ${currentPlan === plan.name ? 'ring-2 ring-orange-500' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className={`p-3 rounded-xl bg-${plan.color}-100 mr-3`}>
                                            <plan.icon className={`text-${plan.color}-600`} size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-bold text-gray-900">
                                                ${billingCycle === 'yearly' ? plan.yearlyPrice / 12 : plan.price}
                                            </span>
                                            <span className="text-gray-600 ml-1">/month</span>
                                        </div>
                                        {billingCycle === 'yearly' && plan.price > 0 && (
                                            <div className="text-sm text-gray-500">
                                                ${plan.yearlyPrice}/year (${Math.round((plan.price * 12 - plan.yearlyPrice) / (plan.price * 12) * 100)}% off)
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    <div className="space-y-3 mb-6">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-center">
                                                <CheckSquare className="text-green-600 mr-2 flex-shrink-0" size={16} />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {plan.limitations && (
                                        <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
                                            {plan.limitations.map((limitation) => (
                                                <div key={limitation} className="flex items-center">
                                                    <div className="w-4 h-4 mr-2 flex-shrink-0 rounded-full border border-gray-300 bg-gray-100" />
                                                    <span className="text-sm text-gray-500">{limitation}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setCurrentPlan(plan.name)}
                                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${currentPlan === plan.name
                                                ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                                                : plan.popular
                                                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                            }`}
                                        disabled={currentPlan === plan.name}
                                    >
                                        {currentPlan === plan.name ? 'Current Plan' :
                                            plan.name === 'FREE' ? 'Get Started' : 'Upgrade Now'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Overview */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Everything You Need to Run Your Contracting Business
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Smartphone className="text-blue-600" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile-First Design</h3>
                            <p className="text-gray-600">Access all tools from your phone or tablet on job sites</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="text-green-600" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow Your Business</h3>
                            <p className="text-gray-600">Increase efficiency and profitability with smart tools</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Settings className="text-purple-600" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Integration</h3>
                            <p className="text-gray-600">Seamlessly connects with your existing workflow</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
