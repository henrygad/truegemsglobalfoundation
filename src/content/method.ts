/**
 * The sequence behind every program — grounded in how the founder actually
 * worked for a decade before incorporation (direct contact, no intermediary
 * campaigns), not tied to any specific household since no story exists yet
 * (see stories.ts).
 */

export type MethodStep = {
  step: number;
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    step: 1,
    title: "A need is identified directly",
    description:
      "Through community contacts, volunteers, and partner organizations already on the ground — not a campaign looking for a cause.",
  },
  {
    step: 2,
    title: "It's verified in person",
    description: "A team member or trusted local contact confirms the situation before anything is committed.",
  },
  {
    step: 3,
    title: "The response is sized to the need",
    description:
      "Food, school fees, medical support, or supplies — whatever actually applies, not a fixed package handed out regardless of fit.",
  },
  {
    step: 4,
    title: "The team stays involved",
    description: "Follow-up, not a single delivery — the same principle behind every program below.",
  },
];
