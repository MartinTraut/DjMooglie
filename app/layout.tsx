import type { Metadata } from "next"
import { Anton, Geist, Geist_Mono, Protest_Guerrilla } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
// Bold condensed grotesk — sub-headlines, labels, UI ("URBAN & HIP-HOP DJ").
const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" })
// Hand-painted brush display — the big section words (MOOGLI, BIO, MUSIC …).
const brush = Protest_Guerrilla({ subsets: ["latin"], weight: "400", variable: "--font-brush" })

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.name} · Urban & Hip-Hop DJ Frankfurt & Heilbronn | Booking`,
    template: `%s · ${site.name}`,
  },
  description:
    "DJ Mooglie, Urban & Hip-Hop DJ aus dem Raum Heilbronn und Resident im Cooky's Club Frankfurt. Hip-Hop, R'n'B, Afro, Baile Funk und Latin für Clubs, Events und private Feiern. Mixtapes, EPK und Booking-Anfrage.",
  keywords: [
    "DJ Mooglie",
    "DJ Moogli",
    "Hip-Hop DJ",
    "Urban DJ",
    "DJ Frankfurt",
    "DJ Heilbronn",
    "DJ buchen Frankfurt",
    "DJ Booking Heilbronn",
    "Cooky's Club",
    "Afro DJ",
    "Baile Funk",
    "Boombox-Society",
    "DJ Booking",
    "Event DJ Frankfurt",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.baseUrl,
    siteName: site.name,
    title: `${site.name} · Urban & Hip-Hop DJ`,
    description:
      "Hip-Hop, R'n'B, Afro, Baile Funk und Latin. Resident im Cooky's Club Frankfurt. Mixtapes, EPK und Booking.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} · Urban & Hip-Hop DJ`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Urban & Hip-Hop DJ`,
    description: "Hip-Hop, R'n'B, Afro, Baile Funk und Latin. Booking und Mixtapes.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
}

const cities = site.geo.cities.map((name) => ({ "@type": "City", name }))

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.baseUrl}/#website`,
      url: site.baseUrl,
      name: site.name,
      inLanguage: "de-DE",
      publisher: { "@id": `${site.baseUrl}/#person` },
    },
    {
      "@type": ["Person", "MusicGroup"],
      "@id": `${site.baseUrl}/#person`,
      name: site.name,
      alternateName: ["DJ Moogli", "Moogli"],
      jobTitle: "DJ",
      description: site.shortBio,
      genre: [...site.genres],
      url: site.baseUrl,
      image: `${site.baseUrl}/og.png`,
      email: `mailto:${site.email}`,
      knowsAbout: [...site.genres, "DJing", "Clubkultur", "Event-Beschallung"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Disc Jockey",
        occupationLocation: { "@type": "City", name: "Frankfurt am Main" },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.geo.base,
        addressRegion: site.geo.region,
        addressCountry: site.geo.countryCode,
      },
      homeLocation: {
        "@type": "Place",
        name: site.geo.base,
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
      },
      areaServed: cities,
      sameAs: [site.socials.instagram, site.socials.mixcloud, site.management.profileUrl],
      memberOf: { "@id": `${site.baseUrl}/#boombox` },
      makesOffer: { "@id": `${site.baseUrl}/#booking` },
    },
    {
      "@type": "MusicGroup",
      "@id": `${site.baseUrl}/#boombox`,
      name: site.duo.name,
      description: site.duo.description,
      genre: ["Hip-Hop", "Urban"],
      member: [{ "@id": `${site.baseUrl}/#person` }, { "@type": "Person", name: site.duo.partner }],
    },
    {
      "@type": "Service",
      "@id": `${site.baseUrl}/#booking`,
      name: "DJ Booking für Clubs, Events und private Feiern",
      serviceType: "DJ Booking",
      provider: { "@id": `${site.baseUrl}/#person` },
      areaServed: cities,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "DJ Booking",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Club-Booking" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event- & Festival-Booking" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private & Corporate Booking" } },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": `${site.baseUrl}/#management`,
      name: site.management.company,
      url: site.management.siteUrl,
      email: `mailto:${site.management.email}`,
      telephone: site.management.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Daimlerstr. 32",
        postalCode: "60314",
        addressLocality: "Frankfurt am Main",
        addressCountry: "DE",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.baseUrl}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: site.baseUrl },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        geist.variable,
        fontMono.variable,
        display.variable,
        brush.variable
      )}
    >
      <body>
        <SmoothScroll />
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
