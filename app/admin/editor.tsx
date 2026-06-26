"use client"

import { useRef, useState, useTransition } from "react"
import {
  Check,
  ChevronDown,
  ChevronUp,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react"
import type { AdminData } from "@/lib/cms/admin"
import {
  saveCollection,
  saveSiteContent,
  uploadImage,
  type CollectionName,
} from "./actions"

/* ============================================================ primitives == */

function TextField({
  label,
  value,
  onChange,
  multiline,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  placeholder?: string
}) {
  const cls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-brand focus:bg-white/10"
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-neutral-300">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={cls + " resize-y leading-relaxed"}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  )
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string | null
  onChange: (v: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleFile(file: File) {
    setErr(null)
    setBusy(true)
    const fd = new FormData()
    fd.append("file", file)
    const res = await uploadImage(fd)
    setBusy(false)
    if (res.ok && res.url) onChange(res.url)
    else setErr(res.error ?? "Upload fehlgeschlagen")
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-neutral-300">{label}</span>
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-300">
              <ImagePlus className="h-5 w-5" />
            </div>
          )}
          {busy && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:bg-white/5"
          >
            Bild wählen
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="rounded-lg px-3 py-1.5 text-left text-xs text-destructive transition-colors hover:bg-destructive/10"
            >
              Entfernen
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            e.target.value = ""
          }}
        />
      </div>
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  )
}

function SectionCard({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-card/50 p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-neutral-300">{hint}</p>}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

function ListEditor<T>({
  items,
  onChange,
  blank,
  addLabel,
  renderRow,
}: {
  items: T[]
  onChange: (next: T[]) => void
  blank: () => T
  addLabel: string
  renderRow: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode
}) {
  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative rounded-xl border border-white/10 bg-white/[0.03] p-4 pr-10"
        >
          <div className="flex flex-col gap-3">
            {renderRow(item, (patch) => {
              const next = [...items]
              next[i] = { ...item, ...patch }
              onChange(next)
            })}
          </div>
          <div className="absolute right-2 top-2 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="rounded p-1 text-neutral-300 hover:bg-white/5 hover:text-foreground disabled:opacity-30"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              className="rounded p-1 text-neutral-300 hover:bg-white/5 hover:text-foreground disabled:opacity-30"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, k) => k !== i))}
              className="rounded p-1 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, blank()])}
        className="inline-flex items-center gap-1.5 self-start rounded-lg border border-dashed border-white/15 px-3 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-brand hover:text-brand"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  )
}

/* ================================================================ editor == */

export function Editor({ initial }: { initial: AdminData }) {
  const [draft, setDraft] = useState<AdminData>(initial)
  const [baseline, setBaseline] = useState<AdminData>(initial)
  const [pending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dirty = JSON.stringify(draft) !== JSON.stringify(baseline)

  const c = draft.content
  const setContent = (patch: Partial<typeof c>) =>
    setDraft((d) => ({ ...d, content: { ...d.content, ...patch } }))

  function save() {
    setError(null)
    startTransition(async () => {
      const r1 = await saveSiteContent(draft.content)
      if (!r1.ok) {
        setError(r1.error ?? "Speichern fehlgeschlagen")
        return
      }
      const collections: [CollectionName, Record<string, unknown>[]][] = [
        ["reviews", draft.reviews],
        ["faq_items", draft.faq_items],
        ["mixtapes", draft.mixtapes],
        ["sound_pillars", draft.sound_pillars],
        ["stat_items", draft.stat_items],
      ]
      for (const [name, rows] of collections) {
        const r = await saveCollection(name, rows)
        if (!r.ok) {
          setError(`${name}: ${r.error ?? "Fehler"}`)
          return
        }
      }
      setBaseline(draft)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    })
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
        <div className="flex flex-col gap-5">
          {/* Hero & Bio */}
          <SectionCard title="Hero & Bio" hint="Der erste Eindruck ganz oben.">
            <TextField
              label="Bio-Text"
              value={c.hero_bio}
              onChange={(v) => setContent({ hero_bio: v })}
              multiline
            />
            <TextField
              label="Genre-Zeile (Tagline)"
              value={c.tagline}
              onChange={(v) => setContent({ tagline: v })}
            />
            <ImageField
              label="Hero-Bild"
              value={c.img_hero}
              onChange={(v) => setContent({ img_hero: v })}
            />
          </SectionCard>

          {/* Nächster Gig */}
          <SectionCard title="Nächster Gig" hint="Dein nächster Auftritt.">
            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={c.event_active}
                onChange={(e) => setContent({ event_active: e.target.checked })}
                className="h-4 w-4 accent-[var(--brand)]"
              />
              <span className="text-sm text-neutral-200">
                Gig anzeigen (Häkchen weg = Bereich ausgeblendet)
              </span>
            </label>
            <TextField
              label="Datum"
              value={c.event_date}
              onChange={(v) => setContent({ event_date: v })}
              placeholder="Sa · 12. Juli 2026"
            />
            <TextField
              label="Club / Venue"
              value={c.event_venue}
              onChange={(v) => setContent({ event_venue: v })}
            />
            <TextField
              label="Stadt"
              value={c.event_city}
              onChange={(v) => setContent({ event_city: v })}
            />
            <TextField
              label="Zusatz (optional)"
              value={c.event_note ?? ""}
              onChange={(v) => setContent({ event_note: v })}
              placeholder="Line-up, Startzeit …"
            />
            <TextField
              label="Ticket-Link (optional)"
              value={c.event_ticket_url ?? ""}
              onChange={(v) => setContent({ event_ticket_url: v })}
            />
            <ImageField
              label="Event-Bild (optional)"
              value={c.event_image}
              onChange={(v) => setContent({ event_image: v })}
            />
          </SectionCard>

          {/* Sound */}
          <SectionCard title="Sound" hint="Deine musikalische Handschrift.">
            <TextField
              label="Intro-Text"
              value={c.sound_intro}
              onChange={(v) => setContent({ sound_intro: v })}
              multiline
            />
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-300">Säulen</p>
              <ListEditor
                items={draft.sound_pillars}
                onChange={(v) => setDraft((d) => ({ ...d, sound_pillars: v }))}
                blank={() => ({ title: "", text: "" })}
                addLabel="Säule hinzufügen"
                renderRow={(item, update) => (
                  <>
                    <TextField
                      label="Titel"
                      value={item.title}
                      onChange={(v) => update({ title: v })}
                    />
                    <TextField
                      label="Text"
                      value={item.text}
                      onChange={(v) => update({ text: v })}
                      multiline
                    />
                  </>
                )}
              />
            </div>
          </SectionCard>

          {/* Über mich */}
          <SectionCard title="Über mich" hint="Wer du bist, wo du spielst.">
            <TextField
              label="Titel"
              value={c.about_title}
              onChange={(v) => setContent({ about_title: v })}
            />
            <TextField
              label="Titel-Akzent (zweite Zeile)"
              value={c.about_title_accent}
              onChange={(v) => setContent({ about_title_accent: v })}
            />
            <TextField
              label="Text"
              value={c.about_body}
              onChange={(v) => setContent({ about_body: v })}
              multiline
            />
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-300">
                Regionen (Pills)
              </p>
              <ListEditor
                items={draft.content.regions.map((r) => ({ value: r }))}
                onChange={(v) =>
                  setContent({ regions: v.map((x) => x.value) })
                }
                blank={() => ({ value: "" })}
                addLabel="Region hinzufügen"
                renderRow={(item, update) => (
                  <TextField
                    label="Region"
                    value={item.value}
                    onChange={(v) => update({ value: v })}
                  />
                )}
              />
            </div>
            <ImageField
              label="Über-mich-Bild"
              value={c.img_about}
              onChange={(v) => setContent({ img_about: v })}
            />
          </SectionCard>

          {/* Stats & Zitat */}
          <SectionCard title="Stats & Zitat" hint="Zahlen und dein Statement.">
            <TextField
              label="Großes Zitat"
              value={c.stats_quote}
              onChange={(v) => setContent({ stats_quote: v })}
              multiline
            />
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-300">Zahlen</p>
              <ListEditor
                items={draft.stat_items}
                onChange={(v) => setDraft((d) => ({ ...d, stat_items: v }))}
                blank={() => ({ value: "", label: "" })}
                addLabel="Zahl hinzufügen"
                renderRow={(item, update) => (
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      label="Wert"
                      value={item.value}
                      onChange={(v) => update({ value: v })}
                    />
                    <TextField
                      label="Beschriftung"
                      value={item.label}
                      onChange={(v) => update({ label: v })}
                    />
                  </div>
                )}
              />
            </div>
            <ImageField
              label="Stats-Hintergrundbild"
              value={c.img_stats}
              onChange={(v) => setContent({ img_stats: v })}
            />
          </SectionCard>

          {/* Mixtapes */}
          <SectionCard title="Mixtapes" hint="Deine Mixe (z. B. Mixcloud).">
            <ListEditor
              items={draft.mixtapes}
              onChange={(v) => setDraft((d) => ({ ...d, mixtapes: v }))}
              blank={() => ({ title: "", description: "", tag: "", href: "" })}
              addLabel="Mixtape hinzufügen"
              renderRow={(item, update) => (
                <>
                  <TextField
                    label="Titel"
                    value={item.title}
                    onChange={(v) => update({ title: v })}
                  />
                  <TextField
                    label="Beschreibung"
                    value={item.description}
                    onChange={(v) => update({ description: v })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      label="Tag"
                      value={item.tag}
                      onChange={(v) => update({ tag: v })}
                    />
                    <TextField
                      label="Link"
                      value={item.href}
                      onChange={(v) => update({ href: v })}
                    />
                  </div>
                </>
              )}
            />
          </SectionCard>

          {/* Rezensionen */}
          <SectionCard title="Rezensionen" hint="Stimmen zufriedener Kunden.">
            <ListEditor
              items={draft.reviews}
              onChange={(v) => setDraft((d) => ({ ...d, reviews: v }))}
              blank={() => ({ quote: "", author: "", role: "", rating: 5 })}
              addLabel="Rezension hinzufügen"
              renderRow={(item, update) => (
                <>
                  <TextField
                    label="Zitat"
                    value={item.quote}
                    onChange={(v) => update({ quote: v })}
                    multiline
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <TextField
                      label="Name"
                      value={item.author}
                      onChange={(v) => update({ author: v })}
                    />
                    <TextField
                      label="Kontext"
                      value={item.role ?? ""}
                      onChange={(v) => update({ role: v })}
                    />
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-neutral-300">
                        Sterne
                      </span>
                      <select
                        value={item.rating ?? 5}
                        onChange={(e) =>
                          update({ rating: Number(e.target.value) })
                        }
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground outline-none focus:border-brand"
                      >
                        {[5, 4, 3, 2, 1].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </>
              )}
            />
          </SectionCard>

          {/* FAQ */}
          <SectionCard title="FAQ" hint="Häufige Fragen und Antworten.">
            <ListEditor
              items={draft.faq_items}
              onChange={(v) => setDraft((d) => ({ ...d, faq_items: v }))}
              blank={() => ({ question: "", answer: "" })}
              addLabel="Frage hinzufügen"
              renderRow={(item, update) => (
                <>
                  <TextField
                    label="Frage"
                    value={item.question}
                    onChange={(v) => update({ question: v })}
                  />
                  <TextField
                    label="Antwort"
                    value={item.answer}
                    onChange={(v) => update({ answer: v })}
                    multiline
                  />
                </>
              )}
            />
          </SectionCard>

          {/* Bilder */}
          <SectionCard title="Weitere Bilder" hint="Boombox-Society & EPK.">
            <ImageField
              label="Boombox-Society Bild"
              value={c.img_boombox}
              onChange={(v) => setContent({ img_boombox: v })}
            />
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-300">
                EPK-Galerie
              </p>
              <ListEditor
                items={draft.content.img_epk.map((u) => ({ url: u }))}
                onChange={(v) =>
                  setContent({ img_epk: v.map((x) => x.url).filter(Boolean) })
                }
                blank={() => ({ url: "" })}
                addLabel="EPK-Bild hinzufügen"
                renderRow={(item, update) => (
                  <ImageField
                    label="Bild"
                    value={item.url || null}
                    onChange={(v) => update({ url: v ?? "" })}
                  />
                )}
              />
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Sammel-Speichern-Balken */}
      {(dirty || saved || error) && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/90 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm text-neutral-300">
              {error ? (
                <span className="text-destructive">{error}</span>
              ) : saved ? (
                <span className="inline-flex items-center gap-1.5 text-brand">
                  <Check className="h-4 w-4" /> Gespeichert
                </span>
              ) : (
                "Du hast ungespeicherte Änderungen."
              )}
            </p>
            <div className="flex items-center gap-2">
              {dirty && (
                <button
                  type="button"
                  onClick={() => setDraft(baseline)}
                  disabled={pending}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-neutral-300 hover:text-foreground disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" /> Verwerfen
                </button>
              )}
              <button
                type="button"
                onClick={save}
                disabled={pending || !dirty}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-foreground transition-all hover:bg-brand/90 disabled:opacity-50"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                {pending ? "Speichern …" : "Speichern"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
