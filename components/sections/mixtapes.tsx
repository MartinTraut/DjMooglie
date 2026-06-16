"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber, EchoLine } from "@/components/shared/brush"
import { site } from "@/lib/site"

const EASE = [0.22, 1, 0.36, 1] as const

export function Mixtapes() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Giant "MUSIC" echo drifts sideways slower than the page.
  const echoX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"])

  return (
    <section
      ref={sectionRef}
      id="mixtapes"
      className="relative scroll-mt-20 overflow-hidden border-t border-border py-24 sm:py-32"
    >
      <motion.div style={{ x: echoX }} className="absolute -top-2 left-0 right-0 will-change-transform">
        <EchoLine text="MUSIC" className="text-[14vw]" />
      </motion.div>

      <Container className="relative">
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="relative">
            <ChapterNumber n="2" className="-top-14 right-0 translate-x-1/3 lg:-top-20" />
            <SectionLabel>Mixtapes · Mixcloud</SectionLabel>
            <Reveal>
              <h2 className="relative mt-5 font-brush text-[clamp(3rem,9vw,7rem)] leading-[1.05]">
                Music
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                Hör rein, bevor du buchst. Eine Auswahl aus der Cooky&apos;s-Booth,
                tropical Heat und meinen späten Latin-Stunden.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={site.socials.mixcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brand"
            >
              <span className="relative">
                Alle Mixe auf Mixcloud
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 ease-out group-hover:w-full" />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
          {site.mixtapes.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <motion.a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="group panel panel-hover elevate relative flex h-full flex-col justify-between gap-10 rounded-2xl p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
                    {m.tag}
                  </span>
                  <span className="font-brush text-3xl leading-none text-white/15 transition-colors duration-300 group-hover:text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-brand-foreground transition-transform duration-200 group-hover:scale-110">
                      <Play className="h-4 w-4 translate-x-px fill-current" />
                    </span>
                    Abspielen
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
