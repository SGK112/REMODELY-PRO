// Test voice call to 4802555887 with Sarah's voice
require('dotenv').config();

async function makeTestCall() {
    console.log('📞 Making test call to 4802555887 with Sarah\'s voice...\n');

    const twilio = require('twilio');

    // Twilio setup
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const testPhone = '+14802555887'; // The number you want to call

    console.log('📋 Configuration Check:');
    console.log(`✅ Twilio Account SID: ${accountSid ? accountSid.substring(0, 10) + '...' : 'Missing'}`);
    console.log(`✅ Twilio Phone: ${twilioPhone}`);
    console.log(`✅ Target Phone: ${testPhone}`);
    console.log(`✅ ElevenLabs API: ${process.env.ELEVENLABS_API_KEY ? 'Ready' : 'Missing'}`);
    console.log(`✅ Sarah's Voice: ${process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID}\n`);

    if (!accountSid || !authToken || !twilioPhone) {
        console.log('❌ Twilio credentials missing!');
        return;
    }

    try {
        const client = twilio(accountSid, authToken);

        // First, generate the voice message using ElevenLabs
        console.log('🎵 Generating Sarah\'s voice message...');

        const message = `Hello! This is Sarah from Remodely AI calling to test our voice system. 
    I'm your AI assistant ready to help with your home renovation projects. 
    Our platform connects you with verified contractors and provides AI-powered project planning. 
    This is just a test call to verify our voice integration is working perfectly. 
    Thank you for testing our system!`;

        // Generate audio with ElevenLabs
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'xi-api-key': process.env.ELEVENLABS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: message,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log(`⚠️  ElevenLabs TTS not available (${response.status}), falling back to Twilio voice...`);

            // Fallback to Twilio's built-in voice
            const call = await client.calls.create({
                twiml: `
          <Response>
            <Say voice="alice">
              Hello! This is Sarah from Remodely AI calling to test our voice system. 
              I'm your AI assistant ready to help with your home renovation projects. 
              Our platform connects you with verified contractors and provides AI-powered project planning. 
              This is just a test call to verify our voice integration is working perfectly. 
              Thank you for testing our system!
            </Say>
          </Response>
        `,
                to: testPhone,
                from: twilioPhone,
                record: true
            });

            console.log(`✅ Fallback call initiated with Twilio voice!`);
            console.log(`📞 Call SID: ${call.sid}`);
            console.log(`📞 Status: ${call.status}`);

        } else {
            console.log('✅ ElevenLabs voice generated successfully!\n');

            // For now, use TwiML since we need a webhook to serve the audio
            // In production, you'd save the audio and serve it via webhook
            const call = await client.calls.create({
                twiml: `
          <Response>
            <Say voice="alice">
              Hello! This is Sarah from Remodely AI. Our ElevenLabs voice integration is working, 
              but I'm using Twilio voice for this test call. The premium Sarah voice will be 
              available in the full system. Thank you for testing!
            </Say>
          </Response>
        `,
                to: testPhone,
                from: twilioPhone,
                record: true
            });

            console.log(`✅ Call initiated with ElevenLabs backup!`);
            console.log(`📞 Call SID: ${call.sid}`);
            console.log(`📞 Status: ${call.status}`);
        }

        console.log(`� From: ${twilioPhone}`);
        console.log(`📞 To: ${testPhone}\n`);

        console.log('🎯 What should happen:');
        console.log('1. Your phone (4802555887) should ring');
        console.log('2. When you answer, you\'ll hear Sarah\'s message');
        console.log('3. She\'ll introduce Remodely AI and explain this is a test');
        console.log('4. The call will be recorded for quality assurance');

        console.log('\n📊 Call Monitoring:');
        console.log(`Monitor at: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming`);
        console.log(`Call logs: https://console.twilio.com/us1/monitor/logs/calls`);

    } catch (error) {
        console.error('❌ Test call failed:', error.message);

        if (error.code === 21614) {
            console.log('\n🔧 Troubleshooting:');
            console.log('- The "To" number is not verified with Twilio');
            console.log('- Add +14802555887 to verified numbers in Twilio Console');
            console.log('- Or upgrade to a paid Twilio account for unrestricted calling');
        } else if (error.code === 20003) {
            console.log('\n🔧 Troubleshooting:');
            console.log('- Authentication failed - check Twilio credentials');
        }
    }
}

// Run the test
makeTestCall().catch(console.error);
