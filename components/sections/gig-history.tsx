import { MapPin, Star } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber, EchoLine } from "@/components/shared/brush"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function GigHistory() {
  return (
    <section
      id="referenzen"
      className="relative scroll-mt-20 overflow-hidden border-t border-border bg-card/30 py-20 sm:py-28"
    >
      <EchoLine text="REFERENZEN" className="absolute -top-1 left-0 right-0 text-[10vw]" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="relative min-w-0 lg:col-span-4">
            <ChapterNumber n="3" className="-top-16 -left-2 lg:-left-6" />
            <div className="relative lg:sticky lg:top-28">
              <SectionLabel>Referenzen · Gig History</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92]">
                  Referen<span className="block text-brand">zen</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground">
                  Resident im Frankfurter Cooky&apos;s Club und gebucht für Clubs,
                  Events und Private Bookings. Eine Auswahl der Stationen.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {site.gigs.map((g, i) => (
                <Reveal as="li" key={i} delay={i * 0.05}>
                  <div className="group flex items-center justify-between gap-6 py-5 transition-colors hover:bg-secondary/40">
                    <div className="flex min-w-0 items-center gap-4">
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center border",
                          g.verified
                            ? "border-brand/40 bg-brand/10 text-brand"
                            : "border-border text-muted-foreground"
                        )}
                      >
                        {g.verified ? <Star className="h-4 w-4 fill-brand" /> : <MapPin className="h-4 w-4" />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-display text-2xl uppercase leading-none tracking-tight">
                          {g.venue} <span className="text-brand">— {g.city}</span>
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {g.note}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
              ★ verifiziert · weitere Stationen folgen
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
