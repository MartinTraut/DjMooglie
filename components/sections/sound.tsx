"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/shared/container"
import { Marquee } from "@/components/shared/marquee"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"

const EASE = [0.22, 1, 0.36, 1] as const

const pillars = [
  {
    k: "01",
    t: "Crowd-Reading",
    d: "Kein Set von der Stange. Ich lese den Floor in Echtzeit und dreh den Vibe genau dann, wenn der Raum danach verlangt.",
  },
  {
    k: "02",
    t: "Genre-Crossing",
    d: "Hip-Hop trifft Afro, R'n'B kippt in Baile Funk, Latin hält die Hüften in Bewegung. Ich mixe das übergangslos und mit Gefühl.",
  },
  {
    k: "03",
    t: "Club-Sound",
    d: "Geschult als Resident im Cooky's Club Frankfurt. Ich bringe Energie, Timing und ein Gespür für den perfekten Drop mit.",
  },
]

export function Sound() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Headline drifts up slightly slower than the scroll for a layered feel.
  const headY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])

  return (
    <section
      ref={sectionRef}
      id="sound"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      {/* Full-bleed genre marquee in brush type */}
      <div className="banner-red grain border-y border-black/20 py-5 text-brand-foreground">
        <Marquee reverse durationSeconds={26} className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {[...site.genres, ...site.genres].map((g, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="font-brush text-4xl leading-none sm:text-5xl">{g}</span>
              <span className="text-white/60" aria-hidden>✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <Container className="relative mt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <ChapterNumber n="1" className="-top-16 -left-2 lg:-left-6" />
            <div className="relative lg:sticky lg:top-28">
              <SectionLabel>Welcher Sound</SectionLabel>
              <motion.div style={{ y: headY }} className="will-change-transform">
                <Reveal>
                  <h2 className="mt-5 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] [hyphens:none]">
                    Ein Sound,
                    <br />
                    der <span className="text-brand">verbindet</span>
                  </h2>
                </Reveal>
              </motion.div>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                  {site.tagline} Meine Handschrift ist die Verbindung. Ich baue aus
                  Sounds verschiedener Welten einen Groove, der niemanden stehen
                  lässt, von der ersten bis zur letzten Stunde.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:gap-4">
              {pillars.map((p, i) => (
                <Reveal key={p.k} delay={i * 0.08}>
                  <motion.div
                    whileHover={reduce ? undefined : { y: -3 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="group panel panel-hover elevate flex items-start gap-6 rounded-2xl p-7"
                  >
                    <span className="font-brush text-4xl leading-none text-brand transition-transform duration-300 group-hover:scale-110">
                      {p.k}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-tight">{p.t}</h3>
                      <p className="mt-2 text-pretty text-base leading-relaxed text-muted-foreground">
                        {p.d}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
