import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const width = searchParams.get('width') || '400'
    const height = searchParams.get('height') || '300'
    const category = searchParams.get('category') || 'general'
    const text = searchParams.get('text') || ''

    // Generate SVG placeholder
    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
         xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="2" y="2" width="${Number(width) - 4}" height="${Number(height) - 4}" 
            fill="none" stroke="#d1d5db" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="50%" y="45%" text-anchor="middle" font-family="system-ui, sans-serif" 
            font-size="14" fill="#6b7280">
        ${category.toUpperCase()}
      </text>
      <text x="50%" y="55%" text-anchor="middle" font-family="system-ui, sans-serif" 
            font-size="12" fill="#9ca3af">
        ${width}×${height}
      </text>
      ${text ? `
        <text x="50%" y="65%" text-anchor="middle" font-family="system-ui, sans-serif" 
              font-size="10" fill="#9ca3af">
          ${text}
        </text>
      ` : ''}
    </svg>
  `

    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}
