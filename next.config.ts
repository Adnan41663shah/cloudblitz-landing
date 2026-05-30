import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['nodemailer', 'mongodb'],
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/assets/cloudblitz-logo.webp',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudblitz.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.cloudblitz.in',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
