const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC minifier for faster builds
  productionBrowserSourceMaps: false, // Disable source maps in production for faster builds
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.com',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: 'pbxt.replicate.delivery',
      },
    ],
  },
  // Optimize build performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@11labs/react'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
