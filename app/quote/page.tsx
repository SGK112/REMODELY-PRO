'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import IntelligentForm from '@/components/ui/IntelligentForm'

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [matchedContractors, setMatchedContractors] = useState<any[]>([])

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectType: formData.projectType,
          timeline: formData.timeline,
          budget: formData.budget,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          projectDescription: `${formData.style} style ${formData.projectType.replace('-', ' ')} project. Priorities: ${formData.priorities.join(', ')}. Home: ${formData.homeAge} (${formData.homeSize}).`,
          squareFootage: '',
          preferredContactMethod: 'phone',
          preferredContactTime: 'morning',
          intelligentData: {
            homeAge: formData.homeAge,
            homeSize: formData.homeSize,
            style: formData.style,
            priorities: formData.priorities,
            aiSuggestions: formData.aiSuggestions,
            matchScore: formData.matchScore
          }
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Your project has been submitted! AI-matched contractors will contact you soon.')
        setMatchedContractors(data.matchedContractors || [])
      } else {
        setSubmitStatus('error')
        setSubmitMessage(data.message || 'An error occurred while submitting your project.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-construction-hero py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-construction-heading mb-6">
            Get Professional AI-Powered Project Matches
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            REMODELY.AI PRO's intelligent matching system analyzes your construction requirements and connects you with verified, licensed contractors specializing in your project type.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-stone-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AI-Powered Matching</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>Licensed Contractors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Free Quotes</span>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {submitStatus !== 'idle' && (
          <div className={`mb-8 p-6 rounded-2xl flex items-start shadow-construction ${submitStatus === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
            {submitStatus === 'success' ? (
              <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
            ) : (
              <AlertCircle className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
            )}
            <div>
              <p className="font-semibold text-lg">{submitMessage}</p>
              {matchedContractors.length > 0 && (
                <p className="text-sm mt-2">
                  We found {matchedContractors.length} highly-rated professional contractors in your area who specialize in your project type.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Intelligent Form */}
        {submitStatus !== 'success' && (
          <IntelligentForm onSubmit={handleFormSubmit} />
        )}

        {/* Success State - Show Matched Contractors */}
        {submitStatus === 'success' && matchedContractors.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-amber-200/50 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your AI-Matched Professional Contractors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedContractors.map((contractor, index) => (
                <div key={index} className="border border-stone-200 rounded-lg p-4 hover:shadow-md hover:border-amber-300 transition-all">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {contractor.businessName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{contractor.businessName}</h3>
                      <p className="text-sm text-gray-600 mb-2">{contractor.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">⭐ {contractor.rating.toFixed(1)}</span>
                        <span className="mr-4">📍 {contractor.city}, {contractor.state}</span>
                        <span>📞 {contractor.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Matching in Progress</h3>
                <p className="text-gray-600">Finding the perfect contractors for your project...</p>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              🧠
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">Our intelligent system analyzes your project requirements and matches you with the most suitable contractors.</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Response</h3>
            <p className="text-gray-600">Get connected with pre-qualified contractors within 24 hours of submitting your project.</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              🎯
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect Matches</h3>
            <p className="text-gray-600">Our matching algorithm considers style preferences, budget, timeline, and contractor specialties.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
