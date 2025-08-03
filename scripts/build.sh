#!/bin/bash
set -e

echo "🔧 Starting build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npm run db:generate

# Try to push database schema (only if database is available)
echo "🗄️ Setting up database..."
if npm run db:push 2>/dev/null; then
    echo "✅ Database schema updated"
else
    echo "⚠️ Database push failed, continuing build..."
fi

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Build complete!"
