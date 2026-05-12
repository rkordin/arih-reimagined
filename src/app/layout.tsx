import type { Metadata } from "next";
import "./globals.css";
import { LenisScroll } from "@/components/LenisScroll";

export const metadata: Metadata = {
  title: "Agencija Arih — Branding & design studio, Ljubljana since 1996",
  description:
    "Arih is a small Ljubljana studio building enduring identity systems, packaging and campaigns for Slovenia and beyond. Think big. Stay small.",
  icons: {
    icon: [
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Agencija Arih",
    description: "Think big. Stay small. — Studio Arih, Ljubljana, since 1996.",
    type: "website",
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
