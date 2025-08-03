#!/usr/bin/env node

/**
 * Test Google Cloud Agent - David (Homeowner Service)
 * Simulates a homeowner service call using REMODELY's existing system
 */

const twilio = require('twilio');
require('dotenv').config();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

// Test homeowner data (Josh)
const testHomeowner = {
  name: "Josh", // Can be Josh or Joshua
  phone: process.env.TEST_PHONE_NUMBER || "+1234567890", // Use your phone number
  projectType: "kitchen renovation",
  location: "Phoenix, AZ",
  budget: "$35,000-50,000"
};

/**
 * Google Cloud Agent Integration - David Personality
 * This simulates what the Google Cloud agent would say
 */
function generateDavidScript(homeownerData) {
  return `
    <Response>
      <Say voice="Polly.Matthew-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          Great to talk with you, ${homeownerData.name}! 
          
          I'm David from REMODELY AI, and I understand you're interested in some renovation work. That's exciting!
          
          What kind of renovation project are you thinking about, ${homeownerData.name}?
        </prosody>
      </Say>
      
      <!-- Listen for project type -->
      <Gather input="speech" timeout="10" speechTimeout="auto" action="/webhook/david-project-response">
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            I'm listening, ${homeownerData.name}...
          </prosody>
        </Say>
      </Gather>
      
      <!-- If no response, provide options -->
      <Say voice="Polly.Matthew-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          No problem, ${homeownerData.name}! Let me help you out. 
          
          Are you thinking about a kitchen renovation, bathroom remodel, or maybe a whole home project?
        </prosody>
      </Say>
      
      <Gather input="speech" timeout="10" speechTimeout="auto" action="/webhook/david-project-details">
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            What sounds like what you have in mind, ${homeownerData.name}?
          </prosody>
        </Say>
      </Gather>
      
      <!-- Project details gathering -->
      <Say voice="Polly.Matthew-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          Kitchen renovation - that's exciting, ${homeownerData.name}! We work with contractors who really know their stuff with countertops, cabinets, and complete kitchen makeovers.
          
          What city or zip code should I focus on for you, ${homeownerData.name}?
        </prosody>
      </Say>
      
      <Gather input="speech" timeout="10" speechTimeout="auto" action="/webhook/david-location-response">
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            Go ahead, ${homeownerData.name}...
          </prosody>
        </Say>
      </Gather>
      
      <!-- Budget discussion -->
      <Say voice="Polly.Matthew-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          Perfect, ${homeownerData.name}! Phoenix has some excellent kitchen renovation contractors.
          
          What's your budget range looking like? This helps me match you with contractors who work in your price point.
          
          Are you thinking under 25 thousand, 25 to 50 thousand, 50 to 100 thousand, or over 100 thousand?
        </prosody>
      </Say>
      
      <Gather input="speech" timeout="10" speechTimeout="auto" action="/webhook/david-budget-response">
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            What range works for you, ${homeownerData.name}?
          </prosody>
        </Say>
      </Gather>
      
      <!-- Closing and next steps -->
      <Say voice="Polly.Matthew-Neural" language="en-US">
        <prosody rate="110%" pitch="+2st">
          Excellent, ${homeownerData.name}! That gives me everything I need to find you the perfect contractors.
          
          I'm going to match you with 3 to 5 qualified contractors who specialize in kitchen renovations and work in your budget range. All of our contractors are licensed, insured, and highly rated.
          
          You'll hear from them within 24 hours, ${homeownerData.name}, and I'm confident you'll love the contractors we match you with.
          
          Thanks for choosing REMODELY AI, ${homeownerData.name}! You're going to have an amazing new kitchen!
        </prosody>
      </Say>
    </Response>
  `;
}

/**
 * Make test call with David's homeowner service script
 */
async function makeTestCallDavid() {
  try {
    console.log('🏠 Testing David (Homeowner Service) Call...');
    console.log(`📞 Calling: ${testHomeowner.phone}`);
    console.log(`👤 Homeowner: ${testHomeowner.name}`);
    console.log(`🏗️ Project: ${testHomeowner.projectType}`);
    console.log('');

    const call = await client.calls.create({
      from: twilioPhoneNumber,
      to: testHomeowner.phone,
      twiml: generateDavidScript(testHomeowner),
      record: true, // Record for quality review
      recordingStatusCallback: `${process.env.BASE_URL}/webhook/recording-status`
    });

    console.log('✅ Call initiated successfully!');
    console.log(`📊 Call SID: ${call.sid}`);
    console.log('');
    console.log('🎧 What to listen for:');
    console.log('  ✓ Friendly, helpful male voice (David)');
    console.log('  ✓ 10% faster speaking rate');
    console.log('  ✓ Higher pitch for younger sound');
    console.log('  ✓ Frequent use of your name (Josh/Joshua)');
    console.log('  ✓ Personal, caring tone');
    console.log('  ✓ Systematic information gathering');
    console.log('  ✓ Project-specific enthusiasm');
    console.log('');
    console.log('📝 Expected conversation flow:');
    console.log('  1. Personal greeting using your name');
    console.log('  2. Project type identification');
    console.log('  3. Location gathering');
    console.log('  4. Budget range discussion');
    console.log('  5. Contractor matching explanation');
    console.log('  6. Clear next steps with timeline');

    return call;
  } catch (error) {
    console.error('❌ Error making David test call:', error.message);
    throw error;
  }
}

/**
 * Webhook handlers for David's conversation flow
 */
function setupDavidWebhooks(app) {
  // Handle project type response
  app.post('/webhook/david-project-response', (req, res) => {
    const speechResult = req.body.SpeechResult || '';
    const customerName = testHomeowner.name;
    console.log(`🎤 Project response: "${speechResult}"`);
    
    let response = '<Response>';
    
    if (speechResult.toLowerCase().includes('kitchen')) {
      response += `
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            Kitchen renovation - that's exciting, ${customerName}! We work with contractors who really know their stuff with countertops, cabinets, and complete kitchen makeovers.
            
            What city or zip code should I focus on, ${customerName}?
          </prosody>
        </Say>
      `;
    } else if (speechResult.toLowerCase().includes('bathroom')) {
      response += `
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            Bathroom remodel, nice choice ${customerName}! Our contractors specialize in tile work, vanities, and creating really beautiful functional spaces.
            
            What area should I focus on for you, ${customerName}?
          </prosody>
        </Say>
      `;
    } else if (speechResult.toLowerCase().includes('whole home') || speechResult.toLowerCase().includes('entire')) {
      response += `
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            Wow, whole home renovation ${customerName}! That's a big project. We have contractors who handle large-scale work and manage all the different trades.
            
            What's your location, ${customerName}?
          </prosody>
        </Say>
      `;
    } else {
      response += `
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            That sounds like a great project, ${customerName}! Let me get some details to match you with the right contractors.
            
            What city or area are you in, ${customerName}?
          </prosody>
        </Say>
      `;
    }
    
    response += '</Response>';
    res.type('text/xml').send(response);
  });

  // Handle location response
  app.post('/webhook/david-location-response', (req, res) => {
    const speechResult = req.body.SpeechResult || '';
    const customerName = testHomeowner.name;
    console.log(`🎤 Location response: "${speechResult}"`);
    
    const response = `
      <Response>
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            Perfect, ${customerName}! We have excellent contractors in that area.
            
            What's your budget range looking like? This helps me match you with contractors who work in your price point.
            
            Are you thinking under 25 thousand, 25 to 50 thousand, 50 to 100 thousand, or over 100 thousand?
          </prosody>
        </Say>
      </Response>
    `;
    
    res.type('text/xml').send(response);
  });

  // Handle budget response
  app.post('/webhook/david-budget-response', (req, res) => {
    const speechResult = req.body.SpeechResult || '';
    const customerName = testHomeowner.name;
    console.log(`🎤 Budget response: "${speechResult}"`);
    
    const response = `
      <Response>
        <Say voice="Polly.Matthew-Neural" language="en-US">
          <prosody rate="110%" pitch="+2st">
            Excellent, ${customerName}! That gives me everything I need.
            
            I'm going to match you with 3 to 5 qualified contractors who specialize in your project type and work in your budget range. All licensed, insured, and highly rated.
            
            You'll hear from them within 24 hours, ${customerName}, and I'm confident you'll love the contractors we match you with.
            
            Thanks for choosing REMODELY AI, ${customerName}!
          </prosody>
        </Say>
      </Response>
    `;
    
    res.type('text/xml').send(response);
  });
}

// Run the test if called directly
if (require.main === module) {
  makeTestCallDavid()
    .then(call => {
      console.log('🎉 David homeowner service test call completed!');
      console.log('📞 Check your phone for the call');
      console.log('📊 Review call quality and personal service');
    })
    .catch(error => {
      console.error('💥 Test failed:', error.message);
      process.exit(1);
    });
}

module.exports = {
  makeTestCallDavid,
  setupDavidWebhooks,
  generateDavidScript
};
