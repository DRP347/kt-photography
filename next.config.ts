import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Separate production QA output from an existing development server.
  distDir: process.env.KT_BUILD_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com"
      }
    ]
  }
};

export default nextConfig;
