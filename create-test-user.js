// Quick setup script to create a test admin user for testing the scraping system

const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

async function createTestUser() {
    const prisma = new PrismaClient()

    try {
        console.log('🔧 Creating test admin user...')

        // Check if admin user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: 'admin@remodely.ai' }
        })

        if (existingUser) {
            console.log('✅ Admin user already exists!')
            console.log('Email: admin@remodely.ai')
            console.log('Password: admin123')
            return
        }

        // Create admin user
        const hashedPassword = await hash('admin123', 12)

        const user = await prisma.user.create({
            data: {
                name: 'Admin User',
                email: 'admin@remodely.ai',
                password: hashedPassword,
                userType: 'ADMIN',
                emailVerified: new Date()
            }
        })

        console.log('✅ Test admin user created successfully!')
        console.log('')
        console.log('🔑 Login Credentials:')
        console.log('Email: admin@remodely.ai')
        console.log('Password: admin123')
        console.log('')
        console.log('🚀 Now you can:')
        console.log('1. Go to http://localhost:3002/auth/signin')
        console.log('2. Login with the credentials above')
        console.log('3. Navigate to http://localhost:3002/admin/scraping')
        console.log('4. Test the scraping system!')

    } catch (error) {
        console.error('❌ Error creating test user:', error)
    } finally {
        await prisma.$disconnect()
    }
}

createTestUser()
