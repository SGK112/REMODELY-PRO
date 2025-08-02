const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testImport() {
    try {
        console.log('Testing contractor import...')

        // Fetch CSV data
        const csvResponse = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSi39qivC9PjvDNPFHgJNbAm16alQywAAHQKrf_7TjGoSEa89j8me04LQwKn-wRSAS9wzj2NcXvc5Pp/pub?output=csv')
        const csvText = await csvResponse.text()

        // Parse CSV
        const lines = csvText.split('\n')
        const contractors = []

        for (let i = 1; i < Math.min(lines.length, 11); i++) { // First 10 records only for testing
            const values = lines[i].split(',')
            if (values.length >= 10 && values[0]) {
                contractors.push({
                    businessName: values[0].trim(),
                    licenseNo: values[1].trim(),
                    classificationType: values[2].trim(),
                    classification: values[3].trim(),
                    status: values[4].trim(),
                    city: values[5].trim(),
                    state: values[6].trim(),
                    zip: values[7].trim(),
                    phone: values[8].trim(),
                    moreInfo: values[9].trim()
                })
            }
        }

        console.log(`Found ${contractors.length} contractors to test`)

        let imported = 0
        let skipped = 0

        for (const contractor of contractors) {
            console.log(`\nProcessing: ${contractor.businessName}`)
            console.log(`  Status: ${contractor.status}`)
            console.log(`  Phone: ${contractor.phone}`)
            console.log(`  Phone length: ${contractor.phone.length}`)

            // Only import active contractors with valid phone numbers
            if (contractor.status !== 'Active' || !contractor.phone || contractor.phone.length < 10) {
                console.log(`  SKIPPED: Status=${contractor.status}, Phone length=${contractor.phone.length}`)
                skipped++
                continue
            }

            // Clean phone number
            const cleanPhone = contractor.phone.replace(/\D/g, '')
            console.log(`  Clean phone: ${cleanPhone} (length: ${cleanPhone.length})`)

            if (cleanPhone.length < 10) {
                console.log(`  SKIPPED: Clean phone too short`)
                skipped++
                continue
            }

            // Generate email from business name
            const emailSafe = contractor.businessName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '')
                .substring(0, 20)
            const email = `${emailSafe}@imported.remodely.ai`
            console.log(`  Email: ${email}`)

            // Check if contractor already exists
            const existingUser = await prisma.user.findFirst({
                where: { email: email }
            })

            const existingContractor = await prisma.contractor.findFirst({
                where: { businessName: contractor.businessName }
            })

            if (existingUser || existingContractor) {
                console.log(`  SKIPPED: Already exists`)
                skipped++
                continue
            }

            // Generate specialties
            const specialties = ['General Contracting', 'Home Renovation', 'Remodeling']

            // Generate password
            const tempPassword = Math.random().toString(36).substring(2, 15)
            const hashedPassword = await bcrypt.hash(tempPassword, 12)

            console.log(`  IMPORTING...`)

            // Create user and contractor profile
            const user = await prisma.user.create({
                data: {
                    name: contractor.businessName,
                    email: email,
                    userType: 'CONTRACTOR',
                    password: hashedPassword,
                    contractor: {
                        create: {
                            businessName: contractor.businessName,
                            licenseNumber: contractor.licenseNo,
                            phone: cleanPhone,
                            city: contractor.city || undefined,
                            state: contractor.state || undefined,
                            zipCode: contractor.zip || undefined,
                            serviceArea: JSON.stringify([contractor.city, contractor.state].filter(Boolean)),
                            specialties: JSON.stringify(specialties),
                            isVerified: contractor.status === 'Active',
                            description: `Licensed ${contractor.classification} serving ${contractor.city ? contractor.city + ', ' : ''}${contractor.state}`,
                            yearsExperience: Math.floor(Math.random() * 15) + 5,
                        }
                    }
                }
            })

            console.log(`  SUCCESS: Created user ${user.id}`)
            imported++
        }

        console.log(`\nImport completed: ${imported} imported, ${skipped} skipped`)

    } catch (error) {
        console.error('Import error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

testImport()
