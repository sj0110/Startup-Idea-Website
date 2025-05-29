import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'
import { only } from 'node:test'
import { write } from "node:fs"

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // true- Cache for 60 seconds and then revalidate on every request - ISR (Incremental Static Regeneration), 
  token         // false- Provides live data, but may be slower and use more API quota
})

if(!writeClient.config().token) {
  throw new Error("Write client not found");
}

/*
🔁 useCdn: true
- Fetches cached data from the CDN.
- Faster response times and lower cost.
- Data is eventually consistent (might be slightly outdated).
- Best for public-facing and read-only content (e.g., blogs, marketing sites).

🔒 useCdn: false
- Fetches fresh data directly from the Sanity API.
- Slower and may use more API quota.
- Ensures the latest, real-time data.
- Best for admin dashboards, preview modes, or when editing content.
*/
