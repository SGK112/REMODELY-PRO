# Remodely.AI Authentication Service

## 🔐 Overview

The Authentication Service handles all user authentication and authorization for the Remodely.AI platform. This microservice manages user registration, login, phone verification, and JWT token generation.

## 🚀 Features

- **User Registration** - Account creation with email/phone validation
- **User Authentication** - Secure login with JWT tokens
- **Phone Verification** - SMS-based phone number verification via Twilio
- **Password Management** - Secure password hashing with bcrypt
- **Token Management** - JWT token generation and validation
- **Rate Limiting** - Protection against brute force attacks
- **Health Checks** - Service health monitoring endpoints

## 📋 API Endpoints

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-phone
POST /api/auth/logout
GET  /api/auth/profile
GET  /api/auth/validate-token
```

### Health Check Endpoints

```http
GET /health           # Full health check
GET /health/ready     # Readiness probe
GET /health/live      # Liveness probe
```

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/remodely_auth

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Twilio SMS
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone

# Service Authentication
SERVICE_API_KEY=your-service-key

# CORS
CORS_ORIGINS=https://remodely.pro,https://admin.remodely.pro

# Server
PORT=3000
NODE_ENV=production
LOG_LEVEL=info
```

## 🏗️ Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run dev

# Test health endpoint
curl http://localhost:3000/health
```

## 📊 Database Schema

The service uses a PostgreSQL database with the following schema:

```sql
CREATE TABLE users (
  id                         TEXT PRIMARY KEY,
  name                       TEXT NOT NULL,
  email                      TEXT UNIQUE NOT NULL,
  password                   TEXT NOT NULL,
  phone                      TEXT UNIQUE NOT NULL,
  userType                   TEXT DEFAULT 'CUSTOMER',
  phoneVerified              BOOLEAN DEFAULT false,
  phoneVerificationCode      TEXT,
  phoneVerificationExpires   TIMESTAMP,
  phoneVerifiedAt            TIMESTAMP,
  agreeToTerms               BOOLEAN DEFAULT false,
  agreeToTermsDate           TIMESTAMP,
  lastLogin                  TIMESTAMP,
  loginAttempts              INTEGER DEFAULT 0,
  lockedUntil                TIMESTAMP,
  createdAt                  TIMESTAMP DEFAULT now(),
  updatedAt                  TIMESTAMP DEFAULT now()
);
```

## 🔒 Security Features

- **Password Hashing** - bcrypt with 12 rounds
- **JWT Tokens** - Secure token-based authentication
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Zod schema validation
- **Security Headers** - Helmet.js protection
- **CORS** - Configurable cross-origin resource sharing
- **Audit Logging** - Comprehensive request/error logging

## 📈 Monitoring

### Health Checks

The service provides three levels of health checks:

1. **Liveness** (`/health/live`) - Basic service availability
2. **Readiness** (`/health/ready`) - Database connectivity check
3. **Full Health** (`/health`) - Complete system status

### Logging

Structured JSON logging with Winston:
- Request/response logging
- Error tracking with stack traces
- Security event logging
- Performance metrics

### Metrics

Key metrics to monitor:
- Request rate and response times
- Authentication success/failure rates
- Phone verification success rates
- Database connection health
- Memory and CPU usage

## 🚀 Deployment to Render

### 1. Create New Render Service

```bash
# Create new Git repository for this service
git init
git add .
git commit -m "Initial auth service"
git remote add origin <your-render-git-url>
git push origin main
```

### 2. Configure Environment Variables

In Render dashboard, set:
- `DATABASE_URL` - From Render PostgreSQL database
- `JWT_SECRET` - Generate secure random string
- `TWILIO_*` - Your Twilio credentials
- `SERVICE_API_KEY` - Generate secure API key
- `CORS_ORIGINS` - Your frontend domains

### 3. Deploy

Render will automatically:
1. Install dependencies (`npm ci`)
2. Generate Prisma client (`npx prisma generate`)
3. Start the service (`npm start`)
4. Run health checks on `/health`

## 🔗 Service Integration

### Frontend Integration

```javascript
// Login example
const response = await fetch('https://remodely-auth.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

const { token, user } = await response.json()
localStorage.setItem('token', token)
```

### Service-to-Service Integration

```javascript
// Other services calling auth service
const response = await fetch('https://remodely-auth.onrender.com/api/auth/validate-token', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'X-Service-Key': process.env.SERVICE_API_KEY
  }
})
```

## 🧪 Testing

```bash
# Run tests
npm test

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "password": "password123",
    "phone": "+1234567890",
    "userType": "CUSTOMER",
    "agreeToTerms": true
  }'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 📝 Migration from Monolith

To migrate from the existing monolithic application:

1. **Extract Authentication Logic**
   - Copy relevant code from `lib/auth.ts`
   - Adapt NextAuth.js logic to Express.js
   - Migrate database schema

2. **Update Frontend**
   - Replace NextAuth.js calls with direct API calls
   - Update authentication state management
   - Handle token storage and refresh

3. **Update Other Services**
   - Replace direct database calls with API calls
   - Implement service-to-service authentication
   - Update environment configurations

## 🆘 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check DATABASE_URL format
echo $DATABASE_URL
# Should be: postgresql://user:pass@host:5432/dbname

# Test connection
npx prisma db push
```

**SMS Not Sending**
```bash
# Verify Twilio credentials
curl -X GET "https://api.twilio.com/2010-04-01/Accounts.json" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

**JWT Token Invalid**
```bash
# Verify JWT_SECRET is set and consistent across services
echo $JWT_SECRET
```

### Support

For issues with this service:
1. Check service logs in Render dashboard
2. Verify all environment variables are set
3. Test health endpoints
4. Check database connectivity
5. Review authentication flow end-to-end

Ready to authenticate users securely! 🔐
