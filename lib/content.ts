/**
 * EDITABLE CONTENT — the parts DJ Moogli maintains himself.
 *
 * These two blocks (next gig + reviews) are deliberately split out of
 * `site.ts` because they change often. In step 2 this file becomes the
 * fallback while the same shapes are served from a CMS (Sanity), so the
 * sections keep rendering even before/without the CMS.
 *
 * Until the portal is live, edit the values here. Placeholders are marked
 * `TODO:` — replace them with real data before launch.
 */

export type NextEvent = {
  /** Toggle the whole "Nächster Gig" section on/off. */
  active: boolean
  /** Human-readable date line, e.g. "Sa · 12. Juli 2026". */
  date: string
  /** Venue / club name (the headline). */
  venue: string
  city: string
  /** Optional one-liner: line-up, start time, occasion. */
  note?: string
  /** Optional ticket / event link. Empty string hides the ticket button. */
  ticketUrl?: string
  /** Optional photo (drop into /public/images/). null → branded placeholder. */
  image?: string | null
}

export type Review = {
  quote: string
  author: string
  /** Context: club, occasion, city … */
  role?: string
  /** 1–5; omit to hide stars. */
  rating?: number
}

// TODO: echten nächsten Gig eintragen (oder active:false, wenn gerade keiner ansteht).
export const nextEvent: NextEvent = {
  active: true,
  date: "Sa · 12. Juli 2026",
  venue: "Cooky's Club",
  city: "Frankfurt am Main",
  note: "Resident Night · Urban & Hip-Hop · ab 23 Uhr",
  ticketUrl: "",
  image: null,
}

// TODO: durch ECHTE Rezensionen ersetzen — diese hier sind nur Platzhalter,
// damit die Sektion fertig aussieht. Vor dem Launch austauschen.
export const reviews: Review[] = [
  {
    quote:
      "Liest den Floor wie kaum ein anderer. Aus einem ruhigen Warm-up wurde innerhalb von Minuten eine volle Tanzfläche — und die blieb bis zum Schluss.",
    author: "Platzhalter-Stimme",
    role: "Club-Booking · Frankfurt",
    rating: 5,
  },
  {
    quote:
      "Genau der Sound, den wir wollten: Hip-Hop, Afro und Latin nahtlos verbunden. Professionell von der Anfrage bis zur letzten Zugabe.",
    author: "Platzhalter-Stimme",
    role: "Private Feier · Stuttgart",
    rating: 5,
  },
  {
    quote:
      "Energie pur. Unsere Gäste reden heute noch von der Nacht. Buchen wir jederzeit wieder.",
    author: "Platzhalter-Stimme",
    role: "Event · Heilbronn",
    rating: 5,
  },
]
