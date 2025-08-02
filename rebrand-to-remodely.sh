#!/bin/bash

echo "🚀 Remodely.AI Rebranding Script"
echo "================================="

# Update all remaining NewCountertops references to Remodely.AI

echo "📝 Updating email templates..."
sed -i '' 's/NewCountertops\.com/Remodely.AI/g' lib/email.ts
sed -i '' 's/newcountertops\.com/remodely.ai/g' lib/email.ts
sed -i '' 's/Your Premier Countertop Marketplace/AI-Powered Contractor Marketplace/g' lib/email.ts
sed -i '' 's/Help@newcountertops\.com/support@remodely.ai/g' lib/email.ts

echo "📝 Updating configuration files..."
sed -i '' 's/newcountertops/remodely-ai/g' render.yaml
sed -i '' 's/newcountertops\.com/remodely.ai/g' .env.production
sed -i '' 's/newcountertops/remodely-ai/g' .env.example

echo "📝 Updating documentation..."
sed -i '' 's/NewCountertops\.com/Remodely.AI/g' *.md
sed -i '' 's/newcountertops/remodely-ai/g' *.md

echo "📝 Updating scripts..."
sed -i '' 's/NewCountertops\.com/Remodely.AI/g' *.js
sed -i '' 's/newcountertops\.com/remodely.ai/g' *.js
sed -i '' 's/admin@newcountertops\.com/admin@remodely.ai/g' *.js

echo "📝 Updating shell scripts..."
sed -i '' 's/NewCountertops\.com/Remodely.AI/g' *.sh

echo "✅ Rebranding complete!"
echo ""
echo "🔄 Next steps:"
echo "1. Update your domain name settings"
echo "2. Update environment variables for production"
echo "3. Update any external service configurations"
echo "4. Test the application thoroughly"
echo ""
echo "🌟 Welcome to Remodely.AI!"
