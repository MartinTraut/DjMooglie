"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Plus } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { site } from "@/lib/site"
import { faqItems, type FaqItem } from "@/lib/content"
import { cn } from "@/lib/utils"

export function FAQ({ items = faqItems }: { items?: FaqItem[] }) {
  const [open, setOpen] = React.useState<number | null>(0)
  const reduce = useReducedMotion()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "de-DE",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
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
              {items.map((f, i) => {
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
                        {f.question}
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
                            {f.answer}
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
