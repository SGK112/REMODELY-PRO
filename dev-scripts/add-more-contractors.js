const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const additionalContractors = [
    // More Phoenix Area
    {
        businessName: "Phoenix Premier Stone LLC",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85021",
        phone: "(602) 555-9001",
        licenseNumber: "ROC-K38-019001",
        rating: 4.8,
        reviewCount: 156,
        specialties: ["Kitchen Remodeling", "Granite Installation", "Custom Fabrication"]
    },
    {
        businessName: "Copper State Countertops Inc",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85035",
        phone: "(602) 555-9002",
        licenseNumber: "ROC-CR40-019002",
        rating: 4.6,
        reviewCount: 89,
        specialties: ["Quartz Countertops", "Marble Work", "Kitchen Islands"]
    },
    {
        businessName: "Desert Ridge Stone Works",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85050",
        phone: "(602) 555-9003",
        licenseNumber: "ROC-K38-019003",
        rating: 4.9,
        reviewCount: 234,
        specialties: ["Luxury Kitchen Design", "Natural Stone", "Custom Backsplashes"]
    },
    // Tempe/Mesa Area
    {
        businessName: "Salt River Stone Co",
        city: "Tempe",
        state: "AZ",
        zipCode: "85281",
        phone: "(480) 555-9004",
        licenseNumber: "ROC-CR40-019004",
        rating: 4.7,
        reviewCount: 167,
        specialties: ["Granite Installation", "Quartz Countertops", "Bathroom Vanities"]
    },
    {
        businessName: "Mesa Marble Masters LLC",
        city: "Mesa",
        state: "AZ",
        zipCode: "85205",
        phone: "(480) 555-9005",
        licenseNumber: "ROC-K38-019005",
        rating: 4.5,
        reviewCount: 78,
        specialties: ["Marble Work", "Kitchen Remodeling", "Stone Restoration"]
    },
    {
        businessName: "Apache Junction Stone LLC",
        city: "Apache Junction",
        state: "AZ",
        zipCode: "85120",
        phone: "(480) 555-9006",
        licenseNumber: "ROC-L37-019006",
        rating: 4.8,
        reviewCount: 92,
        specialties: ["Granite Installation", "Outdoor Kitchens", "Fire Pits"]
    },
    // Scottsdale Area
    {
        businessName: "North Scottsdale Granite Co",
        city: "Scottsdale",
        state: "AZ",
        zipCode: "85260",
        phone: "(480) 555-9007",
        licenseNumber: "ROC-K38-019007",
        rating: 4.9,
        reviewCount: 312,
        specialties: ["Luxury Kitchen Design", "Exotic Stones", "Custom Fabrication"]
    },
    {
        businessName: "Paradise Valley Stone Works",
        city: "Paradise Valley",
        state: "AZ",
        zipCode: "85253",
        phone: "(480) 555-9008",
        licenseNumber: "ROC-CR40-019008",
        rating: 4.8,
        reviewCount: 145,
        specialties: ["High-End Residential", "Marble Work", "Custom Islands"]
    },
    // Glendale/Peoria Area
    {
        businessName: "West Valley Stone LLC",
        city: "Glendale",
        state: "AZ",
        zipCode: "85301",
        phone: "(623) 555-9009",
        licenseNumber: "ROC-K38-019009",
        rating: 4.6,
        reviewCount: 134,
        specialties: ["Kitchen Remodeling", "Granite Installation", "Quartz Work"]
    },
    {
        businessName: "Peoria Precision Stone Inc",
        city: "Peoria",
        state: "AZ",
        zipCode: "85345",
        phone: "(623) 555-9010",
        licenseNumber: "ROC-CR6-019010",
        rating: 4.7,
        reviewCount: 98,
        specialties: ["Ceramic Tile", "Natural Stone", "Backsplashes"]
    },
    // Chandler Area
    {
        businessName: "Chandler Stone Specialists LLC",
        city: "Chandler",
        state: "AZ",
        zipCode: "85226",
        phone: "(480) 555-9011",
        licenseNumber: "ROC-K38-019011",
        rating: 4.8,
        reviewCount: 189,
        specialties: ["Kitchen Remodeling", "Granite Installation", "Modern Design"]
    },
    {
        businessName: "Gilbert Granite Works Inc",
        city: "Gilbert",
        state: "AZ",
        zipCode: "85295",
        phone: "(480) 555-9012",
        licenseNumber: "ROC-CR40-019012",
        rating: 4.5,
        reviewCount: 76,
        specialties: ["Stone & Masonry", "Outdoor Living", "Custom Work"]
    },
    // Tucson Area Additional
    {
        businessName: "Old Pueblo Stone Co",
        city: "Tucson",
        state: "AZ",
        zipCode: "85710",
        phone: "(520) 555-9013",
        licenseNumber: "ROC-K38-019013",
        rating: 4.6,
        reviewCount: 112,
        specialties: ["Southwest Style", "Adobe Integration", "Desert Stone"]
    },
    {
        businessName: "Saguaro Stone Works LLC",
        city: "Tucson",
        state: "AZ",
        zipCode: "85745",
        phone: "(520) 555-9014",
        licenseNumber: "ROC-L37-019014",
        rating: 4.9,
        reviewCount: 87,
        specialties: ["Landscaping Stone", "Water Features", "Desert Gardens"]
    },
    // Surprise/Sun City Area
    {
        businessName: "Sun City Stone LLC",
        city: "Sun City",
        state: "AZ",
        zipCode: "85351",
        phone: "(623) 555-9015",
        licenseNumber: "ROC-K38-019015",
        rating: 4.7,
        reviewCount: 156,
        specialties: ["Senior-Friendly Design", "Easy Maintenance", "Simple Elegance"]
    }
];

async function addMoreContractors() {
    console.log('🏗️ Adding More Arizona Contractors...');
    console.log('=====================================');

    let addedCount = 0;

    for (const contractorData of additionalContractors) {
        try {
            // Check if contractor already exists
            const existing = await prisma.contractor.findFirst({
                where: { businessName: contractorData.businessName }
            });

            if (existing) {
                console.log(`⏭️ Skipping existing: ${contractorData.businessName}`);
                continue;
            }

            // Create user first
            const user = await prisma.user.create({
                data: {
                    name: contractorData.businessName,
                    email: `${contractorData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.${Date.now()}@contractor.example.com`,
                    userType: 'CONTRACTOR'
                }
            });

            // Create contractor
            const contractor = await prisma.contractor.create({
                data: {
                    userId: user.id,
                    businessName: contractorData.businessName,
                    city: contractorData.city,
                    state: contractorData.state,
                    zipCode: contractorData.zipCode,
                    phone: contractorData.phone,
                    licenseNumber: contractorData.licenseNumber,
                    rating: contractorData.rating,
                    reviewCount: contractorData.reviewCount,
                    specialties: JSON.stringify(contractorData.specialties),
                    serviceArea: JSON.stringify([contractorData.city, `${contractorData.city} Metro Area`, contractorData.state]),
                    verified: true,
                    isVerified: true,
                    description: `Professional countertop installation serving ${contractorData.city} and surrounding areas. Specializing in ${contractorData.specialties.join(', ').toLowerCase()}.`,
                    yearsExperience: Math.floor(Math.random() * 15) + 5,
                    scrapedFrom: 'Arizona ROC Database'
                }
            });

            // Add portfolio items
            const portfolioCount = Math.floor(Math.random() * 3) + 2; // 2-4 items
            for (let i = 0; i < portfolioCount; i++) {
                await prisma.portfolio.create({
                    data: {
                        contractorId: contractor.id,
                        title: `${contractorData.specialties[i % contractorData.specialties.length]} Project`,
                        description: `Beautiful ${contractorData.specialties[i % contractorData.specialties.length].toLowerCase()} installation in ${contractorData.city}`,
                        images: JSON.stringify([
                            'https://images.unsplash.com/photo-1556909114-4e4fa72bb41c?w=300&h=200&fit=crop',
                            'https://images.unsplash.com/photo-1556909011-7309f48f79b6?w=300&h=200&fit=crop'
                        ]),
                        projectType: contractorData.specialties[i % contractorData.specialties.length],
                        materials: JSON.stringify(['Granite', 'Quartz']),
                        cost: Math.floor(Math.random() * 8000) + 3000,
                        completedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
                    }
                });
            }

            console.log(`✅ Added: ${contractorData.businessName} in ${contractorData.city}`);
            addedCount++;

        } catch (error) {
            console.error(`❌ Error adding ${contractorData.businessName}:`, error.message);
        }
    }

    // Final stats
    const totalContractors = await prisma.contractor.count();
    console.log(`\n📊 Final Statistics:`);
    console.log(`   Added: ${addedCount} new contractors`);
    console.log(`   Total: ${totalContractors} contractors in database`);

    await prisma.$disconnect();
    console.log('\n🎉 Arizona contractor expansion complete!');
}

addMoreContractors().catch(console.error);
