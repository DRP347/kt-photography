# KT Photography Final Media And Mobile Polish

## Name correction

- Previous misspelling: `Dhavani`.
- Correct public spelling: `Dhwani`.
- Corrected public-facing Story data, alt text, film manifest names, generated media manifest names, report references and Story metadata.
- Public canonical Story route: `/stories/dhwani-gaurav`.
- Legacy route preserved: `/stories/dhavani-gaurav` redirects with HTTP 308 to `/stories/dhwani-gaurav` and preserves query strings.
- Internal asset folder and compatibility slug remain `dhavani-gaurav` so existing local media paths continue to resolve.
- Repository assertion: `npm run validate:media` scans production source for public-facing `Dhavani`; the only remaining literal is the validator pattern itself.

## Sunil & Vaishnavi

- Old hero/card source: `/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp`.
- New hero/card/source of truth: `/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1123.webp`.
- Reason: verified couple-led daylight portrait with both partners visible and stronger card/hero suitability.
- Supporting opening sources: `1122` and `1076`; `1099` was removed because it is groom-with-child/family-forward.
- Desktop focal position: `50% 39%`.
- Mobile focal position: `50% 36%`.
- Verified on Story card, individual Story opening and Open Graph image.

## Hero wall

- `mw-02`: retained Monika & Aman `wedding-915`, adjusted focal point from center to `50% 34%` so the shallow strip preserves faces.
- `mw-05`: replaced `/drive-media/dhavani-gaurav/haldi/dhavani-gaurav-haldi-441.webp` with `/drive-media/dhavani-gaurav/wedding/dhavani-gaurav-wedding-500.webp`.
- `mw-05` reason: removed father/relative-forward haldi frame from a large wall position; replacement is a ceremony couple frame.
- `mw-06`: replaced broken/fragile `/optimized/ee37329347-8.webp` with `/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp`.
- `mw-09`: replaced `/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-300.webp` with `/drive-media/aamir-binish/wedding/aamir-binish-wedding-137.webp`.
- `mw-09` reason: removed older-relative frame beside the KT logo; replacement is a verified couple portrait.
- Duplicate wall sources validated by `npm run validate:media`.

## Slideshow

- Every Stories slideshow slide now has explicit `storySlug` and `namedCoupleConfirmed: true`.
- Replaced weak/family/decor-forward slideshow sources with manually selected couple-led sources:
  - Monika & Aman: `wedding-916`, `wedding-915`.
  - Dhwani & Gaurav: `haldi-441` for slideshow only, not card/opening.
  - Mayank & Rajeshree: `haldi-715`.
- Resolution status: all local slideshow sources resolve in validation and browser QA.

## Story cards and openings

- Dhwani card/cover changed to `/drive-media/dhavani-gaurav/wedding/dhavani-gaurav-wedding-503.webp`.
- Dhwani opening changed to ceremony couple frames `504`, `500`, `503`.
- Saurav & Khushboo card/opening changed from poster-style `haldi-946` to full-frame couple portrait `sangeet-964`.
- Bhavin & Karishma card/opening changed from parent-forward `haldi-300` to couple portrait `sangeet-348`.
- Sunil & Vaishnavi opening changed away from `1099` to ceremony couple frame `1076`.

## Mobile

- Viewports checked: `1920x1080`, `1600x900`, `1440x900`, `1280x800`, `1024x768`, `768x1024`, `430x932`, `390x844`.
- Routes checked: `/`, `/stories`, `/stories/dhwani-gaurav`, `/stories/sunil-vaishnavi`, `/stories/aamir-binish`, `/stories/monika-aman`, `/stories/kunal-aditi`.
- Overflow status: `0` horizontal overflow in final browser checks.
- Mobile crop status: corrected Story cards and openings preserve visible couple subjects; no visible broken image or alt-text replacement.
- Remaining non-blocking issues: none identified in the corrected visual surface.

## Technical

- Modified files include Story route helpers, sitemap route generation, Story card links, home wall curation, Story curation data, the Dhwani redirect, package scripts and the media validator.
- `npm ci`: passed.
- `npm run validate:media`: passed, `1722` featured local media references validated.
- `npm run typecheck`: passed.
- `npm run lint`: passed; script is `tsc --noEmit`.
- `npm run build`: passed with Next.js production build.
- Local route smoke: expected 200s, legacy Dhwani redirect 308, missing route 404.
- Browser QA: no visible failed images, no console errors, no page errors, no failed requests, no visible `Dhavani`, no visible broken hero-wall alt text.
- Screenshot evidence directory: `/private/tmp/kt-media-qa`.
- Key evidence:
  - Hero wall: `/private/tmp/kt-media-qa/28-wall-final-1600.png`.
  - Stories cards: `/private/tmp/kt-media-qa/29-stories-cards-final-430.png`.
  - Bhavin card: `/private/tmp/kt-media-qa/30-bhavin-card-fixed-430.png`.
  - Sunil opening: `/private/tmp/kt-media-qa/33-sunil-opening-final-430.png`.
  - Dhwani opening: `/private/tmp/kt-media-qa/32-dhwani-story-final-390.png`.
  - Final QA summary: `/private/tmp/kt-media-qa/qa-final-final-summary.json`.

## Deployment

- Branch: `fix/final-media-mobile-polish`.
- Preview deployment: `https://kt-photography-4pvj0yks3-deepaks-projects-c818d101.vercel.app`.
- Preview status: Ready and browser verified.
- Production deployment commit: pending merge to `main`.
- Cloudinary MCP: not required and not used.
