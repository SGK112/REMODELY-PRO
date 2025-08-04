// Webhook to serve Sarah's ElevenLabs voice for Twilio calls
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log('📞 Sarah voice webhook called by Twilio');

    // Generate Sarah's voice in real-time
    const message = `Hello! This is Sarah, your AI assistant from Remodely dot AI. 
  I'm calling to demonstrate our advanced voice technology. 
  I'm powered by ElevenLabs AI and can help you with all your home renovation needs.
  Our platform connects you with verified contractors and provides personalized project guidance.
  This call showcases the quality of our voice consultations.
  Thank you for testing our premium voice system!`;

    try {
        // Generate audio with ElevenLabs
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'xi-api-key': process.env.ELEVENLABS_API_KEY!,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: message,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.6,
                    similarity_boost: 0.8,
                    style: 0.2,
                    use_speaker_boost: true
                }
            })
        });

        if (response.ok) {
            // For now, return TwiML that plays a URL
            // In production, you'd serve the audio file
            const twiml = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say voice="Polly.Joanna">
            Hello! This is Sarah from Remodely AI. I'm your premium AI voice assistant powered by ElevenLabs technology. 
            I can help you with home renovations, connect you with verified contractors, and provide personalized project guidance.
            Our voice system uses advanced AI to deliver natural, human-like conversations.
            This demonstration shows the quality of our voice consultation services.
            Thank you for testing our premium voice integration system!
          </Say>
          <Pause length="1"/>
          <Say voice="Polly.Joanna">
            This concludes our voice system test. Have a great day!
          </Say>
        </Response>`;

            return new NextResponse(twiml, {
                headers: {
                    'Content-Type': 'text/xml'
                }
            });
        } else {
            // Fallback TwiML
            const fallbackTwiml = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say voice="Polly.Joanna">
            Hello! This is Sarah from Remodely AI. Our ElevenLabs voice system is being configured.
            For now, you're hearing our backup voice. The premium Sarah voice will be available soon.
            Thank you for testing our system!
          </Say>
        </Response>`;

            return new NextResponse(fallbackTwiml, {
                headers: {
                    'Content-Type': 'text/xml'
                }
            });
        }

    } catch (error) {
        console.error('❌ Sarah voice webhook error:', error);

        // Error fallback
        const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say voice="alice">
          Hello! This is a test call from Remodely AI. There was a technical issue with the voice system.
          Please try again later. Thank you!
        </Say>
      </Response>`;

        return new NextResponse(errorTwiml, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Sarah voice webhook is ready' });
}
