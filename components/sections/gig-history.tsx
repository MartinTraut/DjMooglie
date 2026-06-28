"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, MapPin, Star } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber, EchoLine } from "@/components/shared/brush"
import { site } from "@/lib/site"
import { siteText } from "@/lib/content"

const EASE = [0.22, 1, 0.36, 1] as const

export function GigHistory({
  eyebrow = siteText.gigsEyebrow,
  intro = siteText.gigsIntro,
}: {
  eyebrow?: string
  intro?: string
} = {}) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Faint REFERENZEN echo drifts opposite the scroll for depth.
  const echoX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["3%", "-3%"])

  // Cooky's residency is the headline reference and gets the featured card;
  // every other confirmed venue is rendered in the compact tour grid below.
  const confirmed = site.gigs.filter((g) => g.verified)
  const resident = confirmed.find((g) => g.note === "Resident DJ")
  const tour = confirmed.filter((g) => g !== resident)
  // Distinct cities across all confirmed stations — a quick "reach" signal.
  const cityCount = new Set(confirmed.map((g) => g.city)).size

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
            <ChapterNumber n="4" className="-top-16 -left-2 lg:-left-6" />
            <div className="relative lg:sticky lg:top-28">
              <SectionLabel>{eyebrow}</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]">
                  Referen<span className="block text-brand">zen</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-sm text-pretty text-lg leading-relaxed text-muted-foreground">
                  {intro}
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <dl className="mt-8 flex gap-8">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Clubs
                    </dt>
                    <dd className="mt-1 font-display text-4xl text-brand sm:text-5xl">
                      {confirmed.length}+
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Städte
                    </dt>
                    <dd className="mt-1 font-display text-4xl text-brand sm:text-5xl">
                      {cityCount}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            {/* Featured residency */}
            {resident && (
              <Reveal>
                <a
                  href="#booking"
                  className="group panel panel-hover elevate flex flex-col gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-brand/40 bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105">
                      <Star className="h-6 w-6 fill-brand" />
                    </span>
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-foreground">
                        {resident.note}
                      </span>
                      <p className="mt-2 truncate font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl">
                        {resident.venue}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
                        {resident.city}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="hidden h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-brand sm:block" />
                </a>
              </Reveal>
            )}

            {/* Tour grid — every other confirmed venue */}
            <motion.ul
              className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
              initial={reduce ? undefined : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            >
              {tour.map((g) => (
                <motion.li
                  key={`${g.venue}-${g.city}`}
                  variants={{
                    hidden: reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18, filter: "blur(8px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.55, ease: EASE },
                    },
                  }}
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <div className="group panel panel-hover relative flex items-center gap-4 overflow-hidden rounded-2xl p-4 sm:p-5">
                    {/* growing red accent bar on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-brand transition-all duration-300 ease-out group-hover:h-3/5"
                    />
                    {/* soft brand glow sweeping in */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand/30 bg-brand/5 text-brand transition-all duration-300 group-hover:scale-110 group-hover:border-brand/60 group-hover:bg-brand/15">
                      <MapPin className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </span>
                    <div className="relative min-w-0 transition-transform duration-300 group-hover:translate-x-1">
                      <p className="truncate font-display text-xl uppercase leading-none tracking-tight sm:text-2xl">
                        {g.venue}
                      </p>
                      <p className="mt-1.5 truncate font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:text-[13px]">
                        {g.city}
                      </p>
                    </div>
                    <ArrowUpRight className="relative ml-auto h-5 w-5 shrink-0 -translate-x-1 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
