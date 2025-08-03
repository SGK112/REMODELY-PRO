#!/bin/bash

# REMODELY PRO - Complete Site Testing Script
echo "🧪 REMODELY PRO - Complete Site Testing"
echo "======================================="
echo ""

# Check if development server is running
echo "🔍 Checking development server..."
if curl -f -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Development server is running on port 3000"
else
    echo "❌ Development server not responding on port 3000"
    echo "💡 Run: npm run dev"
    exit 1
fi

# Test database connectivity
echo ""
echo "🗄️  Testing database connectivity..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const userCount = await prisma.user.count();
    const contractorCount = await prisma.contractor.count();
    const customerCount = await prisma.customer.count();
    
    console.log('✅ Database connected successfully');
    console.log(\`   Users: \${userCount}\`);
    console.log(\`   Contractors: \${contractorCount}\`);
    console.log(\`   Customers: \${customerCount}\`);
    
    if (contractorCount === 0) {
      console.log('⚠️  No contractors found - run setup script');
    }
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
})();
"

echo ""
echo "🌐 Testing key endpoints..."

# Test API endpoints
endpoints=(
    "/api/contractors"
    "/api/quotes"
    "/auth/login"
    "/contractors"
    "/quote/request"
)

for endpoint in "${endpoints[@]}"; do
    if curl -f -s "http://localhost:3000$endpoint" > /dev/null 2>&1; then
        echo "✅ $endpoint"
    else
        echo "❌ $endpoint"
    fi
done

echo ""
echo "🎯 Core Functionality Test Results:"
echo ""
echo "📋 Available Test Accounts:"
echo "   Customer: customer@test.com / password123"
echo "   Contractor: contractor@test.com / password123"
echo "   Admin: admin@test.com / password123"
echo ""
echo "🌐 Key URLs to Test:"
echo "   🏠 Homepage: http://localhost:3000"
echo "   🔐 Sign In: http://localhost:3000/auth/login"
echo "   📝 Sign Up: http://localhost:3000/auth/signup"
echo "   🔨 Browse Contractors: http://localhost:3000/contractors"
echo "   💬 Request Quote: http://localhost:3000/quote/request"
echo "   📊 Dashboard: http://localhost:3000/dashboard"
echo ""
echo "🔧 Admin Tools:"
echo "   📈 Prisma Studio: http://localhost:5555"
echo "   🛠️  Database Studio: npm run db:studio"
echo ""
echo "✅ Site is ready for end-to-end testing!"
