import type { Metadata } from "next";
import { FooterArchive } from "@/components/layout/FooterArchive";
import { BookingRoom } from "@/components/editorial/BookingRoom";
import { AboutChapters } from "@/components/editorial/AboutChapters";
import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Kailash Taili and KT Photography, from Rajasthan to Daman, and a journey of photographing life's special moments.",
  alternates: { canonical: absoluteUrl("/about") }
};

export default function AboutPage() {
  return <><EditorialPageFrame enquiry={<BookingRoom />}><AboutChapters /></EditorialPageFrame><FooterArchive /></>;
}
