'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Calendar, DollarSign, CheckCircle } from 'lucide-react'

const projectTypes = [
    { id: 'countertops', label: 'Countertops', popular: true },
    { id: 'flooring', label: 'Flooring', popular: true },
    { id: 'backsplash', label: 'Backsplash', popular: false },
    { id: 'fireplace', label: 'Fireplace', popular: false },
    { id: 'bathroom', label: 'Bathroom Vanity', popular: true },
    { id: 'other', label: 'Other', popular: false }
]

export default function QuickQuoteForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        projectType: '',
        location: '',
        timeline: '',
        budget: ''
    })
    const [isDemo, setIsDemo] = useState(false)

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1)
        } else {
            // Simulate quote generation
            setIsDemo(true)
        }
    }

    const handleProjectTypeSelect = (type: string) => {
        setFormData(prev => ({ ...prev, projectType: type }))
        setTimeout(handleNext, 300)
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Get Your Free Quote in 60 Seconds
                    </h2>
                    <p className="text-xl text-gray-600">
                        No account required • Instant contractor matching • 100% free
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500">Step {step} of 4</span>
                            <span className="text-sm font-medium text-blue-600">{Math.round((step / 4) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                                className="bg-blue-500 h-2 rounded-full"
                                initial={{ width: '25%' }}
                                animate={{ width: `${(step / 4) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="bg-gray-50 rounded-2xl p-8"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    What type of project do you have?
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {projectTypes.map((type) => (
                                        <motion.button
                                            key={type.id}
                                            onClick={() => handleProjectTypeSelect(type.id)}
                                            className="relative p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-white transition-all duration-200 text-left group"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {type.popular && (
                                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                                    Popular
                                                </span>
                                            )}
                                            <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                                {type.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="bg-gray-50 rounded-2xl p-8"
                            >
                                <div className="flex items-center justify-center mb-6">
                                    <MapPin className="w-8 h-8 text-blue-500 mr-3" />
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Where is your project located?
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Enter your city and state"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    />
                                    <button
                                        onClick={handleNext}
                                        disabled={!formData.location}
                                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                                    >
                                        <span>Continue</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="bg-gray-50 rounded-2xl p-8"
                            >
                                <div className="flex items-center justify-center mb-6">
                                    <Calendar className="w-8 h-8 text-blue-500 mr-3" />
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        When do you want to start?
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {['ASAP', 'Within 1 month', 'Within 3 months', 'Just planning'].map((timeline) => (
                                        <motion.button
                                            key={timeline}
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, timeline }))
                                                setTimeout(handleNext, 300)
                                            }}
                                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-white transition-all duration-200"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="font-medium text-gray-900">{timeline}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && !isDemo && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="bg-gray-50 rounded-2xl p-8"
                            >
                                <div className="flex items-center justify-center mb-6">
                                    <DollarSign className="w-8 h-8 text-blue-500 mr-3" />
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        What's your budget range?
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Under $5,000', '$5,000-$15,000', '$15,000-$30,000', '$30,000+'].map((budget) => (
                                        <motion.button
                                            key={budget}
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, budget }))
                                                setTimeout(handleNext, 300)
                                            }}
                                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-white transition-all duration-200"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="font-medium text-gray-900">{budget}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {isDemo && (
                            <motion.div
                                key="demo"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    Great! We Found 5 Perfect Matches
                                </h3>
                                <p className="text-lg text-gray-600 mb-8">
                                    Based on your {formData.projectType} project in {formData.location}, we've identified contractors with excellent reviews and availability.
                                </p>

                                <div className="bg-white rounded-lg p-6 mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Your matched contractors offer:</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Licensed & Insured</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>4.8+ Star Rating</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Available {formData.timeline.toLowerCase()}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>In your budget range</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
                                        See Your Matched Contractors (Free)
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStep(1)
                                            setIsDemo(false)
                                            setFormData({ projectType: '', location: '', timeline: '', budget: '' })
                                        }}
                                        className="w-full text-blue-500 hover:text-blue-600 py-2 font-medium transition-colors"
                                    >
                                        Try Another Project
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
