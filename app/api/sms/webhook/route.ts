import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const body = formData.get('Body') as string;
    const messageSid = formData.get('MessageSid') as string;
    
    console.log('Incoming SMS:', { from, to, body, messageSid });
    
    // Simple AI-powered SMS response
    let responseMessage = '';
    
    const messageText = body.toLowerCase();
    
    if (messageText.includes('contractor') || messageText.includes('join')) {
      responseMessage = "Hi! This is Sarah from Remodely AI. I'd love to chat about you joining our contractor network! I'll give you a call shortly to discuss your experience and how we can work together. 📞";
    } else if (messageText.includes('quote') || messageText.includes('price')) {
      responseMessage = "Hi there! This is Sarah from Remodely AI. I'm excited to help you with your stone surface project! I'll call you right now to hear about your vision and connect you with amazing contractors. 🏡✨";
    } else if (messageText.includes('help') || messageText.includes('support')) {
      responseMessage = "Hi! Sarah here from Remodely AI. I'm here to help with your stone surface needs! Let me give you a quick call to see how I can assist you best. 😊";
    } else {
      responseMessage = "Hi! This is Sarah from Remodely AI. Thanks for reaching out! I'd love to chat about your stone surface needs. I'll give you a call shortly! 🎉";
    }
    
    // Generate TwiML response for SMS
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${responseMessage}</Message>
</Response>`;

    return new NextResponse(twimlResponse, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('SMS webhook error:', error);
    
    const fallbackTwiML = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Hi! This is Sarah from Remodely AI. Thanks for your message! Someone will get back to you soon.</Message>
</Response>`;

    return new NextResponse(fallbackTwiML, {
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}

export async function GET() {
  return new NextResponse('SMS webhook endpoint ready', { status: 200 });
}
