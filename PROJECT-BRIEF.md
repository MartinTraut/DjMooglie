# Project Brief — DJ MOOGLI

> Autonom abgeleitet vom website-builder Skill am 2026-06-15 aus:
> Kundenbrief + offizielle Management-Seite (komamusic.de/artists/moogli).
> Bitte Annahmen prüfen und alle `TODO` vor Go-Live auflösen.

## 1. Quelle & Ingestion

- **Typ:** Neubau (One-Pager + Rechtsseiten)
- **Verifizierte Quelle:** https://www.komamusic.de/artists/moogli/
- **Extrahierte Fakten (verifiziert):**
  - Künstler: DJ Mooglie / „Moogli“ — Urban DJ aus dem Raum Heilbronn
  - Resident im Cooky's Club, Frankfurt am Main
  - Genres: Hip-Hop, R'n'B, Afro, Baile Funk, Latin
  - Instagram @djmoogli, Mixcloud DjMoogli
  - Management: KOMA Music, Daimlerstr. 32, 60314 Frankfurt, +49 (0)69 677 38 346, info@komamusic.de
  - Duo „Boombox-Society“ mit DJ Soulrocca (aus Kundenbrief)
  - Kontakt: info@djmoogli.de

## 2. Strategie

- **Zielgruppe:** Veranstalter, Clubs, Booking-Agenturen, Event-/Hochzeitsplaner.
  Intent: schnell prüfen ob Sound & Vibe passen, dann unkompliziert buchen.
- **Positionierung:** Junger, energiegeladener Urban-/Hip-Hop-DJ mit Club-Pedigree
  (Cooky's Resident). „Premium“ heißt hier: bold, street-but-clean, dunkel,
  poster-typografisch — nicht clean-corporate.
- **Fünf UX-Antworten:**
  1. Was? → Hero („Urban & Hip-Hop DJ“)
  2. Für wen? → Sound + Referenzen (Clubs/Events)
  3. Warum besser? → Sound-Pillars (Crowd-Reading, Genre-Crossing, Club-Sound)
  4. Warum vertrauen? → Resident Cooky's Club, Gig History, Management, Mixtapes
  5. Nächster Schritt? → Booking-Formular / Direktkontakt
- **Primäres Conversion-Ziel:** Booking-Anfrage (Formular → Mail + KOMA-Telefon)
- **Architektur:** One-Pager (`/`) mit Sektionen Hero → Sound → Stats → Mixtapes
  → Referenzen → Boombox-Society → EPK → Management → Booking → FAQ + Footer.
  Rechtsseiten `/impressum`, `/datenschutz`.

## 3. Design-System (abgeleitet)

- **Farben:** Near-Black Base (oklch 0.145), Off-White Foreground, Brand-Rot
  (oklch 0.585/0.224/25.5) als einzige Markenfarbe, dezenter Ember-Orange nur
  für Verlauf-Akzente. Dark-only (Club-Ästhetik), Theme forciert dunkel.
- **Typografie:** Anton (Display, condensed, Poster-Look, Uppercase) + Geist Sans
  (Body) + Geist Mono (Kicker/Labels). Max. 2 Hauptfamilien.
- **Spacing/Radius/Shadow:** großzügiger Weißraum, Radius 0.5rem, Hairline-Borders
  statt Schatten, Film-Grain-Overlay + Brand-Spotlight-Gradient für Tiefe.
- **Motion:** Framer Motion, 180–450ms, Easing [0.22,1,0.36,1]. Reveal-on-scroll,
  Hero-Wordmark-Mask-Reveal, Genre-Marquee, Hover-Lift, Hero-Parallax.
  Respektiert `prefers-reduced-motion`.
- **Layout:** asymmetrisches 12-Spalten-Grid, full-bleed Marquee & Stat-Band,
  typografische Dominanz statt Card-Friedhof.

## 4. Copywriting

- **Sprache:** Deutsch.
- **Tonalität:** direkt, energetisch, street-premium; keine Floskeln/KI-Sprache.
- Fakten aus Quelle erhalten; Sprache gehoben; nichts erfunden.

## 5. Build

- **Stack:** Next.js 16 (App Router, TS) + Tailwind v4 + shadcn v4 + Framer Motion.
  (Bestehendes Scaffold respektiert — kein src-dir, Tailwind v4 @theme-Tokens.)
- **Shop:** nein.
- **Besonderheiten:** zentrale `lib/site.ts`, `<Media>`-Platzhaltersystem,
  SVG-Wordmark-Logo, JSON-LD @graph (Person/MusicGroup/Organization/WebSite) +
  FAQPage, sitemap/robots, Booking-Formular via mailto.

## 6. Getroffene Annahmen

- Markenschreibweise „MOOGLI“ im Wordmark (Logo + Management); E-Mail laut
  Brief „djmoogli.de“ beibehalten.
- Dark-only Design passend zur Club-/Hip-Hop-Identität.
- Mixtape-Titel sind Platzhalter-Beispiele bis echte Mixcloud-Shows vorliegen.
- Booking ohne Server-Backend → mailto (funktioniert sofort, kein Hosting-Setup).

## 7. Offene TODOs für den Kunden (must resolve)

- [x] **Fotos integriert**: Pressekit web-optimiert in `public/images/`
      (hero/about/boombox/press-1…4). Originale in `pressekit-original/`.
- [ ] **Logo**: aktuell SVG-Wordmark (sauber auf Dark). Echtes Logo bräuchte
      transparenten Hintergrund — die gelieferten PNGs haben weißen BG
      (`logo-red.jpg` als Download-Asset hinterlegt).
- [ ] **Impressum**: ladungsfähige Anschrift, Name, Telefon, ggf. USt-IdNr.
- [ ] **Datenschutz**: Hoster eintragen, anwaltlich prüfen lassen.
- [ ] **Mixcloud-URL** & echte Mixtape-Titel/Links in `lib/site.ts` bestätigen.
- [ ] **Gig History**: weitere echte Venues/Events ergänzen.
- [ ] **Boombox-Society**: Links (Instagram/Mixcloud) ergänzen, falls vorhanden.
- [ ] **Domain** in `lib/site.ts` → `baseUrl` final setzen.
- [ ] Optional: serverseitiges Form-Backend (Resend/Formspree) statt mailto.
- [ ] Bildnachweis/Fotograf:in im Impressum nennen.

## 8. Run & Deploy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # läuft sauber durch (verifiziert)
```

Deploy: Vercel (Repo verbinden; keine Env-Variablen nötig, da kein Backend).
