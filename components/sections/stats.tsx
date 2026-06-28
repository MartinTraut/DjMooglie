"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Media } from "@/components/shared/media"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { BrushStroke } from "@/components/shared/brush"
import { site } from "@/lib/site"
import { siteText, statItems, type StatItem } from "@/lib/content"

const EASE = [0.22, 1, 0.36, 1] as const

export function Stats({
  quote = siteText.statsQuote,
  stats = statItems,
  image = site.assets.about,
}: {
  quote?: string
  stats?: StatItem[]
  image?: string | null
}) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Background photo drifts slower than the scroll → depth.
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"])

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-border"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 brightness-[1.18] will-change-transform">
        <Media
          src={image}
          alt="Volle Crowd im Club, Hände in der Luft"
          label="Club / Crowd"
          sizes="100vw"
          className="absolute inset-[-8%] h-[116%] w-full"
        />
      </motion.div>
      {/* Lighter veil so the crowd actually reads, with a darker top + bottom band
          to keep the quote and the stat tiles legible. */}
      <div className="absolute inset-0 -z-10 bg-background/45" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/15 to-background/90" aria-hidden />

      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="relative max-w-3xl sm:ml-12 lg:ml-24">
            <BrushStroke
              variant="underline"
              className="absolute -bottom-4 left-0 h-6 w-56 text-brand"
            />
            <p className="text-balance font-brush text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.32] [hyphens:none]">
              <span className="mr-[0.16em]">„</span>{quote}<span className="ml-[0.1em]">“</span>
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="group panel panel-hover elevate flex flex-col items-center justify-center rounded-2xl p-6 text-center sm:p-8"
            >
              <p className="font-brush text-4xl leading-none text-brand transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/**
 * Counts a numeric stat up from 0 when it scrolls into view, preserving any
 * suffix ("+", "%"). Non-numeric values (e.g. "Resident") render as-is.
 * Disabled under reduced-motion.
 */
function CountUp({ value }: { value: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const match = value.match(/^(\d+)(\D*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ""
  const [display, setDisplay] = useState(target !== null && !reduce ? `0${suffix}` : value)

  useEffect(() => {
    if (target === null || reduce || !inView) return
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, target, suffix, reduce])

  return <span ref={ref}>{display}</span>
}
