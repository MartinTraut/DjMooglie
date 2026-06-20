import { defineField, defineType } from "sanity"

/** A mixtape card linking to a Mixcloud show. */
export const mixtape = defineType({
  name: "mixtape",
  title: "Mixtape",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tag",
      title: "Genre-Tag",
      type: "string",
      description: 'z. B. „Hip-Hop / R\'n\'B".',
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "href",
      title: "Mixcloud-Link",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
    }),
  ],
  preview: { select: { title: "title", subtitle: "tag" } },
})
