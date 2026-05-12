import type { Metadata } from "next";
import "./globals.css";
import { LenisScroll } from "@/components/LenisScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://arih-reimagined.vercel.app"),
  title: "Agencija Arih — Branding & design studio, Ljubljana since 1996",
  description:
    "Arih is a small Ljubljana studio building enduring identity systems, packaging and campaigns for Slovenia and beyond. Think big. Stay small.",
  openGraph: {
    title: "ARIH® — Think big. Stay small.",
    description:
      "Branding & design studio, Ljubljana, since 1996. Identity systems, packaging and campaigns for clients who plan to be here a long time.",
    type: "website",
    locale: "sl_SI",
    siteName: "ARIH",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARIH® — Think big. Stay small.",
    description:
      "Branding & design studio, Ljubljana, since 1996.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-template="home"
      data-theme="arih"
      data-scroll-orientation="vertical"
      className="lenis is-top is-over-home-hero is-loaded is-ready"
    >
      <body>
        <LenisScroll />
        {children}
      </body>
    </html>
  );
}
