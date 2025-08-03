const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioAppSid = process.env.TWILIO_TWIML_APP_SID;

if (!accountSid || !authToken || !twilioPhoneNumber) {
    throw new Error('Missing required Twilio environment variables');
}

const client = twilio(accountSid, authToken);

class EnhancedTwilioService {
    constructor() {
        this.client = client;
        this.phoneNumber = twilioPhoneNumber;
        this.appSid = twilioAppSid;
    }

    // Format phone number to E.164 format
    formatPhoneNumber(phoneNumber) {
        // Remove all non-digit characters except '+'
        const cleaned = phoneNumber.replace(/[^\d+]/g, '');

        // If it doesn't start with '+', assume US number and add +1
        if (!cleaned.startsWith('+')) {
            return `+1${cleaned}`;
        }

        return cleaned;
    }

    // Make voice call using inline TwiML
    async makeVoiceCallInlineTwiML(to, message, voice = 'woman') {
        const formattedTo = this.formatPhoneNumber(to);
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="${voice}">${message}</Say>
</Response>`;

        console.log(`📞 Making inline TwiML call to ${formattedTo}`);
        console.log(`🎵 Message: ${message}`);
        console.log(`🎤 Voice: ${voice}`);

        try {
            const call = await this.client.calls.create({
                twiml: twiml,
                to: formattedTo,
                from: this.phoneNumber,
            });

            console.log(`✅ Call created successfully!`);
            console.log(`📋 Call SID: ${call.sid}`);
            console.log(`📊 Status: ${call.status}`);

            return {
                success: true,
                callSid: call.sid,
                status: call.status,
                to: formattedTo,
                from: this.phoneNumber,
                message: message,
                voice: voice,
                method: 'inline-twiml'
            };
        } catch (error) {
            console.error('❌ Call failed:', error.message);
            return {
                success: false,
                error: error.message,
                to: formattedTo,
                from: this.phoneNumber,
                message: message,
                voice: voice,
                method: 'inline-twiml'
            };
        }
    }

    // Make voice call using TwiML App (requires public webhook URL)
    async makeVoiceCallWithApp(to, message, voice = 'woman') {
        if (!this.appSid) {
            throw new Error('TwiML App SID not configured. Set TWILIO_TWIML_APP_SID environment variable.');
        }

        const formattedTo = this.formatPhoneNumber(to);

        console.log(`📞 Making TwiML App call to ${formattedTo}`);
        console.log(`🎵 Message: ${message}`);
        console.log(`🎤 Voice: ${voice}`);
        console.log(`📱 App SID: ${this.appSid}`);

        try {
            const call = await this.client.calls.create({
                to: formattedTo,
                from: this.phoneNumber,
                applicationSid: this.appSid,
                // Pass custom parameters to the webhook
                sendDigits: '',
                // These will be available in the webhook as query parameters
                statusCallback: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/voice/webhook?message=${encodeURIComponent(message)}&voice=${voice}`,
                statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
                statusCallbackMethod: 'POST'
            });

            console.log(`✅ TwiML App call created successfully!`);
            console.log(`📋 Call SID: ${call.sid}`);
            console.log(`📊 Status: ${call.status}`);

            return {
                success: true,
                callSid: call.sid,
                status: call.status,
                to: formattedTo,
                from: this.phoneNumber,
                message: message,
                voice: voice,
                appSid: this.appSid,
                method: 'twiml-app'
            };
        } catch (error) {
            console.error('❌ TwiML App call failed:', error.message);
            return {
                success: false,
                error: error.message,
                to: formattedTo,
                from: this.phoneNumber,
                message: message,
                voice: voice,
                appSid: this.appSid,
                method: 'twiml-app'
            };
        }
    }

    // Comprehensive voice call method - uses TwiML App if available, falls back to inline TwiML
    async makeComprehensiveVoiceCall(to, message, voice = 'woman') {
        console.log('🚀 Starting comprehensive voice call...');

        if (this.appSid && this.appSid !== 'AP_YOUR_TWIML_APP_SID_HERE') {
            console.log('📱 Using TwiML App approach');
            return await this.makeVoiceCallWithApp(to, message, voice);
        } else {
            console.log('📝 Using inline TwiML approach');
            return await this.makeVoiceCallInlineTwiML(to, message, voice);
        }
    }

    // Test voice call functionality
    async testVoiceCall(to, message = 'This is a test call from the Enhanced Twilio Service.', voice = 'alice') {
        console.log('🧪 Running voice call test...');
        console.log('='.repeat(40));

        const result = await this.makeComprehensiveVoiceCall(to, message, voice);

        console.log('\n📊 Test Results:');
        console.log('Success:', result.success);
        if (result.success) {
            console.log('Call SID:', result.callSid);
            console.log('Status:', result.status);
            console.log('Method:', result.method);
        } else {
            console.log('Error:', result.error);
        }

        return result;
    }

    // Get call status
    async getCallStatus(callSid) {
        try {
            const call = await this.client.calls(callSid).fetch();
            return {
                success: true,
                sid: call.sid,
                status: call.status,
                duration: call.duration,
                price: call.price,
                priceUnit: call.priceUnit,
                direction: call.direction,
                answeredBy: call.answeredBy,
                startTime: call.startTime,
                endTime: call.endTime
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = { EnhancedTwilioService };
