import type { Metadata } from "next";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import { EditorialHero } from "@/components/home/EditorialHero";
import { HomeShowcaseSections } from "@/components/home/HomeShowcaseSections";
import { MosaicMemoryWall } from "@/components/home/MosaicMemoryWall";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  alternates: {
    canonical: absoluteUrl("/")
  }
};

export default function Home() {
  return (
    <>
      <main id="main" className="home-page-flow">
        <EditorialHero />
        <MosaicMemoryWall />
        <HomeShowcaseSections />
        <BookingRoom />
      </main>
      <FooterArchive />
    </>
  );
}
