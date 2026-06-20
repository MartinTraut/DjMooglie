import { groq } from "next-sanity"
import { client } from "./client"
import { site } from "@/lib/site"
import {
  nextEvent as fallbackEvent,
  reviews as fallbackReviews,
  siteText as fallbackText,
  soundPillars as fallbackPillars,
  statItems as fallbackStats,
  faqItems as fallbackFaqs,
  type NextEvent,
  type Review,
  type SiteText,
  type SoundPillar,
  type StatItem,
  type FaqItem,
} from "@/lib/content"

export type Mixtape = { title: string; desc: string; tag: string; href: string }

export type SiteImages = {
  hero: string | null
  about: string | null
  stats: string | null
  boombox: string | null
  epk: (string | null)[]
}

const fetchOpts = { next: { revalidate: 60 } } as const

/* Each helper falls back to local content (lib/content.ts / site.ts) when
   Sanity is unreachable or still empty, so every section always renders. */

const EVENT_QUERY = groq`*[_type == "event"][0]{
  active, date, venue, city, note, ticketUrl, "image": image.asset->url
}`

export async function getNextEvent(): Promise<NextEvent> {
  try {
    const d = await client.fetch<Partial<NextEvent> | null>(EVENT_QUERY, {}, fetchOpts)
    if (d && d.date && d.venue && d.city) {
      return {
        active: d.active ?? true,
        date: d.date,
        venue: d.venue,
        city: d.city,
        note: d.note,
        ticketUrl: d.ticketUrl ?? "",
        image: d.image ?? null,
      }
    }
  } catch {
    /* fall back */
  }
  return fallbackEvent
}

const REVIEWS_QUERY = groq`*[_type == "review"] | order(coalesce(order, 999) asc, _createdAt asc){
  quote, author, role, rating
}`

export async function getReviews(): Promise<Review[]> {
  try {
    const d = await client.fetch<Review[]>(REVIEWS_QUERY, {}, fetchOpts)
    if (d && d.length > 0) return d
  } catch {
    /* fall back */
  }
  return fallbackReviews
}

const SITE_TEXT_QUERY = groq`*[_type == "siteSettings"][0]{
  heroBio, soundIntro, aboutTitle, aboutTitleAccent, aboutBody, regions, statsQuote
}`

export async function getSiteText(): Promise<SiteText> {
  try {
    const d = await client.fetch<Partial<SiteText> | null>(SITE_TEXT_QUERY, {}, fetchOpts)
    if (d) {
      return {
        heroBio: d.heroBio || fallbackText.heroBio,
        tagline: fallbackText.tagline,
        soundIntro: d.soundIntro || fallbackText.soundIntro,
        aboutTitle: d.aboutTitle || fallbackText.aboutTitle,
        aboutTitleAccent: d.aboutTitleAccent || fallbackText.aboutTitleAccent,
        aboutBody: d.aboutBody || fallbackText.aboutBody,
        regions: d.regions && d.regions.length > 0 ? d.regions : fallbackText.regions,
        statsQuote: d.statsQuote || fallbackText.statsQuote,
      }
    }
  } catch {
    /* fall back */
  }
  return fallbackText
}

const IMAGES_QUERY = groq`*[_id == "siteSettings"][0]{
  "hero": heroImage.asset->url,
  "about": aboutImage.asset->url,
  "stats": statsImage.asset->url,
  "boombox": boomboxImage.asset->url,
  "epk": epkImages[].asset->url
}`

export async function getSiteImages(): Promise<SiteImages> {
  const fallback: SiteImages = {
    hero: site.assets.heroCutout,
    about: site.assets.portrait,
    stats: site.assets.about,
    boombox: site.assets.boombox,
    epk: site.assets.epk,
  }
  try {
    const d = await client.fetch<Partial<SiteImages> | null>(IMAGES_QUERY, {}, fetchOpts)
    if (d) {
      return {
        hero: d.hero ?? fallback.hero,
        about: d.about ?? fallback.about,
        stats: d.stats ?? fallback.stats,
        boombox: d.boombox ?? fallback.boombox,
        epk: d.epk && d.epk.length > 0 ? d.epk : fallback.epk,
      }
    }
  } catch {
    /* fall back */
  }
  return fallback
}

const PILLARS_QUERY = groq`*[_type == "soundPillar"] | order(coalesce(order, 999) asc, _createdAt asc){
  title, text
}`

export async function getSoundPillars(): Promise<SoundPillar[]> {
  try {
    const d = await client.fetch<SoundPillar[]>(PILLARS_QUERY, {}, fetchOpts)
    if (d && d.length > 0) return d
  } catch {
    /* fall back */
  }
  return fallbackPillars
}

const STATS_QUERY = groq`*[_type == "statItem"] | order(coalesce(order, 999) asc, _createdAt asc){
  value, label
}`

export async function getStats(): Promise<StatItem[]> {
  try {
    const d = await client.fetch<StatItem[]>(STATS_QUERY, {}, fetchOpts)
    if (d && d.length > 0) return d
  } catch {
    /* fall back */
  }
  return fallbackStats
}

const MIXTAPES_QUERY = groq`*[_type == "mixtape"] | order(coalesce(order, 999) asc, _createdAt asc){
  title, "desc": description, tag, href
}`

export async function getMixtapes(): Promise<Mixtape[]> {
  try {
    const d = await client.fetch<Mixtape[]>(MIXTAPES_QUERY, {}, fetchOpts)
    if (d && d.length > 0) return d
  } catch {
    /* fall back */
  }
  return site.mixtapes.map((m) => ({
    title: m.title,
    desc: m.desc,
    tag: m.tag,
    href: m.href,
  }))
}

const FAQ_QUERY = groq`*[_type == "faqItem"] | order(coalesce(order, 999) asc, _createdAt asc){
  question, answer
}`

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const d = await client.fetch<FaqItem[]>(FAQ_QUERY, {}, fetchOpts)
    if (d && d.length > 0) return d
  } catch {
    /* fall back */
  }
  return fallbackFaqs
}
