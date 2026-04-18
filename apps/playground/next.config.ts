import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@pcg/ui", "@pcg/tokens"],
};

export default nextConfig;
