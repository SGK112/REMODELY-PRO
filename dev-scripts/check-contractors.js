const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkContractors() {
    try {
        const contractors = await prisma.contractor.findMany({
            include: {
                user: true,
                reviews: true,
                portfolio: true
            }
        });

        console.log('📊 Current Database Status:');
        console.log('=========================');
        console.log(`Total Contractors: ${contractors.length}`);

        contractors.forEach((contractor, index) => {
            console.log(`\n${index + 1}. ${contractor.businessName}`);
            console.log(`   📍 ${contractor.city}, ${contractor.state}`);
            console.log(`   ⭐ Rating: ${contractor.rating} (${contractor.reviewCount} reviews)`);
            console.log(`   🆔 License: ${contractor.licenseNumber || 'N/A'}`);
            console.log(`   📷 Portfolio Items: ${contractor.portfolio.length}`);
            console.log(`   💬 Reviews: ${contractor.reviews.length}`);
            console.log(`   📊 Source: ${contractor.scrapedFrom || 'Direct'}`);
        });

        // Check if reviews actually exist
        const totalReviews = await prisma.review.count();
        console.log(`\n📝 Total Reviews in DB: ${totalReviews}`);

        await prisma.$disconnect();
    } catch (error) {
        console.error('Error:', error);
        await prisma.$disconnect();
    }
}

checkContractors();
