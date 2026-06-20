import { defineField, defineType } from "sanity"

/** A single FAQ question + answer. Also feeds the FAQPage schema markup. */
export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ-Frage",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Frage",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Antwort",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
    }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
})
