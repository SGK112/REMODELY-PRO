# RemodelyPro Developer Documentation

## Quick Start Guide

### 🚀 Getting Started

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd REMODELY-PRO
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   node scripts/populate-contractors.js
   ```

4. **Start Development**
   ```bash
   npm run dev
   # App runs on http://localhost:3001
   ```

## 🏗️ Architecture Overview

### Frontend Architecture (Next.js 14)
```
app/                    # App Router (Next.js 14)
├── (auth)/            # Authentication routes
├── api/               # API endpoints
├── contractors/       # Contractor search & profiles
├── dashboard/         # User dashboards
├── matches/           # Project matching
└── signup/           # Registration flows

components/            # Reusable components
├── ui/               # Base UI components
├── layout/           # Layout components
├── dashboard/        # Dashboard components
└── home/            # Homepage sections

lib/                  # Utilities and services
├── searchService.ts  # Enhanced search logic
├── location.ts       # Location utilities
├── auth.ts          # Authentication config
└── prisma.ts        # Database client
```

### Database Schema (Prisma + SQLite)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  role      Role     @default(CUSTOMER)
  createdAt DateTime @default(now())
  
  // Relations
  contractor Contractor?
  customer   Customer?
}

model Contractor {
  id           String   @id @default(cuid())
  businessName String
  description  String?
  specialties  String[] // JSON array
  serviceArea  String   // JSON array
  verified     Boolean  @default(false)
  
  // Business details
  phone        String?
  address      String?
  website      String?
  licenseNumber String?
  
  // User relation
  userId       String   @unique
  user         User     @relation(fields: [userId], references: [id])
}
```

## 🔧 Key Components

### SmartSearch Component
**Location**: `/components/ui/SmartSearch.tsx`

Advanced search with Google Maps integration:
```typescript
// Key features:
- Location autocomplete with Google Places API
- Real-time contractor filtering
- Distance-based search
- Current location detection
- Specialty and price filtering
```

### Enhanced Search Service
**Location**: `/lib/searchService.ts`

Core search logic with geolocation:
```typescript
class EnhancedSearchService {
  // Haversine distance calculation
  calculateDistance(lat1, lon1, lat2, lon2): number
  
  // Google Maps geocoding
  async geocodeLocation(location: string): Promise<GeocodeResult>
  
  // Filter contractors by distance and criteria
  async searchContractors(criteria: SearchCriteria): Promise<Contractor[]>
}
```

### Contractor Tools Suite
**Location**: `/app/dashboard/contractor/tools/`

Professional tools with freemium monetization:
```typescript
// Tools available:
- Project Management (timeline, milestones)
- Estimating System (materials, labor)
- Invoicing (professional invoices)
- Lead Management (customer pipeline)

// Pricing tiers:
- Free: 3 leads/month, basic profile
- Professional ($49): Unlimited leads, basic tools
- Enterprise ($149): Full tools, priority placement
- Premium ($299): White-label, API access
```

## 🗄️ Database Operations

### Prisma Client Usage
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Common operations:
// Find contractors by location
const contractors = await prisma.contractor.findMany({
  where: {
    serviceArea: {
      contains: 'Phoenix, AZ'
    }
  },
  include: {
    user: true
  }
})

// Create new contractor
const contractor = await prisma.contractor.create({
  data: {
    businessName: 'Example Contractors',
    specialties: ['Kitchen Remodeling'],
    serviceArea: ['Phoenix, AZ'],
    user: {
      connect: { id: userId }
    }
  }
})
```

### Database Seeding
```bash
# Populate with sample data
node scripts/populate-contractors.js

# Current data includes:
- 13+ contractors (including Surprise Granite vendors)
- Phoenix, AZ focus area
- Diverse specialties (granite, countertops, remodeling)
- Sample projects and reviews
```

## 🌍 Location Services

### Google Maps Integration
```typescript
// Environment variable required:
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"

// APIs used:
- Places API (autocomplete)
- Geocoding API (address to coordinates)
- Maps JavaScript API (map display)

// Distance calculations:
- Haversine formula for accurate distances
- Contractor filtering by radius
- Location-based search results
```

### Location Utilities
```typescript
// lib/location.ts
export class LocationService {
  // Geocode address to coordinates
  async geocodeAddress(address: string): Promise<Coordinates>
  
  // Get distance between two points
  getDistance(point1: Coordinates, point2: Coordinates): number
  
  // Popular Arizona cities
  getPopularCities(): string[]
}
```

## 🔐 Authentication System

### NextAuth.js Configuration
```typescript
// lib/auth.ts
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers as needed
  ],
  callbacks: {
    session: ({ session, token }) => {
      // Custom session logic
    }
  }
}
```

### Role-Based Access
```typescript
// User roles:
enum Role {
  CUSTOMER = "CUSTOMER"
  CONTRACTOR = "CONTRACTOR"
  ADMIN = "ADMIN"
}

// Route protection:
import { getServerSession } from 'next-auth'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/signin')
  
  // Render protected content
}
```

## 🎨 UI/UX Guidelines

### Design System
```typescript
// Colors (Tailwind classes):
- Primary: blue-600, blue-700, blue-800
- Secondary: gray-100, gray-200, gray-300
- Success: green-500, green-600
- Warning: yellow-500, yellow-600
- Error: red-500, red-600

// Typography:
- Headings: font-bold, text-xl/2xl/3xl
- Body: text-gray-700, text-sm/base
- Captions: text-gray-500, text-xs/sm

// Spacing:
- Component padding: p-4, p-6
- Section margins: mb-8, mb-12
- Element gaps: gap-4, gap-6
```

### Component Patterns
```jsx
// Standard button pattern:
<button className="
  bg-blue-600 hover:bg-blue-700 
  text-white font-medium 
  px-4 py-2 rounded-lg 
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500
">
  Action Text
</button>

// Card pattern:
<div className="
  bg-white rounded-lg shadow-md 
  p-6 border border-gray-200
  hover:shadow-lg transition-shadow duration-200
">
  Card Content
</div>
```

## 🚀 Deployment Guide

### Render Deployment
1. **Environment Setup**:
   ```yaml
   # render.yaml configured for:
   - Port 10000
   - Node.js runtime
   - Automatic builds
   - Health checks at /api/health
   ```

2. **Build Process**:
   ```bash
   npm ci
   npx prisma generate
   npm run build
   ```

3. **Environment Variables**:
   ```env
   DATABASE_URL=your-production-db-url
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-secret-key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
   ```

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] Google Maps API keys active
- [ ] Domain configured
- [ ] SSL certificates active
- [ ] Health checks passing

## 🧪 Testing Guide

### Running Tests
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test specific functionality
node test-location-service.js
node test-google-maps.js
```

### Test Data
```javascript
// Available test scripts:
- test-arizona-scrapers.js (contractor data)
- test-location-service.js (location functionality)
- test-google-maps.js (Maps API integration)
- test-scraping.js (data collection)
```

## 🔍 Debugging Guide

### Common Issues

1. **Austin, TX Still Appearing**
   ```bash
   # Search for remaining references:
   grep -r "Austin.*TX" --exclude-dir=node_modules .
   
   # Fixed locations:
   - Navbar components ✅
   - Dashboard components ✅
   - Home page sections ✅
   - Registration flows ✅
   ```

2. **Google Maps Not Loading**
   ```bash
   # Check API key:
   echo $NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   
   # Verify APIs enabled:
   - Places API
   - Geocoding API
   - Maps JavaScript API
   ```

3. **Database Connection Issues**
   ```bash
   # Reset database:
   npx prisma db push --force-reset
   npx prisma generate
   node scripts/populate-contractors.js
   ```

### Development Tools
```bash
# Database inspection:
npx prisma studio

# Next.js build analysis:
npm run build
npm run analyze

# Performance profiling:
npm run dev -- --profile
```

## 📊 Performance Optimization

### Next.js Optimizations
```typescript
// Image optimization:
import Image from 'next/image'

<Image
  src="/contractor-photo.jpg"
  alt="Contractor"
  width={300}
  height={200}
  placeholder="blur"
  priority={false}
/>

// Dynamic imports:
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
```

### Database Performance
```typescript
// Efficient queries with Prisma:
const contractors = await prisma.contractor.findMany({
  select: {
    id: true,
    businessName: true,
    specialties: true,
    user: {
      select: {
        name: true,
        image: true
      }
    }
  },
  take: 20,
  skip: page * 20
})
```

## 🔗 API Reference

### Public Endpoints
```typescript
// GET /api/contractors
// Search contractors with filters
interface SearchParams {
  location?: string
  specialty?: string
  priceRange?: string
  radius?: number
  page?: number
}

// GET /api/contractors/[id]
// Get contractor details
interface ContractorDetails {
  id: string
  businessName: string
  description: string
  specialties: string[]
  serviceArea: string[]
  user: UserProfile
}
```

### Authenticated Endpoints
```typescript
// POST /api/projects
// Create new project
interface CreateProject {
  name: string
  type: string
  description: string
  location: string
  budget: string
}

// GET /api/dashboard/stats
// Get dashboard statistics
interface DashboardStats {
  totalProjects: number
  activeQuotes: number
  completedProjects: number
  favoriteContractors: number
}
```

## 🛠 Troubleshooting

### Restart Development Server
```bash
# Kill existing processes:
lsof -ti:3001 | xargs kill -9

# Clear Next.js cache:
rm -rf .next

# Restart:
npm run dev
```

### Database Issues
```bash
# Reset and repopulate:
rm -f prisma/dev.db
npx prisma db push
node scripts/populate-contractors.js
```

### Build Issues
```bash
# Clear all caches:
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

**Happy Coding! 🚀**

*For additional support, check the main README.md or create an issue.*
