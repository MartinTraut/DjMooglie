import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"
import { VinylPlayer } from "@/components/site/vinyl-player"
import { Hero } from "@/components/sections/hero"
import { Ticker } from "@/components/sections/ticker"
import { Sound } from "@/components/sections/sound"
import { About } from "@/components/sections/about"
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
        {/* Hero + first ticker fill exactly one viewport, so the red news-ticker
            always lands on the bottom edge and the genre marquee below it only
            appears on scroll — independent of the visitor's screen height. */}
        <div className="flex min-h-svh flex-col">
          <Hero />
          <Ticker />
        </div>
        <Sound />
        <About />
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
      <VinylPlayer />
    </>
  )
}
