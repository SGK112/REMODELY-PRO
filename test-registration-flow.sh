#!/bin/bash

echo "🧪 Testing Enhanced Registration Flow with Phone Verification"
echo "=========================================================="
echo ""

# Test data
TEST_EMAIL="testuser$(date +%s)@example.com"
TEST_PHONE="+14802555887"  # Your phone number for testing
TEST_NAME="Test User"
TEST_PASSWORD="password123"

echo "📝 Test Data:"
echo "   Email: $TEST_EMAIL"
echo "   Phone: $TEST_PHONE"
echo "   Name: $TEST_NAME"
echo ""

echo "🔧 Testing Registration API Flow..."
echo ""

# Step 1: Send verification code
echo "📱 Step 1: Sending verification code..."
SEND_RESPONSE=$(curl -s -X POST http://localhost:3008/api/verify-phone \
  -H "Content-Type: application/json" \
  -d "{
    \"action\": \"send\",
    \"phoneNumber\": \"$TEST_PHONE\",
    \"isRegistration\": true
  }")

echo "Response: $SEND_RESPONSE"

# Check if send was successful
if echo "$SEND_RESPONSE" | grep -q "successfully"; then
  echo "✅ Verification code sent successfully!"
  echo ""
  echo "📨 Please check your phone for the verification code"
  echo "🔢 Enter the 6-digit code when prompted"
  echo ""
  
  # Prompt for verification code
  read -p "Enter the verification code you received: " VERIFICATION_CODE
  
  # Step 2: Verify the code and create account
  echo ""
  echo "🔐 Step 2: Verifying code and creating account..."
  
  # First verify the code
  VERIFY_RESPONSE=$(curl -s -X POST http://localhost:3008/api/verify-phone \
    -H "Content-Type: application/json" \
    -d "{
      \"action\": \"verify\",
      \"phoneNumber\": \"$TEST_PHONE\",
      \"code\": \"$VERIFICATION_CODE\",
      \"isRegistration\": true
    }")
  
  echo "Verification Response: $VERIFY_RESPONSE"
  
  # Check if verification was successful
  if echo "$VERIFY_RESPONSE" | grep -q "successfully"; then
    echo "✅ Phone verification successful!"
    echo ""
    
    # Step 3: Create the account
    echo "👤 Step 3: Creating user account..."
    REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3008/api/auth/register \
      -H "Content-Type: application/json" \
      -d "{
        \"name\": \"$TEST_NAME\",
        \"email\": \"$TEST_EMAIL\",
        \"password\": \"$TEST_PASSWORD\",
        \"phone\": \"$TEST_PHONE\",
        \"phoneVerified\": true,
        \"userType\": \"CUSTOMER\"
      }")
    
    echo "Registration Response: $REGISTER_RESPONSE"
    
    if echo "$REGISTER_RESPONSE" | grep -q "successfully"; then
      echo ""
      echo "🎉 SUCCESS! Complete registration flow tested successfully!"
      echo "✅ Phone verification working"
      echo "✅ Account creation working"
      echo "✅ Phone number stored and verified"
      echo ""
      echo "🔗 You can now test the signin flow at: http://localhost:3008/auth/signin"
      echo "📧 Email: $TEST_EMAIL"
      echo "🔑 Password: $TEST_PASSWORD"
    else
      echo "❌ Account creation failed"
      echo "Response: $REGISTER_RESPONSE"
    fi
  else
    echo "❌ Phone verification failed"
    echo "Response: $VERIFY_RESPONSE"
  fi
else
  echo "❌ Failed to send verification code"
  echo "Response: $SEND_RESPONSE"
fi

echo ""
echo "🌐 You can also test the full UI flow at: http://localhost:3008/signup"
