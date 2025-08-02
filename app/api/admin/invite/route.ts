import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { sendEmail, emailTemplates } from '@/lib/email'

// Store invitation tokens in memory (use Redis in production)
const inviteTokens = new Map<string, {
    email: string
    userType: 'CUSTOMER' | 'CONTRACTOR'
    invitedBy: string
    expires: number
}>()

// Simple token generation function
function generateInviteToken(): string {
    const array = new Uint8Array(32)
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(array)
    } else {
        // Fallback for environments without crypto
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256)
        }
    }
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: NextRequest) {
    try {
        // Verify admin access
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

        if (!token || token.userType !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            )
        }

        const body = await request.json()
        const { email, userType, message } = body

        // Validate input
        if (!email || !userType) {
            return NextResponse.json(
                { error: 'Email and user type are required' },
                { status: 400 }
            )
        }

        if (!['CUSTOMER', 'CONTRACTOR'].includes(userType)) {
            return NextResponse.json(
                { error: 'Invalid user type' },
                { status: 400 }
            )
        }

        // Generate invitation token
        const inviteToken = generateInviteToken()
        const expires = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days

        inviteTokens.set(inviteToken, {
            email: email.toLowerCase(),
            userType,
            invitedBy: token.id as string,
            expires
        })

        // Create invitation link
        const inviteLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3007'}/signup?invite=${inviteToken}`

        // Send invitation email
        const emailResult = await sendEmail({
            to: email.toLowerCase(),
            ...emailTemplates.userInvitation(inviteLink, userType, message || undefined)
        })

        if (!emailResult.success) {
            console.error('Failed to send invitation email:', emailResult.error)
            return NextResponse.json({ error: 'Failed to send invitation email' }, { status: 500 })
        }

        return NextResponse.json({
            message: 'Invitation sent successfully',
            emailSent: emailResult.success
        })

    } catch (error) {
        console.error('Error sending invitation:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Validate invitation token
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const token = searchParams.get('token')

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            )
        }

        const inviteData = inviteTokens.get(token)
        if (!inviteData || inviteData.expires < Date.now()) {
            return NextResponse.json(
                { error: 'Invalid or expired invitation token' },
                { status: 400 }
            )
        }

        return NextResponse.json({
            valid: true,
            email: inviteData.email,
            userType: inviteData.userType
        })

    } catch (error) {
        console.error('Error validating invitation:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
