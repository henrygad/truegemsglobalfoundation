/**
 * A dated, time-boxed campaign appeal for the homepage. No real campaign
 * exists yet, so this exports `null` rather than a fabricated one — a stale
 * or invented appeal is worse than no appeal at all.
 *
 * To launch a real one: replace `null` below with an object matching
 * `Appeal`, using real dates and a real fundraising goal a human at TrueGems
 * has actually set. `AppealChapter` (src/components/home/appeal-chapter.tsx)
 * only renders when `startDate <= today <= endDate` — it starts showing
 * automatically once the campaign begins and stops automatically the day
 * after `endDate`, so there's nothing to manually take down when it ends.
 *
 * Example shape once there's a real campaign:
 *
 * export const appeal: Appeal | null = {
 *   title: "Emergency food relief — Maryland",
 *   description: "A short, honest sentence on what this specific appeal covers.",
 *   targetAmount: 5000,
 *   startDate: "2026-09-01",
 *   endDate: "2026-09-30",
 *   ctaLabel: "Give to this appeal",
 *   ctaHref: "/donate?focus=Food+Relief",
 * };
 */

export type Appeal = {
  title: string;
  /** One honest sentence — what this appeal is actually for. */
  description: string;
  /** A real, stated fundraising goal — not a live/animated counter (no verified "raised so far" figure exists to track one). */
  targetAmount: number;
  /** ISO date (YYYY-MM-DD). The appeal doesn't render before this date. */
  startDate: string;
  /** ISO date (YYYY-MM-DD). The appeal stops rendering the day after this date. */
  endDate: string;
  ctaLabel: string;
  ctaHref: string;
};

export const appeal: Appeal | null = null;

/** True only inside the appeal's own date window — shared by the homepage section and the chapter rail, so they can never disagree about whether it's live. */
export function isAppealLive(a: Appeal | null): a is Appeal {
  if (!a) return false;
  const today = new Date().toISOString().slice(0, 10);
  return today >= a.startDate && today <= a.endDate;
}
