import { createClient } from "next-sanity"
import { projectId, dataset, apiVersion } from "./env"

/** Read-only client used by the website to fetch published content. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast, cached edge reads; published content only
})
