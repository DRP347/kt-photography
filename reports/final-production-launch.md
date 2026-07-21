# Final Production Launch Report

Status: `PRODUCTION BLOCKED — EXACT DNS OWNER ACTION REQUIRED`

Updated: 2026-07-22 01:08 IST

Stable workspace: `/Users/gandu/Projects/kt-photography`

Original validated release source: `/private/tmp/kt-photography-production-release-20260721-225709`

## GitHub

- Repository: `https://github.com/DRP347/kt-photography`
- Visibility: private
- Branch: `main`
- Baseline commit: `3dbc27c chore: establish KT Photography production baseline`
- Remote baseline hash verified: `3dbc27cbc10237053ca06f129e870f423502daf6`
- GitHub CLI: not installed; Homebrew is not installed. Repository creation and verification were completed through the authenticated GitHub API and normal Git push without exposing credentials.
- Git integration in Vercel: attempted by Vercel CLI during project link, but Vercel could not connect the private repository. Direct CLI deployment was used instead.

## Vercel

- Account: `xinghdeepak209-6886`
- Team/project scope: `deepaks-projects-c818d101`
- Project name: `kt-photography`
- Project id: `prj_zOqhIuvC798zOakbEHuBuEAqOx2g`
- Preview deployment: `https://kt-photography-bp1lkhmn5-deepaks-projects-c818d101.vercel.app`
- Production deployment: `https://kt-photography-k8ydmnu4e-deepaks-projects-c818d101.vercel.app`
- Production deployment id: `dpl_4JVsQSejAHMecs65oEcifscMRNQo`
- Production status: Ready
- SSO deployment protection: disabled for public access
- Production aliases assigned by Vercel: `https://kt-photography.vercel.app`, `https://www.ktphotographydaman.com`, `https://ktphotographydaman.com`

## Environment Variables

Configured variable names:

- `NEXT_PUBLIC_SITE_URL` in Preview
- `NEXT_PUBLIC_SITE_URL` in Production

No Cloudinary API secret or other server-side secret was required for launch.

## Validation

- `npm ci`: passed
- `npm run typecheck`: passed
- `npm run lint`: passed
- `npm run build`: passed
- `npm run test`: no test script exists in `package.json`
- `npx vercel@latest build --prod`: passed after `NEXT_PUBLIC_SITE_URL` was changed from sensitive to non-sensitive so it could be read during build
- Secret scan: no tracked credential/token/private-key pattern matches
- Large-file audit: no tracked non-build source files over 25 MB found
- Ignored output confirmed: `node_modules/`, `.next/`, `.vercel/`, real env files, raw archive folders, generated reports/screenshots, and local backups

## Route Verification

Local production server returned expected statuses for:

- `/`
- `/stories`
- all published Story routes
- `/films`
- `/about`
- `/testimonials`
- `/check-date`
- `/contact`
- `/terms`
- `/privacy`
- `/cookies`
- `/sitemap.xml`
- `/robots.txt`
- `/does-not-exist` as HTTP 404

Vercel preview returned HTTP 200 for:

- `/`
- `/stories`
- `/sitemap.xml`
- `/robots.txt`

Vercel production returned HTTP 200 for:

- `/`
- `/stories`
- `/sitemap.xml`
- `/robots.txt`

Canonical metadata and sitemap content use `https://www.ktphotographydaman.com`.

## Custom Domains

Added to Vercel project:

- `www.ktphotographydaman.com`
- `ktphotographydaman.com`

Current DNS is still managed at GoDaddy nameservers:

- `ns25.domaincontrol.com`
- `ns26.domaincontrol.com`

Current live DNS still points to the old DPS/GoDaddy site:

- `www.ktphotographydaman.com` resolves through `ktphotographydaman.com` to `76.223.105.230` and `13.248.243.5`
- `ktphotographydaman.com` resolves to `76.223.105.230` and `13.248.243.5`

Current live behavior:

- `https://www.ktphotographydaman.com` returns HTTP 301 to `https://ktphotographydaman.com/` from `DPS/2.0.0`
- `https://ktphotographydaman.com` returns HTTP 200 from `DPS/2.0.0`
- `https://ktphotographydaman.com/check-date?source=instagram` returns HTTP 404 from `DPS/2.0.0`

DNS/SSL/canonical-domain verification is therefore not complete.

## Exact DNS Owner Action Required

At the current DNS provider, keep existing mail records intact and update only the website records below.

For `www.ktphotographydaman.com`:

- Type: `CNAME`
- Host/name: `www`
- Value: `c12a7836708d3627.vercel-dns-017.com.`
- Remove/replace the current `www` configuration that points back to `ktphotographydaman.com` or the old DPS target.

For `ktphotographydaman.com`:

- Type: `A`
- Host/name: `@`
- Value: `216.198.79.1`
- Type: `A`
- Host/name: `@`
- Value: `64.29.17.1`
- Remove/replace the current apex A records `76.223.105.230` and `13.248.243.5`.

Vercel also allows changing nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`, but that would require recreating any existing DNS records at Vercel. The safer current action is the explicit record update above.

## Apex To WWW Redirect

The canonical host is `www.ktphotographydaman.com`.

Vercel CLI does not expose a domain-card redirect command. After DNS is valid, configure this exact Vercel project setting:

Open Project Settings -> Domains, open `ktphotographydaman.com`, select Redirect to Another Domain, and choose `www.ktphotographydaman.com`.

The redirect must preserve HTTPS, path, and query string.

## Post-Launch Backlog

Story gallery visual-polish items are preserved in:

- `reports/post-launch-story-design-backlog.md`

These are not part of the initial launch unless they cause actual horizontal scrolling, broken content, or unusable interaction.

## Cloudinary

Cloudinary MCP/API access was non-blocking. The deployed release uses local curated image assets and YouTube thumbnails, not Cloudinary delivery URLs.
