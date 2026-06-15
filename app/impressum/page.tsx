import type { Metadata } from "next"
import { LegalShell, LegalBlock, Todo } from "@/components/site/legal-shell"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${site.name}.`,
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  return (
    <LegalShell
      title="Impressum"
      intro="Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) / § 5 TMG."
    >
      <LegalBlock heading="Diensteanbieter">
        <p>
          <Todo>TODO: Vor- und Nachname</Todo> (DJ Mooglie)
          <br />
          <Todo>TODO: Straße &amp; Hausnr.</Todo>
          <br />
          <Todo>TODO: PLZ &amp; Ort</Todo>
          <br />
          Deutschland
        </p>
        <p className="text-xs text-muted-foreground/70">
          Hinweis: Eine ladungsfähige Anschrift ist gesetzlich vorgeschrieben.
          Ein Postfach genügt nicht. Bei Auftritt über das Management ggf. dessen
          Anschrift verwenden — bitte rechtlich prüfen lassen.
        </p>
      </LegalBlock>

      <LegalBlock heading="Kontakt">
        <p>
          E-Mail:{" "}
          <a href={`mailto:${site.email}`} className="text-brand">
            {site.email}
          </a>
          <br />
          Telefon: <Todo>TODO: Telefonnummer</Todo>
        </p>
      </LegalBlock>

      <LegalBlock heading="Management / Booking">
        <p>
          {site.management.company}
          <br />
          {site.management.address}
          <br />
          Telefon: {site.management.phone}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${site.management.email}`} className="text-brand">
            {site.management.email}
          </a>
          <br />
          Web:{" "}
          <a href={site.management.siteUrl} target="_blank" rel="noopener noreferrer" className="text-brand">
            {site.management.siteUrl.replace("https://", "")}
          </a>
        </p>
      </LegalBlock>

      <LegalBlock heading="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
          <Todo>TODO: USt-IdNr. (falls vorhanden, sonst entfernen)</Todo>
        </p>
      </LegalBlock>

      <LegalBlock heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          <Todo>TODO: Name &amp; Anschrift der verantwortlichen Person</Todo>
        </p>
      </LegalBlock>

      <LegalBlock heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand">
            ec.europa.eu/consumers/odr
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalBlock>

      <LegalBlock heading="Bildnachweise">
        <p>
          Fotos: <Todo>TODO: Fotograf:in / Credit nennen</Todo>. Logo: DJ Mooglie.
        </p>
      </LegalBlock>

      <p className="rounded-lg border border-border bg-card p-4 text-xs text-muted-foreground">
        Dieser Text ist eine Vorlage und ersetzt keine Rechtsberatung. Bitte alle
        mit <Todo>TODO</Todo> markierten Angaben ergänzen und das Impressum vor
        Veröffentlichung rechtlich prüfen lassen.
      </p>
    </LegalShell>
  )
}
