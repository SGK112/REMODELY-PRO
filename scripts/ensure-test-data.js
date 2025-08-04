const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function ensureTestData() {
    try {
        console.log('🔍 Checking for test contractors...');

        // Check if we have contractors
        const contractorCount = await prisma.user.count({
            where: {
                userType: 'CONTRACTOR',
                contractor: {
                    isNot: null
                }
            }
        });

        console.log(`Found ${contractorCount} contractors in database`);

        if (contractorCount === 0) {
            console.log('📝 Creating test contractors...');

            // Create test contractors
            const testContractors = [
                {
                    email: 'contractor1@test.com',
                    name: 'Elite Home Solutions',
                    phone: '+1234567890',
                    userType: 'CONTRACTOR',
                    contractor: {
                        companyName: 'Elite Home Solutions',
                        contactName: 'John Smith',
                        phone: '+1234567890',
                        website: 'https://elitehomesolutions.com',
                        specialties: JSON.stringify(['Kitchen Remodeling', 'Bathroom Renovation', 'General Contracting']),
                        rating: 4.8,
                        reviewCount: 127,
                        description: 'Premium home renovation services with 15+ years of experience',
                        address: '123 Main St',
                        city: 'Phoenix',
                        state: 'Arizona',
                        zipCode: '85001',
                        verified: true,
                        yearsInBusiness: 15,
                        latitude: 33.4484,
                        longitude: -112.0740
                    }
                },
                {
                    email: 'contractor2@test.com',
                    name: 'Pro Kitchen Experts',
                    phone: '+1234567891',
                    userType: 'CONTRACTOR',
                    contractor: {
                        companyName: 'Pro Kitchen Experts',
                        contactName: 'Sarah Johnson',
                        phone: '+1234567891',
                        website: 'https://prokitchenexperts.com',
                        specialties: JSON.stringify(['Kitchen Remodeling', 'Countertops', 'Cabinets']),
                        rating: 4.9,
                        reviewCount: 89,
                        description: 'Specialized kitchen renovation experts serving Arizona',
                        address: '456 Oak Ave',
                        city: 'Scottsdale',
                        state: 'Arizona',
                        zipCode: '85251',
                        verified: true,
                        yearsInBusiness: 12,
                        latitude: 33.4942,
                        longitude: -111.9261
                    }
                },
                {
                    email: 'contractor3@test.com',
                    name: 'Arizona Roofing Pros',
                    phone: '+1234567892',
                    userType: 'CONTRACTOR',
                    contractor: {
                        companyName: 'Arizona Roofing Pros',
                        contactName: 'Mike Davis',
                        phone: '+1234567892',
                        website: 'https://azroofingpros.com',
                        specialties: JSON.stringify(['Roofing', 'Roof Repair', 'Solar Installation']),
                        rating: 4.7,
                        reviewCount: 156,
                        description: 'Arizona\'s trusted roofing professionals since 2008',
                        address: '789 Desert Rd',
                        city: 'Tempe',
                        state: 'Arizona',
                        zipCode: '85281',
                        verified: true,
                        yearsInBusiness: 16,
                        latitude: 33.4255,
                        longitude: -111.9400
                    }
                }
            ];

            for (const contractorData of testContractors) {
                const { contractor, ...userData } = contractorData;

                await prisma.user.create({
                    data: {
                        ...userData,
                        contractor: {
                            create: contractor
                        }
                    }
                });
            }

            console.log('✅ Test contractors created successfully!');
        }

        // Verify test accounts exist
        const testAccounts = [
            { email: 'customer@test.com', userType: 'CUSTOMER' },
            { email: 'contractor@test.com', userType: 'CONTRACTOR' },
            { email: 'admin@test.com', userType: 'ADMIN' }
        ];

        for (const account of testAccounts) {
            const user = await prisma.user.findUnique({
                where: { email: account.email }
            });

            if (!user) {
                console.log(`Creating test ${account.userType.toLowerCase()}: ${account.email}`);
                await prisma.user.create({
                    data: {
                        email: account.email,
                        name: account.userType.charAt(0) + account.userType.slice(1).toLowerCase(),
                        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
                        userType: account.userType,
                        phone: '+1234567890'
                    }
                });
            }
        }

        console.log('✅ All test data verified!');

    } catch (error) {
        console.error('Error ensuring test data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    ensureTestData();
}

module.exports = { ensureTestData };
