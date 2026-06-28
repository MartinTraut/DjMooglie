/**
 * EDITABLE CONTENT — the parts DJ Moogli maintains himself.
 *
 * These blocks are the local FALLBACK for the content served from Supabase
 * (see lib/cms/queries.ts). When Supabase is unreachable, not yet configured
 * or still empty, the sections render these values — so the site never breaks.
 *
 * Placeholders are marked `TODO:` — the DJ replaces them via the admin portal.
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
  date: "Samstag, 12. Juli 2026",
  venue: "Cooky's Club",
  city: "Frankfurt am Main",
  note: "Resident Night, Urban und Hip-Hop, ab 23 Uhr",
  ticketUrl: "",
  image: null,
}

// TODO: durch ECHTE Rezensionen ersetzen — diese hier sind nur Platzhalter,
// damit die Sektion fertig aussieht. Vor dem Launch austauschen.
export const reviews: Review[] = [
  {
    quote:
      "Liest den Floor wie kaum ein anderer. Aus einem ruhigen Warm-up wurde innerhalb von Minuten eine volle Tanzfläche, und die blieb bis zum Schluss.",
    author: "Platzhalter-Stimme",
    role: "Club-Booking, Frankfurt",
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

/* -------------------------------------------------------------------------- */
/* General editable copy (hero, about, sound, stats) — one CMS singleton.     */
/* -------------------------------------------------------------------------- */

export type SiteText = {
  /** Hero self-description under the role bar. */
  heroBio: string
  /** Short genre line, reused in the sound intro + ticker context. */
  tagline: string
  /** Intro paragraph of the "Welcher Sound" section. */
  soundIntro: string
  aboutTitle: string
  aboutTitleAccent: string
  aboutBody: string
  /** Region pills in the About section. */
  regions: string[]
  /** Big pull-quote over the crowd photo (Stats section). */
  statsQuote: string
  /** Eyebrow / section label of the "Music" (Mixtapes) section. */
  musicEyebrow: string
  /** Headline of the "Music" (Mixtapes) section. */
  musicTitle: string
  /** Intro paragraph under the "Music" headline. */
  musicIntro: string
  /** Booking / contact section header. */
  bookingEyebrow: string
  bookingTitle: string
  bookingTitleAccent: string
  bookingIntro: string
  /** Eyebrows for the remaining sections (label above each headline). */
  soundEyebrow: string
  aboutEyebrow: string
  eventEyebrow: string
  boomboxEyebrow: string
  /** Reviews, Gig-History, EPK & Management header copy. */
  reviewsEyebrow: string
  reviewsIntro: string
  gigsEyebrow: string
  gigsIntro: string
  epkEyebrow: string
  epkIntro: string
  managementEyebrow: string
  managementIntro: string
}

export const siteText: SiteText = {
  heroBio:
    "Ich bin Moogli, Urban-DJ aus dem Raum Heilbronn und Resident im Frankfurter Cooky's Club. Ich lese den Floor und lege Hip-Hop, R'n'B, Afro, Baile Funk und Latin so übereinander, dass die Energie über die ganze Nacht trägt.",
  tagline: "Hip-Hop. R'n'B. Afro. Baile Funk. Latin.",
  soundIntro:
    "Hip-Hop. R'n'B. Afro. Baile Funk. Latin. Meine Handschrift ist die Verbindung. Ich baue aus Sounds verschiedener Welten einen Groove, der niemanden stehen lässt, von der ersten bis zur letzten Stunde.",
  aboutTitle: "Bundesweit im Einsatz.",
  aboutTitleAccent: "Zu Hause in den Clubs.",
  aboutBody:
    "Ob in Frankfurt, Stuttgart, Heilbronn oder quer durch die Republik: Als DJ Moogli liefere ich den perfekten Sound für unvergessliche Nächte. Mit einem feinen Gespür für feinsten Hip-Hop und Urban Beats begleite ich Clubs, exklusive Events und private Feiern. Vom ersten Warm-up-Track bis zur allerletzten Zugabe sorge ich für die richtige Energie auf dem Dancefloor.",
  regions: ["Frankfurt", "Stuttgart", "Heilbronn", "Bundesweit"],
  statsQuote:
    "Wenn der Raum kippt und alle Hände hochgehen, dafür mache ich das.",
  musicEyebrow: "Mixtapes · Mixcloud",
  musicTitle: "Music",
  musicIntro:
    "Hör rein, bevor du buchst. Eine Auswahl aus der Cooky's-Booth, tropical Heat und meinen späten Latin-Stunden.",
  bookingEyebrow: "Kontakt & Booking",
  bookingTitle: "Book",
  bookingTitleAccent: "Contact",
  bookingIntro:
    "Club-Night, Festival, Firmenevent oder Private Party? Schick mir die Eckdaten, du bekommst zeitnah eine Rückmeldung, direkt von mir oder über mein Management.",
  soundEyebrow: "Welcher Sound",
  aboutEyebrow: "Über mich",
  eventEyebrow: "Live · Nächster Gig",
  boomboxEyebrow: "Das Duo · B2B",
  reviewsEyebrow: "Stimmen · Referenzen",
  reviewsIntro:
    "Rückmeldungen von Clubs, Veranstaltern und Gästen. Der ehrlichste Maßstab für einen DJ.",
  gigsEyebrow: "Referenzen · Gig History",
  gigsIntro:
    "Ich bin Resident im Frankfurter Cooky's und lege quer durch Deutschland auf. Von Clubs über Großraumdiscos bis Private Bookings. Eine Auswahl meiner Stationen.",
  epkEyebrow: "Electronic Press Kit",
  epkIntro:
    "Alles für Veranstalter und Presse auf einen Blick. Bio, Pressefotos und Logo gibt es auf Anfrage über das Booking.",
  managementEyebrow: "Management",
  managementIntro:
    "Bookings und Presseanfragen für DJ Moogli laufen offiziell über das Management von KOMA Music in Frankfurt. Schnell, direkt und verbindlich.",
}

export type SoundPillar = { title: string; text: string }

export const soundPillars: SoundPillar[] = [
  {
    title: "Crowd-Reading",
    text: "Kein Set von der Stange. Ich lese den Floor in Echtzeit und dreh den Vibe genau dann, wenn der Raum danach verlangt.",
  },
  {
    title: "Genre-Crossing",
    text: "Hip-Hop trifft Afro, R'n'B kippt in Baile Funk, Latin hält die Hüften in Bewegung. Ich mixe das übergangslos und mit Gefühl.",
  },
  {
    title: "Club-Sound",
    text: "Geschult als Resident im Cooky's Club Frankfurt. Ich bringe Energie, Timing und ein Gespür für den perfekten Drop mit.",
  },
]

export type StatItem = { value: string; label: string }

export const statItems: StatItem[] = [
  { value: "5+", label: "Genres im Set" },
  { value: "Resident", label: "Cooky's Club FFM" },
  { value: "2", label: "DJs als Boombox-Society" },
  { value: "100%", label: "Floor-Energie" },
]

export type FaqItem = { question: string; answer: string }

export const faqItems: FaqItem[] = [
  {
    question: "Welche Musik legt DJ Moogli auf?",
    answer:
      "Ich spiele Urban Music mit Schwerpunkt Hip-Hop und R'n'B, dazu Afro, Baile Funk und Latin. Mein Ding ist das Genre-Crossing: Ich führe diese Stile zu einem Groove zusammen, der den Floor die ganze Nacht in Bewegung hält.",
  },
  {
    question: "Wo kann ich DJ Moogli live erleben?",
    answer:
      "Live spiele ich regelmäßig als Resident im Cooky's Club in Frankfurt am Main, dazu auf Clubnächten, Festivals und privaten Events. Aktuelle Termine und Mixe findest du auf meinem Instagram (@djmoogli) und auf Mixcloud.",
  },
  {
    question: "Wie kann ich DJ Moogli für mein Event buchen?",
    answer:
      "Am schnellsten über das Booking-Formular auf dieser Seite oder direkt per E-Mail an info@djmoogli.de. Offizielle Buchungen und Presseanfragen laufen außerdem über mein Management KOMA Music in Frankfurt (Tel. +49 69 677 38 346).",
  },
  {
    question: "Was ist die Boombox-Society?",
    answer:
      "Boombox-Society ist mein DJ-Duo mit DJ Soulrocca. Wir legen back-to-back auf: zwei Handschriften, doppelte Energie und ein durchgehender Flow, ideal für Clubnächte und größere Events.",
  },
  {
    question: "Für welche Art von Events ist DJ Moogli buchbar?",
    answer:
      "Ich spiele von Clubnächten und Festivals über Firmenfeiern bis zu privaten Partys und Hochzeiten. Durch mein breites Genre-Spektrum passe ich das Set flexibel an Publikum und Anlass an, vom dezenten Warm-up bis zum Peak-Time-Set.",
  },
  {
    question: "In welcher Region ist DJ Moogli unterwegs?",
    answer:
      "Ich komme aus dem Raum Heilbronn und bin Resident in Frankfurt. Gebucht werde ich bundesweit; Anfragen für andere Regionen und das Ausland gehen jederzeit über mein Management.",
  },
]
