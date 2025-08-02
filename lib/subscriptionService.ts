// Subscription and Payment System for REMODELY AI PRO
import Stripe from 'stripe'

export interface SubscriptionPlan {
    id: string
    name: string
    description: string
    type: 'monthly' | 'annual' | 'pay-per-use'
    price: number
    currency: string
    features: string[]
    limits: {
        projectsPerMonth?: number
        contractorConnectionsPerMonth?: number
        prioritySupport?: boolean
        advancedMatching?: boolean
        backgroundChecks?: boolean
    }
    popular?: boolean
    stripePriceId?: string
}

export interface PayPerUseItem {
    id: string
    name: string
    description: string
    price: number
    category: 'connection' | 'background_check' | 'priority_listing' | 'featured_placement'
}

export interface UserSubscription {
    id: string
    userId: string
    planId: string
    status: 'active' | 'cancelled' | 'past_due' | 'unpaid'
    currentPeriodStart: Date
    currentPeriodEnd: Date
    stripeSubscriptionId?: string
    usage: {
        projectsThisMonth: number
        connectionsThisMonth: number
    }
}

// Subscription Plans Configuration
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    // Homeowner Plans
    {
        id: 'homeowner-basic',
        name: 'Basic',
        description: 'Perfect for occasional home projects',
        type: 'pay-per-use',
        price: 0,
        currency: 'USD',
        features: [
            'Search and browse contractors',
            'View basic contractor profiles',
            'Read reviews and ratings',
            'Get basic project estimates'
        ],
        limits: {
            projectsPerMonth: 2,
            contractorConnectionsPerMonth: 5,
            prioritySupport: false,
            advancedMatching: false,
            backgroundChecks: false
        }
    },
    {
        id: 'homeowner-pro',
        name: 'Pro',
        description: 'Best for active home improvers',
        type: 'monthly',
        price: 29.99,
        currency: 'USD',
        features: [
            'Everything in Basic',
            'AI-powered smart matching',
            'Direct contractor messaging',
            'Project management tools',
            'Priority customer support',
            'Detailed background checks',
            'Price comparison tools'
        ],
        limits: {
            projectsPerMonth: 10,
            contractorConnectionsPerMonth: 25,
            prioritySupport: true,
            advancedMatching: true,
            backgroundChecks: true
        },
        popular: true,
        stripePriceId: 'price_homeowner_pro_monthly'
    },
    {
        id: 'homeowner-premium',
        name: 'Premium',
        description: 'For serious renovators and property managers',
        type: 'monthly',
        price: 59.99,
        currency: 'USD',
        features: [
            'Everything in Pro',
            'Unlimited projects and connections',
            'Dedicated account manager',
            'Advanced project analytics',
            'White-glove service',
            'Exclusive contractor network',
            'Custom matching algorithms'
        ],
        limits: {
            projectsPerMonth: -1, // Unlimited
            contractorConnectionsPerMonth: -1, // Unlimited
            prioritySupport: true,
            advancedMatching: true,
            backgroundChecks: true
        },
        stripePriceId: 'price_homeowner_premium_monthly'
    },

    // Contractor Plans
    {
        id: 'contractor-starter',
        name: 'Starter',
        description: 'Great for new contractors getting started',
        type: 'monthly',
        price: 49.99,
        currency: 'USD',
        features: [
            'Basic contractor profile',
            'Receive up to 10 leads/month',
            'Basic analytics',
            'Standard support',
            'Mobile app access'
        ],
        limits: {
            projectsPerMonth: 10,
            contractorConnectionsPerMonth: 10,
            prioritySupport: false,
            advancedMatching: false
        },
        stripePriceId: 'price_contractor_starter_monthly'
    },
    {
        id: 'contractor-professional',
        name: 'Professional',
        description: 'Perfect for established contractors',
        type: 'monthly',
        price: 99.99,
        currency: 'USD',
        features: [
            'Everything in Starter',
            'Featured profile placement',
            'Up to 50 leads/month',
            'Advanced analytics',
            'Priority support',
            'Custom portfolio showcase',
            'Lead management tools'
        ],
        limits: {
            projectsPerMonth: 50,
            contractorConnectionsPerMonth: 50,
            prioritySupport: true,
            advancedMatching: true
        },
        popular: true,
        stripePriceId: 'price_contractor_professional_monthly'
    },
    {
        id: 'contractor-enterprise',
        name: 'Enterprise',
        description: 'For large contracting businesses',
        type: 'monthly',
        price: 199.99,
        currency: 'USD',
        features: [
            'Everything in Professional',
            'Unlimited leads',
            'Multi-user accounts',
            'Custom branding',
            'API access',
            'Dedicated account manager',
            'White-label solutions'
        ],
        limits: {
            projectsPerMonth: -1, // Unlimited
            contractorConnectionsPerMonth: -1, // Unlimited
            prioritySupport: true,
            advancedMatching: true
        },
        stripePriceId: 'price_contractor_enterprise_monthly'
    }
]

// Pay-per-use items
export const PAY_PER_USE_ITEMS: PayPerUseItem[] = [
    {
        id: 'contractor-connection',
        name: 'Contractor Connection',
        description: 'Connect directly with a contractor',
        price: 4.99,
        category: 'connection'
    },
    {
        id: 'background-check',
        name: 'Background Check',
        description: 'Comprehensive contractor background verification',
        price: 9.99,
        category: 'background_check'
    },
    {
        id: 'priority-listing',
        name: 'Priority Listing',
        description: 'Feature your project at the top for 7 days',
        price: 14.99,
        category: 'priority_listing'
    },
    {
        id: 'featured-placement',
        name: 'Featured Placement',
        description: 'Premium contractor profile placement for 30 days',
        price: 29.99,
        category: 'featured_placement'
    }
]

export class SubscriptionService {
    private static instance: SubscriptionService
    private stripe: Stripe | null = null

    private constructor() {
        if (process.env.STRIPE_SECRET_KEY) {
            this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2023-10-16'
            })
        }
    }

    static getInstance(): SubscriptionService {
        if (!SubscriptionService.instance) {
            SubscriptionService.instance = new SubscriptionService()
        }
        return SubscriptionService.instance
    }

    /**
     * Get all available subscription plans
     */
    getPlans(userType?: 'homeowner' | 'contractor'): SubscriptionPlan[] {
        if (userType === 'homeowner') {
            return SUBSCRIPTION_PLANS.filter(plan => plan.id.startsWith('homeowner'))
        } else if (userType === 'contractor') {
            return SUBSCRIPTION_PLANS.filter(plan => plan.id.startsWith('contractor'))
        }
        return SUBSCRIPTION_PLANS
    }

    /**
     * Get a specific plan by ID
     */
    getPlan(planId: string): SubscriptionPlan | null {
        return SUBSCRIPTION_PLANS.find(plan => plan.id === planId) || null
    }

    /**
     * Create a subscription checkout session
     */
    async createCheckoutSession(
        planId: string,
        userId: string,
        successUrl: string,
        cancelUrl: string
    ): Promise<string | null> {
        if (!this.stripe) {
            throw new Error('Stripe not configured')
        }

        const plan = this.getPlan(planId)
        if (!plan || !plan.stripePriceId) {
            throw new Error('Invalid plan or missing Stripe price ID')
        }

        try {
            const session = await this.stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [
                    {
                        price: plan.stripePriceId,
                        quantity: 1,
                    },
                ],
                success_url: successUrl,
                cancel_url: cancelUrl,
                client_reference_id: userId,
                metadata: {
                    planId: planId,
                    userId: userId
                }
            })

            return session.url
        } catch (error) {
            console.error('Error creating checkout session:', error)
            throw error
        }
    }

    /**
     * Create a pay-per-use checkout session
     */
    async createPayPerUseSession(
        itemId: string,
        quantity: number,
        userId: string,
        successUrl: string,
        cancelUrl: string
    ): Promise<string | null> {
        if (!this.stripe) {
            throw new Error('Stripe not configured')
        }

        const item = PAY_PER_USE_ITEMS.find(i => i.id === itemId)
        if (!item) {
            throw new Error('Invalid pay-per-use item')
        }

        try {
            const session = await this.stripe.checkout.sessions.create({
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                description: item.description,
                            },
                            unit_amount: Math.round(item.price * 100), // Convert to cents
                        },
                        quantity: quantity,
                    },
                ],
                success_url: successUrl,
                cancel_url: cancelUrl,
                client_reference_id: userId,
                metadata: {
                    itemId: itemId,
                    userId: userId,
                    type: 'pay_per_use'
                }
            })

            return session.url
        } catch (error) {
            console.error('Error creating pay-per-use session:', error)
            throw error
        }
    }

    /**
     * Cancel a subscription
     */
    async cancelSubscription(stripeSubscriptionId: string): Promise<boolean> {
        if (!this.stripe) {
            throw new Error('Stripe not configured')
        }

        try {
            await this.stripe.subscriptions.update(stripeSubscriptionId, {
                cancel_at_period_end: true,
            })
            return true
        } catch (error) {
            console.error('Error cancelling subscription:', error)
            return false
        }
    }

    /**
     * Resume a cancelled subscription
     */
    async resumeSubscription(stripeSubscriptionId: string): Promise<boolean> {
        if (!this.stripe) {
            throw new Error('Stripe not configured')
        }

        try {
            await this.stripe.subscriptions.update(stripeSubscriptionId, {
                cancel_at_period_end: false,
            })
            return true
        } catch (error) {
            console.error('Error resuming subscription:', error)
            return false
        }
    }

    /**
     * Get subscription usage and limits
     */
    checkUsageLimits(subscription: UserSubscription, plan: SubscriptionPlan): {
        canCreateProject: boolean
        canConnectContractor: boolean
        remainingProjects: number
        remainingConnections: number
    } {
        const usage = subscription.usage
        const limits = plan.limits

        const remainingProjects = limits.projectsPerMonth === -1
            ? Infinity
            : Math.max(0, limits.projectsPerMonth! - usage.projectsThisMonth)

        const remainingConnections = limits.contractorConnectionsPerMonth === -1
            ? Infinity
            : Math.max(0, limits.contractorConnectionsPerMonth! - usage.connectionsThisMonth)

        return {
            canCreateProject: remainingProjects > 0,
            canConnectContractor: remainingConnections > 0,
            remainingProjects: remainingProjects === Infinity ? -1 : remainingProjects,
            remainingConnections: remainingConnections === Infinity ? -1 : remainingConnections
        }
    }

    /**
     * Process webhook from Stripe
     */
    async processWebhook(body: string, signature: string): Promise<void> {
        if (!this.stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
            throw new Error('Stripe not configured')
        }

        try {
            const event = this.stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            )

            switch (event.type) {
                case 'checkout.session.completed':
                    await this.handleCheckoutComplete(event.data.object as Stripe.Checkout.Session)
                    break
                case 'customer.subscription.updated':
                    await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
                    break
                case 'customer.subscription.deleted':
                    await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
                    break
                case 'invoice.payment_failed':
                    await this.handlePaymentFailed(event.data.object as Stripe.Invoice)
                    break
                default:
                    console.log(`Unhandled event type: ${event.type}`)
            }
        } catch (error) {
            console.error('Webhook processing error:', error)
            throw error
        }
    }

    private async handleCheckoutComplete(session: Stripe.Checkout.Session): Promise<void> {
        // Implementation would update database with new subscription
        console.log('Checkout completed:', session.id)
    }

    private async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
        // Implementation would update subscription status in database
        console.log('Subscription updated:', subscription.id)
    }

    private async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
        // Implementation would mark subscription as cancelled in database
        console.log('Subscription deleted:', subscription.id)
    }

    private async handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
        // Implementation would handle failed payments (notifications, retries, etc.)
        console.log('Payment failed for invoice:', invoice.id)
    }
}

// Funnel optimization for user conversion
export class ConversionFunnelService {
    private static instance: ConversionFunnelService

    private constructor() { }

    static getInstance(): ConversionFunnelService {
        if (!ConversionFunnelService.instance) {
            ConversionFunnelService.instance = new ConversionFunnelService()
        }
        return ConversionFunnelService.instance
    }

    /**
     * Get recommended plan based on user behavior and profile
     */
    getRecommendedPlan(userProfile: {
        userType: 'homeowner' | 'contractor'
        projectFrequency: 'occasional' | 'regular' | 'frequent'
        businessSize?: 'individual' | 'small' | 'medium' | 'large'
        estimatedMonthlyProjects?: number
    }): SubscriptionPlan {
        if (userProfile.userType === 'homeowner') {
            switch (userProfile.projectFrequency) {
                case 'occasional':
                    return this.getPlanById('homeowner-basic')!
                case 'regular':
                    return this.getPlanById('homeowner-pro')!
                case 'frequent':
                    return this.getPlanById('homeowner-premium')!
                default:
                    return this.getPlanById('homeowner-pro')!
            }
        } else {
            const monthlyProjects = userProfile.estimatedMonthlyProjects || 20

            if (monthlyProjects <= 10) {
                return this.getPlanById('contractor-starter')!
            } else if (monthlyProjects <= 50) {
                return this.getPlanById('contractor-professional')!
            } else {
                return this.getPlanById('contractor-enterprise')!
            }
        }
    }

    private getPlanById(id: string): SubscriptionPlan | null {
        return SUBSCRIPTION_PLANS.find(plan => plan.id === id) || null
    }

    /**
     * Generate onboarding flow based on user type
     */
    getOnboardingSteps(userType: 'homeowner' | 'contractor'): string[] {
        if (userType === 'homeowner') {
            return [
                'profile-setup',
                'location-setup',
                'project-preferences',
                'budget-range',
                'plan-selection',
                'payment-setup',
                'verification-complete'
            ]
        } else {
            return [
                'business-profile',
                'license-verification',
                'insurance-upload',
                'portfolio-setup',
                'service-areas',
                'pricing-setup',
                'plan-selection',
                'payment-setup',
                'vetting-process',
                'account-activation'
            ]
        }
    }

    /**
     * Calculate conversion incentives
     */
    getConversionIncentives(userProfile: any): {
        discount?: number
        freeTrialDays?: number
        bonusFeatures?: string[]
        urgencyMessage?: string
    } {
        const incentives: any = {}

        // First-time user discount
        if (!userProfile.hasSubscription) {
            incentives.discount = 20 // 20% off first month
            incentives.freeTrialDays = 14
        }

        // Urgency messaging
        if (userProfile.projectUrgency === 'high') {
            incentives.urgencyMessage = "Start connecting with contractors today - most projects get responses within 24 hours!"
        }

        // Bonus features for contractors
        if (userProfile.userType === 'contractor' && userProfile.isNewBusiness) {
            incentives.bonusFeatures = ['Free professional photos', 'Priority listing for 30 days']
        }

        return incentives
    }
}

// Export singleton instances
export const subscriptionService = SubscriptionService.getInstance()
export const conversionFunnelService = ConversionFunnelService.getInstance()
