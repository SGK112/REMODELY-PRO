#!/bin/bash

# REMODELY.ai Project Setup Script
# Ensures all required configuration files and dependencies are in place

set -e

echo "🚀 Setting up REMODELY.ai development environment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Validate Node.js version
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20+ and try again."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version $NODE_VERSION detected. This project requires Node.js 20+."
    exit 1
fi

print_success "Node.js $(node -v) detected"

# Install dependencies
print_status "Installing dependencies..."
npm install --legacy-peer-deps

# Run configuration validation
print_status "Validating project configuration..."
node scripts/validate-config.js

# Check environment files
if [ ! -f ".env.local" ] && [ ! -f ".env" ]; then
    print_warning "No environment file found (.env or .env.local)"
    if [ -f ".env.example" ]; then
        print_status "Copying .env.example to .env.local..."
        cp .env.example .env.local
        print_warning "Please update .env.local with your actual environment variables"
    fi
fi

# Clean any existing build artifacts
print_status "Cleaning build artifacts..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Generate database client (if Prisma is configured)
if [ -f "prisma/schema.prisma" ]; then
    print_status "Generating Prisma client..."
    npm run db:generate
fi

# Final validation
print_status "Running final validation..."
if npm run validate:config; then
    print_success "✅ Setup complete!"
    echo ""
    echo "🎉 Your development environment is ready!"
    echo ""
    echo "Next steps:"
    echo "  1. Update .env.local with your environment variables"
    echo "  2. Run 'npm run dev' to start the development server"
    echo "  3. Visit http://localhost:3001"
    echo ""
else
    print_error "Setup validation failed. Please check the errors above."
    exit 1
fi
