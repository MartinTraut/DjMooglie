import type { Metadata } from "next"
import { Anton, Geist, Geist_Mono, Protest_Guerrilla } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
    default: `${site.name} — Urban & Hip-Hop DJ | Booking`,
    template: `%s — ${site.name}`,
  },
  description:
    "DJ Mooglie — Urban & Hip-Hop DJ aus dem Raum Heilbronn, Resident im Cooky's Club Frankfurt. Hip-Hop, R'n'B, Afro, Baile Funk & Latin. Mixtapes, EPK und Booking-Anfrage.",
  keywords: [
    "DJ Mooglie",
    "DJ Moogli",
    "Hip-Hop DJ",
    "Urban DJ",
    "DJ Frankfurt",
    "DJ Heilbronn",
    "Cooky's Club",
    "Afro DJ",
    "Baile Funk",
    "Boombox-Society",
    "DJ Booking",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.baseUrl,
    siteName: site.name,
    title: `${site.name} — Urban & Hip-Hop DJ`,
    description:
      "Hip-Hop, R'n'B, Afro, Baile Funk & Latin. Resident im Cooky's Club Frankfurt. Mixtapes, EPK & Booking.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Urban & Hip-Hop DJ`,
    description: "Hip-Hop, R'n'B, Afro, Baile Funk & Latin. Booking & Mixtapes.",
  },
  robots: { index: true, follow: true },
}

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
      email: `mailto:${site.email}`,
      areaServed: "DE",
      sameAs: [site.socials.instagram, site.socials.mixcloud, site.management.profileUrl],
      memberOf: { "@id": `${site.baseUrl}/#boombox` },
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "DJ Booking",
          serviceType: "Club-, Event- & Private-Booking",
        },
      },
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
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
