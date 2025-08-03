import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const twimlAppSid = process.env.TWILIO_TWIML_APP_SID // Add this to your .env.local

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export interface VoiceCallOptions {
  to: string
  message: string
  voice?: 'alice' | 'man' | 'woman'
  useTwimlApp?: boolean
}

export class EnhancedTwilioService {
  
  static async makeVoiceCallWithTwimlApp(options: VoiceCallOptions): Promise<{ success: boolean, callSid?: string, error?: string }> {
    if (!client || !twilioPhoneNumber) {
      console.error('Twilio client not configured')
      return { success: false, error: 'Twilio client not configured' }
    }

    try {
      // Format phone number to E.164 format if not already
      const formattedNumber = options.to.startsWith('+') ? options.to : `+1${options.to.replace(/\D/g, '')}`
      
      const callOptions: any = {
        from: twilioPhoneNumber,
        to: formattedNumber,
      }

      if (options.useTwimlApp && twimlAppSid) {
        // Use TwiML App with webhook URL
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001'
        const webhookUrl = `${baseUrl}/api/voice/webhook?message=${encodeURIComponent(options.message)}&voice=${options.voice || 'alice'}`
        
        callOptions.applicationSid = twimlAppSid
        callOptions.url = webhookUrl
        callOptions.method = 'POST'
      } else {
        // Use inline TwiML for development
        callOptions.twiml = `<Response><Say voice="${options.voice || 'alice'}">${options.message}</Say></Response>`
      }

      const call = await client.calls.create(callOptions)

      console.log('Enhanced voice call initiated successfully:', call.sid)
      return { success: true, callSid: call.sid }
      
    } catch (error: any) {
      console.error('Failed to make enhanced voice call:', error)
      return { 
        success: false, 
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  // Method to test both approaches
  static async testVoiceCall(phoneNumber: string): Promise<void> {
    console.log('🧪 Testing Enhanced Voice API...')
    
    // Test 1: Inline TwiML (works with localhost)
    console.log('📞 Test 1: Inline TwiML approach...')
    const result1 = await this.makeVoiceCallWithTwimlApp({
      to: phoneNumber,
      message: 'Hello! This is test one using inline TwiML from Remodely AI.',
      voice: 'alice',
      useTwimlApp: false
    })
    
    if (result1.success) {
      console.log('✅ Inline TwiML test successful! Call SID:', result1.callSid)
    } else {
      console.log('❌ Inline TwiML test failed:', result1.error)
    }

    // Test 2: TwiML App (requires public URL)
    if (twimlAppSid) {
      console.log('📞 Test 2: TwiML App approach...')
      const result2 = await this.makeVoiceCallWithTwimlApp({
        to: phoneNumber,
        message: 'Hello! This is test two using TwiML App from Remodely AI.',
        voice: 'alice',
        useTwimlApp: true
      })
      
      if (result2.success) {
        console.log('✅ TwiML App test successful! Call SID:', result2.callSid)
      } else {
        console.log('❌ TwiML App test failed:', result2.error)
      }
    } else {
      console.log('ℹ️  TwiML App SID not configured, skipping test 2')
    }
  }
}
