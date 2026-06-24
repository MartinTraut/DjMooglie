# Live-Admin-Portal mit Supabase — Design

**Datum:** 2026-06-24
**Status:** Zur Review
**Ziel:** Sanity vollständig durch Supabase ersetzen und dem DJ ein **visuelles Live-Bearbeiten** seiner eigenen Website ermöglichen — kein technisches Studio, kein Formular-Dashboard, sondern „die echte Seite mit Bearbeiten-Stiften".

---

## 1. Produktidee (in einem Satz)

Der DJ ruft `djmoogli.de/admin` auf, loggt sich mit E-Mail + Passwort ein und sieht **seine echte Website als bearbeitbare Vorschau**: Texte klickt er an und ändert sie direkt im Layout, Bilder tauscht er per „Ändern / Entfernen" aus. Geänderte Stellen sammelt ein **Speichern-Balken**; ein Klick macht alles live. Alles ist hinter Login + Postgres-RLS wasserdicht abgesichert.

## 2. Entscheidungen (vom Nutzer bestätigt)

| Thema | Entscheidung |
|---|---|
| Login | E-Mail + Passwort (Account einmalig durch Agentur angelegt) |
| Sanity | **Komplett entfernen** — eine einzige Quelle (Supabase) |
| URL | Echte Route `/admin` (Middleware-geschützt) |
| Editor-Typ | **Live-Inline auf der echten Seite** (kein Formular-Dashboard) |
| Speichern | **Sammel-Speichern** über sichtbaren Speichern-Balken |

## 3. Architektur

```
Öffentliche Seite (/)              Admin (/admin)
  Server Components                  Middleware prüft Supabase-Session
  lesen via Supabase (anon)            │  (kein Login → /admin/login)
        │                              ▼
        │                        Gleiche Sections, in EditMode gerendert
        ▼                        EditableText / EditableImage werden aktiv
  Fallback → lib/content.ts            │  Änderungen sammeln (Client-State)
  wenn DB leer/offline                 ▼  „Speichern" → Batch-Write
                                  Supabase Postgres + Storage
                                       │
                                  revalidatePath('/') → sofort live
```

**Kernprinzip:** Datenquelle wechselt, Sections bleiben. Die öffentliche Seite und der Editor rendern **dieselben** Section-Komponenten. Der Unterschied ist nur ein `EditModeProvider`, der die Felder interaktiv macht.

## 4. Inline-Editing-Mechanik

Zwei kleine Wrapper, die überall in den Sections die rohen Werte ersetzen:

- **`<EditableText id="heroBio">{text}</EditableText>`**
  - Öffentlich: rendert schlicht den Text (kein Overhead, kein Verhalten).
  - Im EditMode: `contentEditable`, Hover-Outline, bei Fokus editierbar; Änderung landet im Client-Draft-State (noch nicht in DB).
- **`<EditableImage id="hero" src={url} />`**
  - Öffentlich: normales Bild (heutiges `Media`-Verhalten).
  - Im EditMode: Overlay mit „Ändern" (Datei-Upload → Supabase Storage → neue URL in Draft) und „Entfernen" (zurück auf Platzhalter).

Listen (Rezensionen, FAQ, Mixtapes, Sound-Säulen, Stats) bekommen im EditMode pro Eintrag: Felder inline editierbar + „Löschen" + „+ Hinzufügen" + Hoch/Runter.

**Draft-State + Speichern-Balken:** Ein `EditModeProvider` (React Context) hält alle ausstehenden Änderungen. Sobald ≥1 Änderung offen ist, erscheint oben ein fixierter Balken: „X Änderungen — Speichern / Verwerfen". Speichern schreibt gebündelt nach Supabase und ruft `revalidatePath('/')`.

## 5. Datenmodell (Supabase Postgres)

**Singleton `site_content` (genau eine Zeile, `id = 1`):**

| Spalte | Typ | Quelle (lib/content.ts / site.ts) |
|---|---|---|
| hero_bio | text | siteText.heroBio |
| tagline | text | siteText.tagline |
| sound_intro | text | siteText.soundIntro |
| about_title | text | siteText.aboutTitle |
| about_title_accent | text | siteText.aboutTitleAccent |
| about_body | text | siteText.aboutBody |
| regions | text[] | siteText.regions |
| stats_quote | text | siteText.statsQuote |
| img_hero / img_about / img_stats / img_boombox | text (URL) | site.assets.* |
| img_epk | text[] (URLs) | site.assets.epk |
| event_active | bool | nextEvent.active |
| event_date / event_venue / event_city / event_note / event_ticket_url | text | nextEvent.* |
| event_image | text (URL, nullable) | nextEvent.image |
| updated_at | timestamptz | — |

**Sammlungs-Tabellen (je mit `id uuid`, `sort_order int`, `updated_at`):**

- `reviews` — quote, author, role, rating
- `faq_items` — question, answer
- `mixtapes` — title, description, tag, href
- `sound_pillars` — title, text
- `stat_items` — value, label

**Storage:** öffentlicher Bucket `site-images`. Upload erzeugt eine Public-URL; nur die URL wird in der DB gespeichert.

## 6. Datenzugriff (Server)

Neues Modul **`lib/cms/queries.ts`** mit **denselben Funktionsnamen** wie heute (`getSiteText`, `getSiteImages`, `getSoundPillars`, `getStats`, `getMixtapes`, `getFaqs`, `getNextEvent`, `getReviews`). Jede Funktion:

1. liest via Supabase-Server-Client (anon key, RLS erlaubt anonymes Lesen);
2. fällt bei leerem/fehlerhaftem Ergebnis auf `lib/content.ts` / `lib/site.ts` zurück (heutiges Verhalten bleibt 1:1 erhalten — die Seite kann nie leer sein).

Nur **3 Importstellen** werden umgebogen: `app/page.tsx`, `components/sections/next-event.tsx`, `components/sections/reviews.tsx` (`@/sanity/queries` → `@/lib/cms/queries`). Die Section-Komponenten selbst bleiben unverändert (außer dem Einsetzen der `Editable*`-Wrapper).

## 7. Auth & Sicherheit (wasserdicht)

- **Supabase Auth**, E-Mail + Passwort, ein einziger DJ-Account (Agentur legt ihn an; Self-Signup deaktiviert).
- **Cookie-basierte Session** via `@supabase/ssr` (funktioniert in Next Server Components + Middleware).
- **Middleware** schützt `/admin/*`: keine gültige Session → Redirect `/admin/login`.
- **Row Level Security auf allen Tabellen:**
  - `SELECT`: für `anon` + `authenticated` erlaubt (öffentliches Lesen für die Website).
  - `INSERT/UPDATE/DELETE`: nur `authenticated`.
- **Storage-Policy** Bucket `site-images`: öffentlich lesbar, Upload/Überschreiben nur `authenticated`.
- **Service-Role-Key niemals im Client.** Öffentlich nur der anon key. Alle Schreibvorgänge laufen über die eingeloggte User-Session (Server Actions). Bild-Uploads laufen über eine Server Action, die die User-Session prüft.
- Schreib-Endpunkte (Server Actions) verifizieren bei jedem Aufruf erneut die Session, nicht nur die Middleware.

## 8. Umgebungsvariablen

Neu (in `.env.local` + Vercel):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (nur serverseitig, nur falls für Admin-Operationen nötig)

Entfernt: alle `NEXT_PUBLIC_SANITY_*` + `SANITY_WRITE_TOKEN`.

## 9. Sanity-Entfernung (Cleanup)

- Löschen: `sanity/`, `app/studio/`, `sanity.config.ts`.
- `package.json`: `sanity`, `next-sanity`, `@sanity/vision`, `@sanity/image-url` entfernen.
- `next.config.ts`: Sanity-CDN-Host (`cdn.sanity.io`) → Supabase-Storage-Host.
- `app/page.tsx` / `next-event.tsx` / `reviews.tsx`: Imports auf `@/lib/cms/queries` umstellen.
- Neue Dependencies: `@supabase/supabase-js`, `@supabase/ssr`.

## 10. Seed / Erstbefüllung

Ein Skript (`scripts/seed-supabase.ts`) befüllt `site_content` + Sammlungs-Tabellen einmalig mit den heutigen Werten aus `lib/content.ts` / `lib/site.ts`, damit der DJ ab Tag 1 die echten Inhalte vor sich sieht und nur noch anpasst.

## 11. Admin-UX-Details

- `/admin/login`: minimalistische dunkle Maske im Brand-Look (E-Mail, Passwort, „Anmelden"). Fehlerhinweis bei falschen Daten.
- `/admin`: identisches Seitenlayout wie `/`, plus:
  - dezenter „Bearbeiten-Modus aktiv"-Hinweis;
  - Hover-Outlines auf editierbaren Elementen;
  - fixierter Speichern-Balken bei offenen Änderungen (Speichern / Verwerfen);
  - „Abmelden"-Link.
- Vollständig deutsch, mobil bedienbar (DJ bearbeitet evtl. vom Handy).

## 12. Bewusst NICHT im Scope (YAGNI)

- Keine Mehrbenutzer-/Rollenverwaltung (nur der eine DJ-Account).
- Keine Versionierung / Undo-Historie über das aktuelle Verwerfen hinaus.
- Keine Bildbearbeitung (Crop/Filter) — nur Austausch.
- Kein eigener Passwort-Reset-Flow im UI (über Supabase-Dashboard, falls nötig).

## 13. Offene Punkte

- Supabase-Projekt anlegen (Free-Tier genügt) + Keys bereitstellen.
- DJ-Account-Zugangsdaten festlegen.
