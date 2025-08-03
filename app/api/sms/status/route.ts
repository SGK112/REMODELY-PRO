import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const messageSid = formData.get('MessageSid') as string;
        const messageStatus = formData.get('MessageStatus') as string;
        const to = formData.get('To') as string;
        const from = formData.get('From') as string;

        console.log('SMS Status Update:', {
            messageSid,
            messageStatus,
            to,
            from
        });

        // Here you could store SMS analytics in your database
        // await prisma.smsLog.create({ data: { messageSid, messageStatus, to, from } });

        return new NextResponse('OK', { status: 200 });

    } catch (error) {
        console.error('SMS status callback error:', error);
        return new NextResponse('Error', { status: 500 });
    }
}

export async function GET() {
    return new NextResponse('SMS status callback endpoint ready', { status: 200 });
}
