const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Import the image service concept (we'll hardcode the arrays here for Node.js)
const contractorProfiles = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b332c449?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
];

const projectImages = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556909011-7309f48f79b6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556909114-4e4fa72bb41c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585663800131-6675cd0c77a2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f3bda3dd4b3f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop',
];

function getRandomProfileImage() {
    return contractorProfiles[Math.floor(Math.random() * contractorProfiles.length)];
}

function getRandomProjectImages(count = 3) {
    const shuffled = [...projectImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function updateContractorImages() {
    console.log('🖼️ Updating Contractor Images...');
    console.log('================================');

    try {
        const contractors = await prisma.contractor.findMany({
            include: {
                user: true,
                portfolio: true
            }
        });

        let updatedCount = 0;

        for (const contractor of contractors) {
            // Update user profile image
            const profileImage = getRandomProfileImage();
            await prisma.user.update({
                where: { id: contractor.userId },
                data: { image: profileImage }
            });

            // Update contractor portfolio images
            const portfolioImages = getRandomProjectImages(4);
            await prisma.contractor.update({
                where: { id: contractor.id },
                data: {
                    portfolioImages: JSON.stringify(portfolioImages)
                }
            });

            // Update existing portfolio items with images
            if (contractor.portfolio.length > 0) {
                for (const portfolioItem of contractor.portfolio) {
                    const itemImages = getRandomProjectImages(2);
                    await prisma.portfolio.update({
                        where: { id: portfolioItem.id },
                        data: {
                            images: JSON.stringify(itemImages)
                        }
                    });
                }
            }

            console.log(`✅ Updated images for ${contractor.businessName}`);
            updatedCount++;
        }

        console.log(`\n📊 Summary:`);
        console.log(`   Updated: ${updatedCount} contractors`);
        console.log(`   Profile images: Varied professional photos`);
        console.log(`   Portfolio images: Kitchen/stone project photos`);
        console.log(`   Project images: High-quality Unsplash images`);

    } catch (error) {
        console.error('❌ Error updating images:', error);
    } finally {
        await prisma.$disconnect();
    }

    console.log('\n🎉 Image update complete!');
}

updateContractorImages();
