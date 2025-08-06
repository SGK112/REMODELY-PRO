import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TwoFactorAuth } from '@/lib/two-factor-auth'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { token } = await request.json()

        if (!token) {
            return NextResponse.json({ error: 'Token required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user || !(user as any).twoFactorSecret) {
            return NextResponse.json({ error: 'No 2FA setup found' }, { status: 404 })
        }

        // Verify the token
        const isValid = TwoFactorAuth.verifyToken((user as any).twoFactorSecret, token)

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
        }

        // Enable 2FA
        await prisma.user.update({
            where: { id: user.id },
            data: {
                twoFactorEnabled: true
            } as any
        })

        return NextResponse.json({
            success: true,
            message: '2FA has been enabled successfully'
        })

    } catch (error) {
        console.error('2FA verification error:', error)
        return NextResponse.json(
            { error: 'Failed to verify 2FA token' },
            { status: 500 }
        )
    }
}
