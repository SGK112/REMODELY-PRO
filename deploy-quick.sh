#!/bin/bash

# REMODELY-PRO Quick Deployment Script
# Get the site up fast with optimizations

set -e

echo "🚀 REMODELY-PRO QUICK DEPLOYMENT"
echo "================================"

# Check environment
if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env from example..."
    cp .env.example .env
    echo "✅ Please configure your .env file with API keys"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Generate Prisma client
echo "🔧 Setting up database..."
npx prisma generate

# Build with optimizations
echo "🏗️ Building optimized production bundle..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Health check
echo "🔍 Running health check..."
if [ -f ".next/BUILD_ID" ]; then
    BUILD_ID=$(cat .next/BUILD_ID)
    echo "✅ Build successful - ID: $BUILD_ID"
    
    # Show bundle analysis
    echo "📊 Bundle Analysis:"
    du -h .next/static/chunks/*.js 2>/dev/null | head -5 || echo "No chunks found"
    
    echo ""
    echo "🌐 DEPLOYMENT READY!"
    echo "===================="
    echo "Local development: npm run dev"
    echo "Production start:  npm run start:production"
    echo "Health check:      /api/health"
    echo ""
    echo "🚀 Deploy to Render.com with: git push origin main"
    
else
    echo "❌ Build failed!"
    exit 1
fi
