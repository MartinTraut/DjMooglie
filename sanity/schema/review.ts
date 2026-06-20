import { defineField, defineType } from "sanity"

/** A single guest/club review shown in the "Rezensionen" section. */
export const review = defineType({
  name: "review",
  title: "Rezension",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Zitat",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Kontext (optional)",
      type: "string",
      description: "Club, Anlass, Stadt …",
    }),
    defineField({
      name: "rating",
      title: "Sterne (1–5, optional)",
      type: "number",
      validation: (r) => r.min(1).max(5).integer(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge (optional)",
      type: "number",
      description: "Kleinere Zahl = weiter vorne.",
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "role" },
  },
})
