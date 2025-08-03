const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Remodely.AI Development Server...\n');

// Check Node.js version
const nodeVersion = process.version;
console.log(`📋 Node.js version: ${nodeVersion}`);

if (parseInt(nodeVersion.slice(1)) < 20) {
    console.error('❌ Node.js version 20+ required. Current version:', nodeVersion);
    process.exit(1);
}

// Kill existing processes on port 3000
console.log('🔍 Checking for existing processes on port 3000...');
try {
    execSync('lsof -ti:3000 | xargs kill -9 2>/dev/null || true', { stdio: 'pipe' });
    console.log('✅ Cleared any existing processes on port 3000');
} catch (error) {
    console.log('✅ No existing processes found on port 3000');
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
    console.error('❌ package.json not found. Make sure you\'re in the project root directory.');
    process.exit(1);
}

// Install dependencies if node_modules doesn't exist
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully');
    } catch (error) {
        console.error('❌ Failed to install dependencies:', error.message);
        process.exit(1);
    }
}

// Setup environment file
const envFiles = ['.env.local', '.env'];
const hasEnvFile = envFiles.some(file => fs.existsSync(file));

if (!hasEnvFile) {
    console.log('⚙️ Setting up environment file...');
    if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env.local');
        console.log('✅ Created .env.local from .env.example');
    } else {
        console.log('⚠️ No .env.example found. You may need to create environment variables manually.');
    }
}

// Clear Next.js cache
console.log('🧹 Clearing Next.js cache...');
try {
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
    }
    console.log('✅ Cache cleared');
} catch (error) {
    console.log('⚠️ Could not clear cache:', error.message);
}

// Setup database
console.log('🗄️ Setting up database...');
try {
    execSync('npm run db:generate', { stdio: 'inherit' });
    execSync('npm run db:push', { stdio: 'inherit' });
    console.log('✅ Database setup complete');
} catch (error) {
    console.error('⚠️ Database setup failed:', error.message);
    console.log('Continuing with server startup...');
}

// Start the development server
console.log('\n🎯 Starting development server...');
console.log('🌐 Server will be available at: http://localhost:3000');
console.log('📱 Press Ctrl+C to stop the server\n');

const server = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
});

server.on('error', (error) => {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
});

server.on('close', (code) => {
    console.log(`\n🛑 Server stopped with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill('SIGINT');
    process.exit(0);
});
