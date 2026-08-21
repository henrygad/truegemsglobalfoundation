/**
 * Suggested giving amounts for the homepage ask and the donate page. Deliberately
 * NOT paired with "this feeds N people" style claims — no verified unit costs
 * exist yet (see CONTENT_TODO.md). These are just amount presets for the Stripe
 * checkout flow, not claims about what they buy.
 */

export type GivingTier = {
  amount: number;
};

export const givingTiers: GivingTier[] = [{ amount: 25 }, { amount: 50 }, { amount: 100 }, { amount: 250 }];
