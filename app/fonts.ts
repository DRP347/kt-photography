import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

export const saonara = localFont({
  src: "../Saonara/MADE SAONARA 2 PERSONAL USE.otf",
  variable: "--font-saonara",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true
});

export const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});
