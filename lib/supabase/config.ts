/**
 * Public Supabase project credentials.
 *
 * These are the `NEXT_PUBLIC_*` values: the anon key is *designed* to be shipped
 * to the browser (Row Level Security protects the data, not this key), and the
 * project URL is public too. Shipping them as defaults keeps the whole site —
 * including the /admin editor — working even when the Vercel env vars are not
 * (yet) configured. Env vars still take precedence when present, so rotating the
 * key in Vercel keeps working without a code change.
 *
 * NEVER put the Supabase *service_role* / secret key here — that one must stay
 * server-only and out of git.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://qdrgckquhklsnptkshsy.supabase.co"

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcmdja3F1aGtsc25wdGtzaHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTM1NDgsImV4cCI6MjA5Nzg4OTU0OH0.Hx8_mxpj5Bn_NeYKXJCsRW_2DlZE77FUDkqb3dQ77Yw"
