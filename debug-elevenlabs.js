// Debug ElevenLabs API issue
require('dotenv').config();

async function debugElevenLabsAPI() {
    console.log('🔍 Debugging ElevenLabs API Issue...\n');

    const apiKey = process.env.ELEVENLABS_API_KEY;

    console.log('🔧 Detailed Debug Info:');
    console.log(`API Key length: ${apiKey?.length || 0}`);
    console.log(`API Key format: ${apiKey?.startsWith('sk_') ? 'Correct (sk_...)' : 'Wrong format'}`);
    console.log(`API Key preview: ${apiKey?.substring(0, 10)}...${apiKey?.substring(-10)}`);
    console.log();

    // Test different endpoints
    const endpoints = [
        { name: 'User Info', url: 'https://api.elevenlabs.io/v1/user' },
        { name: 'Voices', url: 'https://api.elevenlabs.io/v1/voices' },
        { name: 'Models', url: 'https://api.elevenlabs.io/v1/models' }
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`🧪 Testing ${endpoint.name}...`);

            const response = await fetch(endpoint.url, {
                headers: {
                    'xi-api-key': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`   Status: ${response.status} ${response.statusText}`);

            if (response.ok) {
                const data = await response.json();
                console.log(`   ✅ Success! Response: ${JSON.stringify(data, null, 2).substring(0, 200)}...`);
                break; // If one succeeds, API key is working
            } else {
                const errorText = await response.text();
                console.log(`   ❌ Error: ${errorText}`);
            }

        } catch (error) {
            console.log(`   ❌ Request failed: ${error.message}`);
        }
        console.log();
    }

    // Additional troubleshooting
    console.log('💡 Troubleshooting Tips:');
    console.log('1. Make sure you copied the ENTIRE API key');
    console.log('2. Check if your ElevenLabs account is active');
    console.log('3. Verify the API key hasn\'t expired');
    console.log('4. Try regenerating the API key at: https://elevenlabs.io/app/settings');
    console.log('5. Make sure your account has API access enabled');
}

debugElevenLabsAPI();
