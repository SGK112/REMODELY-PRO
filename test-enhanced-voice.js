require('dotenv').config({ path: '.env.local' });
const { EnhancedTwilioService } = require('./lib/enhanced-twilio.js');

async function testEnhancedVoice() {
    console.log('🧪 Testing Enhanced Twilio Voice Service');
    console.log('='.repeat(50));

    const service = new EnhancedTwilioService();

    // Test phone number formatting
    const testNumbers = ['+1234567890', '1234567890', '(123) 456-7890'];
    console.log('\n📞 Testing phone number formatting:');
    testNumbers.forEach(num => {
        const formatted = service.formatPhoneNumber(num);
        console.log(`  ${num} → ${formatted}`);
    });

    // Test inline TwiML approach
    console.log('\n🎯 Testing inline TwiML voice call:');
    try {
        const result = await service.makeVoiceCallInlineTwiML(
            '+14155552671', // Twilio verified test number
            'Hello from Enhanced Twilio Service! This is a test of the inline TwiML approach.',
            'alice'
        );
        console.log('  ✅ Inline TwiML call result:', result);
    } catch (error) {
        console.error('  ❌ Inline TwiML call failed:', error.message);
    }

    // Test comprehensive call (inline since we don't have TwiML App SID yet)
    console.log('\n🚀 Testing comprehensive voice call:');
    try {
        const result = await service.makeComprehensiveVoiceCall(
            '+14155552671',
            'Hello from the comprehensive voice call method! This demonstrates our enhanced service.',
            'woman'
        );
        console.log('  ✅ Comprehensive call result:', result);
    } catch (error) {
        console.error('  ❌ Comprehensive call failed:', error.message);
    }

    console.log('\n✨ Enhanced voice service test complete!');
}

// Run the test
testEnhancedVoice().catch(console.error);
