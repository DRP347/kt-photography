import { ResilientImage as Image } from "@/components/media/ResilientImage";
import type { ImageAsset } from "@/data/archive";

/** Reserve the source ratio before loading so albums never collapse or jump. */
export function ArchivePhoto({ image, priority = false, sizes = "(max-width: 700px) 96vw, 75vw" }: { image: ImageAsset; priority?: boolean; sizes?: string }) {
  const width = image.width ?? (image.orientation === "portrait" ? 1200 : 1800);
  const height = image.height ?? (image.orientation === "portrait" ? 1800 : 1200);
  return <Image src={image.src} alt={image.alt} width={width} height={height} sizes={sizes} priority={priority} className="archive-photo" style={{ aspectRatio: `${width} / ${height}` }} />;
}
