import { siteConfig } from "@/config/site";
import { placeholderImages } from "@/content/placeholder-images";
import { ScrollScaleImage } from "@/components/scroll-scale-image";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

const regionImages = [
  placeholderImages.whereWeWorkMaryland,
  placeholderImages.whereWeWorkNigeria,
  placeholderImages.whereWeWorkPartnersAfrica,
];

/** Three named places, not a world map (AGENTS brief §5.5). */
export function WhereWeWorkChapter() {
  return (
    <section id="where-we-work" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12 max-w-2xl">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Where we work</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">Real places, not pins on a map</h2>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.operatingRegions.map((region, i) => (
            <ChapterRevealItem key={region.name}>
              <ScrollScaleImage
                src={regionImages[i].src}
                alt={regionImages[i].alt}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-4/5 rounded-md mb-4"
              />
              <h3 className="font-heading text-xl text-foreground">{region.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{region.role}</p>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>
      </div>
    </section>
  );
}
