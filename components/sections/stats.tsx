import { Media } from "@/components/shared/media"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { BrushStroke } from "@/components/shared/brush"
import { site } from "@/lib/site"

const stats = [
  { value: "5+", label: "Genres im Set" },
  { value: "Resident", label: "Cooky's Club FFM" },
  { value: "2", label: "DJs als Boombox-Society" },
  { value: "100%", label: "Floor-Energie" },
]

export function Stats() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <Media
        src={site.assets.about}
        alt="Voller Dancefloor im Club"
        label="Club / Crowd"
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div className="absolute inset-0 -z-10 bg-background/85" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-background/80" aria-hidden />

      <Container className="py-20 sm:py-28">
        <Reveal>
          <div className="relative max-w-3xl">
            <BrushStroke
              variant="underline"
              className="absolute -bottom-4 left-0 h-6 w-56 text-brand"
            />
            <p className="text-balance font-brush text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95]">
              „Wenn der Raum kippt und alle Hände hoch gehen —{" "}
              <span className="text-brand">dafür</span> mache ich das.“
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="bg-card/80 p-6 backdrop-blur-sm sm:p-8">
                <p className="font-brush text-4xl leading-none text-brand sm:text-5xl">{s.value}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
