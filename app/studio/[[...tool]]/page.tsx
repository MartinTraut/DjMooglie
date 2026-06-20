import Studio from "./Studio"

export const dynamic = "force-static"

export { metadata, viewport } from "next-sanity/studio"

/** Embedded Sanity Studio at /studio — the DJ's editing portal. */
export default function StudioPage() {
  return <Studio />
}
