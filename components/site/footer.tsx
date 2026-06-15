import Link from "next/link"
import { Mail } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Waveform } from "@/components/logo"
import { nav, site } from "@/lib/site"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function Footer() {
  const year = 2026 // build-year; update on redeploy

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* Big brush wordmark band */}
      <div className="border-b border-border">
        <Container className="py-14 text-center">
          <p className="font-brush text-[clamp(3.5rem,16vw,12rem)] leading-[0.78]">
            DJ&nbsp;M<span className="text-brand">OO</span>GLI
          </p>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl uppercase tracking-tight">
              {site.role}
            </p>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              {site.region}. {site.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href={site.socials.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={site.socials.mixcloud} label="Mixcloud">
                <Waveform className="h-3.5 w-5" />
              </SocialIcon>
              <SocialIcon href={`mailto:${site.email}`} label="E-Mail">
                <Mail className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Navigation
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-foreground/80 transition-colors hover:text-brand">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Kontakt & Recht
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="text-foreground/80 transition-colors hover:text-brand">
                  {site.email}
                </a>
              </li>
              <li>
                <Link href="/impressum" className="text-foreground/80 transition-colors hover:text-brand">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-foreground/80 transition-colors hover:text-brand">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. Alle Rechte vorbehalten.
          </p>
          <p>
            Booking & Management:{" "}
            <a
              href={site.management.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 transition-colors hover:text-brand"
            >
              {site.management.company}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-all duration-200 hover:border-brand hover:bg-brand hover:text-brand-foreground"
    >
      {children}
    </a>
  )
}
