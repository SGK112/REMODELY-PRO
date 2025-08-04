#!/bin/bash

echo "🚀 Starting Remodely.AI Development Server..."

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Kill any existing processes on port 3000
echo "🔍 Checking for existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No existing processes found on port 3000"

# Install dependencies if node_modules doesn't exist
if [[ ! -d "node_modules" ]]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Setup environment file if it doesn't exist
if [[ ! -f ".env.local" ]] && [[ ! -f ".env" ]]; then
    echo "⚙️ Setting up environment file..."
    if [[ -f ".env.example" ]]; then
        cp .env.example .env.local
        echo "✅ Created .env.local from .env.example"
    fi
fi

# Setup database
echo "🗄️ Setting up database..."
npm run db:generate && npm run db:push

# Create test users
echo "👥 Setting up test users..."
node create-test-users.js

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next

# Start the development server
echo "🎯 Starting development server on http://localhost:3000"
npm run dev
