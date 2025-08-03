# Google Cloud Conversational Agent Setup Guide for REMODELY AI

## 🎯 RECOMMENDED CONFIGURATION

### **Agent Settings**
```
Display name: REMODELY AI Marketplace Agent
Location: us-central1 (Iowa, USA) ✅ CORRECT
Time zone: (GMT-7:00) America/Phoenix ⚠️ CHANGE THIS
Default language: en — English ✅ CORRECT
```

### **Important Setting Changes Needed:**

#### 1. **Time Zone** - CHANGE TO PHOENIX
```
Current: (GMT-8:00) America/Los_Angeles
Recommended: (GMT-7:00) America/Phoenix
```
**Why?** Your business operates in Arizona, and contractor calls should respect local business hours.

#### 2. **Conversation Start Method** - CHOOSE PLAYBOOK
```
✅ Playbook: Use generative AI to understand and steer user requests
❌ Flow: Set up pre-defined pages and rules
```
**Why?** Playbooks are better for complex sales conversations with dynamic responses.

## 🚀 DETAILED SETUP INSTRUCTIONS

### Step 1: Basic Agent Configuration
```javascript
const agentConfig = {
  displayName: "REMODELY AI Marketplace Agent",
  location: "us-central1", // Keep as-is for best performance
  timeZone: "America/Phoenix", // CHANGE THIS - matches your business
  defaultLanguage: "en",
  description: "AI agent for contractor recruitment and homeowner service in renovation marketplace"
};
```

### Step 2: Choose PLAYBOOK for Conversation Start
**Playbook Benefits for REMODELY AI:**
- **Natural conversation flow** - handles unexpected responses
- **Context awareness** - remembers what was said earlier
- **Flexible objection handling** - adapts to contractor concerns
- **Generative responses** - not limited to pre-written scripts
- **Better for sales conversations** - can improvise and persuade

### Step 3: Initial Playbook Configuration
After creating the agent, you'll set up two main playbooks:

#### **Playbook 1: Contractor Recruitment**
```yaml
name: "Contractor Recruitment Playbook"
goal: "Recruit contractors to join REMODELY AI platform"
instructions: |
  You are Sarah, a professional recruiter for REMODELY AI renovation marketplace.
  
  Your goals:
  1. Introduce REMODELY AI as a renovation marketplace
  2. Assess if contractor is taking new projects
  3. Present value proposition (pre-qualified leads, no upfront costs)
  4. Handle objections professionally
  5. Close for contractor signup
  
  Personality: Professional, friendly, energetic, helpful
  Tone: Business professional but conversational
  
  Key talking points:
  - Pre-qualified homeowner leads
  - 75% close rate vs 20% industry average
  - No upfront costs, commission only on completed projects
  - Professional profile and portfolio showcase
  - Automated quote system saves time
```

#### **Playbook 2: Homeowner Service**
```yaml
name: "Homeowner Service Playbook"  
goal: "Help homeowners find perfect contractors for renovation projects"
instructions: |
  You are David, a helpful customer service representative for REMODELY AI.
  
  Your goals:
  1. Greet homeowner personally (use their name: Josh/Joshua)
  2. Identify project type (kitchen, bathroom, whole home)
  3. Collect location and budget information
  4. Match with qualified contractors
  5. Coordinate contractor introductions
  
  Personality: Helpful, personal, knowledgeable, trustworthy
  Tone: Friendly customer service, use customer name frequently
  
  Remember: The customer's name is Josh (casual) or Joshua (formal)
```

## 📋 STEP-BY-STEP CREATION PROCESS

### 1. **Fill Out Form with These Exact Values:**
```
Display name: REMODELY AI Marketplace Agent
Location: us-central1 (Iowa, USA) [Keep as shown]
Time zone: (GMT-7:00) America/Phoenix [CHANGE from Los_Angeles]
Default language: en — English [Keep as shown]
Conversation start: Playbook [SELECT THIS]
```

### 2. **Click "Create Agent"**

### 3. **After Creation, Set Up Playbooks:**
You'll be taken to the agent dashboard where you can:
- Create the Contractor Recruitment playbook
- Create the Homeowner Service playbook  
- Configure voice integration
- Set up webhooks for Twilio integration

## 🎤 VOICE INTEGRATION SETUP (After Agent Creation)

### Step 1: Enable Voice Gateway
```javascript
// After agent creation, configure voice
const voiceConfig = {
  telephony: {
    conversationProfile: `projects/YOUR_PROJECT/locations/us-central1/conversationProfiles/YOUR_PROFILE`,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER
  },
  audioConfig: {
    synthesizeSpeechConfig: {
      voice: {
        name: 'en-US-Neural2-A', // Much better than Polly
        ssmlGender: 'FEMALE'
      },
      speakingRate: 1.1, // Slightly faster as you requested
      pitch: 2.0 // Higher pitch for younger sound
    }
  }
};
```

### Step 2: Connect to Your Existing System
The agent will integrate with your current:
- Twilio phone system
- Voice webhook handlers
- Customer database (Josh's information)
- Contractor database

## 🚀 IMMEDIATE NEXT STEPS

1. **Create the agent** with the settings above
2. **Set up Contractor Recruitment playbook** first (higher ROI)
3. **Test with your phone number** 
4. **Add Homeowner Service playbook**
5. **Integrate with existing webhook system**

## 🎤 SPEECH-TO-TEXT CONFIGURATION

### **Recommended Settings:**

#### **Enable Auto Speech Adaptation** ✅ TURN ON
```
☑️ Enable auto speech adaptation
Use agent information (e.g. intents, entities) to automatically improve speech recognition quality.
```
**Why:** This helps the agent better understand contractor terminology like "countertops," "backsplash," "kitchen renovation," etc.

#### **Advanced Speech Settings** ✅ TURN ON  
```
☑️ Enable advanced speech settings
Configure agent-level advanced settings for speech features.
```
**Benefits:**
- Better recognition of construction industry terms
- Improved handling of proper names (contractor names, cities)
- Enhanced recognition of budget numbers and project timelines

#### **DTMF Settings** ❌ LEAVE OFF (For Now)
```
☐ Enable DTMF
Allow Conversational Agents to process incoming audio as DTMF events.
```
**Why Skip:** DTMF is for phone keypad inputs. Your conversations are voice-only, so this isn't needed initially.

## 📞 CALL COMPANION RECOMMENDATIONS

### **What is Call Companion?**
Call Companion provides real-time assistance during calls, helping agents with:
- Suggested responses during objections
- Real-time sentiment analysis
- Call quality monitoring
- Conversation insights

### **For REMODELY AI Usage:**

#### **Enable Call Companion** ✅ RECOMMENDED
- **Contractor Recruitment:** Helps Sarah handle objections in real-time
- **Homeowner Service:** Assists David with project-specific questions
- **Quality Assurance:** Monitors call success rates and conversation quality

#### **Key Features to Configure:**
1. **Real-time Suggestions:** Provides response options during difficult moments
2. **Sentiment Monitoring:** Alerts when contractor/homeowner becomes frustrated
3. **Call Analytics:** Tracks conversion rates and common objection patterns
4. **Compliance Monitoring:** Ensures professional communication standards

## ⚠️ CRITICAL: Time Zone Setting
**Make sure to change the time zone to America/Phoenix!** This ensures:
- Contractor calls happen during business hours
- Scheduling works correctly for Arizona time
- Follow-up calls are timed appropriately

## 🚀 COMPLETE SETUP CHECKLIST

### **Agent Configuration:**
- [x] Display name: REMODELY AI Marketplace Agent
- [x] Location: us-central1 (Iowa, USA)
- [x] Time zone: (GMT-7:00) America/Phoenix
- [x] Conversation start: Playbook

### **Voice Settings:**
- [x] Voice: en-US-Neural2-A (Sarah) or en-US-Neural2-C (David)
- [x] Speaking rate: 1.1 (10% faster)
- [x] Voice pitch: 2 (younger sound)

### **Speech-to-Text:**
- [x] Enable auto speech adaptation
- [x] Enable advanced speech settings
- [ ] DTMF (skip for now)

### **Call Companion:**
- [x] Enable Call Companion (recommended)
- [x] Real-time suggestions
- [x] Sentiment monitoring
- [x] Call analytics

Ready to create some amazing contractor recruitment and homeowner service conversations!
