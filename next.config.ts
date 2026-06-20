import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Allow the higher-quality renditions used for the photography (Next 16
    // requires non-default qualities to be allow-listed).
    qualities: [75, 92],
    // Photos uploaded through the Sanity Studio are served from its CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
}

export default nextConfig
