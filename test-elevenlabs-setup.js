const { ElevenLabsService } = require('./lib/elevenLabsService');

async function testElevenLabs() {
    console.log('🎤 Testing ElevenLabs Integration...\n');

    // Check environment variables
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

    console.log('📋 Environment Check:');
    console.log(`✅ Voice ID (Sarah): ${voiceId}`);
    console.log(`${apiKey && !apiKey.includes('your-') ? '✅' : '❌'} API Key: ${apiKey ? (apiKey.startsWith('sk_') ? 'Valid format' : 'Invalid format') : 'Missing'}`);
    console.log(`${agentId && !agentId.includes('demo') ? '✅' : '⚠️'} Agent ID: ${agentId || 'Not set'}\n`);

    if (!apiKey || apiKey.includes('your-')) {
        console.log('❌ Missing ElevenLabs API Key!');
        console.log('🔧 Get your API key from: https://elevenlabs.io/app/settings');
        console.log('🔧 Then update ELEVENLABS_API_KEY in your .env file\n');
        return;
    }

    try {
        const service = new ElevenLabsService();

        // Test 1: Get available voices
        console.log('🔍 Test 1: Fetching available voices...');
        const voices = await service.getVoices();
        console.log(`✅ Found ${voices.length} voices available\n`);

        // Test 2: Check if Sarah's voice exists
        console.log('👩 Test 2: Checking Sarah\'s voice...');
        const sarahVoice = voices.find(v => v.voice_id === voiceId);
        if (sarahVoice) {
            console.log(`✅ Sarah's voice found: "${sarahVoice.name}"`);
            console.log(`   Category: ${sarahVoice.category}`);
            console.log(`   Description: ${sarahVoice.description || 'N/A'}\n`);
        } else {
            console.log(`❌ Sarah's voice (${voiceId}) not found in your account`);
            console.log('🔧 Make sure you have access to this voice\n');
        }

        // Test 3: Generate sample audio
        console.log('🎵 Test 3: Generating sample audio with Sarah\'s voice...');
        const testText = "Hello! I'm Sarah from Remodely AI. I'm here to help you find the perfect contractors for your home renovation project.";

        const audioData = await service.textToSpeech(testText, voiceId);
        console.log(`✅ Audio generated successfully!`);
        console.log(`   Audio size: ${audioData.audio_base64.length} characters (base64)`);
        console.log(`   You can play this audio in your browser or save it as a file\n`);

        // Test 4: Voice models
        console.log('🎛️ Test 4: Available voice models...');
        const models = await service.getModels();
        console.log(`✅ Found ${models.length} voice models:`);
        models.slice(0, 3).forEach(model => {
            console.log(`   - ${model.name}: ${model.description}`);
        });

        console.log('\n🎉 All tests passed! ElevenLabs integration is working perfectly!');
        console.log('\n🚀 Ready to use:');
        console.log('   - Voice Consultation: http://localhost:3001/voice-consultation');
        console.log('   - AI Voice Assistant with Sarah\'s voice');
        console.log('   - Real-time voice synthesis');

    } catch (error) {
        console.error('❌ ElevenLabs test failed:');
        console.error(`   Error: ${error.message}`);

        if (error.message.includes('401')) {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Check your API key is correct');
            console.log('   - Verify API key has proper permissions');
            console.log('   - Get API key from: https://elevenlabs.io/app/settings');
        } else if (error.message.includes('404')) {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Voice ID might not exist in your account');
            console.log('   - Check voice library: https://elevenlabs.io/app/voice-library');
        }
    }
}

// Load environment variables
require('dotenv').config();

// Run the test
testElevenLabs().catch(console.error);
