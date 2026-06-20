/**
 * Single source of truth for DJ MOOGLI.
 *
 * Verified facts come from the official management page
 * (komamusic.de/artists/moogli) and the client's brief.
 * Anything not verifiable is marked `TODO:` — never invented as fact.
 */

export const site = {
  name: "DJ Moogli",
  brand: "MOOGLI", // wordmark spelling (logo + management)
  role: "Urban & Hip-Hop DJ",
  baseUrl: "https://djmoogli.de", // TODO: confirm final domain
  email: "info@djmoogli.de",
  region: "Heilbronn · Frankfurt · bundesweit",
  resident: "Cooky's Club, Frankfurt",

  tagline: "Hip-Hop. R'n'B. Afro. Baile Funk. Latin.",
  shortBio:
    "Ich bin Moogli, Urban-DJ aus dem Raum Heilbronn und Resident im Frankfurter Cooky's Club. Ich lese den Floor und lege Hip-Hop, R'n'B, Afro, Baile Funk und Latin so übereinander, dass die Energie über die ganze Nacht trägt.",

  // GEO / Local-SEO: Standort und Einzugsgebiet als echte Daten fürs Schema.
  geo: {
    base: "Heilbronn",
    region: "Baden-Württemberg",
    countryCode: "DE",
    latitude: 49.1427,
    longitude: 9.2109,
    cities: [
      "Frankfurt am Main",
      "Heilbronn",
      "Stuttgart",
      "Mannheim",
      "Heidelberg",
      "Heilbronn-Franken",
    ],
  },

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

  // Featured mix played by the floating vinyl player (Mixcloud widget).
  featuredMix: {
    title: "Vol. 03",
    url: "https://www.mixcloud.com/DjMoogli/vol03/",
    feed: "/DjMoogli/vol03/", // widget feed path (URL-encoded in the iframe)
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
    tagline: "The Urban Sound Experience",
    claim: "Zwei Artists. Eine Vision. Maximale Energie.",
    partner: "DJ Soulrocca",
    partnerInstagram: "https://www.instagram.com/djsoulrocca/",
    partnerInstagramHandle: "djsoulrocca",
    description:
      "Als Boombox-Society stehe ich gemeinsam mit DJ Soulrocca hinter den Decks. Gebündelte Expertise, perfekte musikalische Synergie und ein präzises Gespür für den Dancefloor, das die Energie von der ersten bis zur letzten Minute hochhält.",
    signatureSound:
      "Ein treibender, clubtauglicher Mix aus feinstem Hip-Hop, R'n'B, Baile, Amapiano, Shatta, energetischem Afro und pulsierenden Latin-Beats.",
    genres: ["Hip-Hop", "R'n'B", "Baile", "Amapiano", "Shatta", "Afro", "Latin"],
    // Marquee references from the Boombox-Society press kit. International
    // highlights lead, the rest follow. Source: artist EPK (Boombox-Society).
    venueHighlights: ["Eden Ibiza", "Swag Ibiza", "Panama Amsterdam", "Cocoon Frankfurt"],
    venues: [
      "Cooky's Frankfurt",
      "Palais im Zoo Frankfurt",
      "Match Club München",
      "Pure Stuttgart",
      "Wonders Stuttgart",
      "Halle02 Heidelberg",
      "En Vogue Karlsruhe",
      "Musikpark Heilbronn",
      "Hip-Island Heilbronn",
      "Rheingold Düsseldorf",
      "Malinki Bad Rappenau",
      "Amici Stuttgart",
      "Vamos Bamberg",
      "VYBZ Gründau",
      "Nachtschicht Kaiserslautern",
      "Diamonds Köln",
    ],
  },

  // "Über mich" intro — bundesweite Reichweite + persönliche Handschrift.
  about: {
    kicker: "Über mich",
    title: "Bundesweit im Einsatz.",
    titleAccent: "Zu Hause in den Clubs.",
    body: "Ob in Frankfurt, Stuttgart, Heilbronn oder quer durch die Republik: Als DJ Moogli liefere ich den perfekten Sound für unvergessliche Nächte. Mit einem feinen Gespür für feinsten Hip-Hop und Urban Beats begleite ich Clubs, exklusive Events und private Feiern. Vom ersten Warm-up-Track bis zur allerletzten Zugabe sorge ich für die richtige Energie auf dem Dancefloor.",
  },

  // Mixtapes — replace href with real Mixcloud show URLs.
  // TODO: confirm the actual mixes & links on Mixcloud (DjMoogli).
  mixtapes: [
    {
      title: "Urban Heat Vol. 1",
      desc: "Hip-Hop und R'n'B Selection, straight aus der Cooky's-Booth.",
      tag: "Hip-Hop / R'n'B",
      href: "https://www.mixcloud.com/DjMoogli/", // TODO
    },
    {
      title: "Afro x Baile Funk",
      desc: "Tropical Heat, Afrobeats trifft brasilianischen Baile Funk.",
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

  // Gig history / references. Cooky's Club is the verified residency and the
  // headline reference; the rest are confirmed guest gigs across clubs and
  // großraumdiscos in DE. Names/cities researched & cleaned (see notes in chat).
  gigs: [
    { venue: "Cooky's", city: "Frankfurt", note: "Resident DJ", verified: true },
    { venue: "Tante Suzie", city: "Schweinfurt", note: "Club", verified: true },
    { venue: "VYBZ", city: "Gründau", note: "Club", verified: true },
    { venue: "Wonders", city: "Stuttgart", note: "Club", verified: true },
    { venue: "Club Kaiser", city: "Heilbronn", note: "Club", verified: true },
    { venue: "Green Door", city: "Heilbronn", note: "Club", verified: true },
    { venue: "La Boom", city: "Heilbronn", note: "Diskothek", verified: true },
    { venue: "Musikpark", city: "Pforzheim", note: "Großraumdisco", verified: true },
    { venue: "Malinki", city: "Bad Rappenau", note: "Club", verified: true },
    { venue: "Kinki Palace", city: "Sinsheim", note: "Diskothek", verified: true },
    { venue: "Wilde Heimat", city: "Koblenz", note: "Club", verified: true },
    { venue: "Zenit", city: "Koblenz", note: "Club", verified: true },
    { venue: "Diamonds", city: "Köln", note: "Club", verified: true },
    { venue: "Herbrand's", city: "Köln", note: "Club", verified: true },
    { venue: "Vamos", city: "Bamberg", note: "Club", verified: true },
    { venue: "Neon Beach", city: "Mannheim", note: "Beach-Club", verified: true },
    { venue: "Nachtschicht", city: "Kaiserslautern", note: "Großraumdisco", verified: true },
    { venue: "Ohana Lounge", city: "Karlsruhe", note: "Lounge", verified: true },
    { venue: "Munchies", city: "Frankfurt", note: "Club", verified: true },
    { venue: "Das Wohnzimmer", city: "Wiesbaden", note: "Club", verified: true },
    { venue: "Liebig", city: "Gießen", note: "Clubbar", verified: true },
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
    about: "/images/about.jpg" as string | null, // Club-Crowd (Stats-Hintergrund)
    portrait: "/images/boombox.jpg" as string | null, // Studio-Regiestuhl-Pose (Über mich)
    boombox: "/images/boombox-duo.png" as string | null, // Boombox-Society Duo-Pressefoto (Moogli & Soulrocca)
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
  { href: "#event", label: "Live" },
  { href: "#sound", label: "Sound" },
  { href: "#about", label: "Über mich" },
  { href: "#mixtapes", label: "Mixtapes" },
  { href: "#rezensionen", label: "Rezensionen" },
  { href: "#boombox", label: "Boombox-Society" },
  { href: "#epk", label: "EPK" },
] as const;
