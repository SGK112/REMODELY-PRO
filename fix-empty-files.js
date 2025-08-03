#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const emptyFiles = [
    { path: 'app/smart-matching/page.tsx', type: 'page' },
    { path: 'app/voice-consultation/page.tsx', type: 'page' },
    { path: 'app/for-contractors/page.tsx', type: 'page' },
    { path: 'app/for-commercial/page.tsx', type: 'page' },
    { path: 'app/signup/page.tsx', type: 'page' },
    { path: 'app/marketplace/sell/page.tsx', type: 'page' },
    { path: 'app/marketplace/page.tsx', type: 'page' },
    { path: 'app/for-designers/page.tsx', type: 'page' },
    { path: 'app/for-homeowners/page.tsx', type: 'page' },
    { path: 'app/test-ai/page.tsx', type: 'page' },
    { path: 'app/api/matching/route.ts', type: 'api' },
    { path: 'app/api/marketplace/products/route.ts', type: 'api' },
    { path: 'app/api/marketplace/products/[id]/route.ts', type: 'api' },
    { path: 'app/api/marketplace/orders/route.ts', type: 'api' },
    { path: 'app/api/marketplace/stats/route.ts', type: 'api' }
];

const getPageTemplate = (title) => `export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">${title}</h1>
      <p className="mt-4">Coming soon...</p>
    </div>
  )
}`;

const getApiTemplate = () => `import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'API endpoint - coming soon' })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'API endpoint - coming soon' })
}`;

emptyFiles.forEach(file => {
    const filePath = path.join(__dirname, file.path);

    if (fs.existsSync(filePath) && fs.statSync(filePath).size === 0) {
        const title = path.basename(file.path, path.extname(file.path))
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const content = file.type === 'page'
            ? getPageTemplate(title)
            : getApiTemplate();

        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed: ${file.path}`);
    }
});

console.log('🎉 All empty files fixed!');
