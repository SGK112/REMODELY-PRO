const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkTestProgress() {
    try {
        console.log('📊 End-to-End Test Progress Check')
        console.log('==================================\n')

        const testEmail = 'joshb@surprisegranite.com'

        const user = await prisma.user.findUnique({
            where: { email: testEmail },
            include: {
                contractor: true,
                customer: true
            }
        })

        if (!user) {
            console.log('❌ Test user not found - registration not completed yet')
            console.log('🎯 Next step: Complete registration at http://localhost:3000/signup')
            return
        }

        console.log('✅ Test user found!')
        console.log('📧 Email:', user.email)
        console.log('👤 Name:', user.name)
        console.log('📱 Phone:', user.phone)
        console.log('✅ Phone Verified:', user.phoneVerified ? 'YES' : 'NO')
        console.log('📅 Phone Verified At:', user.phoneVerifiedAt?.toLocaleString() || 'N/A')
        console.log('👷 User Type:', user.userType)
        console.log('🔐 Has Password:', user.password ? 'YES' : 'NO')
        console.log('📝 Created:', user.createdAt.toLocaleString())
        console.log('🔄 Updated:', user.updatedAt.toLocaleString())

        if (user.contractor) {
            console.log('\n🏢 Contractor Profile:')
            console.log('   Business Name:', user.contractor.businessName)
            console.log('   Verified:', user.contractor.isVerified ? 'YES' : 'NO')
        }

        if (user.customer) {
            console.log('\n🏠 Customer Profile:')
            console.log('   Name:', `${user.customer.firstName} ${user.customer.lastName}`)
        }

        console.log('\n🎯 Test Status:')
        console.log('   Registration:', user ? '✅ COMPLETE' : '❌ PENDING')
        console.log('   Phone Verification:', user?.phoneVerified ? '✅ COMPLETE' : '❌ PENDING')
        console.log('   Profile Creation:', (user?.contractor || user?.customer) ? '✅ COMPLETE' : '❌ PENDING')

        console.log('\n📋 Next Steps:')
        if (user.phoneVerified) {
            console.log('   1. Test login at http://localhost:3000/auth/signin')
            console.log('   2. Test password reset at http://localhost:3000/auth/forgot-password')
            console.log('   3. Check dashboard functionality')
        } else {
            console.log('   1. Complete phone verification')
            console.log('   2. Finish registration process')
        }

    } catch (error) {
        console.error('❌ Error checking test progress:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkTestProgress()
