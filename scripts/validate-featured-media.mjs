import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const productionFiles = [
  "app",
  "components",
  "data/archive.ts",
  "data/storyCuration.ts",
  "lib",
  "middleware.ts"
];

const checkedFiles = [
  "components/home/MosaicMemoryWall.tsx",
  "data/archive.ts",
  "data/storyCuration.ts",
  "data/homeLanding.ts",
  "data/weddingRooms.ts"
];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function productionSourceFiles(path) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return [];
  const stat = statSync(absolute);
  if (stat.isFile()) return [path];
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = `${path}/${entry.name}`;
    if (entry.isDirectory()) return productionSourceFiles(child);
    if (/\.(?:ts|tsx|json|md)$/.test(entry.name)) return [child];
    return [];
  });
}

function localImageSources(content) {
  const matches = content.matchAll(/["'](\/(?:drive-media|optimized|curated|Ceremonies|decor|kt-logo-transparent)[^"']+\.(?:webp|jpg|jpeg|png))["']/g);
  return [...matches].map((match) => match[1]);
}

function fileExists(src) {
  return existsSync(join(root, "public", src));
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const sourceEntries = checkedFiles.flatMap((file) =>
  localImageSources(read(file)).map((src) => ({ file, src }))
);

for (const { file, src } of sourceEntries) {
  if (!src || !fileExists(src)) {
    fail(`Missing featured media source in ${file}: ${src || "<empty>"}`);
  }
}

const wallSourceMatches = [...read("components/home/MosaicMemoryWall.tsx").matchAll(/src:\s*"([^"]+)"/g)]
  .map((match) => match[1])
  .filter((src) => src.startsWith("/"));
const wallDuplicates = wallSourceMatches.filter((src, index) => wallSourceMatches.indexOf(src) !== index);

if (wallDuplicates.length) {
  fail(`Duplicate memory-wall sources: ${[...new Set(wallDuplicates)].join(", ")}`);
}

const archiveText = read("data/archive.ts");
const slideBlocks = [...archiveText.matchAll(/namedCoupleConfirmed:\s*true/g)];
if (slideBlocks.length < 8) {
  fail("Every Stories slideshow slide must explicitly set namedCoupleConfirmed: true.");
}

for (const path of productionFiles.flatMap(productionSourceFiles)) {
  const text = read(path);
  if (/\bDhavani\b/.test(text)) {
    fail(`Public-facing misspelling remains in ${path}`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`Validated ${sourceEntries.length} featured local media references.`);
