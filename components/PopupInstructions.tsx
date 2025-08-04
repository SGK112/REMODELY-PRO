/**
 * Interactive Popup Instructions System
 * Provides contextual help and guided tours throughout the platform
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronRight, ChevronLeft, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react'

export interface InstructionStep {
  id: string
  title: string
  content: string
  element?: string // CSS selector for target element
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  action?: {
    type: 'click' | 'input' | 'scroll' | 'wait'
    target?: string
    value?: string
    duration?: number
  }
  showNext?: boolean
  showPrev?: boolean
  showSkip?: boolean
}

export interface InstructionTour {
  id: string
  name: string
  description: string
  category: 'onboarding' | 'feature' | 'advanced' | 'troubleshooting'
  priority: 'high' | 'medium' | 'low'
  steps: InstructionStep[]
  triggers: {
    page?: string[]
    userType?: string[]
    firstVisit?: boolean
    featureAccess?: string
    timeDelay?: number
  }
  completion?: {
    trackProgress: boolean
    certificate?: boolean
    unlockFeatures?: string[]
  }
}

interface PopupInstructionsProps {
  tours: InstructionTour[]
  currentPage: string
  userType?: string
  isFirstVisit?: boolean
  onComplete?: (tourId: string) => void
  onSkip?: (tourId: string, stepId: string) => void
}

interface TooltipPosition {
  top: number
  left: number
  arrow: 'top' | 'bottom' | 'left' | 'right'
}

export const PopupInstructions: React.FC<PopupInstructionsProps> = ({
  tours,
  currentPage,
  userType,
  isFirstVisit,
  onComplete,
  onSkip
}) => {
  const [activeTour, setActiveTour] = useState<InstructionTour | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ top: 0, left: 0, arrow: 'top' })
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const overlayRef = useRef<HTMLDivElement>(null)

  // Auto-trigger tours based on conditions
  useEffect(() => {
    const eligibleTours = tours.filter(tour => {
      const { triggers } = tour

      // Check page matching
      if (triggers.page && !triggers.page.some(page => currentPage.includes(page))) {
        return false
      }

      // Check user type
      if (triggers.userType && userType && !triggers.userType.includes(userType)) {
        return false
      }

      // Check first visit
      if (triggers.firstVisit && !isFirstVisit) {
        return false
      }

      return true
    })

    // Start highest priority tour
    if (eligibleTours.length > 0 && !activeTour) {
      const priorityTour = eligibleTours.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })[0]

      if (priorityTour.triggers.timeDelay) {
        setTimeout(() => startTour(priorityTour), priorityTour.triggers.timeDelay)
      } else {
        startTour(priorityTour)
      }
    }
  }, [currentPage, userType, isFirstVisit, tours])

  // Update tooltip position when step changes
  useEffect(() => {
    if (activeTour && isVisible) {
      updateTooltipPosition()
    }
  }, [currentStepIndex, activeTour, isVisible])

  const startTour = (tour: InstructionTour) => {
    setActiveTour(tour)
    setCurrentStepIndex(0)
    setIsVisible(true)
    setCompletedSteps(new Set())
  }

  const updateTooltipPosition = () => {
    if (!activeTour) return

    const currentStep = activeTour.steps[currentStepIndex]
    if (!currentStep.element) {
      // Center position for non-targeted steps
      setTooltipPosition({
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
        arrow: 'top'
      })
      return
    }

    const targetElement = document.querySelector(currentStep.element)
    if (!targetElement) return

    const rect = targetElement.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

    let position: TooltipPosition = { top: 0, left: 0, arrow: 'top' }

    switch (currentStep.position) {
      case 'top':
        position = {
          top: rect.top + scrollTop - 20,
          left: rect.left + scrollLeft + rect.width / 2,
          arrow: 'bottom'
        }
        break
      case 'bottom':
        position = {
          top: rect.bottom + scrollTop + 20,
          left: rect.left + scrollLeft + rect.width / 2,
          arrow: 'top'
        }
        break
      case 'left':
        position = {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.left + scrollLeft - 20,
          arrow: 'right'
        }
        break
      case 'right':
        position = {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.right + scrollLeft + 20,
          arrow: 'left'
        }
        break
      case 'center':
        position = {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.left + scrollLeft + rect.width / 2,
          arrow: 'top'
        }
        break
    }

    setTooltipPosition(position)

    // Highlight target element
    if (targetElement) {
      targetElement.classList.add('instruction-highlight')
      setTimeout(() => {
        targetElement.classList.remove('instruction-highlight')
      }, 3000)
    }
  }

  const nextStep = () => {
    if (!activeTour) return

    const currentStep = activeTour.steps[currentStepIndex]
    setCompletedSteps(prev => {
      const newSet = new Set(prev)
      newSet.add(currentStep.id)
      return newSet
    })

    // Perform action if specified
    if (currentStep.action) {
      performAction(currentStep.action)
    }

    if (currentStepIndex < activeTour.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const performAction = (action: InstructionStep['action']) => {
    if (!action) return

    const { type, target, value, duration } = action

    switch (type) {
      case 'click':
        if (target) {
          const element = document.querySelector(target) as HTMLElement
          element?.click()
        }
        break
      case 'input':
        if (target && value) {
          const element = document.querySelector(target) as HTMLInputElement
          if (element) {
            element.value = value
            element.dispatchEvent(new Event('input', { bubbles: true }))
          }
        }
        break
      case 'scroll':
        if (target) {
          const element = document.querySelector(target)
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        break
      case 'wait':
        setTimeout(() => { }, duration || 1000)
        break
    }
  }

  const completeTour = () => {
    if (!activeTour) return

    setIsVisible(false)
    onComplete?.(activeTour.id)

    // Track completion
    if (activeTour.completion?.trackProgress) {
      localStorage.setItem(
        `tour_completed_${activeTour.id}`,
        JSON.stringify({
          completedAt: new Date().toISOString(),
          steps: Array.from(completedSteps)
        })
      )
    }

    // Reset state
    setTimeout(() => {
      setActiveTour(null)
      setCurrentStepIndex(0)
      setCompletedSteps(new Set())
    }, 300)
  }

  const skipTour = () => {
    if (!activeTour) return

    const currentStep = activeTour.steps[currentStepIndex]
    onSkip?.(activeTour.id, currentStep.id)

    setIsVisible(false)
    setTimeout(() => {
      setActiveTour(null)
      setCurrentStepIndex(0)
    }, 300)
  }

  if (!activeTour || !isVisible) return null

  const currentStep = activeTour.steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / activeTour.steps.length) * 100

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none"
        style={{
          background: currentStep.element
            ? 'rgba(0, 0, 0, 0.75)'
            : 'rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Instruction Tooltip */}
      <div
        className="fixed z-50 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 pointer-events-auto"
        style={{
          top: currentStep.position === 'center' ? '50%' : `${tooltipPosition.top}px`,
          left: currentStep.position === 'center' ? '50%' : `${tooltipPosition.left}px`,
          transform: currentStep.position === 'center' ? 'translate(-50%, -50%)' :
            tooltipPosition.arrow === 'left' || tooltipPosition.arrow === 'right'
              ? 'translateY(-50%)'
              : 'translateX(-50%)'
        }}
      >
        {/* Arrow */}
        <div
          className={`absolute w-0 h-0 ${tooltipPosition.arrow === 'top' ? 'border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white -top-2 left-1/2 transform -translate-x-1/2' :
              tooltipPosition.arrow === 'bottom' ? 'border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white -bottom-2 left-1/2 transform -translate-x-1/2' :
                tooltipPosition.arrow === 'left' ? 'border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white -left-2 top-1/2 transform -translate-y-1/2' :
                  'border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white -right-2 top-1/2 transform -translate-y-1/2'
            }`}
        />

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">{currentStep.title}</h3>
          </div>
          <button
            onClick={skipTour}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {currentStep.content}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step counter */}
          <div className="text-xs text-gray-500 text-center mb-4">
            Step {currentStepIndex + 1} of {activeTour.steps.length}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          <div className="flex space-x-2">
            {currentStep.showPrev !== false && currentStepIndex > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
            )}
          </div>

          <div className="flex space-x-2">
            {currentStep.showSkip !== false && (
              <button
                onClick={skipTour}
                className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip Tour
              </button>
            )}

            {currentStepIndex < activeTour.steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={completeTour}
                className="flex items-center px-4 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Complete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .instruction-highlight {
          position: relative;
          z-index: 41;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 2px white;
          border-radius: 4px;
          animation: instruction-pulse 2s infinite;
        }

        @keyframes instruction-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 2px white; }
          50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.3), 0 0 0 2px white; }
        }
      `}</style>
    </>
  )
}

// Tour Builder Helper
export class TourBuilder {
  private tour: Partial<InstructionTour> = {}

  static create(id: string, name: string) {
    const builder = new TourBuilder()
    builder.tour.id = id
    builder.tour.name = name
    builder.tour.steps = []
    return builder
  }

  description(desc: string) {
    this.tour.description = desc
    return this
  }

  category(cat: InstructionTour['category']) {
    this.tour.category = cat
    return this
  }

  priority(pri: InstructionTour['priority']) {
    this.tour.priority = pri
    return this
  }

  triggers(triggers: InstructionTour['triggers']) {
    this.tour.triggers = triggers
    return this
  }

  step(step: InstructionStep) {
    this.tour.steps!.push(step)
    return this
  }

  completion(completion: InstructionTour['completion']) {
    this.tour.completion = completion
    return this
  }

  build(): InstructionTour {
    if (!this.tour.id || !this.tour.name || !this.tour.steps?.length) {
      throw new Error('Tour must have id, name, and at least one step')
    }

    return {
      category: 'feature',
      priority: 'medium',
      triggers: {},
      ...this.tour
    } as InstructionTour
  }
}

// Predefined Tours
export const defaultTours: InstructionTour[] = [
  TourBuilder
    .create('welcome-onboarding', 'Welcome to Remodely.AI')
    .description('Get started with our platform in 3 easy steps')
    .category('onboarding')
    .priority('high')
    .triggers({ firstVisit: true, timeDelay: 2000 })
    .step({
      id: 'welcome',
      title: 'Welcome to Remodely.AI!',
      content: 'We\'re excited to help you find the perfect contractors for your renovation project. Let\'s take a quick tour!',
      position: 'center'
    })
    .step({
      id: 'navigation',
      title: 'Easy Navigation',
      content: 'Use our main menu to explore different services - from finding contractors to getting quotes.',
      element: 'nav',
      position: 'bottom'
    })
    .step({
      id: 'get-started',
      title: 'Start Your Project',
      content: 'Click here to request your first quote and get matched with verified contractors.',
      element: '[href="/quote/request"]',
      position: 'bottom',
      action: { type: 'click', target: '[href="/quote/request"]' }
    })
    .completion({ trackProgress: true })
    .build(),

  TourBuilder
    .create('quote-request-help', 'How to Request a Quote')
    .description('Learn how to get accurate quotes from contractors')
    .category('feature')
    .priority('high')
    .triggers({ page: ['/quote/request'] })
    .step({
      id: 'project-details',
      title: 'Describe Your Project',
      content: 'The more details you provide, the more accurate your quotes will be. Include room dimensions, materials preferences, and timeline.',
      element: '#project-description',
      position: 'right'
    })
    .step({
      id: 'upload-photos',
      title: 'Upload Photos',
      content: 'Photos help contractors understand your space better and provide more accurate estimates.',
      element: '#photo-upload',
      position: 'top'
    })
    .step({
      id: 'review-submit',
      title: 'Review and Submit',
      content: 'Double-check your information before submitting. You\'ll receive quotes within 24 hours!',
      element: '#submit-quote',
      position: 'top'
    })
    .build()
]

export default PopupInstructions
