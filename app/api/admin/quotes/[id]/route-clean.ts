import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Update quote status (Admin Override)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, notes, estimatedCost } = await request.json();
    
    if (!status || !['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be PENDING, ACCEPTED, REJECTED, COMPLETED, or CANCELLED' },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.update({
      where: { id: params.id },
      data: {
        status,
        notes: notes || undefined,
        estimatedCost: estimatedCost ? parseFloat(estimatedCost) : undefined,
      },
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
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Admin quote update error:', error);
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}

// Delete quote (Admin Only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if quote has associated bookings
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: { booking: true }
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    if (quote.booking) {
      return NextResponse.json(
        { error: 'Cannot delete quote with associated booking. Delete booking first.' },
        { status: 400 }
      );
    }

    await prisma.quote.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Admin quote deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote' },
      { status: 500 }
    );
  }
}

// Get single quote details (Admin)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
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
        },
        booking: true
      }
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Admin quote fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}
