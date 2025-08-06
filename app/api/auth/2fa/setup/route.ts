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

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Generate secret and QR code
        const secret = TwoFactorAuth.generateSecret()
        const qrCode = await TwoFactorAuth.generateQRCode(user.email!, secret)
        const backupCodes = TwoFactorAuth.generateBackupCodes()

        // Store the secret temporarily (not enabled yet)
        await prisma.user.update({
            where: { id: user.id },
            data: {
                twoFactorSecret: secret,
                backupCodes: JSON.stringify(backupCodes)
            } as any
        })

        return NextResponse.json({
            secret,
            qrCode,
            backupCodes
        })

    } catch (error) {
        console.error('2FA setup error:', error)
        return NextResponse.json(
            { error: 'Failed to setup 2FA' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { password } = await request.json()

        if (!password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user || !user.password) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Verify password before disabling 2FA
        const isValidPassword = await TwoFactorAuth.verifyPassword(password, user.password)

        if (!isValidPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
        }

        // Disable 2FA
        await prisma.user.update({
            where: { id: user.id },
            data: {
                twoFactorEnabled: false,
                twoFactorSecret: null,
                backupCodes: null
            } as any
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('2FA disable error:', error)
        return NextResponse.json(
            { error: 'Failed to disable 2FA' },
            { status: 500 }
        )
    }
}
