/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Allow the existing Nucleus CDN photos to be migrated cleanly.
      { protocol: 'https', hostname: 'cdn1.nucleus-cdn.church' },
    ],
  },
  experimental: {
    // Enables better tree-shaking for three.js + r3f.
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber'],
  },
};

export default nextConfig;
