import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  // Allow mobile phones on local network during development
  allowedDevOrigins: ['192.168.1.*', '192.168.0.*', '192.168.*', '10.*', 'localhost:*', '127.0.0.1:*'],
};

export default nextConfig;
