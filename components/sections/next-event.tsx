import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin, Ticket } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { Media } from "@/components/shared/media"
import { getNextEvent } from "@/sanity/queries"

export async function NextEvent() {
  const nextEvent = await getNextEvent()

  // Hidden entirely when no gig is scheduled.
  if (!nextEvent.active) return null

  const { date, venue, city, note, ticketUrl, image } = nextEvent

  return (
    <section
      id="event"
      className="relative scroll-mt-20 overflow-hidden border-t border-border bg-card/30 py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Info */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Live · Nächster Gig</SectionLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 inline-flex items-center gap-2.5 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                <CalendarDays className="h-4 w-4" />
                {date}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-3 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.02]">
                {venue}
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-4 inline-flex items-center gap-2 text-lg text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand" />
                {city}
              </p>
            </Reveal>

            {note && (
              <Reveal delay={0.18}>
                <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                  {note}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {ticketUrl ? (
                  <a
                    href={ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-foreground shadow-[0_14px_34px_-14px_color-mix(in_oklch,var(--brand)_75%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-brand/90"
                  >
                    <Ticket className="h-4 w-4" />
                    Tickets
                  </a>
                ) : null}
                <Link
                  href="#booking"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Booking anfragen
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative">
              <Media
                src={image}
                alt={`${venue}, ${city} — ${date}`}
                label="Event"
                sizes="(max-width: 1024px) 90vw, 30rem"
                className="aspect-[4/3] w-full"
              />
              {/* Date chip */}
              <div className="absolute -left-3 -top-3 z-10 -rotate-3 rounded-full border border-brand bg-background px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand sm:-left-5 sm:-top-5">
                Save the Date
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
