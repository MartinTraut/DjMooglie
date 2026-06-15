import Image from "next/image"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

/**
 * Wordmark lockup "DJ MOOGLI" in the bold grotesk. Uses `currentColor` so the
 * nav can flip it dark (over the white hero) or light (scrolled / dark bg).
 * The "OO" is brand-red, echoing the headphone ear-cups of the real logo.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-display text-[1.7rem] leading-none tracking-tight sm:text-3xl", className)}
      aria-label={site.name}
    >
      DJ&nbsp;M<span className="text-brand">OO</span>GLI
    </span>
  )
}

/**
 * The artist's real "DEEJAY MOOGLI" logo graphic (red/black on white).
 * Designed for placement on a light surface (the white hero block / a chip).
 */
export function BrandLogoImage({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo-red.jpg"
      alt={`${site.name} Logo`}
      width={1024}
      height={1024}
      priority
      className={cn("h-auto w-full object-contain", className)}
    />
  )
}

export function Waveform({ className }: { className?: string }) {
  const bars = [6, 11, 16, 9, 14, 7, 13, 5]
  return (
    <svg
      viewBox="0 0 40 18"
      className={className}
      fill="currentColor"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {bars.map((h, i) => (
        <rect key={i} x={i * 5} y={(18 - h) / 2} width="3" height={h} rx="1.5" />
      ))}
    </svg>
  )
}
