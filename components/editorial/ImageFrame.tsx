import Image from "next/image";
import type { ImageAsset } from "@/data/archive";

export function ImageFrame({
  image,
  sizes,
  priority = false,
  className = "",
  padded = false
}: {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
  padded?: boolean;
}) {
  const frame = (
    <div className={`image-frame ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
      />
    </div>
  );

  return padded ? <div className="frame-pad">{frame}</div> : frame;
}
