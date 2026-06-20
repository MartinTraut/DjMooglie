import { groq } from "next-sanity"
import { client } from "./client"
import {
  nextEvent as fallbackEvent,
  reviews as fallbackReviews,
  type NextEvent,
  type Review,
} from "@/lib/content"

const EVENT_QUERY = groq`*[_type == "event"][0]{
  active, date, venue, city, note, ticketUrl,
  "image": image.asset->url
}`

const REVIEWS_QUERY = groq`*[_type == "review"] | order(coalesce(order, 999) asc, _createdAt asc){
  quote, author, role, rating
}`

/**
 * Both helpers fall back to the local content in `lib/content.ts` when Sanity
 * is unreachable or still empty — so the sections always render something
 * finished, even before the CMS is populated.
 */
export async function getNextEvent(): Promise<NextEvent> {
  try {
    const data = await client.fetch<Partial<NextEvent> | null>(
      EVENT_QUERY,
      {},
      { next: { revalidate: 60 } }
    )
    if (data && data.date && data.venue && data.city) {
      return {
        active: data.active ?? true,
        date: data.date,
        venue: data.venue,
        city: data.city,
        note: data.note,
        ticketUrl: data.ticketUrl ?? "",
        image: data.image ?? null,
      }
    }
  } catch {
    /* not configured / offline — use local fallback */
  }
  return fallbackEvent
}

export async function getReviews(): Promise<Review[]> {
  try {
    const data = await client.fetch<Review[]>(
      REVIEWS_QUERY,
      {},
      { next: { revalidate: 60 } }
    )
    if (data && data.length > 0) return data
  } catch {
    /* not configured / offline — use local fallback */
  }
  return fallbackReviews
}
