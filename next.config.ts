import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Allow the higher-quality renditions used for the photography (Next 16
    // requires non-default qualities to be allow-listed).
    qualities: [75, 92],
    // Photos uploaded through the admin portal are served from Supabase Storage.
    remotePatterns: [
      { protocol: "https", hostname: "qdrgckquhklsnptkshsy.supabase.co" },
    ],
  },
}

export default nextConfig
