"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play, X } from "lucide-react"
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

// Consent is remembered locally so returning visitors aren't asked again.
// § 25 TTDSG: nothing from Mixcloud (US service, cookies) is loaded until the
// visitor actively opts in — that first tap is both the consent and the
// browser-required gesture that unlocks audio autoplay.
const CONSENT_KEY = "moogli:mixcloud-consent"

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
  // `consent` gates whether the Mixcloud iframe + script are allowed to load.
  const [consent, setConsent] = useState(false)
  // First-time visitors see the opt-in prompt; once dismissed or granted it stays gone.
  const [showPrompt, setShowPrompt] = useState(false)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  // Read the stored choice once, client-side. Granted → load straight away
  // (consent persists); otherwise surface the opt-in prompt.
  useEffect(() => {
    let granted = false
    try {
      granted = localStorage.getItem(CONSENT_KEY) === "granted"
    } catch {
      /* storage blocked — treat as no consent, show the prompt */
    }
    if (granted) setConsent(true)
    else setShowPrompt(true)
  }, [])

  const safePlay = useCallback(() => {
    try {
      widgetRef.current?.play()
    } catch {
      /* autoplay can be blocked — the vinyl button is the manual fallback */
    }
  }, [])

  const safePause = useCallback(() => {
    try {
      widgetRef.current?.pause()
    } catch {
      /* widget may not be ready yet — nothing to pause */
    }
  }, [])

  // Opt-in: persist consent, mount the iframe, and start playing. Always called
  // from a real click, so the audio autoplay that follows is allowed.
  const grantConsent = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, "granted")
    } catch {
      /* storage blocked — consent still holds for this session */
    }
    setConsent(true)
    setShowPrompt(false)
  }, [])

  // Boot the Mixcloud widget once consent is given and the iframe is in the DOM.
  useEffect(() => {
    if (!consent) return
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
        safePlay() // attempt autoplay immediately (allowed right after the opt-in tap)
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
  }, [consent, safePlay])

  // Autoplay fallback for returning visitors (consent stored, but no fresh
  // gesture yet): most browsers block sound until the first interaction.
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

  // Stop the music as soon as the visitor leaves the page (switches tab,
  // minimises, or navigates away). We don't auto-resume on return — the vinyl
  // button stays the deliberate control.
  useEffect(() => {
    if (!ready) return
    const onHide = () => {
      if (document.visibilityState === "hidden") safePause()
    }
    document.addEventListener("visibilitychange", onHide)
    window.addEventListener("pagehide", safePause)
    return () => {
      document.removeEventListener("visibilitychange", onHide)
      window.removeEventListener("pagehide", safePause)
    }
  }, [ready, safePause])

  // The floating control doubles as the opt-in trigger: before consent, a tap
  // loads Mixcloud + plays; afterwards it toggles play/pause.
  const handleClick = useCallback(() => {
    if (!consent) grantConsent()
    else widgetRef.current?.togglePlay()
  }, [consent, grantConsent])

  const label = !consent
    ? `Mix anhören: ${site.featuredMix.title} (lädt Mixcloud)`
    : playing
      ? `Mix pausieren: ${site.featuredMix.title}`
      : `Mix abspielen: ${site.featuredMix.title}`

  return (
    <>
      {/* Mixcloud only mounts after opt-in — nothing is requested before that. */}
      {consent && (
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
      )}

      {/* Floating vinyl control */}
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
        <div className="flex flex-col items-end gap-2">
          {/* First-visit opt-in note — explains the Mixcloud load + links the policy */}
          {showPrompt && (
            <div className="relative max-w-[15rem] rounded-2xl border border-white/10 bg-black/85 p-3.5 pr-8 text-left shadow-[0_22px_48px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setShowPrompt(false)}
                aria-label="Hinweis schließen"
                className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                Sound an?
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                Tippe auf die Platte, um den aktuellen Mix zu hören. Dabei wird{" "}
                <span className="text-white/90">Mixcloud</span> geladen — Details in der{" "}
                <Link href="/datenschutz" className="text-brand underline-offset-2 hover:underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleClick}
            aria-label={label}
            aria-pressed={consent ? playing : undefined}
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
              {/* gentle pulse before opt-in, to invite the first tap */}
              {!consent && (
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-brand/40 [animation:vinyl-pulse_2.4s_ease-in-out_infinite] motion-reduce:[animation:none]" />
              )}
            </span>

            <span className="flex max-w-0 flex-col overflow-hidden text-left opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                {!consent ? "Sound an" : playing ? "Now Playing" : "Reinhören"}
              </span>
              <span className="whitespace-nowrap font-display text-sm uppercase leading-none tracking-tight text-white">
                {site.featuredMix.title}
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
