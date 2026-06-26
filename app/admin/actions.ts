"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

/* ------------------------------------------------------------------ auth -- */

export async function signIn(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: "Login fehlgeschlagen. E-Mail oder Passwort falsch." }
  }

  redirect("/admin")
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

/* --------------------------------------------------------------- guards --- */

/** Throws (and is caught by the action) if the caller is not logged in. */
async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Nicht angemeldet.")
  return supabase
}

/* ------------------------------------------------------------- save copy -- */

export type SiteContentDraft = {
  hero_bio: string
  tagline: string
  sound_intro: string
  about_title: string
  about_title_accent: string
  about_body: string
  regions: string[]
  stats_quote: string
  duo_tagline: string
  duo_claim: string
  duo_partner: string
  duo_description: string
  img_hero: string | null
  img_about: string | null
  img_stats: string | null
  img_boombox: string | null
  img_epk: string[]
  event_active: boolean
  event_date: string
  event_venue: string
  event_city: string
  event_note: string | null
  event_ticket_url: string | null
  event_image: string | null
}

export async function saveSiteContent(
  draft: SiteContentDraft
): Promise<{ ok: boolean; error?: string }> {
  try {
    const supabase = await requireUser()
    const { error } = await supabase
      .from("site_content")
      .update({ ...draft, updated_at: new Date().toISOString() })
      .eq("id", 1)
    if (error) return { ok: false, error: error.message }
    revalidatePath("/")
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Fehler" }
  }
}

/* ----------------------------------------------------- save collections --- */

export type CollectionName =
  | "reviews"
  | "faq_items"
  | "mixtapes"
  | "sound_pillars"
  | "stat_items"

/**
 * Replaces an entire collection with the given rows (in array order).
 * Simplest correct model for small, hand-curated lists: delete all, re-insert.
 */
export async function saveCollection(
  name: CollectionName,
  rows: Record<string, unknown>[]
): Promise<{ ok: boolean; error?: string }> {
  try {
    const supabase = await requireUser()

    // Drop existing rows for this collection.
    const { error: delError } = await supabase
      .from(name)
      .delete()
      .not("id", "is", null)
    if (delError) return { ok: false, error: delError.message }

    if (rows.length > 0) {
      const payload = rows.map((r, i) => ({ ...r, sort_order: i }))
      const { error: insError } = await supabase.from(name).insert(payload)
      if (insError) return { ok: false, error: insError.message }
    }

    revalidatePath("/")
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Fehler" }
  }
}

/* --------------------------------------------------------- image upload --- */

export async function uploadImage(
  formData: FormData
): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    const supabase = await requireUser()
    const file = formData.get("file")
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Keine Datei." }
    }
    if (!file.type.startsWith("image/")) {
      return { ok: false, error: "Nur Bilddateien erlaubt." }
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    // Unique-ish path without Date/Math.random (kept deterministic per name).
    const path = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`.replace(
      /\.[^.]+$/,
      `.${ext}`
    )

    const { error } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true, contentType: file.type })
    if (error) return { ok: false, error: error.message }

    const { data } = supabase.storage.from("site-images").getPublicUrl(path)
    return { ok: true, url: data.publicUrl }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Fehler" }
  }
}
