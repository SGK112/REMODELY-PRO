import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface ConversationalAgentRequest {
  fulfillmentInfo: {
    tag: string
  }
  sessionInfo: {
    session: string
    parameters: Record<string, any>
  }
  text: string
  languageCode?: string
}

interface ConversationalAgentResponse {
  fulfillmentResponse: {
    messages: Array<{
      text: {
        text: string[]
      }
    }>
    merge_behavior?: string
  }
  sessionInfo?: {
    parameters: Record<string, any>
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ConversationalAgentRequest = await request.json()
    
    console.log('📞 Google Conversational Agent Request:', JSON.stringify(body, null, 2))

    const { fulfillmentInfo, sessionInfo, text } = body
    const { tag } = fulfillmentInfo
    const { parameters } = sessionInfo

    let response: ConversationalAgentResponse

    switch (tag) {
      case 'find_contractors':
      case 'search_contractors':
        response = await handleContractorSearch(parameters)
        break
        
      case 'create_quote':
        response = await handleQuoteCreation(parameters)
        break
        
      case 'get_contractor_info':
        response = await handleContractorInfo(parameters)
        break
        
      case 'schedule_consultation':
        response = await handleScheduleConsultation(parameters)
        break
        
      default:
        response = {
          fulfillmentResponse: {
            messages: [{
              text: {
                text: ["I'm here to help you find contractors and manage your home renovation projects. What can I assist you with today?"]
              }
            }]
          }
        }
    }

    console.log('📤 Google Conversational Agent Response:', JSON.stringify(response, null, 2))
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('❌ Google Conversational Agent Error:', error)
    
    return NextResponse.json({
      fulfillmentResponse: {
        messages: [{
          text: {
            text: ["I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment."]
          }
        }]
      }
    })
  }
}

async function handleContractorSearch(parameters: Record<string, any>): Promise<ConversationalAgentResponse> {
  try {
    const location = parameters.location || parameters.city || 'Arizona'
    const specialty = parameters.specialty || parameters.project_type || 'general contracting'
    
    // Search contractors in database
    const contractors = await prisma.contractor.findMany({
      where: {
        OR: [
          { city: { contains: location } },
          { state: { contains: location } },
          { serviceArea: { contains: location } }
        ],
        specialties: { contains: specialty }
      },
      take: 5,
      orderBy: { rating: 'desc' }
    })

    if (contractors.length > 0) {
      const contractorList = contractors.map((c, index) => 
        `${index + 1}. ${c.businessName} - ${c.city}, ${c.state} (Rating: ${c.rating}/5)`
      ).join('\n')

      return {
        fulfillmentResponse: {
          messages: [{
            text: {
              text: [`I found ${contractors.length} contractors for ${specialty} in ${location}:\n\n${contractorList}\n\nWould you like more details about any of these contractors?`]
            }
          }]
        },
        sessionInfo: {
          parameters: {
            ...parameters,
            found_contractors: contractors.map(c => c.id),
            search_results_count: contractors.length
          }
        }
      }
    } else {
      return {
        fulfillmentResponse: {
          messages: [{
            text: {
              text: [`I couldn't find any ${specialty} contractors in ${location} right now. Would you like me to search in nearby areas or help you with a different type of project?`]
            }
          }]
        }
      }
    }
  } catch (error) {
    console.error('Error searching contractors:', error)
    return {
      fulfillmentResponse: {
        messages: [{
          text: {
            text: ["I'm having trouble searching for contractors right now. Please try again in a moment."]
          }
        }]
      }
    }
  }
}

async function handleQuoteCreation(parameters: Record<string, any>): Promise<ConversationalAgentResponse> {
  try {
    const {
      contractor_id,
      project_description,
      square_footage,
      materials,
      location,
      budget
    } = parameters

    // For demo purposes, we'll create a mock quote
    // In production, this would integrate with your quote system
    
    return {
      fulfillmentResponse: {
        messages: [{
          text: {
            text: [`I've initiated a quote request for your ${project_description || 'project'}. Here are the details:

📍 Location: ${location || 'Not specified'}
📏 Square Footage: ${square_footage || 'To be measured'}
🏗️ Materials: ${materials || 'To be determined'}
💰 Budget: $${budget || 'To be discussed'}

A contractor will contact you within 24 hours to provide a detailed quote. Is there anything else you'd like to add to this request?`]
          }
        }]
      },
      sessionInfo: {
        parameters: {
          ...parameters,
          quote_status: 'initiated',
          quote_id: `quote_${Date.now()}`
        }
      }
    }
  } catch (error) {
    console.error('Error creating quote:', error)
    return {
      fulfillmentResponse: {
        messages: [{
          text: {
            text: ["I'm having trouble creating your quote request right now. Please try again in a moment."]
          }
        }]
      }
    }
  }
}

async function handleContractorInfo(parameters: Record<string, any>): Promise<ConversationalAgentResponse> {
  try {
    const contractorId = parameters.contractor_id
    
    if (!contractorId) {
      return {
        fulfillmentResponse: {
          messages: [{
            text: {
              text: ["Which contractor would you like to know more about? Please provide the contractor's name or ID."]
            }
          }]
        }
      }
    }

    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        user: true,
        reviews: {
          take: 3,
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!contractor) {
      return {
        fulfillmentResponse: {
          messages: [{
            text: {
              text: ["I couldn't find information about that contractor. Please check the contractor ID or name."]
            }
          }]
        }
      }
    }

    const specialties = JSON.parse(contractor.specialties || '[]')
    const recentReviews = contractor.reviews.length > 0 
      ? `\n\nRecent reviews:\n${contractor.reviews.map(r => `⭐ ${r.rating}/5: "${r.comment || 'Great service'}"`).join('\n')}`
      : ''

    return {
      fulfillmentResponse: {
        messages: [{
          text: {
            text: [`Here's information about ${contractor.businessName}:

📍 Location: ${contractor.city}, ${contractor.state}
⭐ Rating: ${contractor.rating}/5 (${contractor.reviewCount} reviews)
🛠️ Specialties: ${specialties.join(', ')}
📞 Phone: ${contractor.phone || 'Contact through platform'}
💼 Years in Business: ${contractor.yearsInBusiness || 'Not specified'}
${contractor.description ? `\n📋 About: ${contractor.description}` : ''}${recentReviews}

Would you like to request a quote from ${contractor.businessName}?`]
          }
        }]
      },
      sessionInfo: {
        parameters: {
          ...parameters,
          selected_contractor: contractor.id,
          contractor_name: contractor.businessName
        }
      }
    }
  } catch (error) {
    console.error('Error getting contractor info:', error)
    return {
      fulfillmentResponse: {
        messages: [{
          text: {
            text: ["I'm having trouble retrieving contractor information right now. Please try again in a moment."]
          }
        }]
      }
    }
  }
}

async function handleScheduleConsultation(parameters: Record<string, any>): Promise<ConversationalAgentResponse> {
  return {
    fulfillmentResponse: {
      messages: [{
        text: {
          text: [`I'd be happy to help you schedule a consultation! 

To schedule a consultation, I'll need:
📅 Your preferred date and time
📞 Your contact information
🏠 Your project location
📋 Brief description of your project

Please provide these details and I'll connect you with the right contractor for a consultation.`]
        }
      }]
    },
    sessionInfo: {
      parameters: {
        ...parameters,
        consultation_requested: true
      }
    }
  }
}
