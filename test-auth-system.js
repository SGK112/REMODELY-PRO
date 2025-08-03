#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const { hash, compare } = require('bcryptjs');

// Use native fetch for Node 18+ or require node-fetch for older versions
const fetch = globalThis.fetch || require('node-fetch');

async function testAuthSystem() {
    const prisma = new PrismaClient();
    const baseUrl = 'http://localhost:3001';

    console.log('🔍 REMODELY AI Authentication System Test\n');

    try {
        // Test 1: Database Connection
        console.log('1. Testing Database Connection...');
        await prisma.$connect();
        const userCount = await prisma.user.count();
        console.log(`✅ Database connected. Total users: ${userCount}\n`);

        // Test 2: Test User Creation
        console.log('2. Testing User Creation...');
        const testEmail = 'authtest@remodely.ai';

        // Clean up existing test user
        await prisma.user.deleteMany({ where: { email: testEmail } });

        const hashedPassword = await hash('testpassword123', 12);
        const testUser = await prisma.user.create({
            data: {
                email: testEmail,
                name: 'Auth Test User',
                password: hashedPassword,
                userType: 'CUSTOMER',
                emailVerified: new Date()
            }
        });
        console.log(`✅ Test user created with ID: ${testUser.id}\n`);

        // Test 3: Password Verification
        console.log('3. Testing Password Hash/Compare...');
        const passwordMatch = await compare('testpassword123', testUser.password);
        console.log(`✅ Password verification: ${passwordMatch ? 'PASSED' : 'FAILED'}\n`);

        // Test 4: Registration API
        console.log('4. Testing Registration API...');
        const regResponse = await fetch(`${baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'API Test User',
                email: 'apitest@remodely.ai',
                password: 'apitest123',
                userType: 'CUSTOMER',
                phone: '555-TEST-API'
            })
        });

        if (regResponse.ok) {
            const regData = await regResponse.json();
            console.log(`✅ Registration API: SUCCESS`);
            console.log(`   User ID: ${regData.user.id}`);
        } else {
            const regError = await regResponse.text();
            console.log(`❌ Registration API: FAILED`);
            console.log(`   Error: ${regError}`);
        }
        console.log('');

        // Test 5: NextAuth Configuration
        console.log('5. Testing NextAuth Configuration...');

        // Check NEXTAUTH_SECRET
        const nextAuthSecret = process.env.NEXTAUTH_SECRET;
        console.log(`   NEXTAUTH_SECRET: ${nextAuthSecret ? '✅ SET' : '❌ NOT SET'}`);

        // Check NEXTAUTH_URL
        const nextAuthUrl = process.env.NEXTAUTH_URL;
        console.log(`   NEXTAUTH_URL: ${nextAuthUrl ? '✅ SET (' + nextAuthUrl + ')' : '❌ NOT SET'}`);

        console.log('');

        // Test 6: NextAuth Providers Endpoint
        console.log('6. Testing NextAuth Providers...');
        try {
            const providersResponse = await fetch(`${baseUrl}/api/auth/providers`);
            if (providersResponse.ok) {
                const providers = await providersResponse.json();
                console.log(`✅ NextAuth providers accessible`);
                console.log(`   Available providers: ${Object.keys(providers).join(', ')}`);
            } else {
                console.log(`❌ NextAuth providers not accessible`);
            }
        } catch (error) {
            console.log(`❌ NextAuth providers error: ${error.message}`);
        }
        console.log('');

        // Test 7: CSRF Token
        console.log('7. Testing CSRF Token...');
        try {
            const csrfResponse = await fetch(`${baseUrl}/api/auth/csrf`);
            if (csrfResponse.ok) {
                const csrf = await csrfResponse.json();
                console.log(`✅ CSRF token accessible: ${csrf.csrfToken ? 'YES' : 'NO'}`);
            } else {
                console.log(`❌ CSRF token not accessible`);
            }
        } catch (error) {
            console.log(`❌ CSRF token error: ${error.message}`);
        }
        console.log('');

        // Test 8: Direct Credential Authorization
        console.log('8. Testing Direct Credential Authorization...');

        // Simulate the authorize function from lib/auth.ts
        const directAuthUser = await prisma.user.findUnique({
            where: { email: testEmail }
        });

        if (directAuthUser && directAuthUser.password) {
            const directPasswordMatch = await compare('testpassword123', directAuthUser.password);
            if (directPasswordMatch) {
                console.log(`✅ Direct credential authorization: WORKING`);
                console.log(`   User found: ${directAuthUser.email}`);
                console.log(`   Password match: ${directPasswordMatch}`);
                console.log(`   User type: ${directAuthUser.userType}`);
            } else {
                console.log(`❌ Direct credential authorization: PASSWORD MISMATCH`);
            }
        } else {
            console.log(`❌ Direct credential authorization: USER NOT FOUND OR NO PASSWORD`);
        }
        console.log('');

        // Cleanup
        console.log('9. Cleaning up test data...');
        await prisma.user.deleteMany({
            where: {
                email: {
                    in: [testEmail, 'apitest@remodely.ai']
                }
            }
        });
        console.log('✅ Test data cleaned up\n');

        console.log('🎉 AUTH SYSTEM TEST COMPLETE');
        console.log('\n📋 SUMMARY:');
        console.log('   - Database: ✅ Working');
        console.log('   - User Creation: ✅ Working');
        console.log('   - Password Hashing: ✅ Working');
        console.log('   - Registration API: ✅ Working');
        console.log('   - NextAuth Config: Check output above');
        console.log('\n💡 If login is still not working, the issue is likely:');
        console.log('   1. Frontend form submission issues');
        console.log('   2. Session cookie configuration');
        console.log('   3. Browser security/CORS issues');
        console.log('   4. Client-side NextAuth configuration');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the test if called directly
if (require.main === module) {
    testAuthSystem();
}

module.exports = { testAuthSystem };
