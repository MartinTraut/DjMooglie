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
  getSiteImages,
  getSoundPillars,
  getStats,
  getMixtapes,
  getFaqs,
  getDuo,
} from "@/lib/cms/queries"

export default async function Page() {
  // Editable copy + images come from Supabase (with local fallback). Fetched
  // once, server-side, then handed to the (client) sections as props.
  const [text, images, pillars, stats, mixtapes, faqs, duo] = await Promise.all([
    getSiteText(),
    getSiteImages(),
    getSoundPillars(),
    getStats(),
    getMixtapes(),
    getFaqs(),
    getDuo(),
  ])

  return (
    <>
      <Nav />
      <main>
        {/* Hero + first ticker fill exactly one viewport, so the red news-ticker
            always lands on the bottom edge and the genre marquee below it only
            appears on scroll — independent of the visitor's screen height. */}
        <div className="flex min-h-svh flex-col">
          <Hero bio={text.heroBio} image={images.hero} />
          <Ticker />
        </div>
        <NextEvent eyebrow={text.eventEyebrow} />
        <Sound
          eyebrow={text.soundEyebrow}
          intro={text.soundIntro}
          pillars={pillars}
        />
        <About
          eyebrow={text.aboutEyebrow}
          title={text.aboutTitle}
          titleAccent={text.aboutTitleAccent}
          body={text.aboutBody}
          regions={text.regions}
          image={images.about}
        />
        <Stats quote={text.statsQuote} stats={stats} image={images.stats} />
        <Mixtapes
          items={mixtapes}
          eyebrow={text.musicEyebrow}
          title={text.musicTitle}
          intro={text.musicIntro}
        />
        <GigHistory eyebrow={text.gigsEyebrow} intro={text.gigsIntro} />
        <Boombox
          image={images.boombox}
          duo={duo}
          eyebrow={text.boomboxEyebrow}
        />
        <EPK images={images.epk} eyebrow={text.epkEyebrow} intro={text.epkIntro} />
        <Management
          eyebrow={text.managementEyebrow}
          intro={text.managementIntro}
        />
        <Reviews eyebrow={text.reviewsEyebrow} intro={text.reviewsIntro} />
        <Booking
          eyebrow={text.bookingEyebrow}
          title={text.bookingTitle}
          titleAccent={text.bookingTitleAccent}
          intro={text.bookingIntro}
        />
        <FAQ items={faqs} />
      </main>
      <Footer />
      <VinylPlayer />
    </>
  )
}
