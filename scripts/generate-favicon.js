const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
    try {
        // Create a 32x32 PNG with RA branding
        const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6"/>
            <stop offset="100%" style="stop-color:#6366F1"/>
          </linearGradient>
        </defs>
        <path d="M8 8h6c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.5L19 20h-3l-2.5-4H10v4H8V8z M10 10v4h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4z" fill="white"/>
        <path d="M20 20h2l1-3h4l1 3h2l-4-12h-2l-4 12z M24 13l1.5 4h-3l1.5-4z" fill="white"/>
      </svg>
    `;

        // Generate favicon.ico
        await sharp(Buffer.from(svg))
            .resize(32, 32)
            .png()
            .toFile(path.join(__dirname, '../public/favicon.ico'));

        console.log('Favicon generated successfully!');
    } catch (error) {
        console.error('Error generating favicon:', error);
    }
}

if (require.main === module) {
    generateFavicon();
}
