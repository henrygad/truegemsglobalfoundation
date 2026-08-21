/**
 * What's actually verifiable, in order. Deliberately short — the founder's
 * decade of pre-incorporation grassroots work isn't dated precisely anywhere in
 * the legacy repo, so it's described in general terms rather than assigned
 * fabricated years.
 */

export type TimelineEntry = {
  year: string;
  label: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2014–2025",
    label:
      "Before incorporation, food distributions, maternity hospital support, and school-fee assistance carried out directly by the founder for over a decade.",
  },
  {
    year: "2025",
    label: "TrueGems Global Helping Hands Foundation Inc. incorporated in Maryland as a 501(c)(3) nonprofit.",
  },
];
