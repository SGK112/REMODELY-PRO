// Simple ElevenLabs API test
require('dotenv').config();

async function testElevenLabsAPI() {
    console.log('🎤 Testing ElevenLabs Integration...\n');

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;

    console.log('📋 Configuration Check:');
    console.log(`✅ Voice ID (Sarah): ${voiceId}`);
    console.log(`✅ API Key: ${apiKey ? 'Present (' + apiKey.substring(0, 8) + '...)' : 'Missing'}\n`);

    if (!apiKey || apiKey.includes('your-')) {
        console.log('❌ API Key not configured!');
        return;
    }

    try {
        // Test 1: Check API connection
        console.log('🔍 Test 1: Checking API connection...');
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
            headers: {
                'xi-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`✅ API connected! Found ${data.voices?.length || 0} voices available\n`);

        // Test 2: Find Sarah's voice
        console.log('👩 Test 2: Checking Sarah\'s voice...');
        const sarahVoice = data.voices?.find(v => v.voice_id === voiceId);

        if (sarahVoice) {
            console.log(`✅ Sarah's voice found!`);
            console.log(`   Name: ${sarahVoice.name}`);
            console.log(`   Category: ${sarahVoice.category}`);
            console.log(`   Description: ${sarahVoice.description || 'N/A'}\n`);
        } else {
            console.log(`❌ Sarah's voice (${voiceId}) not found in your account`);
            console.log('Available voices:');
            data.voices?.slice(0, 5).forEach(voice => {
                console.log(`   - ${voice.name} (${voice.voice_id})`);
            });
            console.log('\n');
        }

        // Test 3: Generate sample audio
        console.log('🎵 Test 3: Generating sample audio with Sarah\'s voice...');
        const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: "Hello! I'm Sarah from Remodely AI. I'm ready to help you with your home renovation project!",
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        });

        if (ttsResponse.ok) {
            const audioBuffer = await ttsResponse.arrayBuffer();
            console.log(`✅ Audio generated successfully!`);
            console.log(`   Audio size: ${audioBuffer.byteLength} bytes`);
            console.log(`   You can save this as an MP3 file to test the voice\n`);
        } else {
            const errorText = await ttsResponse.text();
            console.log(`❌ Audio generation failed: ${ttsResponse.status} ${errorText}\n`);
        }

        console.log('🎉 ElevenLabs integration test completed!');
        console.log('\n🚀 Ready to use:');
        console.log('   - Voice Consultation: http://localhost:3001/voice-consultation');
        console.log('   - AI Voice Assistant with Sarah\'s voice');
        console.log('   - Text-to-speech with unlimited credits');

    } catch (error) {
        console.error('❌ Test failed:', error.message);

        if (error.message.includes('401')) {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - API key might be invalid or expired');
            console.log('   - Check your API key at: https://elevenlabs.io/app/settings');
        }
    }
}

testElevenLabsAPI();
