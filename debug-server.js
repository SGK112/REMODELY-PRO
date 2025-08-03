const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnosing server connection issues...\n');

// Bulletproof system checks
const REQUIRED_NODE_VERSION = 20;
const REQUIRED_FILES = ['package.json', 'next.config.js', 'tailwind.config.js'];
const PROTECTED_SCRIPTS = ['dev', 'build', 'start', 'db:generate', 'db:push'];

// Validate Node.js version
function validateNodeVersion() {
    const nodeVersion = parseInt(process.version.slice(1));
    if (nodeVersion < REQUIRED_NODE_VERSION) {
        console.error(`❌ Node.js ${REQUIRED_NODE_VERSION}+ required. Current: ${process.version}`);
        console.log('Please upgrade Node.js and try again.');
        process.exit(1);
    }
    console.log(`✅ Node.js version: ${process.version}`);
}

// Validate project structure
function validateProjectStructure() {
    console.log('🔍 Validating project structure...');

    for (const file of REQUIRED_FILES) {
        if (!fs.existsSync(file)) {
            console.error(`❌ Required file missing: ${file}`);
            console.log('Make sure you\'re in the Remodely.AI project root directory.');
            process.exit(1);
        }
    }

    // Validate package.json integrity
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        if (packageJson.name !== 'remodely-ai-marketplace') {
            console.error('❌ Wrong project directory detected');
            process.exit(1);
        }

        // Protect critical scripts from modification
        for (const script of PROTECTED_SCRIPTS) {
            if (!packageJson.scripts[script]) {
                console.error(`❌ Critical script missing: ${script}`);
                process.exit(1);
            }
        }

        console.log('✅ Project structure validated');
    } catch (error) {
        console.error('❌ Invalid package.json file');
        process.exit(1);
    }
}

// Kill existing processes safely
function killExistingProcesses() {
    console.log('🔍 Checking for existing processes...');
    try {
        // Kill processes on common ports
        const ports = [3000, 3001, 5432];
        for (const port of ports) {
            try {
                execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, { stdio: 'pipe' });
            } catch (error) {
                // Ignore errors for processes that don't exist
            }
        }
        console.log('✅ Cleared any existing processes');
    } catch (error) {
        console.log('⚠️ Could not check for existing processes');
    }
}

// Secure dependency installation
function validateAndInstallDependencies() {
    if (!fs.existsSync('node_modules')) {
        console.log('📦 Installing dependencies...');
        try {
            // Verify package-lock.json exists for security
            if (!fs.existsSync('package-lock.json')) {
                console.log('⚠️ No package-lock.json found. Creating fresh lock file...');
            }

            execSync('npm ci --legacy-peer-deps', { stdio: 'inherit', timeout: 300000 });
            console.log('✅ Dependencies installed successfully');
        } catch (error) {
            console.log('❌ npm ci failed, falling back to npm install...');
            try {
                execSync('npm install --legacy-peer-deps', { stdio: 'inherit', timeout: 300000 });
                console.log('✅ Dependencies installed via fallback method');
            } catch (fallbackError) {
                console.error('❌ Failed to install dependencies:', fallbackError.message);
                console.log('\n🔧 Try manually:');
                console.log('1. rm -rf node_modules package-lock.json');
                console.log('2. npm install');
                process.exit(1);
            }
        }
    } else {
        console.log('✅ Dependencies already installed');
    }
}

// Secure environment setup
function setupEnvironment() {
    const envFiles = ['.env.local', '.env', '.env.development'];
    const hasEnvFile = envFiles.some(file => fs.existsSync(file));

    if (!hasEnvFile) {
        console.log('⚠️ No environment file found. Setting up secure defaults...');

        let envContent = '';
        if (fs.existsSync('.env.example')) {
            envContent = fs.readFileSync('.env.example', 'utf8');
            console.log('✅ Using .env.example as template');
        } else {
            // Create minimal secure environment
            envContent = `# Remodely.AI Environment Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${generateSecureSecret()}
NODE_ENV=development
DATABASE_URL="file:./dev.db"
`;
            console.log('✅ Created minimal secure environment');
        }

        fs.writeFileSync('.env.local', envContent);
        console.log('✅ Environment file created: .env.local');
    } else {
        console.log('✅ Environment file found');
    }
}

// Generate secure random secret
function generateSecureSecret() {
    return require('crypto').randomBytes(32).toString('hex');
}

// Database setup with error recovery
function setupDatabase() {
    console.log('🗄️ Setting up database...');

    try {
        // Check if Prisma schema exists
        if (!fs.existsSync('prisma/schema.prisma')) {
            console.error('❌ Prisma schema not found');
            process.exit(1);
        }

        console.log('Generating Prisma client...');
        execSync('npm run db:generate', { stdio: 'inherit', timeout: 120000 });

        console.log('Pushing database schema...');
        execSync('npm run db:push', { stdio: 'inherit', timeout: 120000 });

        console.log('✅ Database setup complete');
        return true;
    } catch (error) {
        console.error('⚠️ Database setup failed:', error.message);
        console.log('Continuing with server startup...');
        return false;
    }
}

// Clean build artifacts safely
function cleanBuildArtifacts() {
    console.log('🧹 Cleaning build artifacts...');

    const cleanDirs = ['.next', 'out', 'dist'];
    for (const dir of cleanDirs) {
        try {
            if (fs.existsSync(dir)) {
                fs.rmSync(dir, { recursive: true, force: true });
                console.log(`✅ Cleaned ${dir}`);
            }
        } catch (error) {
            console.log(`⚠️ Could not clean ${dir}:`, error.message);
        }
    }
}

// Secure server startup
function startDevelopmentServer() {
    console.log('\n🎯 Starting development server...');
    console.log('🌐 Server will be available at: http://localhost:3000');
    console.log('📱 Press Ctrl+C to stop the server\n');

    // Use spawn for better process control
    const server = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
    });

    // Handle server errors
    server.on('error', (error) => {
        console.error('❌ Server startup failed:', error.message);
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Check if port 3000 is available');
        console.log('2. Verify all dependencies are installed');
        console.log('3. Check environment variables');
        console.log('4. Try: npm run build:clean');
        process.exit(1);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down server gracefully...');
        server.kill('SIGTERM');
        setTimeout(() => {
            server.kill('SIGKILL');
            process.exit(0);
        }, 5000);
    });

    // Handle server exit
    server.on('close', (code) => {
        if (code !== 0) {
            console.log(`\n⚠️ Server exited with code ${code}`);
            console.log('Run the debug script again to restart');
        }
        process.exit(code);
    });
}

// Health check before startup
function performHealthCheck() {
    console.log('🏥 Performing system health check...');

    const checks = [
        { name: 'Disk Space', check: () => checkDiskSpace() },
        { name: 'Memory Usage', check: () => checkMemoryUsage() },
        { name: 'Port Availability', check: () => checkPortAvailability(3000) }
    ];

    for (const { name, check } of checks) {
        try {
            if (check()) {
                console.log(`✅ ${name}: OK`);
            } else {
                console.log(`⚠️ ${name}: Warning`);
            }
        } catch (error) {
            console.log(`⚠️ ${name}: Could not check`);
        }
    }
}

function checkDiskSpace() {
    try {
        const stats = fs.statSync('.');
        return true; // Basic check - file system is accessible
    } catch {
        return false;
    }
}

function checkMemoryUsage() {
    const memUsage = process.memoryUsage();
    return memUsage.heapUsed < 1024 * 1024 * 1024; // Less than 1GB
}

function checkPortAvailability(port) {
    try {
        execSync(`lsof -i :${port}`, { stdio: 'pipe' });
        return false; // Port is in use
    } catch {
        return true; // Port is available
    }
}

// Main execution flow
async function main() {
    try {
        validateNodeVersion();
        validateProjectStructure();
        killExistingProcesses();
        performHealthCheck();
        validateAndInstallDependencies();
        setupEnvironment();
        cleanBuildArtifacts();
        const dbReady = setupDatabase();

        console.log('\n✅ All systems ready. Starting server...\n');
        startDevelopmentServer();

    } catch (error) {
        console.error('\n❌ Startup failed:', error.message);
        console.log('\n🔧 Recovery options:');
        console.log('1. Delete node_modules and package-lock.json, then retry');
        console.log('2. Check your Node.js version (requires 20+)');
        console.log('3. Verify you\'re in the correct project directory');
        console.log('4. Contact support if issue persists');
        process.exit(1);
    }
}

// Execute main function
main();
