import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Cookie-less anon client for PUBLIC reads on the website.
 * RLS allows anonymous SELECT, so this is safe.
 *
 * Returns null when the env vars are missing (e.g. before they are set in
 * Vercel) instead of throwing — callers then fall back to local content,
 * so the site never crashes.
 */
let cached: SupabaseClient | null | undefined

export function getPublicClient(): SupabaseClient | null {
  if (cached !== undefined) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  cached =
    url && key
      ? createClient(url, key, { auth: { persistSession: false } })
      : null
  return cached
}
