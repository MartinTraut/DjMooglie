import { createClient } from "@/lib/supabase/server"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/config"
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
  music_eyebrow: "",
  music_title: "",
  music_intro: "",
  booking_eyebrow: "",
  booking_title: "",
  booking_title_accent: "",
  booking_intro: "",
  sound_eyebrow: "",
  about_eyebrow: "",
  event_eyebrow: "",
  boombox_eyebrow: "",
  reviews_eyebrow: "",
  reviews_intro: "",
  gigs_eyebrow: "",
  gigs_intro: "",
  epk_eyebrow: "",
  epk_intro: "",
  management_eyebrow: "",
  management_intro: "",
  duo_tagline: "",
  duo_claim: "",
  duo_partner: "",
  duo_description: "",
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
  // Credentials missing → behave like "DB not set up" and show the setup hint
  // instead of crashing the page with a 500. (With the baked-in public defaults
  // in lib/supabase/config this normally never triggers.)
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null

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
        music_eyebrow: row.music_eyebrow ?? "",
        music_title: row.music_title ?? "",
        music_intro: row.music_intro ?? "",
        booking_eyebrow: row.booking_eyebrow ?? "",
        booking_title: row.booking_title ?? "",
        booking_title_accent: row.booking_title_accent ?? "",
        booking_intro: row.booking_intro ?? "",
        sound_eyebrow: row.sound_eyebrow ?? "",
        about_eyebrow: row.about_eyebrow ?? "",
        event_eyebrow: row.event_eyebrow ?? "",
        boombox_eyebrow: row.boombox_eyebrow ?? "",
        reviews_eyebrow: row.reviews_eyebrow ?? "",
        reviews_intro: row.reviews_intro ?? "",
        gigs_eyebrow: row.gigs_eyebrow ?? "",
        gigs_intro: row.gigs_intro ?? "",
        epk_eyebrow: row.epk_eyebrow ?? "",
        epk_intro: row.epk_intro ?? "",
        management_eyebrow: row.management_eyebrow ?? "",
        management_intro: row.management_intro ?? "",
        duo_tagline: row.duo_tagline ?? "",
        duo_claim: row.duo_claim ?? "",
        duo_partner: row.duo_partner ?? "",
        duo_description: row.duo_description ?? "",
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
