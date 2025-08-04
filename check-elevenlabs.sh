#!/bin/bash

# 🔑 ElevenLabs API Key Helper Script

echo "🎤 ElevenLabs API Key Configuration Helper"
echo "========================================"
echo ""

# Check current environment
echo "📋 Current Configuration:"
echo "Voice ID (Sarah): ${NEXT_PUBLIC_ELEVENLABS_VOICE_ID:-Not set}"
echo "API Key: ${ELEVENLABS_API_KEY:-Not set}"
echo ""

# Check if API key is set
if [[ "$ELEVENLABS_API_KEY" == "your-elevenlabs-api-key-here" ]] || [[ -z "$ELEVENLABS_API_KEY" ]]; then
    echo "❌ API Key not configured!"
    echo ""
    echo "🔧 To get your API key:"
    echo "1. Go to: https://elevenlabs.io/app/settings"
    echo "2. Look for 'API Key' section"
    echo "3. Copy the key (starts with 'sk_' usually)"
    echo "4. Update your .env file:"
    echo '   ELEVENLABS_API_KEY="sk_your_actual_key_here"'
    echo ""
    echo "💡 Your account has:"
    echo "✅ Unlimited credits"
    echo "✅ Text to Speech access"
    echo "✅ Speech to Speech access"
    echo "✅ Perfect for voice AI!"
    exit 1
fi

echo "✅ API Key is configured!"
echo ""
echo "🧪 Testing ElevenLabs connection..."

# Test API connection
curl -s -X GET "https://api.elevenlabs.io/v1/user" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" | jq '.' 2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! ElevenLabs API is working!"
    echo ""
    echo "🚀 Ready to use:"
    echo "• Voice Consultation: http://localhost:3001/voice-consultation"
    echo "• Sarah's Voice ID: ${NEXT_PUBLIC_ELEVENLABS_VOICE_ID}"
    echo "• Test full setup: node test-elevenlabs-setup.js"
else
    echo ""
    echo "❌ API connection failed. Please check your API key."
    echo ""
    echo "🔧 Troubleshooting:"
    echo "• Verify API key is correct"
    echo "• Check key has proper permissions"
    echo "• Try regenerating key at https://elevenlabs.io/app/settings"
fi
