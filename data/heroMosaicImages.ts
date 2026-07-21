import { stories } from "@/data/archive";

export type HeroMosaicSlot =
  | "top-1"
  | "top-2"
  | "top-3"
  | "top-4"
  | "middle-left"
  | "feature-right"
  | "small-1"
  | "small-2"
  | "small-3"
  | "small-4"
  | "small-5"
  | "small-6"
  | "small-7"
  | "small-8"
  | "bottom-1"
  | "bottom-2"
  | "bottom-3"
  | "bottom-4";

export type HeroMosaicTone =
  | "beige"
  | "haldi"
  | "red"
  | "bw"
  | "sangeet"
  | "romantic"
  | "coastal";

export type HeroMosaicImage = {
  id: string;
  src: string;
  alt: string;
  section: "top" | "middle" | "logo-ring" | "bottom";
  tone: HeroMosaicTone;
  mood: string;
  slot: HeroMosaicSlot;
  objectPosition: string;
  objectPositionMobile?: string;
  priority?: boolean;
  sizes: string;
  mobile?: boolean;
};

const bySlug = new Map(stories.map((story) => [story.slug, story]));

function pick(slug: string, index: number) {
  const story = bySlug.get(slug) ?? stories[0];
  return story.gallery[index] ?? story.hero ?? story.cover;
}

const largeSizes = "(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 25vw";
const smallSizes = "(max-width: 1199px) 18vw, 9vw";

export const heroMosaicImages: HeroMosaicImage[] = [
  {
    id: "amrith-chetali-facing-coastal",
    slot: "top-1",
    section: "top",
    tone: "romantic",
    mood: "quiet connection",
    priority: true,
    sizes: largeSizes,
    mobile: true,
    objectPosition: "50% 50%",
    ...pick("amrith-chetali", 2)
  },
  {
    id: "sunil-vaishnavi-wedding-celebration",
    slot: "top-2",
    section: "top",
    tone: "haldi",
    mood: "ceremony joy",
    priority: true,
    sizes: largeSizes,
    mobile: true,
    objectPosition: "50% 50%",
    ...pick("sunil-vaishnavi", 6)
  },
  {
    id: "aamir-binish-horse-editorial",
    slot: "top-3",
    section: "top",
    tone: "romantic",
    mood: "wedding procession",
    priority: true,
    sizes: largeSizes,
    objectPosition: "50% 50%",
    ...pick("aamir-binish", 10)
  },
  {
    id: "dhavani-gaurav-portrait",
    slot: "top-4",
    section: "top",
    tone: "coastal",
    mood: "outdoor ease",
    priority: true,
    sizes: largeSizes,
    objectPosition: "50% 50%",
    ...pick("dhavani-gaurav", 12)
  },
  {
    id: "monika-aman-haldi-laughter",
    slot: "middle-left",
    section: "middle",
    tone: "haldi",
    mood: "joy",
    priority: true,
    sizes: "(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 29vw",
    mobile: true,
    objectPosition: "50% 50%",
    ...pick("monika-aman", 4)
  },
  {
    id: "aamir-binish-red-editorial",
    slot: "feature-right",
    section: "middle",
    tone: "red",
    mood: "editorial romance",
    priority: true,
    sizes: "(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 29vw",
    mobile: true,
    objectPosition: "50% 50%",
    ...pick("aamir-binish", 18)
  },
  {
    id: "monika-aman-red-detail",
    slot: "small-8",
    section: "logo-ring",
    tone: "red",
    mood: "bridal detail",
    sizes: smallSizes,
    objectPosition: "50% 50%",
    ...pick("monika-aman", 18)
  },
  {
    id: "monika-aman-haldi-bw-groom",
    slot: "small-1",
    section: "logo-ring",
    tone: "bw",
    mood: "family mischief",
    sizes: smallSizes,
    objectPosition: "50% 50%",
    ...pick("monika-aman", 22)
  },
  {
    id: "saurav-khushboo-wedding-ritual",
    slot: "small-2",
    section: "logo-ring",
    tone: "bw",
    mood: "anticipation",
    sizes: smallSizes,
    objectPosition: "50% 50%",
    ...pick("saurav-khushboo", 8)
  },
  {
    id: "mayank-rajeshree-quiet-portrait",
    slot: "small-3",
    section: "logo-ring",
    tone: "bw",
    mood: "quiet affection",
    sizes: smallSizes,
    mobile: true,
    objectPosition: "50% 50%",
    ...pick("mayank-rajeshree", 15)
  },
  {
    id: "dhavani-gaurav-wedding-portrait",
    slot: "small-4",
    section: "logo-ring",
    tone: "bw",
    mood: "documentary rhythm",
    sizes: smallSizes,
    objectPosition: "50% 50%",
    ...pick("dhavani-gaurav", 24)
  },
  {
    id: "monika-aman-bw-sangeet",
    slot: "small-5",
    section: "logo-ring",
    tone: "bw",
    mood: "candid conversation",
    sizes: smallSizes,
    objectPosition: "50% 50%",
    ...pick("monika-aman", 30)
  },
  {
    id: "monika-aman-bw-close",
    slot: "small-6",
    section: "logo-ring",
    tone: "bw",
    mood: "intimate portrait",
    sizes: smallSizes,
    mobile: true,
    objectPosition: "50% 50%",
    ...pick("monika-aman", 35)
  },
  {
    id: "saurav-khushboo-wedding-smile",
    slot: "small-7",
    section: "logo-ring",
    tone: "bw",
    mood: "ceremony smile",
    sizes: smallSizes,
    objectPosition: "50% 50%",
    ...pick("saurav-khushboo", 18)
  },
  {
    id: "aamir-binish-sangeet-stage",
    slot: "bottom-1",
    section: "bottom",
    tone: "sangeet",
    mood: "stage laughter",
    sizes: largeSizes,
    objectPosition: "50% 50%",
    ...pick("aamir-binish", 24)
  },
  {
    id: "saurav-khushboo-haldi-procession",
    slot: "bottom-2",
    section: "bottom",
    tone: "haldi",
    mood: "family colour",
    sizes: largeSizes,
    objectPosition: "50% 50%",
    ...pick("saurav-khushboo", 4)
  },
  {
    id: "sunil-vaishnavi-haldi-family",
    slot: "bottom-3",
    section: "bottom",
    tone: "haldi",
    mood: "family closeness",
    sizes: largeSizes,
    mobile: true,
    objectPosition: "50% 50%",
    ...pick("sunil-vaishnavi", 10)
  },
  {
    id: "aamir-binish-black-sangeet",
    slot: "bottom-4",
    section: "bottom",
    tone: "sangeet",
    mood: "evening rhythm",
    sizes: largeSizes,
    objectPosition: "50% 50%",
    ...pick("jay-riya", 12)
  }
];
