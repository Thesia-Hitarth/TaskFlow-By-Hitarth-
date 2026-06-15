import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-auth", "@auth/react", "@auth/core"],
};

export default nextConfig;
