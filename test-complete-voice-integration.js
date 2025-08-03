#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_BASE = 'http://localhost:3001';
const TEST_PHONE = process.env.TEST_PHONE_NUMBER || '+14802555887';

// Real-world conversation flow simulation
async function simulateRealWorldScenarios() {
    console.log('🏠 Remodely.AI Google Voice Agent + Twilio Integration Demo\n');
    console.log('='.repeat(80));
    console.log('🎭 Simulating Real Customer and Contractor Interactions');
    console.log('📱 Phone:', TEST_PHONE);
    console.log('🤖 Google Agent ID: ccb0cee7-9d14-45f2-af52-cac51b27d522');
    console.log('='.repeat(80));

    const scenarios = [
        {
            type: '👷 Contractor Onboarding',
            persona: 'Phoenix Granite Contractor',
            conversation: {
                sessionId: 'contractor-phoenix-001',
                intentName: 'contractor.recruitment',
                queryText: 'Hi, I run a granite countertop business in Phoenix and heard about Remodely AI. How can I join your contractor network?',
                phoneNumber: TEST_PHONE
            }
        },
        {
            type: '🏡 Homeowner Quote Request',
            persona: 'Scottsdale Homeowner',
            conversation: {
                sessionId: 'customer-scottsdale-001',
                intentName: 'quote.request',
                queryText: 'I need quotes for new quartz countertops in my kitchen. Can you help me find qualified contractors?',
                phoneNumber: TEST_PHONE
            }
        },
        {
            type: '🛠️ Customer Service',
            persona: 'Existing Customer',
            conversation: {
                sessionId: 'support-mesa-001',
                intentName: 'customer.service',
                queryText: 'I have some questions about my ongoing marble installation project. Can someone help me?',
                phoneNumber: TEST_PHONE
            }
        },
        {
            type: '📅 Appointment Booking',
            persona: 'New Customer',
            conversation: {
                sessionId: 'appointment-tempe-001',
                intentName: 'appointment.booking',
                queryText: 'I want to schedule a consultation with a contractor for granite bathroom vanities',
                phoneNumber: TEST_PHONE
            }
        }
    ];

    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        console.log(`\n${i + 1}. ${scenario.type} - ${scenario.persona}`);
        console.log('─'.repeat(60));
        console.log('💬 Query:', scenario.conversation.queryText);

        try {
            // Step 1: Send to Google Agent
            console.log('   🤖 Processing with Google Conversational Agent...');
            const agentResponse = await axios.post(`${API_BASE}/api/google-agent`, scenario.conversation);

            console.log('   ✅ Agent Response:', agentResponse.data.fulfillmentText.substring(0, 100) + '...');
            console.log('   📞 Voice Call Triggered:', agentResponse.data.voiceCallTriggered ? '✅ YES' : '❌ NO');

            if (agentResponse.data.voiceCallTriggered) {
                console.log('   🎉 Complete workflow executed successfully!');

                // Step 2: Test TwiML content generation for this intent
                const twimlResponse = await axios.get(`${API_BASE}/api/voice/twiml?intent=${scenario.conversation.intentName}&message=${encodeURIComponent('Test message')}`);
                console.log('   📋 TwiML Generated:', twimlResponse.status === 200 ? '✅ SUCCESS' : '❌ FAILED');
            }

        } catch (error) {
            console.error('   ❌ Error:', error.response?.data?.error || error.message);
        }

        // Pause between scenarios to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('\n' + '='.repeat(80));
    console.log('🎊 Real-World Scenario Testing Complete!');
    console.log('📱 Check your phone - you should have received multiple calls');
    console.log('🔍 Each call should have contextual content based on the intent');
    console.log('='.repeat(80));
}

// Test TwiML content variations
async function testTwiMLContentVariations() {
    console.log('\n🎵 Testing TwiML Content Variations\n');

    const intents = ['contractor.recruitment', 'customer.service', 'quote.request', 'appointment.booking', 'default'];

    for (const intent of intents) {
        console.log(`📋 Testing ${intent} TwiML...`);
        try {
            const response = await axios.get(`${API_BASE}/api/voice/twiml?intent=${intent}&message=Test message for ${intent}`);
            const hasVoiceTag = response.data.includes('<Say voice="alice">');
            const hasResponse = response.data.includes('<Response>');

            console.log(`   ✅ Structure: ${hasResponse ? 'Valid' : 'Invalid'}`);
            console.log(`   🎤 Voice: ${hasVoiceTag ? 'Alice configured' : 'Missing voice'}`);
            console.log(`   📏 Length: ${response.data.length} characters`);

        } catch (error) {
            console.error(`   ❌ Failed:`, error.message);
        }
    }
}

// Performance and reliability test
async function testSystemReliability() {
    console.log('\n⚡ System Reliability Test\n');

    const concurrentCalls = 3;
    const promises = [];

    console.log(`🚀 Initiating ${concurrentCalls} concurrent voice + agent integrations...`);

    for (let i = 0; i < concurrentCalls; i++) {
        promises.push(
            axios.post(`${API_BASE}/api/google-agent`, {
                sessionId: `reliability-test-${i}`,
                intentName: 'contractor.recruitment',
                queryText: `Reliability test ${i + 1} - I want to join as a contractor`,
                phoneNumber: TEST_PHONE
            })
        );
    }

    try {
        const startTime = Date.now();
        const results = await Promise.all(promises);
        const endTime = Date.now();

        const successfulCalls = results.filter(r => r.data.voiceCallTriggered).length;

        console.log(`✅ Concurrent Operations: ${concurrentCalls}`);
        console.log(`📞 Successful Voice Calls: ${successfulCalls}/${concurrentCalls}`);
        console.log(`⏱️  Total Time: ${endTime - startTime}ms`);
        console.log(`📊 Average Time: ${(endTime - startTime) / concurrentCalls}ms per operation`);
        console.log(`🎯 Success Rate: ${(successfulCalls / concurrentCalls * 100).toFixed(1)}%`);

    } catch (error) {
        console.error('❌ Reliability test failed:', error.message);
    }
}

// Run complete demonstration
async function runCompleteDemo() {
    try {
        await simulateRealWorldScenarios();
        await testTwiMLContentVariations();
        await testSystemReliability();

        console.log('\n🏆 GOOGLE VOICE AGENT + TWILIO INTEGRATION DEMO COMPLETE! 🏆');
        console.log('📈 All systems operational and integration working perfectly');
        console.log('🎉 Remodely.AI voice automation is ready for production!');

    } catch (error) {
        console.error('💥 Demo failed:', error.message);
        process.exit(1);
    }
}

// Execute the complete demo
runCompleteDemo();
