import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/sections/hero"
import { Ticker } from "@/components/sections/ticker"
import { Sound } from "@/components/sections/sound"
import { Stats } from "@/components/sections/stats"
import { Mixtapes } from "@/components/sections/mixtapes"
import { GigHistory } from "@/components/sections/gig-history"
import { Boombox } from "@/components/sections/boombox"
import { EPK } from "@/components/sections/epk"
import { Management } from "@/components/sections/management"
import { Booking } from "@/components/sections/booking"
import { FAQ } from "@/components/sections/faq"

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Sound />
        <Stats />
        <Mixtapes />
        <GigHistory />
        <Boombox />
        <EPK />
        <Management />
        <Booking />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
