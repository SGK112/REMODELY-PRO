# Remodely.AI Microservices Architecture Blueprint

## 🏗️ Current State Analysis

**Monolithic Structure:**
- Single Next.js 14 application (~603 files)
- 27+ scraping services integrated
- AI/Voice services embedded
- Authentication, database, and UI all coupled
- Single deployment point on Render

**Pain Points:**
- Large build times and memory usage
- Difficult to scale individual components
- Single point of failure
- Complex debugging across domains
- Resource-intensive deployments

## 🎯 Target Microservices Architecture

### Service Breakdown Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    REMODELY.AI ECOSYSTEM                    │
├─────────────────────────────────────────────────────────────┤
│  🌐 Frontend Services │  ⚙️  Backend Services │  🤖 AI Services  │
├─────────────────────────────────────────────────────────────┤
│  • Web App            │  • Auth API          │  • Voice AI      │
│  • Admin Dashboard    │  • User API          │  • Matching AI    │
│  • Mobile API         │  • Quote API         │  • Agent AI       │
│                       │  • Contractor API    │                   │
├─────────────────────────────────────────────────────────────┤
│  📊 Data Services     │  🔍 Integration Svc  │  🛠️  Utility Svc   │
├─────────────────────────────────────────────────────────────┤
│  • Database           │  • Scraper Service   │  • Image Service  │
│  • Analytics          │  • Maps Service      │  • Email Service  │
│  • File Storage       │  • Payment Service   │  • SMS Service    │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Service Definitions

### 1. 🌐 **Frontend Services**

#### A. **Web Application Service** (`remodely-web`)
**Purpose:** Customer-facing website and core user interactions
**Tech:** Next.js 14 (App Router) - Static/SSG focused
**Responsibility:**
- Landing pages & marketing
- Contractor search & profiles
- Quote request forms
- Customer dashboard (read-only)

**Deployment:**
- Render Static Site (for marketing pages)
- Render Web Service (for dynamic features)
- Optimized for SEO & performance

#### B. **Admin Dashboard Service** (`remodely-admin`)
**Purpose:** Internal administration and management
**Tech:** Next.js 14 or React SPA
**Responsibility:**
- Contractor verification
- Quote management
- System monitoring
- Analytics dashboards

**Deployment:**
- Render Web Service (private)
- Access-controlled with admin authentication

#### C. **Mobile API Gateway** (`remodely-mobile-api`)
**Purpose:** Mobile app backend and API aggregation
**Tech:** Express.js/Fastify
**Responsibility:**
- Mobile-optimized endpoints
- API composition from backend services
- Push notifications
- Offline sync support

### 2. ⚙️ **Backend API Services**

#### A. **Authentication Service** (`remodely-auth`)
**Purpose:** Centralized authentication and authorization
**Tech:** Express.js + NextAuth.js core
**Responsibility:**
- User registration/login
- Phone verification (Twilio)
- JWT token management
- Role-based access control (RBAC)

**Database:** PostgreSQL (user profiles, auth tokens)
**API Endpoints:**
```
POST /auth/register
POST /auth/login
POST /auth/verify-phone
GET  /auth/profile
PUT  /auth/profile
```

#### B. **User Management Service** (`remodely-users`)
**Purpose:** User profiles and account management
**Tech:** Express.js + Prisma
**Responsibility:**
- Customer profiles
- Contractor profiles
- Profile image management
- Account preferences

**Database:** PostgreSQL (user data, preferences)

#### C. **Quote Management Service** (`remodely-quotes`)
**Purpose:** Quote creation, matching, and lifecycle
**Tech:** Express.js + Prisma
**Responsibility:**
- Quote request processing
- Contractor-customer matching
- Quote status management
- Communication tracking

**Database:** PostgreSQL (quotes, messages, status)

#### D. **Contractor Management Service** (`remodely-contractors`)
**Purpose:** Contractor data and verification
**Tech:** Express.js + Prisma
**Responsibility:**
- Contractor profiles
- License verification
- Rating and review system
- Service area management

**Database:** PostgreSQL (contractor data, reviews)

### 3. 🤖 **AI & Intelligence Services**

#### A. **Voice AI Service** (`remodely-voice`)
**Purpose:** Voice consultation and AI communication
**Tech:** Node.js + ElevenLabs + Google Cloud AI
**Responsibility:**
- Voice synthesis (ElevenLabs)
- Speech recognition
- Conversational AI agents
- Call management (Twilio)

**External APIs:** ElevenLabs, Google Cloud, Twilio

#### B. **Matching AI Service** (`remodely-matching`)
**Purpose:** Intelligent contractor-customer matching
**Tech:** Python/Node.js + AI libraries
**Responsibility:**
- AI-powered matching algorithms
- Project type classification
- Location-based optimization
- Match scoring and ranking

#### C. **AI Agent Service** (`remodely-agents`)
**Purpose:** Google Conversational Agents integration
**Tech:** Node.js + Google Cloud Dialogflow
**Responsibility:**
- Customer consultation agents
- Project requirement gathering
- Automated customer support
- Agent conversation management

### 4. 🔍 **Integration Services**

#### A. **Scraper Service** (`remodely-scrapers`)
**Purpose:** Data collection from 27+ sources
**Tech:** Node.js + Puppeteer + Queues
**Responsibility:**
- Arizona ROC scraping
- Manufacturer network scraping
- Business directory scraping
- Data normalization and validation

**Database:** PostgreSQL (scraped data, processing status)
**Queue:** Redis/Bull for job processing

#### B. **Location Service** (`remodely-location`)
**Purpose:** Geographic and mapping functionality
**Tech:** Express.js + Google Maps API
**Responsibility:**
- Address geocoding
- Distance calculations
- Service area mapping
- Route optimization

**External APIs:** Google Maps, Apple Maps

#### C. **Payment Service** (`remodely-payments`)
**Purpose:** Financial transactions and billing
**Tech:** Express.js + Stripe
**Responsibility:**
- Payment processing
- Subscription management
- Invoice generation
- Financial reporting

**External APIs:** Stripe

### 5. 🛠️ **Utility Services**

#### A. **Notification Service** (`remodely-notifications`)
**Purpose:** Multi-channel communication
**Tech:** Express.js + Queues
**Responsibility:**
- Email notifications (Nodemailer)
- SMS notifications (Twilio)
- Push notifications
- Notification templating

#### B. **File Storage Service** (`remodely-files`)
**Purpose:** File upload and management
**Tech:** Express.js + Cloudinary
**Responsibility:**
- Image optimization
- File upload handling
- CDN integration
- Media transcoding

#### C. **Analytics Service** (`remodely-analytics`)
**Purpose:** Data collection and insights
**Tech:** Express.js + Analytics tools
**Responsibility:**
- User behavior tracking
- Performance metrics
- Business intelligence
- Custom reporting

### 6. 📊 **Data Layer**

#### A. **Primary Database** (`remodely-db-main`)
**Type:** PostgreSQL on Render
**Purpose:** Core application data
**Tables:** Users, Contractors, Quotes, Reviews, etc.

#### B. **Analytics Database** (`remodely-db-analytics`)
**Type:** PostgreSQL on Render (separate instance)
**Purpose:** Analytics and reporting data
**Tables:** Events, Metrics, Aggregations

#### C. **Cache Layer** (`remodely-redis`)
**Type:** Redis on Render
**Purpose:** Caching and session storage
**Use Cases:** API caching, session data, queue jobs

## 🚀 Render.com Deployment Blueprint

### Individual Service Configurations

Each service gets its own `render.yaml` configuration:

```yaml
# Example: remodely-auth service
services:
  - type: web
    name: remodely-auth
    runtime: node
    plan: starter
    buildCommand: npm ci && npm run build
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: remodely-db-main
          property: connectionString
```

### Service Communication

**API Gateway Pattern:**
- Use Render's internal networking
- Service-to-service authentication via API keys
- Circuit breaker pattern for resilience

**Service Discovery:**
```javascript
// Environment-based service URLs
const SERVICES = {
  AUTH: process.env.AUTH_SERVICE_URL || 'https://remodely-auth.onrender.com',
  USERS: process.env.USER_SERVICE_URL || 'https://remodely-users.onrender.com',
  QUOTES: process.env.QUOTE_SERVICE_URL || 'https://remodely-quotes.onrender.com'
}
```

## 📊 Migration Strategy

### Phase 1: Extract Backend APIs (Week 1-2)
1. **Extract Authentication Service**
   - Move `lib/auth.ts` → `remodely-auth`
   - Create standalone Express app
   - Implement API endpoints
   - Test with existing frontend

2. **Extract Quote Management**
   - Move quote logic → `remodely-quotes`
   - Update frontend to use API calls
   - Test quote creation flow

### Phase 2: Extract AI Services (Week 3-4)
3. **Voice AI Service**
   - Move voice logic → `remodely-voice`
   - Implement voice API endpoints
   - Test voice consultation flow

4. **Matching AI Service**
   - Move matching algorithms → `remodely-matching`
   - Create matching API
   - Test contractor matching

### Phase 3: Extract Data Services (Week 5-6)
5. **Scraper Service**
   - Move all scrapers → `remodely-scrapers`
   - Implement queue-based processing
   - Test data collection

6. **Location Service**
   - Move location logic → `remodely-location`
   - Create location API
   - Test mapping features

### Phase 4: Frontend Optimization (Week 7-8)
7. **Optimize Web App**
   - Remove extracted backend logic
   - Convert to API client
   - Optimize for static generation

8. **Create Admin Dashboard**
   - Extract admin features
   - Create separate admin app
   - Deploy independently

## 🔧 Implementation Benefits

### Scalability
- **Independent scaling:** Scale scraper service separately from web app
- **Resource optimization:** Right-size each service for its workload
- **Cost efficiency:** Pay only for resources each service needs

### Development
- **Team autonomy:** Different teams can work on different services
- **Technology diversity:** Use best tool for each job
- **Faster deployments:** Deploy individual services without affecting others

### Reliability
- **Fault isolation:** Issues in one service don't crash the entire platform
- **Circuit breakers:** Graceful degradation when services are down
- **Monitoring:** Service-specific monitoring and alerting

### Maintenance
- **Easier debugging:** Issues isolated to specific services
- **Independent updates:** Update services without coordinating releases
- **Simplified testing:** Test services in isolation

## 🎯 Next Steps

1. **Review and Approve Architecture**
2. **Set up Service Templates**
3. **Create Migration Plan**
4. **Implement Phase 1 Services**
5. **Test Inter-service Communication**
6. **Deploy to Render Staging**
7. **Monitor and Optimize**
8. **Production Migration**

This blueprint transforms the monolithic Remodely.AI application into a scalable, maintainable microservices architecture optimized for Render.com deployment.
