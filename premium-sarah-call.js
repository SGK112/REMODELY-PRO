// Improved Sarah voice call with better TwiML
require('dotenv').config();

async function makePremiumSarahCall() {
    console.log('🎙️ Making PREMIUM Sarah voice call to 4802555887...\n');

    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    console.log('📋 Configuration:');
    console.log(`✅ From: ${process.env.TWILIO_PHONE_NUMBER}`);
    console.log(`✅ To: +14802555887`);
    console.log(`✅ Sarah Voice ID: ${process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID}`);

    try {
        // Create a premium call with Polly voice (closest to natural)
        const call = await client.calls.create({
            twiml: `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say voice="Polly.Joanna">
            Hello! This is Sarah, your premium AI assistant from Remodely dot AI. 
            I'm calling to demonstrate our advanced voice consultation system. 
            I'm powered by cutting-edge AI technology and I'm here to help you with all your home renovation needs.
            Our platform connects you with verified contractors, provides personalized project guidance, and offers AI-powered design recommendations.
            This call demonstrates the quality of our voice consultation services, where I can discuss your projects, answer questions, and guide you through the renovation process.
            We use advanced natural language processing to understand your needs and provide tailored solutions.
            Thank you for testing our premium voice system! I'm excited to help you transform your home.
          </Say>
          <Pause length="2"/>
          <Say voice="Polly.Joanna">
            This has been a demonstration of Sarah from Remodely AI. Have a wonderful day, and we look forward to helping with your renovation projects!
          </Say>
        </Response>`,
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            record: true,
            timeout: 45, // Longer ring time
            recordingStatusCallback: `${process.env.NEXTAUTH_URL}/api/voice/status`
        });

        console.log(`✅ Premium Sarah call initiated!`);
        console.log(`📞 Call SID: ${call.sid}`);
        console.log(`📞 Status: ${call.status}`);
        console.log(`📞 Voice: Polly.Joanna (Premium quality)`);

        console.log('\n🎯 This call features:');
        console.log('✨ Premium Polly.Joanna voice (closest to Sarah)');
        console.log('✨ Longer, more detailed message (60+ seconds)');
        console.log('✨ Professional voice consultation demo');
        console.log('✨ Call recording enabled');
        console.log('✨ Extended ring time (45 seconds)');

        console.log('\n📞 Your phone should ring now with a MUCH better experience!');

        // Monitor the call
        setTimeout(async () => {
            try {
                const updatedCall = await client.calls(call.sid).fetch();
                console.log(`\n📊 Call Update: ${updatedCall.status}`);
                if (updatedCall.duration) {
                    console.log(`📊 Duration: ${updatedCall.duration} seconds`);
                }
            } catch (error) {
                console.log(`⚠️ Could not fetch call status: ${error.message}`);
            }
        }, 15000);

    } catch (error) {
        console.error('❌ Premium call failed:', error.message);

        if (error.code === 21614) {
            console.log('\n🚨 PHONE NOT VERIFIED');
            console.log('   Add +14802555887 to Twilio verified numbers');
            console.log('   https://console.twilio.com/us1/develop/phone-numbers/manage/verified');
        }
    }
}

makePremiumSarahCall();
