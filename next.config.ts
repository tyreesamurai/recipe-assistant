import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/recipes",
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
