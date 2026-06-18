"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Media } from "@/components/shared/media"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { BrushStroke, ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"

export function Boombox() {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <section
      id="boombox"
      className="relative scroll-mt-20 overflow-hidden border-t border-border py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div ref={ref} className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[34rem]">
              <BrushStroke
                variant="smear"
                className="pointer-events-none absolute -left-6 -top-6 z-0 h-40 w-2/3 text-brand/80"
              />
              <motion.div
                style={reduce ? undefined : { y }}
                className="group elevate relative z-10 overflow-hidden rounded-2xl border border-border"
              >
                <Media
                  src={site.assets.boombox}
                  alt={`${site.duo.name}: DJ Mooglie & ${site.duo.partner}, back to back`}
                  label="Boombox-Society"
                  sizes="(max-width: 1024px) 80vw, 24rem"
                  className="aspect-[2/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="absolute -right-3 -top-3 z-20 rotate-3 rounded-full border border-brand bg-background px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand sm:-right-5 sm:-top-5">
                B2B Duo
              </div>
            </div>
          </Reveal>

          <div className="relative lg:col-span-7 lg:pl-6">
            <ChapterNumber n="4" className="-top-20 right-0 lg:right-4" />
            <div className="relative">
              <SectionLabel>Das Duo · B2B</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05]">
                  Boombox-
                  <br />
                  <span className="text-brand">Society</span>
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-4 font-display text-lg uppercase tracking-tight text-foreground sm:text-xl">
                  {site.duo.tagline}
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                    {site.duo.claim}
                  </span>
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                  {site.duo.description}
                </p>
              </Reveal>

              {/* Signature Sound */}
              <Reveal delay={0.18}>
                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground sm:text-[13px]">
                    Signature Sound
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2.5">
                    {site.duo.genres.map((g) => (
                      <li
                        key={g}
                        className="rounded-full border border-border bg-card px-5 py-2 font-display text-base uppercase tracking-tight transition-colors hover:border-brand sm:text-lg"
                      >
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Top Venues — international highlights lead the trust signal */}
              <Reveal delay={0.24}>
                <div className="mt-8 rounded-2xl border border-border bg-card/40 p-5 sm:p-7">
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground sm:text-[13px]">
                    <MapPin className="h-4 w-4 text-brand" />
                    Top Venues
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {site.duo.venueHighlights.map((v) => (
                      <span
                        key={v}
                        className="rounded-full bg-brand px-4 py-2 font-display text-base uppercase tracking-tight text-brand-foreground sm:text-lg"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {site.duo.venues.join(" · ")} u. v. m.
                  </p>
                </div>
              </Reveal>

              {/* The two artists */}
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border bg-card px-7 py-3.5 font-display text-lg uppercase tracking-tight transition-colors hover:border-brand hover:text-brand sm:text-xl"
                  >
                    DJ Mooglie
                  </a>
                  <span className="font-brush text-4xl text-brand">×</span>
                  <a
                    href={site.duo.partnerInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border bg-card px-7 py-3.5 font-display text-lg uppercase tracking-tight transition-colors hover:border-brand hover:text-brand sm:text-xl"
                  >
                    {site.duo.partner}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
