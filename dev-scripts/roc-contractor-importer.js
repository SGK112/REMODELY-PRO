const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

const prisma = new PrismaClient()

// ROC Contractor Import System
class ROCContractorImporter {
    constructor() {
        this.processedCount = 0
        this.errorCount = 0
        this.duplicateCount = 0
        this.successCount = 0
    }

    async importROCContractors(csvFilePath) {
        console.log('🏗️  Starting ROC Contractor Import...')
        console.log(`📂 Processing file: ${csvFilePath}`)

        const contractors = []

        return new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    // Skip header rows and empty rows
                    if (row['#'] && row['#'] !== '#' && row['License No']) {
                        contractors.push(this.parseROCData(row))
                        this.processedCount++

                        // Log progress every 1000 records
                        if (this.processedCount % 1000 === 0) {
                            console.log(`📊 Processed ${this.processedCount} records...`)
                        }
                    }
                })
                .on('end', async () => {
                    console.log(`\n✅ CSV parsing complete! Processed ${this.processedCount} records`)
                    console.log('💾 Starting database import...')

                    await this.batchImportContractors(contractors)
                    resolve(this.getSummary())
                })
                .on('error', (error) => {
                    console.error('❌ CSV parsing error:', error)
                    reject(error)
                })
        })
    }

    parseROCData(row) {
        // Extract and clean data from ROC CSV
        const licenseClasses = this.parseContractorClass(row['Class'], row['Class Detail'])
        const businessName = this.cleanBusinessName(row['Business Name'])
        const dbaName = row['Doing Business As'] && row['Doing Business As'].trim() !== ''
            ? row['Doing Business As'].trim()
            : null

        return {
            rocLicenseNumber: row['License No'].trim(),
            businessName: businessName,
            dbaName: dbaName,
            displayName: dbaName || businessName,
            address: this.cleanAddress(row['Address']),
            city: row['City']?.trim() || '',
            state: row['State']?.trim() || 'AZ',
            zipCode: this.cleanZipCode(row['Zip']),
            licenseClass: row['Class']?.trim(),
            licenseType: row['Class Type']?.trim(),
            specialties: licenseClasses.specialties,
            serviceCategories: licenseClasses.categories,
            qualifyingParty: row['Qualifying Party']?.trim(),
            licenseIssued: this.parseDate(row['Issued Date']),
            licenseExpiration: this.parseDate(row['Expiration Date']),
            licenseStatus: row['Status']?.trim() || 'Active',
            isROCVerified: true,
            rocImportDate: new Date(),
            estimatedYearsInBusiness: this.calculateYearsInBusiness(row['Issued Date'])
        }
    }

    parseContractorClass(classCode, classDetail) {
        const specialties = []
        const categories = []

        // Map ROC license classes to our specialty categories
        const classMapping = {
            'B': { specialties: ['General Contracting', 'Residential Construction'], categories: ['General Contractor'] },
            'B-1': { specialties: ['Commercial Construction', 'General Contracting'], categories: ['General Contractor'] },
            'B-2': { specialties: ['Residential Construction', 'General Contracting'], categories: ['General Contractor'] },
            'B-3': { specialties: ['Commercial Construction', 'General Contracting'], categories: ['General Contractor'] },
            'B-4': { specialties: ['Engineering Construction', 'General Contracting'], categories: ['General Contractor'] },
            'R-11': { specialties: ['Electrical Work', 'Residential Electrical'], categories: ['Electrical'] },
            'C-11': { specialties: ['Commercial Electrical', 'Electrical Work'], categories: ['Electrical'] },
            'R-37R': { specialties: ['Plumbing', 'Residential Plumbing'], categories: ['Plumbing'] },
            'C-37': { specialties: ['Commercial Plumbing', 'Plumbing'], categories: ['Plumbing'] },
            'R-39R': { specialties: ['HVAC', 'Air Conditioning', 'Heating'], categories: ['HVAC'] },
            'C-39': { specialties: ['Commercial HVAC', 'HVAC'], categories: ['HVAC'] },
            'CR-42': { specialties: ['Roofing', 'Roof Repair'], categories: ['Roofing'] },
            'CR-3': { specialties: ['Awnings', 'Patio Covers', 'Outdoor Structures'], categories: ['Outdoor Living'] },
            'CR-14': { specialties: ['Fencing', 'Gates'], categories: ['Fencing'] },
            'CR-21': { specialties: ['Landscaping', 'Hardscaping', 'Irrigation'], categories: ['Landscaping'] },
            'CR-38': { specialties: ['Pool Construction', 'Swimming Pools'], categories: ['Pool & Spa'] },
            'C-38': { specialties: ['Signage', 'Commercial Signs'], categories: ['Specialty Services'] }
        }

        // Get base mapping
        const mapping = classMapping[classCode] || { specialties: ['General Services'], categories: ['Other'] }
        specialties.push(...mapping.specialties)
        categories.push(...mapping.categories)

        // Parse additional details from class detail field
        if (classDetail) {
            const detail = classDetail.toLowerCase()
            if (detail.includes('kitchen')) {
                specialties.push('Kitchen Renovation')
                categories.push('Kitchen & Bath')
            }
            if (detail.includes('bathroom')) {
                specialties.push('Bathroom Renovation')
                categories.push('Kitchen & Bath')
            }
            if (detail.includes('flooring')) {
                specialties.push('Flooring Installation')
                categories.push('Flooring')
            }
            if (detail.includes('tile')) {
                specialties.push('Tile Installation')
                categories.push('Flooring')
            }
            if (detail.includes('concrete')) {
                specialties.push('Concrete Work')
                categories.push('Concrete & Masonry')
            }
            if (detail.includes('painting')) {
                specialties.push('Interior Painting', 'Exterior Painting')
                categories.push('Painting')
            }
        }

        return {
            specialties: [...new Set(specialties)], // Remove duplicates
            categories: [...new Set(categories)]
        }
    }

    cleanBusinessName(name) {
        if (!name) return 'Unknown Business'
        return name.trim()
            .replace(/\s+/g, ' ') // Multiple spaces to single space
            .replace(/[^\w\s&.-]/g, '') // Remove special chars except common business ones
    }

    cleanAddress(address) {
        if (!address) return ''
        return address.trim()
            .replace(/\s+/g, ' ')
            .replace(/^P\.?O\.?\s*Box\s*/i, 'PO Box ') // Standardize PO Box format
    }

    cleanZipCode(zip) {
        if (!zip) return ''
        // Extract 5-digit zip code
        const match = zip.toString().match(/(\d{5})/)
        return match ? match[1] : ''
    }

    parseDate(dateString) {
        if (!dateString) return null
        try {
            const date = new Date(dateString)
            return isNaN(date.getTime()) ? null : date
        } catch (error) {
            return null
        }
    }

    calculateYearsInBusiness(issuedDate) {
        if (!issuedDate) return 1
        const issued = new Date(issuedDate)
        const now = new Date()
        const years = Math.max(1, Math.floor((now - issued) / (1000 * 60 * 60 * 24 * 365)))
        return Math.min(years, 50) // Cap at 50 years for display purposes
    }

    async batchImportContractors(contractors) {
        const batchSize = 100
        let currentBatch = 0

        for (let i = 0; i < contractors.length; i += batchSize) {
            const batch = contractors.slice(i, i + batchSize)
            currentBatch++

            console.log(`📦 Processing batch ${currentBatch}/${Math.ceil(contractors.length / batchSize)} (${batch.length} records)`)

            await Promise.allSettled(
                batch.map(contractorData => this.importSingleContractor(contractorData))
            )

            // Brief pause to prevent overwhelming the database
            await new Promise(resolve => setTimeout(resolve, 100))
        }
    }

    async importSingleContractor(contractorData) {
        try {
            // Check if contractor already exists by ROC license number
            const existingByROC = await prisma.contractor.findFirst({
                where: { rocLicenseNumber: contractorData.rocLicenseNumber }
            })

            if (existingByROC) {
                // Update existing contractor with ROC data
                await this.updateExistingContractor(existingByROC.id, contractorData)
                this.duplicateCount++
                return
            }

            // Check if contractor exists by business name and location
            const existingByName = await prisma.contractor.findFirst({
                where: {
                    AND: [
                        { businessName: { equals: contractorData.businessName, mode: 'insensitive' } },
                        { city: { equals: contractorData.city, mode: 'insensitive' } },
                        { state: contractorData.state }
                    ]
                }
            })

            if (existingByName) {
                // Update with ROC information
                await this.updateExistingContractor(existingByName.id, contractorData)
                this.duplicateCount++
                return
            }

            // Create new contractor entry
            await this.createNewROCContractor(contractorData)
            this.successCount++

        } catch (error) {
            this.errorCount++
            console.error(`❌ Error importing contractor ${contractorData.businessName}:`, error.message)
        }
    }

    async createNewROCContractor(contractorData) {
        // Generate email for new contractor
        const email = this.generateContractorEmail(contractorData.businessName, contractorData.rocLicenseNumber)

        // Create user account
        const user = await prisma.user.create({
            data: {
                email,
                name: contractorData.displayName,
                userType: 'CONTRACTOR',
                emailVerified: null, // Will be verified when they sign up
                rocImported: new Date()
            }
        })

        // Create contractor profile
        await prisma.contractor.create({
            data: {
                userId: user.id,
                businessName: contractorData.businessName,
                dbaName: contractorData.dbaName,
                description: `Licensed ${contractorData.licenseClass} contractor in ${contractorData.city}, Arizona. ROC License #${contractorData.rocLicenseNumber}.`,
                specialties: JSON.stringify(contractorData.specialties),
                serviceArea: JSON.stringify([`${contractorData.city}, AZ`]),
                address: contractorData.address,
                city: contractorData.city,
                state: contractorData.state,
                zipCode: contractorData.zipCode,
                phone: null, // Will be added when they sign up
                website: null,

                // ROC License Information
                rocLicenseNumber: contractorData.rocLicenseNumber,
                licenseClass: contractorData.licenseClass,
                licenseType: contractorData.licenseType,
                licenseStatus: contractorData.licenseStatus,
                licenseIssued: contractorData.licenseIssued,
                licenseExpiration: contractorData.licenseExpiration,
                qualifyingParty: contractorData.qualifyingParty,

                // Verification Status
                isVerified: true, // ROC license = verified
                verified: true,
                isROCVerified: true,
                rocVerifiedDate: new Date(),

                // Profile Completion
                profileComplete: false, // Still need contact info, photos, etc.

                // Business Information
                yearsInBusiness: contractorData.estimatedYearsInBusiness,
                yearsExperience: contractorData.estimatedYearsInBusiness,

                // Default ratings (will be updated with real reviews)
                rating: 4.0,
                reviewCount: 0,

                // Import metadata
                scrapedFrom: 'arizona_roc_import',
                lastScraped: contractorData.rocImportDate,
                rocImportDate: contractorData.rocImportDate
            }
        })
    }

    async updateExistingContractor(contractorId, rocData) {
        await prisma.contractor.update({
            where: { id: contractorId },
            data: {
                rocLicenseNumber: rocData.rocLicenseNumber,
                licenseClass: rocData.licenseClass,
                licenseType: rocData.licenseType,
                licenseStatus: rocData.licenseStatus,
                licenseIssued: rocData.licenseIssued,
                licenseExpiration: rocData.licenseExpiration,
                qualifyingParty: rocData.qualifyingParty,
                isROCVerified: true,
                rocVerifiedDate: new Date(),
                isVerified: true,
                verified: true,
                rocImportDate: rocData.rocImportDate,

                // Update years in business if ROC data is older
                yearsInBusiness: Math.max(rocData.estimatedYearsInBusiness, 1),

                // Merge specialties if not already present
                specialties: JSON.stringify([
                    ...new Set([
                        ...JSON.parse(await this.getExistingSpecialties(contractorId) || '[]'),
                        ...rocData.specialties
                    ])
                ])
            }
        })
    }

    async getExistingSpecialties(contractorId) {
        const contractor = await prisma.contractor.findUnique({
            where: { id: contractorId },
            select: { specialties: true }
        })
        return contractor?.specialties || '[]'
    }

    generateContractorEmail(businessName, licenseNumber) {
        const cleanBusinessName = businessName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
            .substring(0, 20)

        return `${cleanBusinessName}.roc${licenseNumber}@placeholder.remodely.ai`
    }

    getSummary() {
        return {
            processed: this.processedCount,
            successful: this.successCount,
            duplicates: this.duplicateCount,
            errors: this.errorCount,
            successRate: ((this.successCount / this.processedCount) * 100).toFixed(2) + '%'
        }
    }
}

// Enhanced Contractor Verification System
class ContractorVerificationSystem {
    static async verifyROCLicense(licenseNumber) {
        // This would integrate with ROC API for real-time verification
        // For now, we'll check our imported database
        const contractor = await prisma.contractor.findFirst({
            where: { rocLicenseNumber: licenseNumber }
        })

        return {
            valid: !!contractor,
            status: contractor?.licenseStatus || 'Not Found',
            expiration: contractor?.licenseExpiration,
            businessName: contractor?.businessName
        }
    }

    static async getContractorByROC(licenseNumber) {
        return await prisma.contractor.findFirst({
            where: { rocLicenseNumber: licenseNumber },
            include: {
                user: {
                    select: { email: true, emailVerified: true }
                }
            }
        })
    }

    static async facilitateROCContractorSignup(licenseNumber, contactInfo) {
        const contractor = await this.getContractorByROC(licenseNumber)

        if (!contractor) {
            throw new Error('ROC License not found in our database')
        }

        // Update contractor with contact information
        await prisma.contractor.update({
            where: { id: contractor.id },
            data: {
                phone: contactInfo.phone,
                website: contactInfo.website,
                profileComplete: true
            }
        })

        // Update user email if provided
        if (contactInfo.email && contactInfo.email !== contractor.user.email) {
            await prisma.user.update({
                where: { id: contractor.userId },
                data: {
                    email: contactInfo.email,
                    emailVerified: null // Require re-verification with new email
                }
            })
        }

        return {
            message: 'ROC contractor profile updated successfully',
            contractorId: contractor.id,
            requiresEmailVerification: !contractor.user.emailVerified || !!contactInfo.email
        }
    }
}

// Main execution function
async function importROCDatabase() {
    const importer = new ROCContractorImporter()

    try {
        const csvPath = '/Users/homepc/Downloads/ROC_Posting-List_2025-08-01.csv'
        const results = await importer.importROCContractors(csvPath)

        console.log('\n🎉 ROC Import Complete!')
        console.log('================================')
        console.log(`📊 Total Processed: ${results.processed}`)
        console.log(`✅ Successfully Imported: ${results.successful}`)
        console.log(`🔄 Updated Existing: ${results.duplicates}`)
        console.log(`❌ Errors: ${results.errors}`)
        console.log(`📈 Success Rate: ${results.successRate}`)

        // Generate final stats
        const totalContractors = await prisma.contractor.count()
        const rocVerified = await prisma.contractor.count({
            where: { isROCVerified: true }
        })

        console.log('\n📈 Database Summary:')
        console.log(`👥 Total Contractors: ${totalContractors}`)
        console.log(`✅ ROC Verified: ${rocVerified}`)
        console.log(`📍 Coverage: Arizona Statewide`)

    } catch (error) {
        console.error('❌ Import failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    ROCContractorImporter,
    ContractorVerificationSystem,
    importROCDatabase
}

// Run import if called directly
if (require.main === module) {
    importROCDatabase()
}
