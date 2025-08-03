#!/usr/bin/env node

/**
 * Test Google Cloud Agent - Sarah (Contractor Recruitment)
 * Simulates a contractor recruitment call using REMODELY's existing system
 */

const twilio = require('twilio');
require('dotenv').config();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

// Test contractor data
const testContractor = {
  name: "Mike's Kitchen & Bath",
  phone: process.env.TEST_PHONE_NUMBER || "+1234567890", // Use your phone number
  specialty: "kitchen renovation",
  location: "Phoenix, AZ"
};

/**
 * Google Cloud Agent Integration - Sarah Personality
 * This simulates what the Google Cloud agent would say
 */
function generateSarahScript(contractorData) {
  return `
    <Response>
      <Say voice="Polly.Joanna-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          Hi there! This is Sarah from REMODELY AI, a renovation marketplace platform. 
          
          I hope I'm catching you at a good time. We help contractors like you connect with qualified homeowners who are specifically looking for ${contractorData.specialty} experts in the ${contractorData.location} area.
          
          Are you currently taking on new kitchen renovation projects?
        </prosody>
      </Say>
      
      <!-- Pause for response -->
      <Gather input="speech" timeout="10" speechTimeout="auto" action="/webhook/sarah-contractor-response">
        <Say voice="Polly.Joanna-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            I'm listening...
          </prosody>
        </Say>
      </Gather>
      
      <!-- If no response, follow up -->
      <Say voice="Polly.Joanna-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          I understand you might be busy on a job site. Let me quickly share why I'm calling.
          
          We have homeowners in Phoenix specifically looking for kitchen renovation contractors. 
          Our platform pre-qualifies leads so you only spend time on serious prospects who are ready to hire.
          
          The best part? Zero upfront costs. We only succeed when you do - taking a small percentage only when you complete a project successfully.
          
          Would you like to hear more about how we can send you qualified leads?
        </prosody>
      </Say>
      
      <Gather input="speech" timeout="10" speechTimeout="auto" action="/webhook/sarah-value-prop-response">
        <Say voice="Polly.Joanna-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            What do you think?
          </prosody>
        </Say>
      </Gather>
      
      <!-- Closing -->
      <Say voice="Polly.Joanna-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          Perfect! I can get you set up with a contractor profile today. It takes about 5 minutes and you can start receiving qualified leads immediately.
          
          I'll send you a text with a link to get started, and you'll have a complete profile within 24 hours.
          
          Thanks for your time, and I look forward to sending you some great kitchen renovation leads!
        </prosody>
      </Say>
    </Response>
  `;
}

/**
 * Make test call with Sarah's contractor recruitment script
 */
async function makeTestCallSarah() {
  try {
    console.log('🎯 Testing Sarah (Contractor Recruitment) Call...');
    console.log(`📞 Calling: ${testContractor.phone}`);
    console.log(`👷 Contractor: ${testContractor.name}`);
    console.log(`🔨 Specialty: ${testContractor.specialty}`);
    console.log('');

    const call = await client.calls.create({
      from: twilioPhoneNumber,
      to: testContractor.phone,
      twiml: generateSarahScript(testContractor),
      record: true, // Record for quality review
      recordingStatusCallback: `${process.env.BASE_URL}/webhook/recording-status`
    });

    console.log('✅ Call initiated successfully!');
    console.log(`📊 Call SID: ${call.sid}`);
    console.log('');
    console.log('🎧 What to listen for:');
    console.log('  ✓ Professional, energetic female voice (Sarah)');
    console.log('  ✓ 10% faster speaking rate');
    console.log('  ✓ Higher pitch for younger sound');
    console.log('  ✓ Natural conversation flow');
    console.log('  ✓ Specific value proposition (75% close rate, zero upfront costs)');
    console.log('  ✓ Professional objection handling');
    console.log('  ✓ Clear call-to-action (5-minute signup)');
    console.log('');
    console.log('📝 Expected conversation flow:');
    console.log('  1. Professional greeting with company introduction');
    console.log('  2. Qualification question (taking new projects?)');
    console.log('  3. Value proposition with specific benefits');
    console.log('  4. Objection handling if needed');
    console.log('  5. Clear next steps and closing');

    return call;
  } catch (error) {
    console.error('❌ Error making Sarah test call:', error.message);
    throw error;
  }
}

/**
 * Webhook handlers for Sarah's conversation flow
 */
function setupSarahWebhooks(app) {
  // Handle contractor response to initial qualification
  app.post('/webhook/sarah-contractor-response', (req, res) => {
    const speechResult = req.body.SpeechResult || '';
    console.log(`🎤 Contractor response: "${speechResult}"`);
    
    let response = '<Response>';
    
    if (speechResult.toLowerCase().includes('yes') || speechResult.toLowerCase().includes('interested')) {
      response += `
        <Say voice="Polly.Joanna-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            That's fantastic! Let me tell you what makes REMODELY AI different from other lead services.
            
            Our homeowners are pre-qualified with verified budgets and project timelines. You'll see a 75% close rate compared to the industry average of 20%.
            
            Plus, we handle all the initial screening and project matching, so you only spend time on serious prospects.
            
            Can I get you set up with a contractor profile today?
          </prosody>
        </Say>
      `;
    } else if (speechResult.toLowerCase().includes('busy') || speechResult.toLowerCase().includes('swamped')) {
      response += `
        <Say voice="Polly.Joanna-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            I understand you're busy - that's exactly why this works so well! 
            
            We handle all the lead generation and qualification for you. You only get contacted when there's a serious prospect who's ready to hire.
            
            Many of our contractors tell us this actually saves them time because they're not chasing unqualified leads anymore.
            
            Would you like me to send you some information to review when you have a moment?
          </prosody>
        </Say>
      `;
    } else {
      response += `
        <Say voice="Polly.Joanna-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            I totally understand. Let me quickly share the key benefits.
            
            Pre-qualified leads, 75% close rate, and zero upfront costs. We only succeed when you do.
            
            Would it help if I sent you a quick overview via text so you can review it when convenient?
          </prosody>
        </Say>
      `;
    }
    
    response += '</Response>';
    res.type('text/xml').send(response);
  });

  // Handle response to value proposition
  app.post('/webhook/sarah-value-prop-response', (req, res) => {
    const speechResult = req.body.SpeechResult || '';
    console.log(`🎤 Value prop response: "${speechResult}"`);
    
    const response = `
      <Response>
        <Say voice="Polly.Joanna-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            Excellent! I'll send you a text message right now with a link to create your contractor profile.
            
            You'll be able to upload photos of your work, set your service areas, and start receiving qualified leads within 24 hours.
            
            Thanks for your time today, and I'm excited to start sending you some great kitchen renovation projects!
          </prosody>
        </Say>
      </Response>
    `;
    
    res.type('text/xml').send(response);
  });
}

// Run the test if called directly
if (require.main === module) {
  makeTestCallSarah()
    .then(call => {
      console.log('🎉 Sarah contractor recruitment test call completed!');
      console.log('📞 Check your phone for the call');
      console.log('📊 Review call quality and conversation flow');
    })
    .catch(error => {
      console.error('💥 Test failed:', error.message);
      process.exit(1);
    });
}

module.exports = {
  makeTestCallSarah,
  setupSarahWebhooks,
  generateSarahScript
};
