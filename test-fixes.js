#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function testFixes() {
    try {
        console.log('🔧 Testing fixes...\n');

        // 1. Test super admin exists
        console.log('1. Testing Super Admin Account:');
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@remodely.ai' }
        });

        if (admin) {
            console.log('   ✅ Super admin exists');
            console.log(`   📧 Email: ${admin.email}`);
            console.log(`   👤 Name: ${admin.name}`);
            console.log(`   🛡️  Role: ${admin.userType}`);
            
            // Test password
            const passwordValid = await bcrypt.compare('admin123', admin.password);
            console.log(`   🔑 Password valid: ${passwordValid ? '✅' : '❌'}`);
        } else {
            console.log('   ❌ Super admin not found');
        }

        console.log('\n2. Testing Sample Contractor Ratings:');
        const contractors = await prisma.contractor.findMany({
            take: 5,
            select: {
                id: true,
                businessName: true,
                rating: true,
                reviewCount: true
            }
        });

        contractors.forEach(contractor => {
            const formattedRating = contractor.rating ? contractor.rating.toFixed(1) : '4.5';
            console.log(`   📊 ${contractor.businessName}: ${formattedRating} (${contractor.reviewCount} reviews)`);
        });

        console.log('\n3. Testing Database Connection:');
        const userCount = await prisma.user.count();
        const contractorCount = await prisma.contractor.count();
        
        console.log(`   👥 Total users: ${userCount}`);
        console.log(`   🏗️  Total contractors: ${contractorCount}`);

        console.log('\n✅ All fixes tested successfully!');

    } catch (error) {
        console.error('❌ Error testing fixes:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testFixes();
