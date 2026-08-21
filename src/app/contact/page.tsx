import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section>
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Contact</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-12">
        We read every message
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-muted-foreground">
                {siteConfig.contact.email}
              </a>
              <p className="text-xs text-muted-foreground mt-1">We reply within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">Phone</p>
              <a href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`} className="text-sm text-muted-foreground">
                {siteConfig.contact.phone}
              </a>
              <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                {siteConfig.contact.officeHours.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.hours}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">Address</p>
              <p className="text-sm text-muted-foreground">
                {siteConfig.contact.address.streetAddress}
                <br />
                {siteConfig.contact.address.addressLocality}, {siteConfig.contact.address.addressRegion}{" "}
                {siteConfig.contact.address.postalCode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
