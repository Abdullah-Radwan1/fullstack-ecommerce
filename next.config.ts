import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
  },

  experimental: {
    useCache: true, // ✅ enable "use cache" directive
  },
};

export default nextConfig;
