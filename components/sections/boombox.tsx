import { Media } from "@/components/shared/media"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { BrushStroke, ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"

export function Boombox() {
  return (
    <section id="boombox" className="relative scroll-mt-20 overflow-hidden border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <BrushStroke
                variant="smear"
                className="pointer-events-none absolute -left-6 -top-6 z-0 h-40 w-2/3 text-brand/80"
              />
              <Media
                src={site.assets.boombox}
                alt={`${site.duo.name} — Mooglie & ${site.duo.partner}`}
                label="Boombox-Society"
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="relative z-10 aspect-[4/5] w-full border border-border"
              />
              <div className="absolute -right-3 -top-3 z-20 rotate-3 border border-brand bg-background px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand sm:-right-5 sm:-top-5">
                B2B Duo
              </div>
            </div>
          </Reveal>

          <div className="relative lg:col-span-6 lg:pl-6">
            <ChapterNumber n="4" className="-top-20 right-0 lg:right-4" />
            <div className="relative">
              <SectionLabel>Das Duo</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(3rem,9vw,6.5rem)] leading-[0.95]">
                  Boombox-
                  <br />
                  <span className="text-brand">Society</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                  {site.duo.description}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="border border-border bg-card px-4 py-2 font-display text-sm uppercase tracking-tight">
                    DJ Mooglie
                  </span>
                  <span className="font-brush text-2xl text-brand">×</span>
                  <span className="border border-border bg-card px-4 py-2 font-display text-sm uppercase tracking-tight">
                    {site.duo.partner}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
