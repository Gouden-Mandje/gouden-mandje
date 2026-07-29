import type { NextConfig } from "next";

/**
 * Statische export: Cloudflare Pages bouwt met `next build`
 * en serveert de `out/` map. Geen adapter nodig.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
