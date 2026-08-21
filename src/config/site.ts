import { z } from "zod";
import { tbd } from "@/content/tbd";

/**
 * Everything describing the organisation, in one place. Nothing here may be
 * re-typed in a component — import from here instead.
 *
 * Facts below are sourced from the legacy repo (see BRAND_EXTRACT.md, §5 "Real
 * facts") — phone, address, and legal status are verified from
 * `app/contact/page.tsx` and `data/members.ts`. The EIN is not present anywhere
 * in the legacy codebase, so it's a typed TBD rather than a guess.
 */

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("https://") || url.startsWith("http://localhost"),
      "NEXT_PUBLIC_BASE_URL must use the https:// scheme in every environment except localhost — a bare domain silently breaks Stripe's success_url/cancel_url."
    ),
});

const env = envSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};

export type OfficeHours = {
  days: string;
  hours: string;
}[];

export type SocialLink = {
  platform: "facebook" | "twitter" | "linkedin" | "instagram";
  url: string;
};

export const siteConfig = {
  name: "TrueGems Global Helping Hands Foundation Inc.",
  shortName: "TrueGems",
  /** The wordmark used in the navbar/footer lockup — "TrueGems Global Foundation" ran too long, so just "Truegems" for now. */
  wordmark: "Truegems",
  // Verbatim from the legacy repo's HeroSection.tsx / footer.tsx.
  tagline: "Lifting Lives. Strengthening Communities. Changing Futures.",
  // Adapted from the legacy repo's AboutSection.tsx — kept the real, verifiable
  // description, dropped the "8+ Years of Changing Lives" stat that sat next to
  // it (fabricated — TrueGems incorporated in 2025, see BRAND_EXTRACT.md §5).
  description:
    "TrueGems Global Helping Hands Foundation Inc. is a registered 501(c)(3) nonprofit organization committed to uplifting children, women, families, and underserved communities with practical care and long-term support — providing aid and opportunity across the USA, Nigeria, and wider Africa to help people build stronger futures.",

  baseUrl: env.NEXT_PUBLIC_BASE_URL,

  foundingYear: 2025,
  incorporationState: "Maryland",
  legalStatus: "501(c)(3) nonprofit" as const,

  /** Not present anywhere in the legacy codebase — see CONTENT_TODO.md. */
  ein: tbd<string>("EIN not on file anywhere in the legacy repo or provided by the client."),

  contact: {
    email: "info@truegemsglobalfoundation.org",
    phone: "+1 (202) 406-0331",
    address: {
      streetAddress: "805 Narrowleaf Dr",
      addressLocality: "Upper Marlboro",
      addressRegion: "MD",
      postalCode: "20774",
      addressCountry: "US",
    } satisfies PostalAddress,
    officeHours: [
      { days: "Monday – Friday", hours: "9:00 AM – 5:00 PM EST" },
      { days: "Saturday", hours: "10:00 AM – 2:00 PM EST" },
      { days: "Sunday", hours: "Closed" },
    ] satisfies OfficeHours,
  },

  operatingRegions: [
    { name: "Maryland", country: "United States", role: "Home base" as const },
    { name: "Nigeria", country: "Nigeria", role: "Program country" as const },
    {
      name: "Partner organisations across Africa",
      country: "Multiple",
      role: "Partner network" as const,
    },
  ],

  /**
   * Every legacy social link pointed at "#" — no real profile exists to carry
   * over. Empty on purpose: absence over a fake link, per AGENTS brief §7.
   */
  socials: [] as SocialLink[],

  legal: {
    entityName: "TrueGems Global Helping Hands Foundation Inc.",
    copyrightHolder: "TrueGems Global Helping Hands Foundation Inc.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
