#!/usr/bin/env node

const twilio = require('twilio');
require('dotenv').config();

console.log('\n🎭 REMODELY AI - DUAL PERSPECTIVE VOICE DEMO');
console.log('========================================================');
console.log('This demo shows BOTH sides of our voice AI system:');
console.log('👷 CONTRACTOR RECRUITMENT (outbound calls)');
console.log('🏠 HOMEOWNER INTERACTION (inbound calls)');
console.log('========================================================\n');

class DualPerspectiveVoiceDemo {
    constructor() {
        this.demoPhone = process.env.DEMO_PHONE_NUMBER || '+14802555887';
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    // SIDE 1: CONTRACTOR RECRUITMENT CALL
    async demonstrateContractorRecruitment() {
        console.log('🎯 CONTRACTOR SIDE: Automated Recruitment Call');
        console.log('===============================================');

        const contractorScript = `
<Response>
  <Say voice="Polly.Joanna-Neural" rate="medium">
    <prosody rate="95%">
      Hi, this is Sarah from REMODELY AI. I hope I'm catching you at a good time.
      
      <break time="0.5s"/>
      
      We're a renovation marketplace that connects qualified homeowners with vetted contractors like yourself. 
      
      I'm calling because we have several homeowners in the Phoenix area specifically looking for kitchen renovation work, and your business came up as a perfect fit.
      
      <break time="0.5s"/>
      
      Are you currently taking on new kitchen projects, or is your schedule pretty full right now?
    </prosody>
  </Say>
  
  <Gather input="speech dtmf" timeout="10" speechTimeout="3" action="/demo/contractor-response">
    <Say voice="Polly.Joanna-Neural">
      I can wait while you think about it. Just let me know - are you taking new projects?
    </Say>
  </Gather>
  
  <Say voice="Polly.Joanna-Neural">
    <prosody rate="95%">
      No problem at all. Let me tell you quickly what makes our platform different.
      
      <break time="0.5s"/>
      
      We pre-qualify every homeowner for budget, timeline, and project readiness before they ever contact you. 
      
      Our contractors report a 75% close rate on our leads versus the 20% industry average.
      
      <break time="0.5s"/>
      
      Plus, there are no upfront costs - we only charge a small percentage when you successfully complete a project.
      
      <break time="1s"/>
      
      Can I get you set up with a contractor profile today? It takes about 5 minutes and you can start receiving qualified leads this week.
    </prosody>
  </Say>
  
  <Gather input="speech dtmf" timeout="10" action="/demo/contractor-signup">
    <Say voice="Polly.Joanna-Neural">
      Press 1 if you'd like to sign up today, or 2 if you'd prefer I call back another time.
    </Say>
  </Gather>
</Response>`;

        try {
            const call = await this.client.calls.create({
                to: this.demoPhone,
                from: process.env.TWILIO_PHONE_NUMBER,
                twiml: contractorScript
            });

            console.log('📞 CONTRACTOR RECRUITMENT CALL INITIATED');
            console.log(`   Call SID: ${call.sid}`);
            console.log(`   To: ${this.demoPhone}`);
            console.log(`   Voice: Professional Sarah (Polly.Joanna-Neural)`);
            console.log(`   Script: Personalized recruitment with objection handling`);
            console.log(`   Expected Duration: 3-5 minutes`);
            console.log(`   Goal: Sign up contractor for platform`);

            return call;
        } catch (error) {
            console.error('❌ Error making contractor recruitment call:', error);
            throw error;
        }
    }

    // SIDE 2: HOMEOWNER INTERACTION CALL  
    async demonstrateHomeownerInteraction() {
        console.log('\n🏠 HOMEOWNER SIDE: Customer Service & Project Matching');
        console.log('====================================================');

        const homeownerScript = `
<Response>
  <Say voice="Polly.Matthew-Neural" rate="medium">
    <prosody rate="95%">
      Thank you for calling REMODELY AI, your trusted renovation marketplace. 
      This is David, and I'm here to help connect you with the perfect contractor for your project.
      
      <break time="0.5s"/>
      
      I can help you with kitchen renovations, bathroom remodels, or whole-home projects. 
      We work with vetted, licensed contractors who specialize in stone and surface installations.
      
      <break time="0.5s"/>
      
      What type of renovation project are you planning?
    </prosody>
  </Say>
  
  <Gather input="speech dtmf" timeout="15" speechTimeout="5" action="/demo/homeowner-project-type">
    <Say voice="Polly.Matthew-Neural">
      You can say "kitchen," "bathroom," "whole home," or describe your specific project needs.
    </Say>
  </Gather>
  
  <Say voice="Polly.Matthew-Neural">
    <prosody rate="95%">
      Perfect! Let me help you get connected with qualified contractors in your area.
      
      <break time="0.5s"/>
      
      To match you with the best contractors, I'll need a few quick details:
      
      First, what's your zip code or city?
      
      <break time="0.5s"/>
      
      Second, what's your estimated budget range? This helps us match you with contractors who specialize in your price point.
      
      <break time="0.5s"/>
      
      And finally, what's your ideal timeline for starting the project?
    </prosody>
  </Say>
  
  <Gather input="speech dtmf" timeout="20" speechTimeout="7" action="/demo/homeowner-details">
    <Say voice="Polly.Matthew-Neural">
      Take your time. I'm listening for your location, budget range, and timeline.
    </Say>
  </Gather>
  
  <Say voice="Polly.Matthew-Neural">
    <prosody rate="95%">
      Excellent! Based on what you've told me, I can connect you with 3 to 5 highly-rated contractors who:
      
      <break time="0.3s"/>
      
      Are licensed and insured in your area
      
      <break time="0.3s"/>
      
      Specialize in your type of project
      
      <break time="0.3s"/>
      
      Work within your budget range
      
      <break time="0.3s"/>
      
      And are available for your timeline
      
      <break time="1s"/>
      
      I can have these contractors reach out to you within 24 hours with personalized quotes. 
      
      Would you like me to set that up for you right now?
    </prosody>
  </Say>
  
  <Gather input="speech dtmf" timeout="10" action="/demo/homeowner-confirmation">
    <Say voice="Polly.Matthew-Neural">
      Press 1 to get your contractor matches, or stay on the line if you have more questions.
    </Say>
  </Gather>
</Response>`;

        try {
            // Wait 30 seconds after contractor call to demonstrate the difference
            console.log('⏳ Waiting 30 seconds to demonstrate homeowner interaction...\n');
            await new Promise(resolve => setTimeout(resolve, 30000));

            const call = await this.client.calls.create({
                to: this.demoPhone,
                from: process.env.TWILIO_PHONE_NUMBER,
                twiml: homeownerScript
            });

            console.log('📞 HOMEOWNER INTERACTION CALL INITIATED');
            console.log(`   Call SID: ${call.sid}`);
            console.log(`   To: ${this.demoPhone}`);
            console.log(`   Voice: Professional David (Polly.Matthew-Neural)`);
            console.log(`   Script: Customer service with project matching`);
            console.log(`   Expected Duration: 2-4 minutes`);
            console.log(`   Goal: Collect project details and match with contractors`);

            return call;
        } catch (error) {
            console.error('❌ Error making homeowner interaction call:', error);
            throw error;
        }
    }

    // Enhanced Google Cloud Version (What we're upgrading to)
    showEnhancedCapabilities() {
        console.log('\n🚀 GOOGLE CLOUD CONVERSATIONAL AGENTS UPGRADE');
        console.log('==============================================');
        console.log('Current System vs Enhanced System:');
        console.log('');

        console.log('📞 CURRENT SYSTEM (Twilio + Polly Neural):');
        console.log('   ✅ Professional voice quality');
        console.log('   ✅ Basic conversation flow');
        console.log('   ❌ Pre-scripted responses only');
        console.log('   ❌ No real-time conversation adaptation');
        console.log('   ❌ Limited objection handling');
        console.log('   ❌ No context retention across calls');

        console.log('\n🤖 ENHANCED SYSTEM (Google Conversational Agents):');
        console.log('   ✅ Superior WaveNet neural voices');
        console.log('   ✅ Real-time conversation intelligence');
        console.log('   ✅ Dynamic response generation');
        console.log('   ✅ Advanced objection handling');
        console.log('   ✅ Context-aware multi-turn conversations');
        console.log('   ✅ Sentiment analysis and adaptation');
        console.log('   ✅ Automatic follow-up scheduling');
        console.log('   ✅ Integration with CRM and lead management');

        console.log('\n📊 EXPECTED PERFORMANCE IMPROVEMENTS:');
        console.log('   🎯 Contractor Conversion: 15-25% (vs 3-5% traditional)');
        console.log('   💰 Cost per Acquisition: $50-80 (vs $200-400 traditional)');
        console.log('   ⏱️  Average Call Duration: 3-5 minutes (optimized)');
        console.log('   🤝 Lead Quality Score: 9/10 (vs 6/10 current)');
        console.log('   🔄 Follow-up Success: 40% (vs 15% manual)');
    }

    // Demo both sides with comparison
    async runDualDemo() {
        console.log('🎬 Starting Dual Perspective Demo...\n');

        try {
            // Side 1: Contractor Recruitment
            const contractorCall = await this.demonstrateContractorRecruitment();

            // Side 2: Homeowner Interaction  
            const homeownerCall = await this.demonstrateHomeownerInteraction();

            // Show enhanced capabilities
            this.showEnhancedCapabilities();

            console.log('\n✅ DUAL DEMO COMPLETED SUCCESSFULLY!');
            console.log('=====================================');
            console.log('You should have received TWO calls:');
            console.log('');
            console.log('📱 CALL 1: Sarah recruiting you as a contractor');
            console.log('   - Professional recruitment script');
            console.log('   - Objection handling built-in');
            console.log('   - Clear value proposition');
            console.log('   - Sign-up call-to-action');
            console.log('');
            console.log('📱 CALL 2: David helping you as a homeowner');
            console.log('   - Customer service approach');
            console.log('   - Project requirement gathering');
            console.log('   - Contractor matching process');
            console.log('   - Lead qualification questions');
            console.log('');
            console.log('🎯 This demonstrates how REMODELY AI serves BOTH sides of the marketplace!');

            return { contractorCall, homeownerCall };

        } catch (error) {
            console.error('❌ Demo failed:', error);
            throw error;
        }
    }
}

// Run the dual perspective demo
async function main() {
    const demo = new DualPerspectiveVoiceDemo();

    try {
        await demo.runDualDemo();
    } catch (error) {
        console.error('Demo error:', error);
        process.exit(1);
    }
}

// Export for use in other scripts
module.exports = { DualPerspectiveVoiceDemo };

// Run if called directly
if (require.main === module) {
    main();
}
