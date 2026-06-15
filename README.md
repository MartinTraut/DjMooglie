# DJ MOOGLI — Website

Premium One-Pager für den Urban- & Hip-Hop-DJ **DJ Mooglie** (Resident Cooky's
Club Frankfurt, Teil des Duos Boombox-Society).

**Stack:** Next.js 16 (App Router, TS) · Tailwind v4 · shadcn v4 · Framer Motion.

## Sektionen

Hero · Welcher Sound · Stat-Band · Mixtapes (Mixcloud) · Referenzen/Gig History ·
Boombox-Society · EPK · Management (KOMA Music) · Kontakt & Booking · FAQ ·
Impressum · Datenschutz.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production-Build (läuft sauber durch)
npm run typecheck  # TS-Check
npm run lint       # ESLint
```

## Inhalte pflegen

- **Alle Texte/Links/Daten:** `lib/site.ts` (zentrale Quelle der Wahrheit).
- **Fotos:** in `public/images/` ablegen, siehe `public/images/README.md`.
- **Rechtstexte:** `app/impressum/page.tsx`, `app/datenschutz/page.tsx`
  (alle `TODO`-Markierungen ausfüllen, anwaltlich prüfen lassen).

Offene Aufgaben & Designentscheidungen: siehe `PROJECT-BRIEF.md`.

## Deploy

Vercel: Repo verbinden → deploy. Keine Env-Variablen nötig (Booking läuft per
mailto, kein Backend).
