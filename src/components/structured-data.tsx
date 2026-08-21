import { organizationJsonLd } from "@/lib/seo";

/**
 * Plain <script>, not next/script — next/script's default strategy
 * (afterInteractive) defers injection until after hydration, so this
 * wouldn't be present in the initial server-rendered HTML at all. JSON-LD
 * needs to be there from the first response, not added by client JS.
 */
export default function StructuredData() {
  return (
    <script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationJsonLd()),
      }}
    />
  );
}
