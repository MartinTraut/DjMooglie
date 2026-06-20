import { Quote, Star } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { getReviews } from "@/sanity/queries"

export async function Reviews() {
  const reviews = await getReviews()
  if (reviews.length === 0) return null

  return (
    <section
      id="rezensionen"
      className="relative scroll-mt-20 overflow-hidden border-t border-border py-24 sm:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Stimmen · Rezensionen</SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-brush text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]">
              Was nach der <span className="text-brand">Nacht</span> bleibt
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Rückmeldungen von Clubs, Veranstaltern und Gästen — der ehrlichste
              Maßstab für einen DJ.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={`${r.author}-${i}`} delay={i * 0.08}>
              <figure className="group panel panel-hover elevate flex h-full flex-col justify-between gap-8 rounded-2xl p-7">
                <div>
                  <Quote className="h-7 w-7 text-brand/80" aria-hidden />
                  <blockquote className="mt-5 text-pretty text-base leading-relaxed text-foreground/90">
                    {r.quote}
                  </blockquote>
                </div>
                <figcaption className="border-t border-border pt-5">
                  {typeof r.rating === "number" && (
                    <div className="mb-3 flex gap-0.5" aria-label={`${r.rating} von 5 Sternen`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={
                            s < r.rating!
                              ? "h-4 w-4 fill-brand text-brand"
                              : "h-4 w-4 text-muted-foreground/30"
                          }
                          aria-hidden
                        />
                      ))}
                    </div>
                  )}
                  <p className="font-display text-lg uppercase leading-none tracking-tight">
                    {r.author}
                  </p>
                  {r.role && (
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {r.role}
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
