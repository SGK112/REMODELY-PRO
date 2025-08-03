import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Handle GET requests (Twilio sometimes sends GET first)
  return new NextResponse('Webhook endpoint ready', { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    // Parse Twilio webhook data
    const formData = await request.formData();
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const callSid = formData.get('CallSid') as string;
    const digits = formData.get('Digits') as string;
    
    console.log('Twilio Voice Webhook:', { from, to, callSid, digits });

    // Get intent from query params
    const { searchParams } = new URL(request.url);
    const intent = searchParams.get('intent') || 'default';
    const customerName = searchParams.get('name') || '';

    let twimlResponse = '';

    if (digits) {
      // Handle menu selections based on intent
      twimlResponse = handleMenuSelection(intent, digits, customerName);
    } else {
      // Initial call - provide main menu based on intent
      twimlResponse = generateInitialTwiML(intent, customerName);
    }

    return new NextResponse(twimlResponse, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Voice webhook error:', error);
    
    // Fallback TwiML
    const fallbackTwiML = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Hi! This is Sarah from Remodely AI. Thanks for calling us today!</Say>
</Response>`;

    return new NextResponse(fallbackTwiML, {
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}

function generateInitialTwiML(intent: string, customerName: string): string {
  const greeting = customerName ? `Hi ${customerName}!` : 'Hi there!';
  
  switch (intent) {
    case 'contractor.recruitment':
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">${greeting} This is Sarah from Remodely AI. Thanks so much for reaching out about joining our contractor network! I am really excited to talk with you.</Say>
  <Pause length="1"/>
  <Say voice="alice">We work with the best stone and surface professionals in Arizona, and it sounds like you might be a perfect fit. Let me ask you a few quick questions.</Say>
  <Pause length="1"/>
  <Say voice="alice">Press 1 if you specialize in granite installations, press 2 for quartz and engineered stone, press 3 for marble and natural stone, or press 0 to speak with our contractor relations team directly.</Say>
  <Gather numDigits="1" timeout="10">
    <Say voice="alice">Please make your selection now.</Say>
  </Gather>
  <Say voice="alice">I did not catch that. Let me have someone from our team call you back shortly. Thanks for your interest in Remodely AI!</Say>
</Response>`;

    case 'customer.service':
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">${greeting} This is Sarah from Remodely AI. I got your message about your stone surface project, and I am here to help!</Say>
  <Pause length="1"/>
  <Say voice="alice">Whether you are looking for granite countertops, quartz vanities, or beautiful marble installations, we have got some amazing contractors who can make it happen.</Say>
  <Pause length="1"/>
  <Say voice="alice">Press 1 if you need help with an existing project, press 2 for new project planning, press 3 to speak with a project specialist, or press 0 for general questions.</Say>
  <Gather numDigits="1" timeout="10">
    <Say voice="alice">Please make your selection now.</Say>
  </Gather>
  <Say voice="alice">No problem! I will have one of our customer service specialists call you back within the hour. Thanks for choosing Remodely AI!</Say>
</Response>`;

    case 'quote.request':
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">${greeting} Sarah here from Remodely AI. I am so excited you are thinking about upgrading your stone surfaces - it is such a game changer!</Say>
  <Pause length="1"/>
  <Say voice="alice">I work with some incredible contractors who do beautiful granite, quartz, and marble work, and their pricing is really competitive.</Say>
  <Pause length="1"/>
  <Say voice="alice">Press 1 for kitchen countertops, press 2 for bathroom vanities, press 3 for outdoor surfaces like patios or outdoor kitchens, or press 0 to describe your custom project.</Say>
  <Gather numDigits="1" timeout="10">
    <Say voice="alice">Please make your selection now.</Say>
  </Gather>
  <Say voice="alice">That is okay! I will have a project specialist call you to discuss your specific needs. We will get you some amazing quotes!</Say>
</Response>`;

    default:
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">${greeting} This is Sarah from Remodely AI. Thanks for calling us!</Say>
  <Pause length="1"/>
  <Say voice="alice">We are all about connecting Arizona homeowners with amazing stone and surface contractors. Whether you need granite, quartz, marble work, we have got you covered.</Say>
  <Pause length="1"/>
  <Say voice="alice">Press 1 if you are a contractor looking to join our network, press 2 if you are a homeowner seeking quotes, or press 0 to speak with a representative.</Say>
  <Gather numDigits="1" timeout="10">
    <Say voice="alice">Please make your selection now.</Say>
  </Gather>
  <Say voice="alice">Thanks for calling! Someone from our team will get back to you shortly.</Say>
</Response>`;
  }
}

function handleMenuSelection(intent: string, digits: string, customerName: string): string {
  const name = customerName ? customerName : 'there';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Thanks for your selection, ${name}! I am connecting you with the right specialist who can help you with your ${intent.replace('.', ' ')} needs.</Say>
  <Pause length="1"/>
  <Say voice="alice">Someone will call you back within 30 minutes. Thanks for choosing Remodely AI!</Say>
</Response>`;
}
