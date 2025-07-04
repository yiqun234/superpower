import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'superpower.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
