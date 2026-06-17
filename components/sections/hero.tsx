"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Play } from "lucide-react"
import { Container } from "@/components/shared/container"
import { site } from "@/lib/site"

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white text-neutral-950"
    >
      {/* faint repeated wordmark echo behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[34%] -z-0 select-none space-y-1 text-center font-brush text-[12vw] leading-[0.9] text-neutral-950/[0.05]"
      >
        <p className="truncate">MOOGLI MOOGLI MOOGLI</p>
        <p className="truncate">MOOGLI MOOGLI MOOGLI</p>
      </div>

      <Container className="relative pt-24 sm:pt-28">
        {/* Stage: freed-up cutout of Mooglie in front, the big brush MOOGLI
            behind him. His head and torso occlude the centre letters, so the
            word reads "MOO · him · GLI", crisp on the white block. */}
        <div className="relative mx-auto flex min-h-[clamp(17rem,44svh,30rem)] max-w-5xl items-end justify-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.06 }}
            className="relative w-[min(76vw,25rem)]"
          >
            {/* MOOGLI — wider than him, sitting behind, centred on his face so
                his head and torso occlude the middle letters */}
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="pointer-events-none absolute -left-[36%] top-[14%] z-0 w-[172%] text-center font-brush text-brand"
            >
              <span className="sr-only">{site.name}</span>
              <span aria-hidden className="block text-[clamp(4.2rem,15vw,13.5rem)] leading-[0.78]">
                MOOGLI
              </span>
            </motion.h1>

            <Image
              src={site.assets.heroCutout ?? "/images/hero-cutout.png"}
              alt="DJ Mooglie"
              width={1100}
              height={1466}
              priority
              sizes="(max-width: 640px) 84vw, 29rem"
              className="relative z-10 h-auto w-full select-none object-contain bw drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]"
            />
          </motion.div>
        </div>

        {/* Role bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
          className="relative z-10 mt-4 pb-8 text-center sm:mt-6 sm:pb-12"
        >
          <div className="mb-3 flex justify-center sm:mb-4">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Resident · Cooky&apos;s Club Frankfurt
            </span>
          </div>
          <p className="font-display text-[clamp(1.65rem,5.6vw,3.5rem)] uppercase leading-none tracking-tight">
            <span className="text-brand">Urban</span>{" "}
            <span className="text-neutral-400">&amp;</span>{" "}
            <span className="text-brand">Hip-Hop</span>{" "}
            <span className="text-neutral-950">DJ</span>
          </p>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-neutral-600 sm:text-base">
            Ich lege in Frankfurt, Heilbronn und bundesweit auf. Clubs, Events und
            private Feiern, von der ersten bis zur letzten Stunde.
          </p>
          <ul className="mx-auto mt-4 flex max-w-lg flex-wrap items-center justify-center gap-2">
            {site.genres.slice(0, 5).map((g) => (
              <li
                key={g}
                className="rounded-full border border-neutral-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-700"
              >
                {g}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-foreground shadow-[0_14px_34px_-14px_color-mix(in_oklch,var(--brand)_75%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-brand/90"
            >
              Booking anfragen
            </Link>
            <Link
              href="#mixtapes"
              className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-300 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-950 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              <Play className="h-3.5 w-3.5 fill-brand text-brand transition-transform group-hover:scale-110" />
              Mixtapes hören
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
