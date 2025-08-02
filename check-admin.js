const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function checkAndFixAdminUser() {
    try {
        console.log('🔍 Checking admin user...')

        const admin = await prisma.user.findUnique({
            where: { email: 'admin@remodely.ai' }
        })

        if (!admin) {
            console.log('❌ Admin user not found')
            return
        }

        console.log('👤 Admin user found:')
        console.log('   Email:', admin.email)
        console.log('   Name:', admin.name)
        console.log('   Type:', admin.userType)
        console.log('   Has Password:', !!admin.password)
        console.log('   Password Length:', admin.password?.length || 0)

        if (!admin.password || admin.password === '$2a$10$SAMPLE_HASH') {
            console.log('\n🔧 Fixing admin password...')

            const hashedPassword = await bcrypt.hash('admin123', 12)

            await prisma.user.update({
                where: { email: 'admin@remodely.ai' },
                data: { password: hashedPassword }
            })

            console.log('✅ Admin password updated to: admin123')
        } else {
            console.log('✅ Admin password is properly set')
        }

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkAndFixAdminUser()
