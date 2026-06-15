import type { Metadata } from "next"
import { LegalShell, LegalBlock, Todo } from "@/components/site/legal-shell"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${site.name} gemäß DSGVO.`,
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  return (
    <LegalShell
      title="Datenschutz"
      intro="Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
    >
      <LegalBlock heading="1. Verantwortlicher">
        <p>
          Verantwortlich im Sinne der DSGVO ist:
          <br />
          <Todo>TODO: Name</Todo> (DJ Mooglie), <Todo>TODO: Anschrift</Todo>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${site.email}`} className="text-brand">
            {site.email}
          </a>
        </p>
      </LegalBlock>

      <LegalBlock heading="2. Hosting">
        <p>
          Diese Website wird bei{" "}
          <Todo>TODO: Hoster, z. B. Vercel Inc.</Todo> gehostet. Beim Aufruf der
          Seite verarbeitet der Hoster technisch notwendige Server-Logfiles
          (u. a. IP-Adresse in gekürzter Form, Datum/Uhrzeit, abgerufene Datei,
          Browsertyp). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an einem sicheren, stabilen Betrieb). Mit dem
          Hoster besteht ein Auftragsverarbeitungsvertrag (AVV).
        </p>
      </LegalBlock>

      <LegalBlock heading="3. Schriftarten (lokal)">
        <p>
          Diese Website nutzt selbst gehostete Schriftarten (next/font). Es
          werden <strong>keine</strong> Verbindungen zu Google-Servern
          aufgebaut; die Schriften werden lokal ausgeliefert. Eine Übermittlung
          deiner IP-Adresse an Dritte findet dabei nicht statt.
        </p>
      </LegalBlock>

      <LegalBlock heading="4. Kontaktaufnahme & Booking-Anfrage">
        <p>
          Das Booking-Formular auf dieser Seite verarbeitet deine Eingaben{" "}
          <strong>nicht serverseitig</strong>. Beim Absenden wird lediglich eine
          vorausgefüllte E-Mail in deinem E-Mail-Programm geöffnet; der Versand
          erfolgt durch dich selbst. Wenn du uns per E-Mail kontaktierst, werden
          deine Angaben (Name, E-Mail, Telefon, Eventdaten) zur Bearbeitung der
          Anfrage gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (vorvertragliche Maßnahmen) bzw. lit. f DSGVO. Die Daten werden
          gelöscht, sobald sie nicht mehr erforderlich sind.
        </p>
        <p className="text-xs text-muted-foreground/70">
          Hinweis: Wird später ein serverseitiges Formular (z. B. Resend,
          Formspree) ergänzt, ist dieser Abschnitt entsprechend zu erweitern.
        </p>
      </LegalBlock>

      <LegalBlock heading="5. Cookies & Tracking">
        <p>
          Diese Website setzt <strong>keine</strong> Tracking- oder
          Marketing-Cookies und nutzt kein Analyse-Tool. Es werden ausschließlich
          technisch notwendige Daten verarbeitet.{" "}
          <Todo>TODO: anpassen, falls Analytics/Pixel ergänzt wird</Todo>
        </p>
      </LegalBlock>

      <LegalBlock heading="6. Eingebundene Dienste Dritter">
        <p>
          Über Links und Buttons kann auf externe Plattformen verwiesen werden
          (z. B. Instagram, Mixcloud, KOMA Music). Beim Anklicken gelten die
          Datenschutzbestimmungen der jeweiligen Anbieter. Es werden keine
          Inhalte dieser Dienste ohne deine Interaktion nachgeladen.
        </p>
      </LegalBlock>

      <LegalBlock heading="7. Deine Rechte">
        <p>
          Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
          Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
          Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Zudem
          steht dir ein Beschwerderecht bei einer Aufsichtsbehörde zu. Wende dich
          dafür an{" "}
          <a href={`mailto:${site.email}`} className="text-brand">
            {site.email}
          </a>
          .
        </p>
      </LegalBlock>

      <p className="rounded-lg border border-border bg-card p-4 text-xs text-muted-foreground">
        Diese Datenschutzerklärung ist eine Vorlage und ersetzt keine
        Rechtsberatung. Bitte alle <Todo>TODO</Todo>-Stellen ergänzen und vor
        Veröffentlichung rechtlich prüfen lassen.
      </p>
    </LegalShell>
  )
}
