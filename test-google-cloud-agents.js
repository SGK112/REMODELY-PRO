#!/usr/bin/env node

/**
 * Combined Google Cloud Agent Test Runner
 * Tests both Sarah (contractor recruitment) and David (homeowner service)
 */

const { makeTestCallSarah, setupSarahWebhooks } = require('./test-google-cloud-agent-sarah');
const { makeTestCallDavid, setupDavidWebhooks } = require('./test-google-cloud-agent-david');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup webhook handlers
setupSarahWebhooks(app);
setupDavidWebhooks(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Google Cloud Agent Test Runner',
    timestamp: new Date().toISOString()
  });
});

// Recording status webhook
app.post('/webhook/recording-status', (req, res) => {
  console.log('📹 Recording status:', req.body);
  res.sendStatus(200);
});

/**
 * Run both test calls with a delay between them
 */
async function runBothTests() {
  console.log('🚀 Starting Google Cloud Agent Tests');
  console.log('=' .repeat(60));
  console.log('');

  try {
    // Start webhook server
    const server = app.listen(port, () => {
      console.log(`🌐 Webhook server running on port ${port}`);
      console.log('');
    });

    // Test 1: Sarah (Contractor Recruitment)
    console.log('TEST 1: CONTRACTOR RECRUITMENT (SARAH)');
    console.log('-'.repeat(40));
    const sarahCall = await makeTestCallSarah();
    console.log('⏳ Waiting 30 seconds before next test...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    console.log('');

    // Test 2: David (Homeowner Service)
    console.log('TEST 2: HOMEOWNER SERVICE (DAVID)');
    console.log('-'.repeat(40));
    const davidCall = await makeTestCallDavid();
    console.log('');

    // Summary
    console.log('=' .repeat(60));
    console.log('🎯 GOOGLE CLOUD AGENT TEST SUMMARY');
    console.log('=' .repeat(60));
    console.log('');
    console.log('📞 Calls Made:');
    console.log(`  • Sarah (Contractor): ${sarahCall.sid}`);
    console.log(`  • David (Homeowner): ${davidCall.sid}`);
    console.log('');
    console.log('🎧 Quality Checklist:');
    console.log('');
    console.log('SARAH (Contractor Recruitment):');
    console.log('  ✓ Professional, energetic female voice');
    console.log('  ✓ 110% speaking rate (energetic pace)');
    console.log('  ✓ Higher pitch (+2 semitones)');
    console.log('  ✓ Business development personality');
    console.log('  ✓ Value proposition delivery');
    console.log('  ✓ Objection handling');
    console.log('  ✓ Clear call-to-action');
    console.log('');
    console.log('DAVID (Homeowner Service):');
    console.log('  ✓ Friendly, helpful male voice');
    console.log('  ✓ 110% speaking rate (approachable pace)');
    console.log('  ✓ Higher pitch (+2 semitones)');
    console.log('  ✓ Personal service personality');
    console.log('  ✓ Frequent name usage (Josh/Joshua)');
    console.log('  ✓ Systematic information gathering');
    console.log('  ✓ Project-specific enthusiasm');
    console.log('');
    console.log('📊 Expected Results:');
    console.log('  • Natural conversation flow');
    console.log('  • No robotic or voicemail-like quality');
    console.log('  • Proper greeting acknowledgment');
    console.log('  • Context-aware responses');
    console.log('  • Professional but personable tone');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('  1. Review call recordings for quality');
    console.log('  2. Compare to your current voice system');
    console.log('  3. Test with different response scenarios');
    console.log('  4. Deploy Google Cloud agent configuration');
    console.log('  5. Integrate with live contractor/homeowner calls');
    console.log('');

    // Keep server running for webhook handling
    console.log('🌐 Webhook server will continue running for call handling...');
    console.log('💡 Press Ctrl+C to stop when testing is complete');

  } catch (error) {
    console.error('💥 Test suite failed:', error.message);
    process.exit(1);
  }
}

/**
 * Run individual tests
 */
async function runSarahTest() {
  console.log('🎯 Testing Sarah (Contractor Recruitment) Only');
  console.log('-'.repeat(50));
  
  const server = app.listen(port, () => {
    console.log(`🌐 Webhook server running on port ${port}`);
  });

  try {
    await makeTestCallSarah();
    console.log('✅ Sarah test completed! Check your phone.');
  } catch (error) {
    console.error('❌ Sarah test failed:', error.message);
  }
}

async function runDavidTest() {
  console.log('🏠 Testing David (Homeowner Service) Only');
  console.log('-'.repeat(50));
  
  const server = app.listen(port, () => {
    console.log(`🌐 Webhook server running on port ${port}`);
  });

  try {
    await makeTestCallDavid();
    console.log('✅ David test completed! Check your phone.');
  } catch (error) {
    console.error('❌ David test failed:', error.message);
  }
}

// Command line interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'sarah':
      runSarahTest();
      break;
    case 'david':
      runDavidTest();
      break;
    case 'both':
    default:
      runBothTests();
      break;
  }
}

module.exports = {
  app,
  runBothTests,
  runSarahTest,
  runDavidTest
};
