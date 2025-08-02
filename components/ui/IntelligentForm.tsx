'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Sparkles, Brain, Target } from 'lucide-react'

interface IntelligentFormData {
    // Project basics
    projectType: string
    homeAge: string
    homeSize: string

    // Smart profiling
    style: string
    budget: string
    timeline: string
    priorities: string[]

    // Contact
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string

    // AI insights
    aiSuggestions: string[]
    matchScore: number
}

interface IntelligentFormProps {
    onSubmit: (data: IntelligentFormData) => void
    className?: string
}

export default function IntelligentForm({ onSubmit, className = '' }: IntelligentFormProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<IntelligentFormData>({
        projectType: '',
        homeAge: '',
        homeSize: '',
        style: '',
        budget: '',
        timeline: '',
        priorities: [],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        aiSuggestions: [],
        matchScore: 0
    })
    const [aiInsights, setAiInsights] = useState<string[]>([])
    const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)

    const steps = [
        {
            title: 'Project Vision',
            subtitle: 'Tell us about your dream project',
            fields: ['projectType', 'style', 'priorities']
        },
        {
            title: 'Smart Profiling',
            subtitle: 'AI-powered project analysis',
            fields: ['homeAge', 'homeSize', 'budget', 'timeline']
        },
        {
            title: 'Contact Information',
            subtitle: 'Connect with perfect matches',
            fields: ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode']
        }
    ]

    const projectTypes = [
        { value: 'kitchen-remodel', label: 'Kitchen Remodeling', popular: true },
        { value: 'bathroom-remodel', label: 'Bathroom Renovation', popular: true },
        { value: 'home-addition', label: 'Home Addition', popular: true },
        { value: 'basement-finishing', label: 'Basement Finishing', popular: false },
        { value: 'flooring', label: 'Flooring Installation', popular: true },
        { value: 'roofing', label: 'Roofing', popular: false },
        { value: 'windows-doors', label: 'Windows & Doors', popular: false },
        { value: 'painting', label: 'Interior Painting', popular: true },
        { value: 'deck-patio', label: 'Deck/Patio', popular: false },
        { value: 'custom-build', label: 'Custom Home Build', popular: false },
        { value: 'other', label: 'Other Project', popular: false }
    ]

    const styles = [
        'Modern/Contemporary', 'Traditional', 'Farmhouse', 'Industrial',
        'Mid-Century Modern', 'Transitional', 'Rustic', 'Mediterranean', 'Not Sure'
    ]

    const priorities = [
        'Quality Materials', 'Quick Timeline', 'Budget-Friendly', 'Energy Efficiency',
        'Resale Value', 'Unique Design', 'Low Maintenance', 'Smart Home Features'
    ]

    const budgetRanges = [
        '$5,000 - $15,000', '$15,000 - $30,000', '$30,000 - $50,000',
        '$50,000 - $100,000', '$100,000 - $200,000', '$200,000+'
    ]

    const timelines = [
        'ASAP (1-2 months)', 'Soon (2-4 months)', 'This Year (4-12 months)',
        'Next Year', 'Just Exploring'
    ]

    useEffect(() => {
        if (currentStep === 1 && formData.projectType && formData.style) {
            generateAIInsights()
        }
    }, [currentStep, formData.projectType, formData.style])

    const generateAIInsights = async () => {
        setIsGeneratingInsights(true)

        // Simulate AI analysis
        setTimeout(() => {
            const insights = generateInsights(formData.projectType, formData.style)
            setAiInsights(insights)
            setFormData(prev => ({ ...prev, aiSuggestions: insights, matchScore: Math.floor(Math.random() * 15) + 85 }))
            setIsGeneratingInsights(false)
        }, 2000)
    }

    const generateInsights = (projectType: string, style: string): string[] => {
        const insights = []

        if (projectType === 'kitchen-remodel') {
            insights.push('Consider quartz countertops for durability and low maintenance')
            insights.push('LED under-cabinet lighting will enhance your ' + style.toLowerCase() + ' design')
            insights.push('Soft-close drawers are a popular upgrade for kitchen functionality')
        } else if (projectType === 'bathroom-remodel') {
            insights.push('Heated floors are trending for bathroom renovations')
            insights.push('Your ' + style.toLowerCase() + ' style pairs well with large format tiles')
            insights.push('Consider a floating vanity to maximize visual space')
        } else {
            insights.push('Your ' + style.toLowerCase() + ' style is trending in ' + projectType.replace('-', ' ') + ' projects')
            insights.push('Consider energy-efficient materials for long-term savings')
            insights.push('Smart home integration is popular for this project type')
        }

        return insights
    }

    const handleInputChange = (field: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const isStepValid = () => {
        const currentFields = steps[currentStep].fields
        return currentFields.every(field => {
            const value = formData[field as keyof IntelligentFormData]
            if (Array.isArray(value)) {
                return value.length > 0
            }
            return value && value.toString().length > 0
        })
    }

    return (
        <div className={`max-w-2xl mx-auto bg-white rounded-lg shadow-sm border ${className}`}>
            {/* Progress Bar */}
            <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-blue-600" />
                        Smart Project Matching
                    </h2>
                    <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
                {/* Step Content */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{steps[currentStep].title}</h3>
                    <p className="text-gray-600 mb-6">{steps[currentStep].subtitle}</p>

                    {/* Step 0: Project Vision */}
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            {/* Project Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    What type of project do you have in mind?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {projectTypes.map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => handleInputChange('projectType', type.value)}
                                            className={`p-3 text-left border rounded-lg transition-all hover:border-blue-300 relative ${formData.projectType === type.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            {type.popular && (
                                                <span className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                                                    Popular
                                                </span>
                                            )}
                                            <span className="font-medium">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Style */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    What's your preferred style?
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {styles.map((style) => (
                                        <button
                                            key={style}
                                            type="button"
                                            onClick={() => handleInputChange('style', style)}
                                            className={`p-3 text-center border rounded-lg transition-all ${formData.style === style
                                                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Priorities */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    What's most important to you? (Select up to 3)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {priorities.map((priority) => {
                                        const isSelected = formData.priorities.includes(priority)
                                        const canSelect = formData.priorities.length < 3 || isSelected

                                        return (
                                            <button
                                                key={priority}
                                                type="button"
                                                disabled={!canSelect}
                                                onClick={() => {
                                                    const currentPriorities = formData.priorities
                                                    if (isSelected) {
                                                        handleInputChange('priorities', currentPriorities.filter(p => p !== priority))
                                                    } else {
                                                        handleInputChange('priorities', [...currentPriorities, priority])
                                                    }
                                                }}
                                                className={`p-3 text-left border rounded-lg transition-all ${isSelected
                                                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                        : canSelect
                                                            ? 'border-gray-200 hover:bg-gray-50'
                                                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                {priority}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Smart Profiling */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            {/* AI Insights */}
                            {(aiInsights.length > 0 || isGeneratingInsights) && (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center mb-2">
                                        <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                                        <h4 className="font-medium text-blue-900">AI Project Insights</h4>
                                    </div>
                                    {isGeneratingInsights ? (
                                        <div className="flex items-center text-blue-700">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                                            Analyzing your project preferences...
                                        </div>
                                    ) : (
                                        <ul className="space-y-1 text-sm text-blue-800">
                                            {aiInsights.map((insight, index) => (
                                                <li key={index} className="flex items-start">
                                                    <Target className="w-3 h-3 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                                                    {insight}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Home Age */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        How old is your home?
                                    </label>
                                    <select
                                        value={formData.homeAge}
                                        onChange={(e) => handleInputChange('homeAge', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select age range</option>
                                        <option value="new">Less than 5 years</option>
                                        <option value="recent">5-15 years</option>
                                        <option value="established">15-30 years</option>
                                        <option value="mature">30-50 years</option>
                                        <option value="vintage">50+ years</option>
                                    </select>
                                </div>

                                {/* Home Size */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Approximate home size
                                    </label>
                                    <select
                                        value={formData.homeSize}
                                        onChange={(e) => handleInputChange('homeSize', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select size</option>
                                        <option value="small">Under 1,500 sq ft</option>
                                        <option value="medium">1,500 - 2,500 sq ft</option>
                                        <option value="large">2,500 - 4,000 sq ft</option>
                                        <option value="xlarge">4,000+ sq ft</option>
                                    </select>
                                </div>
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    What's your budget range?
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {budgetRanges.map((budget) => (
                                        <button
                                            key={budget}
                                            type="button"
                                            onClick={() => handleInputChange('budget', budget)}
                                            className={`p-3 text-center border rounded-lg transition-all ${formData.budget === budget
                                                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            {budget}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    When would you like to start?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {timelines.map((timeline) => (
                                        <button
                                            key={timeline}
                                            type="button"
                                            onClick={() => handleInputChange('timeline', timeline)}
                                            className={`p-3 text-left border rounded-lg transition-all ${formData.timeline === timeline
                                                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            {timeline}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Contact Information */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            {/* Match Score */}
                            {formData.matchScore > 0 && (
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center">
                                        <Target className="w-5 h-5 mr-2 text-green-600" />
                                        <span className="font-medium text-green-900">
                                            {formData.matchScore}% Match Score - We found great contractors for your project!
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Address *
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Street address"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => handleInputChange('state', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Zip Code *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t">
                    {currentStep > 0 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </button>
                    ) : (
                        <div />
                    )}

                    {currentStep < steps.length - 1 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!isStepValid()}
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Continue
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!isStepValid()}
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Get AI-Matched Contractors
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
