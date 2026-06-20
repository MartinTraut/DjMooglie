"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"

/** Client boundary: the Studio (and the Sanity config it imports) must run as a
 *  client component, otherwise Sanity's createContext calls fail during SSR. */
export default function Studio() {
  return <NextStudio config={config} />
}
