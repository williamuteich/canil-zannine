import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    qualities: [25, 30, 50, 75],
  },
};

export default nextConfig;
