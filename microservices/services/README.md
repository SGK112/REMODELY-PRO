# Remodely.AI Microservices - Service Templates

## 🎯 Quick Start Guide

This directory contains ready-to-deploy service templates for breaking down the Remodely.AI monolith into microservices.

### 📋 Available Services

1. **remodely-auth** - Authentication & Authorization Service
2. **remodely-users** - User Management Service  
3. **remodely-quotes** - Quote Management Service
4. **remodely-contractors** - Contractor Management Service
5. **remodely-voice** - Voice AI Service
6. **remodely-matching** - AI Matching Service
7. **remodely-scrapers** - Data Scraping Service
8. **remodely-location** - Location & Maps Service
9. **remodely-web** - Frontend Web Application
10. **remodely-admin** - Admin Dashboard

### 🚀 Deployment Process

Each service can be deployed independently to Render:

```bash
# 1. Create new Render service from template
cd microservices/services/remodely-auth
git init
git add .
git commit -m "Initial auth service"
git remote add origin <render-git-url>
git push origin main

# 2. Render automatically deploys using render.yaml
```

### 🔗 Service Communication

Services communicate via HTTP APIs with internal Render networking:

```javascript
// Example: Auth service calling User service
const userResponse = await fetch(`${process.env.USER_SERVICE_URL}/api/users/${userId}`, {
  headers: {
    'Authorization': `Bearer ${serviceToken}`,
    'Content-Type': 'application/json'
  }
})
```

### 📊 Migration Path

**Phase 1:** Backend APIs (auth, users, quotes, contractors)
**Phase 2:** AI Services (voice, matching, agents)  
**Phase 3:** Data Services (scrapers, location, payments)
**Phase 4:** Frontend Optimization (web app, admin dashboard)

Each phase can be completed independently without breaking existing functionality.

### 🔧 Development

Each service includes:
- Complete `package.json` with dependencies
- `render.yaml` deployment configuration  
- Health check endpoints
- Service-specific documentation
- Migration scripts from monolith

### 🌐 Service URLs (Production)

```
Auth:        https://remodely-auth.onrender.com
Users:       https://remodely-users.onrender.com  
Quotes:      https://remodely-quotes.onrender.com
Contractors: https://remodely-contractors.onrender.com
Voice:       https://remodely-voice.onrender.com
Matching:    https://remodely-matching.onrender.com
Scrapers:    https://remodely-scrapers.onrender.com
Location:    https://remodely-location.onrender.com
Web App:     https://remodely.pro
Admin:       https://admin.remodely.pro
```

### 📈 Monitoring

Each service includes:
- Health check endpoint (`/health`)
- Metrics endpoint (`/metrics`)  
- Structured logging
- Error tracking integration
- Performance monitoring

Ready to deploy? Start with any service template in this directory!
