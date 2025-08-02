import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

interface ContractorData {
    businessName: string
    licenseNo: string
    classificationType: string
    classification: string
    status: string
    city: string
    state: string
    zip: string
    phone: string
    moreInfo: string
}

export async function POST(request: NextRequest) {
    try {
        // For security, you might want to add authentication here
        const { authorize } = await request.json()
        if (authorize !== 'REMODELY_IMPORT_2024') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Fetch CSV data
        const csvResponse = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSi39qivC9PjvDNPFHgJNbAm16alQywAAHQKrf_7TjGoSEa89j8me04LQwKn-wRSAS9wzj2NcXvc5Pp/pub?output=csv')
        const csvText = await csvResponse.text()

        // Parse CSV
        const lines = csvText.split('\n')
        const headers = lines[0].split(',')
        const contractors: ContractorData[] = []

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',')
            if (values.length >= 10 && values[0]) { // Skip empty lines
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

        console.log(`Found ${contractors.length} contractors to import`)

        // Import contractors in batches
        let imported = 0
        let skipped = 0
        const batchSize = 50

        for (let i = 0; i < contractors.length; i += batchSize) {
            const batch = contractors.slice(i, i + batchSize)

            for (const contractor of batch) {
                try {
                    console.log(`Processing: ${contractor.businessName}, Status: ${contractor.status}, Phone: ${contractor.phone}`)

                    // Only import active contractors with valid phone numbers
                    if (contractor.status !== 'Active' || !contractor.phone || contractor.phone.length < 10) {
                        console.log(`Skipping ${contractor.businessName}: Status=${contractor.status}, Phone=${contractor.phone}`)
                        skipped++
                        continue
                    }

                    // Clean phone number
                    const cleanPhone = contractor.phone.replace(/\D/g, '')
                    if (cleanPhone.length < 10) {
                        console.log(`Skipping ${contractor.businessName}: Clean phone too short (${cleanPhone})`)
                        skipped++
                        continue
                    }

                    // Generate email from business name
                    const emailSafe = contractor.businessName
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, '')
                        .substring(0, 20)
                    const email = `${emailSafe}@imported.remodely.ai`

                    // Check if contractor already exists by email or business name
                    const existingUser = await prisma.user.findFirst({
                        where: { email: email }
                    })

                    const existingContractor = await prisma.contractor.findFirst({
                        where: { businessName: contractor.businessName }
                    })

                    if (existingUser || existingContractor) {
                        skipped++
                        continue
                    }

                    // Generate random password (they'll need to reset)
                    const tempPassword = Math.random().toString(36).substring(2, 15)
                    const hashedPassword = await bcrypt.hash(tempPassword, 12)

                    // Determine specialties based on classification
                    const specialties = getSpecialtiesFromClassification(contractor.classification)

                    // Create user and contractor profile
                    await prisma.user.create({
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
                                    yearsExperience: Math.floor(Math.random() * 15) + 5, // Random 5-20 years
                                }
                            }
                        }
                    })

                    imported++
                } catch (error) {
                    console.error(`Error importing contractor ${contractor.businessName}:`, error)
                    skipped++
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Import completed: ${imported} imported, ${skipped} skipped`,
            imported,
            skipped,
            total: contractors.length
        })

    } catch (error) {
        console.error('Import error:', error)
        return NextResponse.json(
            { error: 'Import failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}

function getSpecialtiesFromClassification(classification: string): string[] {
    const specialties: string[] = []

    if (classification.includes('Building')) {
        specialties.push('General Contracting', 'Home Renovation', 'Custom Builds')
    }

    if (classification.includes('Residential')) {
        specialties.push('Residential Remodeling', 'Home Additions', 'Kitchen Remodeling', 'Bathroom Remodeling')
    }

    if (classification.includes('Commercial')) {
        specialties.push('Commercial Construction', 'Office Renovation')
    }

    // Default specialties for all contractors
    if (specialties.length === 0) {
        specialties.push('General Contracting', 'Home Renovation', 'Remodeling')
    }

    return specialties
}
