import { cn } from "@/lib/utils";
import { Container } from "./container";

const toneClasses = {
  default: "bg-background",
  surface: "bg-surface",
  primary: "bg-primary text-primary-foreground",
} as const;

/**
 * Vertical section rhythm, defined once. A plain server component on purpose —
 * scroll-reveal motion belongs to the content inside a section (a client leaf),
 * not to the section boundary itself.
 */
export function Section({
  className,
  containerClassName,
  tone = "default",
  children,
  id,
}: {
  className?: string;
  containerClassName?: string;
  tone?: keyof typeof toneClasses;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24 lg:py-32 scroll-mt-20", toneClasses[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
