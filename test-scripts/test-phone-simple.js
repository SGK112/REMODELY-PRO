const twilio = require('twilio')

async function testPhoneVerification() {
    console.log('🔧 Testing Phone Verification System')
    console.log('====================================\n')

    const phoneNumber = '+14802555887'

    try {
        console.log('🔑 Initializing Twilio client...')

        // Initialize Twilio client with environment variables
        const client = twilio(
            process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        )

        console.log(`📱 Sending verification code to ${phoneNumber}...`)

        // Send verification using Twilio Verify
        const verification = await client.verify.v2
            .services('VAf75d22e82e4abf9579fe1455c73835f9')
            .verifications
            .create({ to: phoneNumber, channel: 'sms' })

        console.log('✅ Verification code sent successfully!')
        console.log(`📋 SID: ${verification.sid}`)
        console.log(`🎯 Status: ${verification.status}`)
        console.log(`📅 Date Created: ${verification.dateCreated}`)
        console.log(`🔢 To: ${verification.to}`)

        console.log('\n📨 Check your phone for the verification code!')
        console.log('\n🔢 Once you receive the code, you can:')
        console.log('   1. Use the admin dashboard to verify it')
        console.log('   2. Or provide the code here for verification test')

    } catch (error) {
        console.error('💥 Error testing phone verification:', error.message)
        if (error.code) {
            console.error(`🔴 Error Code: ${error.code}`)
        }
        if (error.moreInfo) {
            console.error(`ℹ️  More Info: ${error.moreInfo}`)
        }
    }
}

// Run the test
testPhoneVerification()
