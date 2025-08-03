'use client'

import { useState } from 'react'
import { Phone, MessageSquare, Mic, Brain, Target, Calendar, BarChart3, Users, Settings } from 'lucide-react'
import AIAgentService from '@/lib/aiAgentService'
import ElevenLabsService from '@/lib/elevenLabsService'

interface ContractorToolsProps {
  contractorId: string
  contractorName: string
  contractorPhone: string
}

export default function ContractorTools({ contractorId, contractorName, contractorPhone }: ContractorToolsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [aiAgentService] = useState(() => AIAgentService.getInstance())
  const [elevenLabsService] = useState(() => ElevenLabsService.getInstance())
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const handleVoiceCall = async (type: 'customer' | 'recruitment') => {
    setIsLoading(true)
    setActiveDemo('voice-call')
    
    try {
      if (type === 'customer') {
        // Simulate customer consultation call
        await aiAgentService.startCustomerConsultation(
          'demo-customer-123',
          'kitchen remodel',
          '+1234567890',
          new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
        )
        
        alert('🎯 AI Customer Consultation Scheduled!\n\nSarah will call the customer in 5 minutes to discuss their kitchen remodel project and present your services as a top match.')
      } else {
        // Simulate contractor recruitment call
        await aiAgentService.conductContractorOutreach(
          contractorPhone,
          {
            projectType: 'Bathroom Renovation',
            location: 'Austin, TX',
            estimatedValue: 18500,
            timeline: '3-4 weeks',
            customerRequirements: ['Master bathroom', 'Walk-in shower', 'Double vanity']
          }
        )
        
        alert('📞 AI Recruitment Call Initiated!\n\nDavid is calling you now about a $18,500 bathroom renovation project in Austin, TX. Answer your phone!')
      }
    } catch (error) {
      console.error('Voice call failed:', error)
      alert('Voice call system temporarily unavailable. This is a demo environment.')
    } finally {
      setIsLoading(false)
      setActiveDemo(null)
    }
  }

  const handleSMSNotification = async (type: 'opportunity' | 'follow-up') => {
    setIsLoading(true)
    setActiveDemo('sms')
    
    try {
      if (type === 'opportunity') {
        await aiAgentService.sendAINotification(
          contractorPhone,
          'contractor_opportunity',
          {
            opportunity: {
              projectType: 'Kitchen Remodel',
              location: 'Round Rock, TX',
              estimatedValue: 28000,
              timeline: '6-8 weeks'
            }
          }
        )
        
        alert('💼 Opportunity SMS Sent!\n\nText message sent: "New Kitchen Remodel project available! Est. value: $28,000. View details: remodely.ai/opportunity/demo123"')
      } else {
        await aiAgentService.sendAINotification(
          contractorPhone,
          'follow_up',
          { projectId: 'demo-project-456' }
        )
        
        alert('✅ Follow-up SMS Sent!\n\nText message sent: "Thanks for using REMODELY AI! How did your project go? Leave a review: remodely.ai/review/demo-project-456"')
      }
    } catch (error) {
      console.error('SMS failed:', error)
      alert('SMS system temporarily unavailable. This is a demo environment.')
    } finally {
      setIsLoading(false)
      setActiveDemo(null)
    }
  }

  const handleAIConsultation = async () => {
    setIsLoading(true)
    setActiveDemo('ai-consultation')
    
    try {
      // Simulate AI consultation analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const consultation = {
        projectAnalysis: 'Kitchen remodel with modern appliances and island',
        costEstimate: '$25,000 - $35,000',
        timeline: '6-8 weeks',
        permits: 'Electrical and plumbing permits required',
        recommendations: [
          'Quartz countertops for durability',
          'Soft-close cabinet hardware',
          'Under-cabinet LED lighting',
          'Tile backsplash for easy maintenance'
        ],
        matchScore: 94
      }
      
      alert(`🧠 AI Consultation Complete!\n\nProject: ${consultation.projectAnalysis}\nEstimate: ${consultation.costEstimate}\nTimeline: ${consultation.timeline}\nMatch Score: ${consultation.matchScore}%\n\nSee full report at remodely.ai/consultation/demo`)
    } catch (error) {
      console.error('AI consultation failed:', error)
    } finally {
      setIsLoading(false)
      setActiveDemo(null)
    }
  }

  const handleVoiceTest = async () => {
    setIsLoading(true)
    setActiveDemo('voice-test')
    
    try {
      const testResult = await elevenLabsService.testVoice(ElevenLabsService.VOICES.ADAM)
      
      if (testResult.success) {
        // Create audio element and play
        const audio = new Audio(testResult.audioUrl)
        audio.play()
        
        alert(`🎙️ Voice Test Successful!\n\nVoice: ${testResult.voiceName}\nPlaying sample audio now...`)
      } else {
        alert(`❌ Voice Test Failed: ${testResult.error}`)
      }
    } catch (error) {
      console.error('Voice test failed:', error)
      alert('Voice test failed. This feature requires ElevenLabs API key.')
    } finally {
      setIsLoading(false)
      setActiveDemo(null)
    }
  }

  const tools = [
    {
      id: 'voice-customer',
      title: 'AI Customer Calls',
      description: 'AI agent calls customers about their projects and presents you as a match',
      icon: Phone,
      color: 'bg-green-500',
      action: () => handleVoiceCall('customer')
    },
    {
      id: 'voice-recruitment',
      title: 'Contractor Outreach',
      description: 'AI agent calls you with new project opportunities',
      icon: Mic,
      color: 'bg-blue-500',
      action: () => handleVoiceCall('recruitment')
    },
    {
      id: 'sms-opportunity',
      title: 'Opportunity Alerts',
      description: 'Get SMS notifications about new projects in your area',
      icon: MessageSquare,
      color: 'bg-purple-500',
      action: () => handleSMSNotification('opportunity')
    },
    {
      id: 'ai-consultation',
      title: 'AI Project Analysis',
      description: 'Get detailed project analysis and cost estimates',
      icon: Brain,
      color: 'bg-orange-500',
      action: handleAIConsultation
    },
    {
      id: 'voice-test',
      title: 'Test AI Voice',
      description: 'Hear how our AI agents sound',
      icon: Target,
      color: 'bg-red-500',
      action: handleVoiceTest
    },
    {
      id: 'sms-followup',
      title: 'Follow-up System',
      description: 'Automated follow-up messages for completed projects',
      icon: Calendar,
      color: 'bg-indigo-500',
      action: () => handleSMSNotification('follow-up')
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Contractor Tools</h3>
          <p className="text-sm text-gray-600">Powered by ElevenLabs Voice AI & Google Cloud Agents</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">AI ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const IconComponent = tool.icon
          const isActive = activeDemo === tool.id
          
          return (
            <button
              key={tool.id}
              onClick={tool.action}
              disabled={isLoading}
              className={`
                relative p-4 rounded-lg border border-gray-200 text-left transition-all duration-200 
                hover:shadow-md hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
                ${isActive ? 'ring-2 ring-blue-500 border-blue-500' : ''}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white
                  ${tool.color}
                `}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{tool.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
                </div>
              </div>
              
              {isActive && (
                <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium text-blue-600">Processing...</span>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-500">Call Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">3.2x</div>
            <div className="text-xs text-gray-500">More Leads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-xs text-gray-500">AI Available</div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-4 h-4 text-amber-600 mt-0.5">⚡</div>
          <div className="text-xs text-amber-800">
            <strong>Demo Mode:</strong> These tools showcase AI agent capabilities. In production, 
            real phone calls and SMS messages would be sent using Twilio integration.
          </div>
        </div>
      </div>
    </div>
  )
}
