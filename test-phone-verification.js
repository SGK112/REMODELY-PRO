const { TwilioService } = require('./lib/twilio.ts')

async function testPhoneVerification() {
    console.log('🔧 Testing Phone Verification System')
    console.log('====================================\n')

    const phoneNumber = '+14802555887'

    try {
        console.log(`📱 Sending verification code to ${phoneNumber}...`)

        // Test sending verification code
        const sendResult = await TwilioService.sendVerificationCode(phoneNumber, 'sms')

        if (sendResult.success) {
            console.log('✅ Verification code sent successfully!')
            console.log(`📋 SID: ${sendResult.sid}`)
            console.log(`🎯 Status: ${sendResult.status}`)
            console.log('\n📨 Check your phone for the verification code!')
            console.log('\n🔢 Once you receive the code, you can verify it through the admin dashboard')
            console.log('   or run the verification test with the code.')

            // Note: In a real scenario, you would get the code from SMS and verify it
            // For demo purposes, we're just showing the send functionality

        } else {
            console.log('❌ Failed to send verification code')
            console.log(`Error: ${sendResult.error}`)
        }

    } catch (error) {
        console.error('💥 Error testing phone verification:', error)
    }
}

// Run the test
testPhoneVerification()
