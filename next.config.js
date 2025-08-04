/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bulletproof build configuration
  experimental: {
    optimizePackageImports: ['lucide-react', '@googlemaps/js-api-loader'],
    serverComponentsExternalPackages: ['@prisma/client'],
  },

  // Fix hydration issues
  swcMinify: true,
  reactStrictMode: false, // Temporarily disable strict mode

  // Image optimization
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Enhanced webpack config
  webpack: (config, { dev, isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    }

    // Better error handling in development
    if (dev && !isServer) {
      config.devtool = 'cheap-module-source-map';
    }

    return config
  },

  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Ensure proper server configuration
  async rewrites() {
    return []
  },

  // On-demand entries config (move here)
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
