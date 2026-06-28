"use client"

import * as React from "react"
import { Check, Mail, Phone, Send } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"
import { siteText } from "@/lib/content"
import { cn } from "@/lib/utils"

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/80 transition-all duration-200 ease-out focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 hover:border-muted-foreground/40"
const labelCls = "mb-2 block font-mono text-[13px] uppercase tracking-[0.14em] text-neutral-200"

export function Booking({
  eyebrow = siteText.bookingEyebrow,
  title = siteText.bookingTitle,
  titleAccent = siteText.bookingTitleAccent,
  intro = siteText.bookingIntro,
}: {
  eyebrow?: string
  title?: string
  titleAccent?: string
  intro?: string
} = {}) {
  const [sent, setSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()

    const subject = `Booking-Anfrage · ${get("event") || "Event"} · ${get("date") || "Datum offen"}`
    const body = [
      `Name: ${get("name")}`,
      `E-Mail: ${get("email")}`,
      `Telefon: ${get("phone")}`,
      `Event / Art: ${get("event")}`,
      `Datum: ${get("date")}`,
      `Ort / Location: ${get("location")}`,
      "",
      "Nachricht:",
      get("message"),
    ].join("\n")

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="booking" className="relative scroll-mt-20 overflow-hidden border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro + direct contact */}
          <div className="relative lg:col-span-5">
            <ChapterNumber n="8" className="-top-16 -left-2 lg:-left-6" />
            <div className="relative">
              <SectionLabel>{eyebrow}</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05]">
                  {title}
                  <br />
                  <span className="text-brand">{titleAccent}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                  {intro}
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="group panel panel-hover flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 ease-out hover:-translate-y-0.5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[13px] uppercase tracking-[0.14em] text-neutral-200">
                        Direkt
                      </span>
                      <span className="text-base text-foreground sm:text-lg">{site.email}</span>
                    </span>
                  </a>
                  <a
                    href={`tel:${site.management.phoneHref}`}
                    className="group panel panel-hover flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 ease-out hover:-translate-y-0.5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[13px] uppercase tracking-[0.14em] text-neutral-200">
                        Management · {site.management.company}
                      </span>
                      <span className="text-base text-foreground sm:text-lg">{site.management.phone}</span>
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="panel elevate rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name *">
                  <input name="name" required placeholder="Dein Name" className={inputCls} />
                </Field>
                <Field label="E-Mail *">
                  <input name="email" type="email" required placeholder="name@mail.de" className={inputCls} />
                </Field>
                <Field label="Telefon">
                  <input name="phone" placeholder="+49 …" className={inputCls} />
                </Field>
                <Field label="Event / Art">
                  <input name="event" placeholder="Club, Festival, Private …" className={inputCls} />
                </Field>
                <Field label="Datum">
                  <input name="date" placeholder="TT.MM.JJJJ" className={inputCls} />
                </Field>
                <Field label="Ort / Location">
                  <input name="location" placeholder="Stadt / Venue" className={inputCls} />
                </Field>
              </div>
              <div className="mt-5">
                <label className={labelCls}>Nachricht</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Erzähl kurz von deinem Event …"
                  className={cn(inputCls, "resize-none")}
                />
              </div>

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-foreground shadow-[0_14px_34px_-14px_color-mix(in_oklch,var(--brand)_75%,transparent)] transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-brand/90 active:scale-[0.99]"
                >
                  {sent ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                  {sent ? "Mail geöffnet" : "Anfrage senden"}
                </button>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Öffnet dein Mailprogramm · {site.email}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  )
}
