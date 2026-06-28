import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.26em] text-brand",
        className
      )}
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden />
      {children}
    </span>
  )
}
