import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const contactData = await request.json();

    // Log the white label inquiry
    console.log('White Label Inquiry:', {
      company: contactData.companyName,
      contact: contactData.contactName,
      email: contactData.email,
      plan: contactData.selectedPlan,
      customers: contactData.currentCustomers,
      integrationType: contactData.integrationType,
      timestamp: contactData.timestamp
    });

    // In production, this would:
    // 1. Store in database
    // 2. Send notification to sales team
    // 3. Add to CRM system
    // 4. Send auto-reply email
    // 5. Create QuickBooks prospect record

    // Mock email to sales team
    const salesNotification = {
      to: 'sales@remodely.ai',
      subject: `White Label Inquiry - ${contactData.companyName}`,
      template: 'white_label_inquiry',
      data: contactData
    };

    // Mock auto-reply to prospect
    const autoReply = {
      to: contactData.email,
      subject: 'Thank you for your interest in Remodely.AI White Label Solutions',
      template: 'white_label_auto_reply',
      data: {
        contactName: contactData.contactName,
        companyName: contactData.companyName,
        selectedPlan: contactData.selectedPlan
      }
    };

    // Generate follow-up information
    const followUpInfo = {
      prospectId: `wl_${Date.now()}`,
      estimatedValue: getEstimatedValue(contactData.selectedPlan, contactData.currentCustomers),
      nextSteps: [
        'Technical requirements assessment',
        'Custom demo preparation',
        'Pricing proposal creation',
        'Implementation timeline planning'
      ],
      assignedAgent: getAssignedAgent(contactData.email)
    };

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! Our team will contact you within 24 hours.',
      prospectId: followUpInfo.prospectId,
      estimatedResponse: '24 hours',
      nextSteps: followUpInfo.nextSteps,
      assignedAgent: followUpInfo.assignedAgent
    });

  } catch (error) {
    console.error('White label contact error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process inquiry',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function getEstimatedValue(plan: string, customerCount: string): number {
  const planMultipliers = {
    starter: 499,
    professional: 999,
    enterprise: 2499
  };

  const customerMultipliers = {
    '1-50': 1,
    '51-200': 1.5,
    '201-1000': 2.5,
    '1000+': 4
  };

  const basePlan = planMultipliers[plan as keyof typeof planMultipliers] || 999;
  const customerMultiplier = customerMultipliers[customerCount as keyof typeof customerMultipliers] || 1;

  return basePlan * customerMultiplier * 12; // Annual value
}

function getAssignedAgent(email: string): string {
  // Check if using @remodely.ai email for agent assignment
  if (email.includes('@remodely.ai')) {
    return 'Internal Agent Assignment';
  }

  // Simple round-robin assignment
  const agents = [
    'Sarah Johnson - Enterprise Sales',
    'David Chen - Partnership Manager',
    'Emma Rodriguez - Technical Solutions'
  ];

  const index = Math.floor(Math.random() * agents.length);
  return agents[index];
}
