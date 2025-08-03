const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function makeElevenLabsStyleCall() {
    try {
        console.log('🤖 Making ElevenLabs-inspired AI phone call...');
        console.log(`📞 From: ${process.env.TWILIO_PHONE_NUMBER}`);
        console.log(`📞 To: 480-255-5887`);

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Matthew-Neural" language="en-US">
            <prosody rate="100%" pitch="medium" volume="medium">
              <emphasis level="moderate">Hi there</emphasis>, this is Matthew from REMODELY AI.
              <break time="0.5s"/>
              I'm calling because we've identified three highly qualified contractors 
              <break time="0.4s"/>
              in your immediate area who specialize in your type of project.
              <break time="0.8s"/>
              These contractors have been thoroughly vetted with verified licenses, 
              <break time="0.3s"/>
              insurance, and excellent customer reviews.
              <break time="0.7s"/>
              Rather than leave a lengthy voicemail, I'd recommend visiting our platform 
              <break time="0.4s"/>
              at <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI
              <break time="0.6s"/>
              where you can review detailed contractor profiles, see their previous work, 
              <break time="0.3s"/>
              and request quotes instantly.
              <break time="0.8s"/>
              We've also introduced something exciting - 
              <break time="0.4s"/>
              live voice consultations on our website.
              <break time="0.6s"/>
              You can have a real conversation with our AI assistant 
              <break time="0.3s"/>
              to discuss your project requirements and get personalized recommendations.
              <break time="0.7s"/>
              Visit <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI 
              <break time="0.3s"/>
              and click <emphasis level="strong">"Talk to Sarah"</emphasis> to get started.
              <break time="0.5s"/>
              Thank you for choosing REMODELY AI.
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ ElevenLabs-style phone call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`🎭 Features: Natural Matthew Neural voice + web conversation promotion`);

        return call;

    } catch (error) {
        console.error('❌ Error making ElevenLabs-style call:', error.message);
        throw error;
    }
}

async function makeInteractivePhoneCall() {
    try {
        console.log('🔄 Making INTERACTIVE phone call with voice menu...');

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna-Neural" language="en-US">
            <prosody rate="95%" pitch="medium" volume="medium">
              <emphasis level="moderate">Hi there</emphasis>, this is Sarah from REMODELY AI.
              <break time="0.6s"/>
              I'm calling because we have several qualified contractors available 
              <break time="0.4s"/>
              for your renovation project in your area.
              <break time="0.8s"/>
              I can provide you with specific information based on your project type.
              <break time="0.6s"/>
              For kitchen renovation specialists, press 1.
              <break time="0.4s"/>
              For bathroom remodeling experts, press 2.
              <break time="0.4s"/>
              For general contractors and whole home projects, press 3.
              <break time="0.4s"/>
              To learn about our voice consultation feature, press 4.
              <break time="0.4s"/>
              Or press 0 to speak with a representative.
              <break time="0.5s"/>
              What can I help you with today?
            </prosody>
          </Say>
          
          <Gather input="dtmf" timeout="10" numDigits="1">
            <Say voice="Polly.Joanna-Neural">
              <prosody rate="95%" pitch="medium">
                <break time="3s"/>
                Please press any number to continue, or stay on the line.
              </prosody>
            </Say>
          </Gather>
          
          <Say voice="Polly.Joanna-Neural" language="en-US">
            <prosody rate="95%" pitch="medium">
              Thank you for your interest in REMODELY AI.
              <break time="0.5s"/>
              You can find detailed contractor information and get instant quotes 
              <break time="0.3s"/>
              at <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI.
              <break time="0.6s"/>
              We also offer real-time voice consultations on our website.
              <break time="0.4s"/>
              Simply visit <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI 
              <break time="0.3s"/>
              and click <emphasis level="strong">"Talk to Sarah"</emphasis> 
              <break time="0.3s"/>
              for immediate assistance.
              <break time="0.5s"/>
              Have a great day.
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ Interactive phone call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`🎭 Voice: Professional Joanna Neural with confident delivery`);

        return call;

    } catch (error) {
        console.error('❌ Error making interactive call:', error.message);
        throw error;
    }
}

async function makeRealTimePromotionCall() {
    try {
        console.log('🌐 Making REAL-TIME VOICE CHAT promotion call...');

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna-Neural" language="en-US">
            <prosody rate="100%" pitch="medium" volume="medium">
              <emphasis level="moderate">Hi</emphasis>, this is Sarah from REMODELY AI.
              <break time="0.6s"/>
              I'm excited to tell you about something new we've just launched.
              <break time="0.7s"/>
              You know how I'm calling you right now? 
              <break time="0.4s"/>
              Well, now you can actually have a real conversation with me 
              <break time="0.3s"/>
              anytime you want on our website.
              <break time="0.8s"/>
              It's incredibly convenient - just visit <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI, 
              <break time="0.4s"/>
              click <emphasis level="strong">"Talk to Sarah"</emphasis>, and we can discuss your renovation 
              <break time="0.3s"/>
              as if we're sitting together planning your project.
              <break time="0.8s"/>
              I can answer all your questions about contractors, 
              <break time="0.4s"/>
              help you understand pricing, walk through your timeline,
              <break time="0.3s"/>
              whatever you need to know.
              <break time="0.7s"/>
              And the best part? You don't have to wait for callbacks - 
              <break time="0.4s"/>
              I'm available twenty-four seven for real voice conversations.
              <break time="0.8s"/>
              So visit <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI 
              <break time="0.3s"/>
              and let's start planning your dream renovation.
              <break time="0.5s"/>
              Talk to you soon!
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ Real-time voice chat promotion call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`🎭 Voice: Confident Joanna Neural with fluent delivery`);

        return call;

    } catch (error) {
        console.error('❌ Error making promotion call:', error.message);
        throw error;
    }
}

// Menu for different hybrid call types
console.log('📞🤖 REMODELY AI - CONFIDENT PROFESSIONAL VOICE SYSTEM');
console.log('===================================================');
console.log('Choose a call type to 480-255-5887:');
console.log('1. Natural Professional Call (Matthew Neural - Confident)');
console.log('2. Interactive Professional Menu (Joanna Neural - Fluent)');
console.log('3. Real-time Voice Chat Promotion (Joanna Neural - Excited)');
console.log('===================================================');

const callType = process.argv[2] || '1';

switch (callType) {
    case '1':
        console.log('🎙️ Executing: Natural Professional Call (Matthew Neural)\n');
        makeElevenLabsStyleCall();
        break;
    case '2':
        console.log('🔄 Executing: Interactive Professional Menu (Joanna Neural)\n');
        makeInteractivePhoneCall();
        break;
    case '3':
        console.log('🌐 Executing: Real-time Voice Chat Promotion (Joanna Neural)\n');
        makeRealTimePromotionCall();
        break;
    default:
        console.log('🎙️ Executing: Default Natural Professional Call\n');
        makeElevenLabsStyleCall();
}
