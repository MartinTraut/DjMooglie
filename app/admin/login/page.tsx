import type { Metadata } from "next"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Admin · Login",
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brand">
            DJ Moogli
          </p>
          <h1 className="mt-2 text-2xl font-bold text-foreground">
            Admin-Bereich
          </h1>
          <p className="mt-1 text-sm text-neutral-300">
            Melde dich an, um deine Seite zu bearbeiten.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card/60 p-6 shadow-2xl backdrop-blur">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
