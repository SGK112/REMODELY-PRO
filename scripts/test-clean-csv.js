#!/usr/bin/env node

const fs = require('fs')
const csv = require('csv-parser')

console.log('🔍 Testing clean CSV parsing...')

let recordCount = 0

fs.createReadStream('test_roc_clean.csv')
    .pipe(csv())
    .on('data', (row) => {
        recordCount++

        if (recordCount <= 5) {
            console.log(`\nRecord ${recordCount}:`)
            console.log('Keys:', Object.keys(row))
            console.log('#:', row['#'])
            console.log('License No:', row['License No'])
            console.log('Business Name:', row['Business Name'])
            console.log('City:', row['City'])
        }
    })
    .on('end', () => {
        console.log(`\n✅ Total records processed: ${recordCount}`)
    })
    .on('error', (error) => {
        console.error('❌ Error:', error)
    })
