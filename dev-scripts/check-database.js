// Simple database status checker
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkStatus() {
    try {
        console.log('🎯 Remodely.AI Database Status')
        console.log('===================================\n')

        // Check Users
        const userCount = await prisma.user.count()
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                userType: true,
                emailVerified: true
            }
        })

        console.log(`👥 Users: ${userCount}`)
        users.forEach((user, i) => {
            console.log(`  ${i + 1}. ${user.name} (${user.email}) - ${user.userType}`)
        })

        // Check Contractors  
        const contractorCount = await prisma.contractor.count()
        const contractors = await prisma.contractor.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        })

        console.log(`\n🔨 Contractors: ${contractorCount}`)
        contractors.forEach((contractor, i) => {
            const specialties = JSON.parse(contractor.specialties || '[]')
            console.log(`  ${i + 1}. ${contractor.businessName}`)
            console.log(`     📧 ${contractor.user?.email || 'No email'}`)
            console.log(`     📞 ${contractor.phone || 'No phone'}`)
            console.log(`     📍 ${contractor.city}, ${contractor.state}`)
            console.log(`     🛠️  ${specialties.join(', ')}`)
            console.log(`     ✅ Verified: ${contractor.isVerified}`)
            console.log('')
        })

        // Check Customers
        const customerCount = await prisma.customer.count()
        console.log(`👤 Customers: ${customerCount}`)

        // Check Quotes
        const quoteCount = await prisma.quote.count()
        console.log(`📋 Quotes: ${quoteCount}`)

        // Summary
        console.log('\n📊 Summary:')
        console.log(`- Total Users: ${userCount}`)
        console.log(`- Contractors: ${contractorCount}`)
        console.log(`- Customers: ${customerCount}`)
        console.log(`- Quotes: ${quoteCount}`)

        if (contractorCount > 0) {
            console.log('\n✅ Your database already contains contractor data!')
            console.log('🔗 You can view these contractors at: http://localhost:3003/contractors')
            console.log('🎮 Test page available at: http://localhost:3003/test-scraping')
        } else {
            console.log('\n📝 Database is empty, ready for contractor population')
        }

    } catch (error) {
        console.error('❌ Error checking database:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkStatus()
