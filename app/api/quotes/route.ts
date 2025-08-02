import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let quotes;

    if (session.user.userType === 'CUSTOMER') {
      const customer = await prisma.customer.findUnique({
        where: { userId: session.user.id }
      });

      if (!customer) {
        return NextResponse.json({ error: 'Customer profile not found' }, { status: 404 });
      }

      quotes = await prisma.quote.findMany({
        where: {
          customerId: customer.id,
          ...(status && { status }),
        },
        include: {
          contractor: {
            select: {
              businessName: true,
              rating: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (session.user.userType === 'CONTRACTOR') {
      const contractor = await prisma.contractor.findUnique({
        where: { userId: session.user.id }
      });

      if (!contractor) {
        return NextResponse.json({ error: 'Contractor profile not found' }, { status: 404 });
      }

      quotes = await prisma.quote.findMany({
        where: {
          contractorId: contractor.id,
          ...(status && { status }),
        },
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 403 });
    }

    // Parse JSON fields for SQLite compatibility
    const quotesData = quotes.map((quote: any) => ({
      ...quote,
      materials: JSON.parse(quote.materials || '[]'),
    }));

    return NextResponse.json({ quotes: quotesData });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.userType !== 'CUSTOMER') {
      return NextResponse.json({ error: 'Only customers can request quotes' }, { status: 403 });
    }

    const customer = await prisma.customer.findUnique({
      where: { userId: session.user.id }
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer profile not found' }, { status: 404 });
    }

    const data = await request.json();
    const {
      contractorId,
      projectType,
      description,
      squareFootage,
      materials,
      location,
      budget,
      timeline,
    } = data;

    if (!contractorId || !projectType || !description || !location) {
      return NextResponse.json({
        error: 'Missing required fields: contractorId, projectType, description, location'
      }, { status: 400 });
    }

    const quote = await prisma.quote.create({
      data: {
        customerId: customer.id,
        contractorId,
        projectType,
        description,
        squareFootage: squareFootage ? parseFloat(squareFootage) : null,
        materials: JSON.stringify(materials || []),
        location,
        budget: budget ? parseFloat(budget) : null,
        timeline,
        status: 'PENDING',
        validUntil: timeline ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null, // 30 days from now
      },
      include: {
        contractor: {
          select: {
            businessName: true,
            rating: true,
          },
        },
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Parse JSON fields for response
    const quoteData = {
      ...quote,
      materials: JSON.parse(quote.materials || '[]'),
    };

    return NextResponse.json({ quote: quoteData }, { status: 201 });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { quoteId, status, estimatedCost, notes } = data;

    if (!quoteId || !status) {
      return NextResponse.json({
        error: 'Missing required fields: quoteId, status'
      }, { status: 400 });
    }

    // Verify user has permission to update this quote
    if (session.user.userType === 'CONTRACTOR') {
      const contractor = await prisma.contractor.findUnique({
        where: { userId: session.user.id }
      });

      if (!contractor) {
        return NextResponse.json({ error: 'Contractor profile not found' }, { status: 404 });
      }

      const existingQuote = await prisma.quote.findFirst({
        where: {
          id: quoteId,
          contractorId: contractor.id,
        },
      });

      if (!existingQuote) {
        return NextResponse.json({ error: 'Quote not found or access denied' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'Only contractors can update quote status' }, { status: 403 });
    }

    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        status,
        ...(estimatedCost && { estimatedCost: parseFloat(estimatedCost) }),
        ...(notes && { notes }),
        updatedAt: new Date(),
      },
      include: {
        contractor: {
          select: {
            businessName: true,
            rating: true,
          },
        },
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Parse JSON fields for response
    const quoteData = {
      ...updatedQuote,
      materials: JSON.parse(updatedQuote.materials || '[]'),
    };

    return NextResponse.json({ quote: quoteData });
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
