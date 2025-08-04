#!/usr/bin/env node

const { ROCLiveImporter } = require('./roc-live-importer')

/**
 * Test the ROC Live Importer with a limited number of records
 */
class ROCTestImporter extends ROCLiveImporter {
    constructor(maxRecords = 10) {
        super()
        this.maxRecords = maxRecords
        this.testMode = true
    }

    async parseCSVData() {
        return new Promise((resolve, reject) => {
            console.log(`📊 Parsing CSV data (TEST MODE - max ${this.maxRecords} records)...`)

            const contractors = []
            let lineCount = 0
            let headerFound = false

            const fs = require('fs')
            const csv = require('csv-parser')

            fs.createReadStream(this.tempFile)
                .pipe(csv())
                .on('data', (row) => {
                    lineCount++

                    // Skip the metadata row (first line)
                    if (lineCount === 1 && row['Current Active Contractor Licenses - File created: Aug 01, 2025 - 55311 Records']) {
                        return
                    }

                    // Find the header row (starts with '#')
                    if (!headerFound && row['#'] === '#') {
                        headerFound = true
                        console.log('📋 Found header row, processing data...')
                        return
                    }

                    // Process contractor records after header is found
                    if (headerFound && row['#'] && row['License No'] && row['Business Name']) {
                        if (this.processedCount >= this.maxRecords) {
                            return // Stop processing after max records
                        }

                        try {
                            const contractor = this.parseROCRecord(row)
                            if (contractor) {
                                contractors.push(contractor)
                                this.processedCount++
                                console.log(`  ✅ Record ${this.processedCount}: ${contractor.businessName} (${contractor.rocLicenseNumber})`)
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
}

async function testROCImport() {
    const testImporter = new ROCTestImporter(5) // Test with 5 records

    try {
        console.log('🧪 Starting ROC Test Import...')
        const summary = await testImporter.importLatestROCData()

        console.log('\n🎉 Test Complete!')
        console.log('='.repeat(50))
        console.log(`📊 Total Processed: ${summary.totalProcessed}`)
        console.log(`🆕 New Contractors: ${summary.newContractors}`)
        console.log(`📝 Updated Contractors: ${summary.updatedContractors}`)
        console.log(`❌ Errors: ${summary.errors}`)
        console.log('='.repeat(50))

        process.exit(0)
    } catch (error) {
        console.error('💥 Test failed:', error)
        process.exit(1)
    }
}

if (require.main === module) {
    testROCImport()
}
