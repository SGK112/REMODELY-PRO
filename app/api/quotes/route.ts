import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/lib/validation';

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
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate the request data
    const validatedData = quoteSchema.parse(body);

    // Create the quote in the database
    const quote = await prisma.quote.create({
      data: {
        customerId: session.user.id,
        contractorId: validatedData.contractorId,
        projectType: validatedData.projectType,
        description: validatedData.description,
        budget: validatedData.budget,
        timeline: validatedData.timeline,
        location: validatedData.location,
        materials: JSON.stringify(validatedData.materials || []),
        squareFootage: validatedData.squareFootage,
        status: 'PENDING'
      }
    });

    return NextResponse.json(
      {
        message: 'Quote request submitted successfully',
        quoteId: quote.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Quote submission error:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Invalid data provided', errors: (error as any).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
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
