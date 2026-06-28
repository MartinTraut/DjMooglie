import { cache } from "react"
import { getPublicClient } from "@/lib/supabase/anon"
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

/** Editable Boombox-Society copy (the rest of the duo block stays in site.ts). */
export type DuoText = {
  tagline: string
  claim: string
  partner: string
  description: string
}

export type SiteImages = {
  hero: string | null
  about: string | null
  stats: string | null
  boombox: string | null
  epk: (string | null)[]
}

/* Every helper reads from Supabase and falls back to local content
   (lib/content.ts / lib/site.ts) when Supabase is unreachable, not yet
   configured, or still empty — so every section always renders. */

/** The single site_content row, fetched once per request (React-cached). */
const getContentRow = cache(async (): Promise<Record<string, unknown> | null> => {
  const supabase = getPublicClient()
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
    if (error) return null
    return data ?? null
  } catch {
    return null
  }
})

export async function getSiteText(): Promise<SiteText> {
  const d = await getContentRow()
  if (!d) return fallbackText
  return {
    heroBio: (d.hero_bio as string) || fallbackText.heroBio,
    tagline: (d.tagline as string) || fallbackText.tagline,
    soundIntro: (d.sound_intro as string) || fallbackText.soundIntro,
    aboutTitle: (d.about_title as string) || fallbackText.aboutTitle,
    aboutTitleAccent:
      (d.about_title_accent as string) || fallbackText.aboutTitleAccent,
    aboutBody: (d.about_body as string) || fallbackText.aboutBody,
    regions:
      Array.isArray(d.regions) && d.regions.length > 0
        ? (d.regions as string[])
        : fallbackText.regions,
    statsQuote: (d.stats_quote as string) || fallbackText.statsQuote,
    musicEyebrow: (d.music_eyebrow as string) || fallbackText.musicEyebrow,
    musicTitle: (d.music_title as string) || fallbackText.musicTitle,
    musicIntro: (d.music_intro as string) || fallbackText.musicIntro,
    bookingEyebrow: (d.booking_eyebrow as string) || fallbackText.bookingEyebrow,
    bookingTitle: (d.booking_title as string) || fallbackText.bookingTitle,
    bookingTitleAccent:
      (d.booking_title_accent as string) || fallbackText.bookingTitleAccent,
    bookingIntro: (d.booking_intro as string) || fallbackText.bookingIntro,
    soundEyebrow: (d.sound_eyebrow as string) || fallbackText.soundEyebrow,
    aboutEyebrow: (d.about_eyebrow as string) || fallbackText.aboutEyebrow,
    eventEyebrow: (d.event_eyebrow as string) || fallbackText.eventEyebrow,
    boomboxEyebrow: (d.boombox_eyebrow as string) || fallbackText.boomboxEyebrow,
    reviewsEyebrow: (d.reviews_eyebrow as string) || fallbackText.reviewsEyebrow,
    reviewsIntro: (d.reviews_intro as string) || fallbackText.reviewsIntro,
    gigsEyebrow: (d.gigs_eyebrow as string) || fallbackText.gigsEyebrow,
    gigsIntro: (d.gigs_intro as string) || fallbackText.gigsIntro,
    epkEyebrow: (d.epk_eyebrow as string) || fallbackText.epkEyebrow,
    epkIntro: (d.epk_intro as string) || fallbackText.epkIntro,
    managementEyebrow:
      (d.management_eyebrow as string) || fallbackText.managementEyebrow,
    managementIntro:
      (d.management_intro as string) || fallbackText.managementIntro,
  }
}

export async function getSiteImages(): Promise<SiteImages> {
  const fallback: SiteImages = {
    hero: site.assets.heroCutout,
    about: site.assets.portrait,
    stats: site.assets.about,
    boombox: site.assets.boombox,
    epk: site.assets.epk,
  }
  const d = await getContentRow()
  if (!d) return fallback
  const epk = d.img_epk as string[] | null
  return {
    hero: (d.img_hero as string) ?? fallback.hero,
    about: (d.img_about as string) ?? fallback.about,
    stats: (d.img_stats as string) ?? fallback.stats,
    boombox: (d.img_boombox as string) ?? fallback.boombox,
    epk: epk && epk.length > 0 ? epk : fallback.epk,
  }
}

export async function getDuo(): Promise<DuoText> {
  const fb = site.duo
  const d = await getContentRow()
  if (!d) {
    return {
      tagline: fb.tagline,
      claim: fb.claim,
      partner: fb.partner,
      description: fb.description,
    }
  }
  return {
    tagline: (d.duo_tagline as string) || fb.tagline,
    claim: (d.duo_claim as string) || fb.claim,
    partner: (d.duo_partner as string) || fb.partner,
    description: (d.duo_description as string) || fb.description,
  }
}

export async function getNextEvent(): Promise<NextEvent> {
  const d = await getContentRow()
  if (!d || !d.event_date || !d.event_venue || !d.event_city) {
    return fallbackEvent
  }
  return {
    active: (d.event_active as boolean) ?? true,
    date: d.event_date as string,
    venue: d.event_venue as string,
    city: d.event_city as string,
    note: (d.event_note as string) || undefined,
    ticketUrl: (d.event_ticket_url as string) || "",
    image: (d.event_image as string) ?? null,
  }
}

export async function getReviews(): Promise<Review[]> {
  const supabase = getPublicClient()
  if (!supabase) return fallbackReviews
  try {
    const { data } = await supabase
      .from("reviews")
      .select("quote, author, role, rating")
      .order("sort_order", { ascending: true })
    if (data && data.length > 0) return data as Review[]
  } catch {
    /* fall back */
  }
  return fallbackReviews
}

export async function getSoundPillars(): Promise<SoundPillar[]> {
  const supabase = getPublicClient()
  if (!supabase) return fallbackPillars
  try {
    const { data } = await supabase
      .from("sound_pillars")
      .select("title, text")
      .order("sort_order", { ascending: true })
    if (data && data.length > 0) return data as SoundPillar[]
  } catch {
    /* fall back */
  }
  return fallbackPillars
}

export async function getStats(): Promise<StatItem[]> {
  const supabase = getPublicClient()
  if (!supabase) return fallbackStats
  try {
    const { data } = await supabase
      .from("stat_items")
      .select("value, label")
      .order("sort_order", { ascending: true })
    if (data && data.length > 0) return data as StatItem[]
  } catch {
    /* fall back */
  }
  return fallbackStats
}

export async function getMixtapes(): Promise<Mixtape[]> {
  const fallback: Mixtape[] = site.mixtapes.map((m) => ({
    title: m.title,
    desc: m.desc,
    tag: m.tag,
    href: m.href,
  }))
  const supabase = getPublicClient()
  if (!supabase) return fallback
  try {
    const { data } = await supabase
      .from("mixtapes")
      .select("title, desc:description, tag, href")
      .order("sort_order", { ascending: true })
    if (data && data.length > 0) return data as Mixtape[]
  } catch {
    /* fall back */
  }
  return fallback
}

export async function getFaqs(): Promise<FaqItem[]> {
  const supabase = getPublicClient()
  if (!supabase) return fallbackFaqs
  try {
    const { data } = await supabase
      .from("faq_items")
      .select("question, answer")
      .order("sort_order", { ascending: true })
    if (data && data.length > 0) return data as FaqItem[]
  } catch {
    /* fall back */
  }
  return fallbackFaqs
}
