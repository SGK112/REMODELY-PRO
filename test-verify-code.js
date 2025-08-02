const twilio = require('twilio')

async function testPhoneVerificationCode(verificationCode) {
    console.log('🔧 Testing Phone Verification Code')
    console.log('==================================\n')

    const phoneNumber = '+14802555887'

    if (!verificationCode) {
        console.log('❌ Please provide the verification code as an argument:')
        console.log('   node test-verify-code.js [6-digit-code]')
        console.log('\nExample: node test-verify-code.js 123456')
        return
    }

    try {
        console.log('🔑 Initializing Twilio client...')

        // Initialize Twilio client with environment variables
        const client = twilio(
            process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        )

        console.log(`🔢 Verifying code "${verificationCode}" for ${phoneNumber}...`)

        // Verify the code using Twilio Verify
        const verificationCheck = await client.verify.v2
            .services('VAf75d22e82e4abf9579fe1455c73835f9')
            .verificationChecks
            .create({ to: phoneNumber, code: verificationCode })

        console.log('✅ Verification check completed!')
        console.log(`📋 SID: ${verificationCheck.sid}`)
        console.log(`🎯 Status: ${verificationCheck.status}`)
        console.log(`📅 Date Created: ${verificationCheck.dateCreated}`)
        console.log(`🔢 To: ${verificationCheck.to}`)
        console.log(`✔️  Valid: ${verificationCheck.valid}`)

        if (verificationCheck.status === 'approved') {
            console.log('\n🎉 SUCCESS! Phone number verified successfully!')
            console.log('✅ The Twilio Verify system is working perfectly!')
        } else {
            console.log('\n❌ Verification failed')
            console.log(`Status: ${verificationCheck.status}`)
        }

    } catch (error) {
        console.error('💥 Error verifying phone:', error.message)
        if (error.code) {
            console.error(`🔴 Error Code: ${error.code}`)
        }
        if (error.moreInfo) {
            console.error(`ℹ️  More Info: ${error.moreInfo}`)
        }

        if (error.code === 20404) {
            console.log('\n💡 This might mean:')
            console.log('   - The verification code has expired')
            console.log('   - You need to send a new verification code first')
            console.log('   - The code was already used')
        }
    }
}

// Get verification code from command line arguments
const verificationCode = process.argv[2]
testPhoneVerificationCode(verificationCode)
