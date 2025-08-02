#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUsers() {
    try {
        console.log('Creating test users...')

        // Hash passwords
        const hashedPassword = await bcrypt.hash('password123', 12)

        // Create test customer
        const customer = await prisma.user.upsert({
            where: { email: 'customer@test.com' },
            update: {},
            create: {
                email: 'customer@test.com',
                name: 'Test Customer',
                password: hashedPassword,
                userType: 'CUSTOMER',
                phone: '+1-555-0101',
                phoneVerified: true,
                customer: {
                    create: {
                        firstName: 'Test',
                        lastName: 'Customer',
                        phone: '+1-555-0101',
                        address: '123 Test St',
                        city: 'Phoenix',
                        state: 'AZ',
                        zipCode: '85001',
                        propertyType: 'Single Family Home'
                    }
                }
            }
        })

        // Create test contractor
        const contractor = await prisma.user.upsert({
            where: { email: 'contractor@test.com' },
            update: {},
            create: {
                email: 'contractor@test.com',
                name: 'Test Contractor',
                password: hashedPassword,
                userType: 'CONTRACTOR',
                phone: '+1-555-0102',
                phoneVerified: true,
                contractor: {
                    create: {
                        businessName: 'Test Construction Co',
                        description: 'Professional contractor with 10+ years experience in kitchen and bathroom remodeling.',
                        serviceArea: '["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler"]',
                        specialties: '["Kitchen Remodeling", "Bathroom Renovation", "Granite Countertops", "Tile Installation"]',
                        yearsExperience: 10,
                        phone: '+1-555-0102',
                        address: '456 Contractor Ave',
                        city: 'Phoenix',
                        state: 'AZ',
                        zipCode: '85001',
                        rating: 4.8,
                        reviewCount: 25,
                        isVerified: true,
                        verified: true,
                        profileComplete: true
                    }
                }
            }
        })

        // Create test admin
        const admin = await prisma.user.upsert({
            where: { email: 'admin@test.com' },
            update: {},
            create: {
                email: 'admin@test.com',
                name: 'Test Admin',
                password: hashedPassword,
                userType: 'ADMIN',
                phone: '+1-555-0103',
                phoneVerified: true
            }
        })

        console.log('✅ Test users created successfully!')
        console.log('\n📧 Login Credentials:')
        console.log('Customer: customer@test.com / password123')
        console.log('Contractor: contractor@test.com / password123')
        console.log('Admin: admin@test.com / password123')
        console.log('\n🌐 Server URLs:')
        console.log('Main App: http://localhost:3001')
        console.log('Contractor Detail: http://localhost:3001/contractors/1')
        console.log('Customer Dashboard: http://localhost:3001/dashboard')
        console.log('Contractor Dashboard: http://localhost:3001/contractor/dashboard')
        console.log('Login Page: http://localhost:3001/auth/signin')

    } catch (error) {
        console.error('❌ Error creating test users:', error)
    } finally {
        await prisma.$disconnect()
    }
}

createTestUsers()
