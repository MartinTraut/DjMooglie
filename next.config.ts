import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Allow the higher-quality renditions used for the photography (Next 16
    // requires non-default qualities to be allow-listed).
    qualities: [75, 92],
  },
}

export default nextConfig
