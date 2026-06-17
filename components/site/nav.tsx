"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { nav, site } from "@/lib/site"
import { Container } from "@/components/shared/container"

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // At the top the nav sits over the white hero block → dark ink.
  // Once scrolled it sits on the dark body → light ink + solid bar.
  const onLight = !scrolled && !open

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 text-foreground backdrop-blur-xl"
          : "border-b border-transparent bg-transparent text-neutral-950"
      )}
    >
      <Container className="flex h-20 items-center justify-between md:h-24">
        <Link
          href="#top"
          className="group relative z-10 -my-1 block"
          aria-label={`${site.name} Startseite`}
        >
          {/* Real MOOGLI mark. Full-colour over the white hero, white silhouette
              once the bar turns dark on scroll. Crossfaded between the two. */}
          <span className="relative block h-12 w-[132px] transition-transform duration-300 group-hover:scale-[1.04] sm:h-14 sm:w-[150px] md:h-[3.75rem] md:w-[166px]">
            <Image
              src="/images/logo-mark.png"
              alt={`${site.name} Logo`}
              fill
              priority
              sizes="166px"
              className={cn(
                "object-contain object-left transition-opacity duration-300",
                onLight ? "opacity-100" : "opacity-0"
              )}
            />
            <Image
              src="/images/logo-mark-white.png"
              alt=""
              aria-hidden
              fill
              sizes="166px"
              className={cn(
                "object-contain object-left transition-opacity duration-300",
                onLight ? "opacity-0" : "opacity-100"
              )}
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "group relative text-sm font-extrabold uppercase tracking-[0.1em] transition-colors",
                onLight ? "text-neutral-900 hover:text-brand" : "text-foreground/90 hover:text-brand"
              )}
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-brand-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklch,var(--brand)_70%,transparent)] transition-all duration-200 hover:scale-[1.03] hover:bg-brand/90"
          >
            Booking
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden",
            open
              ? "border-border text-foreground"
              : onLight
                ? "border-neutral-300 text-neutral-950"
                : "border-border text-foreground"
          )}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
        >
          {/* Morphing hamburger → X */}
          <span className="relative block h-4 w-5" aria-hidden>
            <motion.span
              className="absolute left-0 block h-0.5 w-full rounded-full bg-current"
              animate={open ? { top: "50%", y: "-50%", rotate: 45 } : { top: 0, y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current"
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 block h-0.5 w-full rounded-full bg-current"
              animate={open ? { bottom: "50%", y: "50%", rotate: -45 } : { bottom: 0, y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background text-foreground md:hidden"
          >
            {/* Brand spotlight + grain to match the hero aesthetic */}
            <div className="pointer-events-none absolute inset-0 brand-spot opacity-50" aria-hidden />
            <div className="pointer-events-none absolute inset-0 grain" aria-hidden />

            <Container className="relative flex min-h-full flex-col pt-28 pb-10">
              {/* Residency strip */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Resident · {site.resident}
              </motion.div>

              {/* Nav links */}
              <nav className="flex flex-col">
                {nav.map((n, i) => (
                  <motion.div
                    key={n.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between border-b border-border/70 py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-brand/80">
                          0{i + 1}
                        </span>
                        <span className="font-brush text-[2.75rem] leading-[1.05] transition-colors group-hover:text-brand">
                          {n.label}
                        </span>
                      </span>
                      <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTAs pinned to the bottom */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + nav.length * 0.06 + 0.05 }}
                className="mt-auto flex flex-col gap-4 pt-12"
              >
                <Link
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold uppercase tracking-[0.12em] text-brand-foreground shadow-[0_16px_40px_-16px_color-mix(in_oklch,var(--brand)_70%,transparent)] transition-transform active:scale-[0.98]"
                >
                  Booking anfragen
                  <ArrowUpRight className="h-5 w-5" />
                </Link>

                <div className="flex items-center gap-3">
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <InstagramGlyph className="h-4 w-4" />
                    Instagram
                  </a>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    {site.geo.base}
                  </span>
                </div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}
