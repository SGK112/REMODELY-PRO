const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function makeTestCall() {
    try {
        console.log('🔊 Initiating test voice call...');
        console.log(`📞 From: ${process.env.TWILIO_PHONE_NUMBER}`);
        console.log(`📞 To: 480-255-5887`);

        const call = await client.calls.create({
            to: '+14802555887', // Target number
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
            twiml: `
        <Response>
          <Say voice="alice">
            Hello! This is a test call from REMODELY AI. 
            Your renovation marketplace platform is working correctly.
            This call was made to test the voice integration.
            Thank you for testing REMODELY AI!
          </Say>
          <Pause length="2"/>
          <Say voice="alice">
            Have a great day! Goodbye.
          </Say>
        </Response>
      `
        });

        console.log('✅ Call initiated successfully!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`📋 Call Status: ${call.status}`);
        console.log(`📋 Call Direction: ${call.direction}`);
        console.log(`💰 Call Price: ${call.price || 'Calculating...'}`);

        // Wait a moment and check call status
        setTimeout(async () => {
            try {
                const updatedCall = await client.calls(call.sid).fetch();
                console.log('\n📊 Call Status Update:');
                console.log(`📋 Status: ${updatedCall.status}`);
                console.log(`⏱️  Duration: ${updatedCall.duration || 'In progress'} seconds`);
                console.log(`💰 Price: ${updatedCall.price || 'Calculating...'} ${updatedCall.priceUnit || ''}`);
            } catch (error) {
                console.log('ℹ️  Call status check failed (call may still be in progress)');
            }
        }, 5000);

    } catch (error) {
        console.error('❌ Error making call:', error.message);

        if (error.code === 21614) {
            console.log('⚠️  This number may not be verified for outbound calls');
            console.log('💡 In Twilio trial mode, you can only call verified numbers');
        } else if (error.code === 21211) {
            console.log('⚠️  Invalid phone number format');
        } else if (error.code === 20003) {
            console.log('⚠️  Authentication failed - check your Twilio credentials');
        }

        console.log('\n🔍 Troubleshooting:');
        console.log('1. Make sure the target number is verified in your Twilio console (if using trial account)');
        console.log('2. Check that your Twilio credentials are correct');
        console.log('3. Ensure your Twilio account has sufficient balance');
    }
}

// Test Twilio configuration first
console.log('🔧 Testing Twilio Configuration...');
console.log(`Account SID: ${process.env.TWILIO_ACCOUNT_SID ? 'Set ✅' : 'Missing ❌'}`);
console.log(`Auth Token: ${process.env.TWILIO_AUTH_TOKEN ? 'Set ✅' : 'Missing ❌'}`);
console.log(`Phone Number: ${process.env.TWILIO_PHONE_NUMBER || 'Missing ❌'}`);

if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    console.error('❌ Missing Twilio configuration. Please check your .env file.');
    process.exit(1);
}

console.log('\n🚀 Starting call test...\n');
makeTestCall();
