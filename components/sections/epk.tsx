"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Container } from "@/components/shared/container"
import { Media } from "@/components/shared/media"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { BrandLogoImage } from "@/components/logo"
import { ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"

const facts = [
  { k: "Künstlername", v: "DJ Mooglie" },
  { k: "Herkunft", v: "Raum Heilbronn" },
  { k: "Resident", v: "Cooky's Club, Frankfurt" },
  { k: "Genres", v: "Hip-Hop · R'n'B · Afro · Baile Funk · Latin" },
  { k: "Duo", v: "Boombox-Society (mit DJ Soulrocca)" },
  { k: "Management", v: "KOMA Music, Frankfurt" },
]

export function EPK() {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const yA = useTransform(scrollYProgress, [0, 1], ["-4%", "5%"])
  const yB = useTransform(scrollYProgress, [0, 1], ["5%", "-4%"])

  return (
    <section
      id="epk"
      className="relative scroll-mt-20 overflow-hidden border-t border-border bg-card/30 py-20 sm:py-28"
    >
      <Container className="relative">
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="relative">
            <ChapterNumber n="5" className="-top-16 right-0 translate-x-1/3" />
            <SectionLabel>Electronic Press Kit</SectionLabel>
            <Reveal>
              <h2 className="relative mt-5 font-brush text-[clamp(3rem,9vw,7rem)] leading-[1.05]">
                Press <span className="text-brand">Kit</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Alles für Veranstalter und Presse auf einen Blick. Bio, Pressefotos
              und Logo gibt es auf Anfrage über das Booking.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Press photos */}
          <Reveal className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {site.assets.epk.map((src, i) => (
                <motion.div
                  key={i}
                  style={reduce ? undefined : { y: i % 2 === 0 ? yA : yB }}
                  className="group elevate overflow-hidden rounded-2xl border border-border"
                >
                  <Media
                    src={src}
                    alt={`Pressefoto DJ Mooglie ${i + 1}`}
                    label={`Pressefoto ${i + 1}`}
                    sizes="(max-width: 1024px) 45vw, 30vw"
                    className="aspect-[2/3] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Real logo + facts + downloads */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="elevate flex items-center justify-center rounded-2xl border border-border bg-white px-6 py-8">
                <BrandLogoImage className="max-w-[16rem]" />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="panel elevate mt-5 divide-y divide-border/70 overflow-hidden rounded-3xl">
                {facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex flex-col items-center gap-2 p-6 text-center transition-colors hover:bg-secondary/60 sm:p-7"
                  >
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                      {f.k}
                    </dt>
                    <dd className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

