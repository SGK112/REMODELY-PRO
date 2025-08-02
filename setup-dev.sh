#!/bin/bash

# REMODELY.AI PRO - Environment Setup Script
# This script helps configure the development environment properly

echo "🏗️  REMODELY.AI PRO - Environment Setup"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local from .env.example"
    exit 1
fi

echo "✅ Environment file found"

# Check database connection
echo "🗄️  Checking database connection..."
npx prisma db push --accept-data-loss > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
    echo "   Run: npx prisma db push"
fi

# Check Google Maps configuration
echo "🗺️  Checking Google Maps configuration..."
MAPS_KEY=$(grep "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" .env.local | cut -d'=' -f2 | tr -d '"')
if [ "$MAPS_KEY" = "AIzaSyBQ8ZhvfZ8_development_key_here" ]; then
    echo "⚠️  Google Maps API key is placeholder"
    echo "   To enable maps:"
    echo "   1. Go to https://console.cloud.google.com"
    echo "   2. Enable Maps JavaScript API"
    echo "   3. Create API key and add to .env.local"
    echo "   4. Restart the development server"
    echo ""
    echo "   Maps will show fallback until configured."
else
    echo "✅ Google Maps API key configured"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create test users
echo "👥 Setting up test users..."
node create-test-users.js > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Test users ready"
else
    echo "⚠️  Test users setup failed (may already exist)"
fi

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "📧 Test Login Credentials:"
echo "   Customer: customer@test.com / password123"
echo "   Contractor: contractor@test.com / password123"
echo "   Admin: admin@test.com / password123"
echo ""
echo "🌐 Development URLs:"
echo "   Main App: http://localhost:3001"
echo "   Contractor Profile: http://localhost:3001/contractors/1"
echo "   Login: http://localhost:3001/auth/signin"
echo "   Quote Form: http://localhost:3001/quote"
echo ""
echo "🔧 To start development:"
echo "   npm run dev"
echo ""
