import { cn } from "@/lib/utils"

/**
 * Seamless horizontal marquee. Renders the children twice so the CSS
 * translateX(-50%) loop is gapless. Pauses for prefers-reduced-motion.
 */
export function Marquee({
  children,
  reverse = false,
  durationSeconds = 32,
  className,
  itemClassName,
}: {
  children: React.ReactNode
  reverse?: boolean
  durationSeconds?: number
  className?: string
  itemClassName?: string
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center",
            reverse ? "marquee-reverse" : "marquee",
            itemClassName
          )}
          style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
