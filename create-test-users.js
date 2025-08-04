const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUsers() {
    console.log('🔧 Creating test users...');

    try {
        // Hash password for all test users
        const hashedPassword = await bcrypt.hash('password123', 12);

        // Create or update test customer
        const customer = await prisma.user.upsert({
            where: { email: 'customer@test.com' },
            update: {
                password: hashedPassword,
                name: 'Test Customer',
                userType: 'CUSTOMER'
            },
            create: {
                email: 'customer@test.com',
                password: hashedPassword,
                name: 'Test Customer',
                userType: 'CUSTOMER',
                phone: '+1234567890'
            }
        });

        // Create Customer profile
        await prisma.customer.upsert({
            where: { userId: customer.id },
            update: {
                firstName: 'Test',
                lastName: 'Customer',
                phone: '+1234567890'
            },
            create: {
                userId: customer.id,
                firstName: 'Test',
                lastName: 'Customer',
                phone: '+1234567890'
            }
        });

        // Create or update test contractor
        const contractor = await prisma.user.upsert({
            where: { email: 'contractor@test.com' },
            update: {
                password: hashedPassword,
                name: 'Test Contractor',
                userType: 'CONTRACTOR'
            },
            create: {
                email: 'contractor@test.com',
                password: hashedPassword,
                name: 'Test Contractor',
                userType: 'CONTRACTOR',
                phone: '+1234567891'
            }
        });

        // Create Contractor profile
        await prisma.contractor.upsert({
            where: { userId: contractor.id },
            update: {
                businessName: 'Test Construction Co',
                phone: '+1234567891',
                specialties: JSON.stringify(['Kitchen Remodeling', 'Bathroom Renovation']),
                serviceArea: JSON.stringify(['Phoenix', 'Scottsdale', 'Tempe']),
                yearsExperience: 10,
                isVerified: true
            },
            create: {
                userId: contractor.id,
                businessName: 'Test Construction Co',
                phone: '+1234567891',
                specialties: JSON.stringify(['Kitchen Remodeling', 'Bathroom Renovation']),
                serviceArea: JSON.stringify(['Phoenix', 'Scottsdale', 'Tempe']),
                yearsExperience: 10,
                isVerified: true
            }
        });

        // Create or update test admin
        const admin = await prisma.user.upsert({
            where: { email: 'admin@test.com' },
            update: {
                password: hashedPassword,
                name: 'Test Admin',
                userType: 'ADMIN'
            },
            create: {
                email: 'admin@test.com',
                password: hashedPassword,
                name: 'Test Admin',
                userType: 'ADMIN',
                phone: '+1234567892'
            }
        });

        // Create or update super admin
        const superAdmin = await prisma.user.upsert({
            where: { email: 'admin@remodely.ai' },
            update: {
                password: hashedPassword,
                name: 'Super Admin',
                userType: 'ADMIN'
            },
            create: {
                email: 'admin@remodely.ai',
                password: hashedPassword,
                name: 'Super Admin',
                userType: 'ADMIN',
                phone: '+1234567893'
            }
        });

        console.log('✅ Test users created successfully!');
        console.log('\n📋 Test Credentials:');
        console.log('Customer: customer@test.com / password123');
        console.log('Contractor: contractor@test.com / password123');
        console.log('Admin: admin@test.com / password123');
        console.log('Super Admin: admin@remodely.ai / password123');
        console.log('\n🌐 Login at: http://localhost:3001/auth/signin');

    } catch (error) {
        console.error('❌ Error creating test users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the function
createTestUsers();
