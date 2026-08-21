import { cn } from "@/lib/utils";

/** Max-width + horizontal padding, defined once. Never copy `max-w-7xl mx-auto px-4` inline again. */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return <Tag className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</Tag>;
}
