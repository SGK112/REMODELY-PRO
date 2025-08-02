import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { dimensions: string } }
) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category') || 'default'

        const [width, height] = params.dimensions.split('x').map(Number)

        if (!width || !height || width > 1200 || height > 800) {
            throw new Error('Invalid dimensions')
        }

        // Generate professional category-specific SVG placeholder
        const svg = generateProfessionalPlaceholder(width, height, category)

        return new NextResponse(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=31536000, immutable',
                'X-Content-Type-Options': 'nosniff'
            },
        })
    } catch (error) {
        console.error('Placeholder generation error:', error)

        // Return a professional default SVG
        const defaultSvg = generateProfessionalPlaceholder(300, 200, 'default')

        return new NextResponse(defaultSvg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=3600',
            },
        })
    }
}

function generateProfessionalPlaceholder(width: number, height: number, category: string): string {
    const placeholderConfig = getPlaceholderConfig(category)
    const iconSize = Math.min(width, height) * 0.2
    const fontSize = Math.min(width, height) * 0.08

    return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
            <defs>
                <linearGradient id="grad-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${placeholderConfig.gradient.start};stop-opacity:1" />
                    <stop offset="50%" style="stop-color:${placeholderConfig.gradient.middle};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${placeholderConfig.gradient.end};stop-opacity:1" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <dropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.1)"/>
                </filter>
                <pattern id="pattern-${category}" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                    <rect width="40" height="40" fill="url(#grad-${category})"/>
                    <rect x="0" y="0" width="20" height="20" fill="rgba(255,255,255,0.05)"/>
                    <rect x="20" y="20" width="20" height="20" fill="rgba(255,255,255,0.05)"/>
                </pattern>
            </defs>
            
            <!-- Background -->
            <rect width="100%" height="100%" fill="url(#pattern-${category})" rx="8"/>
            
            <!-- Professional overlay -->
            <rect width="100%" height="100%" fill="rgba(255,255,255,0.05)" rx="8"/>
            
            <!-- Icon -->
            <g transform="translate(${width / 2}, ${height / 2 - iconSize * 0.6})">
                ${placeholderConfig.icon(iconSize)}
            </g>
            
            <!-- Text -->
            <text x="50%" y="${height / 2 + iconSize * 0.6}" 
                  font-family="Inter, system-ui, -apple-system, sans-serif" 
                  font-size="${fontSize}" 
                  font-weight="600"
                  fill="rgba(255,255,255,0.9)" 
                  text-anchor="middle" 
                  dominant-baseline="middle">
                ${placeholderConfig.label}
            </text>
            
            <!-- Dimensions indicator -->
            <text x="50%" y="${height - 15}" 
                  font-family="Inter, system-ui, sans-serif" 
                  font-size="10" 
                  font-weight="400"
                  fill="rgba(255,255,255,0.6)" 
                  text-anchor="middle">
                ${width} × ${height}
            </text>
            
            <!-- Corner accent -->
            <path d="M0,0 L20,0 L0,20 Z" fill="rgba(255,255,255,0.1)"/>
            <path d="M${width},${height} L${width - 20},${height} L${width},${height - 20} Z" fill="rgba(0,0,0,0.1)"/>
        </svg>
    `
}

function getPlaceholderConfig(category: string) {
    const configs = {
        'contractor-profile': {
            gradient: { start: '#6366f1', middle: '#8b5cf6', end: '#0ea5e9' },
            label: 'Contractor Profile',
            icon: (size: number) => `
                <circle cx="0" cy="0" r="${size * 0.4}" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
                <circle cx="0" cy="-${size * 0.1}" r="${size * 0.15}" fill="rgba(255,255,255,0.3)"/>
                <path d="M-${size * 0.2},${size * 0.1} Q0,${size * 0.3} ${size * 0.2},${size * 0.1}" fill="rgba(255,255,255,0.3)"/>
            `
        },
        'contractor-business': {
            gradient: { start: '#0ea5e9', middle: '#3b82f6', end: '#6366f1' },
            label: 'Business Photo',
            icon: (size: number) => `
                <rect x="-${size * 0.3}" y="-${size * 0.2}" width="${size * 0.6}" height="${size * 0.4}" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
                <circle cx="-${size * 0.15}" cy="-${size * 0.05}" r="${size * 0.05}" fill="rgba(255,255,255,0.5)"/>
                <path d="M-${size * 0.25},${size * 0.1} L-${size * 0.05},${size * 0.05} L${size * 0.05},${size * 0.15} L${size * 0.25},${size * 0.1}" fill="rgba(255,255,255,0.3)"/>
            `
        },
        'granite-countertop': {
            gradient: { start: '#64748b', middle: '#475569', end: '#334155' },
            label: 'Granite Sample',
            icon: (size: number) => `
                <rect x="-${size * 0.3}" y="-${size * 0.15}" width="${size * 0.6}" height="${size * 0.3}" rx="6" fill="rgba(255,255,255,0.2)"/>
                <circle cx="-${size * 0.1}" cy="-${size * 0.05}" r="2" fill="rgba(255,255,255,0.4)"/>
                <circle cx="${size * 0.1}" cy="${size * 0.05}" r="1.5" fill="rgba(255,255,255,0.3)"/>
                <circle cx="0" cy="-${size * 0.08}" r="1" fill="rgba(255,255,255,0.5)"/>
            `
        },
        'quartz-countertop': {
            gradient: { start: '#f8fafc', middle: '#e2e8f0', end: '#cbd5e1' },
            label: 'Quartz Sample',
            icon: (size: number) => `
                <rect x="-${size * 0.3}" y="-${size * 0.15}" width="${size * 0.6}" height="${size * 0.3}" rx="6" fill="rgba(100,116,139,0.3)"/>
                <rect x="-${size * 0.25}" y="-${size * 0.1}" width="${size * 0.5}" height="${size * 0.2}" rx="3" fill="rgba(255,255,255,0.8)"/>
                <circle cx="-${size * 0.05}" cy="0" r="1" fill="rgba(100,116,139,0.4)"/>
                <circle cx="${size * 0.08}" cy="-${size * 0.03}" r="0.8" fill="rgba(100,116,139,0.3)"/>
            `
        },
        'kitchen-project': {
            gradient: { start: '#10b981', middle: '#059669', end: '#047857' },
            label: 'Kitchen Project',
            icon: (size: number) => `
                <rect x="-${size * 0.25}" y="-${size * 0.2}" width="${size * 0.5}" height="${size * 0.15}" rx="2" fill="rgba(255,255,255,0.2)"/>
                <rect x="-${size * 0.3}" y="-${size * 0.05}" width="${size * 0.6}" height="${size * 0.25}" rx="4" fill="rgba(255,255,255,0.1)"/>
                <rect x="-${size * 0.1}" y="${size * 0.05}" width="${size * 0.2}" height="${size * 0.08}" rx="1" fill="rgba(255,255,255,0.3)"/>
                <circle cx="0" cy="${size * 0.09}" r="2" fill="rgba(255,255,255,0.4)"/>
            `
        },
        'manufacturer-logo': {
            gradient: { start: '#fbbf24', middle: '#f59e0b', end: '#d97706' },
            label: 'Brand Logo',
            icon: (size: number) => `
                <circle cx="0" cy="0" r="${size * 0.3}" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
                <text x="0" y="0" font-family="serif" font-size="${size * 0.25}" font-weight="bold" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">B</text>
            `
        },
        'default': {
            gradient: { start: '#6b7280', middle: '#9ca3af', end: '#d1d5db' },
            label: 'Professional Image',
            icon: (size: number) => `
                <rect x="-${size * 0.25}" y="-${size * 0.2}" width="${size * 0.5}" height="${size * 0.4}" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <circle cx="-${size * 0.1}" cy="-${size * 0.08}" r="${size * 0.05}" fill="rgba(255,255,255,0.4)"/>
                <path d="M-${size * 0.2},${size * 0.1} L${size * 0.2},${size * 0.1} L${size * 0.1},-${size * 0.05} L-${size * 0.05},${size * 0.05} Z" fill="rgba(255,255,255,0.3)"/>
            `
        }
    }

    return configs[category as keyof typeof configs] || configs.default
}
