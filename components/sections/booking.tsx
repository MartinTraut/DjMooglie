"use client"

import * as React from "react"
import { Check, Mail, Phone, Send } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal } from "@/components/shared/reveal"
import { ChapterNumber } from "@/components/shared/brush"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const inputCls =
  "w-full border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring/40"
const labelCls = "mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"

export function Booking() {
  const [sent, setSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()

    const subject = `Booking-Anfrage — ${get("event") || "Event"} · ${get("date") || "Datum offen"}`
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
            <ChapterNumber n="7" className="-top-16 -left-2 lg:-left-6" />
            <div className="relative">
              <SectionLabel>Kontakt & Booking</SectionLabel>
              <Reveal>
                <h2 className="mt-5 font-brush text-[clamp(3rem,9vw,6.5rem)] leading-[0.95]">
                  Book
                  <br />
                  <span className="text-brand">Contact</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  Club-Night, Festival, Firmenevent oder Private Party? Schick die
                  Eckdaten und du bekommst zeitnah eine Rückmeldung — direkt oder
                  über das Management.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center gap-4 border border-border bg-card p-4 transition-colors hover:border-brand"
                  >
                    <span className="grid h-10 w-10 place-items-center bg-secondary text-brand">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Direkt
                      </span>
                      <span className="text-sm text-foreground">{site.email}</span>
                    </span>
                  </a>
                  <a
                    href={`tel:${site.management.phoneHref}`}
                    className="group flex items-center gap-4 border border-border bg-card p-4 transition-colors hover:border-brand"
                  >
                    <span className="grid h-10 w-10 place-items-center bg-secondary text-brand">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Management · {site.management.company}
                      </span>
                      <span className="text-sm text-foreground">{site.management.phone}</span>
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="border border-border bg-card p-6 sm:p-8">
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
                  className="inline-flex items-center gap-2 bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-foreground transition-transform duration-200 hover:scale-[1.03] hover:bg-brand/90"
                >
                  {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                  {sent ? "Mail geöffnet" : "Anfrage senden"}
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
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
