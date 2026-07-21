# Deployment

## GitHub

The production repository should be private, use `main` as the default branch, and exclude raw archives, credentials, build output, screenshots, and generated QA artifacts.

## Vercel

Recommended project settings:

- Framework: Next.js
- Root directory: project root
- Package manager: npm
- Install command: `npm ci`
- Build command: `npm run build`
- Output: Next.js default
- Production branch: `main`

Required production environment variable:

- `NEXT_PUBLIC_SITE_URL=https://www.ktphotographydaman.com`

Set only the other variables actually needed by the deployed form, calendar, or verification setup.

## Domain

Primary domain:

- `www.ktphotographydaman.com`

Apex redirect:

- `ktphotographydaman.com` must permanently redirect to `www.ktphotographydaman.com`
- Preserve path and query string
- Avoid serving both apex and `www` as indexable duplicates

## Verification

After deployment, verify:

- `/`
- `/stories`
- Every `/stories/[slug]`
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

Check status codes, canonical URLs, images, forms, mobile navigation, booking room, footer, console errors, and horizontal overflow.

## Rollback

Use the Vercel deployment list to promote the last known good production deployment, then revert the corresponding Git commit on `main` and redeploy through the normal pipeline.
