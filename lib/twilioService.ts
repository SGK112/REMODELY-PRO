// Twilio SMS and Phone Verification Service for REMODELY AI PRO
import { Twilio } from 'twilio'

export interface PhoneVerificationResult {
    success: boolean
    verificationSid?: string
    message: string
    error?: string
}

export interface SMSNotification {
    to: string
    message: string
    type: 'verification' | 'notification' | 'marketing' | 'urgent'
    scheduledFor?: Date
}

export interface VerificationStatus {
    isValid: boolean
    status: 'pending' | 'approved' | 'denied' | 'expired'
    attemptCount: number
    message: string
}

export class TwilioService {
    private static instance: TwilioService
    private client: Twilio | null = null
    private serviceSid: string = ''

    private constructor() {
        this.initializeTwilio()
    }

    static getInstance(): TwilioService {
        if (!TwilioService.instance) {
            TwilioService.instance = new TwilioService()
        }
        return TwilioService.instance
    }

    private initializeTwilio(): void {
        const accountSid = process.env.TWILIO_ACCOUNT_SID
        const authToken = process.env.TWILIO_AUTH_TOKEN

        if (accountSid && authToken) {
            this.client = new Twilio(accountSid, authToken)

            // Create verification service if it doesn't exist
            this.createVerificationService()
        } else {
            console.warn('Twilio credentials not found in environment variables')
        }
    }

    private async createVerificationService(): Promise<void> {
        if (!this.client) return

        try {
            // Try to find existing service first
            const services = await this.client.verify.v2.services.list({
                limit: 10
            })

            const existingService = services.find(service =>
                service.friendlyName === 'REMODELY AI PRO Verification'
            )

            if (existingService) {
                this.serviceSid = existingService.sid
                console.log('✅ Using existing Twilio verification service:', this.serviceSid)
            } else {
                // Create new service
                const service = await this.client.verify.v2.services.create({
                    friendlyName: 'REMODELY AI PRO Verification',
                    codeLength: 6,
                    lookupEnabled: true,
                    psd2Enabled: false,
                    skipSmsToLandlines: true
                })

                this.serviceSid = service.sid
                console.log('✅ Created new Twilio verification service:', this.serviceSid)
            }
        } catch (error) {
            console.error('Failed to setup Twilio verification service:', error)
        }
    }

    /**
     * Send SMS verification code
     */
    async sendVerificationCode(phoneNumber: string, channel: 'sms' | 'call' = 'sms'): Promise<PhoneVerificationResult> {
        if (!this.client || !this.serviceSid) {
            return {
                success: false,
                message: 'SMS service not available',
                error: 'Twilio not configured'
            }
        }

        try {
            // Format phone number
            const formattedPhone = this.formatPhoneNumber(phoneNumber)

            const verification = await this.client.verify.v2
                .services(this.serviceSid)
                .verifications
                .create({
                    to: formattedPhone,
                    channel: channel
                })

            console.log(`📱 Verification code sent to ${formattedPhone} via ${channel}`)

            return {
                success: true,
                verificationSid: verification.sid,
                message: `Verification code sent via ${channel}`
            }
        } catch (error: any) {
            console.error('Failed to send verification code:', error)

            return {
                success: false,
                message: 'Failed to send verification code',
                error: error.message || 'Unknown error'
            }
        }
    }

    /**
     * Verify SMS code
     */
    async verifyCode(phoneNumber: string, code: string): Promise<VerificationStatus> {
        if (!this.client || !this.serviceSid) {
            return {
                isValid: false,
                status: 'denied',
                attemptCount: 0,
                message: 'Verification service not available'
            }
        }

        try {
            const formattedPhone = this.formatPhoneNumber(phoneNumber)

            const verificationCheck = await this.client.verify.v2
                .services(this.serviceSid)
                .verificationChecks
                .create({
                    to: formattedPhone,
                    code: code
                })

            const isValid = verificationCheck.status === 'approved'

            console.log(`✅ Verification ${isValid ? 'successful' : 'failed'} for ${formattedPhone}`)

            return {
                isValid,
                status: verificationCheck.status as any,
                attemptCount: 1, // Twilio doesn't provide attempt count in response
                message: isValid ? 'Phone number verified successfully' : 'Invalid verification code'
            }
        } catch (error: any) {
            console.error('Failed to verify code:', error)

            return {
                isValid: false,
                status: 'denied',
                attemptCount: 0,
                message: error.message || 'Verification failed'
            }
        }
    }

    /**
     * Send SMS notification
     */
    async sendSMS(notification: SMSNotification): Promise<boolean> {
        if (!this.client) {
            console.error('Twilio client not initialized')
            return false
        }

        const fromNumber = process.env.TWILIO_PHONE_NUMBER
        if (!fromNumber) {
            console.error('Twilio phone number not configured')
            return false
        }

        try {
            const formattedTo = this.formatPhoneNumber(notification.to)

            const messageOptions: any = {
                body: notification.message,
                from: fromNumber,
                to: formattedTo
            }

            // Schedule message if specified
            if (notification.scheduledFor) {
                messageOptions.sendAt = notification.scheduledFor
            }

            const message = await this.client.messages.create(messageOptions)

            console.log(`📤 SMS sent to ${formattedTo}: ${message.sid}`)
            return true
        } catch (error) {
            console.error('Failed to send SMS:', error)
            return false
        }
    }

    /**
     * Send bulk SMS notifications
     */
    async sendBulkSMS(notifications: SMSNotification[]): Promise<{ sent: number, failed: number }> {
        let sent = 0
        let failed = 0

        const sendPromises = notifications.map(async (notification) => {
            const success = await this.sendSMS(notification)
            if (success) {
                sent++
            } else {
                failed++
            }
        })

        await Promise.all(sendPromises)

        console.log(`📊 Bulk SMS complete: ${sent} sent, ${failed} failed`)
        return { sent, failed }
    }

    /**
     * Format phone number for Twilio
     */
    private formatPhoneNumber(phoneNumber: string): string {
        // Remove all non-digit characters
        const digits = phoneNumber.replace(/\D/g, '')

        // Add country code if missing (assuming US)
        if (digits.length === 10) {
            return `+1${digits}`
        } else if (digits.length === 11 && digits.startsWith('1')) {
            return `+${digits}`
        }

        return phoneNumber // Return as-is if already formatted
    }

    /**
     * Validate phone number format
     */
    isValidPhoneNumber(phoneNumber: string): boolean {
        const phoneRegex = /^(\+1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/
        const formatted = this.formatPhoneNumber(phoneNumber)
        return phoneRegex.test(formatted.replace('+', ''))
    }

    /**
     * Get SMS delivery status
     */
    async getMessageStatus(messageSid: string): Promise<string | null> {
        if (!this.client) return null

        try {
            const message = await this.client.messages(messageSid).fetch()
            return message.status
        } catch (error) {
            console.error('Failed to get message status:', error)
            return null
        }
    }
}

// Notification Templates
export class NotificationTemplates {
    static getVerificationMessage(code: string): string {
        return `Your REMODELY AI PRO verification code is: ${code}. Valid for 10 minutes. Don't share this code with anyone.`
    }

    static getWelcomeMessage(userName: string): string {
        return `Welcome to REMODELY AI PRO, ${userName}! 🏠 Your account is now active. Start connecting with top contractors in your area.`
    }

    static getContractorMatchNotification(contractorCount: number, projectType: string): string {
        return `Great news! We found ${contractorCount} qualified contractors for your ${projectType} project. View matches in your dashboard.`
    }

    static getQuoteReceivedNotification(contractorName: string, amount: string): string {
        return `📋 New quote received from ${contractorName}: ${amount}. Review details and compare quotes in your REMODELY dashboard.`
    }

    static getProjectUpdateNotification(projectName: string, status: string): string {
        return `🔄 Project Update: "${projectName}" status changed to ${status}. Check your dashboard for details.`
    }

    static getPaymentReminderNotification(amount: string, dueDate: string): string {
        return `💳 Payment Reminder: Your subscription payment of ${amount} is due on ${dueDate}. Update your payment method to avoid service interruption.`
    }

    static getContractorLeadNotification(projectType: string, location: string): string {
        return `🚨 New Lead Alert! ${projectType} project in ${location}. Respond quickly to secure this opportunity. View details in your contractor dashboard.`
    }

    static getReviewRequestNotification(projectName: string): string {
        return `⭐ How was your experience? Please rate your recent ${projectName} project. Your feedback helps other homeowners make better decisions.`
    }
}

// Authentication Service Integration
export class AuthenticationService {
    private static instance: AuthenticationService
    private twilioService: TwilioService

    private constructor() {
        this.twilioService = TwilioService.getInstance()
    }

    static getInstance(): AuthenticationService {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = new AuthenticationService()
        }
        return AuthenticationService.instance
    }

    /**
     * Complete phone verification flow
     */
    async initiatePhoneVerification(phoneNumber: string): Promise<PhoneVerificationResult> {
        // Validate phone number format
        if (!this.twilioService.isValidPhoneNumber(phoneNumber)) {
            return {
                success: false,
                message: 'Invalid phone number format',
                error: 'Please enter a valid US phone number'
            }
        }

        // Send verification code
        return await this.twilioService.sendVerificationCode(phoneNumber)
    }

    /**
     * Verify phone and complete user authentication
     */
    async completePhoneVerification(
        phoneNumber: string,
        code: string,
        userId?: string
    ): Promise<VerificationStatus & { authenticated?: boolean }> {
        const verification = await this.twilioService.verifyCode(phoneNumber, code)

        if (verification.isValid && userId) {
            // Update user record with verified phone
            await this.updateUserPhoneVerification(userId, phoneNumber)

            // Send welcome SMS
            await this.sendWelcomeSMS(phoneNumber, userId)

            return {
                ...verification,
                authenticated: true
            }
        }

        return verification
    }

    /**
     * Send authentication-related notifications
     */
    async sendAuthNotification(
        phoneNumber: string,
        type: 'welcome' | 'login' | 'password_reset' | 'account_locked',
        userData?: any
    ): Promise<boolean> {
        let message = ''

        switch (type) {
            case 'welcome':
                message = NotificationTemplates.getWelcomeMessage(userData?.name || 'User')
                break
            case 'login':
                message = `🔐 Login detected on your REMODELY AI PRO account from a new device. If this wasn't you, please secure your account immediately.`
                break
            case 'password_reset':
                message = `🔑 Password reset requested for your REMODELY AI PRO account. If you didn't request this, please contact support.`
                break
            case 'account_locked':
                message = `🚨 Your REMODELY AI PRO account has been temporarily locked due to suspicious activity. Contact support for assistance.`
                break
        }

        return await this.twilioService.sendSMS({
            to: phoneNumber,
            message,
            type: 'notification'
        })
    }

    private async updateUserPhoneVerification(userId: string, phoneNumber: string): Promise<void> {
        // This would update the user record in the database
        console.log(`✅ Updated phone verification for user ${userId}: ${phoneNumber}`)
    }

    private async sendWelcomeSMS(phoneNumber: string, userId: string): Promise<void> {
        // Get user name from database
        const userName = 'User' // This would come from database

        await this.twilioService.sendSMS({
            to: phoneNumber,
            message: NotificationTemplates.getWelcomeMessage(userName),
            type: 'notification'
        })
    }
}

// Export singleton instances
export const twilioService = TwilioService.getInstance()
export const authenticationService = AuthenticationService.getInstance()
