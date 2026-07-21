import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";

export const saonara = localFont({
  src: "../Saonara/MADE SAONARA PERSONAL USE.otf",
  variable: "--font-saonara",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true
});

export const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});
