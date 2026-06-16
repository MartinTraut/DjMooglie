// Generates public/og.png (1200x630) — the social/OG sharing card for DJ Mooglie.
// Builds an SVG and rasterizes it via sharp, then composites the freestanding
// white logo mark on top. Run: node scripts/make-og.mjs
import sharp from "sharp"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { existsSync, statSync } from "node:fs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")
const out = resolve(root, "public/og.png")
const logoPath = resolve(root, "public/images/logo-mark-white.png")

const W = 1200
const H = 630

// Brand red — matches --brand oklch(0.565 0.232 27) ≈ #e01717
const BRAND = "#e01717"
const BG = "#0a0a0a"
const INK = "#f7f7f7"
const MUTE = "#a3a3a3"

// XML-escape helper for any dynamic text.
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;")

const wordmark = "MOOGLI"
const tagline = "Urban & Hip-Hop DJ · Frankfurt"
const genres = "Hip-Hop · R'n'B · Afro · Baile Funk · Latin"

// System sans stack keeps rendering deterministic without bundling fonts.
const FONT =
  "'Helvetica Neue', 'Arial Narrow', Arial, 'Segoe UI', system-ui, sans-serif"

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="spot" cx="50%" cy="8%" r="85%">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="${BRAND}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#spot)"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>

  <!-- Brand frame, safe-zone aligned -->
  <rect x="48" y="48" width="${W - 96}" height="${H - 96}" fill="none"
        stroke="${BRAND}" stroke-opacity="0.28" stroke-width="2"/>

  <!-- Kicker -->
  <text x="120" y="190" font-family="${FONT}" font-size="26" font-weight="700"
        letter-spacing="10" fill="${MUTE}" text-transform="uppercase">DJ MOOGLIE</text>

  <!-- Wordmark -->
  <text x="116" y="380" font-family="${FONT}" font-size="220" font-weight="900"
        letter-spacing="6" fill="${BRAND}">${esc(wordmark)}</text>

  <!-- Red rule -->
  <rect x="120" y="430" width="320" height="5" fill="${BRAND}"/>

  <!-- Tagline -->
  <text x="120" y="500" font-family="${FONT}" font-size="40" font-weight="700"
        letter-spacing="1" fill="${INK}">${esc(tagline)}</text>

  <!-- Genres -->
  <text x="120" y="546" font-family="${FONT}" font-size="28" font-weight="500"
        letter-spacing="3" fill="${MUTE}">${esc(genres)}</text>
</svg>`

async function main() {
  // Rasterize SVG at high density for crisp text, then resize to exact frame.
  let img = sharp(Buffer.from(svg), { density: 200 }).resize(W, H, { fit: "fill" })

  // Composite the white logo mark, top-right, inside the safe zone.
  if (existsSync(logoPath)) {
    const logoW = 230
    const logo = await sharp(logoPath)
      .resize({ width: logoW })
      .ensureAlpha()
      // soften the mark to ~70% so it reads as a quiet accent, not a 2nd focal point
      .composite([
        {
          input: Buffer.from([0, 0, 0, 175]),
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: "dest-in",
        },
      ])
      .toBuffer()
    img = img.composite([{ input: logo, top: 100, left: W - logoW - 110 }])
  }

  await img.png().toFile(out)

  const { size } = statSync(out)
  const final = await sharp(out).metadata()
  console.log(
    `og.png written: ${out}\n  ${final.width}x${final.height}px, ${(size / 1024).toFixed(1)} KB`
  )
  if (final.width !== W || final.height !== H) {
    throw new Error(`Unexpected dimensions ${final.width}x${final.height}`)
  }
}

main().catch((err) => {
  console.error("make-og failed:", err)
  process.exit(1)
})
