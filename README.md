# KT Photography

Editorial wedding photography and films website for KT Photography.

## Stack

- Next.js 15
- React 19
- TypeScript
- npm
- Local curated web media in `public/drive-media`
- YouTube for long-form films

## Setup

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
```

The current `lint` script runs TypeScript validation.

## Environment

Copy `.env.example` to `.env.local` when local overrides are needed. Do not commit secret values.

Key variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CALCOM_LINK`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

## Production Domain

Canonical URL: `https://www.ktphotographydaman.com`

The apex domain `https://ktphotographydaman.com` should permanently redirect to the matching `www` path and query string at the hosting/domain layer.

## Media Policy

Cloudinary is intended for curated website-ready images only. Full-resolution photography masters and raw wedding films stay in Google Drive and local storage. The local raw archive under `public/Wedding photography/` is intentionally ignored by Git and Vercel.

## Routes

- `/`
- `/stories`
- `/stories/[slug]`
- `/films`
- `/about`
- `/testimonials`
- `/check-date`
- `/contact`
- `/terms`
- `/privacy`
- `/cookies`

## Deployment

Use Vercel with:

- Framework: Next.js
- Package manager: npm
- Install: `npm ci`
- Build: `npm run build`
- Production branch: `main`

Do not use preview URLs as canonical metadata.
