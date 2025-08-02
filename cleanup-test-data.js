const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function cleanupTestData() {
    try {
        console.log('🧹 Cleaning up test data for fresh end-to-end testing...')

        // Test email we'll use for the complete flow
        const testEmail = 'joshb@surprisegranite.com'

        console.log(`🔍 Checking for existing user: ${testEmail}`)

        const existingUser = await prisma.user.findUnique({
            where: { email: testEmail },
            include: {
                contractor: true,
                customer: true
            }
        })

        if (existingUser) {
            console.log('🗑️  Removing existing test user and profiles...')

            // Delete contractor profile if exists
            if (existingUser.contractor) {
                await prisma.contractor.delete({
                    where: { userId: existingUser.id }
                })
                console.log('   ✅ Contractor profile deleted')
            }

            // Delete customer profile if exists
            if (existingUser.customer) {
                await prisma.customer.delete({
                    where: { userId: existingUser.id }
                })
                console.log('   ✅ Customer profile deleted')
            }

            // Delete user
            await prisma.user.delete({
                where: { email: testEmail }
            })
            console.log('   ✅ User account deleted')
        } else {
            console.log('✨ No existing test user found - ready for fresh registration!')
        }

        console.log('\n🎯 Ready for end-to-end testing!')
        console.log('📧 Test email:', testEmail)
        console.log('📱 Test phone:', '+14802555887')
        console.log('🌐 Signup URL: http://localhost:3000/signup')

    } catch (error) {
        console.error('❌ Error during cleanup:', error)
    } finally {
        await prisma.$disconnect()
    }
}

cleanupTestData()
