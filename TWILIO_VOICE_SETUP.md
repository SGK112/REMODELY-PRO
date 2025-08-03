# Twilio Voice & SMS Integration Setup Guide

## 🚀 Production Deployment URLs

Once you deploy to `remodely.ai`, configure these URLs in your Twilio Console:

### Phone Number Configuration

1. **Go to Twilio Console** → **Phone Numbers** → **Manage** → **Active Numbers**
2. **Select your Twilio phone number** (+16028337194)

#### Voice Configuration (for AI voice calls):
```
Voice Configuration:
- Configure with: Webhook
- Request URL: https://remodely.ai/api/voice/webhook
- HTTP Method: POST
- Fallback URL: https://remodely.ai/api/voice/twiml (optional)

Status Callbacks:
- Status Callback URL: https://remodely.ai/api/voice/status  
- HTTP Method: POST
```

#### Messaging Configuration (for AI SMS responses):
```
Messaging Configuration:
- Request URL: https://remodely.ai/api/sms/webhook
- HTTP Method: POST

Optional Settings:
- Fallback URL: https://remodely.ai/api/sms/webhook (same as above)
- Status Callback URL: https://remodely.ai/api/sms/status
- HTTP Method: POST
```

## 🎯 How It Works

1. **Google Agent** processes customer intent
2. **Twilio API** initiates call with webhook URL
3. **Webhook** (`/api/voice/webhook`) generates dynamic TwiML based on:
   - Intent (contractor.recruitment, quote.request, etc.)
   - Customer name (for personalization)
4. **Sarah's voice** delivers personalized, natural content
5. **Status callbacks** track call completion

## ✅ Benefits of Webhook Approach

- **Dynamic content** based on customer context
- **Personalized greetings** with customer names
- **Intent-specific messaging** (contractor vs customer)
- **Call tracking** and analytics
- **Interactive menus** that can branch based on responses

## 🧪 Testing

After deployment, test with:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"sessionId": "test", "intentName": "contractor.recruitment", "queryText": "I want to join", "phoneNumber": "+14802555887", "customerName": "John"}' \
  "https://remodely.ai/api/google-agent"
```

The call will now use the production webhook for dynamic, personalized content!
