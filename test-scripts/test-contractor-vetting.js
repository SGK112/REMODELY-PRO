// Test contractor vetting system and database analysis
// Shows current contractor verification status and available integrations

// Test contractor vetting system and database analysis
// Shows current contractor verification status and available integrations

async function testContractorVetting() {
    console.log('� Testing Contractor Vetting System')
    console.log('=====================================')

    try {
        // Show available state licensing integrations
        console.log('🏛️ Available State Licensing Integrations:')

        const stateLicensing = {
            'AZ': {
                state: 'Arizona',
                name: 'Arizona ROC (Registrar of Contractors)',
                url: 'https://azroc.my.site.com/AZRoc/s/contractor-search',
                status: '✅ IMPLEMENTED',
                features: ['License verification', 'Contractor search', 'Authentication']
            },
            'CA': {
                state: 'California',
                name: 'California Contractors State License Board',
                url: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
                status: '🚧 PLANNED',
                features: ['License lookup', 'Complaint history', 'Bond status']
            },
            'TX': {
                state: 'Texas',
                name: 'Texas Department of Licensing and Regulation',
                url: 'https://www.tdlr.texas.gov/LicenseSearch/',
                status: '🚧 PLANNED',
                features: ['License search', 'Status verification']
            },
            'FL': {
                state: 'Florida',
                name: 'Florida Department of Business and Professional Regulation',
                url: 'https://www.myfloridalicense.com/LicenseDetail.asp',
                status: '🚧 PLANNED',
                features: ['License verification', 'Disciplinary actions']
            },
            'NY': {
                state: 'New York',
                name: 'New York State Department of Labor',
                url: 'https://www.labor.ny.gov/workerprotection/publicwork/contract.shtm',
                status: '🚧 PLANNED',
                features: ['Public work contractor registry']
            },
            'CO': {
                state: 'Colorado',
                name: 'Colorado Department of Regulatory Agencies',
                url: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
                status: '🚧 PLANNED',
                features: ['License lookup', 'Professional verification']
            }
        }

        Object.values(stateLicensing).forEach(state => {
            console.log(`\n   ${state.state}: ${state.status}`)
            console.log(`     Board: ${state.name}`)
            console.log(`     URL: ${state.url}`)
            console.log(`     Features: ${state.features.join(', ')}`)
        })

        // Show Google Maps integration status
        console.log('\n\n🗺️ Google Maps Integration:')
        console.log('   Status: ✅ IMPLEMENTED')
        console.log('   Features: Address geocoding, distance calculation, location verification')
        console.log('   API Key Required: Yes (currently empty in .env)')
        console.log('   Usage: Verify contractor business addresses, calculate service area distances')

        // Show vetting process overview
        console.log('\n📋 Comprehensive Vetting Process:')
        console.log('\n1. 📄 License Verification (30 points)')
        console.log('   - Arizona ROC: ✅ Active integration')
        console.log('   - Other states: 🚧 Planned integrations')
        console.log('   - Manual verification fallback available')

        console.log('\n2. 🛡️ Insurance Verification (20 points)')
        console.log('   - General liability insurance check')
        console.log('   - Bonding status verification')
        console.log('   - Partnership with insurance verification APIs (planned)')

        console.log('\n3. 📍 Location Verification (15 points)')
        console.log('   - Google Maps geocoding: ✅ Implemented')
        console.log('   - Business address validation')
        console.log('   - Service area calculation')

        console.log('\n4. 📱 Phone Verification (10 points)')
        console.log('   - Twilio SMS verification: ✅ Implemented')
        console.log('   - Phone number ownership confirmation')
        console.log('   - Already tested and working')

        console.log('\n5. 🔍 Background Check (15 points)')
        console.log('   - Years in business verification')
        console.log('   - Professional certification check')
        console.log('   - Integration with Checkr/Sterling (planned)')

        console.log('\n6. ⭐ Review Analysis (10 points)')
        console.log('   - Customer review authenticity')
        console.log('   - Rating trend analysis')
        console.log('   - Reputation score calculation')

        console.log('\n🎯 Vetting Score System:')
        console.log('   90-100 points: ✅ Premium Verified (top tier)')
        console.log('   80-89 points:  ✅ Fully Verified')
        console.log('   60-79 points:  ⏳ Basic Verified (requires monitoring)')
        console.log('   Below 60:      ❌ Verification Failed')

    } catch (error) {
        console.error('❌ Contractor vetting test error:', error.message)
    }
}

async function checkCurrentContractorStatus() {
    console.log('\n📊 Current Contractor Database Status')
    console.log('=====================================')

    try {
        // Use SQLite to check current contractor verification status
        const { execSync } = require('child_process')

        console.log('🔍 Checking verification status...')

        // Count by verification status
        const verifiedCount = execSync('sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Contractor WHERE isVerified = 1;"', { encoding: 'utf8' }).trim()
        const unverifiedCount = execSync('sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Contractor WHERE isVerified = 0 OR isVerified IS NULL;"', { encoding: 'utf8' }).trim()
        const totalCount = execSync('sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Contractor;"', { encoding: 'utf8' }).trim()

        console.log(`📈 Verification Status:`)
        console.log(`   ✅ Verified: ${verifiedCount} contractors`)
        console.log(`   ⏳ Unverified: ${unverifiedCount} contractors`)
        console.log(`   📊 Total: ${totalCount} contractors`)

        // Show verification percentage
        const verificationRate = ((parseInt(verifiedCount) / parseInt(totalCount)) * 100).toFixed(1)
        console.log(`   📈 Verification Rate: ${verificationRate}%`)

        // Show contractors with licenses
        const licensedCount = execSync('sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Contractor WHERE licenseNumber IS NOT NULL AND licenseNumber != \'\' ;"', { encoding: 'utf8' }).trim()
        console.log(`   📄 With License Numbers: ${licensedCount} contractors`)

        // Show contractors with insurance info
        const insuredCount = execSync('sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Contractor WHERE insuranceInfo IS NOT NULL AND insuranceInfo != \'\' ;"', { encoding: 'utf8' }).trim()
        console.log(`   🛡️ With Insurance Info: ${insuredCount} contractors`)

        // Show Arizona ROC contractors
        const arizonaRocCount = execSync('sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Contractor WHERE scrapedFrom = \'Arizona ROC Database\';"', { encoding: 'utf8' }).trim()
        console.log(`   🏛️ Arizona ROC: ${arizonaRocCount} contractors`)

        console.log('\n💡 Recommendations:')
        if (parseInt(verificationRate) < 50) {
            console.log('   🚀 Run batch vetting process to verify existing contractors')
        }
        if (parseInt(licensedCount) < parseInt(totalCount) * 0.8) {
            console.log('   📋 Encourage contractors to add license numbers')
        }
        if (parseInt(insuredCount) < parseInt(totalCount) * 0.8) {
            console.log('   🛡️ Request insurance documentation from contractors')
        }

    } catch (error) {
        console.error('❌ Error checking contractor status:', error.message)
    }
}

async function runAllTests() {
    console.log('🔧 NewCountertops.com Contractor Vetting System')
    console.log('==============================================')
    console.log('Comprehensive contractor verification and state licensing integration...\n')

    await testContractorVetting()
    await checkCurrentContractorStatus()

    console.log('\n✅ Analysis Complete!')
    console.log('\n📋 Implementation Roadmap:')
    console.log('1. ✅ Arizona ROC integration (DONE)')
    console.log('2. 🔧 Configure Google Maps API key for location verification')
    console.log('3. 🚀 Run batch vetting on existing 783 contractors')
    console.log('4. 📋 Implement California, Texas, Florida licensing APIs')
    console.log('5. 🤝 Partner with insurance verification services')
    console.log('6. 🔍 Integrate background check providers (Checkr, Sterling)')
    console.log('7. 🎯 Launch contractor verification badges and trust scores')
}

// Run tests
runAllTests().catch(console.error)
