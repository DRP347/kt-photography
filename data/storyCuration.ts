import type { CoupleStoryManifest, ImageAsset, Story, StoryFunction, StoryImage, StoryModule } from "@/data/archive";

type Slot = "left" | "center" | "right";

type StoryCuration = {
  quote: string;
  coverSrc: string;
  heroSrc: string;
  cardImagePublicId: string;
  cardImageFocalPoint: string;
  heroPrimaryPublicId: string;
  heroSecondaryPublicIds: string[];
  opening: Record<Slot, string>;
  finalLimit: number;
  focalPoints?: Record<string, Pick<ImageAsset, "objectPosition" | "cropDesktop" | "cropTablet" | "cropMobile">>;
  exclude?: Record<string, string>;
};

export type StoryCurationAudit = {
  slug: string;
  hero: string;
  cover: string;
  sourceCount: number;
  finalCount: number;
  exactDuplicatesRemoved: number;
  nearDuplicatesRemoved: number;
  weakImagesExcluded: number;
  excludedImages: Array<{ src: string; reason: string }>;
  modules: string[];
  focalPointOverrides: string[];
};

const editorialLines: Record<string, string> = {
  "aamir-binish": "A wedding story held between quiet portraiture and celebration.",
  "amrith-chetali": "Soft coastal portraits, haldi warmth, and a night of movement.",
  "monika-aman": "Colour, ceremony, and the moments that stayed close.",
  "dhavani-gaurav": "A bright day moving from garden light into evening celebration.",
  "saurav-khushboo": "Portraits, ritual colour, and the family rhythm around them.",
  "kunal-aditi": "A compact wedding archive led by togetherness and light.",
  "jay-riya": "A story of close portraits, celebration, and ceremony.",
  "mayank-rajeshree": "Haldi warmth, evening portraiture, and wedding-day movement.",
  "bhavin-karishma": "Ceremony colour, evening portraits, and a measured wedding rhythm.",
  "sunil-vaishnavi": "Haldi, wedding movement, and a story held in soft daylight."
};

const curation: Record<string, StoryCuration> = {
  "aamir-binish": {
    quote: editorialLines["aamir-binish"],
    coverSrc: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-140.webp",
    heroSrc: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-137.webp",
    cardImagePublicId: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-140.webp",
    cardImageFocalPoint: "faces centered, red couple portrait",
    heroPrimaryPublicId: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-137.webp",
    heroSecondaryPublicIds: [
      "/drive-media/aamir-binish/wedding/aamir-binish-wedding-050.webp",
      "/drive-media/aamir-binish/wedding/aamir-binish-wedding-149.webp"
    ],
    opening: {
      left: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-137.webp",
      center: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-050.webp",
      right: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-149.webp"
    },
    finalLimit: 60,
    exclude: {
      "/drive-media/aamir-binish/wedding/aamir-binish-wedding-116.webp": "architectural/detail frame held out of primary story rhythm",
      "/drive-media/aamir-binish/wedding/aamir-binish-wedding-118.webp": "detail close-up removed from prominent sequence"
    }
  },
  "amrith-chetali": {
    quote: editorialLines["amrith-chetali"],
    coverSrc: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-220.webp",
    heroSrc: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-223.webp",
    cardImagePublicId: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-220.webp",
    cardImageFocalPoint: "couple faces centered",
    heroPrimaryPublicId: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-223.webp",
    heroSecondaryPublicIds: [
      "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-220.webp",
      "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-295.webp"
    ],
    opening: {
      left: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-220.webp",
      center: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-223.webp",
      right: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-295.webp"
    },
    finalLimit: 60
  },
  "monika-aman": {
    quote: editorialLines["monika-aman"],
    coverSrc: "/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp",
    heroSrc: "/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp",
    cardImagePublicId: "/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp",
    cardImageFocalPoint: "couple centered beneath petals",
    heroPrimaryPublicId: "/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp",
    heroSecondaryPublicIds: [
      "/drive-media/monika-aman/wedding/monika-aman-wedding-915.webp",
      "/drive-media/monika-aman/wedding/monika-aman-wedding-917.webp"
    ],
    opening: {
      left: "/drive-media/monika-aman/wedding/monika-aman-wedding-915.webp",
      center: "/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp",
      right: "/drive-media/monika-aman/wedding/monika-aman-wedding-917.webp"
    },
    finalLimit: 60,
    focalPoints: {
      "/drive-media/monika-aman/wedding/monika-aman-wedding-915.webp": {
        objectPosition: "50% 48%",
        cropDesktop: "50% 48%",
        cropTablet: "50% 48%",
        cropMobile: "50% 46%"
      },
      "/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp": {
        objectPosition: "50% 42%",
        cropDesktop: "50% 42%",
        cropTablet: "50% 42%",
        cropMobile: "50% 40%"
      },
      "/drive-media/monika-aman/wedding/monika-aman-wedding-917.webp": {
        objectPosition: "50% 43%",
        cropDesktop: "50% 43%",
        cropTablet: "50% 42%",
        cropMobile: "50% 40%"
      }
    },
    exclude: {
      "/drive-media/monika-aman/haldi/monika-aman-haldi-822.webp": "decor-only setup frame excluded from rendered story",
      "/drive-media/monika-aman/haldi/monika-aman-haldi-823.webp": "decor-only setup frame excluded from rendered story",
      "/drive-media/monika-aman/wedding/monika-aman-wedding-900.webp": "guest-heavy ceremony frame removed from card and opening use",
      "/drive-media/monika-aman/wedding/monika-aman-wedding-928.webp": "parent/relative-heavy ceremony frame removed from opening rhythm",
      "/drive-media/monika-aman/wedding/monika-aman-wedding-929.webp": "parent/relative-heavy ceremony frame removed from opening rhythm",
      "/drive-media/monika-aman/wedding/monika-aman-wedding-930.webp": "family-group ceremony frame excluded from prominent story sequence",
      "/drive-media/monika-aman/wedding/monika-aman-wedding-945.webp": "crowd-heavy procession frame excluded from opening use"
    }
  },
  "dhavani-gaurav": {
    quote: editorialLines["dhavani-gaurav"],
    coverSrc: "/drive-media/dhavani-gaurav/haldi/dhavani-gaurav-haldi-441.webp",
    heroSrc: "/drive-media/dhavani-gaurav/wedding/dhavani-gaurav-wedding-500.webp",
    cardImagePublicId: "/drive-media/dhavani-gaurav/haldi/dhavani-gaurav-haldi-441.webp",
    cardImageFocalPoint: "laughing couple centered",
    heroPrimaryPublicId: "/drive-media/dhavani-gaurav/wedding/dhavani-gaurav-wedding-500.webp",
    heroSecondaryPublicIds: [
      "/drive-media/dhavani-gaurav/haldi/dhavani-gaurav-haldi-441.webp",
      "/drive-media/dhavani-gaurav/sangeet/dhavani-gaurav-sangeet-452.webp"
    ],
    opening: {
      left: "/drive-media/dhavani-gaurav/haldi/dhavani-gaurav-haldi-441.webp",
      center: "/drive-media/dhavani-gaurav/wedding/dhavani-gaurav-wedding-500.webp",
      right: "/drive-media/dhavani-gaurav/sangeet/dhavani-gaurav-sangeet-452.webp"
    },
    finalLimit: 54,
    exclude: {
      "/drive-media/dhavani-gaurav/haldi/dhavani-gaurav-haldi-425.webp": "individual portrait removed from card/opening use",
      "/drive-media/dhavani-gaurav/wedding/dhavani-gaurav-wedding-475.webp": "signage frame excluded from rendered gallery"
    }
  },
  "saurav-khushboo": {
    quote: editorialLines["saurav-khushboo"],
    coverSrc: "/drive-media/saurav-khushboo/haldi/saurav-khushboo-haldi-946.webp",
    heroSrc: "/drive-media/saurav-khushboo/wedding/saurav-khushboo-wedding-981.webp",
    cardImagePublicId: "/drive-media/saurav-khushboo/haldi/saurav-khushboo-haldi-946.webp",
    cardImageFocalPoint: "couple centered in haldi frame",
    heroPrimaryPublicId: "/drive-media/saurav-khushboo/wedding/saurav-khushboo-wedding-981.webp",
    heroSecondaryPublicIds: [
      "/drive-media/saurav-khushboo/haldi/saurav-khushboo-haldi-946.webp",
      "/drive-media/saurav-khushboo/sangeet/saurav-khushboo-sangeet-968.webp"
    ],
    opening: {
      left: "/drive-media/saurav-khushboo/haldi/saurav-khushboo-haldi-946.webp",
      center: "/drive-media/saurav-khushboo/wedding/saurav-khushboo-wedding-981.webp",
      right: "/drive-media/saurav-khushboo/sangeet/saurav-khushboo-sangeet-968.webp"
    },
    finalLimit: 48,
    exclude: {
      "/drive-media/saurav-khushboo/wedding/saurav-khushboo-wedding-1013.webp": "individual bride portrait moved out of opening sequence",
      "/drive-media/saurav-khushboo/haldi/saurav-khushboo-haldi-950.webp": "poster-style composite excluded from rendered story",
      "/drive-media/saurav-khushboo/haldi/saurav-khushboo-haldi-951.webp": "poster-style composite excluded from rendered story"
    }
  },
  "kunal-aditi": {
    quote: editorialLines["kunal-aditi"],
    coverSrc: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-641.webp",
    heroSrc: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-655.webp",
    cardImagePublicId: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-641.webp",
    cardImageFocalPoint: "seated couple centered",
    heroPrimaryPublicId: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-655.webp",
    heroSecondaryPublicIds: [
      "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-641.webp",
      "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-654.webp"
    ],
    opening: {
      left: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-641.webp",
      center: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-655.webp",
      right: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-654.webp"
    },
    finalLimit: 42,
    exclude: {
      "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-635.webp": "individual groom portrait removed from primary story use",
      "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-636.webp": "individual groom portrait removed from primary story use",
      "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-637.webp": "individual groom portrait removed from primary story use",
      "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-638.webp": "individual groom portrait removed from primary story use",
      "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-651.webp": "detail close-up excluded from the concise story edit"
    }
  },
  "jay-riya": {
    quote: editorialLines["jay-riya"],
    coverSrc: "/drive-media/jay-riya/haldi/jay-riya-haldi-535.webp",
    heroSrc: "/drive-media/jay-riya/haldi/jay-riya-haldi-535.webp",
    cardImagePublicId: "/drive-media/jay-riya/haldi/jay-riya-haldi-535.webp",
    cardImageFocalPoint: "faces centered in haldi couple portrait",
    heroPrimaryPublicId: "/drive-media/jay-riya/haldi/jay-riya-haldi-535.webp",
    heroSecondaryPublicIds: [
      "/drive-media/jay-riya/haldi/jay-riya-haldi-526.webp",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-593.webp"
    ],
    opening: {
      left: "/drive-media/jay-riya/haldi/jay-riya-haldi-526.webp",
      center: "/drive-media/jay-riya/haldi/jay-riya-haldi-535.webp",
      right: "/drive-media/jay-riya/haldi/jay-riya-haldi-536.webp"
    },
    finalLimit: 54,
    focalPoints: {
      "/drive-media/jay-riya/haldi/jay-riya-haldi-526.webp": {
        objectPosition: "50% 42%",
        cropDesktop: "50% 42%",
        cropTablet: "50% 42%",
        cropMobile: "50% 40%"
      },
      "/drive-media/jay-riya/haldi/jay-riya-haldi-535.webp": {
        objectPosition: "50% 38%",
        cropDesktop: "50% 38%",
        cropTablet: "50% 38%",
        cropMobile: "50% 36%"
      },
      "/drive-media/jay-riya/haldi/jay-riya-haldi-536.webp": {
        objectPosition: "50% 42%",
        cropDesktop: "50% 42%",
        cropTablet: "50% 42%",
        cropMobile: "50% 40%"
      }
    },
    exclude: {
      "/drive-media/jay-riya/haldi/jay-riya-haldi-525.webp": "individual groom portrait removed from primary story use",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-572.webp": "obstructed crowd frame removed from opening and prominent rows",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-634.webp": "ritual detail close-up removed from opening sequence",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-558.webp": "weaker mixed-layout card frame replaced by clear named-couple portrait",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-574.webp": "layout mockup/composite removed from rendered gallery",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-575.webp": "layout mockup/composite removed from rendered gallery",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-590.webp": "empty corridor image excluded from rendered story",
      "/drive-media/jay-riya/wedding/jay-riya-wedding-609.webp": "detail frame excluded from rendered story"
    }
  },
  "mayank-rajeshree": {
    quote: editorialLines["mayank-rajeshree"],
    coverSrc: "/drive-media/mayank-rajeshree/haldi/mayank-rajeshree-haldi-715.webp",
    heroSrc: "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-745.webp",
    cardImagePublicId: "/drive-media/mayank-rajeshree/haldi/mayank-rajeshree-haldi-715.webp",
    cardImageFocalPoint: "couple centered in haldi frame",
    heroPrimaryPublicId: "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-745.webp",
    heroSecondaryPublicIds: [
      "/drive-media/mayank-rajeshree/haldi/mayank-rajeshree-haldi-715.webp",
      "/drive-media/mayank-rajeshree/wedding/mayank-rajeshree-wedding-787.webp"
    ],
    opening: {
      left: "/drive-media/mayank-rajeshree/haldi/mayank-rajeshree-haldi-715.webp",
      center: "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-745.webp",
      right: "/drive-media/mayank-rajeshree/wedding/mayank-rajeshree-wedding-787.webp"
    },
    finalLimit: 60,
    focalPoints: {
      "/drive-media/mayank-rajeshree/haldi/mayank-rajeshree-haldi-715.webp": {
        cropDesktop: "50% 36%",
        cropTablet: "50% 34%",
        cropMobile: "50% 31%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-735.webp": {
        cropDesktop: "50% 34%",
        cropTablet: "50% 31%",
        cropMobile: "50% 29%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-736.webp": {
        cropDesktop: "50% 31%",
        cropTablet: "50% 30%",
        cropMobile: "50% 29%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-737.webp": {
        cropDesktop: "50% 32%",
        cropTablet: "50% 30%",
        cropMobile: "50% 29%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-738.webp": {
        cropDesktop: "50% 32%",
        cropTablet: "50% 30%",
        cropMobile: "50% 29%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-742.webp": {
        cropDesktop: "54% 29%",
        cropTablet: "53% 28%",
        cropMobile: "52% 28%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-743.webp": {
        cropDesktop: "52% 28%",
        cropTablet: "52% 27%",
        cropMobile: "52% 27%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-744.webp": {
        cropDesktop: "56% 29%",
        cropTablet: "55% 28%",
        cropMobile: "54% 27%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-745.webp": {
        cropDesktop: "50% 25%",
        cropTablet: "50% 23%",
        cropMobile: "50% 22%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-746.webp": {
        cropDesktop: "50% 28%",
        cropTablet: "50% 27%",
        cropMobile: "50% 26%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-747.webp": {
        cropDesktop: "50% 27%",
        cropTablet: "50% 26%",
        cropMobile: "50% 25%"
      },
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-751.webp": {
        cropDesktop: "54% 28%",
        cropTablet: "53% 27%",
        cropMobile: "52% 26%"
      }
    },
    exclude: {
      "/drive-media/mayank-rajeshree/haldi/mayank-rajeshree-haldi-685.webp": "individual groom haldi image removed from primary story use",
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-748.webp": "torso/detail crop removed from the public story rhythm",
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-752.webp": "individual groom portrait removed from prominent story use",
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-753.webp": "near-duplicate individual groom portrait removed",
      "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-754.webp": "individual groom portrait removed from prominent story use"
    }
  },
  "bhavin-karishma": {
    quote: editorialLines["bhavin-karishma"],
    coverSrc: "/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-300.webp",
    heroSrc: "/drive-media/bhavin-karishma/wedding/bhavin-karishma-wedding-419.webp",
    cardImagePublicId: "/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-300.webp",
    cardImageFocalPoint: "couple centered",
    heroPrimaryPublicId: "/drive-media/bhavin-karishma/wedding/bhavin-karishma-wedding-419.webp",
    heroSecondaryPublicIds: [
      "/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-300.webp",
      "/drive-media/bhavin-karishma/sangeet/bhavin-karishma-sangeet-346.webp"
    ],
    opening: {
      left: "/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-300.webp",
      center: "/drive-media/bhavin-karishma/wedding/bhavin-karishma-wedding-419.webp",
      right: "/drive-media/bhavin-karishma/sangeet/bhavin-karishma-sangeet-346.webp"
    },
    finalLimit: 60,
    exclude: {
      "/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-296.webp": "individual bride portrait removed from primary story use",
      "/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-299.webp": "jewellery detail excluded from primary story flow"
    }
  },
  "sunil-vaishnavi": {
    quote: editorialLines["sunil-vaishnavi"],
    coverSrc: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp",
    heroSrc: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp",
    cardImagePublicId: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp",
    cardImageFocalPoint: "couple centered in full-length wedding portrait",
    heroPrimaryPublicId: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp",
    heroSecondaryPublicIds: [
      "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1123.webp",
      "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1091.webp"
    ],
    opening: {
      left: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1123.webp",
      center: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp",
      right: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1091.webp"
    },
    finalLimit: 54,
    focalPoints: {
      "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp": {
        objectPosition: "50% 36%",
        cropDesktop: "50% 36%",
        cropTablet: "50% 36%",
        cropMobile: "50% 34%"
      },
      "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1123.webp": {
        objectPosition: "50% 38%",
        cropDesktop: "50% 38%",
        cropTablet: "50% 38%",
        cropMobile: "50% 36%"
      },
      "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1091.webp": {
        objectPosition: "50% 42%",
        cropDesktop: "50% 42%",
        cropTablet: "50% 42%",
        cropMobile: "50% 40%"
      }
    },
    exclude: {
      "/drive-media/sunil-vaishnavi/haldi/sunil-vaishnavi-haldi-1014.webp": "ceremony sign removed from primary story use",
      "/drive-media/sunil-vaishnavi/haldi/sunil-vaishnavi-haldi-1015.webp": "venue exterior removed from primary story use",
      "/drive-media/sunil-vaishnavi/haldi/sunil-vaishnavi-haldi-1016.webp": "ceremony sign removed from rendered story",
      "/drive-media/sunil-vaishnavi/haldi/sunil-vaishnavi-haldi-1017.webp": "decor detail removed from rendered story",
      "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1081.webp": "family-forward frame removed from story card and opening use"
    }
  }
};

function fileNumber(src: string) {
  const match = src.match(/-(\d+)\.webp$/);
  return match ? Number(match[1]) : null;
}

function eventKey(image: StoryImage) {
  return `${image.event ?? "story"}:${image.src.split("/").slice(0, -1).join("/")}`;
}

function applyFocalPoint(image: StoryImage, slug: string): StoryImage {
  const override = curation[slug]?.focalPoints?.[image.src];
  return override ? { ...image, ...override } : image;
}

function imageMap(story: Story, manifest?: CoupleStoryManifest) {
  const entries: StoryImage[] = [
    story.hero,
    story.cover,
    ...story.gallery,
    ...(manifest?.openingTriptych
      ? [manifest.openingTriptych.left, manifest.openingTriptych.center, manifest.openingTriptych.right]
      : []),
    ...(manifest?.functions.flatMap((storyFunction) =>
      storyFunction.modules?.length ? storyFunction.modules.flatMap((module) => module.images) : storyFunction.images
    ) ?? [])
  ];

  return new Map(entries.map((image) => [image.src, applyFocalPoint(image, story.slug)]));
}

function findImage(story: Story, manifest: CoupleStoryManifest | undefined, src: string) {
  const found = imageMap(story, manifest).get(src);
  return found ? applyFocalPoint(found, story.slug) : null;
}

function uniqueBySrc(images: StoryImage[]) {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

function thinNearDuplicates(images: StoryImage[], slug: string, openingSrcs: Set<string>) {
  const kept: StoryImage[] = [];
  const lastByEvent = new Map<string, number>();
  let removed = 0;

  for (const image of images) {
    const number = fileNumber(image.src);
    const key = eventKey(image);
    const last = lastByEvent.get(key);
    const protectedFrame = openingSrcs.has(image.src) || image.importance === "feature";

    if (!protectedFrame && number !== null && last !== undefined && Math.abs(number - last) <= 1) {
      removed += 1;
      continue;
    }

    if (number !== null) lastByEvent.set(key, number);
    kept.push(applyFocalPoint(image, slug));
  }

  return { images: kept, removed };
}

function moduleKind(images: StoryImage[]): StoryModule["module"] {
  if (images.length === 1) return "J";
  if (images.length === 4) return "F";
  if (images.length === 3) return "E";
  const [first, second] = images;
  if (first.orientation === "landscape" && second.orientation === "portrait") return "C";
  if (first.orientation === "portrait" && second.orientation === "landscape") return "D";
  return "B";
}

function chunkModules(images: StoryImage[], prefix: string) {
  const modules: StoryModule[] = [];
  let cursor = 0;

  while (cursor < images.length) {
    const remaining = images.length - cursor;
    let size = remaining >= 7 ? (modules.length % 3 === 1 ? 3 : 2) : remaining;

    if (remaining === 1 && modules.length) {
      const previous = modules[modules.length - 1];
      previous.images = [...previous.images, images[cursor]];
      previous.module = moduleKind(previous.images);
      break;
    }

    if (remaining === 5) size = 3;
    if (remaining === 4) size = 4;
    if (remaining === 3) size = 3;
    if (remaining === 2) size = 2;
    if (remaining === 1) size = 1;

    const moduleImages = images.slice(cursor, cursor + size);
    modules.push({
      id: `${prefix}-${modules.length + 1}`,
      module: moduleKind(moduleImages),
      intent: "Curated editorial rhythm",
      images: moduleImages
    });
    cursor += size;
  }

  return modules;
}

function curateFunction(storyFunction: StoryFunction, slug: string, excluded: Record<string, string>, openingSrcs: Set<string>) {
  const source = storyFunction.modules?.length
    ? storyFunction.modules.flatMap((module) => module.images)
    : storyFunction.images;
  const filtered = uniqueBySrc(source)
    .filter((image) => !openingSrcs.has(image.src))
    .filter((image) => excluded[image.src] == null)
    .map((image) => applyFocalPoint(image, slug));

  const thinned = thinNearDuplicates(filtered, slug, openingSrcs);

  return {
    storyFunction: {
      ...storyFunction,
      images: thinned.images,
      modules: chunkModules(thinned.images, storyFunction.id)
    },
    nearDuplicatesRemoved: thinned.removed,
    exactDuplicatesRemoved: source.length - uniqueBySrc(source).length,
    weakImagesExcluded: source.filter((image) => excluded[image.src] != null).length
  };
}

export function getStoryCuration(slug: string) {
  return curation[slug];
}

export function getCuratedStory(story: Story, manifest?: CoupleStoryManifest): Story {
  const rules = curation[story.slug];
  if (!rules) {
    return {
      ...story,
      note: editorialLines[story.slug] ?? ""
    };
  }

  const cover = findImage(story, manifest, rules.cardImagePublicId) ?? findImage(story, manifest, rules.coverSrc) ?? story.cover;
  const hero = findImage(story, manifest, rules.heroPrimaryPublicId) ?? findImage(story, manifest, rules.heroSrc) ?? cover;

  return {
    ...story,
    note: rules.quote,
    intro: story.intro.replace(" photographed by KT Photography.", "."),
    cover: { ...cover, importance: "feature", layoutRole: "feature" },
    hero: { ...hero, importance: "feature", layoutRole: "feature" }
  };
}

export function getCuratedManifest(story: Story, manifest?: CoupleStoryManifest): CoupleStoryManifest | undefined {
  if (!manifest) return manifest;

  const rules = curation[story.slug];
  const curatedStory = getCuratedStory(story, manifest);
  const openingSources = rules?.opening ?? {
    left: curatedStory.cover.src,
    center: curatedStory.hero.src,
    right: curatedStory.gallery[0]?.src ?? curatedStory.cover.src
  };
  const openingImages = {
    left: findImage(story, manifest, openingSources.left) ?? curatedStory.cover,
    center: findImage(story, manifest, openingSources.center) ?? curatedStory.hero,
    right: findImage(story, manifest, openingSources.right) ?? curatedStory.cover
  };
  const openingSrcs = new Set(Object.values(openingSources));
  const excluded = rules?.exclude ?? {};
  let selectedCount = 0;

  const functions = manifest.functions
    .map((storyFunction) => {
      const result = curateFunction(storyFunction, story.slug, excluded, openingSrcs);
      return result.storyFunction;
    })
    .filter((storyFunction) => storyFunction.images.length > 0)
    .map((storyFunction) => {
      const remaining = (rules?.finalLimit ?? 54) - selectedCount;
      if (remaining <= 0) {
        return { ...storyFunction, images: [], modules: [] };
      }
      const limitedImages = storyFunction.images.slice(0, remaining);
      selectedCount += limitedImages.length;
      return {
        ...storyFunction,
        images: limitedImages,
        modules: chunkModules(limitedImages, storyFunction.id)
      };
    })
    .filter((storyFunction) => storyFunction.images.length > 0);

  return {
    ...manifest,
    quote: rules?.quote ?? editorialLines[story.slug] ?? manifest.quote,
    openingTriptych: {
      module: "A",
      left: { ...openingImages.left, importance: "feature", layoutRole: "feature" },
      center: { ...openingImages.center, importance: "feature", layoutRole: "feature" },
      right: { ...openingImages.right, importance: "feature", layoutRole: "feature" }
    },
    functions,
    closingImage: functions.at(-1)?.images.at(-1),
    storyTier: manifest.storyTier,
    soundtrack: manifest.soundtrack,
    film: manifest.film
  };
}

export function getStoryCurationAudit(story: Story, manifest?: CoupleStoryManifest): StoryCurationAudit {
  const rules = curation[story.slug];
  const curatedStory = getCuratedStory(story, manifest);
  const curatedManifest = getCuratedManifest(story, manifest);
  const sourceImages =
    manifest?.functions.flatMap((storyFunction) =>
      storyFunction.modules?.length ? storyFunction.modules.flatMap((module) => module.images) : storyFunction.images
    ) ?? story.gallery;
  const uniqueSourceCount = uniqueBySrc(sourceImages).length;
  const finalImages = curatedManifest?.functions.flatMap((storyFunction) => storyFunction.images) ?? [];
  const modules = curatedManifest?.functions.flatMap((storyFunction) => storyFunction.modules?.map((module) => module.module) ?? []) ?? [];
  const weakImagesExcluded = sourceImages.filter((image) => rules?.exclude?.[image.src] != null).length;
  const exactDuplicatesRemoved = sourceImages.length - uniqueSourceCount;
  const openingCount = curatedManifest?.openingTriptych ? 3 : 0;
  const nearDuplicatesRemoved = Math.max(0, uniqueSourceCount - finalImages.length - weakImagesExcluded - openingCount);

  return {
    slug: story.slug,
    hero: curatedStory.hero.src,
    cover: curatedStory.cover.src,
    sourceCount: sourceImages.length,
    finalCount: finalImages.length + openingCount,
    exactDuplicatesRemoved,
    nearDuplicatesRemoved,
    weakImagesExcluded,
    excludedImages: Object.entries(rules?.exclude ?? {}).map(([src, reason]) => ({ src, reason })),
    modules: Array.from(new Set(modules)),
    focalPointOverrides: Object.keys(rules?.focalPoints ?? {})
  };
}
