import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['nodemailer', 'mongodb'],
};

export default nextConfig;
