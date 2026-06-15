import { Download, FileText, ImageIcon } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Media } from "@/components/shared/media"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { BrandLogoImage } from "@/components/logo"
import { ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"

const facts = [
  { k: "Künstlername", v: "DJ Mooglie" },
  { k: "Herkunft", v: "Raum Heilbronn" },
  { k: "Resident", v: "Cooky's Club, Frankfurt" },
  { k: "Genres", v: "Hip-Hop · R'n'B · Afro · Baile Funk · Latin" },
  { k: "Duo", v: "Boombox-Society (mit DJ Soulrocca)" },
  { k: "Management", v: "KOMA Music, Frankfurt" },
]

export function EPK() {
  return (
    <section id="epk" className="relative scroll-mt-20 overflow-hidden border-t border-border bg-card/30 py-20 sm:py-28">
      <Container className="relative">
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="relative">
            <ChapterNumber n="5" className="-top-16 right-0 translate-x-1/3" />
            <SectionLabel>Electronic Press Kit</SectionLabel>
            <Reveal>
              <h2 className="relative mt-5 font-brush text-[clamp(3rem,9vw,7rem)] leading-[0.8]">
                Press <span className="text-brand">Kit</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Alles für Veranstalter & Presse — Bio, Fotos und Logo zum Download.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Press photos */}
          <Reveal className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {site.assets.epk.map((src, i) => (
                <Media
                  key={i}
                  src={src}
                  alt={`Pressefoto DJ Mooglie ${i + 1}`}
                  label={`Pressefoto ${i + 1}`}
                  sizes="(max-width: 1024px) 45vw, 30vw"
                  className={
                    i % 3 === 0
                      ? "aspect-[3/4] border border-border"
                      : "aspect-square border border-border"
                  }
                />
              ))}
            </div>
          </Reveal>

          {/* Real logo + facts + downloads */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center justify-center border border-border bg-white px-6 py-8">
                <BrandLogoImage className="max-w-[16rem]" />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="mt-5 divide-y divide-border overflow-hidden border border-border bg-card">
                {facts.map((f) => (
                  <div key={f.k} className="flex gap-4 p-4">
                    <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {f.k}
                    </dt>
                    <dd className="text-sm text-foreground">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DownloadCard
                  href="#booking"
                  icon={<FileText className="h-4 w-4" />}
                  title="Bio & Rider"
                  note="PDF anfragen"
                />
                <DownloadCard
                  href="#booking"
                  icon={<ImageIcon className="h-4 w-4" />}
                  title="Pressefotos"
                  note="Print-Auflösung"
                />
              </div>
            </Reveal>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
              {/* TODO: link to real /press-kit.zip and /logo.png download */}
              Downloads auf Anfrage über das Booking-Formular
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

function DownloadCard({
  href,
  icon,
  title,
  note,
}: {
  href: string
  icon: React.ReactNode
  title: string
  note: string
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between border border-border bg-background p-4 transition-colors hover:border-brand"
    >
      <span className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center bg-secondary text-brand">{icon}</span>
        <span>
          <span className="block text-sm font-semibold">{title}</span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {note}
          </span>
        </span>
      </span>
      <Download className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand" />
    </a>
  )
}
