import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { TwilioService } from '@/lib/twilio'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const body = await request.json()
        const { action, phoneNumber, code, isRegistration } = body

        // For registration flow, we don't require authentication
        if (!session && !isRegistration) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }

        if (action === 'send') {
            // Send verification code
            if (!phoneNumber) {
                return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
            }

            const result = await TwilioService.sendVerificationCode(phoneNumber, 'sms')

            if (result.success) {
                return NextResponse.json({
                    message: 'Verification code sent successfully',
                    sid: result.sid
                })
            } else {
                return NextResponse.json({ error: result.error }, { status: 400 })
            }

        } else if (action === 'verify') {
            // Verify code
            if (!phoneNumber || !code) {
                return NextResponse.json({ error: 'Phone number and code are required' }, { status: 400 })
            }

            const result = await TwilioService.verifyCode(phoneNumber, code)

            if (result.success) {
                // For registration flow, just return success
                if (isRegistration) {
                    return NextResponse.json({
                        message: 'Phone number verified successfully',
                        status: result.status
                    })
                }

                // For authenticated users, update their phone number
                if (session) {
                    const userId = session.user.id

                    if (session.user.userType === 'CONTRACTOR') {
                        await prisma.contractor.updateMany({
                            where: { userId: userId },
                            data: {
                                phone: phoneNumber
                                // Note: Add phoneVerified field to schema for production
                            }
                        })
                    } else if (session.user.userType === 'CUSTOMER') {
                        await prisma.customer.updateMany({
                            where: { userId: userId },
                            data: {
                                phone: phoneNumber
                                // Note: Add phoneVerified field to schema for production
                            }
                        })
                    }
                }

                return NextResponse.json({
                    message: 'Phone number verified successfully',
                    status: result.status
                })
            } else {
                return NextResponse.json({
                    error: result.error || 'Verification failed',
                    status: result.status
                }, { status: 400 })
            }

        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
        }

    } catch (error) {
        console.error('Phone verification error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
