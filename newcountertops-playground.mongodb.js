/* global use, db */
// Remodely.AI MongoDB Playground
// Production-ready queries for the countertops marketplace
// This playground demonstrates the power of MongoDB for your marketplace

// Select your production database
use('newcountertops');

// ===========================================
// 1. CONTRACTORS COLLECTION - Sample Data
// ===========================================

// Insert sample contractors for testing
db.getCollection('Contractor').insertMany([
  {
    id: "contractor_1",
    businessName: "Arizona Granite Masters",
    contactName: "John Smith", 
    email: "john@azgranitemasters.com",
    phone: "(602) 555-0101",
    location: {
      address: "1234 Main St, Phoenix, AZ 85001",
      coordinates: { lat: 33.4484, lng: -112.0740 },
      serviceRadius: 50
    },
    specialties: ["Granite", "Quartz", "Marble"],
    experience: 15,
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    profileImage: "https://example.com/profiles/john.jpg",
    portfolioImages: [
      "https://example.com/portfolio/granite1.jpg",
      "https://example.com/portfolio/kitchen1.jpg"
    ],
    priceRange: "$$",
    availability: "Available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "contractor_2", 
    businessName: "Desert Stone Solutions",
    contactName: "Maria Garcia",
    email: "maria@desertstones.com",
    phone: "(480) 555-0202",
    location: {
      address: "5678 Oak Ave, Scottsdale, AZ 85251",
      coordinates: { lat: 33.4942, lng: -111.9261 },
      serviceRadius: 30
    },
    specialties: ["Quartz", "Marble", "Caesarstone"],
    experience: 10,
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    profileImage: "https://example.com/profiles/maria.jpg",
    portfolioImages: [
      "https://example.com/portfolio/quartz1.jpg",
      "https://example.com/portfolio/bathroom1.jpg"
    ],
    priceRange: "$$$",
    availability: "Busy",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// ===========================================
// 2. POWERFUL SEARCH QUERIES
// ===========================================

// Find contractors by location (within 25 miles of Phoenix)
console.log("=== LOCATION-BASED SEARCH ===");
const phoenixContractors = db.getCollection('Contractor').find({
  "location.coordinates": {
    $near: {
      $geometry: { type: "Point", coordinates: [-112.0740, 33.4484] },
      $maxDistance: 40234 // 25 miles in meters
    }
  }
});
console.log("Contractors near Phoenix:", phoenixContractors.count());

// Search by specialty and rating
console.log("=== SPECIALTY & RATING SEARCH ===");
const topQuartzContractors = db.getCollection('Contractor').find({
  specialties: "Quartz",
  rating: { $gte: 4.5 },
  verified: true
}).sort({ rating: -1, reviewCount: -1 });

topQuartzContractors.forEach(contractor => {
  console.log(`${contractor.businessName}: ${contractor.rating}⭐ (${contractor.reviewCount} reviews)`);
});

// ===========================================
// 3. QUOTES COLLECTION - Sample Data  
// ===========================================

db.getCollection('Quote').insertMany([
  {
    id: "quote_1",
    customerId: "customer_1",
    contractorId: "contractor_1", 
    projectType: "Kitchen Countertops",
    material: "Granite",
    squareFootage: 45,
    budget: "$3000-4000",
    timeline: "2-3 weeks",
    status: "PENDING",
    description: "Full kitchen remodel with granite countertops",
    location: {
      address: "Phoenix, AZ",
      coordinates: { lat: 33.4484, lng: -112.0740 }
    },
    createdAt: new Date(),
    responses: []
  },
  {
    id: "quote_2",
    customerId: "customer_2",
    contractorId: "contractor_2",
    projectType: "Bathroom Vanity",
    material: "Quartz", 
    squareFootage: 15,
    budget: "$1500-2000",
    timeline: "1 week",
    status: "ACCEPTED",
    description: "Master bathroom vanity replacement",
    location: {
      address: "Scottsdale, AZ",
      coordinates: { lat: 33.4942, lng: -111.9261 }
    },
    createdAt: new Date(),
    responses: [
      {
        contractorId: "contractor_2",
        price: 1800,
        timeline: "5 days",
        message: "High-quality quartz installation with 10-year warranty",
        createdAt: new Date()
      }
    ]
  }
]);

// ===========================================
// 4. ADVANCED ANALYTICS QUERIES
// ===========================================

// Get top contractors by rating and review count
console.log("=== TOP CONTRACTORS ANALYTICS ===");
db.getCollection('Contractor').aggregate([
  { $match: { verified: true } },
  { $sort: { rating: -1, reviewCount: -1 } },
  { $limit: 5 },
  { 
    $project: { 
      businessName: 1, 
      rating: 1, 
      reviewCount: 1,
      specialties: 1,
      "location.address": 1
    } 
  }
]).forEach(contractor => {
  console.log(`🏆 ${contractor.businessName}: ${contractor.rating}⭐ (${contractor.reviewCount} reviews)`);
});

// Quote success rate by material type
console.log("=== QUOTE SUCCESS ANALYTICS ===");
db.getCollection('Quote').aggregate([
  {
    $group: {
      _id: "$material",
      totalQuotes: { $sum: 1 },
      acceptedQuotes: { 
        $sum: { $cond: [{ $eq: ["$status", "ACCEPTED"] }, 1, 0] } 
      }
    }
  },
  {
    $project: {
      material: "$_id",
      totalQuotes: 1,
      acceptedQuotes: 1,
      successRate: { 
        $multiply: [
          { $divide: ["$acceptedQuotes", "$totalQuotes"] }, 
          100
        ] 
      }
    }
  },
  { $sort: { successRate: -1 } }
]).forEach(stat => {
  console.log(`${stat.material}: ${stat.successRate.toFixed(1)}% success rate`);
});

// ===========================================
// 5. REAL-TIME DASHBOARD QUERIES
// ===========================================

// Active quotes in last 24 hours
const last24Hours = new Date(Date.now() - 24*60*60*1000);
const recentQuotes = db.getCollection('Quote').find({
  createdAt: { $gte: last24Hours },
  status: { $in: ["PENDING", "RESPONDED"] }
}).count();

console.log(`📊 Active quotes (24h): ${recentQuotes}`);

// Average project value by material
console.log("=== AVERAGE PROJECT VALUES ===");
db.getCollection('Quote').aggregate([
  {
    $match: { 
      status: "ACCEPTED",
      "responses.price": { $exists: true }
    }
  },
  { $unwind: "$responses" },
  {
    $group: {
      _id: "$material",
      avgPrice: { $avg: "$responses.price" },
      projectCount: { $sum: 1 }
    }
  },
  { $sort: { avgPrice: -1 } }
]).forEach(stat => {
  console.log(`💰 ${stat._id}: $${stat.avgPrice.toFixed(0)} avg (${stat.projectCount} projects)`);
});

// ===========================================
// 6. GEOSPATIAL QUERIES (Perfect for Maps!)
// ===========================================

// Find contractors within specific area (great for your Google Maps integration!)
console.log("=== GEOSPATIAL SEARCH ===");
const contractorsNearArea = db.getCollection('Contractor').find({
  "location.coordinates": {
    $geoWithin: {
      $centerSphere: [[-112.0740, 33.4484], 25 / 3963.2] // 25 mile radius
    }
  },
  verified: true
}).sort({ rating: -1 });

console.log(`🗺️ Found ${contractorsNearArea.count()} verified contractors in Phoenix area`);

// ===========================================
// 7. TEXT SEARCH (Full-text search capabilities)
// ===========================================

// Create text index for search functionality
db.getCollection('Contractor').createIndex({
  businessName: "text",
  specialties: "text",
  "location.address": "text"
});

// Search contractors by text
const searchResults = db.getCollection('Contractor').find({
  $text: { $search: "granite phoenix" }
}).sort({ score: { $meta: "textScore" } });

console.log("=== TEXT SEARCH RESULTS ===");
searchResults.forEach(contractor => {
  console.log(`🔍 ${contractor.businessName} - ${contractor.location.address}`);
});

// ===========================================
// 8. MARKETPLACE PERFORMANCE METRICS
// ===========================================

// Monthly business analytics
console.log("=== BUSINESS METRICS ===");
const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);

// New contractors this month
const newContractors = db.getCollection('Contractor').find({
  createdAt: { $gte: thirtyDaysAgo }
}).count();

// Quotes processed this month  
const monthlyQuotes = db.getCollection('Quote').find({
  createdAt: { $gte: thirtyDaysAgo }
}).count();

// Success rate this month
const acceptedQuotes = db.getCollection('Quote').find({
  createdAt: { $gte: thirtyDaysAgo },
  status: "ACCEPTED"
}).count();

const successRate = monthlyQuotes > 0 ? (acceptedQuotes / monthlyQuotes * 100).toFixed(1) : 0;

console.log(`📈 New contractors (30d): ${newContractors}`);
console.log(`📋 Quotes processed (30d): ${monthlyQuotes}`);
console.log(`✅ Success rate (30d): ${successRate}%`);

// Top performing locations
console.log("=== TOP MARKETS ===");
db.getCollection('Quote').aggregate([
  { $match: { status: "ACCEPTED" } },
  {
    $group: {
      _id: "$location.address",
      projectCount: { $sum: 1 },
      avgValue: { $avg: { $arrayElemAt: ["$responses.price", 0] } }
    }
  },
  { $sort: { projectCount: -1 } },
  { $limit: 5 }
]).forEach(market => {
  console.log(`🏙️ ${market._id}: ${market.projectCount} projects, $${market.avgValue?.toFixed(0) || 'N/A'} avg`);
});

console.log("🎉 Remodely.AI MongoDB playground complete!");
console.log("🚀 Your marketplace is ready for production with MongoDB!");
console.log("💡 Run individual sections to test specific functionality");
