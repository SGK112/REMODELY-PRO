const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAndCreateProfiles() {
    try {
        console.log('🔍 Checking database for users and profiles...\n')

        // Get all users
        const users = await prisma.user.findMany({
            include: {
                contractor: true,
                customer: true
            }
        })

        if (users.length === 0) {
            console.log('❌ No users found in database')
            console.log('👤 Creating sample users...\n')

            // Create sample contractor user
            const contractorUser = await prisma.user.create({
                data: {
                    name: 'John Smith',
                    email: 'contractor@test.com',
                    password: '$2a$10$SAMPLE_HASH', // In real app, use proper hashing
                    userType: 'CONTRACTOR'
                }
            })

            // Create contractor profile
            await prisma.contractor.create({
                data: {
                    userId: contractorUser.id,
                    businessName: 'Smith Granite Works',
                    description: 'Professional granite installation with 15+ years experience',
                    serviceArea: JSON.stringify(['Austin', 'Round Rock', 'Cedar Park']),
                    phone: '(555) 123-4567',
                    address: '123 Main St',
                    city: 'Austin',
                    state: 'TX',
                    zipCode: '78701',
                    specialties: JSON.stringify(['Granite', 'Quartz', 'Marble']),
                    yearsExperience: 15,
                    licenseNumber: 'TX-12345',
                    portfolioImages: JSON.stringify([])
                }
            })

            // Create sample customer user  
            const customerUser = await prisma.user.create({
                data: {
                    name: 'Jane Doe',
                    email: 'customer@test.com',
                    password: '$2a$10$SAMPLE_HASH', // In real app, use proper hashing
                    userType: 'CUSTOMER'
                }
            })

            // Create customer profile
            await prisma.customer.create({
                data: {
                    userId: customerUser.id,
                    firstName: 'Jane',
                    lastName: 'Doe',
                    phone: '(555) 987-6543',
                    address: '456 Oak Ave',
                    city: 'Austin',
                    state: 'TX',
                    zipCode: '78702'
                }
            })

            console.log('✅ Created sample contractor and customer users')
            console.log('📧 Contractor: contractor@test.com')
            console.log('📧 Customer: customer@test.com')
            console.log('🔑 Password: Use any password (demo mode)')

            // Create admin user
            const adminUser = await prisma.user.create({
                data: {
                    name: 'Admin User',
                    email: 'admin@test.com',
                    password: '$2a$10$SAMPLE_HASH',
                    userType: 'ADMIN'
                }
            })

            console.log('👑 Admin: admin@test.com')
            console.log('')
        }

        // Display current users and their profiles
        console.log('📊 Current Users in Database:')
        console.log('='.repeat(50))

        for (const user of users) {
            console.log(`👤 User: ${user.name} (${user.email})`)
            console.log(`   Type: ${user.userType}`)
            console.log(`   ID: ${user.id}`)

            if (user.contractor) {
                console.log(`   🏢 Contractor Profile: ${user.contractor.businessName}`)
                console.log(`   📍 Location: ${user.contractor.city}, ${user.contractor.state}`)
            }

            if (user.customer) {
                console.log(`   🏠 Customer Profile: ${user.customer.firstName} ${user.customer.lastName}`)
                console.log(`   📍 Location: ${user.customer.city}, ${user.customer.state}`)
            }

            if (!user.contractor && !user.customer) {
                console.log(`   ⚠️  No profile found for ${user.userType} user`)

                // Auto-create missing profiles
                if (user.userType === 'CONTRACTOR') {
                    await prisma.contractor.create({
                        data: {
                            userId: user.id,
                            businessName: user.name + "'s Business",
                            description: 'Professional contractor services',
                            serviceArea: JSON.stringify(['Local Area']),
                            specialties: JSON.stringify(['General']),
                            portfolioImages: JSON.stringify([])
                        }
                    })
                    console.log(`   ✅ Created contractor profile for ${user.name}`)
                } else if (user.userType === 'CUSTOMER') {
                    const nameParts = user.name?.split(' ') || ['Unknown', 'User']
                    await prisma.customer.create({
                        data: {
                            userId: user.id,
                            firstName: nameParts[0],
                            lastName: nameParts[1] || nameParts[0]
                        }
                    })
                    console.log(`   ✅ Created customer profile for ${user.name}`)
                }
            }

            console.log('')
        }

        console.log('🎯 Next Steps:')
        console.log('1. Visit http://localhost:3006')
        console.log('2. Sign in with one of the test accounts')
        console.log('3. Navigate to Dashboard → Manage Profile')
        console.log('4. Upload images and update your profile')
        console.log('\n📋 Prisma Studio: http://localhost:5555')

    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkAndCreateProfiles()
