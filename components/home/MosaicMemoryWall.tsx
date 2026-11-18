import Image from "next/image";
import { ResilientImage } from "@/components/media/ResilientImage";

// Existing placements are preserved; additional local photographs fill desktop-only empty cells.
const tiles = [
  ["fill-one", "/Ceremonies/hero-mosaic/monika-aman-haldi-laughter-1.jpg", "Aman and Monika laughing during haldi"],
  ["fill-two", "/Ceremonies/hero-mosaic/gaurav-dhwani-boat-00767.jpg", "Gaurav and Dhwani together on a boat"],
  ["fill-three", "/Ceremonies/hero-mosaic/khushali-akshay-bw-close-4843.jpg", "Khushali and Akshay in a close wedding portrait"],
  ["fill-four", "/Ceremonies/hero-mosaic/monika-aman-red-detail-1296.jpg", "Red wedding attire and embroidered details"],
  ["fill-five", "/Ceremonies/hero-mosaic/amrith-chetali-sangeet-01.jpg", "Amrith and Chetali together on the stairs"],
  ["fill-six", "/Ceremonies/hero-mosaic/khushali-akshay-haldi-embrace-18.jpg", "A joyful embrace during haldi"],
  ["red", "/drive-media/aamir-binish/wedding/aamir-binish-wedding-103.webp", "Aamir and Binish together in wedding attire"],
  ["ceremony", "/drive-media/monika-aman/wedding/monika-aman-wedding-915.webp", "Aman and Monika beneath their wedding canopy"],
  ["celebration", "/drive-media/dhavani-gaurav/wedding/dhavani-gaurav-wedding-500.webp", "Dhwani and Gaurav during their wedding ceremony"],
  ["ritual", "/drive-media/saurav-khushboo/wedding/saurav-khushboo-wedding-981.webp", "Saurav and Khushboo during their wedding"],
  ["left", "/drive-media/aamir-binish/wedding/aamir-binish-wedding-137.webp", "Aamir and Binish in a wedding portrait"],
  ["right", "/drive-media/monika-aman/wedding/monika-aman-wedding-916.webp", "Aman and Monika beneath the floral canopy"],
  ["coast", "/Ceremonies/hero-mosaic/amrith-chetali-coastal-5595.jpg", "Amrith and Chetali together by the coast"],
  ["smile", "/Ceremonies/hero-mosaic/khushali-akshay-bw-smile-4566.jpg", "A couple smiling together during their wedding ceremony"]
] as const;

export function MosaicMemoryWall() {
  return <section className="memory-wall site-rail" aria-label="KT Photography memory wall">
    {tiles.map(([slot, src, alt]) => <figure className={`memory-wall__tile memory-wall__tile--${slot}`} key={src}>
      <ResilientImage src={src} alt={alt} fill sizes="(max-width: 700px) 33vw, 20vw" />
    </figure>)}
    <div className="memory-wall__mark"><Image src="/kt-logo-transparent.png" alt="KT Photography" width={220} height={120} sizes="(max-width:700px) 20vw, 12vw" /></div>
  </section>;
}
