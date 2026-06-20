/**
 * One-time seed: pushes the current website copy into Sanity so every section
 * in the Studio is populated (no more empty lists). Idempotent — deterministic
 * _ids + createOrReplace, so re-running just overwrites, never duplicates.
 *
 * Run:  set -a; source .env.local; set +a; npx tsx scripts/seed.ts
 * Needs SANITY_WRITE_TOKEN (Editor) in .env.local.
 */
import { createClient } from "@sanity/client"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  siteText,
  soundPillars,
  statItems,
  faqItems,
  reviews,
} from "../lib/content"
import { site } from "../lib/site"

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error("✖ SANITY_WRITE_TOKEN fehlt in .env.local")
  process.exit(1)
}

const client = createClient({
  projectId: "crlfzak1",
  dataset: "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
})

const pub = join(process.cwd(), "public")

/** Upload a /public image and return an image field value (Sanity dedupes by hash). */
async function uploadImage(rel: string, key?: string) {
  const buf = readFileSync(join(pub, rel))
  const asset = await client.assets.upload("image", buf, {
    filename: rel.split("/").pop(),
  })
  const value: Record<string, unknown> = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  }
  if (key) value._key = key
  return value
}

async function run() {
  // 0) Upload the current photos so each section's image shows up in the Studio.
  const heroImage = await uploadImage("images/hero-cutout.png")
  const aboutImage = await uploadImage("images/boombox.jpg")
  const statsImage = await uploadImage("images/about.jpg")
  const boomboxImage = await uploadImage("images/boombox-duo.png")
  const epkImages = []
  for (const f of ["press-1.jpg", "press-2.jpg", "press-3.jpg", "press-4.jpg"]) {
    epkImages.push(await uploadImage(`images/${f}`, f))
  }
  console.log("✓ Bilder hochgeladen")

  // 1) General copy + images (singleton)
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    heroBio: siteText.heroBio,
    soundIntro: siteText.soundIntro,
    aboutTitle: siteText.aboutTitle,
    aboutTitleAccent: siteText.aboutTitleAccent,
    aboutBody: siteText.aboutBody,
    regions: siteText.regions,
    statsQuote: siteText.statsQuote,
    heroImage,
    aboutImage,
    statsImage,
    boomboxImage,
    epkImages,
  })
  console.log("✓ Texte / Allgemein + Bilder")

  // 2) Sound pillars
  for (let i = 0; i < soundPillars.length; i++) {
    const p = soundPillars[i]
    await client.createOrReplace({
      _id: `pillar-${i + 1}`,
      _type: "soundPillar",
      title: p.title,
      text: p.text,
      order: i + 1,
    })
  }
  console.log(`✓ Sound-Punkte (${soundPillars.length})`)

  // 3) Stats
  for (let i = 0; i < statItems.length; i++) {
    const s = statItems[i]
    await client.createOrReplace({
      _id: `stat-${i + 1}`,
      _type: "statItem",
      value: s.value,
      label: s.label,
      order: i + 1,
    })
  }
  console.log(`✓ Kennzahlen (${statItems.length})`)

  // 4) Mixtapes
  for (let i = 0; i < site.mixtapes.length; i++) {
    const m = site.mixtapes[i]
    await client.createOrReplace({
      _id: `mixtape-${i + 1}`,
      _type: "mixtape",
      title: m.title,
      description: m.desc,
      tag: m.tag,
      href: m.href,
      order: i + 1,
    })
  }
  console.log(`✓ Mixtapes (${site.mixtapes.length})`)

  // 5) FAQ
  for (let i = 0; i < faqItems.length; i++) {
    const f = faqItems[i]
    await client.createOrReplace({
      _id: `faq-${i + 1}`,
      _type: "faqItem",
      question: f.question,
      answer: f.answer,
      order: i + 1,
    })
  }
  console.log(`✓ FAQ (${faqItems.length})`)

  // 6) Reviews (placeholder — DJ replaces with real ones)
  for (let i = 0; i < reviews.length; i++) {
    const r = reviews[i]
    await client.createOrReplace({
      _id: `review-${i + 1}`,
      _type: "review",
      quote: r.quote,
      author: r.author,
      role: r.role,
      rating: r.rating,
      order: i + 1,
    })
  }
  console.log(`✓ Rezensionen (${reviews.length})`)

  console.log("\nFertig — Sanity ist befüllt.")
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
