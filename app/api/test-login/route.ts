import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        console.log('Testing login for:', email)

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                contractor: true,
                customer: true
            }
        })

        if (!user) {
            console.log('User not found')
            return NextResponse.json({ success: false, error: 'User not found' })
        }

        if (!user.password) {
            console.log('No password set for user')
            return NextResponse.json({ success: false, error: 'No password set' })
        }

        const isValid = await compare(password, user.password)
        console.log('Password valid:', isValid)

        return NextResponse.json({
            success: isValid,
            user: isValid ? {
                id: user.id,
                email: user.email,
                name: user.name,
                userType: user.userType
            } : null
        })

    } catch (error) {
        console.error('Test login error:', error)
        return NextResponse.json({ success: false, error: 'Server error' })
    }
}
