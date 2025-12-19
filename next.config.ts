import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize images for Vercel - Mobile-first optimization
  images: {
    unoptimized: false, // Enable optimization for better performance
    formats: ['image/webp', 'image/avif'], // Modern formats for faster loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Mobile-first sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
    // Note: quality is set per Image component, not in config
  },
  // Production optimizations - Enhanced for mobile
  compress: true,
  poweredByHeader: false,
  // Note: swcMinify is deprecated in Next.js 15 - SWC is now the default minifier
  reactStrictMode: true,
  // Force HTTPS in production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  // TypeScript and ESLint - errors are now fixed
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint during builds to avoid circular structure error
  },
  // Experimental features to fix chunk loading issues
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // Disable optimizeCss - requires critters package which isn't installed
    // optimizeCss: true,
  },
  // Server components external packages (moved from experimental in Next.js 15)
  serverComponentsExternalPackages: [],
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Webpack configuration - minimal to avoid chunk loading issues
  webpack: (config, { isServer }) => {
    // Ensure proper module resolution for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // Output configuration - Vercel handles this automatically, don't override
};

export default nextConfig;
