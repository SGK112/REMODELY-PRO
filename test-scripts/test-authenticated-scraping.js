#!/usr/bin/env node

/**
 * Test script for authenticated contractor scraping
 * This script verifies that the authenticated scraping system works correctly
 */

const { ContractorScraper } = require('./lib/scraper')

async function testAuthenticatedScraping() {
    console.log('🔐 Testing Authenticated Contractor Scraping System')
    console.log('='.repeat(60))

    const scraper = new ContractorScraper()

    try {
        // Test 1: Check environment variables
        console.log('\n📋 Test 1: Environment Variables')
        const angiEmail = process.env.ANGI_CONTRACTOR_EMAIL
        const angiPassword = process.env.ANGI_CONTRACTOR_PASSWORD
        const homeAdvisorEmail = process.env.HOMEADVISOR_CONTRACTOR_EMAIL
        const homeAdvisorPassword = process.env.HOMEADVISOR_CONTRACTOR_PASSWORD

        console.log(`Angi Email: ${angiEmail ? '✅ Set' : '❌ Missing'}`)
        console.log(`Angi Password: ${angiPassword ? '✅ Set' : '❌ Missing'}`)
        console.log(`HomeAdvisor Email: ${homeAdvisorEmail ? '✅ Set' : '❌ Missing'}`)
        console.log(`HomeAdvisor Password: ${homeAdvisorPassword ? '✅ Set' : '❌ Missing'}`)

        if (!angiEmail || !angiPassword || !homeAdvisorEmail || !homeAdvisorPassword) {
            console.log('\n⚠️  Environment variables not set. Please add credentials to .env.local:')
            console.log('ANGI_CONTRACTOR_EMAIL=your-email@example.com')
            console.log('ANGI_CONTRACTOR_PASSWORD=your-password')
            console.log('HOMEADVISOR_CONTRACTOR_EMAIL=your-email@example.com')
            console.log('HOMEADVISOR_CONTRACTOR_PASSWORD=your-password')
            console.log('\n🚫 Skipping authenticated scraping test')
            return
        }

        // Test 2: Authenticated scraping
        console.log('\n📋 Test 2: Authenticated Scraping')
        console.log('Starting authenticated scraping for "Los Angeles, CA"...')

        const startTime = Date.now()
        const contractors = await scraper.scrapeAuthenticatedSources('Los Angeles, CA')
        const endTime = Date.now()

        console.log(`\n✅ Authenticated scraping completed in ${(endTime - startTime) / 1000}s`)
        console.log(`📊 Found ${contractors.length} contractors`)

        // Test 3: Data quality analysis
        console.log('\n📋 Test 3: Data Quality Analysis')

        const contractorsWithPhone = contractors.filter(c => c.phone).length
        const contractorsWithAddress = contractors.filter(c => c.address).length
        const contractorsWithSpecialties = contractors.filter(c => c.specialties?.length > 0).length

        console.log(`Contractors with phone: ${contractorsWithPhone}/${contractors.length} (${Math.round(contractorsWithPhone / contractors.length * 100)}%)`)
        console.log(`Contractors with address: ${contractorsWithAddress}/${contractors.length} (${Math.round(contractorsWithAddress / contractors.length * 100)}%)`)
        console.log(`Contractors with specialties: ${contractorsWithSpecialties}/${contractors.length} (${Math.round(contractorsWithSpecialties / contractors.length * 100)}%)`)

        // Test 4: Sample data display
        console.log('\n📋 Test 4: Sample Contractor Data')
        console.log('-'.repeat(40))

        contractors.slice(0, 3).forEach((contractor, index) => {
            console.log(`\n${index + 1}. ${contractor.businessName}`)
            console.log(`   Phone: ${contractor.phone || 'N/A'}`)
            console.log(`   Address: ${contractor.address || 'N/A'}`)
            console.log(`   City: ${contractor.city || 'N/A'}`)
            console.log(`   Specialties: ${contractor.specialties?.join(', ') || 'N/A'}`)
            console.log(`   Certifications: ${contractor.certifications?.join(', ') || 'N/A'}`)
        })

        // Test 5: Database saving (optional)
        console.log('\n📋 Test 5: Database Integration')
        if (contractors.length > 0) {
            console.log('Saving contractors to database...')
            await scraper.saveContractorsToDatabase(contractors)
            console.log('✅ Contractors saved to database')
        } else {
            console.log('❌ No contractors to save')
        }

        console.log('\n' + '='.repeat(60))
        console.log('🎉 Authenticated scraping test completed successfully!')
        console.log(`📊 Total contractors found: ${contractors.length}`)
        console.log('💡 This data is more reliable than public scraping because it uses authenticated access')

    } catch (error) {
        console.error('\n❌ Test failed:', error)
        console.error('\nDebugging tips:')
        console.error('1. Check that credentials are correct in .env.local')
        console.error('2. Verify that contractor accounts are active')
        console.error('3. Check network connection')
        console.error('4. Look for CAPTCHA or security challenges')
    } finally {
        await scraper.close()
    }
}

// Run the test
if (require.main === module) {
    testAuthenticatedScraping()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Fatal error:', error)
            process.exit(1)
        })
}

module.exports = { testAuthenticatedScraping }
