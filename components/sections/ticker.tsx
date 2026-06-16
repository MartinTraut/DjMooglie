import { Marquee } from "@/components/shared/marquee"
import { site } from "@/lib/site"

const items = [
  "Neues Mixtape: Urban Flavour",
  "Booking 2026 offen",
  `Resident · ${site.resident}`,
  `Folge ${site.socials.instagramHandle}`,
  "Boombox-Society",
  "Hip-Hop · R'n'B · Afro · Baile Funk · Latin",
]

export function Ticker() {
  return (
    <div className="banner-red relative grain border-y border-white/10 py-3.5 text-brand-foreground">
      <Marquee durationSeconds={34}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-xs font-bold uppercase tracking-[0.18em] sm:text-sm">
              {t}
            </span>
            <span aria-hidden className="text-white/60">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
