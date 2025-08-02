#!/bin/bash

echo "🚀 Remodely.AI Scraping System Test"
echo "=========================================="
echo ""

# Check if server is running
echo "📡 Checking if server is running..."
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Server is running on port 3001"
else
    echo "❌ Server not found. Starting server..."
    npm run dev &
    sleep 5
fi

echo ""
echo "🧪 Available Test Commands:"
echo ""
echo "1. Test Directory Scrapers (Recommended):"
echo "   curl -X POST http://localhost:3001/api/scrape \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -d '{\"location\":\"Denver, CO\",\"category\":\"directories\"}'"
echo ""
echo "2. Test Local Business Directories:"
echo "   curl -X POST http://localhost:3001/api/scrape \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -d '{\"location\":\"Miami, FL\",\"category\":\"local\"}'"
echo ""
echo "3. Test Industry Associations:"
echo "   curl -X POST http://localhost:3001/api/scrape \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -d '{\"location\":\"New York, NY\",\"category\":\"industry\"}'"
echo ""
echo "4. Web Interface (Easiest):"
echo "   Open: http://localhost:3001/admin/scraping"
echo ""
echo "⚠️  Note: You must be logged in as admin to access the scraping API"
echo ""

# Optional: Run a quick test
read -p "🤔 Run a quick directory scraper test now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Testing directory scrapers for Denver, CO..."
    curl -X POST http://localhost:3001/api/scrape \
         -H 'Content-Type: application/json' \
         -d '{"location":"Denver, CO","category":"directories"}' \
         -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"
fi
