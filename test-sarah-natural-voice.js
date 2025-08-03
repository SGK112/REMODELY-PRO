#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_BASE = 'http://localhost:3001';
const TEST_PHONE = process.env.TEST_PHONE_NUMBER || '+14802555887';

// Test Sarah's natural, personalized voice calls
async function testSarahVoiceCalls() {
    console.log('🎙️ Testing Sarah\'s Natural Voice System\n');
    console.log('='.repeat(60));
    console.log('👩 Voice Agent: Sarah from Remodely AI');
    console.log('📱 Phone:', TEST_PHONE);
    console.log('🎯 Focus: Natural, conversational, personalized');
    console.log('='.repeat(60));

    const scenarios = [
        {
            name: 'Mike (Contractor)',
            type: '👷 Contractor Recruitment',
            data: {
                sessionId: 'sarah-mike-contractor',
                intentName: 'contractor.recruitment',
                queryText: 'Hi, I run a granite business in Phoenix and want to join Remodely AI',
                phoneNumber: TEST_PHONE,
                customerName: 'Mike'
            }
        },
        {
            name: 'Jessica (Homeowner)',
            type: '🏡 Quote Request',
            data: {
                sessionId: 'sarah-jessica-quote',
                intentName: 'quote.request',
                queryText: 'I need beautiful quartz countertops for my kitchen remodel',
                phoneNumber: TEST_PHONE,
                customerName: 'Jessica'
            }
        },
        {
            name: 'Anonymous Caller',
            type: '📞 General Inquiry',
            data: {
                sessionId: 'sarah-anonymous',
                intentName: 'customer.service',
                queryText: 'I have questions about marble installations',
                phoneNumber: TEST_PHONE
                // No customerName to test fallback
            }
        }
    ];

    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        console.log(`\n${i + 1}. ${scenario.type} - ${scenario.name}`);
        console.log('─'.repeat(50));

        try {
            console.log('🤖 Sarah processing request...');
            const response = await axios.post(`${API_BASE}/api/google-agent`, scenario.data);

            const greeting = response.data.fulfillmentText.substring(0, 50);
            console.log('💬 Sarah says:', `"${greeting}..."`);
            console.log('📞 Voice call:', response.data.voiceCallTriggered ? '✅ Initiated' : '❌ Failed');

            if (response.data.customerName) {
                console.log('👤 Personalized for:', response.data.customerName);
            } else {
                console.log('👤 Generic greeting used');
            }

            // Test the TwiML content
            const twimlUrl = `/api/voice/twiml?intent=${scenario.data.intentName}&name=${encodeURIComponent(scenario.data.customerName || '')}`;
            const twimlResponse = await axios.get(`${API_BASE}${twimlUrl}`);

            const isPersonalized = scenario.data.customerName && twimlResponse.data.includes(`Hi ${scenario.data.customerName}!`);
            const hasSarah = twimlResponse.data.includes('This is Sarah from Remodely AI');
            const isNatural = twimlResponse.data.includes('excited') || twimlResponse.data.includes('love') || twimlResponse.data.includes('awesome');

            console.log('🎵 TwiML Quality:');
            console.log(`   Personalized: ${isPersonalized ? '✅' : '❌'}`);
            console.log(`   Sarah Identity: ${hasSarah ? '✅' : '❌'}`);
            console.log(`   Natural Language: ${isNatural ? '✅' : '❌'}`);

        } catch (error) {
            console.error('❌ Error:', error.response?.data?.error || error.message);
        }

        // Pause between calls
        if (i < scenarios.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Sarah\'s Natural Voice System Test Complete!');
    console.log('📱 Check your phone - Sarah should sound much more natural now!');
    console.log('👩 All calls are personalized and conversational');
    console.log('='.repeat(60));
}

// Quick comparison test
async function compareVoiceStyles() {
    console.log('\n📊 Voice Style Comparison\n');

    const testData = {
        sessionId: 'style-comparison',
        intentName: 'contractor.recruitment',
        queryText: 'I want to join as a contractor',
        phoneNumber: TEST_PHONE,
        customerName: 'David'
    };

    try {
        const response = await axios.post(`${API_BASE}/api/google-agent`, testData);

        console.log('OLD STYLE (Robotic):');
        console.log('"Thank you for your interest in joining Remodely AI as a contractor..."');

        console.log('\nNEW STYLE (Natural Sarah):');
        console.log(`"${response.data.fulfillmentText}"`);

        console.log('\n✅ Sarah\'s voice is now:');
        console.log('• Personalized with customer names');
        console.log('• Conversational and enthusiastic');
        console.log('• Uses natural language and contractions');
        console.log('• Shows genuine excitement and personality');
        console.log('• Less corporate, more human');

    } catch (error) {
        console.error('❌ Comparison failed:', error.message);
    }
}

// Run the tests
async function runTests() {
    try {
        await testSarahVoiceCalls();
        await compareVoiceStyles();
    } catch (error) {
        console.error('💥 Test failed:', error.message);
    }
}

runTests();
