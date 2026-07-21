import Image from "next/image";
import type { CSSProperties } from "react";

type MemoryWallSlot = {
  slotId: string;
  publicId: string;
  src: string;
  alt: string;
  slot: string;
  slotRole: string;
  slotAspectRatio: string;
  focalPoint: string;
  objectPosition?: string;
  objectPositionMobile?: string;
  priority?: boolean;
  desktopVisible: boolean;
  tabletVisible: boolean;
  mobileVisible: boolean;
  size: "large" | "small";
  tone: "colour" | "bw";
  mood: string;
};

const memoryWallSlots: MemoryWallSlot[] = [
  {
    slotId: "mw-01",
    publicId: "aamir-binish-wedding-103",
    src: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-103.webp",
    alt: "Aamir & Binish in a red wedding portrait",
    slot: "top-left",
    slotRole: "wide couple portrait",
    slotAspectRatio: "panoramic",
    focalPoint: "faces centered",
    objectPosition: "50% 46%",
    objectPositionMobile: "50% 42%",
    priority: true,
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "large",
    tone: "colour",
    mood: "red wedding portrait"
  },
  {
    slotId: "mw-02",
    publicId: "monika-aman-wedding-915",
    src: "/drive-media/monika-aman/wedding/monika-aman-wedding-915.webp",
    alt: "Monika & Aman together under the wedding canopy",
    slot: "top-mid-left",
    slotRole: "wide ceremony couple",
    slotAspectRatio: "panoramic",
    focalPoint: "couple centered",
    objectPosition: "50% 50%",
    priority: true,
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: true,
    size: "large",
    tone: "colour",
    mood: "ceremony canopy"
  },
  {
    slotId: "mw-03",
    publicId: "amrith-chetali-wedding-220",
    src: "/drive-media/amrith-chetali/wedding/amrith-chetali-wedding-220.webp",
    alt: "Amrith & Chetali in a soft wedding portrait",
    slot: "top-mid-right",
    slotRole: "small couple portrait",
    slotAspectRatio: "landscape crop",
    focalPoint: "faces high center",
    objectPosition: "50% 43%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "colour",
    mood: "soft portrait"
  },
  {
    slotId: "mw-04",
    publicId: "kunal-aditi-wedding-641",
    src: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-641.webp",
    alt: "Kunal & Aditi seated together during their wedding",
    slot: "top-right",
    slotRole: "small couple portrait",
    slotAspectRatio: "landscape crop",
    focalPoint: "couple centered",
    objectPosition: "50% 45%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "colour",
    mood: "quiet seated portrait"
  },
  {
    slotId: "mw-05",
    publicId: "dhavani-gaurav-haldi-441",
    src: "/drive-media/dhavani-gaurav/haldi/dhavani-gaurav-haldi-441.webp",
    alt: "Dhavani & Gaurav laughing together at haldi",
    slot: "left-large-haldis",
    slotRole: "large couple celebration",
    slotAspectRatio: "portrait crop",
    focalPoint: "faces upper center",
    objectPosition: "50% 42%",
    objectPositionMobile: "50% 39%",
    priority: true,
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: true,
    size: "large",
    tone: "colour",
    mood: "haldi joy"
  },
  {
    slotId: "mw-06",
    publicId: "ee37329347-8",
    src: "/optimized/ee37329347-8.webp",
    alt: "A couple beneath a floral canopy with petals falling",
    slot: "right-large-red-couple",
    slotRole: "large ceremony couple",
    slotAspectRatio: "portrait crop",
    focalPoint: "couple lower center with canopy",
    objectPosition: "50% 42%",
    objectPositionMobile: "50% 43%",
    priority: true,
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: true,
    size: "large",
    tone: "colour",
    mood: "floral ceremony"
  },
  {
    slotId: "mw-07",
    publicId: "sunil-vaishnavi-wedding-1122",
    src: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1122.webp",
    alt: "Sunil & Vaishnavi standing together in wedding attire",
    slot: "center-bw-1",
    slotRole: "center couple portrait",
    slotAspectRatio: "small wide crop",
    focalPoint: "faces centered",
    objectPosition: "50% 36%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "bw",
    mood: "formal portrait"
  },
  {
    slotId: "mw-08",
    publicId: "jay-riya-haldi-535",
    src: "/drive-media/jay-riya/haldi/jay-riya-haldi-535.webp",
    alt: "Jay & Riya smiling together in a haldi portrait",
    slot: "center-bw-2",
    slotRole: "center couple portrait",
    slotAspectRatio: "small wide crop",
    focalPoint: "faces centered",
    objectPosition: "50% 38%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "bw",
    mood: "wedding ritual"
  },
  {
    slotId: "mw-09",
    publicId: "bhavin-karishma-haldi-300",
    src: "/drive-media/bhavin-karishma/haldi/bhavin-karishma-haldi-300.webp",
    alt: "Bhavin & Karishma together at haldi",
    slot: "center-detail-left",
    slotRole: "center couple haldi",
    slotAspectRatio: "small square crop",
    focalPoint: "couple centered",
    objectPosition: "50% 48%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "colour",
    mood: "haldi portrait"
  },
  {
    slotId: "mw-10",
    publicId: "kunal-aditi-wedding-655",
    src: "/drive-media/kunal-aditi/wedding/kunal-aditi-wedding-655.webp",
    alt: "Kunal & Aditi in a close wedding portrait",
    slot: "center-detail-right",
    slotRole: "center couple close portrait",
    slotAspectRatio: "small square crop",
    focalPoint: "faces upper center",
    objectPosition: "50% 38%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "colour",
    mood: "close portrait"
  },
  {
    slotId: "mw-11",
    publicId: "mayank-rajeshree-sangeet-745",
    src: "/drive-media/mayank-rajeshree/sangeet/mayank-rajeshree-sangeet-745.webp",
    alt: "Mayank & Rajeshree in an evening portrait",
    slot: "center-bw-3",
    slotRole: "center couple evening portrait",
    slotAspectRatio: "small wide crop",
    focalPoint: "faces centered",
    objectPosition: "52% 38%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "bw",
    mood: "evening portrait"
  },
  {
    slotId: "mw-12",
    publicId: "saurav-khushboo-wedding-981",
    src: "/drive-media/saurav-khushboo/wedding/saurav-khushboo-wedding-981.webp",
    alt: "Saurav & Khushboo together during their wedding",
    slot: "center-bw-4",
    slotRole: "center couple ritual",
    slotAspectRatio: "small wide crop",
    focalPoint: "couple centered",
    objectPosition: "50% 44%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "small",
    tone: "bw",
    mood: "ritual portrait"
  },
  {
    slotId: "mw-13",
    publicId: "b2bccb933f-cut-0985",
    src: "/optimized/b2bccb933f-cut-0985.webp",
    alt: "A couple seated together in an evening portrait",
    slot: "bottom-left",
    slotRole: "wide couple evening portrait",
    slotAspectRatio: "landscape crop",
    focalPoint: "couple centered",
    objectPosition: "50% 50%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "large",
    tone: "colour",
    mood: "evening seated portrait"
  },
  {
    slotId: "mw-14",
    publicId: "f146173b62-0l7a5295",
    src: "/optimized/f146173b62-0l7a5295.webp",
    alt: "A couple holding hands by the coast",
    slot: "bottom-mid-left",
    slotRole: "wide couple portrait",
    slotAspectRatio: "landscape crop",
    focalPoint: "couple centered",
    objectPosition: "50% 46%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "large",
    tone: "colour",
    mood: "coastal portrait"
  },
  {
    slotId: "mw-15",
    publicId: "sunil-vaishnavi-wedding-1123",
    src: "/drive-media/sunil-vaishnavi/wedding/sunil-vaishnavi-wedding-1123.webp",
    alt: "Sunil & Vaishnavi walking together in soft daylight",
    slot: "bottom-mid-right",
    slotRole: "wide couple daylight portrait",
    slotAspectRatio: "landscape crop",
    focalPoint: "couple centered",
    objectPosition: "50% 39%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: true,
    size: "large",
    tone: "colour",
    mood: "daylight portrait"
  },
  {
    slotId: "mw-16",
    publicId: "aamir-binish-wedding-140",
    src: "/drive-media/aamir-binish/wedding/aamir-binish-wedding-140.webp",
    alt: "Aamir & Binish in a close red wedding portrait",
    slot: "bottom-right",
    slotRole: "wide couple red portrait",
    slotAspectRatio: "landscape crop",
    focalPoint: "faces centered",
    objectPosition: "50% 38%",
    desktopVisible: true,
    tabletVisible: true,
    mobileVisible: false,
    size: "large",
    tone: "colour",
    mood: "red close portrait"
  }
];

const largeTileSizes = "(max-width: 768px) 100vw, 38vw";
const smallTileSizes = "(max-width: 768px) 50vw, 18vw";

const mobileWallImages = [
  memoryWallSlots.find((image) => image.publicId === "dhavani-gaurav-haldi-441"),
  memoryWallSlots.find((image) => image.publicId === "ee37329347-8"),
  memoryWallSlots.find((image) => image.publicId === "sunil-vaishnavi-wedding-1123")
].filter((image): image is MemoryWallSlot => Boolean(image));

export function MosaicMemoryWall() {
  return (
    <section
      className="archive-memory-wall"
      id="memory-wall"
      aria-label="KT Photography memory wall"
      data-hide-header="true"
    >
      <div className="archive-memory-wall__grid">
        <div className="archive-memory-grid">
          {memoryWallSlots.slice(0, 9).map((image) => {
            const imageStyle = {
              "--image-position": image.objectPosition,
              "--image-position-mobile": image.objectPositionMobile ?? image.objectPosition
            } as CSSProperties;

            return (
              <figure
                className={[
                  "archive-memory-card",
                  `archive-memory-card--${image.slot}`,
                  image.tone === "bw" ? "is-bw" : ""
                ].join(" ")}
                aria-label={image.alt}
                data-slot-id={image.slotId}
                data-slot-role={image.slotRole}
                data-slot-aspect-ratio={image.slotAspectRatio}
                data-public-id={image.publicId}
                data-focal-point={image.focalPoint}
                data-desktop-visible={image.desktopVisible}
                data-tablet-visible={image.tabletVisible}
                data-mobile-visible={image.mobileVisible}
                data-priority={image.priority ? "true" : "false"}
                data-tone={image.tone}
                data-mood={image.mood}
                key={image.slotId}
                style={imageStyle}
                tabIndex={0}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={image.size === "large" ? largeTileSizes : smallTileSizes}
                  priority={image.priority}
                  loading={image.priority ? undefined : "eager"}
                  quality={82}
                />
              </figure>
            );
          })}
          <figure className="archive-memory-card archive-memory-card--mark" aria-label="KT Photography">
            <Image
              src="/kt-logo-transparent.png"
              alt="KT Photography"
              width={220}
              height={120}
              sizes="(max-width: 700px) 38vw, 14vw"
              loading="eager"
              quality={90}
            />
          </figure>
          {memoryWallSlots.slice(9).map((image) => {
            const imageStyle = {
              "--image-position": image.objectPosition,
              "--image-position-mobile": image.objectPositionMobile ?? image.objectPosition
            } as CSSProperties;

            return (
              <figure
                className={[
                  "archive-memory-card",
                  `archive-memory-card--${image.slot}`,
                  image.tone === "bw" ? "is-bw" : ""
                ].join(" ")}
                aria-label={image.alt}
                data-slot-id={image.slotId}
                data-slot-role={image.slotRole}
                data-slot-aspect-ratio={image.slotAspectRatio}
                data-public-id={image.publicId}
                data-focal-point={image.focalPoint}
                data-desktop-visible={image.desktopVisible}
                data-tablet-visible={image.tabletVisible}
                data-mobile-visible={image.mobileVisible}
                data-priority={image.priority ? "true" : "false"}
                data-tone={image.tone}
                data-mood={image.mood}
                key={image.slotId}
                style={imageStyle}
                tabIndex={0}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={image.size === "large" ? largeTileSizes : smallTileSizes}
                  priority={image.priority}
                  loading={image.priority ? undefined : "eager"}
                  quality={82}
                />
              </figure>
            );
          })}
        </div>
      </div>

      <div className="archive-memory-mobile" aria-label="KT Photography mobile memory wall">
        {mobileWallImages.map((image, index) => (
          <figure
            className={`archive-memory-mobile__image archive-memory-mobile__image--${index + 1}`}
            key={image.slotId}
            data-public-id={image.publicId}
            data-slot-role={image.slotRole}
            style={{
              "--image-position-mobile": image.objectPositionMobile ?? image.objectPosition
            } as CSSProperties}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={index === 0 ? "100vw" : "50vw"}
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              quality={82}
            />
          </figure>
        ))}
        <figure className="archive-memory-mobile__mark" aria-label="KT Photography">
          <Image
            src="/kt-logo-transparent.png"
            alt="KT Photography"
            width={120}
            height={66}
            sizes="96px"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
