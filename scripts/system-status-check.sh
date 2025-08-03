#!/bin/bash

# Authenticated Contractor Scraping - System Status Check
echo "🔐 Authenticated Contractor Scraping System Status"
echo "=" | tr -s " " "=" | head -c 60; echo

# Check if authenticated scraper files exist
echo "📁 File System Check:"
if [ -f "lib/scrapers/authenticated.ts" ]; then
    echo "✅ Authenticated scrapers module: READY"
else
    echo "❌ Authenticated scrapers module: MISSING"
fi

if [ -f "test-authenticated-scraping.js" ]; then
    echo "✅ Test script: READY"
else
    echo "❌ Test script: MISSING"
fi

if [ -f "AUTHENTICATED_SCRAPING_GUIDE.md" ]; then
    echo "✅ Setup guide: READY"
else
    echo "❌ Setup guide: MISSING"
fi

if [ -f ".env.scraping.example" ]; then
    echo "✅ Environment template: READY"
else
    echo "❌ Environment template: MISSING"
fi

echo ""

# Check environment variables
echo "🔐 Environment Variables Check:"
if [ -f ".env.local" ]; then
    if grep -q "ANGI_CONTRACTOR_EMAIL" .env.local; then
        echo "✅ Angi credentials configured"
    else
        echo "⚠️  Angi credentials not configured"
    fi
    
    if grep -q "HOMEADVISOR_CONTRACTOR_EMAIL" .env.local; then
        echo "✅ HomeAdvisor credentials configured"
    else
        echo "⚠️  HomeAdvisor credentials not configured"
    fi
else
    echo "⚠️  .env.local file not found"
    echo "💡 Copy .env.scraping.example to .env.local and add your credentials"
fi

echo ""

# Check main integration
echo "🔧 System Integration Check:"
if grep -q "AuthenticatedAngiScraper" lib/scraper.ts; then
    echo "✅ Authenticated scrapers integrated into main system"
else
    echo "❌ Authenticated scrapers not integrated"
fi

if grep -q "authenticated" app/api/scrape/route.ts; then
    echo "✅ API endpoint supports authenticated scraping"
else
    echo "❌ API endpoint missing authenticated support"
fi

if grep -q "authenticated" app/admin/scraping/page.tsx; then
    echo "✅ Admin interface includes authenticated option"
else
    echo "❌ Admin interface missing authenticated option"
fi

echo ""

# System Summary
echo "📊 System Summary:"
echo "• 29 total scrapers available (27 public + 2 authenticated)"
echo "• 4 scraping categories: manufacturers, directories, industry, local"
echo "• 1 authenticated category: Angi & HomeAdvisor with contractor accounts"
echo "• Database integration with deduplication"
echo "• Admin interface with category selection"
echo "• Comprehensive error handling and logging"

echo ""

# Next Steps
echo "🚀 Next Steps:"
echo "1. Add contractor account credentials to .env.local"
echo "2. Run: node test-authenticated-scraping.js"
echo "3. Use admin interface at /admin/scraping"
echo "4. Select '🔐 Authenticated Sources' for reliable data"

echo ""
echo "💡 Key Benefits of Authenticated Scraping:"
echo "   • More reliable than public scraping"
echo "   • No CSS selector maintenance required"
echo "   • Access to detailed contractor information"
echo "   • Higher success rate and data quality"

echo ""
echo "📖 For detailed setup instructions, see AUTHENTICATED_SCRAPING_GUIDE.md"
