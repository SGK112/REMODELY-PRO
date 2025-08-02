const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testAdminLogin() {
    try {
        console.log('🔍 Testing admin login credentials...')

        const user = await prisma.user.findUnique({
            where: { email: 'admin@remodely.ai' }
        })

        if (!user) {
            console.log('❌ User not found')
            return
        }

        console.log('👤 User found:', user.email)
        console.log('🔑 Testing password: admin123')

        const passwordMatch = await bcrypt.compare('admin123', user.password)

        if (passwordMatch) {
            console.log('✅ Password matches! Login should work.')
            console.log('🎯 Use these credentials:')
            console.log('   Email: admin@remodely.ai')
            console.log('   Password: admin123')
        } else {
            console.log('❌ Password does not match')

            // Try to set a new password
            console.log('🔧 Setting new password...')
            const newHashedPassword = await bcrypt.hash('admin123', 12)

            await prisma.user.update({
                where: { email: 'admin@remodely.ai' },
                data: { password: newHashedPassword }
            })

            console.log('✅ Password updated. Try logging in with admin123')
        }

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

testAdminLogin()
