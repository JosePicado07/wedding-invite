import type { NextConfig } from 'next'

// Lets a single codebase serve two different "sites": the original
// save-the-date at `/` (e.g. the existing Vercel deployment) and, on a
// separate deployment (e.g. the new Cloudflare domain) with ROOT_ROUTE set,
// the full invitation served AT the root path instead — so guests visiting
// that domain never see "/invitacion" in the URL or the save-the-date page.
// Set ROOT_ROUTE=invitacion as a build-time env var on that deployment only.
const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.ROOT_ROUTE === 'invitacion') {
      // `beforeFiles` is required here: a plain array is checked AFTER
      // filesystem pages, so it would never override "/" since that route
      // already exists as a real page (src/app/page.tsx).
      return { beforeFiles: [{ source: '/', destination: '/invitacion' }], afterFiles: [], fallback: [] }
    }
    return []
  },
}

export default nextConfig
