#!/usr/bin/env node

/**
 * Fast ROC Data Converter - Multiple Strategy Approach
 * Converts large ROC CSV files to optimized formats for faster processing
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class FastROCConverter {
  constructor() {
    this.batchSize = 1000;
    this.outputDir = path.join(__dirname, '..', 'data');
    this.stats = {
      totalProcessed: 0,
      activeContractors: 0,
      licenseClasses: new Set(),
      cities: new Set(),
      errors: []
    };
  }

  async init() {
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Strategy 1: Convert to JSON Lines (JSONL) - Fastest for Node.js processing
   */
  async convertToJSONL(inputFile, outputFile = 'roc-contractors.jsonl') {
    console.log('🔄 Converting to JSONL format...');
    
    const outputPath = path.join(this.outputDir, outputFile);
    const writeStream = fs.createWriteStream(outputPath);
    
    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let isFirstLine = true;
    let headers = [];

    for await (const line of rl) {
      if (isFirstLine) {
        headers = this.parseCSVLine(line);
        isFirstLine = false;
        continue;
      }

      try {
        const values = this.parseCSVLine(line);
        const contractor = this.mapToContractor(headers, values);
        
        if (contractor && contractor.licenseStatus === 'Active') {
          writeStream.write(JSON.stringify(contractor) + '\n');
          this.stats.activeContractors++;
          this.stats.licenseClasses.add(contractor.licenseClass);
          this.stats.cities.add(contractor.city);
        }
        
        this.stats.totalProcessed++;
        
        if (this.stats.totalProcessed % 1000 === 0) {
          console.log(`📊 Processed ${this.stats.totalProcessed} records...`);
        }
      } catch (error) {
        this.stats.errors.push(`Line ${this.stats.totalProcessed}: ${error.message}`);
      }
    }

    writeStream.end();
    console.log(`✅ JSONL conversion complete: ${outputPath}`);
    return outputPath;
  }

  /**
   * Strategy 2: Convert to SQLite Database - Best for queries and indexing
   */
  async convertToSQLite(inputFile, outputFile = 'roc-contractors.db') {
    console.log('🔄 Converting to SQLite database...');
    
    const Database = require('better-sqlite3');
    const outputPath = path.join(this.outputDir, outputFile);
    
    // Remove existing database
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
    
    const db = new Database(outputPath);
    
    // Create optimized table with indexes
    db.exec(`
      CREATE TABLE contractors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        license_number TEXT UNIQUE,
        business_name TEXT,
        license_class TEXT,
        license_type TEXT,
        license_status TEXT,
        license_issued TEXT,
        license_expiration TEXT,
        qualifying_party TEXT,
        dba_name TEXT,
        address TEXT,
        city TEXT,
        state TEXT DEFAULT 'AZ',
        zip_code TEXT,
        phone TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX idx_license_status ON contractors(license_status);
      CREATE INDEX idx_license_class ON contractors(license_class);
      CREATE INDEX idx_city ON contractors(city);
      CREATE INDEX idx_business_name ON contractors(business_name);
    `);

    const insert = db.prepare(`
      INSERT OR IGNORE INTO contractors (
        license_number, business_name, license_class, license_type,
        license_status, license_issued, license_expiration,
        qualifying_party, dba_name, address, city, zip_code, phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((contractors) => {
      for (const contractor of contractors) {
        insert.run(
          contractor.licenseNumber,
          contractor.businessName,
          contractor.licenseClass,
          contractor.licenseType,
          contractor.licenseStatus,
          contractor.licenseIssued,
          contractor.licenseExpiration,
          contractor.qualifyingParty,
          contractor.dbaName,
          contractor.address,
          contractor.city,
          contractor.zipCode,
          contractor.phone
        );
      }
    });

    // Process file in batches
    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let isFirstLine = true;
    let headers = [];
    let batch = [];

    for await (const line of rl) {
      if (isFirstLine) {
        headers = this.parseCSVLine(line);
        isFirstLine = false;
        continue;
      }

      try {
        const values = this.parseCSVLine(line);
        const contractor = this.mapToContractor(headers, values);
        
        if (contractor) {
          batch.push(contractor);
          
          if (batch.length >= this.batchSize) {
            insertMany(batch);
            batch = [];
            console.log(`📊 Inserted ${this.stats.totalProcessed} records...`);
          }
        }
        
        this.stats.totalProcessed++;
      } catch (error) {
        this.stats.errors.push(`Line ${this.stats.totalProcessed}: ${error.message}`);
      }
    }

    // Insert remaining batch
    if (batch.length > 0) {
      insertMany(batch);
    }

    db.close();
    console.log(`✅ SQLite conversion complete: ${outputPath}`);
    return outputPath;
  }

  /**
   * Strategy 3: Split into smaller JSON files by city/region
   */
  async splitByRegion(inputFile) {
    console.log('🔄 Splitting by region...');
    
    const regionDir = path.join(this.outputDir, 'regions');
    if (!fs.existsSync(regionDir)) {
      fs.mkdirSync(regionDir, { recursive: true });
    }

    const fileStreams = new Map();
    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let isFirstLine = true;
    let headers = [];

    for await (const line of rl) {
      if (isFirstLine) {
        headers = this.parseCSVLine(line);
        isFirstLine = false;
        continue;
      }

      try {
        const values = this.parseCSVLine(line);
        const contractor = this.mapToContractor(headers, values);
        
        if (contractor && contractor.licenseStatus === 'Active') {
          const region = this.getRegion(contractor.city);
          
          if (!fileStreams.has(region)) {
            const regionFile = path.join(regionDir, `${region}.json`);
            fileStreams.set(region, {
              stream: fs.createWriteStream(regionFile),
              contractors: []
            });
            fileStreams.get(region).stream.write('[\n');
          }
          
          const regionData = fileStreams.get(region);
          if (regionData.contractors.length > 0) {
            regionData.stream.write(',\n');
          }
          regionData.stream.write(JSON.stringify(contractor, null, 2));
          regionData.contractors.push(contractor);
        }
        
        this.stats.totalProcessed++;
      } catch (error) {
        this.stats.errors.push(`Line ${this.stats.totalProcessed}: ${error.message}`);
      }
    }

    // Close all region files
    for (const [region, data] of fileStreams) {
      data.stream.write('\n]');
      data.stream.end();
      console.log(`📁 ${region}: ${data.contractors.length} contractors`);
    }

    console.log(`✅ Region splitting complete: ${regionDir}`);
    return regionDir;
  }

  /**
   * Strategy 4: Create Prisma seed file
   */
  async createPrismaSeed(inputFile, outputFile = 'prisma-seed.js') {
    console.log('🔄 Creating Prisma seed file...');
    
    const outputPath = path.join(this.outputDir, outputFile);
    const writeStream = fs.createWriteStream(outputPath);
    
    // Write seed file header
    writeStream.write(`
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ROC contractors...');
  
  const contractors = [
`);

    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let isFirstLine = true;
    let headers = [];
    let contractorCount = 0;

    for await (const line of rl) {
      if (isFirstLine) {
        headers = this.parseCSVLine(line);
        isFirstLine = false;
        continue;
      }

      try {
        const values = this.parseCSVLine(line);
        const contractor = this.mapToContractor(headers, values);
        
        if (contractor && contractor.licenseStatus === 'Active') {
          if (contractorCount > 0) {
            writeStream.write(',\n');
          }
          
          writeStream.write(`    {
      businessName: ${JSON.stringify(contractor.businessName)},
      rocLicenseNumber: ${JSON.stringify(contractor.licenseNumber)},
      licenseClass: ${JSON.stringify(contractor.licenseClass)},
      licenseType: ${JSON.stringify(contractor.licenseType)},
      licenseStatus: ${JSON.stringify(contractor.licenseStatus)},
      qualifyingParty: ${JSON.stringify(contractor.qualifyingParty)},
      dbaName: ${JSON.stringify(contractor.dbaName)},
      address: ${JSON.stringify(contractor.address)},
      city: ${JSON.stringify(contractor.city)},
      state: 'AZ',
      zipCode: ${JSON.stringify(contractor.zipCode)},
      phone: ${JSON.stringify(contractor.phone)},
      serviceArea: JSON.stringify([${JSON.stringify(contractor.city)}]),
      specialties: JSON.stringify([${JSON.stringify(contractor.licenseClass)}]),
      isROCVerified: true,
      rocImportDate: new Date(),
      scrapedFrom: 'Arizona ROC'
    }`);
          
          contractorCount++;
          
          // Limit to reasonable number for seeding
          if (contractorCount >= 5000) {
            break;
          }
        }
        
        this.stats.totalProcessed++;
      } catch (error) {
        this.stats.errors.push(`Line ${this.stats.totalProcessed}: ${error.message}`);
      }
    }

    // Write seed file footer
    writeStream.write(`
  ];

  console.log(\`📊 Creating \${contractors.length} contractors...\`);
  
  for (const contractorData of contractors) {
    await prisma.contractor.upsert({
      where: { rocLicenseNumber: contractorData.rocLicenseNumber },
      update: contractorData,
      create: {
        ...contractorData,
        userId: null, // Will be linked when users register
        verified: true,
        profileComplete: false
      }
    });
  }

  console.log('✅ ROC contractors seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`);

    writeStream.end();
    console.log(`✅ Prisma seed file created: ${outputPath}`);
    return outputPath;
  }

  /**
   * Parse CSV line handling quoted fields
   */
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  /**
   * Map CSV row to contractor object
   */
  mapToContractor(headers, values) {
    const contractor = {};
    
    for (let i = 0; i < headers.length && i < values.length; i++) {
      const header = headers[i].toLowerCase().trim();
      const value = values[i] ? values[i].replace(/"/g, '').trim() : '';
      
      // Map common ROC fields
      switch (header) {
        case 'license number':
        case 'license_number':
          contractor.licenseNumber = value;
          break;
        case 'business name':
        case 'business_name':
          contractor.businessName = value;
          break;
        case 'license class':
        case 'license_class':
          contractor.licenseClass = value;
          break;
        case 'license type':
        case 'license_type':
          contractor.licenseType = value;
          break;
        case 'license status':
        case 'license_status':
          contractor.licenseStatus = value;
          break;
        case 'qualifying party':
        case 'qualifying_party':
          contractor.qualifyingParty = value;
          break;
        case 'dba name':
        case 'dba_name':
          contractor.dbaName = value;
          break;
        case 'address':
          contractor.address = value;
          break;
        case 'city':
          contractor.city = value;
          break;
        case 'zip code':
        case 'zip_code':
          contractor.zipCode = value;
          break;
        case 'phone':
          contractor.phone = value;
          break;
      }
    }
    
    return contractor.licenseNumber ? contractor : null;
  }

  /**
   * Get region from city name
   */
  getRegion(city) {
    if (!city) return 'unknown';
    
    const phoenixMetro = ['phoenix', 'scottsdale', 'tempe', 'mesa', 'chandler', 'glendale', 'peoria', 'surprise', 'avondale', 'goodyear'];
    const tucsonArea = ['tucson', 'oro valley', 'marana', 'sahuarita'];
    const flagstaffArea = ['flagstaff', 'sedona', 'prescott'];
    
    const cityLower = city.toLowerCase();
    
    if (phoenixMetro.some(metro => cityLower.includes(metro))) {
      return 'phoenix-metro';
    } else if (tucsonArea.some(area => cityLower.includes(area))) {
      return 'tucson-area';
    } else if (flagstaffArea.some(area => cityLower.includes(area))) {
      return 'northern-arizona';
    } else {
      return 'other-arizona';
    }
  }

  /**
   * Print conversion statistics
   */
  printStats() {
    console.log('\n📊 Conversion Statistics:');
    console.log(`Total Processed: ${this.stats.totalProcessed.toLocaleString()}`);
    console.log(`Active Contractors: ${this.stats.activeContractors.toLocaleString()}`);
    console.log(`License Classes: ${this.stats.licenseClasses.size}`);
    console.log(`Cities: ${this.stats.cities.size}`);
    
    if (this.stats.errors.length > 0) {
      console.log(`\n❌ Errors: ${this.stats.errors.length}`);
      this.stats.errors.slice(0, 5).forEach(error => console.log(`  - ${error}`));
      if (this.stats.errors.length > 5) {
        console.log(`  ... and ${this.stats.errors.length - 5} more`);
      }
    }
  }
}

// CLI Interface
async function main() {
  const converter = new FastROCConverter();
  await converter.init();
  
  const args = process.argv.slice(2);
  const inputFile = args[0];
  const strategy = args[1] || 'all';
  
  if (!inputFile) {
    console.log(`
🚀 Fast ROC Converter

Usage: node fast-roc-converter.js <input-file> [strategy]

Strategies:
  jsonl     - Convert to JSON Lines (fastest processing)
  sqlite    - Convert to SQLite database (best for queries)
  regions   - Split by geographic regions
  seed      - Create Prisma seed file
  all       - Run all strategies (default)

Examples:
  node fast-roc-converter.js roc-data.csv jsonl
  node fast-roc-converter.js roc-data.csv all
    `);
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  console.log(`🚀 Starting conversion of ${inputFile}`);
  console.log(`📈 Strategy: ${strategy}\n`);

  try {
    const startTime = Date.now();
    
    if (strategy === 'jsonl' || strategy === 'all') {
      await converter.convertToJSONL(inputFile);
    }
    
    if (strategy === 'sqlite' || strategy === 'all') {
      await converter.convertToSQLite(inputFile);
    }
    
    if (strategy === 'regions' || strategy === 'all') {
      await converter.splitByRegion(inputFile);
    }
    
    if (strategy === 'seed' || strategy === 'all') {
      await converter.createPrismaSeed(inputFile);
    }
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    converter.printStats();
    console.log(`\n⚡ Conversion completed in ${duration} seconds`);
    console.log(`📁 Output directory: ${converter.outputDir}`);
    
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = FastROCConverter;
