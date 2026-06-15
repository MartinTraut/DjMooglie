import { cn } from "@/lib/utils"

/**
 * Hand-painted red brush stroke — the signature decorative element of the
 * press-kit aesthetic. Layered behind/over photos and titles. Purely
 * decorative (aria-hidden). Color follows `currentColor` → set `text-brand`.
 */
export function BrushStroke({
  className,
  variant = "slash",
}: {
  className?: string
  variant?: "slash" | "underline" | "smear"
}) {
  if (variant === "underline") {
    return (
      <svg viewBox="0 0 600 60" className={className} fill="currentColor" aria-hidden preserveAspectRatio="none">
        <path d="M8 38c80-14 150-12 250-16 120-5 220 2 332 10 6 .5 4 9-2 9-110 4-214 0-330 4-86 3-160 6-244 14-9 .9-12-13-6-21Z" />
        <path d="M40 50c150-10 360-12 520-6 7 .3 6 7-1 7-160 3-368 5-516 12-7 .4-9-12-3-13Z" opacity="0.7" />
      </svg>
    )
  }
  if (variant === "smear") {
    return (
      <svg viewBox="0 0 600 220" className={className} fill="currentColor" aria-hidden preserveAspectRatio="none">
        <path d="M20 120c70-44 150-70 250-72 96-2 196 16 300 54 16 6 12 30-6 34-104 22-196 30-300 24-92-5-168-18-244-44-14-5-14-44 0-50Z" />
        <path d="M70 96c120-26 300-22 460 10 12 2 10 18-2 18-150 8-318 4-450 24-12 2-20-48-8-52Z" opacity="0.55" />
      </svg>
    )
  }
  // slash — bold diagonal paint stroke
  return (
    <svg viewBox="0 0 640 260" className={className} fill="currentColor" aria-hidden preserveAspectRatio="none">
      <path d="M16 196C140 150 300 96 470 44c52-16 120-30 150-28 22 1 18 26-2 34-150 56-300 104-452 156-44 15-118 36-140 30-18-5-12-30 0-40Z" />
      <path d="M70 232c170-58 360-120 520-150 14-3 18 14 4 19-160 52-330 112-498 156-16 4-42-19-26-25Z" opacity="0.65" />
      <path d="M150 60c120-30 260-44 330-40 14 .8 12 16-2 18-110 10-230 26-340 52-12 3-12-26 12-30Z" opacity="0.45" />
    </svg>
  )
}

/**
 * Oversized faint chapter numeral that sits behind a section heading,
 * echoing the magazine "1 / 2 / 3" page numbers of the press kit.
 */
export function ChapterNumber({
  n,
  className,
}: {
  n: number | string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "chapter-num pointer-events-none absolute select-none text-[clamp(7rem,22vw,18rem)]",
        className
      )}
    >
      {n}
    </span>
  )
}

/**
 * Faint repeated "echo" of a word running behind the headline
 * (e.g. REFERENZEN · REFERENZEN · REFERENZEN), as in the press kit.
 */
export function EchoLine({
  text,
  className,
  repeat = 4,
}: {
  text: string
  className?: string
  repeat?: number
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none block truncate font-brush text-white/[0.045]",
        className
      )}
    >
      {Array.from({ length: repeat })
        .map(() => text)
        .join("  ·  ")}
    </span>
  )
}
