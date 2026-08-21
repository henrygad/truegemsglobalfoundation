import Link from "next/link";
import { HeartHandshake, Stethoscope, Users, Laptop } from "lucide-react";
import { volunteerRoles } from "@/content/volunteer-roles";
import { Button } from "@/components/ui/button";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

const icons = [HeartHandshake, Stethoscope, Users, Laptop];

/**
 * Was entirely absent from the homepage (AGENTS brief) despite volunteers
 * being a real conversion path to donors. Four concrete roles, one action.
 */
export function VolunteerChapter() {
  return (
    <section id="volunteer" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12 max-w-2xl">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Volunteer</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-4">
              We&apos;re a small team — real help matters
            </h2>
            <p className="text-lg text-muted-foreground">
              A real person reads every application. Here&apos;s the kind of help that actually moves things
              forward.
            </p>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {volunteerRoles.map((role, i) => {
            const Icon = icons[i];
            return (
              <ChapterRevealItem key={role.title}>
                <Icon className="size-6 text-primary mb-4" aria-hidden="true" />
                <h3 className="font-semibold text-foreground mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
              </ChapterRevealItem>
            );
          })}
        </ChapterReveal>

        <ChapterReveal>
          <ChapterRevealItem>
            <Button size="lg" nativeButton={false} render={<Link href="/volunteer">Apply to volunteer</Link>} />
          </ChapterRevealItem>
        </ChapterReveal>
      </div>
    </section>
  );
}
