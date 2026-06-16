"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { site } from "@/lib/site"

/* Mixcloud Widget API — loaded at runtime, no types shipped. */
declare global {
  interface Window {
    Mixcloud?: {
      PlayerWidget: (iframe: HTMLIFrameElement) => MixcloudWidget
    }
  }
}
type MixcloudEvent = { on: (cb: () => void) => void }
type MixcloudWidget = {
  ready: Promise<void>
  play: () => void
  pause: () => void
  togglePlay: () => void
  events: { play: MixcloudEvent; pause: MixcloudEvent; ended: MixcloudEvent }
}

const WIDGET_API = "https://widget.mixcloud.com/media/js/widgetApi.js"

/** A pressed-vinyl record. Spins while the mix is playing. */
function Vinyl({ spinning }: { spinning: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-12 w-12 [animation:vinyl-spin_4.5s_linear_infinite] motion-reduce:[animation:none]"
      style={{ animationPlayState: spinning ? "running" : "paused" }}
      aria-hidden
    >
      <circle cx="50" cy="50" r="49" fill="#0b0b0c" />
      <g fill="none" stroke="#26262a" strokeWidth="0.7">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="25" />
      </g>
      {/* light glint sweeping the grooves */}
      <path d="M50 3 A47 47 0 0 1 92 44 L50 50 Z" fill="#ffffff" opacity="0.05" />
      {/* red centre label */}
      <circle cx="50" cy="50" r="16" fill="var(--brand)" />
      <circle cx="50" cy="50" r="16" fill="none" stroke="#0b0b0c" strokeWidth="0.6" opacity="0.4" />
      {/* spindle hole */}
      <circle cx="50" cy="50" r="2.6" fill="#0b0b0c" />
    </svg>
  )
}

export function VinylPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<MixcloudWidget | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  const safePlay = useCallback(() => {
    try {
      widgetRef.current?.play()
    } catch {
      /* autoplay can be blocked — the vinyl button is the manual fallback */
    }
  }, [])

  // Boot the Mixcloud widget once the iframe is in the DOM.
  useEffect(() => {
    let cancelled = false

    function init() {
      if (cancelled || !window.Mixcloud || !iframeRef.current) return
      const widget = window.Mixcloud.PlayerWidget(iframeRef.current)
      widgetRef.current = widget
      widget.ready.then(() => {
        if (cancelled) return
        setReady(true)
        widget.events.play.on(() => setPlaying(true))
        widget.events.pause.on(() => setPlaying(false))
        widget.events.ended.on(() => setPlaying(false))
        safePlay() // attempt autoplay immediately
      })
    }

    if (window.Mixcloud) {
      init()
    } else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_API}"]`)
      if (existing) {
        existing.addEventListener("load", init)
      } else {
        const s = document.createElement("script")
        s.src = WIDGET_API
        s.async = true
        s.onload = init
        document.body.appendChild(s)
      }
    }
    return () => {
      cancelled = true
    }
  }, [safePlay])

  // Autoplay fallback: most browsers block sound until the first gesture.
  // Once the widget is ready, the next pointer/scroll/key event kicks it off.
  useEffect(() => {
    if (!ready || playing) return
    const kick = () => safePlay()
    const opts = { once: true } as const
    window.addEventListener("pointerdown", kick, opts)
    window.addEventListener("keydown", kick, opts)
    window.addEventListener("scroll", kick, opts)
    return () => {
      window.removeEventListener("pointerdown", kick)
      window.removeEventListener("keydown", kick)
      window.removeEventListener("scroll", kick)
    }
  }, [ready, playing, safePlay])

  return (
    <>
      {/* Hidden Mixcloud widget — audio source only, no visible UI. */}
      <iframe
        ref={iframeRef}
        title={`Mixcloud · ${site.featuredMix.title}`}
        aria-hidden
        tabIndex={-1}
        width={0}
        height={0}
        src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(
          site.featuredMix.feed
        )}`}
        className="pointer-events-none fixed left-0 top-0 h-0 w-0 border-0 opacity-0"
        allow="autoplay"
      />

      {/* Floating vinyl control */}
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
        <button
          type="button"
          onClick={() => widgetRef.current?.togglePlay()}
          aria-label={playing ? `Mix pausieren: ${site.featuredMix.title}` : `Mix abspielen: ${site.featuredMix.title}`}
          aria-pressed={playing}
          className="group flex items-center gap-0 rounded-full border border-white/10 bg-black/80 p-1.5 pr-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_22px_48px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:gap-3 hover:border-brand/40 hover:pr-5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_26px_56px_-18px_color-mix(in_oklch,var(--brand)_30%,transparent),0_22px_48px_-18px_rgba(0,0,0,0.7)]"
        >
          <span className="relative grid h-14 w-14 shrink-0 place-items-center">
            <Vinyl spinning={playing} />
            {/* play/pause glyph, revealed on hover */}
            <span className="absolute inset-0 grid place-items-center rounded-full bg-black/0 text-white opacity-0 transition-opacity duration-200 group-hover:bg-black/45 group-hover:opacity-100">
              {playing ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 translate-x-px fill-current" />
              )}
            </span>
            {/* live ring while playing */}
            {playing && (
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-brand/50" />
            )}
          </span>

          <span className="flex max-w-0 flex-col overflow-hidden text-left opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
              {playing ? "Now Playing" : "Reinhören"}
            </span>
            <span className="whitespace-nowrap font-display text-sm uppercase leading-none tracking-tight text-white">
              {site.featuredMix.title}
            </span>
          </span>
        </button>
      </div>
    </>
  )
}
