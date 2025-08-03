/**
 * AI Agent Service for Contractor Tools
 * Provides intelligent contractor matching, consultation, and communication
 */

import { ElevenLabsService } from './elevenLabsService'
import AdvancedLocationService from './advancedLocationService'

export interface AIAgent {
  id: string
  name: string
  type: 'customer_consultant' | 'contractor_recruiter' | 'project_matcher' | 'quality_assessor'
  specialization: string[]
  voice?: {
    elevenLabsVoiceId: string
    personality: string
    accent: string
  }
  capabilities: string[]
  status: 'active' | 'busy' | 'offline'
}

export interface ConsultationSession {
  id: string
  customerId: string
  agentId: string
  projectType: string
  status: 'active' | 'completed' | 'scheduled' | 'cancelled'
  startTime: Date
  endTime?: Date
  transcript?: string[]
  recommendations?: ContractorRecommendation[]
  followUpActions?: string[]
}

export interface ContractorRecommendation {
  contractorId: string
  score: number
  reasons: string[]
  estimatedCost?: {
    min: number
    max: number
    factors: string[]
  }
  timeline?: {
    estimated: string
    factors: string[]
  }
  specialtyMatch: number
  locationMatch: number
  availabilityMatch: number
}

export interface VoiceCallRequest {
  recipientPhone: string
  agentType: 'customer_consultant' | 'contractor_recruiter'
  purpose: string
  context: Record<string, any>
  scheduledTime?: Date
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

class AIAgentService {
  private static instance: AIAgentService
  private elevenLabs: ElevenLabsService
  private locationService: AdvancedLocationService
  private agents: Map<string, AIAgent> = new Map()
  private activeSessions: Map<string, ConsultationSession> = new Map()

  private constructor() {
    this.elevenLabs = ElevenLabsService.getInstance()
    this.locationService = AdvancedLocationService.getInstance()
    this.initializeAgents()
  }

  static getInstance(): AIAgentService {
    if (!AIAgentService.instance) {
      AIAgentService.instance = new AIAgentService()
    }
    return AIAgentService.instance
  }

  private initializeAgents(): void {
    // Customer Consultation Agent - Sarah
    this.agents.set('sarah-consultant', {
      id: 'sarah-consultant',
      name: 'Sarah',
      type: 'customer_consultant',
      specialization: ['kitchen_remodel', 'bathroom_remodel', 'general_contracting', 'flooring'],
      voice: {
        elevenLabsVoiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella voice
        personality: 'professional, warm, knowledgeable',
        accent: 'American Midwest'
      },
      capabilities: [
        'project_consultation',
        'contractor_matching',
        'cost_estimation',
        'timeline_planning',
        'permit_guidance',
        'material_selection'
      ],
      status: 'active'
    })

    // Contractor Recruitment Agent - David
    this.agents.set('david-recruiter', {
      id: 'david-recruiter',
      name: 'David',
      type: 'contractor_recruiter',
      specialization: ['contractor_outreach', 'verification', 'onboarding'],
      voice: {
        elevenLabsVoiceId: 'pNInz6obpgDQGcFmaJgB', // Adam voice
        personality: 'confident, persuasive, business-focused',
        accent: 'American Standard'
      },
      capabilities: [
        'contractor_outreach',
        'lead_qualification',
        'platform_onboarding',
        'performance_tracking',
        'relationship_building'
      ],
      status: 'active'
    })

    // AI Project Matcher
    this.agents.set('ai-matcher', {
      id: 'ai-matcher',
      name: 'AI Matcher',
      type: 'project_matcher',
      specialization: ['matching_algorithm', 'compatibility_analysis'],
      capabilities: [
        'contractor_scoring',
        'project_analysis',
        'compatibility_matching',
        'recommendation_ranking'
      ],
      status: 'active'
    })
  }

  /**
   * Start a customer consultation session
   */
  async startCustomerConsultation(
    customerId: string,
    projectType: string,
    customerPhone?: string,
    preferredTime?: Date
  ): Promise<ConsultationSession> {
    const sessionId = `consultation_${Date.now()}_${customerId}`
    const agent = this.agents.get('sarah-consultant')!

    const session: ConsultationSession = {
      id: sessionId,
      customerId,
      agentId: agent.id,
      projectType,
      status: 'scheduled',
      startTime: preferredTime || new Date(),
      transcript: [],
      recommendations: []
    }

    this.activeSessions.set(sessionId, session)

    // Schedule voice call if phone provided
    if (customerPhone) {
      await this.scheduleVoiceCall({
        recipientPhone: customerPhone,
        agentType: 'customer_consultant',
        purpose: `${projectType} consultation`,
        context: { sessionId, customerId, projectType },
        scheduledTime: preferredTime,
        priority: 'medium'
      })
    }

    return session
  }

  /**
   * Conduct AI-powered contractor matching
   */
  async matchContractorsToProject(
    projectDetails: {
      type: string
      location: { lat: number; lng: number }
      budget?: { min: number; max: number }
      timeline?: string
      requirements: string[]
      preferences?: string[]
    },
    availableContractors: any[]
  ): Promise<ContractorRecommendation[]> {
    const recommendations: ContractorRecommendation[] = []

    for (const contractor of availableContractors) {
      const score = await this.calculateContractorScore(contractor, projectDetails)
      
      if (score.total >= 60) { // Minimum score threshold
        recommendations.push({
          contractorId: contractor.id,
          score: score.total,
          reasons: score.reasons,
          estimatedCost: await this.estimateProjectCost(contractor, projectDetails),
          timeline: await this.estimateTimeline(contractor, projectDetails),
          specialtyMatch: score.specialtyMatch,
          locationMatch: score.locationMatch,
          availabilityMatch: score.availabilityMatch
        })
      }
    }

    // Sort by score and return top matches
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }

  /**
   * Schedule AI voice call
   */
  async scheduleVoiceCall(request: VoiceCallRequest): Promise<string> {
    const callId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    try {
      // Get appropriate agent
      const agent = Array.from(this.agents.values()).find(a => a.type === request.agentType)
      if (!agent || !agent.voice) {
        throw new Error('Agent not available for voice calls')
      }

      // Generate personalized script based on context
      const script = await this.generateCallScript(request)

      // Schedule with ElevenLabs
      const audioUrl = await this.elevenLabs.generateSpeech(
        script,
        agent.voice.elevenLabsVoiceId
      )

      // Here you would integrate with Twilio or another service to make the actual call
      // For now, we'll simulate the scheduling
      console.log(`📞 Voice call scheduled:`, {
        callId,
        recipient: request.recipientPhone,
        agent: agent.name,
        purpose: request.purpose,
        scheduledTime: request.scheduledTime,
        audioUrl
      })

      // Store call details for tracking
      await this.trackVoiceCall(callId, request, script, audioUrl)

      return callId
    } catch (error) {
      console.error('Failed to schedule voice call:', error)
      throw error
    }
  }

  /**
   * Send SMS notification with AI-generated content
   */
  async sendAINotification(
    recipientPhone: string,
    type: 'project_match' | 'consultation_reminder' | 'contractor_opportunity' | 'follow_up',
    context: Record<string, any>
  ): Promise<boolean> {
    try {
      const message = await this.generateSMSMessage(type, context)
      
      // Here you would integrate with Twilio SMS
      console.log(`📱 SMS notification sent:`, {
        to: recipientPhone,
        type,
        message,
        context
      })

      return true
    } catch (error) {
      console.error('Failed to send SMS notification:', error)
      return false
    }
  }

  /**
   * Conduct contractor outreach
   */
  async conductContractorOutreach(
    contractorPhone: string,
    opportunity: {
      projectType: string
      location: string
      estimatedValue: number
      timeline: string
      customerRequirements: string[]
    }
  ): Promise<string> {
    const callId = await this.scheduleVoiceCall({
      recipientPhone: contractorPhone,
      agentType: 'contractor_recruiter',
      purpose: 'New project opportunity',
      context: { opportunity },
      priority: 'medium'
    })

    // Follow up with SMS
    await this.sendAINotification(
      contractorPhone,
      'contractor_opportunity',
      { opportunity, callId }
    )

    return callId
  }

  /**
   * Real-time quality assessment
   */
  async assessContractorQuality(contractorId: string): Promise<{
    overallScore: number
    categories: {
      workQuality: number
      communication: number
      timeliness: number
      pricing: number
      customerService: number
    }
    improvements: string[]
    strengths: string[]
  }> {
    // This would integrate with review data, project outcomes, etc.
    // For now, return mock data
    return {
      overallScore: 87,
      categories: {
        workQuality: 90,
        communication: 85,
        timeliness: 88,
        pricing: 82,
        customerService: 89
      },
      improvements: [
        'Respond to customer messages within 2 hours',
        'Provide more detailed project timelines',
        'Include material specifications in quotes'
      ],
      strengths: [
        'Exceptional craftsmanship quality',
        'Strong customer relationships',
        'Reliable project completion'
      ]
    }
  }

  // Private helper methods
  private async calculateContractorScore(
    contractor: any,
    projectDetails: any
  ): Promise<{
    total: number
    specialtyMatch: number
    locationMatch: number
    availabilityMatch: number
    reasons: string[]
  }> {
    const reasons: string[] = []
    let specialtyMatch = 0
    let locationMatch = 0
    let availabilityMatch = 0

    // Specialty matching (40% weight)
    const contractorSpecialties = Array.isArray(contractor.specialties) 
      ? contractor.specialties 
      : JSON.parse(contractor.specialties || '[]')
    
    const projectTypeMatch = contractorSpecialties.some((s: string) => 
      s.toLowerCase().includes(projectDetails.type.toLowerCase())
    )
    
    if (projectTypeMatch) {
      specialtyMatch = 90
      reasons.push(`Expert in ${projectDetails.type}`)
    } else {
      specialtyMatch = 30
    }

    // Location matching (30% weight)
    if (contractor.latitude && contractor.longitude) {
      const distance = this.locationService.calculateDistance(
        { lat: contractor.latitude, lng: contractor.longitude },
        projectDetails.location
      )
      
      if (distance <= 10) {
        locationMatch = 100
        reasons.push(`Located within ${distance.toFixed(1)} miles`)
      } else if (distance <= 25) {
        locationMatch = 80
        reasons.push(`Services your area (${distance.toFixed(1)} miles)`)
      } else if (distance <= 50) {
        locationMatch = 50
      } else {
        locationMatch = 20
      }
    }

    // Availability matching (20% weight)
    // This would check actual calendar availability
    availabilityMatch = 75 // Mock value

    // Rating boost (10% weight)
    const ratingBoost = (contractor.rating || 0) * 20

    const total = Math.round(
      (specialtyMatch * 0.4) + 
      (locationMatch * 0.3) + 
      (availabilityMatch * 0.2) + 
      (ratingBoost * 0.1)
    )

    return {
      total,
      specialtyMatch,
      locationMatch,
      availabilityMatch,
      reasons
    }
  }

  private async estimateProjectCost(contractor: any, projectDetails: any): Promise<{
    min: number
    max: number
    factors: string[]
  }> {
    // AI-powered cost estimation based on project type, contractor rates, etc.
    const baseRates = {
      'kitchen_remodel': { min: 15000, max: 45000 },
      'bathroom_remodel': { min: 8000, max: 25000 },
      'flooring': { min: 3000, max: 12000 },
      'general_contracting': { min: 5000, max: 50000 }
    }

    const projectType = projectDetails.type.toLowerCase().replace(' ', '_')
    const base = baseRates[projectType as keyof typeof baseRates] || { min: 5000, max: 20000 }
    
    // Adjust based on contractor's typical pricing
    const priceMultiplier = contractor.rating > 4.5 ? 1.2 : 1.0
    
    return {
      min: Math.round(base.min * priceMultiplier),
      max: Math.round(base.max * priceMultiplier),
      factors: [
        'Material costs',
        'Labor complexity',
        'Contractor expertise level',
        'Local market rates',
        'Project timeline'
      ]
    }
  }

  private async estimateTimeline(contractor: any, projectDetails: any): Promise<{
    estimated: string
    factors: string[]
  }> {
    const baseTimelines = {
      'kitchen_remodel': '4-8 weeks',
      'bathroom_remodel': '2-4 weeks',
      'flooring': '1-2 weeks',
      'general_contracting': '2-12 weeks'
    }

    const projectType = projectDetails.type.toLowerCase().replace(' ', '_')
    const estimated = baseTimelines[projectType as keyof typeof baseTimelines] || '2-6 weeks'

    return {
      estimated,
      factors: [
        'Permit approval time',
        'Material availability',
        'Contractor schedule',
        'Project complexity',
        'Weather conditions'
      ]
    }
  }

  private async generateCallScript(request: VoiceCallRequest): Promise<string> {
    const agent = Array.from(this.agents.values()).find(a => a.type === request.agentType)
    
    if (request.agentType === 'customer_consultant') {
      return `
        <speak>
          <prosody rate="medium" pitch="medium">
            Hi there! This is ${agent?.name} from REMODELY AI, your home remodeling specialist.
            
            <break time="0.5s"/>
            
            I'm calling about your ${request.context.projectType} project. I've found some 
            excellent contractors in your area who specialize in exactly what you're looking for.
            
            <break time="0.5s"/>
            
            I'd love to discuss your project requirements and show you how our AI matching 
            system can connect you with the perfect contractor for your needs.
            
            <break time="0.5s"/>
            
            Would you have a few minutes to chat about your project goals and budget?
            
            <break time="1s"/>
            
            Visit REMODELY dot AI to see your personalized contractor matches, 
            or I can text you the details right now.
            
            <break time="0.5s"/>
            
            Thank you for choosing REMODELY AI!
          </prosody>
        </speak>
      `
    } else {
      // Contractor recruitment script
      return `
        <speak>
          <prosody rate="medium" pitch="medium">
            Hi! This is ${agent?.name} from REMODELY AI, the leading home remodeling marketplace.
            
            <break time="0.5s"/>
            
            I'm reaching out because we have a ${request.context.opportunity?.projectType} 
            project in your service area that's perfect for your expertise.
            
            <break time="0.5s"/>
            
            The estimated project value is ${request.context.opportunity?.estimatedValue || 'substantial'}, 
            and the customer is ready to move forward quickly.
            
            <break time="0.5s"/>
            
            Our AI system identified you as an ideal match based on your specialization, 
            location, and excellent customer reviews.
            
            <break time="1s"/>
            
            I'll send you the project details via text right after this call. 
            You can review everything and submit your quote through our platform at REMODELY dot AI.
            
            <break time="0.5s"/>
            
            Thanks for being part of the REMODELY AI network!
          </prosody>
        </speak>
      `
    }
  }

  private async generateSMSMessage(
    type: 'project_match' | 'consultation_reminder' | 'contractor_opportunity' | 'follow_up',
    context: Record<string, any>
  ): Promise<string> {
    switch (type) {
      case 'project_match':
        return `🏠 Great news! We found ${context.matchCount || 3} verified contractors for your ${context.projectType}. View matches: remodely.ai/matches/${context.customerId}`
      
      case 'consultation_reminder':
        return `📞 Reminder: Your AI consultation with Sarah is scheduled for ${context.time}. Questions? Reply HELP. Cancel: Reply STOP`
      
      case 'contractor_opportunity':
        return `💼 New ${context.opportunity?.projectType} project available! Est. value: $${context.opportunity?.estimatedValue}. View details: remodely.ai/opportunity/${context.callId}`
      
      case 'follow_up':
        return `✅ Thanks for using REMODELY AI! How did your project go? Leave a review: remodely.ai/review/${context.projectId}`
      
      default:
        return 'Update from REMODELY AI - Visit remodely.ai for details'
    }
  }

  private async trackVoiceCall(
    callId: string,
    request: VoiceCallRequest,
    script: string,
    audioUrl: string
  ): Promise<void> {
    // This would store call tracking data in the database
    console.log('Voice call tracked:', {
      callId,
      timestamp: new Date(),
      recipient: request.recipientPhone,
      agentType: request.agentType,
      purpose: request.purpose,
      scriptLength: script.length,
      audioGenerated: !!audioUrl
    })
  }
}

export default AIAgentService
