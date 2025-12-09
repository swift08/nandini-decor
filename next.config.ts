import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize images for Vercel
  images: {
    unoptimized: true, // Keep unoptimized for now due to large number of images
    formats: ['image/webp', 'image/avif'],
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
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
    ignoreDuringBuilds: false,
  },
  // Experimental features to fix chunk loading issues
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // Optimize CSS loading
    optimizeCss: true,
    // Reduce bundle size
    optimizeServerReact: true,
  },
  // Output configuration for better performance
  output: 'standalone',
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
