// Check the status of the recent call
require('dotenv').config();

async function checkCallStatus() {
    console.log('📊 Checking call status for SID: CA4ca12fe7d492c8ad0c9e5102eb008e2b\n');

    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        // Check the specific call
        const call = await client.calls('CA4ca12fe7d492c8ad0c9e5102eb008e2b').fetch();

        console.log('📞 Call Details:');
        console.log(`   SID: ${call.sid}`);
        console.log(`   Status: ${call.status}`);
        console.log(`   From: ${call.from}`);
        console.log(`   To: ${call.to}`);
        console.log(`   Direction: ${call.direction}`);
        console.log(`   Duration: ${call.duration || 'N/A'} seconds`);
        console.log(`   Price: ${call.price || 'N/A'}`);
        console.log(`   Date Created: ${call.dateCreated}`);
        console.log(`   Date Updated: ${call.dateUpdated}`);

        if (call.status === 'failed') {
            console.log(`\n❌ Call Failed!`);
            console.log(`   Error Code: ${call.errorCode || 'Unknown'}`);
            console.log(`   Error Message: ${call.errorMessage || 'Unknown'}`);
        } else if (call.status === 'no-answer') {
            console.log(`\n📵 Call Status: No Answer`);
            console.log('   The call was placed but not answered');
        } else if (call.status === 'busy') {
            console.log(`\n📞 Call Status: Busy`);
            console.log('   The number was busy');
        } else if (call.status === 'completed') {
            console.log(`\n✅ Call Completed Successfully!`);
            console.log(`   Duration: ${call.duration} seconds`);
        }

        // Check recent calls to see if there are any issues
        console.log('\n📋 Recent Calls (last 5):');
        const recentCalls = await client.calls.list({ limit: 5 });

        recentCalls.forEach((call, index) => {
            console.log(`   ${index + 1}. ${call.sid} - ${call.status} - ${call.to} - ${call.dateCreated}`);
        });

    } catch (error) {
        console.error('❌ Error checking call status:', error.message);
    }
}

checkCallStatus();
