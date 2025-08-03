# Twilio TwiML App Configuration Guide

## 🎯 **Configure These URLs in Your Twilio Console**

### **Step 1: Create TwiML App**
1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Develop** → **TwiML Apps**
3. Click **Create new TwiML App**

### **Step 2: Configure Webhook URLs**

**App Name:** `Remodely AI Voice System`

**Voice Configuration:**
- **Request URL:** `https://your-domain.com/api/voice/webhook`
- **HTTP Method:** `POST`
- **Fallback URL:** `https://your-domain.com/api/voice/webhook`
- **Fallback HTTP Method:** `POST`

**Messaging Configuration:**
- **Request URL:** `https://your-domain.com/api/voice/webhook`
- **HTTP Method:** `POST`

### **Step 3: For Local Development**

If testing locally, use ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3001

# Use the https URL in Twilio (e.g., https://abc123.ngrok.io)
```

**Local Development URLs:**
- **Request URL:** `https://your-ngrok-url.ngrok.io/api/voice/webhook`
- **Fallback URL:** `https://your-ngrok-url.ngrok.io/api/voice/webhook`

### **Step 4: Production URLs (Render.com)**

**Production URLs:**
- **Request URL:** `https://remodely-ai.onrender.com/api/voice/webhook`
- **Fallback URL:** `https://remodely-ai.onrender.com/api/voice/webhook`

---

## 🔧 **Current Webhook Endpoints**

Our system provides these dynamic endpoints:

### **Main Webhook:** `/api/voice/webhook`
- Handles initial call routing based on intent
- Processes user menu selections
- Provides personalized responses

**Query Parameters:**
- `intent` - The call intent (contractor.recruitment, customer.service, quote.request, appointment.booking)
- `name` - Customer name for personalization

**Example URLs:**
```
/api/voice/webhook?intent=contractor.recruitment&name=Mike
/api/voice/webhook?intent=quote.request&name=Jessica
/api/voice/webhook?intent=customer.service
```

### **Status Callback:** `/api/voice/status`
- Receives call status updates from Twilio
- Logs call completion, duration, etc.

---

## 🎭 **How It Works**

1. **Google Agent** determines user intent and triggers voice call
2. **Twilio** calls the webhook URL with intent and customer name
3. **Webhook** generates personalized TwiML based on intent
4. **Sarah's Voice** delivers contextual, interactive content
5. **User Input** (key presses) triggers follow-up responses

---

## ✅ **Test the Configuration**

Once configured, test with:

```bash
# Test contractor recruitment call
curl -X POST "http://localhost:3001/api/google-agent" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "intentName": "contractor.recruitment",
    "queryText": "I want to join as a contractor",
    "phoneNumber": "+1234567890",
    "customerName": "Mike"
  }'
```

**Expected Result:**
- Voice call initiated with personalized Sarah greeting
- Interactive menu based on contractor recruitment intent
- User can press keys to navigate options

---

## 🚨 **Important Notes**

1. **HTTPS Required:** Twilio requires HTTPS URLs for webhooks
2. **Webhook Timeout:** Twilio expects response within 15 seconds
3. **Content-Type:** Must return `text/xml` for TwiML
4. **Error Handling:** Always provide fallback TwiML for errors

The system is now configured for **dynamic, personalized voice interactions** instead of static, robotic responses! 🎉
