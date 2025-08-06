import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TwoFactorAuth } from "@/lib/two-factor-auth"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { currentPassword, newPassword } = await request.json()

        if (!currentPassword || !newPassword) {
            return new NextResponse("Current password and new password are required", { status: 400 })
        }

        // Validate new password requirements
        if (newPassword.length < 8) {
            return new NextResponse("New password must be at least 8 characters long", { status: 400 })
        }

        const passwordRequirements = {
            uppercase: /[A-Z]/.test(newPassword),
            lowercase: /[a-z]/.test(newPassword),
            number: /\d/.test(newPassword),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
        }

        if (!Object.values(passwordRequirements).every(Boolean)) {
            return new NextResponse("New password doesn't meet security requirements", { status: 400 })
        }

        // Get user with current password
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { id: true, password: true }
        })

        if (!user || !user.password) {
            return new NextResponse("User not found", { status: 404 })
        }

        // Verify current password
        const isValidCurrentPassword = await TwoFactorAuth.verifyPassword(currentPassword, user.password)
        if (!isValidCurrentPassword) {
            return new NextResponse("Current password is incorrect", { status: 400 })
        }

        // Hash new password
        const hashedNewPassword = await TwoFactorAuth.hashPassword(newPassword)

        // Update password in database
        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedNewPassword }
        })

        return new NextResponse("Password changed successfully", { status: 200 })

    } catch (error) {
        console.error("Password change error:", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
