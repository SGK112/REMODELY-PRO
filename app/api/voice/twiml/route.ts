import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const intent = searchParams.get('intent') || 'default';
    const message = searchParams.get('message') || '';
    const customerName = searchParams.get('name') || '';

    let twimlContent = '';

    // More natural, conversational voice content
    switch (intent) {
        case 'contractor.recruitment':
            const contractorGreeting = customerName ? `Hi ${customerName}!` : 'Hi there!';
            twimlContent = '<?xml version="1.0" encoding="UTF-8"?>' +
                '<Response>' +
                `<Say voice="alice">${contractorGreeting} This is Sarah from Remodely AI. Thanks so much for reaching out about joining our contractor network! I'm really excited to talk with you.</Say>` +
                '<Pause length="1"/>' +
                '<Say voice="alice">We work with the best stone and surface professionals in Arizona, and it sounds like you might be a perfect fit. I have just a couple quick questions to get started.</Say>' +
                '<Pause length="1"/>' +
                '<Say voice="alice">Can you tell me a bit about your experience with granite and quartz installations? And what areas do you typically serve?</Say>' +
                '<Pause length="2"/>' +
                '<Say voice="alice">Actually, you know what? Let me have one of our contractor specialists give you a call back within the next hour to chat properly. Sound good?</Say>' +
                '</Response>';
            break;

        case 'customer.service':
            const customerGreeting = customerName ? `Hi ${customerName}!` : 'Hello!';
            twimlContent = '<?xml version="1.0" encoding="UTF-8"?>' +
                '<Response>' +
                `<Say voice="alice">${customerGreeting} This is Sarah from Remodely AI. I got your message about needing help with your stone surface project, and I am here to help!</Say>` +
                '<Pause length="1"/>' +
                '<Say voice="alice">Whether you are looking for granite countertops, quartz vanities, or maybe something with marble, we have got some amazing contractors who can make it happen.</Say>' +
                '<Pause length="1"/>' +
                '<Say voice="alice">What kind of space are we working with? Kitchen? Bathroom? I want to make sure we connect you with the right specialist.</Say>' +
                '<Pause length="2"/>' +
                '<Say voice="alice">Let me get your project details and I will have a few contractors reach out with some ideas and pricing. This is going to be exciting!</Say>' +
                '</Response>';
            break;

        case 'quote.request':
            const quoteGreeting = customerName ? `Hey ${customerName}!` : 'Hi there!';
            twimlContent = '<?xml version="1.0" encoding="UTF-8"?>' +
                '<Response>' +
                `<Say voice="alice">${quoteGreeting} Sarah here from Remodely AI. I love that you are thinking about upgrading your stone surfaces - it is such a game changer!</Say>` +
                '<Pause length="1"/>' +
                '<Say voice="alice">I work with some incredible contractors who specialize in granite, quartz, and marble. They do beautiful work and their pricing is really competitive.</Say>' +
                '<Pause length="1"/>' +
                '<Say voice="alice">Tell me, what is your dream vision? Are we talking kitchen countertops? Maybe a gorgeous bathroom vanity? I want to hear all about it.</Say>' +
                '<Pause length="2"/>' +
                '<Say voice="alice">I am going to connect you with a couple contractors who would be perfect for your project. They will give you some great ideas and honest pricing.</Say>' +
                '</Response>';
            break;

        case 'appointment.booking':
            const appointmentGreeting = customerName ? `Hi ${customerName}!` : 'Hello!';
            twimlContent = '<?xml version="1.0" encoding="UTF-8"?>' +
                '<Response>' +
                `<Say voice="alice">${appointmentGreeting} This is Sarah from Remodely AI. I saw you want to schedule a consultation - that is awesome! I love helping people bring their stone surface dreams to life.</Say>` +
                '<Pause length="1"/>' +
                '<Say voice="alice">I have got some fantastic contractors who can come take a look at your space and give you some ideas. They are really good at working around your schedule too.</Say>' +
                '<Pause length="1"/>' +
                '<Say voice="alice">What works better for you - mornings or afternoons? And are weekends okay? I want to make this super convenient.</Say>' +
                '<Pause length="2"/>' +
                '<Say voice="alice">Perfect! I will coordinate everything and have someone reach out to confirm the details. You are going to love the transformation!</Say>' +
                '</Response>';
            break;

        default:
            const defaultGreeting = customerName ? `Hi ${customerName}!` : 'Hello!';
            const welcomeMessage = message || 'Thanks for reaching out to us!';
            twimlContent = '<?xml version="1.0" encoding="UTF-8"?>' +
                '<Response>' +
                `<Say voice="alice">${defaultGreeting} This is Sarah from Remodely AI. ${welcomeMessage}</Say>` +
                '<Pause length="1"/>' +
                '<Say voice="alice">We are all about connecting Arizona homeowners with amazing stone and surface contractors. Whether you need granite, quartz, marble - we have got you covered.</Say>' +
                '<Pause length="1"/>' +
                '<Say voice="alice">Are you looking to get some work done, or are you a contractor interested in joining our network? Either way, I would love to help you out!</Say>' +
                '<Pause length="2"/>' +
                '<Say voice="alice">I am going to have the right person give you a call back soon. Thanks for choosing Remodely AI!</Say>' +
                '</Response>';
    }

    return new NextResponse(twimlContent, {
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 'no-cache'
        }
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { intent, message, sessionId, customerName } = body;

        console.log('TwiML POST request:', { intent, message, sessionId, customerName });

        return NextResponse.json({
            success: true,
            twimlUrl: `/api/voice/twiml?intent=${intent}&message=${encodeURIComponent(message || '')}&name=${encodeURIComponent(customerName || '')}`
        });
    } catch (error) {
        console.error('TwiML POST error:', error);
        return NextResponse.json(
            { error: 'Failed to generate TwiML URL' },
            { status: 500 }
        );
    }
}
