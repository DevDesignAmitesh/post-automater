import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      // Exclude specific modules from server-side rendering
      config.externals = [
        ...config.externals,
        'puppeteer', // Add puppeteer if it's causing issues
        'puppeteer-extra-plugin-stealth', // Add any other client-side-only module
      ];
    }
    return config;
  },
};

export default nextConfig;
