#!/usr/bin/env node

const axios = require('axios');

const API_BASE = 'http://localhost:3001';
const TEST_PHONE = '+14802555887'; // From .env.local

async function testVoiceAPI() {
    console.log('🎯 Testing Remodely.AI Voice API Endpoints...\n');

    try {
        // Test 1: Basic voice test endpoint
        console.log('📞 Test 1: Testing /api/voice/test endpoint...');
        const testResponse = await axios.post(`${API_BASE}/api/voice/test`, {
            to: TEST_PHONE
        });

        console.log('✅ Test endpoint success!');
        console.log('📋 Call SID:', testResponse.data.callSid);
        console.log('📲 From:', testResponse.data.from);
        console.log('📱 To:', testResponse.data.to);
        console.log();

        // Test 2: TwiML endpoint
        console.log('📞 Test 2: Testing /api/voice/twiml endpoint...');
        const twimlResponse = await axios.get(`${API_BASE}/api/voice/twiml?message=Hello%20from%20TwiML%20test`);

        console.log('✅ TwiML endpoint success!');
        console.log('📄 TwiML Response:', twimlResponse.data);
        console.log();

        // Test 3: Try the protected voice endpoint (should fail without auth)
        console.log('📞 Test 3: Testing protected /api/voice endpoint (should fail)...');
        try {
            await axios.post(`${API_BASE}/api/voice`, {
                to: TEST_PHONE,
                message: 'This should fail due to authentication'
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('✅ Protected endpoint correctly requires authentication');
                console.log('🔒 Status:', error.response.status);
                console.log('💬 Message:', error.response.data.error);
            } else {
                throw error;
            }
        }
        console.log();

        console.log('🎉 All voice API tests completed successfully!');
        console.log('🎧 Check your phone at', TEST_PHONE, 'for the test calls!');

    } catch (error) {
        console.error('❌ Voice API test failed:');
        console.error('💥 Error:', error.message);
        if (error.response) {
            console.error('📊 Status:', error.response.status);
            console.error('📄 Data:', error.response.data);
        }
        process.exit(1);
    }
}

// Run the comprehensive test
testVoiceAPI();
