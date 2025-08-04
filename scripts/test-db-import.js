#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const csv = require('csv-parser')

const prisma = new PrismaClient()

/**
 * Simple test to import 5 ROC contractors
 */
async function testImport5() {
    console.log('🧪 Testing ROC Import with 5 contractors...')

    const contractors = []
    let count = 0

    // Parse the first 5 records from the clean CSV
    fs.createReadStream('test_roc_clean.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (count < 5) {
                try {
                    const contractor = parseROCRecord(row)
                    contractors.push(contractor)
                    console.log(`✅ Parsed: ${contractor.businessName} (${contractor.rocLicenseNumber})`)
                    count++
                } catch (error) {
                    console.error(`❌ Error parsing row:`, error.message)
                }
            }
        })
        .on('end', async () => {
            console.log(`\n💾 Importing ${contractors.length} contractors to database...`)

            for (const contractorData of contractors) {
                try {
                    // Check if contractor already exists
                    const existing = await prisma.contractor.findFirst({
                        where: { rocLicenseNumber: contractorData.rocLicenseNumber }
                    })

                    if (existing) {
                        console.log(`  🔄 Updating: ${contractorData.businessName}`)
                        await prisma.contractor.update({
                            where: { id: existing.id },
                            data: {
                                licenseStatus: contractorData.licenseStatus,
                                rocImportDate: new Date()
                            }
                        })
                    } else {
                        console.log(`  🆕 Creating: ${contractorData.businessName}`)

                        // Create user first
                        const user = await prisma.user.create({
                            data: {
                                email: `roc.${contractorData.rocLicenseNumber}@temp.remodely.ai`,
                                name: contractorData.displayName,
                                userType: 'CONTRACTOR',
                                phone: contractorData.phone
                            }
                        })

                        // Create contractor
                        await prisma.contractor.create({
                            data: {
                                userId: user.id,
                                businessName: contractorData.businessName,
                                dbaName: contractorData.dbaName,
                                rocLicenseNumber: contractorData.rocLicenseNumber,
                                licenseClass: contractorData.licenseClass,
                                licenseType: contractorData.licenseType,
                                licenseStatus: contractorData.licenseStatus,
                                licenseIssued: contractorData.licenseIssued,
                                licenseExpiration: contractorData.licenseExpiration,
                                isROCVerified: true,
                                address: contractorData.address,
                                city: contractorData.city,
                                state: contractorData.state,
                                zipCode: contractorData.zipCode,
                                specialties: JSON.stringify(contractorData.specialties),
                                serviceArea: JSON.stringify([contractorData.city]),
                                yearsInBusiness: contractorData.yearsInBusiness,
                                qualifyingParty: contractorData.qualifyingParty,
                                phone: contractorData.phone
                            }
                        })
                    }
                } catch (error) {
                    console.error(`  ❌ Error importing ${contractorData.businessName}:`, error.message)
                }
            }

            // Check results
            const total = await prisma.contractor.count({
                where: { isROCVerified: true }
            })

            console.log(`\n🎉 Test complete! Total ROC verified contractors: ${total}`)
            await prisma.$disconnect()
        })
}

function parseROCRecord(row) {
    const licenseNo = row['License No']?.trim()
    const businessName = row['Business Name']?.trim()

    if (!licenseNo || !businessName) {
        throw new Error('Missing required fields')
    }

    // Parse license classification
    const licenseData = parseLicenseClass(row['Class'], row['Class Detail'])

    return {
        rocLicenseNumber: licenseNo,
        businessName: businessName,
        dbaName: row['Doing Business As']?.trim() || null,
        displayName: row['Doing Business As']?.trim() || businessName,
        address: row['Address']?.trim() || '',
        city: row['City']?.trim() || '',
        state: row['State']?.trim() || 'AZ',
        zipCode: row['Zip']?.toString().trim().substring(0, 5) || '',
        licenseClass: row['Class']?.trim(),
        licenseType: row['Class Type']?.trim(),
        specialties: licenseData.specialties,
        qualifyingParty: row['Qualifying Party']?.trim(),
        licenseIssued: parseDate(row['Issued Date']),
        licenseExpiration: parseDate(row['Expiration Date']),
        licenseStatus: row['Status']?.trim() || 'Active',
        yearsInBusiness: calculateYearsInBusiness(row['Issued Date']),
        phone: null,
        email: null,
        website: null
    }
}

function parseLicenseClass(classCode, classDetail) {
    const specialties = []

    const classMapping = {
        'B': ['General Contracting', 'Home Building'],
        'CR-3': ['Awnings', 'Patio Covers', 'Carports'],
        'CR-14': ['Fencing', 'Gate Installation'],
        'R-11': ['Residential Electrical'],
        'CR-42': ['Roofing', 'Roof Installation'],
        'R-39R': ['Residential HVAC', 'Air Conditioning', 'Heating']
    }

    specialties.push(...(classMapping[classCode] || ['General Construction']))

    return { specialties }
}

function parseDate(dateString) {
    if (!dateString) return null
    try {
        return new Date(dateString)
    } catch {
        return null
    }
}

function calculateYearsInBusiness(issuedDate) {
    if (!issuedDate) return 0
    const issued = new Date(issuedDate)
    const now = new Date()
    return Math.floor((now - issued) / (365.25 * 24 * 60 * 60 * 1000))
}

testImport5().catch(console.error)
