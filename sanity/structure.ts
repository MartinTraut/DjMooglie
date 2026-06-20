import type { StructureResolver } from "sanity/structure"

/**
 * Editor layout. Singletons ("Texte / Allgemein", "Aktuelles Event") open one
 * fixed document; the rest are normal add/remove lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalte")
    .items([
      S.listItem()
        .title("Texte / Allgemein")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Aktuelles Event")
        .id("event")
        .child(S.document().schemaType("event").documentId("nextEvent")),
      S.divider(),
      S.documentTypeListItem("review").title("Rezensionen"),
      S.documentTypeListItem("soundPillar").title("Sound-Punkte"),
      S.documentTypeListItem("statItem").title("Kennzahlen"),
      S.documentTypeListItem("mixtape").title("Mixtapes"),
      S.documentTypeListItem("faqItem").title("FAQ"),
    ])
