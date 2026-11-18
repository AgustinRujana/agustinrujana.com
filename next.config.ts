import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pre-render every page to static HTML in /out: fast, cheap to host and fully crawlable.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
