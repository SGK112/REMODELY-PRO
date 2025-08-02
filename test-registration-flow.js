const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testRegistrationFlow() {
    try {
        console.log('🧪 Testing Complete Registration Flow')
        console.log('===================================\n')

        // Test data
        const testUser = {
            name: 'Test User Registration',
            email: 'test.registration@example.com',
            phone: '+14802555887',
            userType: 'CUSTOMER'
        }

        console.log('1. Checking if test user exists...')
        const existingUser = await prisma.user.findUnique({
            where: { email: testUser.email }
        })

        if (existingUser) {
            console.log('🗑️  Removing existing test user...')
            await prisma.user.delete({
                where: { email: testUser.email }
            })
        }

        console.log('2. Creating new user with phone verification...')
        const hashedPassword = await bcrypt.hash('testpass123', 12)

        const user = await prisma.user.create({
            data: {
                name: testUser.name,
                email: testUser.email,
                password: hashedPassword,
                userType: testUser.userType,
                phone: testUser.phone,
                phoneVerified: true,
                phoneVerifiedAt: new Date()
            }
        })

        console.log('✅ User created successfully!')
        console.log('   ID:', user.id)
        console.log('   Email:', user.email)
        console.log('   Phone:', user.phone)
        console.log('   Phone Verified:', user.phoneVerified)

        console.log('\n3. Creating customer profile...')
        const customer = await prisma.customer.create({
            data: {
                userId: user.id,
                firstName: testUser.name.split(' ')[0] || 'Test',
                lastName: testUser.name.split(' ')[1] || 'User'
            }
        })

        console.log('✅ Customer profile created!')
        console.log('   Customer ID:', customer.id)

        console.log('\n🎉 Registration flow test completed successfully!')
        console.log('\nNext steps after registration:')
        console.log('1. Send welcome email')
        console.log('2. Redirect to onboarding flow')
        console.log('3. Show role-specific dashboard')
        console.log('4. Guide through first actions')

    } catch (error) {
        console.error('❌ Registration flow test failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

testRegistrationFlow()
