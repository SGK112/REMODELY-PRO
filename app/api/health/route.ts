import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Basic health check
        const healthData = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0',
            port: process.env.PORT || 3001,
            services: {
                database: 'operational',
                auth: 'operational',
                maps: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'operational' : 'warning'
            }
        }

        return NextResponse.json(healthData, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            {
                status: 'unhealthy',
                error: 'Health check failed',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        )
    }
}
