// One-off: turn the white-background logo JPG into clean transparent PNGs.
// Produces two assets used by the nav:
//   logo-mark.png        — full-colour (red/black) ink on transparency
//   logo-mark-white.png  — white silhouette of the same ink (for the dark bar)
import sharp from "sharp"

const SRC = "public/images/logo-red.jpg"

// 1) trim the white frame, normalise size
const trimmed = await sharp(SRC)
  .trim({ background: "#ffffff", threshold: 30 })
  .toBuffer()

const { data, info } = await sharp(trimmed)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const colour = Buffer.from(data) // full-colour ink
const white = Buffer.from(data) // white silhouette

// soft white-key: luminance 236 -> fully transparent, 200 -> fully opaque.
// Keyed a touch aggressively so no off-white halo/box survives on the white hero.
const HI = 236
const LO = 200
for (let i = 0; i < data.length; i += channels) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  let a
  if (lum >= HI) a = 0
  else if (lum <= LO) a = 255
  else a = Math.round(255 * (1 - (lum - LO) / (HI - LO)))

  colour[i + 3] = a

  // white version: same alpha shape, but ink painted pure white
  white[i] = 255
  white[i + 1] = 255
  white[i + 2] = 255
  white[i + 3] = a
}

const opts = { raw: { width, height, channels } }
await sharp(colour, opts).png().toFile("public/images/logo-mark.png")
await sharp(white, opts).png().toFile("public/images/logo-mark-white.png")
console.log(`done ${width}x${height}`)
