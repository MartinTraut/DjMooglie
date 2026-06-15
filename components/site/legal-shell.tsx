import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"
import { Container } from "@/components/shared/container"

export function LegalShell({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main className="border-b border-border pt-28 pb-20 sm:pt-36">
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Link>
          <h1 className="mt-6 font-display text-5xl text-balance sm:text-6xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
          <div className="legal mt-12 space-y-8">{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export function LegalBlock({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-foreground">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-brand/15 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wide text-brand">
      {children}
    </mark>
  )
}
