import { defineField, defineType } from "sanity"

/** One of the three "Sound" pillars (Crowd-Reading, Genre-Crossing, …). */
export const soundPillar = defineType({
  name: "soundPillar",
  title: "Sound-Punkt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      description: "Kleinere Zahl = weiter oben.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
})
