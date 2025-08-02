#!/bin/bash

echo "🔍 Build Debug Script for Render Deployment"
echo "==========================================="

echo "📋 Node.js Version:"
node --version

echo "📋 NPM Version:"
npm --version

echo "📋 Current Directory:"
pwd

echo "📋 Directory Contents:"
ls -la

echo "📋 Package.json exists:"
if [ -f "package.json" ]; then
    echo "✅ package.json found"
    echo "📋 Dependencies count:"
    cat package.json | grep -c '"'
else
    echo "❌ package.json NOT found"
    exit 1
fi

echo "📋 Checking critical files:"
for file in "lib/auth.ts" "lib/prisma.ts" "lib/validation.ts" "components/ui/SMSNotificationPanel.tsx"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file MISSING"
    fi
done

echo "📋 Checking tsconfig.json path mapping:"
if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json found"
    grep -A 5 '"paths"' tsconfig.json || echo "❌ paths not found"
else
    echo "❌ tsconfig.json NOT found"
fi

echo "📋 Installing dependencies..."
npm ci

echo "📋 Generating Prisma client..."
npm run db:generate

echo "📋 Attempting build..."
npm run build

echo "🎉 Build completed!"
