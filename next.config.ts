import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "media.giphy.com",
      "lh3.googleusercontent.com",
      "utfs.io",
      "alhaymex.com",
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.alhaymex.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
