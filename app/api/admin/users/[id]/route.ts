import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token || token.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { action } = await request.json()
    const userId = params.id

    switch (action) {
      case 'verify':
        // Verify contractor
        await prisma.contractor.update({
          where: { userId },
          data: { isVerified: true }
        })
        break

      case 'unverify':
        // Unverify contractor
        await prisma.contractor.update({
          where: { userId },
          data: { isVerified: false }
        })
        break

      case 'suspend':
        // Suspend user (you might want to add a suspended field to the schema)
        // For now, we'll update their email to mark as suspended
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (user && !user.email?.includes('[SUSPENDED]')) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              email: `[SUSPENDED]${user.email}`,
              name: `[SUSPENDED] ${user.name}`
            }
          })
        }
        break

      case 'activate':
        // Reactivate suspended user
        const suspendedUser = await prisma.user.findUnique({ where: { id: userId } })
        if (suspendedUser && suspendedUser.email?.includes('[SUSPENDED]')) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              email: suspendedUser.email.replace('[SUSPENDED]', ''),
              name: suspendedUser.name?.replace('[SUSPENDED] ', '') || suspendedUser.name
            }
          })
        }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token || token.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const userId = params.id

    // Delete user and all related data (cascading deletes should handle this)
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
