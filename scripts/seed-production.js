#!/usr/bin/env node

// Production seed script for REMODELY.AI
// This script populates the production database with contractors and test data

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

// Sample contractor data for production
const PRODUCTION_CONTRACTORS = [
    {
        email: 'mike.rodriguez@example.com',
        name: 'Michael Rodriguez',
        businessName: 'Rodriguez Granite Works',
        city: 'Austin',
        state: 'TX',
        phone: '(512) 555-0123',
        specialties: ['Kitchen Remodeling', 'Bathroom Renovation', 'Countertop Installation'],
        yearsExperience: 15,
        description: 'Specializing in premium granite and quartz installations with over 15 years of experience.',
        verified: true,
        rating: 4.9,
        reviewCount: 127
    },
    {
        email: 'sarah.johnson@example.com',
        name: 'Sarah Johnson',
        businessName: 'Johnson Kitchen Designs',
        city: 'Dallas',
        state: 'TX',
        phone: '(214) 555-0456',
        specialties: ['Kitchen Remodeling', 'Custom Cabinetry', 'Interior Design'],
        yearsExperience: 12,
        description: 'Award-winning kitchen designer focused on creating beautiful, functional spaces.',
        verified: true,
        rating: 4.8,
        reviewCount: 89
    },
    {
        email: 'david.chen@example.com',
        name: 'David Chen',
        businessName: 'Chen Home Renovations',
        city: 'Houston',
        state: 'TX',
        phone: '(713) 555-0789',
        specialties: ['Bathroom Remodeling', 'Tile Installation', 'Plumbing'],
        yearsExperience: 18,
        description: 'Full-service bathroom renovations with attention to detail and quality craftsmanship.',
        verified: true,
        rating: 4.7,
        reviewCount: 156
    },
    // Add more contractors as needed
]

async function seedProduction() {
    try {
        console.log('🌱 Starting production database seed...')

        // Create admin user
        console.log('👤 Creating admin user...')
        const adminUser = await prisma.user.upsert({
            where: { email: 'admin@remodely.ai' },
            update: {},
            create: {
                email: 'admin@remodely.ai',
                name: 'REMODELY Admin',
                password: await bcrypt.hash('ReModelyAdmin2025!', 12),
                userType: 'ADMIN',
            },
        })

        // Create sample customer
        console.log('👥 Creating sample customer...')
        const customerUser = await prisma.user.upsert({
            where: { email: 'demo@customer.com' },
            update: {},
            create: {
                email: 'demo@customer.com',
                name: 'Demo Customer',
                password: await bcrypt.hash('demo123', 12),
                userType: 'CUSTOMER',
            },
        })

        const customer = await prisma.customer.upsert({
            where: { userId: customerUser.id },
            update: {},
            create: {
                userId: customerUser.id,
                firstName: 'Demo',
                lastName: 'Customer',
                phone: '(555) 123-4567',
                address: '123 Main St, Austin, TX 78701',
            },
        })

        // Create contractors
        console.log('🔨 Creating contractors...')
        let contractorCount = 0

        for (const contractorData of PRODUCTION_CONTRACTORS) {
            try {
                const contractorUser = await prisma.user.upsert({
                    where: { email: contractorData.email },
                    update: {},
                    create: {
                        email: contractorData.email,
                        name: contractorData.name,
                        password: await bcrypt.hash('contractor123', 12),
                        userType: 'CONTRACTOR',
                    },
                })

                await prisma.contractor.upsert({
                    where: { userId: contractorUser.id },
                    update: {},
                    create: {
                        userId: contractorUser.id,
                        businessName: contractorData.businessName,
                        city: contractorData.city,
                        state: contractorData.state,
                        phone: contractorData.phone,
                        specialties: JSON.stringify(contractorData.specialties),
                        yearsExperience: contractorData.yearsExperience,
                        description: contractorData.description,
                        verified: contractorData.verified,
                        rating: contractorData.rating,
                        reviewCount: contractorData.reviewCount,
                        profileImages: JSON.stringify([]),
                        portfolioImages: JSON.stringify([]),
                    },
                })

                contractorCount++
                console.log(`✅ Created contractor: ${contractorData.businessName}`)
            } catch (error) {
                console.error(`❌ Error creating contractor ${contractorData.businessName}:`, error.message)
            }
        }

        console.log(`🎉 Production seed completed successfully!`)
        console.log(`📊 Created:`)
        console.log(`   - 1 Admin user`)
        console.log(`   - 1 Demo customer`)
        console.log(`   - ${contractorCount} Contractors`)
        console.log(``)
        console.log(`🔑 Login credentials:`)
        console.log(`   Admin: admin@remodely.ai / ReModelyAdmin2025!`)
        console.log(`   Customer: demo@customer.com / demo123`)
        console.log(`   Contractors: [email] / contractor123`)

    } catch (error) {
        console.error('❌ Error during seeding:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

if (require.main === module) {
    seedProduction()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error)
            process.exit(1)
        })
}

module.exports = { seedProduction }
