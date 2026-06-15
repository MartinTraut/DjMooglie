"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Plus } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "Welche Musik legt DJ Mooglie auf?",
    a: "DJ Mooglie spielt Urban Music mit Schwerpunkt Hip-Hop und R'n'B, kombiniert mit Afro, Baile Funk und Latin. Sein Markenzeichen ist das Genre-Crossing: Er führt diese Stile zu einem facettenreichen Groove zusammen, der den Dancefloor durchgehend in Bewegung hält.",
  },
  {
    q: "Wo kann ich DJ Mooglie live erleben?",
    a: "Mooglie ist Resident-DJ im renommierten Cooky's Club in Frankfurt am Main und zusätzlich für Clubs, Festivals und private Events buchbar. Aktuelle Termine und Mixe gibt es auf seinem Instagram (@djmoogli) und auf Mixcloud.",
  },
  {
    q: "Wie kann ich DJ Mooglie für mein Event buchen?",
    a: "Am schnellsten über das Booking-Formular auf dieser Seite oder direkt per E-Mail an info@djmoogli.de. Offizielle Buchungen und Presseanfragen laufen außerdem über das Management KOMA Music in Frankfurt (Tel. +49 69 677 38 346).",
  },
  {
    q: "Was ist die Boombox-Society?",
    a: "Boombox-Society ist das DJ-Duo von Mooglie und DJ Soulrocca. Gemeinsam legen sie back-to-back auf — zwei Handschriften, doppelte Energie und ein durchgehender Flow, ideal für Clubnächte und größere Events.",
  },
  {
    q: "Für welche Art von Events ist DJ Mooglie buchbar?",
    a: "Von Clubnächten und Festivals über Firmenfeiern bis hin zu privaten Partys und Hochzeiten. Durch das breite Genre-Spektrum passt Mooglie sein Set flexibel an Publikum und Anlass an — vom dezenten Warm-up bis zum Peak-Time-Set.",
  },
  {
    q: "In welcher Region ist DJ Mooglie unterwegs?",
    a: "Mooglie kommt aus dem Raum Heilbronn und ist Resident in Frankfurt. Gebucht wird er bundesweit; Anfragen für andere Regionen und das Ausland sind über das Management jederzeit möglich.",
  },
]

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0)
  const reduce = useReducedMotion()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "de-DE",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border bg-card/30 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>FAQ</SectionLabel>
            <Reveal>
              <h2 className="mt-5 font-brush text-[clamp(2.75rem,8vw,5rem)] leading-[0.8]">
                Häufige
                <br />
                <span className="text-brand">Fragen</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xs text-pretty leading-relaxed text-muted-foreground">
                Alles Wichtige zu Sound, Booking und {site.duo.name} auf einen Blick.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg font-semibold text-foreground">{f.q}</span>
                      <Plus
                        className={cn(
                          "h-5 w-5 shrink-0 text-brand transition-transform duration-300",
                          isOpen && "rotate-45"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 text-pretty leading-relaxed text-muted-foreground">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
