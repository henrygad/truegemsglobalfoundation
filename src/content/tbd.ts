/**
 * A typed "unknown fact" — for content that's real-but-not-yet-known rather than
 * invented. AGENTS brief, §7: never invent a stat, date, testimonial, or figure;
 * where a fact is required but unknown, use a typed TBD that renders as calm
 * neutral placeholder text, not a hazard chip.
 *
 * Usage: `founded: fact(2025)` once known, `ein: tbd("EIN not yet issued/on file")`
 * until it is. Consuming components branch on `.status` and render
 * `<TbdText note={...} />` (src/components/tbd-text.tsx) for the tbd case.
 */

export type Fact<T> = { status: "ready"; value: T } | { status: "tbd"; note: string };

export function fact<T>(value: T): Fact<T> {
  return { status: "ready", value };
}

/**
 * `note` is developer-facing (what's missing, not filler for visitors) — it's what
 * the console warning shows and what CONTENT_TODO.md should already explain.
 * Server-side only warning: this module is imported by both server and client
 * code, but the warning should only ever appear once, at build/dev-server time.
 */
export function tbd<T = never>(note: string): Fact<T> {
  if (typeof window === "undefined") {
    console.warn(`[content:TBD] ${note}`);
  }
  return { status: "tbd", note };
}

export function isReady<T>(f: Fact<T>): f is { status: "ready"; value: T } {
  return f.status === "ready";
}
