import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config"

/**
 * Cookie-less anon client for PUBLIC reads on the website.
 * RLS allows anonymous SELECT, so this is safe.
 *
 * Uses the public credentials from ./config (env vars first, baked-in public
 * defaults as fallback), so reads work even before the Vercel env vars are set.
 */
let cached: SupabaseClient | null | undefined

export function getPublicClient(): SupabaseClient | null {
  if (cached !== undefined) return cached
  cached =
    SUPABASE_URL && SUPABASE_ANON_KEY
      ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { persistSession: false },
        })
      : null
  return cached
}
