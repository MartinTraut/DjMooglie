import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { projectId, dataset, apiVersion } from "./sanity/env"
import { schemaTypes } from "./sanity/schema"
import { structure } from "./sanity/structure"

export default defineConfig({
  name: "default",
  title: "DJ Moogli",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
})
