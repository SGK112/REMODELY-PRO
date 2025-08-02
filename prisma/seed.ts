import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@test.com',
      name: 'John Customer',
      password: await hash('password123', 12),
      userType: 'CUSTOMER',
    },
  })

  const contractorUser = await prisma.user.create({
    data: {
      email: 'contractor@test.com',
      name: 'Jane Contractor',
      password: await hash('password123', 12),
      userType: 'CONTRACTOR',
    },
  })

  // Create customer profile
  const customer = await prisma.customer.create({
    data: {
      userId: customerUser.id,
      firstName: 'John',
      lastName: 'Customer',
      phone: '555-0123',
      address: '123 Main St',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30309',
    },
  })

  // Create contractor profile
  const contractor = await prisma.contractor.create({
    data: {
      userId: contractorUser.id,
      businessName: 'Premium Countertops LLC',
      description: 'Specializing in high-quality granite and quartz countertop installation',
      serviceArea: JSON.stringify(['Atlanta', 'Marietta', 'Sandy Springs', 'Alpharetta']),
      specialties: JSON.stringify(['Granite', 'Quartz', 'Marble', 'Kitchen Remodeling']),
      yearsExperience: 15,
      licenseNumber: 'GA-12345',
      insuranceInfo: 'Fully insured with $2M liability coverage',
      phone: '555-0456',
      website: 'https://premiumcountertops.com',
      address: '456 Business Blvd',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30308',
      latitude: 33.7490,
      longitude: -84.3880,
      isVerified: true,
      rating: 4.8,
      reviewCount: 127,
    },
  })

  // Create some sample quotes
  await prisma.quote.create({
    data: {
      customerId: customer.id,
      contractorId: contractor.id,
      projectType: 'Kitchen Countertops',
      description: 'Replace laminate countertops with granite. L-shaped kitchen with island.',
      squareFootage: 45.5,
      materials: JSON.stringify(['Granite', 'Edge treatment', 'Undermount sink cutout']),
      location: 'Atlanta, GA 30309',
      budget: 3500,
      timeline: '2-3 weeks',
      status: 'PENDING',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.quote.create({
    data: {
      customerId: customer.id,
      contractorId: contractor.id,
      projectType: 'Bathroom Vanity',
      description: 'Quartz countertop for master bathroom vanity.',
      squareFootage: 12.0,
      materials: JSON.stringify(['Quartz', 'Polished edge', 'Faucet holes']),
      location: 'Atlanta, GA 30309',
      budget: 1200,
      timeline: '1 week',
      status: 'ACCEPTED',
      estimatedCost: 1150,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.quote.create({
    data: {
      customerId: customer.id,
      contractorId: contractor.id,
      projectType: 'Office Reception',
      description: 'Commercial granite countertop for office reception desk.',
      squareFootage: 25.0,
      materials: JSON.stringify(['Granite', 'Bullnose edge', 'Cable management']),
      location: 'Marietta, GA 30060',
      budget: 2000,
      timeline: '1-2 weeks',
      status: 'DECLINED',
      notes: 'Timeline too tight for current schedule',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  // Create sample materials
  const materials = [
    {
      name: 'Granite',
      category: 'Natural Stone',
      description: 'Durable natural stone with unique patterns',
      priceRange: '$40-80 per sq ft',
    },
    {
      name: 'Quartz',
      category: 'Engineered Stone',
      description: 'Non-porous engineered stone with consistent patterns',
      priceRange: '$50-90 per sq ft',
    },
    {
      name: 'Marble',
      category: 'Natural Stone',
      description: 'Elegant natural stone perfect for luxury applications',
      priceRange: '$60-100 per sq ft',
    },
    {
      name: 'Butcher Block',
      category: 'Wood',
      description: 'Warm, natural wood countertops',
      priceRange: '$25-50 per sq ft',
    },
  ]

  for (const material of materials) {
    await prisma.material.create({
      data: material,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
