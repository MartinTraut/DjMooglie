"use client"

import { useRef } from "react"
import { Quote, Star } from "lucide-react"
import type { Review } from "@/lib/content"

/**
 * Premium review card with a cursor-following brand spotlight, an animated
 * quote mark and a soft lift on hover. Pointer position is fed into CSS custom
 * properties so the glow tracks the mouse without re-rendering React.
 */
export function ReviewCard({ review }: { review: Review }) {
  const ref = useRef<HTMLElement>(null)

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <figure
      ref={ref}
      onMouseMove={handleMove}
      className="group panel panel-hover elevate relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Cursor-following spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklch, var(--brand) 22%, transparent), transparent 60%)",
        }}
      />

      <div className="relative">
        <Quote className="h-7 w-7 text-brand/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" aria-hidden />
        <blockquote className="mt-5 text-pretty text-lg leading-relaxed text-foreground">
          {review.quote}
        </blockquote>
      </div>

      <figcaption className="relative border-t border-border pt-5">
        {typeof review.rating === "number" && (
          <div className="mb-3 flex gap-0.5" aria-label={`${review.rating} von 5 Sternen`}>
            {Array.from({ length: 5 }).map((_, s) => (
              <Star
                key={s}
                className={
                  s < review.rating!
                    ? "h-4 w-4 fill-brand text-brand transition-transform duration-300 group-hover:scale-110"
                    : "h-4 w-4 text-muted-foreground/30"
                }
                style={s < review.rating! ? { transitionDelay: `${s * 40}ms` } : undefined}
                aria-hidden
              />
            ))}
          </div>
        )}
        <p className="font-display text-lg uppercase leading-none tracking-tight">
          {review.author}
        </p>
        {review.role && (
          <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {review.role}
          </p>
        )}
      </figcaption>
    </figure>
  )
}
