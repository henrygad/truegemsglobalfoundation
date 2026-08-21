/**
 * Every placeholder photograph used on the site, centralized.
 *
 * Rules (AGENTS brief, §8):
 * - Free, properly licensed sources only (Unsplash License / Pexels License). Never paid or unlicensed.
 * - Each entry carries its source URL, photographer credit, and license so attribution is never lost.
 * - Each entry names the real photograph that should replace it — see IMAGE_REPLACEMENT.md.
 *
 * Verified by hand against the live Unsplash listing (photographer, license, and location
 * confirmed) rather than assumed — do not add an entry here without doing the same.
 *
 * Downloaded to public/placeholders/ and served locally rather than hot-linked
 * from images.unsplash.com — Next's image optimizer fetches remote sources at
 * request time, and that live fetch proved unreliable enough (intermittent
 * multi-second stalls, occasional timeouts) to cause the hero image — the
 * page's LCP element — to fail to render. A placeholder shouldn't be flakier
 * than the real photo that eventually replaces it.
 */

export type PlaceholderImage = {
  id: string;
  src: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  source: "unsplash";
  sourceUrl: string;
  license: "Unsplash License";
  /** What this stands in for, and what real photo should replace it. */
  replacementNote: string;
};

export const placeholderImages = {
  hero: {
    id: "hero",
    src: "/placeholders/hero.jpg",
    alt: "A woman dances among community members during a daytime gathering in Kargi, Kenya.",
    photographer: "Ian Macharia",
    photographerUrl: "https://unsplash.com/@ianmacharia",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/gogGhbvHrYw",
    license: "Unsplash License",
    replacementNote:
      "Replace with a real photograph from a TrueGems program visit — ideally the same household or moment referenced in the homepage story chapter, with the family's consent on file.",
  },

  foodReliefCommunity: {
    id: "food-relief-community",
    src: "/placeholders/food-relief-community.jpg",
    alt: "A group of people walk along a road carrying water containers in an African community.",
    photographer: "Jeff Ackley",
    photographerUrl: "https://unsplash.com/@jeffackley",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/YwDo_HwORXs",
    license: "Unsplash License",
    replacementNote:
      "Replace with a real photo from a TrueGems food distribution — Maryland or Nigeria.",
  },

  healthMedicalOutreach: {
    id: "health-medical-outreach",
    src: "/placeholders/health-medical-outreach.jpg",
    alt: "A doctor sits at a table for a consultation with a young patient, Angola.",
    photographer: "Francisco Venâncio",
    photographerUrl: "https://unsplash.com/@franciscovenancio",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/M4Xloxsg0Gw",
    license: "Unsplash License",
    replacementNote:
      "Replace with a real photo from a TrueGems health outreach event, once one has been documented with consent.",
  },

  childWelfareEducation: {
    id: "child-welfare-education",
    src: "/placeholders/child-welfare-education.jpg",
    alt: "A group of young boys stand together at a school in Nakaseke, Uganda.",
    photographer: "bill wegener",
    photographerUrl: "https://unsplash.com/@wegenerb",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/7MD4DR9jbP0",
    license: "Unsplash License",
    replacementNote:
      "Replace with a real photo from TrueGems' child welfare / orphanage support work, with guardian consent on file — never an identifiable child without documented consent.",
  },

  womenGirlChildEmpowerment: {
    id: "women-girl-child-empowerment",
    src: "/placeholders/women-girl-child-empowerment.jpg",
    alt: "A businesswoman stands in front of her shop holding a phone, Dar es Salaam, Tanzania.",
    photographer: "Ali Mkumbwa",
    photographerUrl: "https://unsplash.com/@mkumbwajr",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/H1KbBGUs4bM",
    license: "Unsplash License",
    replacementNote:
      "Replace with a real photo from a TrueGems women's empowerment program once one has run.",
  },

  economicEmpowerment: {
    id: "economic-empowerment",
    src: "/placeholders/economic-empowerment.jpg",
    alt: "A vendor arranges tomatoes and peppers at her market stall, Bodija Market, Ibadan, Nigeria.",
    photographer: "Tunde Buremo",
    photographerUrl: "https://unsplash.com/@tundeburemo",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/cnVn4Gg4b00",
    license: "Unsplash License",
    replacementNote: "Replace with a real photo from TrueGems' economic empowerment program.",
  },

  whereWeWorkMaryland: {
    id: "where-we-work-maryland",
    src: "/placeholders/where-we-work-maryland.jpg",
    alt: "The waterfront skyline of Baltimore's Inner Harbor at dusk.",
    photographer: "ActionVance",
    photographerUrl: "https://unsplash.com/@actionvance",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/5CMZB04Ys8w",
    license: "Unsplash License",
    replacementNote:
      "Replace with a real photo of TrueGems' actual Maryland base of operations or a local program moment.",
  },

  whereWeWorkNigeria: {
    id: "where-we-work-nigeria",
    src: "/placeholders/economic-empowerment.jpg",
    alt: "A vendor arranges tomatoes and peppers at her market stall, Bodija Market, Ibadan, Nigeria.",
    photographer: "Tunde Buremo",
    photographerUrl: "https://unsplash.com/@tundeburemo",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/cnVn4Gg4b00",
    license: "Unsplash License",
    replacementNote: "Replace with a real photo from TrueGems' Nigeria program work.",
  },

  whereWeWorkPartnersAfrica: {
    id: "where-we-work-partners-africa",
    src: "/placeholders/child-welfare-education.jpg",
    alt: "A group of young boys stand together at a school in Nakaseke, Uganda.",
    photographer: "bill wegener",
    photographerUrl: "https://unsplash.com/@wegenerb",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/7MD4DR9jbP0",
    license: "Unsplash License",
    replacementNote:
      "Replace with a real photo from wherever TrueGems' partner organisations across Africa actually operate.",
  },

  // Reuses the hero photo — see BRAND_EXTRACT.md; this entry previously
  // pointed at an unverified photo ID that was never actually checked
  // against the live Unsplash listing (an old copy/paste before every other
  // entry here got individually verified). Fixed to the same real, verified
  // photo as `hero` rather than left wrong.
  communityDevelopment: {
    id: "community-development",
    src: "/placeholders/hero.jpg",
    alt: "A woman dances among community members during a daytime gathering in Kargi, Kenya.",
    photographer: "Ian Macharia",
    photographerUrl: "https://unsplash.com/@ianmacharia",
    source: "unsplash",
    sourceUrl: "https://unsplash.com/photos/gogGhbvHrYw",
    license: "Unsplash License",
    replacementNote: "Replace with a real photo from a TrueGems community development project.",
  },
} as const satisfies Record<string, PlaceholderImage>;

/**
 * Not yet sourced — using an out-of-context photo here would misrepresent where the
 * work happens, which the honesty rules treat as seriously as an invented statistic.
 * Inner-city children's support is Maryland-specific; none of the sourced images above
 * are US inner-city context, so this program ships without a photo until a real one
 * exists, or a correctly-matched placeholder is sourced.
 */
export const pendingPlaceholderImages = ["innerCityChildrensSupport"] as const;
