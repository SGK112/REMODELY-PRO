import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Update booking status (Admin Override)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, scheduledDate, notes } = await request.json();

    if (!status || !['CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be CONFIRMED, COMPLETED, or CANCELLED' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        status,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
        notes: notes || undefined,
      },
      include: {
        quote: {
          include: {
            customer: {
              include: {
                user: {
                  select: { name: true, email: true }
                }
              }
            },
            contractor: {
              include: {
                user: {
                  select: { name: true, email: true }
                }
              }
            }
          }
        }
      }
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Admin booking update error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// Delete booking (Admin Only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    await prisma.booking.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Admin booking deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}

// Get single booking details (Admin)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        quote: {
          include: {
            customer: {
              include: {
                user: {
                  select: { name: true, email: true, createdAt: true }
                }
              }
            },
            contractor: {
              include: {
                user: {
                  select: { name: true, email: true, createdAt: true }
                }
              }
            }
          }
        }
      }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Admin booking fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}
