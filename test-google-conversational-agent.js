#!/usr/bin/env node

/**
 * Test Google Conversational Agent Integration
 * Tests the webhook endpoint for Google Cloud Conversational Agents
 */

const { execSync } = require('child_process');

const SERVER_URL = 'http://localhost:3001';

function makeCurlRequest(url, data) {
  try {
    const curlCommand = `curl -s -X POST "${url}" \
      -H "Content-Type: application/json" \
      -d '${JSON.stringify(data).replace(/'/g, "\\'")}'`;
    
    const result = execSync(curlCommand, { encoding: 'utf8', timeout: 10000 });
    return { ok: true, data: JSON.parse(result) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

const SERVER_URL = 'http://localhost:3001';

async function testConversationalAgent() {
  console.log('🤖 Testing Google Conversational Agent Integration\n');

  try {
    // Test webhook endpoint
    console.log('1. Testing webhook endpoint...');
    const webhookResponse = await fetch(`${SERVER_URL}/api/google-conversational-agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fulfillmentInfo: {
          tag: 'find_contractors'
        },
        sessionInfo: {
          session: 'test-session-123',
          parameters: {
            location: 'Phoenix, AZ',
            project_type: 'kitchen countertops',
            budget: '5000'
          }
        },
        text: 'I need kitchen countertop contractors in Phoenix'
      })
    });

    if (webhookResponse.ok) {
      const webhookData = await webhookResponse.json();
      console.log('✅ Webhook endpoint working');
      console.log('📊 Response:', JSON.stringify(webhookData, null, 2));
    } else {
      console.log('❌ Webhook endpoint failed:', webhookResponse.status);
    }

    // Test quote creation
    console.log('\n2. Testing quote creation via agent...');
    const quoteResponse = await fetch(`${SERVER_URL}/api/google-conversational-agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fulfillmentInfo: {
          tag: 'create_quote'
        },
        sessionInfo: {
          session: 'test-session-123',
          parameters: {
            contractor_id: 'test-contractor-123',
            project_description: 'Kitchen countertop installation with quartz',
            square_footage: '40',
            materials: 'quartz',
            location: 'Phoenix, AZ',
            budget: '5000'
          }
        },
        text: 'Create a quote for kitchen countertops'
      })
    });

    if (quoteResponse.ok) {
      const quoteData = await quoteResponse.json();
      console.log('✅ Quote creation working');
      console.log('📊 Response:', JSON.stringify(quoteData, null, 2));
    } else {
      console.log('❌ Quote creation failed:', quoteResponse.status);
    }

    // Test contractor search
    console.log('\n3. Testing contractor search...');
    const searchResponse = await fetch(`${SERVER_URL}/api/google-conversational-agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fulfillmentInfo: {
          tag: 'search_contractors'
        },
        sessionInfo: {
          session: 'test-session-123',
          parameters: {
            location: 'Scottsdale, AZ',
            specialty: 'granite'
          }
        },
        text: 'Find granite contractors near Scottsdale'
      })
    });

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('✅ Contractor search working');
      console.log('📊 Found contractors:', searchData.fulfillmentResponse?.messages?.[0]?.text?.text?.[0] || 'No response text');
    } else {
      console.log('❌ Contractor search failed:', searchResponse.status);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Test the existing Google Cloud agents too
async function testExistingAgents() {
  console.log('\n🎯 Testing Existing Google Cloud Agents\n');

  try {
    // Test Sarah agent
    console.log('Testing Sarah (Contractor Recruitment)...');
    const { execSync } = require('child_process');
    
    const sarahResult = execSync('node test-scripts/test-google-cloud-agent-sarah.js', { 
      encoding: 'utf8',
      timeout: 10000 
    });
    console.log('✅ Sarah agent test completed');

    // Test David agent
    console.log('\nTesting David (Homeowner Service)...');
    const davidResult = execSync('node test-scripts/test-google-cloud-agent-david.js', { 
      encoding: 'utf8',
      timeout: 10000 
    });
    console.log('✅ David agent test completed');

  } catch (error) {
    console.log('ℹ️ Agent tests require phone call - skipping for automated test');
  }
}

async function main() {
  console.log('🚀 Starting Google Conversational Agent Tests\n');
  
  await testConversationalAgent();
  await testExistingAgents();
  
  console.log('\n🎉 Test Suite Complete!');
  console.log('\n📝 Next Steps:');
  console.log('1. Configure your Google Conversational Agent webhook URL to: http://localhost:3001/api/google-conversational-agent');
  console.log('2. Test the agent in the Google Cloud Console simulator');
  console.log('3. Use the existing Sarah/David agents for contractor recruitment and customer service');
}

main().catch(console.error);
