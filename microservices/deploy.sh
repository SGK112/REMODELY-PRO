#!/bin/bash

# Remodely.AI Microservices Deployment Script
# This script helps migrate from monolith to microservices on Render

set -e

echo "🏗️  Remodely.AI Microservices Deployment"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SERVICES=(
    "remodely-auth"
    "remodely-users" 
    "remodely-quotes"
    "remodely-contractors"
    "remodely-voice"
    "remodely-matching"
    "remodely-scrapers"
    "remodely-location"
    "remodely-admin"
)

PHASE_1_SERVICES=("remodely-auth" "remodely-users" "remodely-quotes" "remodely-contractors")
PHASE_2_SERVICES=("remodely-voice" "remodely-matching")
PHASE_3_SERVICES=("remodely-scrapers" "remodely-location")
PHASE_4_SERVICES=("remodely-admin")

# Helper functions
print_header() {
    echo -e "${BLUE}📋 $1${NC}"
    echo "----------------------------------------"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Are you in the Remodely.AI root directory?"
        exit 1
    fi
    
    # Check if microservices directory exists
    if [ ! -d "microservices" ]; then
        print_error "microservices directory not found. Run this script from the project root."
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "Git is required but not installed."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        print_error "Node.js 20+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "All prerequisites met"
    echo ""
}

# Display migration strategy
show_migration_strategy() {
    print_header "Migration Strategy"
    
    echo "This deployment follows a phased approach:"
    echo ""
    echo "📦 Phase 1: Core Backend APIs (Week 1-2)"
    for service in "${PHASE_1_SERVICES[@]}"; do
        echo "   • $service"
    done
    echo ""
    
    echo "🤖 Phase 2: AI Services (Week 3-4)"  
    for service in "${PHASE_2_SERVICES[@]}"; do
        echo "   • $service"
    done
    echo ""
    
    echo "🔍 Phase 3: Data Services (Week 5-6)"
    for service in "${PHASE_3_SERVICES[@]}"; do
        echo "   • $service"
    done
    echo ""
    
    echo "🌐 Phase 4: Frontend Services (Week 7-8)"
    for service in "${PHASE_4_SERVICES[@]}"; do
        echo "   • $service"
    done
    echo ""
    
    echo "Each service can be deployed independently without breaking existing functionality."
    echo ""
}

# Create individual Git repositories for each service
create_service_repos() {
    print_header "Creating Service Repositories"
    
    cd microservices/services
    
    for service in "${SERVICES[@]}"; do
        if [ -d "$service" ]; then
            echo "Processing $service..."
            cd "$service"
            
            # Initialize git if not already done
            if [ ! -d ".git" ]; then
                git init
                git add .
                git commit -m "Initial $service microservice"
                print_success "$service repository created"
            else
                print_warning "$service repository already exists"
            fi
            
            cd ..
        else
            print_warning "Service directory $service not found, skipping..."
        fi
    done
    
    cd ../..
    echo ""
}

# Generate deployment instructions
generate_deployment_guide() {
    print_header "Generating Deployment Guide"
    
    cat > microservices/DEPLOYMENT_GUIDE.md << 'EOF'
# Remodely.AI Microservices Deployment Guide

## 🎯 Quick Deployment Steps

### 1. Phase 1: Core Backend APIs

Deploy these services first as they provide foundational functionality:

#### A. Authentication Service (`remodely-auth`)
```bash
cd microservices/services/remodely-auth
# Create new Render service from Git repository
# Use render.yaml configuration
# Set environment variables in Render dashboard
```

#### B. User Management Service (`remodely-users`)
```bash
cd microservices/services/remodely-users
# Create new Render service
# Link to remodely-users-db database
# Set AUTH_SERVICE_URL=https://remodely-auth.onrender.com
```

#### C. Quote Management Service (`remodely-quotes`)
```bash
cd microservices/services/remodely-quotes
# Create new Render service
# Link to remodely-quotes-db database
# Set service URLs for auth, users, contractors
```

#### D. Contractor Management Service (`remodely-contractors`)
```bash
cd microservices/services/remodely-contractors
# Create new Render service
# Link to remodely-contractors-db database
# Set service URLs for auth, location
```

### 2. Phase 2: AI Services

#### A. Voice AI Service (`remodely-voice`)
```bash
cd microservices/services/remodely-voice
# Create new Render service
# Set ElevenLabs API key
# Set Google Cloud credentials
# Set Twilio credentials
```

#### B. AI Matching Service (`remodely-matching`)
```bash
cd microservices/services/remodely-matching
# Create new Render service
# Set contractor and location service URLs
```

### 3. Phase 3: Data Services

#### A. Scraping Service (`remodely-scrapers`)
```bash
cd microservices/services/remodely-scrapers
# Create new Render service (Standard plan recommended)
# Link to remodely-scrapers-db database
# Link to remodely-redis for job queuing
```

#### B. Location Service (`remodely-location`)
```bash
cd microservices/services/remodely-location
# Create new Render service
# Set Google Maps API key
```

### 4. Phase 4: Frontend Services

#### A. Admin Dashboard (`remodely-admin`)
```bash
cd microservices/services/remodely-admin
# Create new Render service
# Set domain: admin.remodely.pro
# Set all service URLs
```

## 🔧 Environment Variables Setup

### Global Environment Variables (set for all services)
```
SERVICE_API_KEY=<generate-secure-key>
NODE_ENV=production
```

### Service-Specific Variables

Refer to each service's README.md for detailed environment variable requirements.

## 🌐 Service URLs

After deployment, update all service environment variables with actual URLs:

```
AUTH_SERVICE_URL=https://remodely-auth.onrender.com
USER_SERVICE_URL=https://remodely-users.onrender.com
QUOTE_SERVICE_URL=https://remodely-quotes.onrender.com
CONTRACTOR_SERVICE_URL=https://remodely-contractors.onrender.com
VOICE_SERVICE_URL=https://remodely-voice.onrender.com
MATCHING_SERVICE_URL=https://remodely-matching.onrender.com
SCRAPER_SERVICE_URL=https://remodely-scrapers.onrender.com
LOCATION_SERVICE_URL=https://remodely-location.onrender.com
```

## 🧪 Testing Deployment

### 1. Health Checks
```bash
# Test each service health endpoint
curl https://remodely-auth.onrender.com/health
curl https://remodely-users.onrender.com/health
# ... test all services
```

### 2. Service Integration
```bash
# Test authentication flow
curl -X POST https://remodely-auth.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test service communication
curl https://remodely-users.onrender.com/api/users/profile \
  -H "Authorization: Bearer <token>"
```

### 3. End-to-End Testing
- Test user registration flow
- Test quote creation and matching
- Test contractor search and profiles
- Test voice consultation features

## 🔍 Monitoring

### Service Health Monitoring
- Set up uptime monitoring for all service health endpoints
- Configure alerts for service failures
- Monitor database connections

### Performance Monitoring
- Track API response times
- Monitor database query performance
- Track error rates and success rates

### Cost Monitoring
- Monitor Render service usage
- Optimize service plans based on actual usage
- Consider consolidating low-traffic services

## 🚨 Rollback Plan

If issues occur during migration:

1. **Service-Level Rollback**
   - Disable problematic service
   - Route traffic back to monolith endpoints
   - Fix issues and redeploy

2. **Complete Rollback**
   - Point domains back to monolith application
   - Disable all microservices
   - Restore from backup if necessary

## 🎉 Success Criteria

Deployment is successful when:
- ✅ All services pass health checks
- ✅ User authentication works end-to-end
- ✅ Quote creation and matching functions
- ✅ Contractor search returns results
- ✅ Voice AI features are operational
- ✅ Admin dashboard is accessible
- ✅ All service-to-service communication works
- ✅ Performance is equal or better than monolith

## 📞 Support

For deployment issues:
1. Check individual service logs in Render dashboard
2. Verify all environment variables are set correctly
3. Test service connectivity with curl commands
4. Check database connections and migrations
5. Review service-to-service authentication

Ready to deploy microservices! 🚀
EOF

    print_success "Deployment guide created at microservices/DEPLOYMENT_GUIDE.md"
    echo ""
}

# Generate cost estimation
generate_cost_estimation() {  
    print_header "Cost Estimation"
    
    cat > microservices/COST_ESTIMATION.md << 'EOF'
# Remodely.AI Microservices - Cost Estimation

## 💰 Render.com Pricing Breakdown

### Current Monolith Cost
- **1 Web Service (Standard)**: $25/month
- **1 PostgreSQL Database (Starter)**: $7/month
- **Total Current**: $32/month

### Microservices Cost

#### Web Services
| Service | Plan | Monthly Cost | Reasoning |
|---------|------|--------------|-----------|
| remodely-web | Standard+ | $85 | High traffic frontend |
| remodely-auth | Starter | $7 | Low resource usage |
| remodely-users | Starter | $7 | CRUD operations |
| remodely-quotes | Starter | $7 | CRUD operations |
| remodely-contractors | Starter | $7 | CRUD operations |
| remodely-voice | Standard | $25 | AI processing |
| remodely-matching | Starter | $7 | Algorithm processing |
| remodely-scrapers | Standard | $25 | CPU intensive |
| remodely-location | Starter | $7 | API calls |
| remodely-admin | Starter | $7 | Low traffic |

**Web Services Total**: $184/month

#### Databases
| Database | Plan | Monthly Cost |
|----------|------|--------------|
| remodely-auth-db | Starter | $7 |
| remodely-users-db | Starter | $7 |
| remodely-quotes-db | Starter | $7 |
| remodely-contractors-db | Starter | $7 |
| remodely-scrapers-db | Starter | $7 |
| remodely-redis | Starter | $7 |

**Database Total**: $42/month

#### Total Microservices Cost
- **Web Services**: $184/month
- **Databases**: $42/month
- **Total**: $226/month

### Cost Comparison
- **Current Monolith**: $32/month
- **Full Microservices**: $226/month
- **Increase**: $194/month (7x increase)

## 💡 Cost Optimization Strategies

### Phase 1: Gradual Migration
Deploy only essential services first:

| Service | Cost | Essential |
|---------|------|-----------|
| remodely-auth | $14 | ✅ Required |
| remodely-users | $14 | ✅ Required |
| remodely-quotes | $14 | ✅ Required |
| **Phase 1 Total** | **$42** | **2.3x increase** |

### Phase 2: AI Services
Add AI capabilities:

| Service | Cost | 
|---------|------|
| remodely-voice | $32 |
| remodely-matching | $14 |
| **Phase 2 Addition** | **$46** |
| **Running Total** | **$88** |

### Phase 3: Full Migration
Complete the migration:

| Service | Cost |
|---------|------|
| remodely-scrapers | $32 |
| remodely-location | $14 |
| remodely-admin | $14 |
| **Phase 3 Addition** | **$60** |
| **Final Total** | **$148** |

### Optimization Recommendations

#### 1. Service Consolidation
**Combine low-traffic services:**
- Merge auth + users → Save $14/month
- Merge quotes + contractors → Save $14/month
- Merge location + matching → Save $14/month
- **Potential Savings**: $42/month

#### 2. Database Optimization
**Share databases for related services:**
- Core database (auth, users, quotes, contractors) → Save $21/month
- Keep separate: scrapers (large data), redis (cache)
- **Potential Savings**: $21/month

#### 3. Right-Sizing Plans
**Start with Starter plans and scale up:**
- Begin all services on Starter ($7)
- Upgrade to Standard ($25) only when needed
- Monitor actual resource usage
- **Potential Savings**: $50-100/month

### Optimized Architecture Cost

| Component | Plan | Cost | Notes |
|-----------|------|------|-------|
| remodely-web | Standard+ | $85 | Main frontend |
| remodely-core-api | Standard | $25 | Combined auth/users/quotes |
| remodely-contractors | Starter | $7 | Contractor management |
| remodely-ai | Standard | $25 | Combined voice/matching |
| remodely-scrapers | Standard | $25 | Data collection |
| remodely-admin | Starter | $7 | Admin dashboard |
| Core Database | Starter | $7 | Main application data |
| Scrapers Database | Starter | $7 | Scraping data |
| Redis Cache | Starter | $7 | Caching/queues |

**Optimized Total**: $195/month (vs $226 full microservices)
**Savings**: $31/month

## 📊 ROI Analysis

### Benefits vs Costs

#### Benefits (Hard to Quantify)
- **Scalability**: Scale individual services independently
- **Reliability**: Isolated failures, better uptime
- **Development Speed**: Teams can work independently
- **Technology Flexibility**: Use best tool for each job
- **Maintenance**: Easier debugging and updates

#### Costs
- **Infrastructure**: $116-194/month additional cost
- **Complexity**: More deployment and monitoring overhead
- **Development Time**: 6-8 weeks migration effort

### Break-Even Analysis
If microservices enable:
- **50% faster development**: Worth $5000+/month in developer time
- **99.9% vs 99% uptime**: Worth $1000+/month in lost revenue
- **2x faster feature delivery**: Competitive advantage worth $10000+/month

**Conclusion**: The $116-194/month additional cost is easily justified by development and reliability benefits.

## 🎯 Recommended Approach

### Phase 1: Start Small ($88/month total)
1. **remodely-auth** ($14): Essential authentication
2. **remodely-users** ($14): User management  
3. **remodely-quotes** ($14): Core business logic
4. **remodely-voice** ($32): AI differentiation
5. Keep other features in monolith temporarily

### Phase 2: Scale Up ($148/month total)
6. **remodely-contractors** ($14): Complete core APIs
7. **remodely-scrapers** ($32): Data collection
8. **remodely-location** ($14): Maps and geolocation

### Phase 3: Optimize ($130-150/month total)
9. Consolidate services based on actual usage
10. Optimize database usage
11. Right-size service plans

This approach spreads the cost increase over 3-6 months while delivering immediate benefits from the most valuable microservices.
EOF

    print_success "Cost estimation created at microservices/COST_ESTIMATION.md"
    echo ""
}

# Main execution
main() {
    echo "Choose deployment action:"
    echo "1. Check prerequisites and show strategy"
    echo "2. Create service repositories"
    echo "3. Generate deployment guide"
    echo "4. Generate cost estimation"
    echo "5. All of the above"
    echo ""
    read -p "Enter choice (1-5): " choice
    
    case $choice in
        1)
            check_prerequisites
            show_migration_strategy
            ;;
        2)
            check_prerequisites
            create_service_repos
            ;;
        3)
            generate_deployment_guide
            ;;
        4)
            generate_cost_estimation
            ;;
        5)
            check_prerequisites
            show_migration_strategy
            create_service_repos
            generate_deployment_guide
            generate_cost_estimation
            
            print_success "Microservices preparation complete!"
            echo ""
            echo "📋 Next Steps:"
            echo "1. Review microservices/ARCHITECTURE_BLUEPRINT.md"
            echo "2. Read microservices/DEPLOYMENT_GUIDE.md"
            echo "3. Check microservices/COST_ESTIMATION.md"
            echo "4. Start with Phase 1 services (auth, users, quotes)"
            echo "5. Create Render services from individual Git repositories"
            echo ""
            echo "🚀 Ready to deploy microservices!"
            ;;
        *)
            print_error "Invalid choice. Please run the script again."
            exit 1
            ;;
    esac
}

# Run main function
main
