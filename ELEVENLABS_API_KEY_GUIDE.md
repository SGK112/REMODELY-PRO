# 🔑 ElevenLabs API Key Configuration Guide

## ✅ **Your ElevenLabs Account Status:**

**Credit Limit**: Unlimited ✅
**Available Features**:
- ✅ Text to Speech (Perfect for voice generation)
- ✅ Speech to Speech (Voice conversion)
- ✅ Speech to Text (Voice recognition)
- ✅ Sound Effects
- ✅ Audio Isolation

**This is exactly what we need for REMODELY.AI voice features!**

---

## 🔍 **How to Find Your API Key:**

### **Method 1: Direct Link**
1. **Go to**: https://elevenlabs.io/app/settings
2. **Look for**: "API Key" section (usually in the left sidebar or main settings)
3. **Click**: "Show" or "Reveal" button
4. **Copy**: The API key (starts with `sk_` or similar)

### **Method 2: Navigation**
1. **Login to**: https://elevenlabs.io/
2. **Click**: Your profile/avatar (top right)
3. **Select**: "Settings" or "Account Settings"
4. **Find**: "API Keys" or "API Access" section
5. **Generate/Copy**: Your API key

### **Method 3: Profile Menu**
1. **Go to**: https://elevenlabs.io/app
2. **Click**: Profile menu (usually top-right corner)
3. **Look for**: "API Key", "Developer Settings", or "Integration"
4. **Copy**: The key

---

## 🔧 **Configure Your .env File:**

**Once you have the API key, replace this line in your .env:**

```env
# CHANGE THIS:
ELEVENLABS_API_KEY="your-elevenlabs-api-key-here"

# TO THIS (with your real key):
ELEVENLABS_API_KEY="sk_your_actual_api_key_from_elevenlabs"
```

---

## 🧪 **Test Your Configuration:**

**After adding your API key, run:**
```bash
node test-elevenlabs-setup.js
```

**This will:**
- ✅ Verify your API key works
- ✅ Confirm Sarah's voice is accessible
- ✅ Generate sample audio
- ✅ Test all features

---

## 🎤 **What You'll Get:**

### **Sarah's Voice Integration:**
- **Voice ID**: `uYXf8XasLslADfZ2MB4u` (already configured)
- **Features**: Professional AI voice for customer consultations
- **Usage**: Voice consultation feature at `/voice-consultation`

### **Available Features:**
```typescript
// Text to Speech (Your account ✅)
const audio = await elevenLabs.textToSpeech(
  "Hello, I'm Sarah from Remodely!", 
  "uYXf8XasLslADfZ2MB4u"
);

// Speech to Speech (Your account ✅)  
const convertedAudio = await elevenLabs.speechToSpeech(
  audioFile, 
  "uYXf8XasLslADfZ2MB4u"
);

// Speech to Text (Your account ✅)
const transcript = await elevenLabs.speechToText(audioFile);
```

---

## 🚀 **Quick Setup Steps:**

1. **Get API Key**: https://elevenlabs.io/app/settings
2. **Update .env**: Replace `ELEVENLABS_API_KEY="your-elevenlabs-api-key-here"`
3. **Test Setup**: Run `node test-elevenlabs-setup.js`
4. **Use Voice AI**: Visit http://localhost:3001/voice-consultation

---

## 🔍 **If You Can't Find the API Key:**

**Try these locations in your ElevenLabs dashboard:**
- Settings → API Key
- Profile → Developer Settings
- Account → Integration
- Billing → API Access
- Left sidebar → "API" or "Keys"

**Or contact ElevenLabs support - they can show you exactly where it is!**

---

**With unlimited credits and Text-to-Speech access, you're all set for professional voice AI! Just need that API key and you're ready to go! 🎉**
