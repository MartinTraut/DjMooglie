"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, MapPin, Star } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber, EchoLine } from "@/components/shared/brush"
import { site } from "@/lib/site"

const EASE = [0.22, 1, 0.36, 1] as const

export function GigHistory() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Faint REFERENZEN echo drifts opposite the scroll for depth.
  const echoX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["3%", "-3%"])

  // Only render confirmed stations as facts. Unconfirmed TODO placeholders
  // stay out of the public list — we hint at them honestly below instead.
  const confirmed = site.gigs.filter((g) => g.verified)
  const pendingCount = site.gigs.length - confirmed.length

  return (
    <section
      ref={sectionRef}
      id="referenzen"
      className="relative scroll-mt-20 overflow-hidden border-t border-border bg-card/30 py-24 sm:py-32"
    >
      <motion.div style={{ x: echoX }} className="absolute -top-1 left-0 right-0 will-change-transform">
        <EchoLine text="REFERENZEN" className="text-[10vw]" />
      </motion.div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="relative min-w-0 lg:col-span-4">
            <ChapterNumber n="3" className="-top-16 -left-2 lg:-left-6" />
            <div className="relative lg:sticky lg:top-28">
              <SectionLabel>Referenzen · Gig History</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05]">
                  Referen<span className="block text-brand">zen</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-sm text-pretty text-lg leading-relaxed text-muted-foreground">
                  Ich bin Resident im Frankfurter Cooky&apos;s Club und stehe für
                  Clubs, Events und Private Bookings hinter den Decks. Eine Auswahl
                  meiner Stationen.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col gap-4">
              {confirmed.map((g, i) => (
                <Reveal as="li" key={`${g.venue}-${g.city}`} delay={i * 0.05}>
                  <motion.div
                    whileHover={reduce ? undefined : { x: 6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="group panel panel-hover elevate flex flex-col gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
                  >
                    <div className="flex min-w-0 items-center gap-5">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-brand/40 bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105">
                        <Star className="h-6 w-6 fill-brand" />
                      </span>
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-foreground">
                          {g.note}
                        </span>
                        <p className="mt-2 truncate font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl">
                          {g.venue}
                        </p>
                        <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
                          {g.city}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="hidden h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-brand sm:block" />
                  </motion.div>
                </Reveal>
              ))}
            </ul>

            {pendingCount > 0 && (
              <Reveal delay={0.1}>
                <a
                  href="#booking"
                  className="group mt-5 flex items-center justify-between gap-4 rounded-2xl border border-dashed border-border/70 px-5 py-4 transition-colors hover:border-brand/50 hover:bg-secondary/30"
                >
                  <span className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="text-pretty text-sm leading-relaxed">
                      Weitere Clubs, Festivals und Private Bookings sind in Arbeit
                      und folgen hier in Kürze. Du willst dein Event dazwischen?
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-brand">
                    Booking
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            )}

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
              ★ verifizierte Stationen
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
