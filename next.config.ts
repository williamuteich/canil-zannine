import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    qualities: [25, 30, 50, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yycibbwwnwebxxbbkxzc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
