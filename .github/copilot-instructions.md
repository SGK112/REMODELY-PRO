# Copilot Instructions for Remodely.AI

## Architecture Overview

This is a **production-ready Next.js 14 App Router** marketplace connecting homeowners with stone and surface contractors. The platform features **role-based authentication**, **automated contractor scraping system**, and **comprehensive marketplace functionality**.

### Key Data Flow
- **Quote System**: Customer requests → Contractor responses → Bookings → Payments (Stripe)
- **Scraping Pipeline**: 27 sources → Automated data collection → Contractor verification → Database storage
- **Authentication**: NextAuth.js with custom credentials + Prisma adapter
- **Location Services**: Google Maps integration + geographic search

## Critical Systems

### Contractor Scraping Architecture
The project's **core differentiator** is its automated contractor acquisition system:
```bash
# Main scraping commands
node test-scraping.js                    # Test all scrapers
node test-single-scraper.js [scraper]    # Test specific scraper
node populate-contractors.js             # Production data import
./system-status-check.sh                 # Health monitoring
```

**27 scraper sources** organized in `lib/scrapers/`:
- Manufacturer websites (12): Caesarstone, Cambria, Silestone, etc.
- Business directories (8): Yelp, Google, Yellow Pages, etc.
- Professional networks (4): Houzz, Angie's List, etc.
- Government databases (3): Arizona ROC, CLC, licensing boards

### Database Schema Pattern
Hub-and-spoke around `User` model with **role-specific profiles**:
```prisma
User (userType: CUSTOMER|CONTRACTOR|ADMIN)
├── Contractor? (business profile + scraped data)
├── Customer? (personal profile)
├── Quote[] (bidirectional communication)
└── Booking[] + Payment[] + Review[]
```

## Development Workflows

### Essential Commands
```bash
# Database operations (ALWAYS in sequence)
npm run db:generate && npm run db:push && npm run db:seed

# Scraping operations
npm run seed:production        # Production contractor import
npm run import:contractors     # Bulk contractor processing
npm run deploy:full           # Full production deployment

# Development
npm run dev                   # Development with hot reload
npm run build:analyze         # Bundle analysis
npm run db:studio            # Prisma database browser
```

### Testing Patterns
Use project's **extensive test suite** (40+ test files):
```bash
# Authentication & registration flow
node test-registration-flow.js
node test-phone-verification.js

# Scraping system validation  
node test-arizona-scrapers.js
node test-authenticated-scraping.js

# Location & maps integration
node test-location-service.js
node test-google-maps.js
```

## Code Patterns & Integration Points

### Authentication Architecture
- **Custom credentials provider** in `lib/auth.ts`
- **Phone verification** via Twilio (`lib/twilio.ts`)
- **Role-based middleware** in `middleware.ts` protecting `/dashboard`, `/admin`, `/api/*`
- **Protected API routes** return 401 for unauthenticated requests

### Service Layer Pattern
All business logic in `lib/` with consistent patterns:
- **Database**: `lib/prisma.ts` (singleton pattern)
- **Validation**: `lib/validation.ts` (Zod schemas)
- **Location**: `lib/location.ts` + `lib/maps.ts` (Google Maps integration)
- **Images**: `lib/imageService.ts` + `lib/enhancedImageService.ts`
- **Communication**: `lib/twilio.ts` + `lib/email.ts`

### Environment Configuration
**Three environment tiers**:
```bash
.env.example           # Template with all required keys
.env.production        # Production configuration
.env.scraping.example  # Scraping-specific credentials
```

**Required integrations**: Google Maps API, Twilio, Stripe, Cloudinary, database (PostgreSQL in production)

### File Structure Conventions
```
app/
├── dashboard/[customer|contractor|admin]/  # Role-specific dashboards
├── api/[user|quotes|contractors|scrape]/   # RESTful API routes
├── auth/                                   # NextAuth pages
└── [contractors|search|quote]/             # Public marketplace pages

lib/
├── scrapers/          # 27 automated data collection modules
├── validation.ts      # Zod schema definitions
└── [service].ts       # Business logic layer

scripts/               # Production utilities
test-*.js             # 40+ test files for all systems
```

## Production Deployment Patterns

### Build Process
```bash
npm run build:render    # Render.com deployment
npm run build:clean     # Clean build with cache clearing
```

### Monitoring & Health Checks
Use built-in monitoring scripts:
```bash
./system-status-check.sh           # System health overview
node check-contractors.js          # Verify contractor data
node check-database.js             # Database connectivity
```

## Development Guidelines

- **Always use absolute imports** (`@/lib/`, `@/components/`)
- **Test scraping changes** with single-scraper tests before bulk operations
- **Follow role-based patterns** - never bypass User → profile relationships
- **Use validation schemas** from `lib/validation.ts` for all forms
- **Environment variables** are strictly typed - check `.env.example`

The project prioritizes **automated data acquisition** and **production reliability** - maintain these patterns when adding features.
