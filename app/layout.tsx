import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.meta.url),
  title: {
    default: SITE_CONFIG.meta.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.meta.description,
  keywords: [
    "tax resolution",
    "IRS notice review",
    "unfiled tax returns",
    "tax debt relief",
    "audit representation",
    "tax preparation",
    "proactive tax planning",
    "Bergeron Tax Services",
  ],
  authors: [{ name: SITE_CONFIG.owner }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.meta.url,
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/hero-consultation.jpg",
        width: 1200,
        height: 630,
        alt: "Bergeron Tax Services - Tax Resolution Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
    images: ["/images/hero-consultation.jpg"],
  },
  icons: {
    icon: "/logo/bts-logo.png",
    shortcut: "/logo/bts-logo.png",
    apple: "/logo/bts-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#071D49",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="min-h-screen bg-white text-darkSlate font-sans antialiased selection:bg-gold/30 selection:text-navy">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
