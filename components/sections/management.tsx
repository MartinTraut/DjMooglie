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
        <div className="relative overflow-hidden border border-border bg-card/40">
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
            <div className="brand-spot pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <ChapterNumber n="6" className="-top-6 right-2 opacity-60" />
            <div className="relative lg:col-span-6">
              <SectionLabel>Management</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95]">
                  Vertreten durch
                  <br />
                  <span className="text-brand">{m.company}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  Buchungen, Bookings und Presseanfragen laufen offiziell über
                  das Management von {m.company} in Frankfurt. Schnell, direkt
                  und verbindlich.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <a
                  href={m.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 bg-brand px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-foreground transition-transform duration-200 hover:scale-[1.03]"
                >
                  Profil bei {m.company}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="relative lg:col-span-5 lg:col-start-8">
              <ul className="space-y-1 border border-border bg-background/70 p-6 backdrop-blur">
                <ContactRow icon={<MapPin className="h-4 w-4" />} label="Adresse" value={m.address} />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Telefon"
                  value={m.phone}
                  href={`tel:${m.phoneHref}`}
                />
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="E-Mail"
                  value={m.email}
                  href={`mailto:${m.email}`}
                />
              </ul>
            </Reveal>
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
    <div className="flex items-start gap-4 px-2 py-3 transition-colors hover:bg-secondary">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center bg-secondary text-brand">
        {icon}
      </span>
      <span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span className="block text-sm text-foreground">{value}</span>
      </span>
    </div>
  )
  return (
    <li>
      {href ? (
        <a href={href} className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}
