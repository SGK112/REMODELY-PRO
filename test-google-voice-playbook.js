#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_BASE = 'http://localhost:3001';
const TEST_PHONE = process.env.TEST_PHONE_NUMBER || '+14802555887';

// Test scenarios for Google Voice Agent + Twilio integration
const testScenarios = [
    {
        name: "Contractor Recruitment Call",
        intent: "contractor.recruitment",
        message: "I want to join as a contractor",
        expectedAction: "voice_call_contractor"
    },
    {
        name: "Customer Service Call",
        intent: "customer.service",
        message: "I need help with my project",
        expectedAction: "voice_call_customer"
    },
    {
        name: "Quote Request Call",
        intent: "quote.request",
        message: "I need a quote for granite countertops",
        expectedAction: "voice_call_quote"
    },
    {
        name: "Appointment Booking Call",
        intent: "appointment.booking",
        message: "I want to schedule an appointment",
        expectedAction: "voice_call_booking"
    }
];

async function testGoogleVoiceAgentPlaybook() {
    console.log('🎯 Testing Google Voice Agent + Twilio Integration Playbook\n');
    console.log('📱 Test Phone Number:', TEST_PHONE);
    console.log('🌐 API Base:', API_BASE);
    console.log('='.repeat(60));

    let successCount = 0;
    let totalTests = 0;

    for (const scenario of testScenarios) {
        totalTests++;
        console.log(`\n📞 Test ${totalTests}: ${scenario.name}`);
        console.log('🎙️  Intent:', scenario.intent);
        console.log('💬 Message:', scenario.message);

        try {
            // Step 1: Test Google Agent Response
            console.log('   🤖 Step 1: Testing Google Agent...');
            const agentResponse = await axios.post(`${API_BASE}/api/google-agent`, {
                sessionId: `test-session-${Date.now()}`,
                intentName: scenario.intent,
                queryText: scenario.message,
                phoneNumber: TEST_PHONE
            });

            console.log('   ✅ Agent Response:', agentResponse.data.fulfillmentText.substring(0, 80) + '...');

            // Step 2: Test if agent triggers voice call
            if (agentResponse.data.followupAction === 'voice_call' || agentResponse.data.triggerVoiceCall) {
                console.log('   📞 Step 2: Agent triggered voice call...');

                // Simulate the voice call that would be triggered
                const voiceResponse = await axios.post(`${API_BASE}/api/voice/test`, {
                    to: TEST_PHONE,
                    message: agentResponse.data.fulfillmentText
                });

                console.log('   ✅ Voice call initiated - SID:', voiceResponse.data.callSid);
                successCount++;
            } else {
                console.log('   ⚠️  Agent did not trigger voice call');
            }

            console.log('   🎉 Test passed!');

        } catch (error) {
            console.error('   ❌ Test failed:', error.response?.data?.error || error.message);
        }

        // Wait between tests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Test Results: ${successCount}/${totalTests} tests passed`);

    if (successCount === totalTests) {
        console.log('🎉 All Google Voice Agent + Twilio integration tests passed!');
        console.log('📱 Check your phone for the test calls!');
    } else {
        console.log('⚠️  Some tests failed. Check the logs above for details.');
    }
}

// Advanced integration test
async function testAdvancedIntegration() {
    console.log('\n🚀 Advanced Integration Test: Full Conversation Flow\n');

    try {
        // Simulate a full conversation flow
        const conversationFlow = [
            {
                step: 1,
                action: 'Initial contact via Google Agent',
                request: {
                    sessionId: 'advanced-test-session',
                    intentName: 'contractor.recruitment',
                    queryText: 'Hi, I am a granite contractor in Phoenix and want to join Remodely AI',
                    phoneNumber: TEST_PHONE
                }
            },
            {
                step: 2,
                action: 'Follow-up voice call',
                phoneMessage: 'Welcome to Remodely AI! Based on your interest in joining as a contractor, we will now call you to complete your registration.'
            }
        ];

        for (const step of conversationFlow) {
            console.log(`Step ${step.step}: ${step.action}`);

            if (step.request) {
                // Google Agent interaction
                const agentResponse = await axios.post(`${API_BASE}/api/google-agent`, step.request);
                console.log('🤖 Agent says:', agentResponse.data.fulfillmentText);

                // Trigger follow-up voice call
                if (agentResponse.data.followupAction === 'voice_call' || step.step === 1) {
                    const voiceCall = await axios.post(`${API_BASE}/api/voice/test`, {
                        to: TEST_PHONE,
                        message: step.phoneMessage || agentResponse.data.fulfillmentText
                    });
                    console.log('📞 Voice call initiated:', voiceCall.data.callSid);
                }
            }

            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        console.log('✅ Advanced integration test completed!');

    } catch (error) {
        console.error('❌ Advanced integration test failed:', error.response?.data || error.message);
    }
}

// Performance test
async function testPerformance() {
    console.log('\n⚡ Performance Test: Concurrent Requests\n');

    const concurrentRequests = 5;
    const promises = [];

    for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
            axios.post(`${API_BASE}/api/google-agent`, {
                sessionId: `perf-test-${i}`,
                intentName: 'contractor.recruitment',
                queryText: `Performance test request ${i + 1}`,
                phoneNumber: TEST_PHONE
            })
        );
    }

    try {
        const startTime = Date.now();
        const results = await Promise.all(promises);
        const endTime = Date.now();

        console.log(`✅ Processed ${concurrentRequests} concurrent requests in ${endTime - startTime}ms`);
        console.log(`📊 Average response time: ${(endTime - startTime) / concurrentRequests}ms per request`);

        // Test if all responses are valid
        const validResponses = results.filter(r => r.data.fulfillmentText).length;
        console.log(`📈 Valid responses: ${validResponses}/${concurrentRequests}`);

    } catch (error) {
        console.error('❌ Performance test failed:', error.message);
    }
}

// Run all tests
async function runAllTests() {
    try {
        await testGoogleVoiceAgentPlaybook();
        await testAdvancedIntegration();
        await testPerformance();

        console.log('\n🎊 All Google Voice Agent playbook tests completed!');
        console.log('🔍 Check your phone and server logs for detailed results.');

    } catch (error) {
        console.error('💥 Test suite failed:', error.message);
        process.exit(1);
    }
}

// Execute the test suite
runAllTests();
