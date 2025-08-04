const fs = require('fs')
const path = require('path')

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images')
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
}

// Create SVG placeholder for default contractor
const contractorSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e5e7eb"/>
  <circle cx="100" cy="70" r="25" fill="#9ca3af"/>
  <rect x="75" y="110" width="50" height="60" rx="25" fill="#9ca3af"/>
  <text x="100" y="180" font-family="Arial" font-size="12" fill="#6b7280" text-anchor="middle">
    Contractor
  </text>
</svg>`

// Convert SVG to base64 data URL and save as a simple HTML file that can be used
const contractorDataUrl = `data:image/svg+xml;base64,${Buffer.from(contractorSvg).toString('base64')}`

console.log('Placeholder images setup complete!')
console.log('Add this to your ImageService fallback:', contractorDataUrl)
