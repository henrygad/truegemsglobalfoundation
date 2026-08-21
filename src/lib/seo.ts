import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Per-route metadata, built from siteConfig so nothing describing the
 * organisation is ever typed a second time in a page file.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  /** Transactional/auth pages (donation receipts, /login) — no value to a searcher, shouldn't be indexed. */
  noindex?: boolean;
}): Metadata {
  const url = new URL(path, siteConfig.baseUrl).toString();
  const ogImage = image ?? "/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * NonProfit + Organization JSON-LD with a properly structured PostalAddress —
 * the legacy repo stuffed the whole street address into addressLocality
 * (BRAND_EXTRACT.md §3); this keeps each field where schema.org expects it.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.baseUrl,
    logo: new URL("/logo.png", siteConfig.baseUrl).toString(),
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    areaServed: siteConfig.operatingRegions.map((r) => r.name),
    ...(siteConfig.ein.status === "ready" ? { taxID: siteConfig.ein.value } : {}),
  } as const;
}
