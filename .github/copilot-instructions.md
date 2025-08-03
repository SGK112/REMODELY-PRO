# Copilot Instructions for Remodely.AI

## Architecture Overview

This is a **production-ready Next.js 14 App Router** marketplace connecting homeowners with verified remodeling contractors. The platform features **role-based authentication**, **automated contractor acquisition**, **AI-powered matching**, and **voice consultation capabilities**.

### Key Data Flow
- **Quote System**: Customer requests → AI matching → Contractor responses → Bookings → Payments (Stripe)
- **Scraper Pipeline**: 27+ sources → Automated data collection → ROC license verification → Database storage
- **AI Services**: ElevenLabs voice synthesis + Google Cloud agents + multi-AI routing
- **Authentication**: NextAuth.js with custom credentials + phone verification (Twilio)
- **Location Services**: Google Maps + Apple Maps integration + geographic search

## Critical Systems

### AI & Voice Integration
The platform's **key differentiator** is its intelligent contractor-customer matching:
```bash
# Voice system testing
node test-voice-comprehensive.js         # Complete voice pipeline test
node test-google-cloud-agents.js         # Google AI agents testing
node test-elevenlabs-integration.js      # Voice synthesis testing

# AI services testing
node test-ai-services.js                 # Multi-AI routing tests
node test-smart-matching.js              # Matching algorithm tests
```

**AI Service Stack**:
- **Voice**: ElevenLabs synthesis + Twilio voice calls + Google Cloud Speech
- **Matching**: Multi-AI routing (lib/multi-ai-service.ts) + smart algorithms
- **Agents**: Google Conversational Agents for customer consultation
- **Vision**: Google Vision API for project image analysis

### Contractor Scraping Architecture
Automated contractor acquisition system with **27+ sources**:
```bash
# Main scraping commands
node test-scraping.js                    # Test all scrapers
node test-single-scraper.js [scraper]    # Test specific scraper
node populate-contractors.js             # Production data import
./system-status-check.sh                 # Health monitoring
node scripts/roc-converter.js            # Arizona ROC license integration
```

**Data Sources**:
- Arizona ROC (Registrar of Contractors) with license verification
- Manufacturer networks: Caesarstone, Cambria, Silestone, etc.
- Business directories: Yelp, Google, Yellow Pages, etc.
- Professional networks: Houzz, Angie's List, etc.

### Database Schema Pattern
Hub-and-spoke around `User` model with **role-specific profiles**:
```prisma
User (userType: CUSTOMER|CONTRACTOR|ADMIN)
├── Contractor? (business profile + scraped data + ROC verification)
├── Customer? (personal profile + AI preferences)
├── Quote[] (bidirectional communication + AI matching scores)
├── Booking[] + Payment[] + Review[]
└── VoiceConsultation[] + AIInteraction[]
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
npm run dev:port              # Run on port 3001 (alternative)
npm run build:analyze         # Bundle analysis
npm run db:studio            # Prisma database browser
```

### Quick Setup & Test Data
```bash
# One-command development setup
./setup-dev.sh               # Validates environment, creates test users, displays URLs

# Test user creation
node create-test-users.js     # Creates customer, contractor, admin accounts
node dev-scripts/setup-profiles.js  # Ensures proper profile relationships

# ROC (Arizona contractor license) tools
npm run roc:seed              # Import Arizona ROC contractor data
npm run roc:stats             # View ROC integration statistics
npm run roc:clear             # Clear ROC data
```

**Test Credentials (created by setup)**:
- Customer: `customer@test.com / password123`
- Contractor: `contractor@test.com / password123`  
- Admin: `admin@test.com / password123`

### Testing Patterns
Use project's **extensive test suite** (40+ test files):
```bash
# Authentication & registration flow
node test-registration-flow.js
node test-phone-verification.js

# AI & voice system validation
node test-voice-comprehensive.js          # End-to-end voice testing
node test-google-cloud-agents.js          # AI agent functionality
node test-ai-services.js                  # Multi-AI routing
node test-enhanced-voice.js               # Voice quality testing

# Scraping system validation  
node test-arizona-scrapers.js
node test-authenticated-scraping.js
node test-roc-integration.js              # Arizona ROC validation

# Location & maps integration
node test-location-service.js
node test-google-maps.js
node test-apple-maps.js                   # Apple Maps integration
```

## Code Patterns & Integration Points

### Authentication Architecture
- **Custom credentials provider** in `lib/auth.ts`
- **Phone verification** via Twilio (`lib/twilio.ts`)
- **Role-based middleware** in `middleware.ts` protecting `/dashboard`, `/admin`, `/api/*`
- **Protected API routes** return 401 for unauthenticated requests

### API Route Architecture
- **RESTful patterns**: `/api/user`, `/api/quotes`, `/api/contractors`
- **AI endpoints**: `/api/ai`, `/api/voice`, `/api/google-agent`
- **Admin functions**: `/api/admin`, `/api/scrape` (protected by role)
- **Health monitoring**: `/api/health` (public endpoint for deployment checks)

### Service Layer Pattern
All business logic in `lib/` with consistent patterns:
- **Database**: `lib/prisma.ts` (singleton pattern)
- **Validation**: `lib/validation.ts` (Zod schemas)
- **Location**: `lib/location.ts` + `lib/maps.ts` (Google Maps integration)
- **Images**: `lib/imageService.ts` + `lib/enhancedImageService.ts`
- **Communication**: `lib/twilio.ts` + `lib/email.ts`
- **AI Services**: `lib/multi-ai-service.ts` + `lib/ai-voice-assistant.ts`
- **Voice**: `lib/humanVoiceService.ts` + `lib/enhanced-twilio.ts`
- **Matching**: `lib/smartMatching.ts` + `lib/matching.ts`

### Environment Configuration
**Three environment tiers**:
```bash
.env.example           # Template with all required keys
.env.production        # Production configuration
.env.scraping.example  # Scraping-specific credentials
```

**Required integrations**: Google Maps API, Twilio, Stripe, Cloudinary, database (PostgreSQL in production), ElevenLabs, Google Cloud AI

**Development ports**: Main app runs on `:3001` (not :3000), health check endpoint at `/api/health`

### File Structure Conventions
```
app/
├── dashboard/[customer|contractor|admin]/  # Role-specific dashboards
├── api/[user|quotes|contractors|scrape]/   # RESTful API routes
├── api/[ai|voice|google-agent]/            # AI & voice service routes
├── auth/                                   # NextAuth pages
├── voice-consultation/                     # Voice consultation interface
└── [contractors|search|quote]/             # Public marketplace pages

lib/
├── scrapers/          # 27 automated data collection modules
├── validation.ts      # Zod schema definitions
├── multi-ai-service.ts # AI routing & orchestration
├── smartMatching.ts   # AI-powered contractor matching
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
