const { PrismaClient } = require('@prisma/client')

async function countContractors() {
    const prisma = new PrismaClient()

    try {
        // Count total contractors
        const contractorCount = await prisma.contractor.count()
        console.log(`📊 Total contractors in database: ${contractorCount}`)

        // Get some additional stats
        const verifiedCount = await prisma.contractor.count({
            where: { verified: true }
        })

        const unverifiedCount = contractorCount - verifiedCount

        console.log(`✅ Verified contractors: ${verifiedCount}`)
        console.log(`⏳ Unverified contractors: ${unverifiedCount}`)

        // Get contractors by state (top 5)
        const contractorsByState = await prisma.contractor.groupBy({
            by: ['state'],
            _count: {
                state: true
            },
            orderBy: {
                _count: {
                    state: 'desc'
                }
            },
            take: 5
        })

        console.log('\n🗺️  Top 5 states by contractor count:')
        contractorsByState.forEach((item, index) => {
            console.log(`${index + 1}. ${item.state || 'Unknown'}: ${item._count.state} contractors`)
        })

        // Get average rating
        const avgStats = await prisma.contractor.aggregate({
            _avg: {
                rating: true,
                yearsExperience: true
            }
        })

        console.log(`\n⭐ Average contractor rating: ${avgStats._avg.rating?.toFixed(2) || 'N/A'}`)
        console.log(`👨‍🔧 Average years of experience: ${avgStats._avg.yearsExperience?.toFixed(1) || 'N/A'}`)

    } catch (error) {
        console.error('Error counting contractors:', error)
    } finally {
        await prisma.$disconnect()
    }
}

countContractors()
