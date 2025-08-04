#!/bin/bash

# 🔧 Quick Environment Fix Script for REMODELY.AI

echo "🔧 Fixing environment variables..."

# Backup current .env
cp .env .env.backup

# Fix Google Vision API key issue (commenting out the wrong one)
sed -i.bak 's/GOOGLE_CLOUD_VISION_API_KEY="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"/# GOOGLE_CLOUD_VISION_API_KEY="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" # WRONG - This is Client Secret, not API key/' .env

# Add proper placeholder for Google Vision API
echo "" >> .env
echo "# Google Cloud Vision API (NEEDS REAL API KEY)" >> .env
echo '# GOOGLE_CLOUD_VISION_API_KEY="AIzaSy..." # Get from https://console.cloud.google.com/' >> .env
echo '# OR use service account:' >> .env
echo '# GOOGLE_APPLICATION_CREDENTIALS="./google-service-account.json"' >> .env

# Add proper placeholder for ElevenLabs
echo "" >> .env
echo "# ElevenLabs Voice AI (NEEDS REAL AGENT ID)" >> .env
echo '# ELEVENLABS_API_KEY="sk_..." # Get from https://elevenlabs.io/' >> .env
echo 'NEXT_PUBLIC_ELEVENLABS_AGENT_ID="demo-mode" # Change to real agent ID' >> .env

echo "✅ Environment variables fixed!"
echo "📋 What was fixed:"
echo "   - Commented out wrong Google Vision API key"
echo "   - Added proper placeholders with instructions"
echo "   - Set ElevenLabs to demo mode"
echo ""
echo "🚨 To get full functionality:"
echo "   1. Get real Google Vision API key from https://console.cloud.google.com/"
echo "   2. Get real ElevenLabs agent ID from https://elevenlabs.io/"
echo "   3. Update the .env file with real values"
echo ""
echo "🧪 Current demo mode works for testing AI Transform UI"
