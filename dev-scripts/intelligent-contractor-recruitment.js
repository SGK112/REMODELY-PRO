const { SessionsClient } = require('@google-cloud/dialogflow-cx');
const { VoiceClient } = require('@google-cloud/voice');
require('dotenv').config();

class RemodellyContractorRecruitmentAgent {
    constructor() {
        this.dialogflowClient = new SessionsClient();
        this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
        this.location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
        this.agentId = process.env.DIALOGFLOW_AGENT_ID;
    }

    async recruitContractor(contractorData) {
        const { name, phone, specialty, location, businessSize, yearsInBusiness } = contractorData;

        console.log(`🎯 Initiating contractor recruitment call to ${name} (${specialty})`);

        try {
            // Create personalized conversation session
            const sessionId = `contractor-${Date.now()}-${phone.replace(/\D/g, '')}`;
            const sessionPath = this.dialogflowClient.projectLocationAgentSessionPath(
                this.projectId,
                this.location,
                this.agentId,
                sessionId
            );

            // Set up contractor context for personalized conversation
            const initialContext = {
                contractorName: name,
                specialty: specialty,
                location: location,
                businessProfile: this.generateBusinessProfile(contractorData),
                valueProposition: this.generateValueProposition(contractorData),
                expectedObjections: this.predictObjections(contractorData)
            };

            // Start intelligent conversation flow
            const conversationFlow = await this.createRecruitmentFlow(initialContext);

            // Make the call using Google Voice Gateway
            const call = await this.initiateIntelligentCall({
                phone,
                sessionPath,
                conversationFlow,
                context: initialContext
            });

            console.log(`✅ Recruitment call initiated: ${call.callId}`);
            return call;

        } catch (error) {
            console.error(`❌ Error recruiting contractor ${name}:`, error);
            throw error;
        }
    }

    generateBusinessProfile(contractorData) {
        const { specialty, yearsInBusiness, businessSize } = contractorData;

        const profiles = {
            kitchen: {
                pain_points: ['seasonal fluctuations', 'high material costs', 'long project timelines'],
                opportunities: ['high-value projects', 'repeat customers', 'referral potential']
            },
            bathroom: {
                pain_points: ['technical complexity', 'permit requirements', 'customer expectations'],
                opportunities: ['premium pricing', 'quick turnaround', 'showcase projects']
            },
            whole_home: {
                pain_points: ['project management complexity', 'multiple trades coordination', 'financing challenges'],
                opportunities: ['large contracts', 'long-term relationships', 'comprehensive services']
            }
        };

        return profiles[specialty] || profiles.kitchen;
    }

    generateValueProposition(contractorData) {
        const { specialty, location, businessSize } = contractorData;

        return {
            primary_benefit: `We have homeowners in ${location} specifically looking for ${specialty} contractors right now`,

            secondary_benefits: [
                "Pre-qualified leads save you time on consultations",
                "Professional platform showcases your work to serious buyers",
                "Automated quote system reduces administrative work",
                "Customer rating system builds your reputation",
                "No upfront costs - we succeed when you do"
            ],

            social_proof: businessSize === 'small'
                ? "Over 500 small contractors have grown their business 40% using our platform"
                : "Established contractors report 25% higher profit margins on our qualified leads",

            urgency: `We have ${this.getLocalLeadCount(location)} homeowners waiting for quotes in your area`
        };
    }

    predictObjections(contractorData) {
        const { yearsInBusiness, businessSize, specialty } = contractorData;

        const commonObjections = {
            too_busy: {
                response: "I understand you're busy - that's exactly why our system is valuable. We handle lead generation and qualification, so you only spend time on serious prospects who are ready to move forward.",
                followup: "Most contractors find they can take on 30% more projects with the same time investment."
            },

            commission_concerns: {
                response: "I appreciate that concern. We only charge a small percentage when you successfully complete a project. No upfront costs, no monthly fees, no risk to you.",
                followup: "The leads are so well-qualified that most contractors see higher profit margins even after our fee."
            },

            existing_lead_sources: {
                response: "That's great that you have existing sources. Our platform complements what you're already doing - think of us as your premium lead channel.",
                followup: `Many ${specialty} contractors use us for their high-value projects while keeping their other sources for smaller jobs.`
            },

            quality_concerns: {
                response: "Quality is our top priority. We pre-screen every homeowner for budget, timeline, and project readiness before they ever contact you.",
                followup: "Our contractors report a 75% close rate on our leads versus 20% industry average."
            }
        };

        // Predict likely objections based on contractor profile
        if (yearsInBusiness > 10) {
            return [commonObjections.existing_lead_sources, commonObjections.commission_concerns];
        } else if (businessSize === 'small') {
            return [commonObjections.quality_concerns, commonObjections.too_busy];
        } else {
            return [commonObjections.commission_concerns, commonObjections.quality_concerns];
        }
    }

    async createRecruitmentFlow(context) {
        return {
            introduction: {
                message: `Hi ${context.contractorName}, this is Sarah from REMODELY AI. I hope I'm catching you at a good time.`,
                next: 'establish_credibility'
            },

            establish_credibility: {
                message: `We're a renovation marketplace that connects qualified homeowners with vetted contractors like yourself. I'm calling because we have several homeowners in ${context.location} specifically looking for ${context.specialty} work.`,
                next: 'assess_interest'
            },

            assess_interest: {
                question: "Are you currently taking on new projects, or is your schedule pretty full right now?",
                responses: {
                    taking_projects: 'present_opportunity',
                    schedule_full: 'future_opportunity',
                    depends: 'qualify_leads'
                }
            },

            present_opportunity: {
                message: context.valueProposition.primary_benefit,
                details: context.valueProposition.secondary_benefits,
                next: 'handle_questions'
            },

            handle_questions: {
                anticipated_objections: context.expectedObjections,
                social_proof: context.valueProposition.social_proof,
                next: 'close_for_signup'
            },

            close_for_signup: {
                question: "Can I get you set up with a contractor profile today? It takes about 5 minutes and you can start receiving qualified leads this week.",
                success_action: 'collect_signup_info',
                objection_action: 'schedule_followup'
            },

            collect_signup_info: {
                required_fields: ['email', 'license_number', 'insurance_info', 'service_areas'],
                next: 'confirm_signup'
            },

            schedule_followup: {
                options: ['call_tomorrow', 'email_info', 'call_next_week'],
                message: "No problem at all. When would be a better time to discuss this opportunity?"
            }
        };
    }

    async initiateIntelligentCall({ phone, sessionPath, conversationFlow, context }) {
        // This would integrate with Google Cloud Voice Gateway
        const callConfig = {
            to: phone,
            from: process.env.REMODELY_PHONE_NUMBER,

            // Use Google's advanced TTS (much better than Polly)
            voiceConfig: {
                languageCode: 'en-US',
                name: 'en-US-Neural2-A', // Google's premium neural voice
                ssmlGender: 'FEMALE',
                speakingRate: 1.0,
                pitch: 0.0
            },

            // Conversation management
            conversationConfig: {
                sessionPath: sessionPath,
                conversationFlow: conversationFlow,
                context: context,

                // Advanced features
                sentimentAnalysis: true,
                realTimeTranscription: true,
                conversationSummary: true
            }
        };

        // For demo purposes, simulate the call
        console.log('📞 Simulating Google Cloud Voice Gateway call...');
        console.log(`   To: ${phone}`);
        console.log(`   Voice: ${callConfig.voiceConfig.name}`);
        console.log(`   Opening: "${conversationFlow.introduction.message}"`);

        return {
            callId: `gc_${Date.now()}`,
            sessionId: sessionPath.split('/').pop(),
            status: 'initiated',
            expectedDuration: '5-8 minutes',
            conversationFlow: conversationFlow
        };
    }

    getLocalLeadCount(location) {
        // Simulate dynamic lead count
        const baseCounts = {
            'Phoenix': 45,
            'Scottsdale': 23,
            'Tempe': 18,
            'Mesa': 31,
            'Chandler': 27
        };

        return baseCounts[location] || Math.floor(Math.random() * 30) + 15;
    }

    // Analytics and reporting
    async trackRecruitmentMetrics(callResult) {
        const metrics = {
            callDuration: callResult.duration,
            outcome: callResult.outcome, // signup, callback, not_interested
            objections: callResult.objections,
            conversionStep: callResult.lastStep,
            followupScheduled: callResult.followup
        };

        // Store in analytics database
        console.log('📊 Recruitment metrics:', metrics);
        return metrics;
    }
}

// Example usage for contractor recruitment campaign
async function runContractorRecruitmentCampaign() {
    const agent = new RemodellyContractorRecruitmentAgent();

    // Example contractor database
    const contractorsToRecruit = [
        {
            name: "Mike's Kitchen Renovations",
            phone: "+14802555887", // Using test number
            specialty: "kitchen",
            location: "Phoenix",
            businessSize: "small",
            yearsInBusiness: 8
        },
        {
            name: "Elite Bathroom Designs",
            phone: "+14802555887",
            specialty: "bathroom",
            location: "Scottsdale",
            businessSize: "medium",
            yearsInBusiness: 15
        }
    ];

    console.log('🚀 Starting contractor recruitment campaign...');

    for (const contractor of contractorsToRecruit) {
        try {
            const result = await agent.recruitContractor(contractor);
            console.log(`✅ Successfully initiated recruitment call for ${contractor.name}`);

            // Add delay between calls (respectful calling practice)
            await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minute delay

        } catch (error) {
            console.error(`❌ Failed to recruit ${contractor.name}:`, error.message);
        }
    }

    console.log('🎯 Contractor recruitment campaign completed!');
}

module.exports = { RemodellyContractorRecruitmentAgent, runContractorRecruitmentCampaign };

// For testing
if (require.main === module) {
    runContractorRecruitmentCampaign().catch(console.error);
}
