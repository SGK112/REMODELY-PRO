#!/usr/bin/env node

const twilio = require('twilio');
require('dotenv').config();

console.log('\n🎯 REMODELY AI - HUMAN-LIKE CONVERSATIONAL VOICE SYSTEM');
console.log('======================================================');
console.log('✨ Natural conversations that listen for proper greetings');
console.log('🎤 Uses your name (Josh/Joshua) professionally');
console.log('⚡ Faster, younger, more conversational tone');
console.log('======================================================\n');

class HumanLikeVoiceSystem {
    constructor() {
        this.demoPhone = process.env.DEMO_PHONE_NUMBER || '+14802555887';
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        this.customerName = 'Josh'; // Will use Joshua for formal, Josh for casual
    }

    // CONTRACTOR RECRUITMENT - Sounds like a real person calling
    async contractorRecruitmentCall() {
        console.log('👔 CONTRACTOR RECRUITMENT: Human-like Business Call');
        console.log('===================================================');

        const contractorScript = `
<Response>
  <Pause length="1"/>
  
  <!-- Listen for human greeting first -->
  <Gather input="speech" timeout="8" speechTimeout="3" action="/voice/contractor-greeting-response" 
          hints="hello, hi, this is, speaking, yes, good morning, good afternoon">
    <Say voice="Polly.Joanna-Neural" rate="fast">
      <prosody rate="110%" pitch="+2st">
        Hi there! This is Sarah calling from REMODELY AI.
      </prosody>
    </Say>
  </Gather>
  
  <!-- If no answer, continue naturally -->
  <Say voice="Polly.Joanna-Neural" rate="fast">
    <prosody rate="110%" pitch="+2st">
      Hi! I hope I caught you at a decent time. This is Sarah from REMODELY AI - 
      we're a renovation marketplace that connects homeowners with quality contractors.
      
      <break time="0.3s"/>
      
      I'm reaching out because we have several homeowners in the Phoenix area 
      specifically looking for renovation work, and your business profile caught our attention.
      
      <break time="0.3s"/>
      
      Do you have just a quick minute to chat about some potential project opportunities?
    </prosody>
  </Say>
  
  <Gather input="speech dtmf" timeout="10" speechTimeout="4" 
          action="/voice/contractor-interest-response"
          hints="yes, sure, okay, no, busy, not interested, maybe, tell me more">
    <Say voice="Polly.Joanna-Neural" rate="fast">
      <prosody rate="105%" pitch="+1st">
        I can keep this super brief - are you currently taking on new projects?
      </prosody>
    </Say>
  </Gather>
</Response>`;

        try {
            const call = await this.client.calls.create({
                to: this.demoPhone,
                from: process.env.TWILIO_PHONE_NUMBER,
                twiml: contractorScript
            });

            console.log('📞 HUMAN-LIKE CONTRACTOR CALL INITIATED');
            console.log(`   Call SID: ${call.sid}`);
            console.log(`   Voice: Sarah - Younger, faster, conversational`);
            console.log(`   ✅ Listens for proper greeting responses`);
            console.log(`   🎯 More natural business conversation style`);

            return call;
        } catch (error) {
            console.error('❌ Error making contractor call:', error);
            throw error;
        }
    }

    // HOMEOWNER INTERACTION - Personal, uses your name
    async homeownerServiceCall() {
        console.log('\n🏠 HOMEOWNER SERVICE: Personal Customer Service');
        console.log('==============================================');

        const homeownerScript = `
<Response>
  <Pause length="1"/>
  
  <!-- Listen for personal greeting with name -->
  <Gather input="speech" timeout="8" speechTimeout="3" action="/voice/homeowner-greeting-response"
          hints="hello, hi, this is Josh, this is Joshua, Josh speaking, Joshua speaking, yes, good morning">
    <Say voice="Polly.Matthew-Neural" rate="fast">
      <prosody rate="115%" pitch="+3st">
        Hello! This is David from REMODELY AI calling for Josh.
      </prosody>
    </Say>
  </Gather>
  
  <!-- Natural continuation with name usage -->
  <Say voice="Polly.Matthew-Neural" rate="fast">
    <prosody rate="115%" pitch="+3st">
      Hey Josh! Thanks for your interest in our renovation marketplace. 
      
      <break time="0.2s"/>
      
      I'm calling to help you get connected with some really great contractors 
      for your renovation project.
      
      <break time="0.3s"/>
      
      What type of renovation are you thinking about? Kitchen, bathroom, 
      or maybe something bigger?
    </prosody>
  </Say>
  
  <Gather input="speech dtmf" timeout="12" speechTimeout="5" 
          action="/voice/homeowner-project-response"
          hints="kitchen, bathroom, whole home, renovation, remodel, countertops, cabinets">
    <Say voice="Polly.Matthew-Neural" rate="fast">
      <prosody rate="110%" pitch="+2st">
        Josh, just let me know what you're planning - I'm here to help match you 
        with the perfect contractor for your project.
      </prosody>
    </Say>
  </Gather>
</Response>`;

        try {
            // Wait 45 seconds to differentiate calls
            console.log('⏳ Waiting 45 seconds for homeowner service call...\n');
            await new Promise(resolve => setTimeout(resolve, 45000));

            const call = await this.client.calls.create({
                to: this.demoPhone,
                from: process.env.TWILIO_PHONE_NUMBER,
                twiml: homeownerScript
            });

            console.log('📞 PERSONAL HOMEOWNER CALL INITIATED');
            console.log(`   Call SID: ${call.sid}`);
            console.log(`   Voice: David - Uses "Josh" personally and professionally`);
            console.log(`   ✅ Listens for "Hello, this is Josh/Joshua"`);
            console.log(`   🎯 Personalized service using your name throughout`);

            return call;
        } catch (error) {
            console.error('❌ Error making homeowner call:', error);
            throw error;
        }
    }

    showVoiceImprovements() {
        console.log('\n🎭 VOICE IMPROVEMENTS IMPLEMENTED');
        console.log('=================================');
        console.log('✅ Listens for proper greetings ("Hello", "This is Josh")');
        console.log('✅ Uses your name (Josh/Joshua) naturally and professionally');
        console.log('✅ Faster speech pattern (110-115% speed)');
        console.log('✅ Younger sounding voice (+2 to +3 semitones pitch)');
        console.log('✅ More conversational, less robotic phrasing');
        console.log('✅ Natural pauses and breathing patterns');
        console.log('✅ Human-like conversation flow');

        console.log('\n🎯 CONVERSATION PATTERNS:');
        console.log('👔 Contractor Call: Professional but friendly business approach');
        console.log('🏠 Homeowner Call: Personal service using "Josh" throughout');
        console.log('🎤 Both calls: Wait for and respond to proper greetings');
        console.log('⚡ Faster pace: Sounds more energetic and engaging');
        console.log('🎵 Higher pitch: Sounds younger and more approachable');
    }

    async runHumanLikeDemo() {
        console.log('🎬 Starting Human-Like Voice Demo...\n');

        try {
            // Human-like contractor recruitment
            const contractorCall = await this.contractorRecruitmentCall();

            // Personal homeowner service  
            const homeownerCall = await this.homeownerServiceCall();

            // Show improvements
            this.showVoiceImprovements();

            console.log('\n🎉 HUMAN-LIKE VOICE DEMO LAUNCHED!');
            console.log('==================================');
            console.log('📱 Both calls now sound like REAL PEOPLE:');
            console.log('');
            console.log('📞 CALL 1: Sarah (Contractor Recruitment)');
            console.log('   - Waits for your greeting ("Hello", "This is...")');
            console.log('   - Faster, younger, more conversational');
            console.log('   - Professional but friendly business tone');
            console.log('   - Natural conversation flow');
            console.log('');
            console.log('📞 CALL 2: David (Personal Homeowner Service)');
            console.log('   - Uses "Josh" throughout the conversation');
            console.log('   - Listens for "Hello, this is Josh/Joshua"');
            console.log('   - Personal, helpful service approach');
            console.log('   - Higher energy, younger sounding voice');
            console.log('');
            console.log('🎯 NO MORE VOICEMAIL SOUND - These are CONVERSATIONS!');

            return { contractorCall, homeownerCall };

        } catch (error) {
            console.error('❌ Demo failed:', error);
            throw error;
        }
    }
}

// Run the human-like demo
async function main() {
    const voiceSystem = new HumanLikeVoiceSystem();

    try {
        await voiceSystem.runHumanLikeDemo();
    } catch (error) {
        console.error('Voice system error:', error);
        process.exit(1);
    }
}

// Export for use in other scripts
module.exports = { HumanLikeVoiceSystem };

// Run if called directly
if (require.main === module) {
    main();
}
