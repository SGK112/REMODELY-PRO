import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const callSid = formData.get('CallSid') as string;
    const callStatus = formData.get('CallStatus') as string;
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const duration = formData.get('CallDuration') as string;
    
    console.log('Call Status Update:', {
      callSid,
      callStatus,
      from,
      to,
      duration
    });
    
    // Here you could store call analytics in your database
    // await prisma.callLog.create({ data: { callSid, callStatus, from, to, duration: parseInt(duration || '0') } });
    
    return new NextResponse('OK', { status: 200 });
    
  } catch (error) {
    console.error('Status callback error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

export async function GET() {
  return new NextResponse('Status callback endpoint ready', { status: 200 });
}
