const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function fixUserProfiles() {
    try {
        console.log('🔧 FIXING USER PROFILES')
        console.log('='.repeat(50))
        
        // Get all users without proper profiles
        const users = await prisma.user.findMany({
            include: {
                contractor: true,
                customer: true
            }
        })
        
        let fixed = 0
        
        for (const user of users) {
            const needsCustomerProfile = user.userType === 'CUSTOMER' && !user.customer
            const needsContractorProfile = user.userType === 'CONTRACTOR' && !user.contractor
            
            if (needsCustomerProfile) {
                console.log(`📝 Creating customer profile for: ${user.email}`)
                
                const names = user.name ? user.name.split(' ') : ['Customer', 'User']
                const firstName = names[0] || 'Customer'
                const lastName = names.slice(1).join(' ') || 'User'
                
                await prisma.customer.create({
                    data: {
                        userId: user.id,
                        firstName: firstName,
                        lastName: lastName,
                        phone: user.phone || '',
                        preferences: JSON.stringify({
                            materials: ['Quartz', 'Granite'],
                            styles: ['Modern', 'Traditional'],
                            budget: 'Medium'
                        })
                    }
                })
                fixed++
            }
            
            if (needsContractorProfile) {
                console.log(`🔨 Creating contractor profile for: ${user.email}`)
                
                await prisma.contractor.create({
                    data: {
                        userId: user.id,
                        businessName: user.name || `${user.email.split('@')[0]} Contracting`,
                        description: 'Professional contracting services',
                        serviceArea: JSON.stringify(['Phoenix', 'Scottsdale', 'Tempe']),
                        specialties: JSON.stringify(['Countertops', 'Kitchen Remodeling', 'Bathroom Renovation']),
                        yearsExperience: 5,
                        phone: user.phone || '',
                        city: 'Phoenix',
                        state: 'AZ',
                        zipCode: '85001',
                        isVerified: true,
                        verified: true,
                        profileComplete: true,
                        rating: 4.5,
                        reviewCount: 0
                    }
                })
                fixed++
            }
        }
        
        // Create some sample quotes for testing
        const customers = await prisma.customer.findMany({ take: 2 })
        const contractors = await prisma.contractor.findMany({ 
            where: { userId: { not: null } },
            take: 3 
        })
        
        if (customers.length > 0 && contractors.length > 0) {
            console.log('📋 Creating sample quotes...')
            
            const sampleQuotes = [
                {
                    customerId: customers[0].id,
                    contractorId: contractors[0].id,
                    projectType: 'Kitchen Renovation',
                    description: 'Complete kitchen remodel with new countertops and cabinets',
                    materials: JSON.stringify(['Quartz Countertops', 'Hardwood Cabinets']),
                    location: 'Phoenix, AZ',
                    budget: 25000,
                    status: 'PENDING',
                    estimatedCost: 22000
                },
                {
                    customerId: customers[0].id,
                    contractorId: contractors[1] ? contractors[1].id : contractors[0].id,
                    projectType: 'Bathroom Remodeling',
                    description: 'Master bathroom renovation with tile and vanity',
                    materials: JSON.stringify(['Ceramic Tile', 'Custom Vanity']),
                    location: 'Phoenix, AZ',
                    budget: 15000,
                    status: 'ACCEPTED',
                    estimatedCost: 14500
                }
            ]
            
            for (const quote of sampleQuotes) {
                try {
                    await prisma.quote.create({ data: quote })
                    console.log(`  ✅ Created quote: ${quote.projectType}`)
                } catch (error) {
                    console.log(`  ⚠️ Quote may already exist: ${quote.projectType}`)
                }
            }
        }
        
        console.log(`\\n✅ PROFILE FIX COMPLETE`)
        console.log(`   Fixed profiles: ${fixed}`)
        console.log(`   Sample quotes: ${customers.length > 0 && contractors.length > 0 ? 2 : 0}`)
        
        // Final check
        const summary = await prisma.user.findMany({
            include: {
                contractor: true,
                customer: true
            }
        })
        
        const customerProfileCount = summary.filter(u => u.userType === 'CUSTOMER' && u.customer).length
        const contractorProfileCount = summary.filter(u => u.userType === 'CONTRACTOR' && u.contractor).length
        const totalQuotes = await prisma.quote.count()
        
        console.log(`\\n📊 FINAL STATUS:`)
        console.log(`   Customer profiles: ${customerProfileCount}`)
        console.log(`   Contractor profiles: ${contractorProfileCount}`)
        console.log(`   Total quotes: ${totalQuotes}`)
        
    } catch (error) {
        console.error('❌ Error fixing profiles:', error)
    } finally {
        await prisma.$disconnect()
    }
}

fixUserProfiles()
