import twilio from 'twilio';

interface VoiceCallOptions {
    to: string;
    customerName?: string;
    projectType?: string;
    contractorName?: string;
    appointmentTime?: string;
    customMessage?: string;
    voiceType?: 'professional' | 'friendly' | 'energetic';
    callType?: 'follow-up' | 'reminder' | 'notification' | 'welcome' | 'custom';
}

interface TwilioResponse {
    sid: string;
    status: string;
    direction: string;
    price?: string;
}

class HumanVoiceService {
    private client: twilio.Twilio;

    constructor() {
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            throw new Error('Twilio credentials not configured');
        }

        this.client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }

    private getVoiceSettings(voiceType: string) {
        const voices = {
            professional: {
                voice: 'Polly.Matthew-Neural',
                rate: '100%',
                pitch: 'medium',
                volume: 'medium'
            },
            friendly: {
                voice: 'Polly.Joanna-Neural',
                rate: '95%',
                pitch: 'medium',
                volume: 'medium'
            },
            energetic: {
                voice: 'Polly.Kendra-Neural',
                rate: '105%',
                pitch: '+2%',
                volume: 'medium'
            }
        };

        return voices[voiceType as keyof typeof voices] || voices.friendly;
    }

    private generateTwiML(options: VoiceCallOptions): string {
        const voiceSettings = this.getVoiceSettings(options.voiceType || 'friendly');
        const customerName = options.customerName || 'there';

        switch (options.callType) {
            case 'welcome':
                return `
          <Response>
            <Say voice="${voiceSettings.voice}" language="en-US">
              <prosody rate="${voiceSettings.rate}" pitch="${voiceSettings.pitch}" volume="${voiceSettings.volume}">
                <emphasis level="moderate">Hello ${customerName}</emphasis>, and welcome to REMODELY AI!
                <break time="0.6s"/>
                I'm calling to personally welcome you to our renovation marketplace.
                <break time="0.5s"/>
                We're genuinely excited to have you as part of our community.
                <break time="0.8s"/>
                Our team is working to connect you with the most qualified contractors 
                <break time="0.4s"/>
                in your area for your project.
                <break time="0.6s"/>
                You can expect to hear from us soon with some excellent options,
                <break time="0.4s"/>
                or you can visit REMODELY dot AI anytime to explore contractors 
                <break time="0.3s"/>
                and get instant quotes.
                <break time="0.6s"/>
                Thank you for choosing REMODELY AI.
                <break time="0.4s"/>
                Have a wonderful day!
              </prosody>
            </Say>
          </Response>
        `;

            case 'follow-up':
                return `
          <Response>
            <Say voice="${voiceSettings.voice}" language="en-US">
              <prosody rate="${voiceSettings.rate}" pitch="${voiceSettings.pitch}" volume="${voiceSettings.volume}">
                <emphasis level="moderate">Hello ${customerName}</emphasis>,
                <break time="0.6s"/>
                This is Sarah from REMODELY AI. I'm following up on your inquiry.
                <break time="0.5s"/>
                I wanted to check on the progress of your ${options.projectType || 'renovation project'}.
                <break time="0.8s"/>
                Our platform now has several new contractors in your area
                <break time="0.4s"/>
                who specialize in exactly what you're looking for.
                <break time="0.7s"/>
                You can review their profiles, see their previous work,
                <break time="0.3s"/>
                and request quotes instantly at REMODELY dot AI.
                <break time="0.8s"/>
                We've also added a new feature - 
                <break time="0.4s"/>
                you can now have real-time voice conversations 
                <break time="0.3s"/>
                with our AI assistant on the website.
                <break time="0.6s"/>
                Simply visit REMODELY dot AI and click "Talk to Sarah"
                <break time="0.4s"/>
                for immediate assistance with your project.
                <break time="0.5s"/>
                Thank you for choosing REMODELY AI.
              </prosody>
            </Say>
          </Response>
        `;

            case 'reminder':
                return `
          <Response>
            <Say voice="${voiceSettings.voice}" language="en-US">
              <prosody rate="${voiceSettings.rate}" pitch="${voiceSettings.pitch}">
                Hi ${customerName}, this is a friendly reminder from REMODELY AI.
                <break time="0.8s"/>
                You have an appointment ${options.appointmentTime || 'tomorrow'} 
                <break time="0.3s"/>
                with ${options.contractorName || 'your contractor'}.
                <break time="1s"/>
                They're really looking forward to working with you on your 
                ${options.projectType || 'project'}.
                <break time="0.8s"/>
                If you need to reschedule, just give us a call.
                <break time="0.5s"/>
                Thanks, and we'll talk to you soon!
              </prosody>
            </Say>
          </Response>
        `;

            case 'notification':
                return `
          <Response>
            <Say voice="${voiceSettings.voice}" language="en-US">
              <prosody rate="slow" pitch="medium">
                Well hey there, ${customerName}! I got some real exciting news from REMODELY AI.
                <break time="0.8s"/>
                We found three absolutely wonderful contractors in your neck of the woods 
                <break time="0.6s"/>
                who are just perfect for your ${options.projectType || 'renovation'}.
                <break time="1s"/>
                Now honey, they're all available to start within the next couple weeks,
                <break time="0.5s"/>
                and let me tell you, their work is just beautiful!
                <break time="0.8s"/>
                Go ahead and check your email for their information, sugar.
                <break time="0.6s"/>
                This is gonna be absolutely wonderful!
              </prosody>
            </Say>
          </Response>
        `;

            default:
                return `
          <Response>
            <Say voice="${voiceSettings.voice}" language="en-US">
              <prosody rate="${voiceSettings.rate}" pitch="${voiceSettings.pitch}">
                ${options.customMessage || `Hi ${customerName}! This is REMODELY AI calling with an update about your renovation project.`}
              </prosody>
            </Say>
          </Response>
        `;
        }
    }

    async makeHumanVoiceCall(options: VoiceCallOptions): Promise<TwilioResponse> {
        try {
            if (!process.env.TWILIO_PHONE_NUMBER) {
                throw new Error('Twilio phone number not configured');
            }

            const twiml = this.generateTwiML(options);

            const call = await this.client.calls.create({
                to: options.to,
                from: process.env.TWILIO_PHONE_NUMBER,
                twiml: twiml
            });

            console.log(`✅ Human-like call initiated to ${options.to}`);
            console.log(`📋 Call SID: ${call.sid}`);
            console.log(`🎭 Voice Type: ${options.voiceType || 'friendly'}`);
            console.log(`📞 Call Type: ${options.callType || 'custom'}`);

            return {
                sid: call.sid,
                status: call.status,
                direction: call.direction,
                price: call.price
            };

        } catch (error) {
            console.error('❌ Error making human voice call:', error);
            throw error;
        }
    }

    async makeInteractiveCall(options: VoiceCallOptions): Promise<TwilioResponse> {
        try {
            const voiceSettings = this.getVoiceSettings(options.voiceType || 'friendly');

            const twiml = `
        <Response>
          <Say voice="${voiceSettings.voice}" language="en-US">
            <prosody rate="${voiceSettings.rate}" pitch="${voiceSettings.pitch}">
              Hi! This is REMODELY AI calling about your renovation project.
              <break time="0.8s"/>
              I have some great contractor options for you.
              <break time="1s"/>
              To hear about kitchen specialists, press 1.
              <break time="0.5s"/>
              For bathroom experts, press 2.
              <break time="0.5s"/>
              For flooring contractors, press 3.
              <break time="0.5s"/>
              To speak with a live representative, press 0.
            </prosody>
          </Say>
          
          <Gather input="dtmf" timeout="10" numDigits="1" action="/api/voice/menu">
            <Say voice="${voiceSettings.voice}">
              <break time="3s"/>
              I'm still here! Please press a number for the type of contractor you need.
            </Say>
          </Gather>
          
          <Say voice="${voiceSettings.voice}">
            <prosody rate="${voiceSettings.rate}">
              No problem! Visit REMODELY dot AI to explore all our contractor options.
              <break time="0.5s"/>
              Thanks for choosing REMODELY AI!
            </prosody>
          </Say>
        </Response>
      `;

            const call = await this.client.calls.create({
                to: options.to,
                from: process.env.TWILIO_PHONE_NUMBER!,
                twiml: twiml
            });

            return {
                sid: call.sid,
                status: call.status,
                direction: call.direction,
                price: call.price
            };

        } catch (error) {
            console.error('❌ Error making interactive call:', error);
            throw error;
        }
    }

    async getCallStatus(callSid: string) {
        try {
            const call = await this.client.calls(callSid).fetch();
            return {
                sid: call.sid,
                status: call.status,
                duration: call.duration,
                price: call.price,
                priceUnit: call.priceUnit
            };
        } catch (error) {
            console.error('❌ Error fetching call status:', error);
            throw error;
        }
    }
}

export default HumanVoiceService;

// Usage examples:
/*
const voiceService = new HumanVoiceService();

// Welcome call for new customers
await voiceService.makeHumanVoiceCall({
  to: '+14802555887',
  customerName: 'Sarah',
  callType: 'welcome',
  voiceType: 'friendly'
});

// Follow-up call
await voiceService.makeHumanVoiceCall({
  to: '+14802555887',
  customerName: 'John',
  projectType: 'kitchen renovation',
  callType: 'follow-up',
  voiceType: 'professional'
});

// Appointment reminder
await voiceService.makeHumanVoiceCall({
  to: '+14802555887',
  customerName: 'Maria',
  contractorName: 'Mike from Phoenix Renovations',
  appointmentTime: 'tomorrow at 2 PM',
  projectType: 'bathroom remodel',
  callType: 'reminder',
  voiceType: 'friendly'
});
*/
