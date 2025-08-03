const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function makeProfessionalInteractiveCall() {
    try {
        console.log('📞 Making PROFESSIONAL INTERACTIVE voice call...');
        console.log(`📞 From: ${process.env.TWILIO_PHONE_NUMBER}`);
        console.log(`📞 To: 480-255-5887`);

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="95%" pitch="medium" volume="medium">
              Hello, this is Sarah from REMODELY AI, your renovation marketplace platform.
              <break time="0.6s"/>
              I'm reaching out because we have several qualified contractors available 
              <break time="0.4s"/>
              for your project in your area.
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
          
          <Gather input="dtmf" timeout="10" numDigits="1" action="/voice-menu-response">
            <Say voice="Polly.Joanna">
              <prosody rate="95%" pitch="medium">
                <break time="3s"/>
                Please press any number to continue, or stay on the line.
              </prosody>
            </Say>
          </Gather>
          
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="95%" pitch="medium">
              Thank you for your interest in REMODELY AI.
              <break time="0.5s"/>
              You can find detailed contractor information and get instant quotes 
              <break time="0.3s"/>
              at REMODELY dot AI.
              <break time="0.6s"/>
              We also offer real-time voice consultations on our website.
              <break time="0.4s"/>
              Simply visit REMODELY dot AI and click "Talk to Sarah" 
              <break time="0.3s"/>
              for immediate assistance.
              <break time="0.5s"/>
              Have a great day.
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ Professional interactive call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`🎭 Voice: Professional Joanna with optimized prosody`);

        return call;

    } catch (error) {
        console.error('❌ Error making professional call:', error.message);
        throw error;
    }
}

async function makeNaturalVoiceCall() {
    try {
        console.log('🎙️ Making NATURAL VOICE quality call...');

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Matthew" language="en-US">
            <prosody rate="100%" pitch="-2%" volume="medium">
              <emphasis level="moderate">Good afternoon.</emphasis>
              <break time="0.4s"/>
              This is <emphasis level="moderate">Matthew from REMODELY AI</emphasis>, 
              your trusted renovation marketplace.
              <break time="0.8s"/>
              I'm calling to inform you that we've identified three highly qualified contractors 
              <break time="0.4s"/>
              in your immediate area who specialize in your type of project.
              <break time="1s"/>
              These contractors have been thoroughly vetted, 
              <break time="0.3s"/>
              with verified licenses, insurance, and excellent customer reviews.
              <break time="0.8s"/>
              Rather than leave a lengthy voicemail, 
              <break time="0.4s"/>
              I'd recommend visiting our platform at <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI
              <break time="0.6s"/>
              where you can review detailed contractor profiles, 
              <break time="0.3s"/>
              see their previous work, and request quotes instantly.
              <break time="1s"/>
              Additionally, we now offer live voice consultations on our website.
              <break time="0.5s"/>
              You can have a real conversation with our AI assistant 
              <break time="0.3s"/>
              to discuss your project requirements and get personalized recommendations.
              <break time="0.8s"/>
              Visit <phoneme alphabet="ipa" ph="ɹiˈmɒdəli">REMODELY</phoneme> dot AI 
              <break time="0.3s"/>
              and click <emphasis level="strong">"Talk to Sarah"</emphasis> to get started.
              <break time="0.6s"/>
              Thank you for choosing REMODELY AI.
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ Natural voice call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`🎭 Voice: Natural Matthew with phonetic pronunciation and emphasis`);

        return call;

    } catch (error) {
        console.error('❌ Error making natural voice call:', error.message);
        throw error;
    }
}

async function makeNeuralVoiceCall() {
    try {
        console.log('🧠 Making NEURAL VOICE (Amazon Neural) call...');

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna-Neural" language="en-US">
            Hello, this is Sarah calling from REMODELY AI.
            <break time="0.5s"/>
            I hope you're having a wonderful day.
            <break time="0.7s"/>
            I'm reaching out because our system has matched you with several 
            excellent contractors for your renovation project.
            <break time="0.8s"/>
            What makes REMODELY AI different is our commitment to quality.
            <break time="0.5s"/>
            Every contractor in our network has been verified, licensed, and reviewed 
            by real customers.
            <break time="1s"/>
            Instead of playing phone tag or waiting for callbacks, 
            you can explore these options immediately on our website.
            <break time="0.6s"/>
            Simply visit REMODELY dot AI to see contractor profiles, 
            view their work portfolios, and get instant quotes.
            <break time="0.8s"/>
            We've also introduced something exciting - 
            real-time voice conversations with our AI assistant.
            <break time="0.6s"/>
            It's like having a knowledgeable friend who's available twenty-four seven 
            to discuss your project and answer any questions.
            <break time="0.8s"/>
            Visit REMODELY dot AI and click "Talk to Sarah" to experience 
            the future of renovation planning.
            <break time="0.5s"/>
            Thank you, and I look forward to helping you create your dream space.
          </Say>
        </Response>
      `
        });

        console.log('✅ Neural voice call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`🎭 Voice: Amazon Polly Neural (most natural available)`);

        return call;

    } catch (error) {
        console.error('❌ Error making neural voice call:', error.message);
        throw error;
    }
}

// Menu for different professional call types
console.log('📞🏢 REMODELY AI - PROFESSIONAL VOICE SYSTEM');
console.log('===========================================');
console.log('Choose a professional call type to 480-255-5887:');
console.log('1. Professional Interactive (Joanna + Menu)');
console.log('2. Natural Voice Quality (Matthew + Phonetics)');
console.log('3. Amazon Neural Voice (Most Natural)');
console.log('===========================================');

const callType = process.argv[2] || '1';

switch (callType) {
    case '1':
        console.log('🏢 Executing: Professional Interactive Call\n');
        makeProfessionalInteractiveCall();
        break;
    case '2':
        console.log('🎙️ Executing: Natural Voice Quality Call\n');
        makeNaturalVoiceCall();
        break;
    case '3':
        console.log('🧠 Executing: Amazon Neural Voice Call\n');
        makeNeuralVoiceCall();
        break;
    default:
        console.log('🏢 Executing: Default Professional Call\n');
        makeProfessionalInteractiveCall();
}
