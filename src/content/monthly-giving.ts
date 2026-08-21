/**
 * Suggested monthly amounts for the homepage's dedicated recurring-giving
 * section — separate from src/content/giving-tiers.ts (one-time), since a
 * recurring commitment is a different ask and typically a smaller monthly
 * amount than a one-time gift. Like giving-tiers.ts, these are checkout
 * presets only, not paired with a "this buys X" claim — no verified unit
 * costs exist yet (see CONTENT_TODO.md). Once field costs are confirmed,
 * an outcome caption per tier (e.g. "$25/month covers …") can be added here.
 */

export type MonthlyGivingTier = {
  amount: number;
};

export const monthlyGivingTiers: MonthlyGivingTier[] = [{ amount: 10 }, { amount: 25 }, { amount: 50 }];
