#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const https = require('https')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

const prisma = new PrismaClient()

/**
 * AZ ROC Live Contractor Importer
 * Fetches the latest contractor data from AZ ROC Google Sheets CSV
 * Cross-references with existing contractors and imports new ones
 */
class ROCLiveImporter {
    constructor() {
        this.processedCount = 0
        this.newCount = 0
        this.updatedCount = 0
        this.errorCount = 0
        this.duplicateCount = 0
        this.csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSPqGXyj4nvfsraRcKMZiOB0YGHgXpESAlhVYQjRdyNeDSTnCqQkvnm3FRhG36KiT-2rmZR6wORI9_B/pub?output=csv'
        this.tempFile = path.join(__dirname, 'temp_roc_data.csv')
    }

    async importLatestROCData() {
        console.log('🏗️  AZ ROC Live Contractor Import Starting...')
        console.log('📡 Fetching latest data from AZ ROC...')

        try {
            // Download the CSV data
            await this.downloadCSV()

            // Process the CSV data
            const contractors = await this.parseCSVData()

            // Import to database
            await this.processContractors(contractors)

            // Cleanup
            this.cleanup()

            return this.getSummary()
        } catch (error) {
            console.error('❌ Import failed:', error)
            this.cleanup()
            throw error
        }
    }

    async downloadCSV() {
        return new Promise((resolve, reject) => {
            console.log('📥 Downloading CSV data...')

            const file = fs.createWriteStream(this.tempFile)

            https.get(this.csvUrl, (response) => {
                // Follow redirects
                if (response.statusCode === 302 || response.statusCode === 301) {
                    https.get(response.headers.location, (redirectResponse) => {
                        redirectResponse.pipe(file)

                        file.on('finish', () => {
                            file.close()
                            console.log('✅ CSV download complete')
                            this.preprocessCSV().then(resolve).catch(reject)
                        })
                    }).on('error', reject)
                } else {
                    response.pipe(file)

                    file.on('finish', () => {
                        file.close()
                        console.log('✅ CSV download complete')
                        this.preprocessCSV().then(resolve).catch(reject)
                    })
                }
            }).on('error', reject)
        })
    }

    async preprocessCSV() {
        console.log('🔧 Preprocessing CSV (removing metadata row)...')

        const originalFile = this.tempFile
        const processedFile = this.tempFile + '.processed'

        return new Promise((resolve, reject) => {
            const readline = require('readline')
            const fileStream = fs.createReadStream(originalFile)
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            })

            const writeStream = fs.createWriteStream(processedFile)
            let lineNumber = 0

            rl.on('line', (line) => {
                lineNumber++

                // Skip the first line (metadata)
                if (lineNumber > 1) {
                    writeStream.write(line + '\n')
                }
            })

            rl.on('close', () => {
                writeStream.end()

                // Replace the original file with the processed one
                fs.renameSync(processedFile, originalFile)
                console.log('✅ CSV preprocessing complete')
                resolve()
            })

            rl.on('error', reject)
        })
    }

    async parseCSVData() {
        return new Promise((resolve, reject) => {
            console.log('📊 Parsing CSV data...')

            const contractors = []

            fs.createReadStream(this.tempFile)
                .pipe(csv())
                .on('data', (row) => {
                    // Process contractor records (header row should now be proper)
                    if (row['#'] && row['License No'] && row['Business Name']) {
                        try {
                            const contractor = this.parseROCRecord(row)
                            if (contractor) {
                                contractors.push(contractor)
                                this.processedCount++

                                if (this.processedCount % 5000 === 0) {
                                    console.log(`📈 Processed ${this.processedCount} records...`)
                                }

                                // Debug: show first few records
                                if (this.processedCount <= 3) {
                                    console.log(`  ✅ Record ${this.processedCount}: ${contractor.businessName} (${contractor.rocLicenseNumber})`)
                                }
                            }
                        } catch (error) {
                            console.error(`⚠️  Error parsing record ${row['#']}:`, error.message)
                            this.errorCount++
                        }
                    }
                })
                .on('end', () => {
                    console.log(`✅ Parsing complete: ${this.processedCount} valid records found`)
                    resolve(contractors)
                })
                .on('error', reject)
        })
    }

    parseROCRecord(row) {
        const licenseNo = row['License No']?.trim()
        const businessName = row['Business Name']?.trim()

        if (!licenseNo || !businessName) {
            return null
        }

        // Parse license classification
        const licenseData = this.parseLicenseClass(row['Class'], row['Class Detail'])

        // Clean and format address
        const address = this.cleanAddress(row['Address'])
        const city = row['City']?.trim() || ''
        const state = row['State']?.trim() || 'AZ'
        const zipCode = this.cleanZipCode(row['Zip'])

        // Parse dates
        const issuedDate = this.parseDate(row['Issued Date'])
        const expirationDate = this.parseDate(row['Expiration Date'])

        return {
            rocLicenseNumber: licenseNo,
            businessName: businessName,
            dbaName: row['Doing Business As']?.trim() || null,
            displayName: row['Doing Business As']?.trim() || businessName,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
            licenseClass: row['Class']?.trim(),
            licenseClassDetail: row['Class Detail']?.trim(),
            licenseType: row['Class Type']?.trim(),
            specialties: licenseData.specialties,
            serviceCategories: licenseData.categories,
            qualifyingParty: row['Qualifying Party']?.trim(),
            licenseIssued: issuedDate,
            licenseExpiration: expirationDate,
            licenseStatus: row['Status']?.trim() || 'Active',
            isROCVerified: true,
            rocImportDate: new Date(),
            yearsInBusiness: this.calculateYearsInBusiness(issuedDate),
            phone: null, // Will be populated from cross-reference
            email: null, // Will be populated from cross-reference
            website: null // Will be populated from cross-reference
        }
    }

    parseLicenseClass(classCode, classDetail) {
        const specialties = []
        const categories = []

        // Enhanced ROC license class mapping
        const classMapping = {
            // General Contractors
            'B': { specialties: ['General Contracting', 'Home Building'], categories: ['General Contractor'] },
            'B-1': { specialties: ['Commercial Construction'], categories: ['Commercial Contractor'] },
            'B-2': { specialties: ['Residential Construction'], categories: ['Residential Contractor'] },
            'B-3': { specialties: ['Commercial Construction'], categories: ['Commercial Contractor'] },
            'B-4': { specialties: ['Engineering Construction'], categories: ['Engineering'] },

            // Electrical
            'R-11': { specialties: ['Residential Electrical'], categories: ['Electrical'] },
            'C-11': { specialties: ['Commercial Electrical'], categories: ['Electrical'] },
            'CR-11': { specialties: ['Electrical Installation'], categories: ['Electrical'] },

            // Plumbing
            'R-37R': { specialties: ['Residential Plumbing'], categories: ['Plumbing'] },
            'C-37': { specialties: ['Commercial Plumbing'], categories: ['Plumbing'] },
            'CR-37': { specialties: ['Plumbing Installation'], categories: ['Plumbing'] },

            // HVAC
            'R-39R': { specialties: ['Residential HVAC', 'Air Conditioning', 'Heating'], categories: ['HVAC'] },
            'C-39': { specialties: ['Commercial HVAC'], categories: ['HVAC'] },
            'CR-39': { specialties: ['HVAC Installation'], categories: ['HVAC'] },

            // Roofing
            'CR-42': { specialties: ['Roofing', 'Roof Installation', 'Roof Repair'], categories: ['Roofing'] },
            'C-42': { specialties: ['Commercial Roofing'], categories: ['Roofing'] },

            // Specialty Contractors
            'CR-3': { specialties: ['Awnings', 'Patio Covers', 'Carports'], categories: ['Outdoor Living'] },
            'CR-14': { specialties: ['Fencing', 'Gate Installation'], categories: ['Fencing'] },
            'CR-21': { specialties: ['Landscaping', 'Irrigation'], categories: ['Landscaping'] },
            'CR-38': { specialties: ['Swimming Pool Construction'], categories: ['Pool & Spa'] },
            'CR-23': { specialties: ['Masonry', 'Stonework'], categories: ['Masonry'] },
            'CR-32': { specialties: ['Parking Lot Construction'], categories: ['Concrete & Paving'] },
            'CR-6': { specialties: ['Cabinet Installation'], categories: ['Kitchen & Bath'] },
            'CR-7': { specialties: ['Ceramic Tile Installation'], categories: ['Flooring'] },
            'CR-12': { specialties: ['Drywall Installation'], categories: ['Interior'] },
            'CR-35': { specialties: ['Lathing and Plastering'], categories: ['Interior'] },
            'CR-33': { specialties: ['Painting and Decorating'], categories: ['Painting'] },
            'CR-9': { specialties: ['Concrete Construction'], categories: ['Concrete & Masonry'] },
            'CR-10': { specialties: ['Steel Construction'], categories: ['Structural'] },
            'CR-25': { specialties: ['Insulation Installation'], categories: ['Insulation'] },
            'CR-29': { specialties: ['Manufactured Building Installation'], categories: ['Specialty'] }
        }

        // Get base mapping
        const mapping = classMapping[classCode] || {
            specialties: ['General Construction Services'],
            categories: ['Other']
        }

        specialties.push(...mapping.specialties)
        categories.push(...mapping.categories)

        // Enhanced detail parsing
        if (classDetail) {
            const detail = classDetail.toLowerCase()

            // Kitchen & Bath
            if (detail.includes('kitchen') || detail.includes('cabinet')) {
                specialties.push('Kitchen Renovation', 'Cabinet Installation')
                categories.push('Kitchen & Bath')
            }
            if (detail.includes('bathroom') || detail.includes('bath')) {
                specialties.push('Bathroom Renovation')
                categories.push('Kitchen & Bath')
            }

            // Flooring
            if (detail.includes('flooring') || detail.includes('floor')) {
                specialties.push('Flooring Installation')
                categories.push('Flooring')
            }
            if (detail.includes('tile') || detail.includes('ceramic')) {
                specialties.push('Tile Installation')
                categories.push('Flooring')
            }
            if (detail.includes('carpet')) {
                specialties.push('Carpet Installation')
                categories.push('Flooring')
            }

            // Concrete & Masonry
            if (detail.includes('concrete')) {
                specialties.push('Concrete Work')
                categories.push('Concrete & Masonry')
            }
            if (detail.includes('masonry') || detail.includes('brick') || detail.includes('stone')) {
                specialties.push('Masonry Work')
                categories.push('Concrete & Masonry')
            }

            // Painting & Finishes
            if (detail.includes('painting') || detail.includes('paint')) {
                specialties.push('Interior Painting', 'Exterior Painting')
                categories.push('Painting')
            }

            // Windows & Doors
            if (detail.includes('window') || detail.includes('door')) {
                specialties.push('Window Installation', 'Door Installation')
                categories.push('Windows & Doors')
            }

            // Solar & Energy
            if (detail.includes('solar') || detail.includes('photovoltaic')) {
                specialties.push('Solar Installation')
                categories.push('Solar & Energy')
            }
        }

        return {
            specialties: [...new Set(specialties)],
            categories: [...new Set(categories)]
        }
    }

    async processContractors(contractors) {
        console.log('💾 Processing contractors for database import...')

        const batchSize = 100
        const totalBatches = Math.ceil(contractors.length / batchSize)

        for (let i = 0; i < totalBatches; i++) {
            const batch = contractors.slice(i * batchSize, (i + 1) * batchSize)
            await this.processBatch(batch)

            if ((i + 1) % 10 === 0) {
                console.log(`📈 Processed ${i + 1}/${totalBatches} batches`)
            }
        }
    }

    async processBatch(contractors) {
        for (const contractorData of contractors) {
            try {
                // Check if contractor already exists
                const existing = await prisma.contractor.findFirst({
                    where: {
                        OR: [
                            { rocLicenseNumber: contractorData.rocLicenseNumber },
                            {
                                AND: [
                                    { businessName: contractorData.businessName },
                                    { city: contractorData.city }
                                ]
                            }
                        ]
                    }
                })

                if (existing) {
                    // Update existing contractor with latest ROC data
                    await this.updateExistingContractor(existing.id, contractorData)
                    this.updatedCount++
                } else {
                    // Create new contractor
                    await this.createNewContractor(contractorData)
                    this.newCount++
                }
            } catch (error) {
                console.error(`⚠️  Error processing contractor ${contractorData.businessName}:`, error.message)
                this.errorCount++
            }
        }
    }

    async updateExistingContractor(contractorId, rocData) {
        await prisma.contractor.update({
            where: { id: contractorId },
            data: {
                rocLicenseNumber: rocData.rocLicenseNumber,
                licenseClass: rocData.licenseClass,
                licenseType: rocData.licenseType,
                licenseStatus: rocData.licenseStatus,
                licenseExpiration: rocData.licenseExpiration,
                licenseIssued: rocData.licenseIssued,
                isROCVerified: true,
                rocImportDate: new Date(),
                qualifyingParty: rocData.qualifyingParty,
                dbaName: rocData.dbaName,
                // Update specialties if the field exists
                specialties: JSON.stringify(rocData.specialties)
            }
        })
    }

    async createNewContractor(contractorData) {
        // Try to find an existing user with this email
        let user = await prisma.user.findUnique({
            where: {
                email: `roc.${contractorData.rocLicenseNumber}@temp.remodely.ai`
            }
        })

        // Create a basic user account for the contractor if none exists
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: `roc.${contractorData.rocLicenseNumber}@temp.remodely.ai`,
                    name: contractorData.displayName,
                    userType: 'CONTRACTOR',
                    phone: contractorData.phone,
                    isVerified: false
                }
            })
        }

        // Create the contractor profile
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
                rocImportDate: new Date(),
                qualifyingParty: contractorData.qualifyingParty,
                phone: contractorData.phone,
                email: contractorData.email,
                website: contractorData.website
            }
        })
    }

    // Utility methods
    cleanAddress(address) {
        if (!address) return ''
        return address.trim().replace(/\s+/g, ' ')
    }

    cleanZipCode(zip) {
        if (!zip) return ''
        return zip.toString().trim().substring(0, 5)
    }

    parseDate(dateString) {
        if (!dateString) return null
        try {
            return new Date(dateString)
        } catch {
            return null
        }
    }

    calculateYearsInBusiness(issuedDate) {
        if (!issuedDate) return 0
        const issued = new Date(issuedDate)
        const now = new Date()
        return Math.floor((now - issued) / (365.25 * 24 * 60 * 60 * 1000))
    }

    cleanup() {
        try {
            if (fs.existsSync(this.tempFile)) {
                fs.unlinkSync(this.tempFile)
                console.log('🧹 Temporary files cleaned up')
            }
        } catch (error) {
            console.error('⚠️  Cleanup error:', error.message)
        }
    }

    getSummary() {
        return {
            totalProcessed: this.processedCount,
            newContractors: this.newCount,
            updatedContractors: this.updatedCount,
            errors: this.errorCount,
            duplicates: this.duplicateCount
        }
    }
}

// Main execution
async function main() {
    const importer = new ROCLiveImporter()

    try {
        const summary = await importer.importLatestROCData()

        console.log('\n🎉 ROC Import Complete!')
        console.log('='.repeat(50))
        console.log(`📊 Total Processed: ${summary.totalProcessed}`)
        console.log(`🆕 New Contractors: ${summary.newContractors}`)
        console.log(`📝 Updated Contractors: ${summary.updatedContractors}`)
        console.log(`❌ Errors: ${summary.errors}`)
        console.log(`🔄 Duplicates: ${summary.duplicates}`)
        console.log('='.repeat(50))

        process.exit(0)
    } catch (error) {
        console.error('💥 Fatal error:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

// Run if called directly
if (require.main === module) {
    main()
}

module.exports = { ROCLiveImporter }
