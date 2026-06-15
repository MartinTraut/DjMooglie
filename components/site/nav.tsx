"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { nav, site } from "@/lib/site"
import { Container } from "@/components/shared/container"
import { Logo } from "@/components/logo"

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
        <Link href="#top" className="relative z-10" aria-label={`${site.name} Startseite`}>
          <Logo />
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
            className="inline-flex items-center gap-2 bg-brand px-6 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-brand-foreground transition-transform duration-200 hover:scale-[1.03] hover:bg-brand/90"
          >
            Booking
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative z-10 inline-flex h-10 w-10 items-center justify-center border md:hidden",
            onLight ? "border-neutral-300 text-neutral-950" : "border-border text-foreground"
          )}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-20 z-40 bg-background/98 text-foreground backdrop-blur-xl md:hidden"
          >
            <Container className="flex flex-col gap-1 py-8">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-4 font-brush text-4xl"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center bg-brand px-5 py-4 text-base font-bold uppercase tracking-[0.12em] text-brand-foreground"
              >
                Booking anfragen
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
