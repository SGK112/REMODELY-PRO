const twilio = require("twilio");

// Find your Account SID and Auth Token at twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID || "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const authToken = process.env.TWILIO_AUTH_TOKEN || "8038255c30b5dd76fbb4b56814f72e79";
const client = twilio(accountSid, authToken);

async function createCall() {
    try {
        console.log('🎯 Testing Remodely.AI Voice API...')
        console.log('📞 Initiating voice call...')

        const call = await client.calls.create({
            from: "+16028337194", // Your Twilio number
            to: "+14802555887",   // Test number from .env.local
            twiml: '<Response><Say voice="alice">Hello! This is a test call from Remodely.AI. Your voice API is now working correctly!</Say></Response>',
        });

        console.log('✅ Call initiated successfully!')
        console.log('📋 Call SID:', call.sid);
        console.log('📲 From:', call.from);
        console.log('📱 To:', call.to);
        console.log('⏰ Status:', call.status);

        return call;
    } catch (error) {
        console.error('❌ Voice call failed:', error.message);
        console.error('🔍 Error code:', error.code);
        console.error('💡 More info:', error.moreInfo);
        throw error;
    }
}

// Run the test
createCall()
    .then(() => {
        console.log('🎉 Voice API test completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Voice API test failed:', error.message);
        process.exit(1);
    });
