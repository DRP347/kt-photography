# KT Photography Design System

## 1. Brand Direction

KT Photography should feel like a warm editorial wedding archive: emotional, image-led, centered, refined, and quiet. The homepage is the front room of the KT world, not the whole website.

The homepage architecture is now:

1. Editorial Hero
2. Mosaic Memory Wall
3. Story-opening gallery
4. Featured Film
5. What We Notice
6. Final Contact / Footer Strip

Do not restore the old pre-page concept. The mosaic is the second section, not the first screen. There is no logo morph from mosaic center to navbar.

The homepage is image-led. Text should support photographs and films, not overpower them or turn the landing page into a long one-page website.

Use the rule: center the composition, not every sentence. Major layouts align to the same global centerline. Long copy stays left-aligned inside a centered readable container.

## 2. Colour Tokens

```css
--bg-canvas: #F7F1E8;
--bg-paper: #FBF7F1;
--bg-soft: #E8DED1;
--ink-strong: #221714;
--ink-default: #352621;
--ink-muted: #6E625A;
--accent-plum: #4A2433;
--accent-rose: #8C3A32;
--accent-gold: #7B5A27;
--accent-green: #5E6A53;
--accent-haldi: #B8892E;
--accent-sindoor: #8F2E24;
--accent-mehendi: #59633F;
--accent-sand: #A8835A;
--line-soft: rgba(34, 23, 20, 0.10);
--line-strong: rgba(34, 23, 20, 0.18);
--focus-ring: #7B5A27;
```

Use warm ivory neutrals as the interface base. Let photographs carry most of the color. Keep accents restrained. Do not introduce loud gradients or dark homepage bands.

Hero accent tones:

- `gold`: default editorial warmth
- `haldi`: yellow-gold ceremony warmth
- `rose`: soft bridal and romantic warmth
- `sindoor`: red wedding intensity
- `plum`: evening, sangeet, and deep portrait mood
- `mehendi`: green-natural ritual tone
- `sand`: neutral outdoor and architectural warmth

Accent tones may be used for CTA borders, hover tints, small labels, and active states. They must never dominate the layout. Do not introduce random one-off component colors.

## 3. Typography

Use two fonts:

- Cormorant Garamond for editorial headings, names, pull quotes, and large statements.
- Instrument Sans for body copy, navigation, labels, CTAs, metadata, captions, and forms.

Headlines and short statements can be centered. Long paragraphs should be left-aligned inside a centered readable rail.

## 4. Layout Rails

Use one global rail after the header:

```css
--site-gutter: clamp(18px, 4vw, 68px);
--site-rail: min(1360px, calc(100vw - 2 * var(--site-gutter)));
--reading-rail: min(760px, 100%);
--frame-wide: 16 / 9;
--frame-cinematic: 16 / 8;
--frame-story: 4 / 5;
--frame-portrait: 3 / 4;
--frame-square: 1 / 1;
```

Utilities:

- `.site-rail`: main content and header rail.
- `.reading-rail`: readable copy rail.
- `.page-shell` and `.page-shell-wide`: aliases kept for compatibility, but they should align to `--site-rail`.

The header, hero, mosaic section, and footer all use the same rail. Do not use random max-width values.

## 4.1 Image Proportion System

Use stable image frames so photographs feel intentional instead of stretched or randomly cropped:

- Hero frames: cinematic and tall enough to feel like an opening film frame.
- Story cards: `4 / 5` or `3 / 4`, depending on subject and grid rhythm.
- Film cards: `16 / 8` or `16 / 9`.
- Contact-sheet thumbnails: square.
- Mosaic cells: grid-defined, tight, and immersive.

Every image frame must be `position: relative` when using `Next/Image fill`. Use manual `objectPosition` for each important image. Do not let raw image dimensions decide layout.

## 5. Header

The header is a normal editorial masthead, not a floating pill and not a scroll-morph navbar.

Desktop:

- Left: Stories, Films
- Center: actual KT logo mark
- Right: About, Experience, Check Date
- No desktop Menu item

Mobile/tablet:

- KT logo remains visible
- full nav links collapse
- Menu appears

Use warm ivory, thin hairlines, centered logo, and calm uppercase Instrument Sans labels. Avoid glassmorphism, giant rounded bars, and empty pill sections.

Keep `Daman / Across India` in the hero, not repeated in the navbar. The masthead should stay short enough that the complete hero fits the first viewport on common desktop screens.

## 6. Editorial Hero

The first screen is `components/home/EditorialHero.tsx`.

Purpose:

- make a calm first impression
- show KT identity immediately
- feature a composed editorial album spread, not a flat website banner
- guide users toward Stories

Visible copy:

- `Daman / Across India`
- `Where the day`
- `quietly` as a small italic row with subtle hairlines
- `becomes memory.`

The hero plus masthead must fit common laptop screens, including 1366x768 and 1280x720. Use viewport-aware image sizing, short-screen type reductions, and controlled vertical gaps.

The hero media frame is a subtle crossfade slideshow inside an album-like editorial composition. It should not show template carousel arrows, dots, sliding animation, heavy overlays, or layout shift.

Hero image treatment:

- use a square, near-square, portrait-led, or diptych feeling; never a skinny 16:7 banner crop
- a supporting frame is optional and must be story-matched; remove it if it steals attention
- keep all images in stable `position: relative` frames with `Next/Image fill`
- tune `objectPosition` per slide so faces, hands, and emotional gestures remain readable
- never use square carousel arrows over the hero image

Hero browsing uses one quiet system only:

- a small story index such as `01 / 04`
- a subtle Previous / Next interaction, or tiny story-matched thumbnails
- a single `View Story` line-link
- no large right-side preview, no square arrows, and no multiple competing controls

Hero slide data controls all active metadata:

```ts
type HeroAccentTone = "gold" | "haldi" | "rose" | "sindoor" | "plum" | "mehendi" | "sand";

type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  coupleName: string;
  caption?: string;
  storyHref?: string;
  eventLabel?: string;
  accentTone: HeroAccentTone;
  objectPosition: string;
  objectPositionMobile?: string;
};
```

The active slide controls the active image, couple name, CTA href, CTA label, and CTA accent tone. Never hardcode a static couple name under a rotating image.

Hero story identity rules:

- The caption row is a designed story identity, not a paragraph block and not invitation-card decoration.
- Couple name can use elegant display type, but should feel like story identity rather than decoration.
- Prefer ornament over copy: small story number, hairline, dot, monogram, or compact metadata.
- Avoid long captions under the couple name in the hero.
- Right side: a restrained `View Story` line-link.
- Do not duplicate couple metadata inside the image.

Hero navigation rules:

- use a small story index, contact-sheet strip, or text-led memory controls
- avoid visible square arrow buttons
- avoid cheap carousel plugin patterns
- manual controls must update the image, couple name, story href, accent, and CTA together

Hero CTA rules:

- use a real link
- keep a minimum 44px tap/click height
- use Instrument Sans uppercase text
- use an editorial text-link with a line gesture, not a pill, circle, or boxed button
- do not use ugly text arrows like `->`; prefer a hairline gesture over an arrow in the hero
- tint only the CTA line/hover detail with the active slide accent
- keep the CTA refined and warm, never loud, boxed, or generic
- CTA should support the photograph, not compete with it
- do not place duplicate couple text or large info cards inside the image
- avoid generic SaaS-style buttons in the hero

## 7. Mosaic Memory Wall

The old mosaic is now `components/home/MosaicMemoryWall.tsx`, the second homepage section.

Purpose:

- open the archive after the calm hero
- show emotional range across many weddings
- preserve the black-and-white inner ring around the centered KT logo pocket

Rules:

- no logo morph
- no fixed intro logo
- no navbar inside the mosaic
- use original local images and Next/Image
- preserve manual object-position values
- keep tight gaps and controlled crops

## 8. Visual Showcase Sections

`components/home/HomeShowcaseSections.tsx` is the active post-mosaic showcase pattern. It adds three image-led rooms after the memory wall:

- `Story Reel`: a slow horizontal story-opening gallery that sends users into couple stories
- `Featured Film`: one strong film/video room that sends users to the Films page
- `What We Notice`: an image-led trust section about hands, family, rituals, laughter, rooms, and coastal light

Rules:

- keep these sections photographic and cinematic, not text-heavy
- do not render the old generic gateway/index card grid on the homepage
- use real local KT images with stable frames and manual object-position
- interactions should be subtle: very slow story reel motion, soft image scale, hover pause, local muted featured video, line-link movement
- the story reel is for Stories, not Films
- the featured film section should be one strong video/poster, not a messy grid
- do not autoplay many videos at once; use one featured muted video with `preload="metadata"`
- respect reduced motion by disabling decorative reel movement
- do not add repeated "Enter" buttons or overlay-heavy cards

## 9. Footer Strip

The footer is restrained:

- KT Photography
- Daman / Across India
- key links
- Instagram / YouTube
- WhatsApp / Email

Do not create a giant booking section on the homepage. The detailed check-date flow belongs on `/check-date`.

## 10. Image Rules

Use local KT images only. Do not use screenshots as site images.

Every important image needs:

- `src`
- `alt`
- manual `objectPosition`
- mobile crop if needed
- stable dimensions or aspect ratio

Preserve faces, hands, rituals, jewelry, embraces, and emotional gestures. If a crop fails, change the card shape, object position, or image.

## 11. Page Structure

The homepage should remain image-led. Current order is Editorial Hero, Mosaic Memory Wall, Visual Showcase Sections, Footer. Do not add full detailed homepage sections for:

- Wedding Moods / Studio Statement
- Featured Stories
- About / Experience
- Booking / Check Date

Films and stories may be represented through compact visual showcase sections, but not through generic card grids or long explanatory blocks.

## 11.1 Homepage Scene System

The homepage is built as a sequence of composed editorial scenes, not one uncontrolled long page.

Core scene tokens:

- `--nav-height`: the sticky masthead height
- `--scene-height`: `calc(100svh - var(--nav-height))`
- `--page-x`: responsive horizontal page gutter
- `--section-y`: responsive scene padding
- `--content-max`: maximum editorial rail
- `--text-max`: readable text rail

Scene rules:

- Desktop hero must fit the first viewport with nav, headline, image, couple name, story action, and story navigation visible together.
- Major homepage sections should fit roughly within one viewport unless the content is intentionally scrollable.
- Do not stack a huge heading, huge media frame, and caption vertically if the combined block cannot fit.
- Use split editorial layouts when a stacked layout becomes too tall.
- Story and film sections should feel like separate scenes with clear media rhythm, not generic cards or brochure blocks.
- Mobile can scroll naturally, but every section still needs composed spacing, stable media heights, and no blank gaps.

Hero rules:

- The homepage hero uses the centered album-opening direction: centered location label, centered serif headline, one large horizontal photograph, then a compact story row.
- Avoid split left-text/right-image hero layouts on the homepage.
- The hero image can be horizontal, but it must feel like a printed photograph with a subtle mat/frame, not a generic web banner.
- Navbar, headline, image, couple name, story action, and minimal `Prev / Next` controls must fit the first desktop viewport.
- Couple name and story action stay in the bottom story row, not below the fold.
- Hero CTA is an editorial text link with a line gesture, never a pill, box, circle, or filled marketing button.
- Story navigation stays minimal: small `Prev / Next`, story number, and one story link.

Story reel rules:

- The story reel opens individual story pages.
- Couple names appear on hover/focus, not permanently over every card.
- Motion should be medium-slow and premium; pause on hover and disable for reduced motion/mobile manual scroll.

Film scene rules:

- Homepage film section uses one dominant full-bleed or near full-bleed video/poster.
- It leads to `/films` and should not become a grid of competing cards.

Dedicated routes to preserve:

- `/stories`
- `/stories/[slug]`
- `/films`
- `/experience`
- `/about`
- `/check-date`
- `/events`

## 12. Responsive Rules

Desktop:

- editorial header
- hero fits first viewport
- mosaic follows as second section
- visual showcase sections continue the image/video-led rhythm
- footer closes quietly after the showcase

Tablet:

- nav collapses before wrapping
- mosaic reduces card count as needed
- showcase sections stack into readable image-led blocks

Mobile:

- logo and Menu header
- hero becomes readable and vertical
- mosaic becomes curated collage
- showcase image blocks stack with stable heights
- no horizontal overflow

## 13. Accessibility

- Use meaningful alt text.
- Keep focus states visible with `--focus-ring`.
- Keep sticky/fixed layers out of the homepage unless intentionally needed.
- Respect reduced motion.
- Keep links semantic and keyboard reachable.
