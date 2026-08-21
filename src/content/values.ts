/** Organizational values — grounded in how the founder actually worked for a
 * decade before incorporation, not aspirational language pulled from nowhere. */

export type Value = {
  name: string;
  description: string;
};

export const values: Value[] = [
  {
    name: "Direct, not distant",
    description:
      "Support goes to families and community contacts the team actually knows, not through layers of intermediaries.",
  },
  {
    name: "Honest about what we are",
    description:
      "We're a young organization. We say so, and we don't claim a scale or history we don't have.",
  },
  {
    name: "Led by the community, not for it",
    description: "Priorities come from what a community asks for, set alongside local partners and leaders.",
  },
  {
    name: "Consistency over one-time gestures",
    description: "A single delivery isn't the goal — staying involved with the people we've committed to is.",
  },
];
