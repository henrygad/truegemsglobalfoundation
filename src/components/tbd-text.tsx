import type { Fact } from "@/content/tbd";
import { cn } from "@/lib/utils";

/**
 * Renders a Fact<T> — the real value via `children`, or calm neutral placeholder
 * text if it's still TBD. AGENTS brief, §7: no hazard stripes, hatched borders, or
 * warning chips — a TBD must read as composed, not as construction tape.
 */
export function TbdText({
  fact,
  fallback,
  className,
  children,
}: {
  fact: Fact<unknown>;
  /** Visitor-facing placeholder copy, e.g. "Figures publish when our first fiscal year closes." */
  fallback: string;
  className?: string;
  children?: React.ReactNode;
}) {
  if (fact.status === "tbd") {
    return <span className={cn("text-muted-foreground italic", className)}>{fallback}</span>;
  }

  return <span className={className}>{children}</span>;
}
