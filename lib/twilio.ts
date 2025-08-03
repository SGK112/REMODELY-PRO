import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID || 'VAf75d22e82e4abf9579fe1455c73835f9'

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.warn('Twilio credentials not found in environment variables')
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export interface NotificationOptions {
  to: string
  message: string
  type: 'quote' | 'booking' | 'reminder' | 'welcome'
}

export class TwilioService {
  static async sendSMS(options: NotificationOptions): Promise<boolean> {
    if (!client || !twilioPhoneNumber) {
      console.error('Twilio client not configured')
      return false
    }

    try {
      const message = await client.messages.create({
        body: options.message,
        from: twilioPhoneNumber,
        to: options.to,
      })

      console.log('SMS sent successfully:', message.sid)
      return true
    } catch (error) {
      console.error('Failed to send SMS:', error)
      throw error
    }
  }

  static async makeVoiceCall(options: NotificationOptions): Promise<boolean> {
    if (!client || !twilioPhoneNumber) {
      console.error('Twilio client not configured')
      return false
    }

    try {
      const call = await client.calls.create({
        twiml: `<Response><Say voice="alice">${options.message}</Say></Response>`,
        from: twilioPhoneNumber,
        to: options.to,
      })

      console.log('Voice call initiated successfully:', call.sid)
      return true
    } catch (error) {
      console.error('Failed to make voice call:', error)
      throw error
    }
  }

  // Convenience methods for different notification types
  static async sendQuoteNotification(to: string, customerName: string, projectType: string): Promise<boolean> {
    const message = `Hello! You have received a new quote request for ${projectType} from ${customerName}. Please log into your Remodely.AI dashboard to review and respond.`

    return this.makeVoiceCall({
      to,
      message,
      type: 'quote'
    })
  }

  static async sendBookingConfirmation(to: string, customerName: string, scheduledDate: string): Promise<boolean> {
    const message = `Your countertop installation with ${customerName} has been confirmed for ${scheduledDate}. Thank you for using Remodely.AI!`

    return this.makeVoiceCall({
      to,
      message,
      type: 'booking'
    })
  }

  static async sendWelcomeMessage(to: string, userType: 'customer' | 'contractor'): Promise<boolean> {
    const message = userType === 'contractor'
      ? 'Welcome to Remodely.AI! Your contractor profile is now active. Start receiving quote requests from customers in your area.'
      : 'Welcome to Remodely.AI! Your account is ready. You can now browse certified contractors and request quotes for your countertop project.'

    return this.makeVoiceCall({
      to,
      message,
      type: 'welcome'
    })
  }

  // Twilio Verify Service Methods
  static async sendVerificationCode(phoneNumber: string, channel: 'sms' | 'call' = 'sms'): Promise<{ success: boolean, sid?: string, error?: string }> {
    if (!client || !verifyServiceSid) {
      return { success: false, error: 'Twilio Verify service not configured' }
    }

    try {
      // Format phone number to E.164 format if not already
      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`

      const verification = await client.verify.v2.services(verifyServiceSid)
        .verifications
        .create({
          to: formattedNumber,
          channel: channel
        })

      console.log('Verification sent:', verification.sid)
      return { success: true, sid: verification.sid }
    } catch (error) {
      console.error('Failed to send verification code:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  static async verifyCode(phoneNumber: string, code: string): Promise<{ success: boolean, status?: string, error?: string }> {
    if (!client || !verifyServiceSid) {
      return { success: false, error: 'Twilio Verify service not configured' }
    }

    try {
      // Format phone number to E.164 format if not already
      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`

      const verificationCheck = await client.verify.v2.services(verifyServiceSid)
        .verificationChecks
        .create({
          to: formattedNumber,
          code: code
        })

      console.log('Verification check result:', verificationCheck.status)
      return {
        success: verificationCheck.status === 'approved',
        status: verificationCheck.status
      }
    } catch (error) {
      console.error('Failed to verify code:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Enhanced contractor verification with phone verification
  static async sendContractorVerificationSMS(phoneNumber: string, businessName: string): Promise<boolean> {
    const message = `Remodely.AI: Complete your contractor verification for ${businessName}. This helps customers trust your services. Reply VERIFY to confirm this phone number.`

    return this.sendSMS({
      to: phoneNumber,
      message,
      type: 'welcome'
    })
  }
}
