"use client"

import { useActionState } from "react"
import { Loader2 } from "lucide-react"
import { signIn } from "../actions"

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null)

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          E-Mail
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:bg-white/10"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          Passwort
        </span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:bg-white/10"
        />
      </label>

      {state?.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-xs font-bold uppercase tracking-[0.14em] text-brand-foreground transition-all duration-200 hover:bg-brand/90 disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Anmelden …" : "Anmelden"}
      </button>
    </form>
  )
}
