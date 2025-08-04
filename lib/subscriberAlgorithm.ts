/**
 * Advanced Subscriber Growth Algorithm
 * Designed to maximize user engagement and conversion rates
 */

export interface UserBehavior {
  visitCount: number
  timeOnSite: number
  pagesViewed: string[]
  actionsTaken: string[]
  deviceType: 'mobile' | 'desktop' | 'tablet'
  referralSource: string
  location: {
    city: string
    state: string
    country: string
  }
  timestamp: Date
}

export interface SubscriberScore {
  score: number
  factors: {
    engagement: number
    intent: number
    timing: number
    demographic: number
  }
  recommendation: 'high_priority' | 'medium_priority' | 'low_priority' | 'nurture'
  triggers: string[]
}

export interface ConversionStrategy {
  type: 'popup' | 'banner' | 'email' | 'retargeting' | 'voice_call' | 'sms'
  timing: number // seconds delay
  content: string
  incentive?: {
    type: 'discount' | 'free_consultation' | 'premium_access' | 'priority_matching'
    value: string
  }
  urgency: boolean
  personalization: Record<string, string>
}

export class SubscriberGrowthAlgorithm {
  private static readonly ENGAGEMENT_WEIGHTS = {
    timeOnSite: 0.3,
    pagesViewed: 0.25,
    actionsTaken: 0.35,
    returnVisitor: 0.1
  }

  private static readonly INTENT_SIGNALS = {
    'quote-request': 40,
    'contractor-search': 35,
    'pricing-page': 30,
    'contact-form': 45,
    'phone-click': 50,
    'service-category': 25,
    'project-gallery': 20,
    'testimonials': 15,
    'about-us': 10,
    'blog': 5
  }

  private static readonly HIGH_INTENT_PAGES = [
    '/quote/request',
    '/contractors',
    '/pricing',
    '/contact',
    '/for-commercial',
    '/for-designers'
  ]

  /**
   * Calculate subscriber conversion score for a user based on behavior
   */
  static calculateSubscriberScore(behavior: UserBehavior): SubscriberScore {
    const engagement = this.calculateEngagementScore(behavior)
    const intent = this.calculateIntentScore(behavior)
    const timing = this.calculateTimingScore(behavior)
    const demographic = this.calculateDemographicScore(behavior)

    const totalScore = (
      engagement * 0.4 +
      intent * 0.35 +
      timing * 0.15 +
      demographic * 0.1
    )

    const factors = { engagement, intent, timing, demographic }
    const recommendation = this.getRecommendation(totalScore, factors)
    const triggers = this.identifyTriggers(behavior, factors)

    return {
      score: Math.round(totalScore * 100) / 100,
      factors,
      recommendation,
      triggers
    }
  }

  /**
   * Generate personalized conversion strategy
   */
  static generateConversionStrategy(
    behavior: UserBehavior, 
    score: SubscriberScore
  ): ConversionStrategy[] {
    const strategies: ConversionStrategy[] = []

    // High-priority users get immediate, personalized engagement
    if (score.recommendation === 'high_priority') {
      strategies.push(this.createHighPriorityStrategy(behavior, score))
    }

    // Medium-priority users get timed engagement
    if (score.recommendation === 'medium_priority') {
      strategies.push(this.createMediumPriorityStrategy(behavior, score))
    }

    // Low-priority users get nurture campaigns
    if (score.recommendation === 'low_priority' || score.recommendation === 'nurture') {
      strategies.push(this.createNurtureStrategy(behavior, score))
    }

    // Add exit-intent strategy for all users
    strategies.push(this.createExitIntentStrategy(behavior, score))

    return strategies
  }

  private static calculateEngagementScore(behavior: UserBehavior): number {
    const timeScore = Math.min(behavior.timeOnSite / 300, 1) // Max at 5 minutes
    const pageScore = Math.min(behavior.pagesViewed.length / 10, 1) // Max at 10 pages
    const actionScore = Math.min(behavior.actionsTaken.length / 5, 1) // Max at 5 actions
    const returnBonus = behavior.visitCount > 1 ? 0.2 : 0

    return (
      timeScore * this.ENGAGEMENT_WEIGHTS.timeOnSite +
      pageScore * this.ENGAGEMENT_WEIGHTS.pagesViewed +
      actionScore * this.ENGAGEMENT_WEIGHTS.actionsTaken +
      returnBonus * this.ENGAGEMENT_WEIGHTS.returnVisitor
    )
  }

  private static calculateIntentScore(behavior: UserBehavior): number {
    let intentScore = 0
    let maxPossibleScore = 0

    // Analyze pages viewed for intent signals
    behavior.pagesViewed.forEach(page => {
      if (this.HIGH_INTENT_PAGES.some(highIntentPage => page.includes(highIntentPage))) {
        intentScore += 0.3
      }
    })

    // Analyze actions taken
    behavior.actionsTaken.forEach(action => {
      const signal = this.INTENT_SIGNALS[action.toLowerCase() as keyof typeof this.INTENT_SIGNALS]
      if (signal) {
        intentScore += signal / 100
        maxPossibleScore += signal / 100
      }
    })

    return Math.min(intentScore, 1)
  }

  private static calculateTimingScore(behavior: UserBehavior): number {
    const now = new Date()
    const visitTime = behavior.timestamp
    const hourOfDay = visitTime.getHours()
    const dayOfWeek = visitTime.getDay()

    // Business hours (9 AM - 6 PM) get higher scores
    const businessHoursBonus = (hourOfDay >= 9 && hourOfDay <= 18) ? 0.3 : 0

    // Weekdays get higher scores than weekends
    const weekdayBonus = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 0.2 : 0

    // Recent activity gets higher scores
    const timeSinceVisit = now.getTime() - visitTime.getTime()
    const recentActivityBonus = timeSinceVisit < 3600000 ? 0.5 : 0 // Within 1 hour

    return Math.min(businessHoursBonus + weekdayBonus + recentActivityBonus, 1)
  }

  private static calculateDemographicScore(behavior: UserBehavior): number {
    let score = 0.5 // Base score

    // Target locations get bonus
    const targetStates = ['Arizona', 'California', 'Nevada', 'Texas', 'Florida']
    if (targetStates.includes(behavior.location.state)) {
      score += 0.3
    }

    // Desktop users might be more serious (business users)
    if (behavior.deviceType === 'desktop') {
      score += 0.2
    }

    // Organic traffic gets bonus
    if (behavior.referralSource === 'organic' || behavior.referralSource === 'direct') {
      score += 0.2
    }

    return Math.min(score, 1)
  }

  private static getRecommendation(
    totalScore: number, 
    factors: SubscriberScore['factors']
  ): SubscriberScore['recommendation'] {
    if (totalScore >= 0.8 || factors.intent >= 0.7) {
      return 'high_priority'
    } else if (totalScore >= 0.6 || factors.engagement >= 0.6) {
      return 'medium_priority'
    } else if (totalScore >= 0.4) {
      return 'low_priority'
    } else {
      return 'nurture'
    }
  }

  private static identifyTriggers(
    behavior: UserBehavior, 
    factors: SubscriberScore['factors']
  ): string[] {
    const triggers: string[] = []

    if (factors.intent >= 0.7) triggers.push('high_purchase_intent')
    if (factors.engagement >= 0.8) triggers.push('highly_engaged')
    if (behavior.visitCount >= 3) triggers.push('repeat_visitor')
    if (behavior.timeOnSite >= 300) triggers.push('extended_session')
    if (behavior.actionsTaken.includes('phone-click')) triggers.push('phone_intent')
    if (behavior.actionsTaken.includes('contact-form')) triggers.push('contact_intent')
    if (behavior.pagesViewed.includes('/pricing')) triggers.push('price_conscious')
    if (behavior.deviceType === 'mobile') triggers.push('mobile_user')

    return triggers
  }

  private static createHighPriorityStrategy(
    behavior: UserBehavior, 
    score: SubscriberScore
  ): ConversionStrategy {
    const personalization: Record<string, string> = {}
    let incentive

    // Personalize based on behavior
    if (behavior.actionsTaken.includes('quote-request')) {
      personalization.message = "complete your quote request"
      incentive = {
        type: 'free_consultation' as const,
        value: 'Free 30-minute consultation with a renovation expert'
      }
    } else if (behavior.pagesViewed.some(page => page.includes('/contractors'))) {
      personalization.message = "connect with verified contractors"
      incentive = {
        type: 'priority_matching' as const,
        value: 'Priority access to top-rated contractors in your area'
      }
    } else {
      personalization.message = "get started with your renovation project"
      incentive = {
        type: 'discount' as const,
        value: '20% off your first project consultation'
      }
    }

    return {
      type: 'popup',
      timing: 45, // 45 seconds
      content: `Ready to ${personalization.message}? Join thousands of satisfied customers who found their perfect contractor through Remodely.AI`,
      incentive,
      urgency: true,
      personalization
    }
  }

  private static createMediumPriorityStrategy(
    behavior: UserBehavior, 
    score: SubscriberScore
  ): ConversionStrategy {
    return {
      type: 'banner',
      timing: 120, // 2 minutes
      content: "Don't miss out on connecting with Arizona's top contractors. Subscribe for exclusive access to verified professionals.",
      incentive: {
        type: 'premium_access',
        value: 'Early access to new contractor profiles and special offers'
      },
      urgency: false,
      personalization: {
        location: behavior.location.city
      }
    }
  }

  private static createNurtureStrategy(
    behavior: UserBehavior, 
    score: SubscriberScore
  ): ConversionStrategy {
    return {
      type: 'email',
      timing: 300, // 5 minutes
      content: "Thinking about a renovation project? Get helpful tips and inspiration delivered to your inbox.",
      incentive: {
        type: 'free_consultation',
        value: 'Free renovation planning guide and project timeline template'
      },
      urgency: false,
      personalization: {
        interest: behavior.pagesViewed.length > 0 ? 'renovation' : 'home_improvement'
      }
    }
  }

  private static createExitIntentStrategy(
    behavior: UserBehavior, 
    score: SubscriberScore
  ): ConversionStrategy {
    return {
      type: 'popup',
      timing: 0, // Triggered on exit intent
      content: "Wait! Before you go, get instant access to our network of verified contractors.",
      incentive: {
        type: 'free_consultation',
        value: 'Free project consultation + contractor matching service'
      },
      urgency: true,
      personalization: {
        trigger: 'exit_intent'
      }
    }
  }

  /**
   * A/B test different strategies to optimize conversion rates
   */
  static generateABTestVariants(
    baseStrategy: ConversionStrategy
  ): ConversionStrategy[] {
    const variants: ConversionStrategy[] = [baseStrategy]

    // Variant A: Different timing
    variants.push({
      ...baseStrategy,
      timing: baseStrategy.timing * 0.5 // Earlier timing
    })

    // Variant B: Different incentive
    if (baseStrategy.incentive?.type === 'discount') {
      variants.push({
        ...baseStrategy,
        incentive: {
          type: 'free_consultation',
          value: 'Free consultation with renovation expert'
        }
      })
    }

    // Variant C: Different urgency
    variants.push({
      ...baseStrategy,
      urgency: !baseStrategy.urgency
    })

    return variants
  }

  /**
   * Track and analyze conversion performance
   */
  static analyzeConversionPerformance(conversions: Array<{
    strategy: ConversionStrategy
    result: 'converted' | 'dismissed' | 'ignored'
    userBehavior: UserBehavior
    timestamp: Date
  }>) {
    const performance = {
      totalConversions: conversions.filter(c => c.result === 'converted').length,
      totalAttempts: conversions.length,
      conversionRate: 0,
      byStrategy: {} as Record<string, {
        attempts: number
        conversions: number
        rate: number
      }>,
      byTiming: {} as Record<number, {
        attempts: number
        conversions: number
        rate: number
      }>
    }

    performance.conversionRate = performance.totalConversions / performance.totalAttempts

    // Analyze by strategy type
    conversions.forEach(conversion => {
      const strategyKey = `${conversion.strategy.type}_${conversion.strategy.incentive?.type || 'none'}`
      
      if (!performance.byStrategy[strategyKey]) {
        performance.byStrategy[strategyKey] = { attempts: 0, conversions: 0, rate: 0 }
      }

      performance.byStrategy[strategyKey].attempts++
      if (conversion.result === 'converted') {
        performance.byStrategy[strategyKey].conversions++
      }
      performance.byStrategy[strategyKey].rate = 
        performance.byStrategy[strategyKey].conversions / performance.byStrategy[strategyKey].attempts
    })

    return performance
  }
}

export default SubscriberGrowthAlgorithm
