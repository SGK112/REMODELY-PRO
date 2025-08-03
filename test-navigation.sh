#!/bin/bash

# Navigation Test Script for REMODELY AI
# Tests all major routes to ensure 200 status codes

echo "🧪 Testing REMODELY AI Navigation..."
echo "=================================="

BASE_URL="http://localhost:3001"

# Define routes to test
routes=(
    "/"
    "/auth/signin"
    "/auth/signup"
    "/auth/forgot-password"
    "/contractors"
    "/search"
    "/quote"
    "/marketplace"
    "/marketplace/sell"
    "/dashboard"
    "/for-contractors"
    "/for-homeowners"
    "/for-designers"
    "/for-commercial"
    "/voice-consultation"
    "/ai-showcase"
    "/upgrade"
)

# Test each route
for route in "${routes[@]}"
do
    echo -n "Testing $route ... "
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route")
    
    if [[ $status_code == "200" ]]; then
        echo "✅ $status_code"
    elif [[ $status_code == "302" || $status_code == "307" ]]; then
        echo "🔄 $status_code (redirect)"
    else
        echo "❌ $status_code"
    fi
done

echo ""
echo "🎯 Navigation test complete!"
echo "=================================="
