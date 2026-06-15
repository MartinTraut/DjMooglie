import { Container } from "@/components/shared/container"
import { Marquee } from "@/components/shared/marquee"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"

const pillars = [
  {
    k: "01",
    t: "Crowd-Reading",
    d: "Kein Set von der Stange. Mooglie liest den Floor in Echtzeit und dreht den Vibe genau dann, wenn der Raum danach verlangt.",
  },
  {
    k: "02",
    t: "Genre-Crossing",
    d: "Hip-Hop trifft Afro, R'n'B kippt in Baile Funk, Latin hält die Hüften in Bewegung — übergangslos und mit Gefühl gemixt.",
  },
  {
    k: "03",
    t: "Club-Sound",
    d: "Geschult als Resident im Cooky's Club Frankfurt: Energie, Timing und ein Gespür für den perfekten Drop.",
  },
]

export function Sound() {
  return (
    <section id="sound" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      {/* Full-bleed genre marquee in brush type */}
      <div className="banner-red grain border-y border-black/20 py-5 text-brand-foreground">
        <Marquee durationSeconds={26} className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {[...site.genres, ...site.genres].map((g, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="font-brush text-4xl leading-none sm:text-5xl">{g}</span>
              <span className="text-white/60" aria-hidden>✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <Container className="relative mt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <ChapterNumber n="1" className="-top-16 -left-2 lg:-left-6" />
            <div className="relative">
              <SectionLabel>Welcher Sound</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.75rem,7vw,5rem)] leading-[0.82]">
                  Ein Sound,
                  <br />
                  der <span className="text-brand">zusammen­führt</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  {site.tagline} Mooglies Handschrift ist die Verbindung: Sounds aus
                  verschiedenen Welten zu einem facettenreichen Groove, der
                  niemanden stehen lässt — von der ersten bis zur letzten Stunde.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden border border-border bg-border">
              {pillars.map((p, i) => (
                <Reveal key={p.k} delay={i * 0.08}>
                  <div className="group flex items-start gap-6 bg-card p-7 transition-colors duration-300 hover:bg-secondary">
                    <span className="font-brush text-3xl leading-none text-brand">{p.k}</span>
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-tight">{p.t}</h3>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {p.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
