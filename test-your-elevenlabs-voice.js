/**
 * 🎤 ElevenLabs Voice Integration Test
 * Tests your specific voice ID: tQbs4WJdeIOdank6mubQ
 */

const { ElevenLabsService } = require('./lib/elevenLabsService.ts');

async function testYourElevenLabsVoice() {
    console.log('🎤 Testing ElevenLabs Voice Integration...');
    console.log('Voice ID:', 'tQbs4WJdeIOdank6mubQ');

    try {
        const elevenLabs = ElevenLabsService.getInstance();

        // Test message for contractor consultation
        const testMessage = `Hello! I'm Sarah, your AI renovation consultant. I understand you're interested in kitchen remodeling. Let me help you find the perfect contractor for your project. What specific areas of your kitchen are you looking to update?`;

        console.log('🗣️ Generating speech with your voice...');
        console.log('Text:', testMessage.substring(0, 100) + '...');

        // Generate speech with your voice ID
        const audioBase64 = await elevenLabs.generateSpeech(
            testMessage,
            'tQbs4WJdeIOdank6mubQ', // Your voice ID
            {
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.75,
                    style: 0.0,
                    use_speaker_boost: true
                },
                output_format: 'mp3_44100_128'
            }
        );

        console.log('✅ Speech generated successfully!');
        console.log('📊 Audio data length:', audioBase64.length, 'characters');
        console.log('🔊 Audio format: MP3, 44.1kHz, 128kbps');

        // You could save this to a file for testing:
        // const fs = require('fs');
        // const audioBuffer = Buffer.from(audioBase64, 'base64');
        // fs.writeFileSync('./test-voice-output.mp3', audioBuffer);
        // console.log('🎵 Audio saved to test-voice-output.mp3');

        return true;

    } catch (error) {
        console.error('❌ Error testing ElevenLabs voice:', error);

        if (error.message.includes('API key')) {
            console.log('\n🔑 You need to add your ElevenLabs API key to .env:');
            console.log('1. Go to https://elevenlabs.io/app/settings');
            console.log('2. Copy your API key');
            console.log('3. Add to .env: ELEVENLABS_API_KEY="sk_..."');
        }

        if (error.message.includes('voice')) {
            console.log('\n🎤 Voice ID issue:');
            console.log('- Your voice ID: tQbs4WJdeIOdank6mubQ');
            console.log('- Make sure this voice is available in your ElevenLabs account');
        }

        return false;
    }
}

async function testVoiceConsultationIntegration() {
    console.log('\n🏠 Testing Voice Consultation Integration...');

    try {
        // Simulate what happens in voice consultation
        const consultationScenarios = [
            {
                context: 'Kitchen Remodeling',
                message: 'Hi! I see you\'re interested in kitchen remodeling. What\'s your current kitchen layout like, and what changes are you hoping to make?'
            },
            {
                context: 'Bathroom Renovation',
                message: 'Great choice on bathroom renovation! Are you looking at a full remodel or specific updates like fixtures, tile, or vanity replacement?'
            },
            {
                context: 'Contractor Matching',
                message: 'Based on your project details, I\'ve found 3 highly-rated contractors in your area. Would you like me to tell you about their specialties and availability?'
            }
        ];

        const elevenLabs = ElevenLabsService.getInstance();

        for (const scenario of consultationScenarios) {
            console.log(`\n📞 Scenario: ${scenario.context}`);
            console.log(`💬 Message: ${scenario.message.substring(0, 80)}...`);

            // In real app, this would generate audio for immediate playback
            const audioData = await elevenLabs.generateSpeech(
                scenario.message,
                'tQbs4WJdeIOdank6mubQ',
                {
                    optimize_streaming_latency: 1, // Faster for real-time
                    output_format: 'mp3_22050_32' // Lower quality for faster streaming
                }
            );

            console.log(`✅ Audio generated (${audioData.length} chars) - Ready for playback`);
        }

        console.log('\n🎯 Voice consultation integration ready!');
        return true;

    } catch (error) {
        console.error('❌ Voice consultation test failed:', error);
        return false;
    }
}

// Run the tests
async function runAllTests() {
    console.log('🚀 Starting ElevenLabs Integration Tests...\n');

    const voiceTest = await testYourElevenLabsVoice();
    const consultationTest = await testVoiceConsultationIntegration();

    console.log('\n📊 Test Results:');
    console.log(`🎤 Voice Generation: ${voiceTest ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`📞 Voice Consultation: ${consultationTest ? '✅ PASSED' : '❌ FAILED'}`);

    if (voiceTest && consultationTest) {
        console.log('\n🎉 All tests passed! Your ElevenLabs voice is ready to use.');
        console.log('\n🔧 Next steps:');
        console.log('1. Add your ElevenLabs API key to .env');
        console.log('2. Your voice ID is already configured: tQbs4WJdeIOdank6mubQ');
        console.log('3. Test voice consultation at: http://localhost:3001/voice-consultation');
    } else {
        console.log('\n🔧 Setup needed:');
        console.log('1. Get your ElevenLabs API key from https://elevenlabs.io/app/settings');
        console.log('2. Add to .env: ELEVENLABS_API_KEY="sk_..."');
        console.log('3. Run this test again');
    }
}

// Export for use in other files
module.exports = {
    testYourElevenLabsVoice,
    testVoiceConsultationIntegration,
    runAllTests
};

// Run if called directly
if (require.main === module) {
    runAllTests().catch(console.error);
}
