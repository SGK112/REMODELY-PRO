#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔄 Preparing schema for production deployment...')

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma')
const schemaContent = fs.readFileSync(schemaPath, 'utf-8')

// Replace SQLite with PostgreSQL for production
const productionSchema = schemaContent.replace(
  /provider = "sqlite"/g,
  'provider = "postgresql"'
)

fs.writeFileSync(schemaPath, productionSchema)

console.log('✅ Schema updated for PostgreSQL production deployment')
console.log('🔧 Regenerating Prisma client...')

const { execSync } = require('child_process')
execSync('npx prisma generate', { stdio: 'inherit' })

console.log('🎉 Production schema preparation complete!')
