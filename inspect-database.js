const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function inspectDatabase() {
    try {
        console.log('🔍 REMODELY DATABASE INSPECTION')
        console.log('=' * 50)

        // Get all users with their profiles
        const users = await prisma.user.findMany({
            include: {
                contractor: true,
                customer: true
            }
        })

        console.log(`\n📊 USERS FOUND: ${users.length}`)

        users.forEach((user, index) => {
            console.log(`\n${index + 1}. ${user.email} (${user.userType})`)
            console.log(`   ID: ${user.id}`)
            console.log(`   Name: ${user.name || 'Not set'}`)
            console.log(`   Customer Profile: ${user.customer ? '✅ EXISTS' : '❌ MISSING'}`)
            console.log(`   Contractor Profile: ${user.contractor ? '✅ EXISTS' : '❌ MISSING'}`)

            if (user.contractor) {
                console.log(`   Business: ${user.contractor.businessName}`)
            }
            if (user.customer) {
                console.log(`   Customer Name: ${user.customer.firstName} ${user.customer.lastName}`)
            }
        })

        // Get counts
        const contractorCount = await prisma.contractor.count()
        const customerCount = await prisma.customer.count()
        const quoteCount = await prisma.quote.count()

        console.log(`\n📈 DATABASE SUMMARY:`)
        console.log(`   Users: ${users.length}`)
        console.log(`   Contractors: ${contractorCount}`)
        console.log(`   Customers: ${customerCount}`)
        console.log(`   Quotes: ${quoteCount}`)

        // Check for orphaned data
        const orphanedContractors = await prisma.contractor.findMany({
            where: { userId: null }
        })

        console.log(`\n⚠️  ISSUES:`)
        console.log(`   Orphaned contractors: ${orphanedContractors.length}`)

        if (orphanedContractors.length > 0) {
            console.log(`\n🔧 ORPHANED CONTRACTORS:`)
            orphanedContractors.forEach(contractor => {
                console.log(`   - ${contractor.businessName} (ID: ${contractor.id})`)
            })
        }

    } catch (error) {
        console.error('❌ Database inspection failed:', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

inspectDatabase()
