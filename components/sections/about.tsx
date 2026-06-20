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
import { siteText } from "@/lib/content"

export function About({
  title = siteText.aboutTitle,
  titleAccent = siteText.aboutTitleAccent,
  body = siteText.aboutBody,
  regions = siteText.regions,
}: {
  title?: string
  titleAccent?: string
  body?: string
  regions?: string[]
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden border-t border-border py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="relative order-2 lg:order-1 lg:col-span-7 lg:pr-6">
            <ChapterNumber n="01" className="-top-20 left-0 lg:-left-4" />
            <div className="relative">
              <SectionLabel>{site.about.kicker}</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05]">
                  {title}
                  <br />
                  <span className="text-brand">{titleAccent}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <li
                      key={r}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 font-display text-base uppercase tracking-tight transition-colors hover:border-brand sm:text-lg"
                    >
                      <MapPin className="h-3.5 w-3.5 text-brand" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* Portrait */}
          <Reveal className="order-1 lg:order-2 lg:col-span-5">
            <div ref={ref} className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[34rem]">
              <BrushStroke
                variant="smear"
                className="pointer-events-none absolute -right-6 -top-6 z-0 h-40 w-2/3 text-brand/80"
              />
              <motion.div
                style={reduce ? undefined : { y }}
                className="group elevate relative z-10 overflow-hidden rounded-2xl border border-border bg-white"
              >
                <Media
                  src={site.assets.portrait}
                  alt={`${site.name} · Studioportrait`}
                  label="DJ Moogli"
                  sizes="(max-width: 1024px) 80vw, 24rem"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="absolute -left-3 -top-3 z-20 -rotate-3 rounded-full border border-brand bg-background px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand sm:-left-5 sm:-top-5">
                DJ Moogli
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
