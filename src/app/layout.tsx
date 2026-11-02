import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Footer } from "@/components/footer";
import { SiteChrome } from "@/components/site-chrome";
import { SiteProvider } from "@/components/site-state";
import { site } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Grace Karen Homes",
    template: "%s · Grace Karen Homes",
  },
  description:
    "Private brokerage for houses and apartments across Ghana. East Legon, Cantonments, Kumasi, the coast, and the regions.",
  openGraph: {
    title: "Grace Karen Homes",
    description: "Private brokerage for houses and apartments across Ghana.",
    images: ["/images/hero.jpg"],
    locale: "en_GH",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ivory font-sans text-ink">
        <SiteProvider>
          <Suspense fallback={<div className="h-[76px] bg-forest" />}>
            <SiteChrome />
          </Suspense>
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
