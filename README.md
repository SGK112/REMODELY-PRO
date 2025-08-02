# Remodely.AI - Production Ready Marketplace

A comprehensive Next.js 14 marketplace connecting homeowners with qualified stone and surface contractors. Built with modern technologies and production-ready features.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SGK112/Remodely.AI.git
cd Remodely.AI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Initialize database
npm run db:generate
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.
- **Review System**: Rate and review contractors
- **Payment Integration**: Secure payments with Stripe
- **Messaging**: Direct communication between users
- **Admin Panel**: Platform management and moderation

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Remodely.AI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL, NextAuth secret, and Stripe keys.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── contractors/       # Contractor-related pages
│   ├── dashboard/         # User dashboards
│   └── api/              # API routes
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── home/             # Landing page components
│   └── ui/               # UI components
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## Key Pages

- `/` - Landing page
- `/contractors` - Contractor directory
- `/dashboard` - User dashboard (role-based)
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

## Database Schema

The application uses the following main models:

- **User**: Base user model with role-based access
- **Contractor**: Contractor-specific profile data
- **Customer**: Customer-specific profile data
- **Quote**: Quote requests and responses
- **Booking**: Scheduled services
- **Review**: Customer reviews and ratings
- **Portfolio**: Contractor work showcases

## Deployment

The application is designed to be deployed on:

- **Frontend**: Vercel (recommended)
- **Database**: Railway, Supabase, or AWS RDS
- **File Storage**: AWS S3 or similar

## Development

### Key Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
```

### Adding New Features

1. Create database models in `prisma/schema.prisma`
2. Generate Prisma client: `npm run db:generate`
3. Create API routes in `app/api/`
4. Build UI components in `components/`
5. Add pages in `app/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 
