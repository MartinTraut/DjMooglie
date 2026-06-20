import { defineField, defineType } from "sanity"

/** One stat tile (e.g. "5+" / "Genres im Set"). */
export const statItem = defineType({
  name: "statItem",
  title: "Kennzahl",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Wert",
      type: "string",
      description: 'z. B. „5+", „Resident", „100%".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Beschriftung",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
    }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
})
