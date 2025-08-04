// Direct ElevenLabs Conversational AI Call - No Twilio needed!
require('dotenv').config();

async function makeDirectElevenLabsCall() {
    console.log('📞 Making DIRECT ElevenLabs call to 4802555887...\n');

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID; // Sarah's voice

    console.log('📋 ElevenLabs Configuration:');
    console.log(`✅ API Key: ${apiKey ? 'Ready' : 'Missing'}`);
    console.log(`✅ Sarah Voice ID: ${voiceId}`);
    console.log(`✅ Target Phone: +14802555887\n`);

    try {
        // First, let's check if ElevenLabs has Conversational AI agents
        console.log('🔍 Checking ElevenLabs Conversational AI capabilities...');

        const agentsResponse = await fetch('https://api.elevenlabs.io/v1/convai/agents', {
            method: 'GET',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (agentsResponse.ok) {
            const agents = await agentsResponse.json();
            console.log('✅ ElevenLabs Conversational AI available!');
            console.log(`Found ${agents.agents?.length || 0} existing agents`);

            // Create a new agent for Remodely AI
            console.log('\n🤖 Creating Remodely AI Conversational Agent...');

            const agentData = {
                name: "Sarah - Remodely AI Assistant",
                voice_id: voiceId,
                conversation_config: {
                    agent: {
                        prompt: {
                            prompt: `You are Sarah, a friendly and professional AI assistant for Remodely AI, a home renovation marketplace platform.

IDENTITY & PERSONALITY:
- You're warm, knowledgeable, and enthusiastic about home renovation
- You speak naturally with a slight Southern charm
- You're calling to demonstrate our AI voice consultation system

YOUR ROLE:
- Introduce yourself as Sarah from Remodely AI
- Explain that this is a test call for our voice consultation system
- Briefly describe Remodely AI's services:
  * We connect homeowners with verified contractors
  * We provide AI-powered project planning and cost estimation
  * We offer voice consultations for renovation guidance
  * We handle everything from permits to final inspection

CONVERSATION FLOW:
1. Warm greeting and introduction
2. Explain this is a test call to demonstrate voice capabilities
3. Ask if they have any renovation projects in mind
4. Provide helpful insights about home renovation
5. Mention our platform's key benefits
6. Thank them and explain the call will end

TONE: Professional but conversational, helpful, and engaging. Keep responses concise but informative.`
                        }
                    }
                }
            };

            const createAgentResponse = await fetch('https://api.elevenlabs.io/v1/convai/agents', {
                method: 'POST',
                headers: {
                    'xi-api-key': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agentData)
            });

            if (createAgentResponse.ok) {
                const agent = await createAgentResponse.json();
                console.log(`✅ Agent created: ${agent.agent_id}`);

                // Now make the phone call using the agent
                console.log('\n📞 Initiating ElevenLabs phone call...');

                const callData = {
                    agent_id: agent.agent_id,
                    customer_phone_number: "+14802555887"
                };

                const callResponse = await fetch('https://api.elevenlabs.io/v1/convai/conversations/phone', {
                    method: 'POST',
                    headers: {
                        'xi-api-key': apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(callData)
                });

                if (callResponse.ok) {
                    const callResult = await callResponse.json();
                    console.log('🎉 ElevenLabs call initiated successfully!');
                    console.log(`📞 Conversation ID: ${callResult.conversation_id}`);
                    console.log(`📱 Calling: +14802555887`);
                    console.log(`🎙️ Using Sarah's voice directly from ElevenLabs`);

                    console.log('\n🎯 What should happen:');
                    console.log('1. Your phone will ring from ElevenLabs system');
                    console.log('2. Sarah will introduce herself with her natural voice');
                    console.log('3. She\'ll have a real conversation about home renovation');
                    console.log('4. This uses ElevenLabs\' premium conversational AI');

                    return callResult;
                } else {
                    const errorText = await callResponse.text();
                    console.log(`❌ Call failed: ${callResponse.status} - ${errorText}`);
                }

            } else {
                const errorText = await createAgentResponse.text();
                console.log(`❌ Agent creation failed: ${createAgentResponse.status} - ${errorText}`);
            }

        } else {
            const errorText = await agentsResponse.text();
            console.log(`❌ Conversational AI check failed: ${agentsResponse.status} - ${errorText}`);

            // Fallback: Try direct TTS call if available
            console.log('\n🔄 Trying alternative ElevenLabs calling method...');
            await tryAlternativeCall(apiKey, voiceId);
        }

    } catch (error) {
        console.error('❌ ElevenLabs direct call failed:', error.message);
        console.log('\n💡 Possible solutions:');
        console.log('1. ElevenLabs Conversational AI might need a paid plan');
        console.log('2. Phone calling feature might need special access');
        console.log('3. Check ElevenLabs dashboard for calling permissions');
    }
}

async function tryAlternativeCall(apiKey, voiceId) {
    try {
        // Check if there's a simpler calling API
        const response = await fetch('https://api.elevenlabs.io/v1/phone-calls', {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                voice_id: voiceId,
                phone_number: "+14802555887",
                text: `Hello! This is Sarah from Remodely AI. I'm calling to test our premium voice consultation system. 
        Our platform connects homeowners with verified contractors and provides AI-powered renovation guidance. 
        This is a demonstration of our ElevenLabs voice integration. Thank you for testing our system!`
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Alternative call method worked!');
            console.log(result);
        } else {
            console.log(`⚠️  Alternative method also failed: ${response.status}`);
        }
    } catch (error) {
        console.log(`⚠️  Alternative method error: ${error.message}`);
    }
}

// Run the direct ElevenLabs call
makeDirectElevenLabsCall().catch(console.error);
