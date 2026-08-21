import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import StructuredData from "@/components/structured-data";
import GalleryProvider from "@/context/gallery-context";
import TestimonialProvider from "@/context/testimonial-context";
import AuthProvider from "@/context/auth-context";
import Provider from "./provider";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  // Newsreader ships matched display/text optical cuts on one variable font —
  // display for headlines, text for the <Story> long-form prose measure.
  axes: ["opsz"],
});

const rootPageMetadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export const metadata: Metadata = {
  ...rootPageMetadata,
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  metadataBase: new URL(siteConfig.baseUrl),
  authors: [
    { name: "Gift Ulimma Ohaeri Nwosu" },
    { name: "Henry Emeka Loveday Orji" },
  ],
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("min-h-full", "antialiased", geistSans.variable, geistMono.variable, newsreader.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Origins every page pays a connection cost to: Firestore reads, Firebase Auth, the Turnstile widget, and its gapi iframe. */}
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN && (
          <link rel="preconnect" href={`https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`} />
        )}
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="preconnect" href="https://apis.google.com" />

        <StructuredData />

        <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
          <MotionProvider>
            <TooltipProvider>
              <GalleryProvider>
                <TestimonialProvider>
                  <AuthProvider>
                    <Provider>{children}</Provider>
                  </AuthProvider>
                </TestimonialProvider>
              </GalleryProvider>
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
