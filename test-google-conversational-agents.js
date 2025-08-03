#!/usr/bin/env node

/**
 * Test Google Conversational Agents Integration
 * Tests the webhook integration with Remodely Pro Design Assistant
 * Agent ID: ccb0cee7-9d14-45f2-af52-cac51b27d522
 */

require('dotenv').config();

const testWebhookIntegration = async () => {
    console.log('🤖 Testing Google Conversational Agents Integration');
    console.log('═══════════════════════════════════════════════════');

    const baseUrl = 'http://localhost:3001/api/google-agent';

    // Test 1: Health Check
    console.log('\n📊 Test 1: Health Check');
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log('✅ Health check passed:', data.status);
        console.log('🤖 Agent ID:', data.agentId);
        console.log('📍 Location:', data.location);
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
    }

    // Test 2: Contractor Recruitment Intent
    console.log('\n👷 Test 2: Contractor Recruitment');
    try {
        const contractorPayload = {
            sessionId: 'test-session-contractor-001',
            queryText: 'I want to join as a contractor',
            intentName: 'contractor.recruitment',
            parameters: {
                businessName: "Elite Stone Works",
                location: "Phoenix, AZ",
                specialty: "granite countertops"
            },
            fulfillmentText: 'Looking to expand my business',
            phoneNumber: process.env.TEST_PHONE_NUMBER || '+14802555887',
            userType: 'contractor'
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contractorPayload)
        });

        const data = await response.json();
        console.log('✅ Contractor recruitment response:', data.fulfillmentText);
        console.log('🎯 Follow-up action:', data.followupAction);
    } catch (error) {
        console.log('❌ Contractor recruitment failed:', error.message);
    }

    // Test 3: Customer Service Intent
    console.log('\n🏠 Test 3: Customer Service');
    try {
        const customerPayload = {
            sessionId: 'test-session-customer-001',
            queryText: 'I need new kitchen countertops',
            intentName: 'customer.service',
            parameters: {
                customerName: "Sarah Johnson",
                projectType: "kitchen renovation",
                location: "Scottsdale, AZ",
                budget: "$5000-8000"
            },
            fulfillmentText: 'Need countertop installation',
            phoneNumber: process.env.TEST_PHONE_NUMBER || '+14802555887',
            userType: 'customer'
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerPayload)
        });

        const data = await response.json();
        console.log('✅ Customer service response:', data.fulfillmentText);
        console.log('🎯 Follow-up action:', data.followupAction);
    } catch (error) {
        console.log('❌ Customer service failed:', error.message);
    }

    // Test 4: Quote Request Intent
    console.log('\n💰 Test 4: Quote Request');
    try {
        const quotePayload = {
            sessionId: 'test-session-quote-001',
            queryText: 'I need quotes for granite countertops',
            intentName: 'quote.request',
            parameters: {
                projectType: "granite countertops",
                squareFootage: "45",
                material: "granite",
                timeline: "within 3 weeks"
            },
            fulfillmentText: 'Need multiple quotes'
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quotePayload)
        });

        const data = await response.json();
        console.log('✅ Quote request response:', data.fulfillmentText);
        console.log('🎯 Follow-up action:', data.followupAction);
    } catch (error) {
        console.log('❌ Quote request failed:', error.message);
    }

    // Test 5: Appointment Booking Intent
    console.log('\n📅 Test 5: Appointment Booking');
    try {
        const appointmentPayload = {
            sessionId: 'test-session-appointment-001',
            queryText: 'Schedule a consultation',
            intentName: 'appointment.booking',
            parameters: {
                appointmentType: "in-home consultation",
                preferredDate: "this Friday afternoon",
                contactInfo: "sarah.johnson@email.com"
            },
            fulfillmentText: 'Want to schedule consultation'
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentPayload)
        });

        const data = await response.json();
        console.log('✅ Appointment booking response:', data.fulfillmentText);
        console.log('🎯 Follow-up action:', data.followupAction);
    } catch (error) {
        console.log('❌ Appointment booking failed:', error.message);
    }

    // Test 6: Unknown Intent (Default Handler)
    console.log('\n❓ Test 6: Unknown Intent');
    try {
        const unknownPayload = {
            sessionId: 'test-session-unknown-001',
            queryText: 'What is the weather today?',
            intentName: 'unknown.intent',
            parameters: {},
            fulfillmentText: 'Random question'
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unknownPayload)
        });

        const data = await response.json();
        console.log('✅ Unknown intent response:', data.fulfillmentText);
        console.log('🎯 Follow-up action:', data.followupAction);
    } catch (error) {
        console.log('❌ Unknown intent failed:', error.message);
    }

    console.log('\n🎉 Google Conversational Agents Integration Test Complete!');
    console.log('\n📋 Integration Summary:');
    console.log('  • Agent URL: https://conversational-agents.cloud.google.com/projects/remodely-pro-design-assistant/locations/us-central1/agents/ccb0cee7-9d14-45f2-af52-cac51b27d522');
    console.log('  • Webhook URL: http://localhost:3001/api/google-agent');
    console.log('  • Supported Intents: contractor.recruitment, customer.service, quote.request, appointment.booking');
    console.log('  • Voice Integration: Twilio follow-up calls enabled');
    console.log('  • Context Management: Session-based conversation flow');

    console.log('\n🔧 Next Steps:');
    console.log('  1. Configure the webhook URL in Google Conversational Agents console');
    console.log('  2. Train intents with more variations in the Google Agent simulator');
    console.log('  3. Test real conversations using the simulator interface');
    console.log('  4. Deploy webhook to production environment');
    console.log('  5. Monitor conversation analytics and optimize responses');
};

// Run the test
testWebhookIntegration().catch(console.error);
