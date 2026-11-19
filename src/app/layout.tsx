import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// Self-hosted variable fonts (SIL OFL, see src/fonts): no third-party request, and
// next/font adds size-adjusted fallbacks so text doesn't shift when they load.
const display = localFont({
  src: "../fonts/unbounded-latin-variable.woff2",
  weight: "200 900",
  variable: "--font-unbounded",
  display: "swap",
  fallback: ["Arial Black", "sans-serif"],
});
const sans = localFont({
  src: "../fonts/dm-sans-latin-variable.woff2",
  weight: "100 1000",
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["Senior frontend engineer", "Frontend engineer", "React", "Next.js", "TypeScript", "Web performance", "Developer tools", "Turin", "Arduino"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.headline.join(" ")}` }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffe14d",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sun"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
