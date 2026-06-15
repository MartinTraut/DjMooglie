/**
 * Single source of truth for DJ MOOGLI.
 *
 * Verified facts come from the official management page
 * (komamusic.de/artists/moogli) and the client's brief.
 * Anything not verifiable is marked `TODO:` — never invented as fact.
 */

export const site = {
  name: "DJ Mooglie",
  brand: "MOOGLI", // wordmark spelling (logo + management)
  role: "Urban & Hip-Hop DJ",
  baseUrl: "https://djmoogli.de", // TODO: confirm final domain
  email: "info@djmoogli.de",
  region: "Heilbronn · Frankfurt · bundesweit",
  resident: "Cooky's Club, Frankfurt",

  tagline: "Hip-Hop. R'n'B. Afro. Baile Funk. Latin.",
  shortBio:
    "Urban DJ aus dem Raum Heilbronn und Resident im Frankfurter Cooky's Club. Mooglie verbindet Hip-Hop, R'n'B, Afro, Baile Funk und Latin zu einem facettenreichen Groove mit Gespür für den richtigen Moment auf dem Dancefloor.",

  genres: [
    "Hip-Hop",
    "R'n'B",
    "Afro",
    "Baile Funk",
    "Latin",
    "Urban",
    "Dancehall", // TODO: confirm full genre list with artist
  ],

  socials: {
    instagram: "https://www.instagram.com/djmoogli/", // @djmoogli
    instagramHandle: "@djmoogli",
    mixcloud: "https://www.mixcloud.com/DjMoogli/", // TODO: confirm exact Mixcloud URL
    mixcloudHandle: "DjMoogli",
  },

  management: {
    company: "KOMA Music",
    profileUrl: "https://www.komamusic.de/artists/moogli/",
    siteUrl: "https://www.komamusic.de",
    address: "Daimlerstr. 32, 60314 Frankfurt am Main",
    phone: "+49 (0) 69 / 677 38 346",
    phoneHref: "+496967738346",
    email: "info@komamusic.de",
  },

  duo: {
    name: "Boombox-Society",
    partner: "DJ Soulrocca",
    description:
      "Als Duo Boombox-Society stehen Mooglie und DJ Soulrocca gemeinsam hinter den Decks — doppelte Energie, zwei Handschriften, ein durchgehender Flow für Clubnächte und Events.",
    // TODO: add Boombox-Society links / Mixcloud / Instagram if available
  },

  // Mixtapes — replace href with real Mixcloud show URLs.
  // TODO: confirm the actual mixes & links on Mixcloud (DjMoogli).
  mixtapes: [
    {
      title: "Urban Heat Vol. 1",
      desc: "Hip-Hop & R'n'B Selection — straight aus der Cooky's-Booth.",
      tag: "Hip-Hop / R'n'B",
      href: "https://www.mixcloud.com/DjMoogli/", // TODO
    },
    {
      title: "Afro x Baile Funk",
      desc: "Tropical Heat — Afrobeats trifft brasilianischen Baile Funk.",
      tag: "Afro / Baile Funk",
      href: "https://www.mixcloud.com/DjMoogli/", // TODO
    },
    {
      title: "Latin Nights",
      desc: "Reggaeton, Latin & Dembow für die späte Stunde.",
      tag: "Latin",
      href: "https://www.mixcloud.com/DjMoogli/", // TODO
    },
  ],

  // Gig history / references. Cooky's Club residency is verified.
  // The rest are TODO placeholders for the client to confirm.
  gigs: [
    { venue: "Cooky's Club", city: "Frankfurt", note: "Resident DJ", verified: true },
    { venue: "TODO: Club / Event", city: "TODO", note: "Gastauftritt", verified: false },
    { venue: "TODO: Festival", city: "TODO", note: "Stage", verified: false },
    { venue: "TODO: Private / Corporate Event", city: "TODO", note: "Booking", verified: false },
  ],

  /**
   * Asset registry. Drop the real photos into /public/images/ under exactly
   * these filenames. While `src` is null a branded placeholder renders, so the
   * layout looks finished and the build passes. Set `src` once a file exists.
   */
  assets: {
    logo: null as string | null, // SVG-Wordmark wird genutzt; /images/logo-red.jpg liegt als Download-Asset bereit
    hero: "/images/hero.jpg" as string | null, // Disco-Ball-Close-up
    heroCutout: "/images/hero-cutout.png" as string | null, // freigestellter Champion-Jacket-Shot (Higgsfield)
    portraitWide: null as string | null,
    about: "/images/about.jpg" as string | null, // Club-Crowd
    boombox: "/images/boombox.jpg" as string | null, // Regiestuhl-Pose
    epk: [
      "/images/press-1.jpg",
      "/images/press-2.jpg",
      "/images/press-3.jpg",
      "/images/press-4.jpg",
    ] as (string | null)[],
  },
} as const;

export type Site = typeof site;

export const nav = [
  { href: "#sound", label: "Sound" },
  { href: "#mixtapes", label: "Mixtapes" },
  { href: "#referenzen", label: "Referenzen" },
  { href: "#boombox", label: "Boombox-Society" },
  { href: "#epk", label: "EPK" },
  { href: "#booking", label: "Booking" },
] as const;
