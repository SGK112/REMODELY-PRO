// Real ElevenLabs + Twilio integration with Sarah's voice
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function makeRealSarahCall() {
    console.log('🎙️ Creating REAL Sarah voice call to 4802555887...\n');

    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    console.log('Step 1: Generating Sarah\'s voice with ElevenLabs...');

    const message = `Hello! This is Sarah, your AI assistant from Remodely dot AI. 
  I'm calling to demonstrate our advanced voice technology. 
  I'm powered by ElevenLabs AI and can help you with all your home renovation needs.
  Our platform connects you with verified contractors and provides personalized project guidance.
  This call showcases the quality of our voice consultations.
  Thank you for testing our premium voice system!`;

    try {
        // Generate high-quality audio with ElevenLabs
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'xi-api-key': process.env.ELEVENLABS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: message,
                model_id: "eleven_multilingual_v2", // Higher quality model
                voice_settings: {
                    stability: 0.6,
                    similarity_boost: 0.8,
                    style: 0.2,
                    use_speaker_boost: true
                }
            })
        });

        if (!response.ok) {
            throw new Error(`ElevenLabs failed: ${response.status}`);
        }

        const audioBuffer = await response.arrayBuffer();
        const audioPath = path.join(__dirname, 'sarah-voice.mp3');
        fs.writeFileSync(audioPath, Buffer.from(audioBuffer));

        console.log(`✅ Generated ${audioBuffer.byteLength} bytes of Sarah's voice`);
        console.log(`✅ Saved to: ${audioPath}\n`);

        console.log('Step 2: Creating Twilio call with audio file...');

        // We need to serve this file via HTTP for Twilio to access it
        // For now, let's use a webhook approach
        const call = await client.calls.create({
            url: `${process.env.NEXTAUTH_URL}/api/voice/sarah-test`, // We'll create this endpoint
            to: '+14802555887',
            from: process.env.TWILIO_PHONE_NUMBER,
            record: true,
            timeout: 30, // Ring for 30 seconds
            statusCallback: `${process.env.NEXTAUTH_URL}/api/voice/status`
        });

        console.log(`✅ Sarah voice call initiated!`);
        console.log(`📞 Call SID: ${call.sid}`);
        console.log(`📞 Status: ${call.status}`);
        console.log(`📞 Using webhook: ${process.env.NEXTAUTH_URL}/api/voice/sarah-test`);

        console.log('\n🎯 What should happen:');
        console.log('1. Your phone will ring (better quality ring)');
        console.log('2. You\'ll hear Sarah\'s actual ElevenLabs voice');
        console.log('3. Premium audio quality with natural speech');
        console.log('4. Longer, more detailed message');

    } catch (error) {
        console.error('❌ Sarah voice call failed:', error.message);
    }
}

makeRealSarahCall();
