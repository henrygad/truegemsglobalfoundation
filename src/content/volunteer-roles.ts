/**
 * Concrete volunteer roles for the homepage volunteer section. These describe
 * the kinds of help TrueGems' real work actually needs — grounded in the
 * activities documented elsewhere (event/distribution photos in the gallery,
 * the founder's own decade of food-distribution and health-outreach work,
 * Henry's real role as the org's volunteer developer) — not a claim about
 * how many volunteers exist or what they've achieved, which would need the
 * same verification any other statistic does.
 */

export type VolunteerRole = {
  title: string;
  description: string;
};

export const volunteerRoles: VolunteerRole[] = [
  {
    title: "Event & distribution support",
    description: "Hands-on help running food distributions and outreach events, in Maryland or Nigeria.",
  },
  {
    title: "Health outreach support",
    description: "Assisting volunteer medical professionals with health awareness sessions and supply logistics.",
  },
  {
    title: "Community coordination",
    description: "Helping identify families who need support and following up after the first visit.",
  },
  {
    title: "Skills-based volunteering",
    description: "Tech, admin, design, or other professional skills — the same way our own site got built.",
  },
];
