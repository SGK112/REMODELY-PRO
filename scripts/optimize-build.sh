#!/bin/bash

# REMODELY-PRO Build Optimization Script
# Run this before deployment

echo "🚀 Starting REMODELY-PRO Build Optimization..."

# 1. Clean workspace
echo "🧹 Cleaning workspace..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf temp_debug.csv
rm -rf test_roc*.csv

# 2. Install dependencies with optimization
echo "📦 Installing optimized dependencies..."
npm ci --legacy-peer-deps --production=false

# 3. Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# 4. Run optimized build
echo "🏗️ Building with optimizations..."
NODE_OPTIONS="--max-old-space-size=4096 --max-semi-space-size=256" npm run build

# 5. Check build size
echo "📊 Build analysis..."
du -h .next/static/chunks/*.js | head -10

echo "✅ Optimization complete!"
echo "🌐 Ready for deployment!"

# Health check
if [ -f ".next/BUILD_ID" ]; then
    echo "✅ Build successful - ID: $(cat .next/BUILD_ID)"
else
    echo "❌ Build failed"
    exit 1
fi
