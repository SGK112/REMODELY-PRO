import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const contractor = await prisma.contractor.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!contractor) {
      return NextResponse.json({ error: 'Contractor profile not found' }, { status: 404 });
    }

    // Parse JSON fields for SQLite compatibility
    const contractorData = {
      ...contractor,
      serviceAreas: JSON.parse(contractor.serviceArea || '[]'),
      specialties: JSON.parse(contractor.specialties || '[]'),
      certifications: JSON.parse(contractor.certifications || '[]'),
      availableHours: JSON.parse(contractor.availableHours || '{}'),
      portfolioImages: JSON.parse(contractor.portfolioImages || '[]')
    };

    return NextResponse.json(contractorData);
  } catch (error) {
    console.error('Error fetching contractor profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const {
      businessName,
      description,
      specialties,
      yearsExperience,
      licenseNumber,
      insuranceInfo,
      phone,
      website,
      address,
      city,
      state,
      zipCode,
      serviceAreas,
      hourlyRate,
      projectMinimum,
      certifications,
      availableHours
    } = body;

    // Update or create the contractor profile
    const contractor = await prisma.contractor.upsert({
      where: {
        userId: session.user.id
      },
      update: {
        businessName,
        description,
        specialties: JSON.stringify(specialties || []),
        yearsExperience,
        licenseNumber,
        insuranceInfo,
        phone,
        website,
        address,
        city,
        state,
        zipCode,
        serviceArea: JSON.stringify(serviceAreas || []),
        hourlyRate,
        projectMinimum,
        certifications: JSON.stringify(certifications || []),
        availableHours: JSON.stringify(availableHours || {})
      },
      create: {
        userId: session.user.id,
        businessName,
        description,
        specialties: JSON.stringify(specialties || []),
        yearsExperience,
        licenseNumber,
        insuranceInfo,
        phone,
        website,
        address,
        city,
        state,
        zipCode,
        serviceArea: JSON.stringify(serviceAreas || []),
        hourlyRate,
        projectMinimum,
        certifications: JSON.stringify(certifications || []),
        availableHours: JSON.stringify(availableHours || {})
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Parse JSON fields for response
    const contractorData = {
      ...contractor,
      serviceAreas: JSON.parse(contractor.serviceArea || '[]'),
      specialties: JSON.parse(contractor.specialties || '[]'),
      certifications: JSON.parse(contractor.certifications || '[]'),
      availableHours: JSON.parse(contractor.availableHours || '{}'),
      portfolioImages: JSON.parse(contractor.portfolioImages || '[]')
    };

    return NextResponse.json(contractorData);
  } catch (error) {
    console.error('Error updating contractor profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
