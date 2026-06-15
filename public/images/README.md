# Bilder ablegen — DJ MOOGLI

Lege die echten Fotos **mit exakt diesen Dateinamen** in diesem Ordner ab.
Danach in `lib/site.ts` im Objekt `assets` den jeweiligen Wert von `null` auf
den Pfad setzen (z. B. `hero: "/images/hero.jpg"`). Bis dahin zeigt die Seite
ein gebrandetes Platzhalter-Feld — das Layout ist bereits final.

| Datei                 | Sektion              | Empfohlenes Format        | Hinweis                              |
| --------------------- | -------------------- | ------------------------- | ------------------------------------ |
| `hero.jpg`            | Hero                 | Hochformat 3:4, ≥1200×1600 | Discokugel-/Porträtshot              |
| `about.jpg`           | Stat-Band            | Querformat, ≥1920 breit   | volle Crowd / Club-Atmosphäre        |
| `boombox.jpg`         | Boombox-Society      | Hochformat 4:5            | Duo-/Energie-Shot                    |
| `press-1.jpg`         | EPK                  | Hochformat 3:4            | Pressefoto                           |
| `press-2.jpg`         | EPK                  | Quadratisch 1:1           | Pressefoto                           |
| `press-3.jpg`         | EPK                  | Quadratisch 1:1           | Pressefoto                           |
| `press-4.jpg`         | EPK                  | Quadratisch 1:1           | Pressefoto                           |
| `logo.png` (optional) | Nav / Footer         | transparent, weiß         | sonst wird das Text-Wordmark genutzt |

## So aktivierst du ein Bild

```ts
// lib/site.ts
assets: {
  logo: null,                      // oder "/images/logo.png"
  hero: "/images/hero.jpg",        // ← von null auf Pfad ändern
  about: "/images/about.jpg",
  boombox: "/images/boombox.jpg",
  epk: [
    "/images/press-1.jpg",
    "/images/press-2.jpg",
    "/images/press-3.jpg",
    "/images/press-4.jpg",
  ],
  // ...
}
```

Tipp: Aus dem „Pressekit DJ MOOGLI“-Ordner passen die Studio-Shots (weißer/
dunkler Hintergrund) ideal für EPK & Boombox, der Discokugel-Shot für den Hero,
das Club-Foto für das Stat-Band.
