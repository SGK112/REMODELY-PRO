#!/bin/bash

echo "🔍 Monitoring End-to-End Test Flow"
echo "=================================="
echo ""
echo "📱 Phone: +14802555887"
echo "📧 Email: joshb@surprisegranite.com"
echo "🌐 URLs:"
echo "   - Signup: http://localhost:3000/signup"
echo "   - Signin: http://localhost:3000/auth/signin"
echo "   - Reset:  http://localhost:3000/auth/forgot-password"
echo ""
echo "🎯 Watching for key events..."
echo "   - SMS verification codes"
echo "   - Database operations"
echo "   - Authentication events"
echo "   - Error messages"
echo ""
echo "📊 Live Server Logs:"
echo "==================="

# Monitor the development server logs
tail -f .next/trace || echo "Note: Trace file not found, monitoring basic logs instead"
