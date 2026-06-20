import type { StructureResolver } from "sanity/structure"

/**
 * Editor layout: "Aktuelles Event" is a singleton (one fixed entry the DJ
 * edits), "Rezensionen" is a normal list he can add to / remove from.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalte")
    .items([
      S.listItem()
        .title("Aktuelles Event")
        .id("event")
        .child(S.document().schemaType("event").documentId("nextEvent")),
      S.divider(),
      S.documentTypeListItem("review").title("Rezensionen"),
    ])
