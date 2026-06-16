import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Renders a real photo via next/image when `src` is set, otherwise a branded
 * placeholder so the layout reads as finished before the client supplies assets.
 * Swap placeholders by setting the matching entry in `site.assets`.
 */
export function Media({
  src,
  alt,
  label,
  className,
  sizes = "100vw",
  priority = false,
  bw = true,
}: {
  src?: string | null
  alt: string
  label?: string
  className?: string
  sizes?: string
  priority?: boolean
  /** Render the photo black-and-white (default) — red stays the only color. */
  bw?: boolean
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-card grain", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", bw && "bw")}
        />
      ) : (
        <Placeholder label={label ?? alt} />
      )}
    </div>
  )
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center brand-spot">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, color-mix(in oklch, var(--foreground) 6%, transparent), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-brand">
          <path
            d="M4 14a8 8 0 0 1 16 0v3a2 2 0 0 1-2 2h-1v-6h3M4 14v3a2 2 0 0 0 2 2h1v-6H4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Foto · {label}
        </span>
      </div>
    </div>
  )
}
