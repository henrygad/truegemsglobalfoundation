import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { placeholderImages } from "@/content/placeholder-images";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { ScrollScaleImage } from "@/components/scroll-scale-image";
import { ChapterReveal, ChapterRevealItem } from "@/components/home/chapter-reveal";

export const metadata: Metadata = buildMetadata({
  title: "Where We Work",
  description: "TrueGems Global Helping Hands Foundation works in Maryland, Nigeria, and with partner organisations across Africa.",
  path: "/where-we-work",
});

const regionDetails = [
  {
    image: placeholderImages.whereWeWorkMaryland,
    detail:
      "Home base. Inner-city children's support and food relief, coordinated directly with families and community contacts in Maryland.",
  },
  {
    image: placeholderImages.whereWeWorkNigeria,
    detail:
      "Where the founder's own hands-on work began — food distributions, maternity hospital support, and school-fee assistance, over a decade before TrueGems was formally incorporated.",
  },
  {
    image: placeholderImages.whereWeWorkPartnersAfrica,
    detail:
      "Work carried out alongside partner organisations already active in their own communities, rather than TrueGems operating alone at a distance.",
  },
];

export default function WhereWeWorkPage() {
  return (
    <Section>
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Where we work</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-16">
        Three real places, not a world map
      </h1>

      <ChapterReveal className="space-y-16" stagger={false}>
        {siteConfig.operatingRegions.map((region, i) => (
          <ChapterRevealItem key={region.name}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ScrollScaleImage
                src={regionDetails[i].image.src}
                alt={regionDetails[i].image.alt}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-4/5 rounded-md"
              />
              <div>
                <p className="text-sm font-medium text-accent-dark mb-1">{region.role}</p>
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-4">{region.name}</h2>
                <p className="text-muted-foreground leading-relaxed">{regionDetails[i].detail}</p>
              </div>
            </div>
          </ChapterRevealItem>
        ))}
      </ChapterReveal>
    </Section>
  );
}
