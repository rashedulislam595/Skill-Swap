import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/dashboard/admin",
        destination: "/dashboard/Admin",
      },
      {
        source: "/dashboard/admin/:path*",
        destination: "/dashboard/Admin/:path*",
      },
    ];
  },
};

export default nextConfig;
