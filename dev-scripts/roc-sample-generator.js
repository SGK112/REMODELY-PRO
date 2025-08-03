#!/usr/bin/env node

/**
 * ROC Sample Data Generator
 * Creates sample contractor data based on Arizona ROC patterns
 * Use this while waiting for the actual CSV file processing
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ROCSampleGenerator {
  constructor() {
    this.licenseClasses = [
      'A', 'B', 'B-1', 'B-2', 'B-3', 'C-1', 'C-2', 'C-3', 'C-4', 'C-5',
      'C-6', 'C-7', 'C-8', 'C-9', 'C-10', 'C-11', 'C-12', 'C-13', 'C-14',
      'C-15', 'C-16', 'C-17', 'C-20', 'C-21', 'C-22', 'C-23', 'C-27',
      'C-33', 'C-34', 'C-35', 'C-36', 'C-37', 'C-38', 'C-39', 'C-42',
      'C-43', 'C-44', 'C-45', 'C-46', 'C-47', 'C-54', 'C-61', 'C-65',
      'K', 'KB', 'R-1', 'R-2', 'R-3', 'R-4'
    ];

    this.cities = [
      'Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Chandler', 'Glendale',
      'Peoria', 'Surprise', 'Avondale', 'Goodyear', 'Buckeye', 'Tolleson',
      'Tucson', 'Oro Valley', 'Marana', 'Sahuarita', 'Green Valley',
      'Flagstaff', 'Sedona', 'Prescott', 'Prescott Valley', 'Cottonwood',
      'Yuma', 'Lake Havasu City', 'Bullhead City', 'Kingman', 'Page',
      'Show Low', 'Payson', 'Globe', 'Sierra Vista', 'Benson', 'Willcox'
    ];

    this.businessTypes = [
      'General Contracting', 'Residential Building', 'Commercial Building',
      'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Flooring', 'Painting',
      'Landscaping', 'Pool/Spa', 'Concrete', 'Masonry', 'Carpentry',
      'Drywall', 'Insulation', 'Windows/Doors', 'Appliance Installation',
      'Countertops', 'Cabinets', 'Tile/Stone', 'Fencing'
    ];

    this.businessNames = [
      'Contracting', 'Construction', 'Builders', 'Services', 'Solutions',
      'Enterprises', 'Company', 'Corp', 'LLC', 'Inc', 'Group', 'Works',
      'Pro', 'Elite', 'Premier', 'Quality', 'Expert', 'Master', 'Precision'
    ];
  }

  generateLicenseNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = Math.floor(Math.random() * 900000) + 100000;
    return `ROC${numbers}`;
  }

  generateBusinessName() {
    const firstPart = this.businessTypes[Math.floor(Math.random() * this.businessTypes.length)];
    const secondPart = this.businessNames[Math.floor(Math.random() * this.businessNames.length)];
    return `${firstPart} ${secondPart}`;
  }

  generatePhone() {
    const areaCode = Math.random() > 0.7 ? '480' : Math.random() > 0.5 ? '602' : '623';
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${exchange}-${number}`;
  }

  generateAddress(city) {
    const streetNumbers = Math.floor(Math.random() * 9999) + 1;
    const streetNames = [
      'Main St', 'First Ave', 'Central Ave', 'Camelback Rd', 'Indian School Rd',
      'Thomas Rd', 'McDowell Rd', 'Van Buren St', 'Buckeye Rd', 'Broadway Rd',
      'Baseline Rd', 'Ray Rd', 'Chandler Blvd', 'Elliot Rd', 'Warner Rd'
    ];
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    return `${streetNumbers} ${streetName}`;
  }

  generateZipCode(city) {
    const zipCodes = {
      'Phoenix': ['85001', '85003', '85004', '85006', '85007', '85008', '85009'],
      'Scottsdale': ['85250', '85251', '85252', '85253', '85254', '85255'],
      'Tempe': ['85281', '85282', '85283', '85284'],
      'Mesa': ['85201', '85202', '85203', '85204', '85205', '85206'],
      'Chandler': ['85224', '85225', '85226', '85248', '85249'],
      'Tucson': ['85701', '85702', '85703', '85704', '85705', '85706']
    };
    
    const cityZips = zipCodes[city] || ['85001'];
    return cityZips[Math.floor(Math.random() * cityZips.length)];
  }

  getSpecialtiesFromLicenseClass(licenseClass) {
    const specialtyMap = {
      'A': ['General Engineering'],
      'B': ['General Building'],
      'B-1': ['Residential Building'],
      'B-2': ['Commercial Building'],
      'C-1': ['Acoustical & Insulation'],
      'C-2': ['Masonry'],
      'C-3': ['Carpentry & Millwork'],
      'C-4': ['Painting & Decorating'],
      'C-5': ['Roofing'],
      'C-6': ['Cabinet & Millwork'],
      'C-7': ['Floor Covering'],
      'C-8': ['Concrete'],
      'C-9': ['Drywall'],
      'C-10': ['Electrical'],
      'C-11': ['Plumbing'],
      'C-15': ['Glass & Glazing'],
      'C-16': ['Fire Protection'],
      'C-20': ['HVAC'],
      'C-21': ['Building Moving'],
      'C-27': ['Landscaping'],
      'C-35': ['Lathing & Plastering'],
      'C-36': ['Pool/Spa'],
      'C-42': ['Sanitation'],
      'C-54': ['Ceramic Tile'],
      'C-61': ['Limited Specialty'],
      'R-1': ['Irrigation'],
      'R-2': ['Mechanical Systems'],
      'R-3': ['Electrical Systems'],
      'R-4': ['Dual Fuel']
    };
    
    return specialtyMap[licenseClass] || ['General Contracting'];
  }

  generateContractor() {
    const city = this.cities[Math.floor(Math.random() * this.cities.length)];
    const licenseClass = this.licenseClasses[Math.floor(Math.random() * this.licenseClasses.length)];
    const businessName = this.generateBusinessName();
    const specialties = this.getSpecialtiesFromLicenseClass(licenseClass);
    
    // Generate license dates
    const licenseIssued = new Date(2018 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
    const licenseExpiration = new Date(licenseIssued.getFullYear() + 2, licenseIssued.getMonth(), licenseIssued.getDate());

    return {
      businessName,
      description: `Professional ${specialties[0].toLowerCase()} contractor serving ${city} and surrounding areas.`,
      serviceArea: JSON.stringify([city, ...this.cities.filter(c => c !== city).slice(0, 2)]),
      specialties: JSON.stringify(specialties),
      yearsExperience: Math.floor(Math.random() * 20) + 5,
      rocLicenseNumber: this.generateLicenseNumber(),
      licenseClass,
      licenseType: licenseClass.startsWith('R') ? 'Residential' : licenseClass.startsWith('C') ? 'Specialty' : 'General',
      licenseStatus: Math.random() > 0.1 ? 'Active' : 'Inactive',
      licenseIssued,
      licenseExpiration,
      qualifyingParty: `${['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa'][Math.floor(Math.random() * 6)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'][Math.floor(Math.random() * 6)]}`,
      dbaName: Math.random() > 0.7 ? `${businessName} DBA` : null,
      phone: this.generatePhone(),
      address: this.generateAddress(city),
      city,
      state: 'AZ',
      zipCode: this.generateZipCode(city),
      isROCVerified: true,
      rocVerifiedDate: new Date(),
      rocImportDate: new Date(),
      verified: true,
      profileComplete: false,
      rating: Math.random() * 2 + 3, // 3.0 to 5.0
      reviewCount: Math.floor(Math.random() * 50),
      scrapedFrom: 'Arizona ROC Sample Data',
      userId: null // Will be linked when users register
    };
  }

  async seedSampleContractors(count = 1000) {
    console.log(`🌱 Generating ${count} sample ROC contractors...`);
    
    const contractors = [];
    const licenseNumbers = new Set();
    
    for (let i = 0; i < count; i++) {
      let contractor;
      let attempts = 0;
      
      // Ensure unique license numbers
      do {
        contractor = this.generateContractor();
        attempts++;
      } while (licenseNumbers.has(contractor.rocLicenseNumber) && attempts < 10);
      
      if (!licenseNumbers.has(contractor.rocLicenseNumber)) {
        licenseNumbers.add(contractor.rocLicenseNumber);
        contractors.push(contractor);
        
        if (contractors.length % 100 === 0) {
          console.log(`📊 Generated ${contractors.length} contractors...`);
        }
      }
    }

    console.log(`💾 Inserting ${contractors.length} contractors into database...`);
    
    let inserted = 0;
    const batchSize = 50;
    
    for (let i = 0; i < contractors.length; i += batchSize) {
      const batch = contractors.slice(i, i + batchSize);
      
      try {
        // Use createMany for bulk insert without skipDuplicates (not supported with SQLite)
        const result = await prisma.contractor.createMany({
          data: batch
        });
        
        inserted += result.count;
        console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}: ${result.count} contractors (Total: ${inserted})`);
      } catch (error) {
        console.error(`❌ Error inserting batch starting at ${i}:`, error.message);
      }
    }

    return inserted;
  }

  async generateStats() {
    const stats = await prisma.contractor.aggregate({
      _count: {
        id: true
      },
      where: {
        rocLicenseNumber: { not: null }
      }
    });

    const licenseClasses = await prisma.contractor.groupBy({
      by: ['licenseClass'],
      _count: {
        licenseClass: true
      },
      where: {
        rocLicenseNumber: { not: null }
      }
    });

    const cities = await prisma.contractor.groupBy({
      by: ['city'],
      _count: {
        city: true
      },
      where: {
        rocLicenseNumber: { not: null }
      },
      orderBy: {
        _count: {
          city: 'desc'
        }
      },
      take: 10
    });

    console.log('\n📊 ROC Contractor Statistics:');
    console.log(`Total ROC Contractors: ${stats._count.id.toLocaleString()}`);
    
    console.log('\n🏗️ Top License Classes:');
    licenseClasses
      .sort((a, b) => b._count.licenseClass - a._count.licenseClass)
      .slice(0, 10)
      .forEach(lc => {
        console.log(`  ${lc.licenseClass}: ${lc._count.licenseClass.toLocaleString()}`);
      });

    console.log('\n🏙️ Top Cities:');
    cities.forEach(city => {
      console.log(`  ${city.city}: ${city._count.city.toLocaleString()}`);
    });
  }
}

async function main() {
  const generator = new ROCSampleGenerator();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'seed';
  const count = parseInt(args[1]) || 1000;

  try {
    switch (command) {
      case 'seed':
        const inserted = await generator.seedSampleContractors(count);
        console.log(`\n✅ Successfully seeded ${inserted} ROC contractors!`);
        await generator.generateStats();
        break;
        
      case 'stats':
        await generator.generateStats();
        break;
        
      case 'clear':
        const deleted = await prisma.contractor.deleteMany({
          where: {
            rocLicenseNumber: { not: null }
          }
        });
        console.log(`🧹 Cleared ${deleted.count} ROC contractors`);
        break;
        
      default:
        console.log(`
🎲 ROC Sample Data Generator

Usage: node roc-sample-generator.js [command] [count]

Commands:
  seed [count]  - Generate sample contractors (default: 1000)
  stats         - Show contractor statistics
  clear         - Clear all ROC contractors

Examples:
  node roc-sample-generator.js seed 5000
  node roc-sample-generator.js stats
  node roc-sample-generator.js clear
        `);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

module.exports = ROCSampleGenerator;
