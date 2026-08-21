import Link from "next/link";
import Logo from "./logo";
import { siteConfig } from "@/config/site";
import { TbdText } from "./tbd-text";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.53 17.52 2.04 12 2.04S2 6.53 2 12.06c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.89h-2.34v6.99C18.34 21.19 22 17.06 22 12.06Z" />
    </svg>
  );
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2h3.1l-6.77 7.74L23.2 22h-6.23l-4.88-6.39L6.5 22H3.4l7.24-8.28L2.8 2h6.38l4.4 5.84L18.9 2Zm-1.09 18h1.72L7.29 3.9H5.44L17.81 20Z" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIcons = { facebook: Facebook, twitter: Twitter, linkedin: Linkedin, instagram: Instagram };

const learnLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/stories", label: "Stories" },
  { href: "/where-we-work", label: "Where We Work" },
  { href: "/about", label: "About Us" },
  { href: "/about/team", label: "Our Team" },
  { href: "/transparency", label: "Transparency" },
];

const involvedLinks = [
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo isDark textOnly />
            <p className="text-sm mt-3">{siteConfig.tagline}</p>

            {siteConfig.socials.length > 0 && (
              <div className="flex space-x-4 mt-4">
                {siteConfig.socials.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      aria-label={social.platform}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-4">Learn</h2>
            <ul className="space-y-2 text-sm">
              {learnLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Get Involved</h2>
            <ul className="space-y-2 text-sm">
              {involvedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Contact</h2>
            <ul className="space-y-2 text-sm">
              <li>{siteConfig.contact.email}</li>
              <li>{siteConfig.contact.phone}</li>
              <li>
                {siteConfig.contact.address.streetAddress}, {siteConfig.contact.address.addressLocality},{" "}
                {siteConfig.contact.address.addressRegion} {siteConfig.contact.address.postalCode}
              </li>
            </ul>

            <h2 className="font-semibold mb-2 mt-6">Legal</h2>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust — EIN and 501(c)(3) status sitewide (AGENTS brief §9). */}
        <div className="border-t border-primary-foreground/20 pt-6 text-xs flex flex-col sm:flex-row sm:justify-between gap-2">
          <p>
            {siteConfig.name} is a {siteConfig.legalStatus}, incorporated in {siteConfig.incorporationState} in{" "}
            {siteConfig.foundingYear}.{" "}
            <TbdText
              fact={siteConfig.ein}
              fallback="EIN publishes once issued."
              className="text-primary-foreground"
            >
              EIN {siteConfig.ein.status === "ready" ? siteConfig.ein.value : ""}
            </TbdText>
          </p>
          <p>
            &copy; {currentYear} {siteConfig.legal.copyrightHolder}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
