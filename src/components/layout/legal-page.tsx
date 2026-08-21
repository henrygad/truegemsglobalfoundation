import { Section } from "./section";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <Section containerClassName="max-w-[42rem]">
      <h1 className="font-heading text-4xl text-foreground mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground mb-12">Last updated {lastUpdated}</p>
      <div className="prose-legal space-y-6 text-foreground leading-relaxed [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </Section>
  );
}
