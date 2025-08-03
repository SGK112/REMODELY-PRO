import { NextRequest, NextResponse } from 'next/server';
import { TwilioService } from '@/lib/twilio';

// Google Conversational Agents Integration for Remodely Pro
// Agent ID: ccb0cee7-9d14-45f2-af52-cac51b27d522

interface GoogleAgentWebhookPayload {
  sessionId: string
  queryText: string
  intentName: string
  parameters: Record<string, any>
  fulfillmentText: string
  phoneNumber?: string
  userType?: 'contractor' | 'customer'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, intentName, queryText, phoneNumber, customerName } = body;

    console.log('Google Agent request:', { sessionId, intentName, queryText, phoneNumber, customerName });

    // Handle different intents with voice integration
    let fulfillmentText = '';
    let followupAction = '';
    let voiceCallTriggered = false;

    const personalGreeting = customerName ? `Hi ${customerName}!` : 'Hi there!';

    switch (intentName) {
      case 'contractor.recruitment':
        fulfillmentText = `${personalGreeting} Thanks for reaching out about joining Remodely AI! I'm Sarah, and I'm really excited to connect with stone and surface professionals like you. We work with the best contractors in Arizona, and it sounds like you might be a perfect fit. I'll give you a call right now to chat about your experience and how we can work together!`;
        followupAction = 'voice_call';
        
        // Trigger voice call for contractor recruitment
        if (phoneNumber) {
          const voiceResult = await TwilioService.makeVoiceCall({
            to: phoneNumber,
            message: fulfillmentText,
            type: 'welcome',
            intent: 'contractor.recruitment',
            customerName
          });
          voiceCallTriggered = voiceResult.success;
          console.log('Contractor recruitment voice call:', voiceResult);
        }
        break;

      case 'customer.service':
        fulfillmentText = `${personalGreeting} I'm Sarah from Remodely AI, and I got your message about your stone surface project. I absolutely love helping people create their dream spaces! Whether you're thinking granite countertops, quartz vanities, or beautiful marble installations, we've got some incredible contractors who can make it happen. Let me call you right now to hear all about your vision!`;
        followupAction = 'voice_call';
        
        // Trigger voice call for customer service
        if (phoneNumber) {
          const voiceResult = await TwilioService.makeVoiceCall({
            to: phoneNumber,
            message: fulfillmentText,
            type: 'quote',
            intent: 'customer.service',
            customerName
          });
          voiceCallTriggered = voiceResult.success;
          console.log('Customer service voice call:', voiceResult);
        }
        break;

      case 'quote.request':
        fulfillmentText = `${personalGreeting} This is Sarah from Remodely AI, and I'm so excited you're thinking about upgrading your stone surfaces! It's such a game changer for any space. I work with some amazing contractors who do beautiful granite, quartz, and marble work - and their pricing is really competitive. I want to hear all about your dream project, so I'm calling you right now to chat!`;
        followupAction = 'voice_call';
        
        // Trigger voice call for quote requests
        if (phoneNumber) {
          const voiceResult = await TwilioService.makeVoiceCall({
            to: phoneNumber,
            message: fulfillmentText,
            type: 'quote',
            intent: 'quote.request',
            customerName
          });
          voiceCallTriggered = voiceResult.success;
          console.log('Quote request voice call:', voiceResult);
        }
        break;

      case 'appointment.booking':
        fulfillmentText = `${personalGreeting} Sarah here from Remodely AI! I saw you want to schedule a consultation - that's awesome! I love helping people bring their stone surface dreams to life. I've got some fantastic contractors who can come take a look at your space and give you some great ideas. Let me call you right now to find a time that works perfectly for you!`;
        followupAction = 'voice_call';
        
        // Trigger voice call for appointment booking
        if (phoneNumber) {
          const voiceResult = await TwilioService.makeVoiceCall({
            to: phoneNumber,
            message: fulfillmentText,
            type: 'booking',
            intent: 'appointment.booking',
            customerName
          });
          voiceCallTriggered = voiceResult.success;
          console.log('Appointment booking voice call:', voiceResult);
        }
        break;

      default:
        fulfillmentText = `${personalGreeting} This is Sarah from Remodely AI! Thanks for reaching out. We're all about connecting Arizona homeowners with amazing stone and surface contractors. Whether you need granite, quartz, marble work, or you're a contractor interested in joining our network, I'd love to help you out! What can I do for you today?`;
        followupAction = 'general_info';
    }

    return NextResponse.json({
      sessionId,
      fulfillmentText,
      followupAction,
      voiceCallTriggered,
      intent: intentName,
      queryText,
      customerName,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Google Agent error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process Google Agent request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function handleContractorRecruitment(payload: GoogleAgentWebhookPayload) {
  const { parameters } = payload
  
  return {
    fulfillmentText: `Great! I see you're interested in joining Remodely.AI as a contractor. ${parameters.businessName ? `For ${parameters.businessName}, ` : ''}our platform connects you with qualified customers in ${parameters.location || 'Arizona'}. You can earn more with zero upfront costs and our 75% close rate. Would you like me to help you get started with the 5-minute registration?`,
    outputContexts: [
      {
        name: `projects/remodely-pro-design-assistant/locations/us-central1/sessions/${payload.sessionId}/contexts/contractor-onboarding`,
        lifespanCount: 5,
        parameters: {
          businessName: parameters.businessName,
          location: parameters.location,
          specialty: parameters.specialty
        }
      }
    ],
    followupAction: 'contractor_registration'
  }
}

async function handleCustomerService(payload: GoogleAgentWebhookPayload) {
  const { parameters } = payload
  
  return {
    fulfillmentText: `Hi ${parameters.customerName || 'there'}! I'm excited to help you with your ${parameters.projectType || 'countertop'} project. Remodely.AI connects you with verified stone and surface contractors in ${parameters.location || 'your area'}. What's your budget range and timeline for this project?`,
    outputContexts: [
      {
        name: `projects/remodely-pro-design-assistant/locations/us-central1/sessions/${payload.sessionId}/contexts/customer-service`,
        lifespanCount: 5,
        parameters: {
          customerName: parameters.customerName,
          projectType: parameters.projectType,
          location: parameters.location,
          budget: parameters.budget
        }
      }
    ],
    followupAction: 'customer_matching'
  }
}

async function handleQuoteRequest(payload: GoogleAgentWebhookPayload) {
  const { parameters } = payload
  
  return {
    fulfillmentText: `Perfect! I'll help you get quotes for your ${parameters.projectType || 'countertop project'}. Based on your ${parameters.squareFootage ? `${parameters.squareFootage} square feet` : 'project size'} and ${parameters.material || 'material preference'}, I can connect you with 3-5 pre-screened contractors who specialize in this work. They'll provide detailed quotes within 24 hours.`,
    outputContexts: [
      {
        name: `projects/remodely-pro-design-assistant/locations/us-central1/sessions/${payload.sessionId}/contexts/quote-processing`,
        lifespanCount: 10,
        parameters: {
          projectType: parameters.projectType,
          squareFootage: parameters.squareFootage,
          material: parameters.material,
          timeline: parameters.timeline
        }
      }
    ],
    followupAction: 'generate_quotes'
  }
}

async function handleAppointmentBooking(payload: GoogleAgentWebhookPayload) {
  const { parameters } = payload
  
  return {
    fulfillmentText: `Excellent! I'll schedule your ${parameters.appointmentType || 'consultation'} for ${parameters.preferredDate || 'your preferred date'}. Our verified contractor will bring samples and provide an on-site assessment. You'll receive a confirmation call within 30 minutes with all the details.`,
    outputContexts: [
      {
        name: `projects/remodely-pro-design-assistant/locations/us-central1/sessions/${payload.sessionId}/contexts/appointment-scheduled`,
        lifespanCount: 3,
        parameters: {
          appointmentType: parameters.appointmentType,
          preferredDate: parameters.preferredDate,
          contactInfo: parameters.contactInfo
        }
      }
    ],
    followupAction: 'schedule_appointment'
  }
}

async function makeFollowupCall(phoneNumber: string, userType: string, intentName: string) {
  try {
    let message = ""
    
    if (userType === 'contractor') {
      message = `Hi! This is a follow-up from our AI conversation. Welcome to Remodely.AI! Your contractor profile registration is ready. Visit remodely.ai/signup/contractor to complete your setup and start receiving quote requests immediately.`
    } else {
      message = `Hello! Following up on our conversation about your countertop project. I've identified several qualified contractors in your area. Visit remodely.ai to view their profiles, portfolios, and get instant quotes. You can also schedule consultations directly through the platform.`
    }
    
    const success = await TwilioService.makeVoiceCall({
      to: phoneNumber,
      message,
      type: 'reminder'
    })
    
    console.log(`📞 Follow-up call ${success ? 'succeeded' : 'failed'} for ${userType}:`, phoneNumber)
    
  } catch (error) {
    console.error('Follow-up call error:', error)
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'active',
    service: 'Google Conversational Agents Integration',
    agent: 'remodely-pro-design-assistant',
    agentId: 'ccb0cee7-9d14-45f2-af52-cac51b27d522',
    location: 'us-central1',
    capabilities: [
      'contractor-recruitment',
      'customer-service', 
      'quote-requests',
      'appointment-booking',
      'follow-up-calls'
    ],
    timestamp: new Date().toISOString()
  })
}
