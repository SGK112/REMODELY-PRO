// AI Tool Usage Tracking Service for Freemium Model
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AIToolUsage {
    id: string
    userId?: string // Optional - tracks anonymous users by session/IP
    sessionId?: string
    toolType: 'ai-chat' | 'ai-transform' | 'voice-consultation' | 'marketplace'
    usageCount: number
    lastUsedAt: Date
    ipAddress?: string
    userAgent?: string
}

export interface UsageLimits {
    'ai-chat': number
    'ai-transform': number
    'voice-consultation': number
    'marketplace': number
}

// Free tier limits (per day for anonymous users, per month for registered users)
export const FREE_TIER_LIMITS: UsageLimits = {
    'ai-chat': 10, // 10 chat messages per day
    'ai-transform': 3, // 3 image transformations per day
    'voice-consultation': 2, // 2 voice calls per day
    'marketplace': 50, // 50 contractor searches per day
}

export class AIToolUsageService {
    private static instance: AIToolUsageService

    private constructor() { }

    static getInstance(): AIToolUsageService {
        if (!AIToolUsageService.instance) {
            AIToolUsageService.instance = new AIToolUsageService()
        }
        return AIToolUsageService.instance
    }

    /**
     * Check if user can use a specific AI tool
     * @param toolType - The AI tool being accessed
     * @param userId - Optional user ID for registered users
     * @param sessionId - Session ID for anonymous users
     * @param ipAddress - IP address for rate limiting
     * @returns Usage status and remaining uses
     */
    async checkUsageLimit(
        toolType: keyof UsageLimits,
        userId?: string,
        sessionId?: string,
        ipAddress?: string
    ): Promise<{
        canUse: boolean
        remainingUses: number
        resetTime: Date
        requiresUpgrade: boolean
        upgradeMessage?: string
    }> {
        const now = new Date()
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)

        try {
            // For registered users, check subscription status first
            if (userId) {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        // Assuming subscription relationship exists
                        // subscription: true
                    }
                })

                // If user has an active subscription, allow unlimited usage
                // if (user?.subscription?.status === 'active') {
                //   return {
                //     canUse: true,
                //     remainingUses: -1, // Unlimited
                //     resetTime: endOfDay,
                //     requiresUpgrade: false
                //   }
                // }
            }

            // Check usage for anonymous or free tier users
            const identifier = userId || sessionId || ipAddress || 'unknown'

            // Get usage count for today
            const usageKey = `ai_usage:${toolType}:${identifier}:${startOfDay.toISOString().split('T')[0]}`

            // In a real implementation, you'd use Redis or database
            // For now, we'll simulate with in-memory storage
            const todayUsage = await this.getTodayUsage(toolType, identifier, startOfDay)
            const limit = FREE_TIER_LIMITS[toolType]
            const remainingUses = Math.max(0, limit - todayUsage)

            const canUse = remainingUses > 0
            const requiresUpgrade = !canUse

            let upgradeMessage: string | undefined
            if (requiresUpgrade) {
                upgradeMessage = this.getUpgradeMessage(toolType, limit)
            }

            return {
                canUse,
                remainingUses,
                resetTime: endOfDay,
                requiresUpgrade,
                upgradeMessage
            }

        } catch (error) {
            console.error('Error checking usage limit:', error)
            // In case of error, allow usage but log the issue
            return {
                canUse: true,
                remainingUses: FREE_TIER_LIMITS[toolType],
                resetTime: endOfDay,
                requiresUpgrade: false
            }
        }
    }

    /**
     * Record usage of an AI tool
     */
    async recordUsage(
        toolType: keyof UsageLimits,
        userId?: string,
        sessionId?: string,
        ipAddress?: string,
        userAgent?: string
    ): Promise<boolean> {
        try {
            const identifier = userId || sessionId || ipAddress || 'unknown'
            const now = new Date()

            // In a real implementation, store this in Redis or database
            await this.incrementUsage(toolType, identifier, now)

            // Also log to database for analytics
            // await prisma.aiToolUsage.create({
            //   data: {
            //     toolType,
            //     userId,
            //     sessionId,
            //     ipAddress,
            //     userAgent,
            //     usedAt: now
            //   }
            // })

            return true
        } catch (error) {
            console.error('Error recording usage:', error)
            return false
        }
    }

    /**
     * Get usage statistics for analytics
     */
    async getUsageStats(userId?: string): Promise<{
        dailyUsage: Record<keyof UsageLimits, number>
        monthlyUsage: Record<keyof UsageLimits, number>
        lastUsed: Record<keyof UsageLimits, Date | null>
    }> {
        // Implementation would query database for real stats
        // For now, return mock data
        const mockStats = {
            dailyUsage: {
                'ai-chat': 5,
                'ai-transform': 1,
                'voice-consultation': 0,
                'marketplace': 12
            } as Record<keyof UsageLimits, number>,
            monthlyUsage: {
                'ai-chat': 45,
                'ai-transform': 8,
                'voice-consultation': 3,
                'marketplace': 156
            } as Record<keyof UsageLimits, number>,
            lastUsed: {
                'ai-chat': new Date(),
                'ai-transform': new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                'voice-consultation': null,
                'marketplace': new Date(Date.now() - 30 * 60 * 1000) // 30 min ago
            } as Record<keyof UsageLimits, Date | null>
        }

        return mockStats
    }

    /**
     * Get upgrade recommendations based on usage patterns
     */
    getUpgradeRecommendation(userId?: string): {
        shouldUpgrade: boolean
        recommendedPlan: string
        reasons: string[]
        potentialSavings: number
    } {
        // This would analyze actual usage patterns
        return {
            shouldUpgrade: true,
            recommendedPlan: 'homeowner-pro',
            reasons: [
                'You\'ve hit the daily limit 3 times this week',
                'Pro plan includes unlimited AI tool usage',
                'Get priority support and advanced features'
            ],
            potentialSavings: 0
        }
    }

    // Helper methods for storage (would be Redis/Database in production)
    private async getTodayUsage(
        toolType: keyof UsageLimits,
        identifier: string,
        startOfDay: Date
    ): Promise<number> {
        // Mock implementation - in production, query Redis or database
        const key = `usage:${toolType}:${identifier}:${startOfDay.toISOString().split('T')[0]}`

        // Simulate some usage for demo purposes
        const mockUsage = {
            'ai-chat': Math.floor(Math.random() * 8),
            'ai-transform': Math.floor(Math.random() * 2),
            'voice-consultation': Math.floor(Math.random() * 1),
            'marketplace': Math.floor(Math.random() * 20)
        }

        return mockUsage[toolType] || 0
    }

    private async incrementUsage(
        toolType: keyof UsageLimits,
        identifier: string,
        timestamp: Date
    ): Promise<void> {
        // Mock implementation - in production, increment in Redis or database
        const key = `usage:${toolType}:${identifier}:${timestamp.toISOString().split('T')[0]}`
        console.log(`[AI Usage] Incremented ${key}`)
    }

    private getUpgradeMessage(toolType: keyof UsageLimits, limit: number): string {
        const messages = {
            'ai-chat': `You've reached your daily limit of ${limit} AI chat messages. Upgrade to Pro for unlimited conversations!`,
            'ai-transform': `You've used all ${limit} daily image transformations. Pro plan includes unlimited AI transformations!`,
            'voice-consultation': `Daily limit of ${limit} voice consultations reached. Get unlimited calls with Pro!`,
            'marketplace': `You've hit the ${limit} daily contractor search limit. Upgrade for unlimited browsing!`
        }

        return messages[toolType] || 'Upgrade to Pro for unlimited access to all AI tools!'
    }
}

// Export singleton instance
export const aiToolUsageService = AIToolUsageService.getInstance()

// Middleware function for Next.js API routes
export function withUsageTracking(toolType: keyof UsageLimits) {
    return async (req: any, res: any, next: () => void) => {
        const userId = req.user?.id
        const sessionId = req.sessionID || req.headers['x-session-id']
        const ipAddress = req.ip || req.connection.remoteAddress
        const userAgent = req.headers['user-agent']

        // Check usage limit
        const usageCheck = await aiToolUsageService.checkUsageLimit(
            toolType,
            userId,
            sessionId,
            ipAddress
        )

        if (!usageCheck.canUse) {
            return res.status(429).json({
                error: 'Usage limit exceeded',
                message: usageCheck.upgradeMessage,
                resetTime: usageCheck.resetTime,
                upgradeRequired: true,
                toolType
            })
        }

        // Record the usage
        await aiToolUsageService.recordUsage(
            toolType,
            userId,
            sessionId,
            ipAddress,
            userAgent
        )

        // Add usage info to response headers
        res.setHeader('X-Usage-Remaining', usageCheck.remainingUses.toString())
        res.setHeader('X-Usage-Reset-Time', usageCheck.resetTime.toISOString())

        next()
    }
}
