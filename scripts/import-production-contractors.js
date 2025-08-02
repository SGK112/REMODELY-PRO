#!/usr/bin/env node

// Import existing contractors from populate-contractors.js to production database
// This script runs the full contractor import for production

const { execSync } = require('child_process')
const path = require('path')

async function importContractorsToProduction() {
    console.log('🚀 Starting production contractor import...')

    try {
        // Run the existing contractor population script
        console.log('📥 Running contractor import script...')
        execSync('node populate-contractors.js', {
            stdio: 'inherit',
            cwd: process.cwd()
        })

        console.log('✅ Production contractor import completed!')
        console.log('🎯 Your REMODELY.AI platform now has all contractor data in production!')

    } catch (error) {
        console.error('❌ Error importing contractors:', error.message)
        throw error
    }
}

if (require.main === module) {
    importContractorsToProduction()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error)
            process.exit(1)
        })
}

module.exports = { importContractorsToProduction }
