import { createClient } from "@/lib/supabase/server"
import type { SiteContentDraft } from "@/app/admin/actions"

export type AdminReview = {
  quote: string
  author: string
  role: string | null
  rating: number | null
}
export type AdminFaq = { question: string; answer: string }
export type AdminMixtape = {
  title: string
  description: string
  tag: string
  href: string
}
export type AdminPillar = { title: string; text: string }
export type AdminStat = { value: string; label: string }

export type AdminData = {
  content: SiteContentDraft
  reviews: AdminReview[]
  faq_items: AdminFaq[]
  mixtapes: AdminMixtape[]
  sound_pillars: AdminPillar[]
  stat_items: AdminStat[]
}

const EMPTY_CONTENT: SiteContentDraft = {
  hero_bio: "",
  tagline: "",
  sound_intro: "",
  about_title: "",
  about_title_accent: "",
  about_body: "",
  regions: [],
  stats_quote: "",
  img_hero: null,
  img_about: null,
  img_stats: null,
  img_boombox: null,
  img_epk: [],
  event_active: true,
  event_date: "",
  event_venue: "",
  event_city: "",
  event_note: "",
  event_ticket_url: "",
  event_image: null,
}

/**
 * Loads everything the editor needs. Returns `null` when the database is not
 * set up yet (tables missing) so the page can show a setup hint instead of
 * crashing.
 */
export async function loadAdminData(): Promise<AdminData | null> {
  const supabase = await createClient()

  const contentRes = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .maybeSingle()

  // Table missing / not reachable → signal "not set up".
  if (contentRes.error) return null

  const [reviews, faqs, mixtapes, pillars, stats] = await Promise.all([
    supabase.from("reviews").select("quote, author, role, rating").order("sort_order"),
    supabase.from("faq_items").select("question, answer").order("sort_order"),
    supabase.from("mixtapes").select("title, description, tag, href").order("sort_order"),
    supabase.from("sound_pillars").select("title, text").order("sort_order"),
    supabase.from("stat_items").select("value, label").order("sort_order"),
  ])

  const row = contentRes.data
  const content: SiteContentDraft = row
    ? {
        hero_bio: row.hero_bio ?? "",
        tagline: row.tagline ?? "",
        sound_intro: row.sound_intro ?? "",
        about_title: row.about_title ?? "",
        about_title_accent: row.about_title_accent ?? "",
        about_body: row.about_body ?? "",
        regions: row.regions ?? [],
        stats_quote: row.stats_quote ?? "",
        img_hero: row.img_hero ?? null,
        img_about: row.img_about ?? null,
        img_stats: row.img_stats ?? null,
        img_boombox: row.img_boombox ?? null,
        img_epk: row.img_epk ?? [],
        event_active: row.event_active ?? true,
        event_date: row.event_date ?? "",
        event_venue: row.event_venue ?? "",
        event_city: row.event_city ?? "",
        event_note: row.event_note ?? "",
        event_ticket_url: row.event_ticket_url ?? "",
        event_image: row.event_image ?? null,
      }
    : EMPTY_CONTENT

  return {
    content,
    reviews: (reviews.data as AdminReview[]) ?? [],
    faq_items: (faqs.data as AdminFaq[]) ?? [],
    mixtapes: (mixtapes.data as AdminMixtape[]) ?? [],
    sound_pillars: (pillars.data as AdminPillar[]) ?? [],
    stat_items: (stats.data as AdminStat[]) ?? [],
  }
}
