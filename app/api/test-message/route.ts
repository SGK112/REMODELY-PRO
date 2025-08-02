import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json()
    
    console.log('🎉 TEST MESSAGE RECEIVED!')
    console.log('📞 To:', to)
    console.log('💬 Message:', message)
    console.log('⏰ Time:', new Date().toLocaleString())
    
    // Simulate a successful response
    return NextResponse.json({ 
      success: true, 
      message: 'Test message sent successfully!',
      testData: {
        to,
        message,
        timestamp: new Date().toISOString(),
        status: 'delivered'
      }
    })
    
  } catch (error) {
    console.error('Test message error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send test message' 
    }, { status: 500 })
  }
}
