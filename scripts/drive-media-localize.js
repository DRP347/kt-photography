#!/usr/bin/env node

const fs = require("fs/promises");
const fss = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const ROOT = process.cwd();
const GENERATED_DIR = path.join(ROOT, "data", "generated");
const REPORTS_DIR = path.join(ROOT, "reports");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "drive-media");
const TMP_DIR = path.join("/private/tmp", "kt-drive-downloads");

const EXCLUDED_FOLDER_IDS = new Set(["1Cz0vEBqv2nywVaeiWxpQOPBcMmdPGTFV"]);
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const MAX_EDGE = Number(process.env.KT_DRIVE_MAX_EDGE || 1800);
const DRIVE_THUMB_EDGE = Number(process.env.KT_DRIVE_THUMB_EDGE || 2400);
const WEBP_QUALITY = Number(process.env.KT_DRIVE_WEBP_QUALITY || 76);
const PROCESS_CONCURRENCY = Number(process.env.KT_DRIVE_CONCURRENCY || 4);

const COUPLES = [
  {
    slug: "aamir-binish",
    coupleName: "Aamir & Binish",
    rootId: "18L_-DTwIx2vDxH83mcwaUm_E6asv2kg6",
    category: "Photo + Film Story",
    filmSlug: "aamir-binish-same-day-edit"
  },
  {
    slug: "amrith-chetali",
    coupleName: "Amrith & Chetali",
    rootId: "1aMz31T0x0vRCnEp8bG2WCvsjlxCaIcPE",
    category: "Photo + Film Story",
    filmSlug: "amrith-chetali-highlight"
  },
  {
    slug: "monika-aman",
    coupleName: "Aman & Monika",
    rootId: "1r-hurZm5uwU2uexIOjiJ1w6XYgN-PNHA",
    category: "Photo + Film Story",
    filmSlug: "monika-aman-teaser"
  },
  {
    slug: "dhavani-gaurav",
    coupleName: "Dhwani & Gaurav",
    rootId: "1Ii57gum1NmIJuI2wCmjkfR1LB05JhWpm",
    category: "Pre-Wedding",
    filmSlug: "dhavani-gaurav-pre-wedding-teaser"
  },
  {
    slug: "saurav-khushboo",
    coupleName: "Saurav & Khushboo",
    rootId: "12_RnqjxDY0QU2uxO8-fmIUbNL3He9yF2",
    category: "Photo + Film Story",
    filmSlug: "saurav-khushboo-highlight"
  },
  {
    slug: "kunal-aditi",
    coupleName: "Kunal & Aditi",
    rootId: "1J51Yh9fLCCCuYw6SYxbdmiUGvp8D1tdD",
    category: "Wedding Story"
  },
  {
    slug: "jay-riya",
    coupleName: "Jay & Riya",
    rootId: "1G-qjyi6CzeTx6v9avJkXdnZX1TB0YBxy",
    category: "Photo + Film Story",
    filmSlug: "jay-riya-highlight"
  },
  {
    slug: "mayank-rajeshree",
    coupleName: "Mayank & Rajeshree",
    rootId: "13VAuOqhxcZfnkTBSQK6OvEriQ8QunpYT",
    category: "Photo + Film Story",
    filmSlug: "mayank-rajeshree-highlight"
  },
  {
    slug: "bhavin-karishma",
    coupleName: "Bhavin & Karishma",
    rootId: "1QazQBOt3NgNkx8ZOFiQjBB2-PpyJKBSr",
    category: "Photo + Film Story",
    filmSlug: "bhavin-karishma-highlight"
  },
  {
    slug: "sunil-vaishnavi",
    coupleName: "Sunil & Vaishnavi",
    rootId: "15koV8fv0CZ7yHRHGL4BH2HnwLTQywMF5",
    category: "Photo + Film Story",
    filmSlug: "sunil-vaishnavi-highlight"
  }
];

const FILMS = [
  ["sunil-vaishnavi-highlight", "Sunil & Vaishnavi", "Wedding Highlight", "Highlight Film", "6HfOz7tjMnU"],
  ["bhavin-karishma-highlight", "Bhavin & Karishma", "Wedding Highlight", "Highlight Film", "2OKaYoEg9jA"],
  ["jay-riya-highlight", "Jay & Riya", "Wedding Highlight", "Highlight Film", "m25GQqSyl78"],
  ["saurav-khushboo-highlight", "Saurav & Khushboo", "Highlight Film", "Highlight Film", "B8pKqzJ8fsA"],
  ["dhavani-gaurav-pre-wedding-teaser", "Dhwani & Gaurav", "Pre-Wedding Teaser", "Pre-Wedding Film", "WK_OniW7O8w"],
  ["dhavani-gaurav-pre-wedding-goa", "Dhwani & Gaurav", "Pre-Wedding Film", "Pre-Wedding Film", "2DmyleQGoaQ"],
  ["monika-aman-highlight", "Aman & Monika", "Wedding Highlight", "Highlight Film", "_6KSMXlq8-U"],
  ["monika-aman-teaser", "Aman & Monika", "Wedding Teaser", "Teaser", "3kGObclrM7o"],
  ["mayank-rajeshree-highlight", "Mayank & Rajeshree", "Wedding Highlight", "Highlight Film", "7KdSeO7AMvw"],
  ["amrith-chetali-highlight", "Amrith & Chetali", "Wedding Highlight", "Highlight Film", "h3_DWygXRCo"],
  ["aamir-binish-same-day-edit", "Aamir & Binish", "Same Day Edit", "Same-Day Edit", "l3xeMtNfu8o"]
];

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function titleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function ceremonyRank(name) {
  const normalized = name.toLowerCase();
  if (normalized.includes("pre")) return 10;
  if (normalized.includes("haldi")) return 20;
  if (normalized.includes("sangeet") || normalized.includes("snageet")) return 30;
  if (normalized.includes("mehendi") || normalized.includes("mehandi")) return 40;
  if (normalized.includes("engagement") || normalized.includes("ring")) return 50;
  if (normalized.includes("wedding") || normalized.includes("ceremony") || normalized.includes("phere")) return 90;
  if (normalized.includes("reception")) return 100;
  if (normalized.includes("instagram")) return 110;
  if (normalized.includes("edited") || normalized.includes("export")) return 120;
  return 80;
}

function ceremonyLabel(parts) {
  const meaningful = parts.filter((part) => {
    const value = part.toLowerCase();
    return !["edited", "untitled export", "01", "02", "white house"].includes(value);
  });
  const source = meaningful.at(-1) || parts.at(-1) || "Wedding";
  return titleCase(source.replace(/[]/g, ""));
}

function eventNameFromLabel(label) {
  const lower = label.toLowerCase();
  if (lower.includes("pre")) return "Pre-wedding";
  if (lower.includes("haldi")) return "Haldi";
  if (lower.includes("sangeet") || lower.includes("snageet")) return "Sangeet";
  if (lower.includes("mehendi") || lower.includes("mehandi")) return "Mehendi";
  if (lower.includes("reception")) return "Reception";
  if (lower.includes("instagram")) return "Selected portraits";
  return "Wedding";
}

function requestBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0 KTMediaMigration/1.0" } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        if (redirectCount > 10) reject(new Error(`Too many redirects for ${url}`));
        else resolve(requestBuffer(new URL(res.headers.location, url).toString(), redirectCount + 1));
        return;
      }

      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}: ${buffer.toString("utf8", 0, 160)}`));
          return;
        }
        resolve({ buffer, headers: res.headers, statusCode: res.statusCode });
      });
    });

    req.setTimeout(300000, () => {
      req.destroy(new Error(`Timeout for ${url}`));
    });
    req.on("error", reject);
  });
}

async function fetchText(url) {
  const { buffer } = await withRetries(url, () => requestBuffer(url));
  return buffer.toString("utf8");
}

function parseDriveItems(html, folderId) {
  const items = [];
  const seen = new Set();
  const re = /data-id="([A-Za-z0-9_-]{20,})"[^>]+data-tooltip="([^"]+)"/g;
  let match;
  while ((match = re.exec(html))) {
    const id = match[1];
    const tooltip = match[2].replace(/&amp;/g, "&");
    if (id === folderId || seen.has(id)) continue;
    seen.add(id);

    let type = "other";
    let name = tooltip;
    if (/Shared folder$/i.test(tooltip)) {
      type = "folder";
      name = tooltip.replace(/\s+Shared folder$/i, "");
    } else if (/Image$/i.test(tooltip)) {
      type = "image";
      name = tooltip.replace(/\s+Image$/i, "");
    } else if (/Video$/i.test(tooltip)) {
      type = "video";
      name = tooltip.replace(/\s+Video$/i, "");
    }

    items.push({ id, name, type });
  }

  const rowMatch = html.match(/aria-rowcount="(\d+)/);
  return { items, rowCount: rowMatch ? Number(rowMatch[1]) : null };
}

async function walkFolder(couple, folderId, folderParts = [], records = [], folders = []) {
  if (EXCLUDED_FOLDER_IDS.has(folderId)) return { records, folders };

  const html = await fetchText(`https://drive.google.com/drive/folders/${folderId}?usp=sharing`);
  const { items, rowCount } = parseDriveItems(html, folderId);
  folders.push({
    coupleSlug: couple.slug,
    folderId,
    folderPath: folderParts.join("/"),
    parsedChildren: items.length,
    reportedRowCount: rowCount
  });

  for (const item of items) {
    const lowerName = item.name.toLowerCase();
    if (item.type === "folder") {
      if (EXCLUDED_FOLDER_IDS.has(item.id) || lowerName.includes("don't use for gallery") || lowerName.includes("dont use for gallery")) {
        folders.push({
          coupleSlug: couple.slug,
          folderId: item.id,
          folderPath: [...folderParts, item.name].join("/"),
          parsedChildren: 0,
          reportedRowCount: 0,
          excluded: true
        });
        continue;
      }
      await walkFolder(couple, item.id, [...folderParts, item.name], records, folders);
      continue;
    }

    if (item.type === "image" && IMAGE_RE.test(item.name) && !item.name.startsWith("._")) {
      const label = ceremonyLabel(folderParts);
      records.push({
        id: item.id,
        fileName: item.name,
        coupleSlug: couple.slug,
        coupleName: couple.coupleName,
        category: couple.category,
        filmSlug: couple.filmSlug,
        folderPath: folderParts.join("/"),
        ceremonyLabel: label,
        eventName: eventNameFromLabel(label),
        ceremonyRank: ceremonyRank(label),
        sourceUrl: `https://drive.google.com/file/d/${item.id}/view`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${item.id}`
      });
    }
  }

  return { records, folders };
}

async function downloadDriveFile(id, destination) {
  const thumbUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w${DRIVE_THUMB_EDGE}`;
  try {
    const { buffer, headers } = await requestBuffer(thumbUrl);
    const contentType = String(headers["content-type"] || "");
    if (!/text\/html/i.test(contentType) && buffer.length > 1024) {
      await fs.writeFile(destination, buffer);
      return;
    }
  } catch (error) {
    console.warn(`Thumbnail source failed for ${id}; falling back to original download`);
  }

  const firstUrl = `https://drive.google.com/uc?export=download&id=${id}`;
  let { buffer, headers } = await requestBuffer(firstUrl);
  const contentType = String(headers["content-type"] || "");

  if (/text\/html/i.test(contentType)) {
    const html = buffer.toString("utf8");
    const confirmMatch = html.match(/href="(\/uc\?export=download&amp;confirm=[^"]+)"/);
    if (!confirmMatch) {
      throw new Error(`Drive returned HTML instead of media for ${id}`);
    }
    const confirmUrl = `https://drive.google.com${confirmMatch[1].replace(/&amp;/g, "&")}`;
    ({ buffer } = await requestBuffer(confirmUrl));
  }

  await fs.writeFile(destination, buffer);
}

async function withRetries(label, action, attempts = 5) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      const waitMs = 1200 * attempt * attempt;
      console.warn(`${label} failed on attempt ${attempt}/${attempts}; retrying in ${waitMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
  throw lastError;
}

async function processRecord(record, index, force) {
  const ceremonySlug = slugify(record.eventName || record.ceremonyLabel || "wedding");
  const outDir = path.join(OUTPUT_DIR, record.coupleSlug, ceremonySlug);
  const rawDir = path.join(TMP_DIR, record.coupleSlug, ceremonySlug);
  const base = `${record.coupleSlug}-${ceremonySlug}-${String(index + 1).padStart(3, "0")}`;
  const rawPath = path.join(rawDir, `${base}${path.extname(record.fileName).toLowerCase() || ".jpg"}`);
  const outPath = path.join(outDir, `${base}.webp`);
  const publicSrc = `/${path.relative(PUBLIC_DIR, outPath).replace(/\\/g, "/")}`;

  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(rawDir, { recursive: true });

  if (!force && fss.existsSync(outPath)) {
    const meta = await sharp(outPath).metadata();
    const stat = await fs.stat(outPath);
    return {
      ...record,
      src: publicSrc,
      width: meta.width,
      height: meta.height,
      orientation: meta.width && meta.height && meta.height > meta.width ? "portrait" : "landscape",
      optimizedBytes: stat.size,
      skippedExisting: true
    };
  }

  await withRetries(`${record.coupleName} ${record.fileName}`, () => downloadDriveFile(record.id, rawPath));
  const originalStat = await fs.stat(rawPath);
  const image = sharp(rawPath, { failOn: "none" }).rotate();
  const originalMeta = await image.metadata();
  await image
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  const outStat = await fs.stat(outPath);
  await fs.rm(rawPath, { force: true });

  return {
    ...record,
    src: publicSrc,
    width: outMeta.width,
    height: outMeta.height,
    orientation: outMeta.width && outMeta.height && outMeta.height > outMeta.width ? "portrait" : "landscape",
    originalWidth: originalMeta.width,
    originalHeight: originalMeta.height,
    originalBytes: originalStat.size,
    optimizedBytes: outStat.size
  };
}

function altText(record) {
  return `${record.coupleName} ${record.eventName.toLowerCase()} photograph by KT Photography`;
}

function imageLiteral(record, role = "standard") {
  const layoutRole = role === "feature" ? "feature" : record.orientation === "portrait" ? "portrait" : "landscape";
  return `{
    src: ${JSON.stringify(record.src)},
    alt: ${JSON.stringify(altText(record))},
    objectPosition: "50% 50%",
    orientation: ${JSON.stringify(record.orientation || "landscape")},
    width: ${record.width || 0},
    height: ${record.height || 0},
    event: ${JSON.stringify(record.eventName)},
    importance: ${JSON.stringify(role === "feature" ? "feature" : "standard")},
    layoutRole: ${JSON.stringify(layoutRole)}
  }`;
}

function pickEvery(records, limit) {
  if (records.length <= limit) return records;
  const result = [];
  const step = (records.length - 1) / (limit - 1);
  for (let i = 0; i < limit; i += 1) {
    result.push(records[Math.round(i * step)]);
  }
  return Array.from(new Map(result.map((record) => [record.src, record])).values());
}

function byCouple(records) {
  const map = new Map();
  for (const record of records) {
    if (!map.has(record.coupleSlug)) map.set(record.coupleSlug, []);
    map.get(record.coupleSlug).push(record);
  }
  return map;
}

function generateArchive(records) {
  const groups = byCouple(records);
  const stories = COUPLES.map((couple) => {
    const images = (groups.get(couple.slug) || []).sort((a, b) => a.ceremonyRank - b.ceremonyRank || a.fileName.localeCompare(b.fileName));
    const cover = images.find((image) => image.orientation === "portrait") || images[0];
    const hero = images.find((image) => image.orientation === "landscape") || cover;
    const events = Array.from(new Set(images.map((image) => image.eventName)));
    return { couple, images, cover, hero, events };
  }).filter((entry) => entry.images.length);

  const storyObjects = stories.map(({ couple, images, cover, hero, events }) => `{
    slug: ${JSON.stringify(couple.slug)},
    coupleName: ${JSON.stringify(couple.coupleName)},
    category: ${JSON.stringify(couple.category)},
    location: "India",
    intro: ${JSON.stringify(`${couple.coupleName} wedding story photographed by KT Photography.`)},
    note: "A local archive built from the approved Drive media migration.",
    mood: ${JSON.stringify(events.join(" / ") || "Wedding")},
    cover: ${imageLiteral(cover, "feature")},
    hero: ${imageLiteral(hero, "feature")},
    gallery: [
      ${pickEvery(images, 36).map((image) => imageLiteral(image)).join(",\n      ")}
    ],
    events: ${JSON.stringify(events)},
    ${couple.filmSlug ? `filmSlug: ${JSON.stringify(couple.filmSlug)}` : ""}
  }`);

  const manifests = stories.map(({ couple, images }) => {
    const functionGroups = new Map();
    for (const image of images) {
      if (!functionGroups.has(image.eventName)) functionGroups.set(image.eventName, []);
      functionGroups.get(image.eventName).push(image);
    }
    const functions = Array.from(functionGroups.entries())
      .sort((a, b) => ceremonyRank(a[0]) - ceremonyRank(b[0]))
      .map(([eventName, eventImages], index) => `{
        id: ${JSON.stringify(slugify(eventName))},
        label: ${JSON.stringify(eventName)},
        order: ${index + 1},
        layoutPattern: ${JSON.stringify(index % 3 === 0 ? "C" : index % 3 === 1 ? "F" : "E")},
        images: [
          ${eventImages.map((image, imageIndex) => imageLiteral(image, imageIndex === 0 ? "feature" : "standard")).join(",\n          ")}
        ]
      }`);
    const opening = pickEvery(images, 3);
    return `${JSON.stringify(couple.slug)}: {
      slug: ${JSON.stringify(couple.slug)},
      storyTier: "developed",
      quote: "A local archive from the approved Drive media migration.",
      openingTriptych: ${opening.length >= 3 ? `{
        module: "A",
        left: ${imageLiteral(opening[0], "feature")},
        center: ${imageLiteral(opening[1], "feature")},
        right: ${imageLiteral(opening[2], "feature")}
      }` : "undefined"},
      functions: [
        ${functions.join(",\n        ")}
      ]
    }`;
  });

  const heroSlides = stories.slice(0, 8).map(({ couple, hero }, index) => `{
    id: ${JSON.stringify(`${couple.slug}-${index + 1}`)},
    src: ${JSON.stringify(hero.src)},
    alt: ${JSON.stringify(altText(hero))},
    objectPosition: "50% 50%",
    orientation: ${JSON.stringify(hero.orientation || "landscape")},
    dominantTone: "#efe7dc"
  }`);

  const featured = stories.slice(0, 4).map(({ couple }) => couple.slug);
  const order = stories.map(({ couple }) => couple.slug);
  const first = stories[0];

  return `export type ImageAsset = {
  src: string;
  alt: string;
  objectPosition?: string;
  cropDesktop?: string;
  cropTablet?: string;
  cropMobile?: string;
  orientation?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
  focalPoint?: { x: number; y: number };
  event?: string;
  importance?: "supporting" | "standard" | "feature";
  layoutRole?: "portrait" | "landscape" | "wide" | "panoramic" | "detail" | "feature";
};

export type StoryImage = ImageAsset & {
  importance?: "supporting" | "standard" | "feature";
  layoutRole?: "portrait" | "landscape" | "wide" | "panoramic" | "detail" | "feature";
  event?: string;
  selectionReason?: string;
};

export type StoryModule = {
  id: string;
  module: "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";
  intent: string;
  images: StoryImage[];
};

export type OpeningTriptych = {
  module: "A";
  left: StoryImage & { selectionReason?: string };
  center: StoryImage & { selectionReason?: string };
  right: StoryImage & { selectionReason?: string };
};

export type StoryFunction = {
  id: string;
  label: string;
  order: number;
  layoutPattern?: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  images: StoryImage[];
  modules?: StoryModule[];
};

export type CoupleStoryManifest = {
  slug: string;
  storyTier?: "featured-complete" | "developed" | "limited-archive";
  quote: string;
  openingTriptych?: OpeningTriptych;
  soundtrack?: {
    title: string;
    artist?: string;
    localSrc?: string;
    expectedLocalSrc?: string;
    referenceUrl?: string;
    highlightStartSeconds: number;
    defaultVolume?: number;
    loopFromHighlight?: boolean;
  };
  film?: {
    poster?: ImageAsset;
    localVideoUrl?: string;
    sourceUrl?: string;
    title?: string;
  };
  functions: StoryFunction[];
  closingImage?: StoryImage;
};

export type MemorySlide = {
  id: string;
  dominantTone?: string;
} & ImageAsset;

export type Story = {
  slug: string;
  coupleName: string;
  category: "Wedding Story" | "Pre-Wedding" | "Photo + Film Story";
  location: string;
  intro: string;
  note: string;
  mood: string;
  cover: ImageAsset;
  hero: ImageAsset;
  gallery: ImageAsset[];
  events: string[];
  filmSlug?: string;
};

export type Film = {
  slug: string;
  coupleName: string;
  title: string;
  type: "Teaser" | "Highlight Film" | "Same-Day Edit" | "Pre-Wedding Film" | "Reel";
  description: string;
  poster: ImageAsset;
  youtubeUrl?: string;
  localVideoUrl?: string;
};

export type EventWork = {
  slug: string;
  label: string;
  title: string;
  coupleName: string;
  copy: string;
  image: ImageAsset;
};

export const heroStory = {
  coupleName: ${JSON.stringify(first?.couple.coupleName || "KT Photography")},
  image: ${first ? imageLiteral(first.hero, "feature") : "undefined"},
  href: "/stories"
};

export const storiesHeroSlides: MemorySlide[] = [
  ${heroSlides.join(",\n  ")}
];

export const stories: Story[] = [
  ${storyObjects.join(",\n  ")}
];

export const featuredStorySlugs = ${JSON.stringify(featured)};
export const storyDisplayOrder = ${JSON.stringify(order)};
export const storyTiers: Record<string, CoupleStoryManifest["storyTier"]> = Object.fromEntries(storyDisplayOrder.map((slug) => [slug, "developed"])) as Record<string, CoupleStoryManifest["storyTier"]>;

export const films: Film[] = [
  ${FILMS.map(([slug, coupleName, title, type, videoId]) => `{
    slug: ${JSON.stringify(slug)},
    coupleName: ${JSON.stringify(coupleName)},
    title: ${JSON.stringify(title)},
    type: ${JSON.stringify(type)},
    description: "A film from KT Photography's official YouTube channel.",
    poster: {
      src: ${JSON.stringify(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)},
      alt: ${JSON.stringify(`Poster for ${coupleName} ${title.toLowerCase()} by KT Photography`)},
      objectPosition: "50% 50%",
      orientation: "landscape"
    },
    youtubeUrl: ${JSON.stringify(`https://www.youtube.com/watch?v=${videoId}`)}
  }`).join(",\n  ")}
];

export const coupleStoryManifests: Record<string, CoupleStoryManifest> = {
  ${manifests.join(",\n  ")}
};

export const eventWorks: EventWork[] = stories.slice(0, 4).map((story) => ({
  slug: story.slug,
  label: story.events[0] ?? "Wedding",
  title: story.mood,
  coupleName: story.coupleName,
  copy: "Selected coverage from the approved local Drive archive.",
  image: story.hero
}));

export const testimonials: { couple: string; quote: string; image: ImageAsset }[] = [];

export const faqs = [
  {
    question: "Do you photograph outside Daman?",
    answer: "Yes. KT is based in Daman and works across India for weddings, pre-weddings and family events."
  },
  {
    question: "Can photo and film be booked together?",
    answer: "Yes. Most wedding stories are planned with photo and film moving together so the team can stay calm and coordinated."
  },
  {
    question: "How should we enquire?",
    answer: "Share your dates, cities, venues, event count and whether you need photography, films or both."
  }
];

export const contact = {
  phoneDisplay: "+91 99742 66577",
  phoneHref: "tel:+919974266577",
  whatsappHref: "https://wa.me/919974266577",
  email: "",
  emailHref: "",
  instagramHref: "https://www.instagram.com/kt_photography_daman/",
  youtubeHref: "https://www.youtube.com/@ktweddingphotography",
  location: "Daman / Across India",
  mapHref: "https://maps.app.goo.gl/difwTWjwGW8bZp9G8"
};

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getFilm(slug: string) {
  return films.find((film) => film.slug === slug);
}

export const featuredStories = stories.filter((story) => featuredStorySlugs.includes(story.slug));
`;
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function writeReports(records, folders) {
  await fs.mkdir(GENERATED_DIR, { recursive: true });
  await fs.mkdir(REPORTS_DIR, { recursive: true });

  const sourceManifest = {
    generatedAt: new Date().toISOString(),
    maxEdge: MAX_EDGE,
    driveThumbEdge: DRIVE_THUMB_EDGE,
    webpQuality: WEBP_QUALITY,
    excludedFolderIds: Array.from(EXCLUDED_FOLDER_IDS),
    couples: COUPLES,
    folders,
    images: records
  };
  await fs.writeFile(path.join(GENERATED_DIR, "drive-media-source-manifest.json"), `${JSON.stringify(sourceManifest, null, 2)}\n`);

  const csvHeader = [
    "coupleSlug",
    "coupleName",
    "eventName",
    "folderPath",
    "fileName",
    "driveFileId",
    "src",
    "width",
    "height",
    "originalBytes",
    "optimizedBytes"
  ];
  const csvRows = records.map((record) => [
    record.coupleSlug,
    record.coupleName,
    record.eventName,
    record.folderPath,
    record.fileName,
    record.id,
    record.src,
    record.width,
    record.height,
    record.originalBytes,
    record.optimizedBytes
  ]);
  await fs.writeFile(
    path.join(REPORTS_DIR, "drive-media-inventory.csv"),
    [csvHeader, ...csvRows].map((row) => row.map(csvEscape).join(",")).join("\n") + "\n"
  );

  const totalOptimized = records.reduce((sum, record) => sum + Number(record.optimizedBytes || 0), 0);
  const totalOriginal = records.reduce((sum, record) => sum + Number(record.originalBytes || 0), 0);
  const summary = [
    "# Drive Media Local Migration",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Allowed image records: ${records.length}`,
    `Optimized output: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`,
    `Downloaded source bytes during processing: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`,
    `Output directory: public/drive-media`,
    "",
    "Excluded folders:",
    "- 1Cz0vEBqv2nywVaeiWxpQOPBcMmdPGTFV / Don't use for gallery",
    "",
    "Per-couple counts:",
    ...COUPLES.map((couple) => {
      const count = records.filter((record) => record.coupleSlug === couple.slug).length;
      return `- ${couple.coupleName}: ${count}`;
    }),
    "",
    "Folder parse notes:",
    ...folders.map((folder) => `- ${folder.coupleSlug} / ${folder.folderPath || "(root)"}: parsed ${folder.parsedChildren}, reported ${folder.reportedRowCount ?? "unknown"}${folder.excluded ? " (excluded)" : ""}`)
  ];
  await fs.writeFile(path.join(REPORTS_DIR, "drive-media-local-migration.md"), `${summary.join("\n")}\n`);
}

async function main() {
  const force = process.argv.includes("--force");
  const inventoryOnly = process.argv.includes("--inventory-only");

  await fs.mkdir(TMP_DIR, { recursive: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const allRecords = [];
  const allFolders = [];
  for (const couple of COUPLES) {
    console.log(`Inventory ${couple.coupleName}`);
    await walkFolder(couple, couple.rootId, [], allRecords, allFolders);
  }

  allRecords.sort((a, b) =>
    a.coupleSlug.localeCompare(b.coupleSlug) ||
    a.ceremonyRank - b.ceremonyRank ||
    a.folderPath.localeCompare(b.folderPath) ||
    a.fileName.localeCompare(b.fileName)
  );

  let processed = allRecords;
  if (!inventoryOnly) {
    processed = new Array(allRecords.length);
    let nextIndex = 0;
    async function worker() {
      while (nextIndex < allRecords.length) {
        const i = nextIndex;
        nextIndex += 1;
        const record = allRecords[i];
        console.log(`[${i + 1}/${allRecords.length}] ${record.coupleName} / ${record.eventName} / ${record.fileName}`);
        try {
          processed[i] = await processRecord(record, i, force);
        } catch (error) {
          console.warn(`Skipping ${record.coupleName} / ${record.fileName}: ${error.message}`);
          processed[i] = { ...record, failed: error.message };
        }
      }
    }
    await Promise.all(Array.from({ length: Math.max(1, PROCESS_CONCURRENCY) }, () => worker()));
    processed = processed.filter((record) => record && record.src);
    await fs.rm(TMP_DIR, { recursive: true, force: true });
    await fs.writeFile(path.join(ROOT, "data", "archive.ts"), generateArchive(processed));
  }

  await writeReports(processed, allFolders);
  console.log(`Done. Images: ${processed.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
