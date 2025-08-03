# Remodely Pro - Home Remodeling Marketplace

A **production-ready Next.js 14 App Router** marketplace connecting homeowners with verified remodeling and construction contractors. The platform features **role-based authentication**, **automated contractor discovery**, and **comprehensive project management**.

## 🏠 What We Do

Remodely Pro is a comprehensive marketplace for home improvement projects including:

- **Kitchen Remodeling** - Custom cabinets, countertops, appliances
- **Bathroom Renovations** - Complete makeovers, tile work, fixtures  
- **Home Additions** - Room additions, second stories, extensions
- **Flooring Projects** - Hardwood, tile, carpet, luxury vinyl
- **Roofing Services** - Repairs, replacements, maintenance
- **General Construction** - Custom builds, repairs, maintenance

## 🚀 Key Features

### For Homeowners
- **Get Multiple Quotes** - Request quotes from verified contractors
- **Browse Contractors** - Search by location, specialty, and ratings
- **Project Management** - Track progress, communicate, make payments
- **Verified Reviews** - Read authentic customer experiences

### For Contractors  
- **Lead Generation** - Get connected with qualified customers
- **Profile Management** - Showcase work, manage availability
- **Quote Management** - Respond to requests, track conversions
- **Payment Processing** - Secure payments through Stripe

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (production), SQLite (development)
- **Authentication**: NextAuth.js with custom credentials
- **Payments**: Stripe integration
- **Communication**: Twilio (SMS), Email notifications
- **Maps**: Google Maps API integration
- **Deployment**: Render.com ready

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (production) or SQLite (development)
- Required API keys (see `.env.example`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd REMODELY-PRO

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npm run db:generate
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔧 Development

### Essential Commands

```bash
# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database  
npm run db:seed        # Seed with sample data
npm run db:studio      # Open Prisma Studio

# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

### Project Structure

```
app/
├── auth/                 # Authentication pages
├── dashboard/            # Role-based dashboards
│   ├── customer/        # Customer dashboard
│   ├── contractor/      # Contractor dashboard  
│   └── admin/           # Admin dashboard
├── api/                 # API routes
│   ├── auth/           # Authentication endpoints
│   ├── quotes/         # Quote management
│   ├── contractors/    # Contractor operations
│   └── users/          # User management
├── contractors/         # Public contractor pages
├── quote/              # Quote request flow
└── search/             # Search functionality

components/
├── ui/                 # Reusable UI components
├── forms/              # Form components
└── layout/             # Layout components

lib/
├── auth.ts            # NextAuth configuration
├── prisma.ts          # Database client
├── validation.ts      # Zod schemas
├── email.ts           # Email service
├── twilio.ts          # SMS service
└── utils.ts           # Utility functions
```

## 🗄 Database Schema

The application uses a hub-and-spoke model around the `User` entity:

```prisma
User (userType: CUSTOMER|CONTRACTOR|ADMIN)
├── Customer?           # Customer profile
├── Contractor?         # Contractor business profile
├── Quote[]            # Quote requests/responses
├── Booking[]          # Confirmed projects
├── Payment[]          # Payment history
└── Review[]           # Reviews given/received
```

## 🔐 Authentication

- **Role-based access control** (Customer, Contractor, Admin)
- **Phone verification** via Twilio
- **Protected routes** with middleware
- **Session management** with NextAuth.js

## 💳 Payment Processing

- **Stripe integration** for secure payments
- **Escrow-style** payment holding
- **Automated payouts** to contractors
- **Payment history** and invoicing

## 🌍 Deployment

### Environment Setup

```bash
# Production environment
cp .env.production .env

# Build and deploy
npm run build
npm run start
```

### Render.com Deployment

The application is configured for Render.com deployment:

1. Connect your repository
2. Set environment variables
3. Deploy with `npm run build:render`

## 📱 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-phone` - Phone verification
- `GET/POST /api/auth/*` - NextAuth.js endpoints

### Quote Management
- `POST /api/quotes` - Create quote request
- `GET /api/quotes` - Get user quotes
- `PUT /api/quotes/[id]` - Update quote
- `POST /api/quotes/[id]/respond` - Contractor response

### Contractor Operations  
- `GET /api/contractors` - Search contractors
- `GET /api/contractors/[id]` - Get contractor profile
- `PUT /api/contractors/[id]` - Update contractor profile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Remodely Pro** - Connecting homeowners with trusted remodeling professionals.
- Unit tests for utilities and services
- Integration tests for API endpoints
- End-to-end testing for critical user flows
- Database seeding for consistent test data

### Quality Assurance
- TypeScript for compile-time error checking
- ESLint and Prettier for code consistency
- Automated testing in CI/CD pipeline

## 📝 Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Individual feature development
- `hotfix/*`: Critical production fixes

### Code Standards
- TypeScript for type safety
- Component-based architecture
- Responsive design first
- Accessibility compliance (WCAG 2.1)

## � API Documentation

### Public Endpoints
- `GET /api/contractors`: Search contractors with filters
- `GET /api/contractors/[id]`: Individual contractor details
- `POST /api/auth/register`: User registration
- `POST /api/location/search`: Location autocomplete

### Authenticated Endpoints
- `POST /api/projects`: Create new project
- `GET /api/dashboard/stats`: User dashboard data
- `POST /api/quotes`: Submit contractor quote
- `PUT /api/profile`: Update user profile

## 🎨 UI/UX Design

### Design System
- **Colors**: Professional blue/gray palette
- **Typography**: Modern sans-serif hierarchy
- **Components**: Consistent button, form, and card styles
- **Responsive**: Mobile-first approach

### User Experience
- Intuitive contractor search flow
- Clear project creation process
- Professional contractor dashboard
- Streamlined quote comparison

## 📱 Mobile Experience

### Responsive Design
- Mobile-optimized search interface
- Touch-friendly contractor cards
- Swipeable image galleries
- Compressed data for mobile networks

### Progressive Web App (PWA)
- Offline functionality for key features
- App-like experience on mobile devices
- Push notifications for project updates

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ Enhanced search with Google Maps
- ✅ Contractor tools suite
- ✅ Phoenix, AZ market focus

### Phase 2 (Q1 2025)
- Multi-city expansion
- Advanced contractor vetting
- Customer project tracking
- Payment integration

### Phase 3 (Q2 2025)
- Mobile applications (iOS/Android)
- AI-powered project matching
- Advanced analytics dashboard
- White-label solutions

## 🤝 Contributing

### Development Guidelines
1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit pull request with detailed description
5. Code review and approval process

### Issues and Bug Reports
- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include environment information
- Label issues appropriately

## 📞 Support

### Developer Support
- **Documentation**: Comprehensive guides in `/docs`
- **Code Comments**: Inline documentation for complex logic
- **Community**: GitHub Discussions for questions

### Business Contact
- **Email**: support@remodely.pro
- **Address**: Phoenix, AZ 85001
- **Hours**: Monday-Friday, 9 AM - 6 PM MST

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for the home improvement industry**

*Last updated: January 28, 2025*

### AI-Powered Systems
- **Automated Contractor Discovery**: 27 data sources continuously scraped and verified
- **Intelligent Matching Engine**: ML algorithms match projects with optimal contractors
- **Smart Pricing Intelligence**: Dynamic market analysis for accurate estimates
- **Natural Language Processing**: Convert project descriptions into actionable requirements

### Business Management Suite
- **Advanced Quoting System**: Template-based quotes with intelligent price suggestions
- **AI Project Management**: End-to-end commercial and residential project tracking with predictive analytics
- **Smart Scheduling**: AI-optimized resource allocation and timeline management
- **Risk Assessment**: Automated project risk analysis and mitigation recommendations
- **Lead Management CRM**: Automated lead scoring and follow-up systems
- **Performance Analytics**: Revenue tracking, conversion metrics, and business insights
- **Commercial Project Tools**: Large-scale project coordination with multi-phase planning
- **Residential Project Suite**: Homeowner-focused project management with milestone communication

### Platform Infrastructure
- **Role-Based Authentication**: Secure access for homeowners, contractors, and admins
- **Integrated Payments**: Stripe-powered secure transactions and escrow services
- **Real-Time Communication**: In-app messaging and notification systems
- **Mobile-Responsive Design**: Optimized experience across all devices

## 💻 Tech Stack

### Core Technologies
- **Frontend**: Next.js 14 with TypeScript and App Router
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access control

### AI & Data Processing
- **Web Scraping**: Puppeteer + Cheerio for automated data collection
- **API Integrations**: Google Maps, Stripe, Twilio for comprehensive services
- **Image Processing**: Sharp + Cloudinary for optimized media handling
- **Data Validation**: Zod schemas for type-safe data processing

### Business Tools
- **Payment Processing**: Stripe with escrow and subscription support
- **Communication**: Twilio SMS/Voice + Nodemailer for multi-channel outreach
- **File Management**: AWS S3 integration for document and image storage
- **Analytics**: Built-in performance tracking and business intelligence

## 🏗 Platform Architecture

### Automated Contractor Acquisition
```
27 Data Sources → Web Scrapers → AI Verification → Database → Matching Engine
```

Our intelligent scraping system continuously monitors:
- **Manufacturer Networks** (12 sources): Caesarstone, Cambria, MSI Stone, etc.
- **Business Directories** (8 sources): Yelp, Google Business, Yellow Pages, etc.
- **Professional Platforms** (4 sources): Houzz, Angie's List, HomeAdvisor, etc.
- **Government Databases** (3 sources): State licensing boards and regulatory agencies

### AI Matching Process
1. **Project Analysis**: NLP processes homeowner requirements
2. **Contractor Scoring**: ML algorithms rank contractors by fit score
3. **Geographic Optimization**: Location-based matching with travel cost analysis
4. **Availability Intelligence**: Real-time contractor capacity assessment
5. **Price Optimization**: Market analysis for competitive quote generation

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- PostgreSQL database
- API Keys for integrations (Google Maps, Stripe, Twilio)

### Installation Steps

1. **Clone and Install**
```bash
git clone https://github.com/SGK112/REMODELY-PRO.git
cd REMODELY-PRO
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env.local
# Add your API keys to .env.local
```

Required API keys:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Location services
- `STRIPE_PUBLIC_KEY` & `STRIPE_SECRET_KEY` - Payment processing  
- `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN` - Communication services

3. **Database Setup**
```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Create database schema
npm run db:seed        # Populate with sample data
```

4. **Launch Platform**
```bash
npm run dev            # Development server
# Open http://localhost:3001
```

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                     # RESTful API endpoints
│   │   ├── contractors/         # Contractor management APIs
│   │   ├── quotes/              # Quote generation and management
│   │   ├── scrape/              # Automated data collection
│   │   └── user/                # User authentication and profiles
│   ├── dashboard/               # Role-based dashboards
│   │   ├── contractor/          # Contractor business management
│   │   ├── customer/            # Homeowner project management
│   │   └── admin/               # Platform administration
│   ├── contractors/             # Public contractor directory
│   ├── search/                  # AI-powered contractor search
│   └── quote/                   # Intelligent quoting system
├── components/                   # Reusable UI components
│   ├── ai/                      # AI-powered components
│   ├── contractor/              # Contractor-specific UI
│   ├── layout/                  # Application layout
│   └── ui/                      # Design system components
├── lib/                         # Core business logic
│   ├── scrapers/                # 27 automated data collectors
│   ├── ai/                      # Machine learning utilities
│   ├── validation.ts            # Zod schema definitions
│   ├── auth.ts                  # Authentication configuration
│   └── prisma.ts                # Database client
├── scripts/                     # Production utilities
│   ├── import-contractors.js    # Bulk contractor import
│   ├── seed-production.js       # Production data seeding
│   └── system-status-check.sh   # Health monitoring
└── test-*.js                    # Comprehensive test suite (40+ files)
```

## 🎯 Key Platform Pages

### Public Pages
- `/` - AI-powered landing with intelligent contractor search
- `/contractors` - Comprehensive contractor directory with filtering
- `/search` - Advanced search with natural language processing
- `/about` - Platform mission and AI capabilities

### Homeowner Dashboard (`/dashboard/customer`)
- **AI Project Manager**: Intelligent residential project planning with automated milestone tracking
- **Smart Timeline Management**: AI-optimized scheduling with weather and resource considerations
- **AI Matching Results**: Personalized contractor recommendations with compatibility scoring
- **Quote Comparison**: Side-by-side quote analysis with AI insights and risk assessment
- **Communication Hub**: Centralized contractor messaging with automated status updates
- **Budget Intelligence**: AI-driven cost tracking and variance analysis

### Contractor Dashboard (`/dashboard/contractor`)
- **Commercial Project Hub**: Large-scale project management with multi-phase coordination
- **Residential Project Suite**: Streamlined homeowner project management tools
- **AI Lead Management**: Machine learning-scored leads with conversion predictions
- **Smart Quoting Tools**: Template-based quotes with dynamic pricing intelligence
- **Resource Optimization**: AI-driven crew scheduling and material procurement
- **Predictive Analytics**: Project completion forecasting and risk mitigation
- **Business Intelligence**: Revenue tracking and performance optimization insights
- **Profile Optimization**: AI-driven profile enhancement for maximum lead conversion

### Admin Panel (`/dashboard/admin`)
- **Scraping Management**: Monitor 27 data sources and health metrics
- **Quality Control**: Contractor verification and approval workflows
- **Platform Analytics**: User engagement and business intelligence
- **System Monitoring**: Real-time performance and error tracking

## 🤖 AI & Automation Features

### Intelligent Contractor Discovery
```bash
# Production scraping commands
npm run seed:production        # Import from all 27 sources
node test-scraping.js          # Validate scraper health
node test-single-scraper.js [source]  # Test specific data source
./system-status-check.sh       # Comprehensive health check
```

### Business Intelligence Tools
- **Market Analysis**: Real-time pricing intelligence across regions
- **Demand Forecasting**: Predict project volume by category and location
- **Competitive Intelligence**: Track competitor pricing and availability
- **Performance Optimization**: ML-driven recommendations for contractors
- **Project Success Prediction**: AI models forecasting completion probability and timeline accuracy
- **Commercial Project Analytics**: Large-scale project performance metrics and ROI analysis
- **Residential Project Insights**: Homeowner satisfaction prediction and optimization recommendations
- **Resource Planning Intelligence**: AI-driven material and labor forecasting for optimal project execution

## 🚀 Production Deployment

### Build & Deploy
```bash
npm run build:render          # Render.com optimized build
npm run deploy:full           # Complete production deployment
npm run build:analyze         # Bundle size analysis
```

### Monitoring & Maintenance
```bash
node check-contractors.js     # Verify contractor data integrity
node check-database.js        # Database connectivity and health
./system-status-check.sh      # Comprehensive system status
```

### Environment Tiers
- **Development**: Local development with sample data
- **Staging**: Full API integration testing environment  
- **Production**: Live platform with real contractor data and payments

## 🎯 Business Model & Market Opportunity

### Target Markets
- **Homeowners**: 140M+ US households planning renovations annually
- **Residential Contractors**: 600K+ specialized residential renovation contractors
- **Commercial Contractors**: 150K+ commercial construction and renovation specialists
- **Property Managers**: 300K+ property management companies overseeing maintenance and improvements
- **Market Size**: $472B annual home improvement spending ($200B residential, $272B commercial)

### Revenue Streams
- **Lead Generation**: Subscription-based contractor lead access for residential and commercial projects
- **Transaction Fees**: Commission on completed projects (residential 3-5%, commercial 1-3%)
- **Premium Tools**: Advanced analytics and AI project management features
- **Enterprise Solutions**: White-label platforms for large construction companies and property managers
- **API Licensing**: Contractor matching and project management APIs for partners
- **Commercial Project Licensing**: Specialized tools for large-scale commercial project coordination

## 📊 Database Schema

### Core Models
- **User**: Multi-role authentication (Customer/Contractor/Admin/PropertyManager)
- **Contractor**: Business profiles with AI-enhanced data and specialization tracking
- **Customer**: Homeowner and commercial client profiles with project history
- **Project**: AI-managed residential and commercial project coordination
- **Quote**: AI-assisted quote generation and management with project type optimization
- **Booking**: Project scheduling and milestone tracking with predictive completion analysis
- **Review**: Quality assurance and reputation management across project types
- **ScrapedData**: Automated contractor data from 27 sources with commercial/residential classification

### AI Data Models
- **MatchingScore**: ML-generated contractor-project compatibility for residential and commercial projects
- **PriceIntelligence**: Market-based pricing recommendations with project type differentiation
- **LeadScore**: Conversion probability for contractor leads across project categories
- **QualityMetrics**: Automated contractor performance tracking with commercial/residential specialization
- **ProjectRiskAssessment**: AI-driven risk analysis for timeline and budget prediction
- **ResourceOptimization**: Machine learning models for crew allocation and material planning
- **CompletionForecasting**: Predictive analytics for project timeline and milestone achievement

## 🤝 Contributing

### Development Workflow
1. Fork the repository and create a feature branch
2. Follow the established patterns in `/lib` for business logic
3. Add comprehensive tests using the existing test suite patterns
4. Update documentation for any new API endpoints or features
5. Submit pull request with detailed description

### Code Standards
- **TypeScript**: Strict mode with comprehensive type definitions
- **Testing**: Minimum 80% coverage for new features
- **API Design**: RESTful endpoints with consistent error handling
- **UI/UX**: Mobile-first responsive design following design system

## 📄 License & Legal

This project is proprietary software. All rights reserved.

**Contact**: For licensing inquiries or partnership opportunities, please contact the development team.

---

**Remodely.AI** - Transforming the home improvement industry through artificial intelligence and automated contractor discovery. 🏠🤖✨ 
