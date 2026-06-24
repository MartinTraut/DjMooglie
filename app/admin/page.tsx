import type { Metadata } from "next"
import { Database } from "lucide-react"
import { loadAdminData } from "@/lib/cms/admin"
import { signOut } from "./actions"
import { Editor } from "./editor"

export const metadata: Metadata = {
  title: "Admin · Bearbeiten",
  robots: { index: false, follow: false },
}

// Always render fresh — the editor reflects the live database.
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const data = await loadAdminData()

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-background/80 px-5 py-3 backdrop-blur">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-brand">
            DJ Moogli
          </p>
          <p className="text-sm font-semibold text-foreground">Seite bearbeiten</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Abmelden
          </button>
        </form>
      </header>

      {data === null ? (
        <div className="mx-auto max-w-md px-6 py-24 text-center">
          <Database className="mx-auto mb-4 h-8 w-8 text-brand" />
          <h2 className="text-lg font-semibold text-foreground">
            Datenbank noch nicht eingerichtet
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Führe die Datei{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
              supabase/migrations/0001_init.sql
            </code>{" "}
            einmal im Supabase SQL-Editor aus, dann lade diese Seite neu.
          </p>
        </div>
      ) : (
        <Editor initial={data} />
      )}
    </div>
  )
}
