import { defineField, defineType } from "sanity"

/** "Aktuelles Event / Nächster Gig" — edited as a singleton (see structure.ts). */
export const event = defineType({
  name: "event",
  title: "Aktuelles Event",
  type: "document",
  fields: [
    defineField({
      name: "active",
      title: "Auf der Website anzeigen?",
      type: "boolean",
      initialValue: true,
      description: 'Aus = die „Nächster Gig"-Sektion wird ausgeblendet.',
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "string",
      description: 'Frei eingeben, z. B. „Sa · 12. Juli 2026".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue / Club",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      title: "Stadt",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "note",
      title: "Info-Zeile (optional)",
      type: "string",
      description: "Line-up, Startzeit, Anlass …",
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket-Link (optional)",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Foto (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "venue", subtitle: "date", media: "image" },
  },
})
