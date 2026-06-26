import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"

export function Management() {
  const m = site.management
  return (
    <section id="management" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <Container>
        <div className="relative">
          <ChapterNumber
            n="7"
            className="-top-10 right-2 z-10 opacity-60 sm:-top-14"
          />
          <div className="panel elevate relative overflow-hidden rounded-3xl">
            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
              <div className="brand-spot pointer-events-none absolute inset-0 opacity-40" aria-hidden />
              <div className="relative lg:col-span-6">
              <SectionLabel>Management</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05]">
                  Vertreten durch
                  <br />
                  <span className="text-brand">{m.company}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                  Bookings und Presseanfragen für DJ Moogli laufen offiziell über
                  das Management von {m.company} in Frankfurt. Schnell, direkt und
                  verbindlich.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <a
                  href={m.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-brand-foreground shadow-[0_14px_34px_-14px_color-mix(in_oklch,var(--brand)_75%,transparent)] transition-transform duration-200 ease-out hover:scale-[1.03]"
                >
                  Profil bei {m.company}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="relative lg:col-span-6 lg:col-start-7">
              <ul className="panel space-y-2 rounded-3xl p-8 sm:p-10">
                <ContactRow icon={<MapPin className="h-5 w-5" />} label="Adresse" value={m.address} />
                <ContactRow
                  icon={<Phone className="h-5 w-5" />}
                  label="Telefon"
                  value={m.phone}
                  href={`tel:${m.phoneHref}`}
                />
                <ContactRow
                  icon={<Mail className="h-5 w-5" />}
                  label="E-Mail"
                  value={m.email}
                  href={`mailto:${m.email}`}
                />
              </ul>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.socials.instagramHandle}`}
                className="group mt-4 flex w-full items-center justify-center gap-3.5 rounded-2xl border border-border bg-card px-6 py-6 text-lg font-bold uppercase tracking-[0.16em] text-foreground transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-brand-foreground sm:text-xl"
              >
                <InstagramGlyph className="h-7 w-7" />
                {site.socials.instagramHandle}
              </a>
              <MapCard address={m.address} query={encodeURIComponent(m.address)} />
            </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-secondary">
      <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
        {icon}
      </span>
      <span>
        <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span className="block text-base text-foreground">{value}</span>
      </span>
    </div>
  )
  return (
    <li>
      {href ? (
        <a href={href} className="group block">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * Branded black-and-red "map" card. Not a live tile map (that would clash with
 * the palette) but an on-brand street abstraction with a pulsing pin, linking
 * out to the real Google Maps location.
 */
function MapCard({ address, query }: { address: string; query: string }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${query}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Standort auf Google Maps ansehen: ${address}`}
      className="group mt-4 block overflow-hidden rounded-3xl border border-border bg-[#0a0a0a] transition-colors duration-300 hover:border-brand/50"
    >
      <div className="relative aspect-[16/9]">
        <div className="hairline-grid absolute inset-0 opacity-50" aria-hidden />
        <svg
          viewBox="0 0 400 225"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path d="M-10 168 L150 168 L210 120 L410 120" fill="none" stroke="var(--brand)" strokeWidth="3.5" opacity="0.9" />
          <path d="M210 -10 L210 120" fill="none" stroke="var(--brand)" strokeWidth="3" opacity="0.65" />
          <path d="M40 -10 L120 235" fill="none" stroke="oklch(1 0 0 / 0.12)" strokeWidth="7" />
          <path d="M-10 60 L410 90" fill="none" stroke="oklch(1 0 0 / 0.10)" strokeWidth="5" />
        </svg>
        <div className="brand-spot absolute inset-0 opacity-25" aria-hidden />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-3 animate-ping rounded-full bg-brand/40" aria-hidden />
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-brand text-brand-foreground shadow-[0_8px_24px_-6px_color-mix(in_oklch,var(--brand)_70%,transparent)]">
            <MapPin className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border bg-background/70 px-5 py-4 backdrop-blur-sm">
        <span className="text-sm text-foreground">{address}</span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
          Route
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  )
}
