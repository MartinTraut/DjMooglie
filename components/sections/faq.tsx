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
    a: "Ich spiele Urban Music mit Schwerpunkt Hip-Hop und R'n'B, dazu Afro, Baile Funk und Latin. Mein Ding ist das Genre-Crossing: Ich führe diese Stile zu einem Groove zusammen, der den Floor die ganze Nacht in Bewegung hält.",
  },
  {
    q: "Wo kann ich DJ Mooglie live erleben?",
    a: "Live spiele ich regelmäßig als Resident im Cooky's Club in Frankfurt am Main, dazu auf Clubnächten, Festivals und privaten Events. Aktuelle Termine und Mixe findest du auf meinem Instagram (@djmoogli) und auf Mixcloud.",
  },
  {
    q: "Wie kann ich DJ Mooglie für mein Event buchen?",
    a: "Am schnellsten über das Booking-Formular auf dieser Seite oder direkt per E-Mail an info@djmoogli.de. Offizielle Buchungen und Presseanfragen laufen außerdem über mein Management KOMA Music in Frankfurt (Tel. +49 69 677 38 346).",
  },
  {
    q: "Was ist die Boombox-Society?",
    a: "Boombox-Society ist mein DJ-Duo mit DJ Soulrocca. Wir legen back-to-back auf: zwei Handschriften, doppelte Energie und ein durchgehender Flow, ideal für Clubnächte und größere Events.",
  },
  {
    q: "Für welche Art von Events ist DJ Mooglie buchbar?",
    a: "Ich spiele von Clubnächten und Festivals über Firmenfeiern bis zu privaten Partys und Hochzeiten. Durch mein breites Genre-Spektrum passe ich das Set flexibel an Publikum und Anlass an, vom dezenten Warm-up bis zum Peak-Time-Set.",
  },
  {
    q: "In welcher Region ist DJ Mooglie unterwegs?",
    a: "Ich komme aus dem Raum Heilbronn und bin Resident in Frankfurt. Gebucht werde ich bundesweit; Anfragen für andere Regionen und das Ausland gehen jederzeit über mein Management.",
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
              <h2 className="mt-5 font-brush text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]">
                Häufige
                <br />
                <span className="text-brand">Fragen</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-sm text-pretty text-lg leading-relaxed text-muted-foreground">
                Alles Wichtige zu Sound, Booking und {site.duo.name} auf einen Blick.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col gap-3">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <li
                    key={i}
                    className={cn(
                      "panel panel-hover overflow-hidden rounded-2xl px-6 transition-colors",
                      isOpen && "elevate"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={cn(
                          "text-lg font-semibold transition-colors duration-200",
                          isOpen ? "text-brand" : "text-foreground group-hover:text-brand"
                        )}
                      >
                        {f.q}
                      </span>
                      <Plus
                        className={cn(
                          "h-5 w-5 shrink-0 text-brand transition-transform duration-300 ease-out",
                          isOpen ? "rotate-45" : "group-hover:rotate-90"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
