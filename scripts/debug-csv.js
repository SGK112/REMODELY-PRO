#!/usr/bin/env node

const fs = require('fs')
const csv = require('csv-parser')

console.log('🔍 Debug CSV Parser...')

let lineCount = 0
const csvFile = 'temp_debug.csv'

fs.createReadStream(csvFile)
    .pipe(csv())
    .on('data', (row) => {
        lineCount++

        if (lineCount <= 10) {
            console.log(`\nLine ${lineCount}:`)
            console.log('Row keys:', Object.keys(row))
            console.log('Row data:', row)

            // Check for specific fields
            if (row['#']) console.log(`  # field: "${row['#']}"`)
            if (row['License No']) console.log(`  License No: "${row['License No']}"`)
            if (row['Business Name']) console.log(`  Business Name: "${row['Business Name']}"`)
        }
    })
    .on('end', () => {
        console.log(`\n✅ Total lines processed: ${lineCount}`)
    })
    .on('error', (error) => {
        console.error('❌ Error:', error)
    })
