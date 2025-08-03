#!/bin/bash

# REMODELY PRO - Complete Development Setup
echo "🏗️  REMODELY PRO - Complete Development Setup"
echo "=============================================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update .env with your API keys"
else
    echo "✅ Environment file found"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Database setup
echo "🗄️  Setting up database..."
npm run db:generate
npm run db:push

# Create test users if they don't exist
echo "👥 Creating test users..."
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function setupTestUsers() {
  try {
    // Check if users already exist
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      console.log('✅ Test users already exist');
      return;
    }

    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create customer user
    const customerUser = await prisma.user.create({
      data: {
        email: 'customer@test.com',
        name: 'John Customer',
        password: hashedPassword,
        userType: 'CUSTOMER',
        phoneVerified: true
      }
    });

    await prisma.customer.create({
      data: {
        userId: customerUser.id,
        firstName: 'John',
        lastName: 'Customer',
        phone: '555-0123',
        address: '123 Main St',
        city: 'Phoenix',
        state: 'AZ',
        zipCode: '85001'
      }
    });

    // Create contractor user
    const contractorUser = await prisma.user.create({
      data: {
        email: 'contractor@test.com',
        name: 'Jane Contractor',
        password: hashedPassword,
        userType: 'CONTRACTOR',
        phoneVerified: true
      }
    });

    await prisma.contractor.create({
      data: {
        userId: contractorUser.id,
        businessName: 'Premium Remodeling LLC',
        description: 'Professional home remodeling services',
        serviceArea: JSON.stringify(['Phoenix', 'Scottsdale', 'Tempe']),
        specialties: JSON.stringify(['Kitchen Remodeling', 'Bathroom Renovation', 'Flooring']),
        yearsExperience: 10,
        phone: '555-0456',
        city: 'Phoenix',
        state: 'AZ',
        isVerified: true,
        rating: 4.8,
        reviewCount: 25
      }
    });

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@test.com',
        name: 'Admin User',
        password: hashedPassword,
        userType: 'ADMIN',
        phoneVerified: true
      }
    });

    console.log('✅ Test users created successfully');
  } catch (error) {
    console.log('⚠️  Users may already exist or error occurred:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

setupTestUsers();
"

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "📧 Test Login Credentials:"
echo "   Customer: customer@test.com / password123"
echo "   Contractor: contractor@test.com / password123"
echo "   Admin: admin@test.com / password123"
echo ""
echo "🌐 Development URLs:"
echo "   Main App: http://localhost:3001"
echo "   Login: http://localhost:3001/auth/login"
echo "   Register: http://localhost:3001/auth/register"
echo ""
echo "🔧 To start development:"
echo "   npm run dev"
echo ""
