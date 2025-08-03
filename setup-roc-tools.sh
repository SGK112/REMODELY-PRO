#!/bin/bash

# ROC Data Processing Setup Script
# Installs required dependencies for fast data conversion

echo "🚀 Setting up ROC data processing tools..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Install required dependencies
echo "📦 Installing dependencies..."

# Core dependencies for CSV processing
npm install csv-parser better-sqlite3 --save-dev

# Optional: Install for advanced processing
# npm install papaparse fast-csv --save-dev

echo "✅ Dependencies installed!"

# Create data directory
echo "📁 Creating data directory..."
mkdir -p data/regions

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x dev-scripts/fast-roc-converter.js
chmod +x dev-scripts/roc-sample-generator.js

# Update package.json with new scripts
echo "📝 Adding npm scripts..."

# Create temporary package.json with new scripts
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = pkg.scripts || {};
pkg.scripts['roc:convert'] = 'node dev-scripts/fast-roc-converter.js';
pkg.scripts['roc:sample'] = 'node dev-scripts/roc-sample-generator.js';
pkg.scripts['roc:seed'] = 'node dev-scripts/roc-sample-generator.js seed 1000';
pkg.scripts['roc:stats'] = 'node dev-scripts/roc-sample-generator.js stats';
pkg.scripts['roc:clear'] = 'node dev-scripts/roc-sample-generator.js clear';

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('✅ Package.json updated with ROC scripts');
"

echo ""
echo "🎉 Setup complete! Available commands:"
echo ""
echo "📊 Sample Data (recommended while waiting for CSV):"
echo "   npm run roc:seed      # Generate 1000 sample contractors"
echo "   npm run roc:stats     # Show contractor statistics"
echo "   npm run roc:clear     # Clear all ROC contractors"
echo ""
echo "🔄 CSV Conversion (when you have the CSV file):"
echo "   npm run roc:convert input.csv jsonl     # Convert to JSON Lines"
echo "   npm run roc:convert input.csv sqlite    # Convert to SQLite"
echo "   npm run roc:convert input.csv regions   # Split by regions"
echo "   npm run roc:convert input.csv seed      # Create Prisma seed"
echo "   npm run roc:convert input.csv all       # Run all conversions"
echo ""
echo "💡 Tip: Start with sample data to test the system:"
echo "   npm run roc:seed && npm run dev"
echo ""
