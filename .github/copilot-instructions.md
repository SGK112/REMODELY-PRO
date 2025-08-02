# Copilot Instructions for NewCountertops.com

## Architecture Overview

This is a **Next.js 14 App Router** marketplace connecting homeowners with granite contractors. The app uses **role-based routing** with three user types: `CUSTOMER`, `CONTRACTOR`, and `ADMIN`.

### Key Data Flow
- **Quote System**: Customer requests → Contractor responses → Bookings → Payments (Stripe)
- **Authentication**: NextAuth.js with Prisma adapter handles multi-role users
- **Database**: Single User model with role-specific relations (`contractor` and `customer` optional fields)

## Database Schema Patterns

The **Prisma schema** uses a hub-and-spoke pattern around the `User` model:
```prisma
// Core pattern: User -> Role-specific profile -> Business entities
User (userType: CUSTOMER|CONTRACTOR|ADMIN)
├── Contractor? (business profile)
├── Customer? (personal profile)  
├── Quote[] (both send/receive)
├── Booking[] (shared bookings)
└── Message[] (bidirectional communication)
```

**Critical relationships**: Always query through User → role-specific profile, never directly to business entities.

## Development Workflow

### Essential Commands
```bash
# Database operations (run in sequence)
npm run db:generate  # After schema changes
npm run db:push      # Push to development DB
npm run db:migrate   # Create migration files
npm run db:seed      # Populate sample data

# Development
npm run dev          # Development server with hot reload
npm run build        # Production build (test before deploy)
```

### File Structure Conventions
```
app/
├── page.tsx              # Landing page (public)
├── (auth)/               # Route groups for organization  
├── dashboard/
│   ├── contractor/       # Role-specific dashboards
│   └── customer/         # (implement pattern consistently)
└── api/                  # API routes (not yet implemented)

components/
├── layout/               # Reusable layout components
├── home/                 # Landing page sections
└── ui/                   # Generic UI components
```

## Code Patterns & Conventions

### Client Components Pattern
Most interactive components use `'use client'` directive:
- **Forms and user interactions**: Always client components
- **Static content**: Server components by default
- **Navigation components**: Client components for state management

### Styling System
- **Primary framework**: Tailwind CSS with custom design system
- **Color scheme**: Brand-focused palette (blue primary, slate accents)
- **Custom CSS variables**: Defined in `globals.css` with `--brand-*` prefix
- **Component classes**: Use consistent patterns like `btn-primary`, `card-gradient`

### State Management
- **Global state**: React Query for server state, SessionProvider for auth
- **Local state**: React useState for component-level state
- **Forms**: React Hook Form with Zod validation (pattern established)

## Integration Points

### Authentication Flow
NextAuth.js configuration:
- Uses Prisma adapter for database sessions
- Supports role-based routing via `userType` field
- Session data includes user role for conditional rendering

### External Services
- **Stripe**: Payment processing (configured in package.json)
- **Image hosting**: Unsplash for placeholder images (allowed in next.config.js)
- **Email**: Not yet implemented (add to environment setup)

## Component Development Guidelines

### Navigation Components
Two navbar variants exist: `Navbar.tsx` (complex) and `Navbar-clean.tsx` (simple). Current layout uses clean version. Follow this pattern:
- Mobile-first responsive design
- Search functionality with location filtering
- Role-based menu items

### Dashboard Components
Contractor dashboard pattern in `app/dashboard/contractor/page.tsx`:
- Mock data constants at component level
- Stats cards with icon + metric pattern
- Table layouts for quote management
- Status badges for quote states

### Form Components
Follow established patterns:
- Client components with form state
- Tailwind styling with custom CSS variables
- Consistent button and input styling

## Development Notes

- **Database**: Currently using SQLite (check DATABASE_URL in .env)
- **Build system**: Standard Next.js build process
- **Deployment target**: Designed for Vercel deployment
- **Missing implementations**: API routes, actual authentication flows, Stripe integration

When adding new features, maintain the role-based architecture and follow the established component patterns. Always test database changes with the migration workflow.
