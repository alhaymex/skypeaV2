import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["media.giphy.com", "lh3.googleusercontent.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<subdomain>[^.]+).yourdomain.com",
          },
        ],
        destination: "/app/:subdomain/:path*",
      },
    ];
  },
};

export default nextConfig;
