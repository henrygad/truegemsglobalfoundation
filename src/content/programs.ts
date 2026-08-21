import { placeholderImages, type PlaceholderImage } from "./placeholder-images";

/**
 * The eight programs. Grounded in the activities the founder has actually run
 * for over a decade before incorporation — food distributions, maternity
 * hospital support, essential-item donation, school fees, community health
 * awareness (see `data/members.ts` in the legacy repo, Gift's bio) — rather
 * than invented outcomes or figures. Where a program's specific track record
 * isn't yet documented, the copy describes intent and method honestly,
 * without claiming a result that hasn't been verified.
 *
 * List reconciled against the client's naming (2026-08-19): "Healthcare
 * Services" was dropped as a duplicate of "Health Awareness & Medical
 * Outreach", and "Humanitarian Aid" was dropped as a generic catch-all that
 * every program below already is — not a distinct program in its own right.
 */

export type Program = {
  slug: string;
  name: string;
  /** One sentence — what this program is, plainly. */
  description: string;
  /** How it's actually carried out — the "method" this program is a variation of. */
  method: string;
  /** null until a correctly-matched placeholder is sourced — see pendingPlaceholderImages. */
  image: PlaceholderImage | null;
};

export const programs: Program[] = [
  {
    slug: "food-relief",
    name: "Food Relief & Hunger Intervention",
    description:
      "Getting food to families who don't have enough of it, on a schedule they can count on.",
    method:
      "Distributions are organized directly with families and community contacts in Maryland and Nigeria — staple foods, not one-off hampers, aimed at households already known to the team.",
    image: placeholderImages.foodReliefCommunity,
  },
  {
    slug: "child-welfare-orphanage-support",
    name: "Child Welfare & Orphanage Support",
    description: "Support for children without stable family care — supplies, schooling, presence.",
    method:
      "Working with orphanages and motherless homes to cover what's missing: school fees, basic supplies, and consistent visits so support doesn't stop after one delivery.",
    image: placeholderImages.childWelfareEducation,
  },
  {
    slug: "health-medical-outreach",
    name: "Health Awareness & Medical Outreach",
    description: "Health awareness, basic supplies, and support for maternity care in underserved areas.",
    method:
      "Volunteer medical professionals lead health awareness sessions and support maternity hospitals with supplies and information — building on the founder's own decade of hospital support work before TrueGems was incorporated.",
    image: placeholderImages.healthMedicalOutreach,
  },
  {
    slug: "women-girl-child-empowerment",
    name: "Women & Girl-Child Empowerment",
    description: "Skills, resources, and advocacy so women and girls can build their own stability.",
    method:
      "Programs are shaped around what women in a given community actually ask for — skills training, small material support, and advocacy for girls' access to education.",
    image: placeholderImages.womenGirlChildEmpowerment,
  },
  {
    slug: "inner-city-childrens-support",
    name: "Inner-City Children Support",
    description: "Support for children in under-resourced urban neighborhoods, close to home in Maryland.",
    method:
      "Coordinated locally in Maryland — school supplies, mentorship, and connecting families to resources already available but hard to reach.",
    image: null,
  },
  {
    slug: "economic-empowerment",
    name: "Economic Empowerment & Livelihood Support",
    description: "Helping people build income they control, instead of a one-time handout.",
    method:
      "Small-scale support for trade and skills — the kind of steady work already visible in markets like Bodija in Ibadan — rather than short-term aid that runs out.",
    image: placeholderImages.economicEmpowerment,
  },
  {
    slug: "community-development",
    name: "Community Development & Global Outreach",
    description: "Longer-term work alongside communities, not projects done to them.",
    method:
      "Priorities are set with community leaders and partner organizations on the ground, so the work reflects what a community says it needs rather than what's easiest to deliver.",
    image: placeholderImages.communityDevelopment,
  },
  {
    slug: "education-programs",
    name: "Education Programs",
    description: "Helping children stay in school — fees, supplies, and support so a lack of money doesn't end an education.",
    method:
      "Grounded in the same school-fee support the founder has provided directly for over a decade — paying fees, covering supplies, and working with families to keep children enrolled rather than pulled out for lack of funds.",
    image: null,
  },
];
