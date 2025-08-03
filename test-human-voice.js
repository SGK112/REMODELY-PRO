const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function makeHumanVoiceCall() {
    try {
        console.log('🔊 Initiating HUMAN-LIKE voice call...');
        console.log(`📞 From: ${process.env.TWILIO_PHONE_NUMBER}`);
        console.log(`📞 To: 480-255-5887`);

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="slow" pitch="medium">
              Well hey there, honey! This is Sarah callin' from REMODELY AI.
              <break time="0.8s"/>
              I sure hope I'm not catchin' you at a bad time, darlin'.
              <break time="0.6s"/>
              Listen, I just had to call and tell you - 
              <break time="0.4s"/>
              your renovation platform is workin' like a dream!
              <break time="1s"/>
              We just finished testin' all those voice features y'all built, 
              <break time="0.5s"/>
              and let me tell you, 
              <break time="0.3s"/>
              it's just fantastic!
              <break time="0.8s"/>
              You should be mighty proud of what you've put together here, sugar.
              <break time="0.7s"/>
              Now, if you need anything at all - 
              <break time="0.4s"/>
              and I mean anything - 
              <break time="0.3s"/>
              you just give us a holler, okay?
              <break time="0.6s"/>
              We're here to help you every step of the way.
              <break time="0.8s"/>
              Thanks so much for choosin' REMODELY AI, 
              <break time="0.4s"/>
              and you have yourself a blessed day now!
              <break time="0.5s"/>
              Bye-bye, hon!
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ HUMAN-LIKE call initiated successfully!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`📋 Voice: Amazon Polly Joanna (Neural)`);
        console.log(`📋 Features: Natural pauses, prosody, conversational tone`);

        return call;

    } catch (error) {
        console.error('❌ Error making human-like call:', error.message);
        throw error;
    }
}

async function makeAIGeneratedVoiceCall() {
    try {
        console.log('🤖 Making AI-generated personalized call...');

        // This would typically come from your customer database
        const customerData = {
            name: "there", // Could be actual customer name
            project: "kitchen renovation",
            location: "Phoenix, Arizona"
        };

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="slow" pitch="medium">
              Well hello ${customerData.name}, sweet pea!
              <break time="0.8s"/>
              This is Sarah callin' from REMODELY AI about your ${customerData.project} project 
              over there in ${customerData.location}.
              <break time="1s"/>
              Now honey, I just had to reach out personally 
              <break time="0.5s"/>
              'cause we found some absolutely wonderful contractors in your neck of the woods
              <break time="0.6s"/>
              who do exactly the kind of work you're lookin' for.
              <break time="1s"/>
              We got three real good ones - 
              <break time="0.4s"/>
              all licensed, all insured, 
              <break time="0.3s"/>
              and they can start within the next couple weeks.
              <break time="0.8s"/>
              Now I know findin' the right contractor can be a real headache, darlin',
              <break time="0.6s"/>
              so we went ahead and did all the checkin' up on 'em for you.
              <break time="0.8s"/>
              Would you like me to send their information to your email, sugar,
              <break time="0.4s"/>
              or would you rather take a look at 'em on our website?
              <break time="1s"/>
              Either way's just fine by me - 
              <break time="0.3s"/>
              I'm here to help make this whole renovation thing 
              <break time="0.4s"/>
              as easy as pie for you.
              <break time="0.6s"/>
              Thanks for trustin' REMODELY AI with your project, hon.
              <break time="0.5s"/>
              Y'all have a wonderful day now!
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ AI-personalized call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);

        return call;

    } catch (error) {
        console.error('❌ Error making AI call:', error.message);
        throw error;
    }
}

async function makeInteractiveVoiceCall() {
    try {
        console.log('🎯 Making INTERACTIVE voice call with menu...');

        const call = await client.calls.create({
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="medium" pitch="medium">
              Hi! This is REMODELY AI, your renovation marketplace assistant.
              <break time="0.8s"/>
              I'm calling with some exciting updates about contractors in your area.
              <break time="1s"/>
              To hear about kitchen renovation specialists, press 1.
              <break time="0.8s"/>
              For bathroom remodeling experts, press 2.
              <break time="0.8s"/>
              To speak with a live representative, press 0.
              <break time="0.5s"/>
              Or simply stay on the line to hear all available options.
            </prosody>
          </Say>
          
          <Gather input="dtmf" timeout="10" numDigits="1">
            <Say voice="Polly.Joanna">
              <break time="2s"/>
              I'm still here! Please press a number, or I'll continue with all the information.
            </Say>
          </Gather>
          
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="medium">
              <break time="0.5s"/>
              No problem! Let me tell you about all our amazing contractors.
              <break time="0.8s"/>
              We have specialists for kitchens, bathrooms, flooring, and complete home renovations.
              <break time="1s"/>
              All our contractors are licensed, insured, and highly rated by previous customers.
              <break time="0.8s"/>
              Visit REMODELY dot AI to get started, or call us back anytime.
              <break time="0.5s"/>
              Thanks for choosing REMODELY AI!
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ Interactive call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);

        return call;

    } catch (error) {
        console.error('❌ Error making interactive call:', error.message);
        throw error;
    }
}

// Menu for different call types
console.log('🎙️  REMODELY AI - HUMAN-LIKE VOICE CALL TESTER');
console.log('===============================================');
console.log('Choose a call type:');
console.log('1. Human-like conversational call');
console.log('2. AI-personalized customer call');
console.log('3. Interactive menu call');
console.log('===============================================');

const callType = process.argv[2] || '1';

switch (callType) {
    case '1':
        console.log('🗣️  Executing: Human-like conversational call\n');
        makeHumanVoiceCall();
        break;
    case '2':
        console.log('🤖 Executing: AI-personalized customer call\n');
        makeAIGeneratedVoiceCall();
        break;
    case '3':
        console.log('🎯 Executing: Interactive menu call\n');
        makeInteractiveVoiceCall();
        break;
    default:
        console.log('🗣️  Executing: Default human-like call\n');
        makeHumanVoiceCall();
}
