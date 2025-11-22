import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    qualities: [25, 30, 50, 75],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/api/uploads/:path*',
      },
      {
        source: '/imagens/:path*',
        destination: '/api/imagens/:path*',
      },
    ];
  },
};

export default nextConfig;
