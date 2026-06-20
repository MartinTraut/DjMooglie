import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"
import { VinylPlayer } from "@/components/site/vinyl-player"
import { Hero } from "@/components/sections/hero"
import { Ticker } from "@/components/sections/ticker"
import { NextEvent } from "@/components/sections/next-event"
import { Sound } from "@/components/sections/sound"
import { About } from "@/components/sections/about"
import { Stats } from "@/components/sections/stats"
import { Mixtapes } from "@/components/sections/mixtapes"
import { GigHistory } from "@/components/sections/gig-history"
import { Boombox } from "@/components/sections/boombox"
import { EPK } from "@/components/sections/epk"
import { Management } from "@/components/sections/management"
import { Booking } from "@/components/sections/booking"
import { Reviews } from "@/components/sections/reviews"
import { FAQ } from "@/components/sections/faq"
import {
  getSiteText,
  getSoundPillars,
  getStats,
  getMixtapes,
  getFaqs,
} from "@/sanity/queries"

export default async function Page() {
  // Editable copy comes from Sanity (with local fallback). Fetched once,
  // server-side, then handed to the (client) sections as props.
  const [text, pillars, stats, mixtapes, faqs] = await Promise.all([
    getSiteText(),
    getSoundPillars(),
    getStats(),
    getMixtapes(),
    getFaqs(),
  ])

  return (
    <>
      <Nav />
      <main>
        {/* Hero + first ticker fill exactly one viewport, so the red news-ticker
            always lands on the bottom edge and the genre marquee below it only
            appears on scroll — independent of the visitor's screen height. */}
        <div className="flex min-h-svh flex-col">
          <Hero bio={text.heroBio} />
          <Ticker />
        </div>
        <NextEvent />
        <Sound intro={text.soundIntro} pillars={pillars} />
        <About
          title={text.aboutTitle}
          titleAccent={text.aboutTitleAccent}
          body={text.aboutBody}
          regions={text.regions}
        />
        <Stats quote={text.statsQuote} stats={stats} />
        <Mixtapes items={mixtapes} />
        <GigHistory />
        <Boombox />
        <EPK />
        <Management />
        <Reviews />
        <Booking />
        <FAQ items={faqs} />
      </main>
      <Footer />
      <VinylPlayer />
    </>
  )
}
