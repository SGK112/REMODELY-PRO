#!/usr/bin/env node

/**
 * Interactive Test Runner - Get phone number and run tests
 */

const readline = require('readline');
const { runBothTests } = require('./test-google-cloud-agents');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 Google Cloud Agent Test Runner');
console.log('=' .repeat(50));
console.log('');
console.log('This will test both:');
console.log('  📞 Sarah (Contractor Recruitment)');
console.log('  🏠 David (Homeowner Service)');
console.log('');

rl.question('📱 Enter your phone number (with country code, e.g. +1234567890): ', (phoneNumber) => {
  console.log('');
  console.log(`✅ Will call: ${phoneNumber}`);
  console.log('');
  
  // Update environment variable
  process.env.TEST_PHONE_NUMBER = phoneNumber;
  
  console.log('🚀 Starting tests...');
  console.log('📞 You should receive 2 calls:');
  console.log('  1. Sarah (Contractor Recruitment) - immediately');
  console.log('  2. David (Homeowner Service) - after 30 seconds');
  console.log('');
  
  rl.close();
  
  // Run the tests
  runBothTests().catch(error => {
    console.error('💥 Test failed:', error.message);
    process.exit(1);
  });
});

console.log('⚠️  Note: Make sure you can receive calls at this number!');
console.log('');
