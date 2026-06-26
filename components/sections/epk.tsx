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

const EASE = [0.22, 1, 0.36, 1] as const

const facts = [
  { k: "Künstlername", v: "DJ Moogli" },
  { k: "Herkunft", v: "Raum Heilbronn" },
  { k: "Resident", v: "Cooky's Club, Frankfurt" },
  { k: "Genres", v: "Hip-Hop · R'n'B · Afro · Baile Funk · Latin" },
  { k: "Duo", v: "Boombox-Society (mit DJ Soulrocca)" },
  { k: "Management", v: "KOMA Music, Frankfurt" },
]

export function EPK({
  images = site.assets.epk,
}: {
  images?: (string | null)[]
}) {
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
            <ChapterNumber n="6" className="-top-16 right-0 translate-x-1/3" />
            <SectionLabel>Electronic Press Kit</SectionLabel>
            <Reveal>
              <h2 className="relative mt-5 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05]">
                Press <span className="text-brand">Kit</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty text-base leading-relaxed text-foreground/80 sm:pb-2 sm:text-right sm:text-lg">
              Alles für Veranstalter und Presse auf einen Blick. Bio, Pressefotos
              und Logo gibt es auf Anfrage über das Booking.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Press photos */}
          <Reveal className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  style={reduce ? undefined : { y: i % 2 === 0 ? yA : yB }}
                  className="group elevate overflow-hidden rounded-2xl border border-border"
                >
                  <Media
                    src={src}
                    alt={`Pressefoto DJ Moogli ${i + 1}`}
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

            <motion.dl
              className="panel elevate mt-5 divide-y divide-border/60 overflow-hidden rounded-3xl"
              initial={reduce ? undefined : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {facts.map((f) => (
                <motion.div
                  key={f.k}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                  className="group relative flex flex-col items-center gap-2 overflow-hidden p-6 text-center transition-colors duration-300 hover:bg-secondary/50 sm:p-7"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    {f.k}
                  </dt>
                  <dd className="text-xl font-semibold leading-snug text-foreground transition-transform duration-300 group-hover:scale-[1.03] sm:text-2xl">
                    {f.v}
                  </dd>
                  <span className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-brand transition-all duration-300 ease-out group-hover:w-20" />
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </Container>
    </section>
  )
}

