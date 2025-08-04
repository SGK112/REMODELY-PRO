# 🎤 ElevenLabs Integration Setup Guide

## ✅ **What You Already Have:**

### **Sarah's Voice ID**
- **Voice ID**: `uYXf8XasLslADfZ2MB4u` ✅
- **Voice URL**: https://elevenlabs.io/app/voice-library?voiceId=uYXf8XasLslADfZ2MB4u
- **Status**: ✅ Already added to your .env file

---

## 🔑 **What You Need to Get from ElevenLabs:**

### **1. API Key (Required)**

**Where to find it:**
1. Go to: https://elevenlabs.io/app/settings
2. Look for **"API Key"** section
3. Copy the key (starts with `sk_...`)

**Add to your .env:**
```env
ELEVENLABS_API_KEY="sk_your_actual_api_key_here"
```

### **2. Voice Agent ID (Optional - for advanced features)**

**Where to find it:**
1. Go to: https://elevenlabs.io/app/voice-agents
2. Create a new agent or use existing one
3. Copy the agent ID (starts with `agent_...`)

**Add to your .env:**
```env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID="agent_your_actual_agent_id_here"
```

---

## 🧪 **Test Your Setup:**

### **Quick Test Script:**
```bash
# Run this to test your ElevenLabs integration:
node -e "
const fetch = require('node-fetch');
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with real key

fetch('https://api.elevenlabs.io/v1/voices', {
  headers: { 'xi-api-key': apiKey }
})
.then(r => r.json())
.then(d => console.log('✅ ElevenLabs connected!', d.voices?.length, 'voices available'))
.catch(e => console.log('❌ Error:', e.message));
"
```

### **Test Sarah's Voice:**
```bash
# Test text-to-speech with Sarah's voice:
curl -X POST 'https://api.elevenlabs.io/v1/text-to-speech/uYXf8XasLslADfZ2MB4u' \
  -H 'xi-api-key: YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json' \
  -d '{"text":"Hello! I am Sarah, your AI assistant for Remodely.", "model_id":"eleven_monolingual_v1"}'
```

---

## 🚀 **How It Works in REMODELY.AI:**

### **Voice Consultation Feature:**
- **URL**: http://localhost:3001/voice-consultation
- **Uses**: Sarah's voice (`uYXf8XasLslADfZ2MB4u`)
- **Features**: 
  - Real-time voice conversations
  - AI-powered responses
  - Professional contractor matching

### **Current Integration:**
```typescript
// lib/elevenLabsService.ts already configured
const service = new ElevenLabsService();
const audio = await service.textToSpeech(
  "Hello, I'm Sarah from Remodely!",
  "uYXf8XasLslADfZ2MB4u" // Your Sarah voice
);
```

---

## 📊 **ElevenLabs Pricing (for reference):**

| Plan | Price | Characters/month | Features |
|------|-------|------------------|-----------|
| **Free** | $0 | 10,000 | Basic voices |
| **Starter** | $5 | 30,000 | Premium voices |
| **Creator** | $22 | 100,000 | Voice cloning |
| **Pro** | $99 | 500,000 | Commercial use |

---

## 🎯 **Next Steps:**

### **Immediate (5 minutes):**
1. ✅ Voice ID added to .env
2. 🔄 Get API key from https://elevenlabs.io/app/settings
3. 🔄 Update ELEVENLABS_API_KEY in .env

### **Optional (Advanced features):**
1. Create voice agent at https://elevenlabs.io/app/voice-agents
2. Update NEXT_PUBLIC_ELEVENLABS_AGENT_ID in .env
3. Test full voice conversation feature

---

## ✅ **Summary:**

**You have:**
- ✅ Sarah's voice ID: `uYXf8XasLslADfZ2MB4u`
- ✅ ElevenLabs integration code
- ✅ Voice consultation feature

**You need:**
- 🔑 **API Key** from https://elevenlabs.io/app/settings
- 🔑 **Agent ID** (optional) from https://elevenlabs.io/app/voice-agents

**Once you get the API key, your voice AI will be fully functional!** 🎉
