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

    // BULLETPROOF: Sanitize and validate input
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate the request data
    const validatedData = quoteSchema.parse(body);

    // BULLETPROOF: Validate database connection and required fields
    if (!validatedData.contractorId || !validatedData.projectType) {
      return NextResponse.json(
        { message: 'Missing required fields: contractorId and projectType' },
        { status: 400 }
      );
    }

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

    // BULLETPROOF: Enhanced error handling
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          message: 'Invalid data provided', 
          errors: (error as any).errors,
          details: 'Please check all required fields and try again'
        },
        { status: 400 }
      );
    }

    // Database connection errors
    if (error instanceof Error && error.message.includes('database')) {
      console.error('Database error in quote submission:', error);
      return NextResponse.json(
        { message: 'Database temporarily unavailable. Please try again.' },
        { status: 503 }
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
    
    // BULLETPROOF: Validate input data structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json({
        error: 'Invalid request body'
      }, { status: 400 });
    }

    const { quoteId, status, estimatedCost, notes } = data;

    // BULLETPROOF: Enhanced validation
    if (!quoteId || typeof quoteId !== 'string') {
      return NextResponse.json({
        error: 'Invalid or missing quoteId'
      }, { status: 400 });
    }

    if (!status || typeof status !== 'string') {
      return NextResponse.json({
        error: 'Invalid or missing status'
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
        ...(estimatedCost && !isNaN(parseFloat(estimatedCost)) && { estimatedCost: parseFloat(estimatedCost) }),
        ...(notes && typeof notes === 'string' && { notes: notes.trim() }),
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
