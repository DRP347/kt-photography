import type { Metadata } from "next";
import { body, saonara } from "@/app/fonts";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "@/styles/globals.css";
import "@/styles/homepage.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | KT Photography"
  },
  description: siteConfig.defaultDescription,
  verification: {
    google: siteConfig.googleVerification || undefined,
    other: siteConfig.bingVerification ? { "msvalidate.01": siteConfig.bingVerification } : undefined
  },
  icons: {
    icon: "/kt-logo-transparent.png",
    apple: "/kt-logo-transparent.png"
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1600,
        height: 1067,
        alt: "Amrith and Chetali sitting together by the coast in wedding attire"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
    images: [siteConfig.defaultOgImage]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language} className={`${saonara.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteFrame />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
