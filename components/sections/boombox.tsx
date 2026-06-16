"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
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
            <div ref={ref} className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
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
                  alt={`${site.duo.name}: Mooglie & ${site.duo.partner}`}
                  label="Boombox-Society"
                  sizes="(max-width: 1024px) 80vw, 22rem"
                  className="aspect-[2/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="absolute -right-3 -top-3 z-20 rotate-3 rounded-full border border-brand bg-background px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand sm:-right-5 sm:-top-5">
                B2B Duo
              </div>
            </div>
          </Reveal>

          <div className="relative lg:col-span-7 lg:pl-6">
            <ChapterNumber n="4" className="-top-20 right-0 lg:right-4" />
            <div className="relative">
              <SectionLabel>Das Duo</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(3rem,9vw,6.5rem)] leading-[1.05]">
                  Boombox-
                  <br />
                  <span className="text-brand">Society</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                  {site.duo.description}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-border bg-card px-7 py-3.5 font-display text-lg uppercase tracking-tight transition-colors hover:border-brand sm:text-xl">
                    DJ Mooglie
                  </span>
                  <span className="font-brush text-4xl text-brand">×</span>
                  <span className="rounded-full border border-border bg-card px-7 py-3.5 font-display text-lg uppercase tracking-tight transition-colors hover:border-brand sm:text-xl">
                    {site.duo.partner}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
