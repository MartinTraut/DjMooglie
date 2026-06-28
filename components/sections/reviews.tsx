import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ReviewCard } from "@/components/sections/review-card"
import { getReviews } from "@/lib/cms/queries"
import { siteText } from "@/lib/content"

export async function Reviews({
  eyebrow = siteText.reviewsEyebrow,
  intro = siteText.reviewsIntro,
}: {
  eyebrow?: string
  intro?: string
} = {}) {
  const reviews = await getReviews()
  if (reviews.length === 0) return null

  return (
    <section
      id="referenzen"
      className="relative scroll-mt-20 overflow-hidden border-t border-border py-24 sm:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>{eyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-brush text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]">
              Was nach der <span className="text-brand">Nacht</span> bleibt
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty text-xl font-medium leading-relaxed text-foreground/90">
              {intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={`${r.author}-${i}`} delay={i * 0.08}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
