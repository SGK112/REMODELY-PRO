import { NextRequest, NextResponse } from 'next/server';

// Placeholder image generator for REMODELY AI PRO
export async function GET(
    request: NextRequest,
    { params }: { params: { dimensions: string } }
) {
    try {
        const { dimensions } = params;
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || 'default';

        // Parse dimensions (e.g., "400x300" or "150x150")
        const [widthStr, heightStr] = dimensions.split('x');
        const width = parseInt(widthStr) || 400;
        const height = parseInt(heightStr) || 300;

        // Generate a simple SVG placeholder
        const svg = generatePlaceholderSVG(width, height, category);

        return new NextResponse(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Placeholder API error:', error);
        return NextResponse.json({ error: 'Failed to generate placeholder' }, { status: 500 });
    }
}

function generatePlaceholderSVG(width: number, height: number, category: string): string {
    // Professional construction-themed colors based on category
    const categoryColors = {
        'contractor-profile': { bg: '#f5f5f4', accent: '#d97706', text: '#44403c' },
        'kitchen-project': { bg: '#fef3c7', accent: '#ea580c', text: '#92400e' },
        'bathroom-project': { bg: '#ddd6fe', accent: '#7c3aed', text: '#4c1d95' },
        'flooring-project': { bg: '#ecfdf5', accent: '#10b981', text: '#047857' },
        'default': { bg: '#f1f5f9', accent: '#6366f1', text: '#475569' }
    };

    const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.default;

    const categoryIcons = {
        'contractor-profile': '👷',
        'kitchen-project': '🏠',
        'bathroom-project': '🚿',
        'flooring-project': '🔨',
        'default': '📋'
    };

    const icon = categoryIcons[category as keyof typeof categoryIcons] || categoryIcons.default;

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:0.1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)" />
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="${colors.accent}" stroke-width="2" stroke-dasharray="8,4" opacity="0.3" />
    
    <g transform="translate(${width / 2}, ${height / 2})">
      <text x="0" y="-10" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(width, height) * 0.3}" fill="${colors.accent}" opacity="0.8">
        ${icon}
      </text>
      <text x="0" y="15" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(width, height) * 0.08}" font-weight="600" fill="${colors.text}" opacity="0.7">
        ${width}×${height}
      </text>
    </g>
    
    <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(width, height) * 0.06}" font-weight="500" fill="${colors.text}" opacity="0.5">
      REMODELY AI PRO
    </text>
  </svg>`;
}
