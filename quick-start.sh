#!/bin/bash

echo "🚀 Remodely.AI Quick Start"
echo "=========================="

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Not in project root directory"
    echo "Please run this script from /Users/homepc/RemodelyPro/REMODELY-PRO"
    exit 1
fi

# Make sure Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20+"
    exit 1
fi

# Run the server startup script
echo "🎯 Starting server..."
node start-server.js
