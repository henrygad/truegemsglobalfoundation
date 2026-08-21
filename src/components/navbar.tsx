"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { ScrollProgress } from "./scroll-progress";
import useClickOutSide from "@/hooks/useClickOutSide";
import { cn } from "@/lib/utils";
import { duration, ease, stagger, useReducedMotion } from "@/lib/motion";

type NavLink = {
  href: string;
  label: string;
  children?: NavLink[];
};

const links: NavLink[] = [
  { href: "/programs", label: "Programs" },
  { href: "/stories", label: "Stories" },
  { href: "/where-we-work", label: "Where We Work" },
  { href: "/gallery", label: "Gallery" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/about/team", label: "Our Team" },
      { href: "/transparency", label: "Transparency" },
    ],
  },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuWrapperRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useClickOutSide(mobileMenuWrapperRef, () => setIsOpen(false));

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  // Transparent-over-hero only makes sense where a hero photograph sits behind the
  // nav — everywhere else it renders solid immediately so text stays legible.
  const transparent = isHome && !scrolled;

  return (
    <>
      <ScrollProgress />
      <nav
        ref={mobileMenuWrapperRef}
        className={cn(
          // fixed, not sticky — sticky still reserves its own box in normal
          // flow while unstuck, which pushed the hero section down and left
          // white nav text sitting on the plain page background instead of
          // the hero photo. fixed overlays instead, so the transparent state
          // actually sits on top of the hero from y:0.
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo isDark={transparent} />

            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) =>
                link.children ? (
                  <DesktopDropdown key={link.label} link={link} transparent={transparent} />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      transparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant={transparent ? "secondary" : "outline"}
                nativeButton={false}
                render={<Link href="/volunteer">Volunteer</Link>}
              />
              <Button nativeButton={false} render={<Link href="/donate">Donate</Link>} />
            </div>

            <button
              className={cn("md:hidden", transparent ? "text-white" : "text-foreground")}
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: duration.fast, ease: ease.out }}
              className="md:hidden overflow-hidden bg-background border-b border-border"
            >
              <m.div
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: stagger.tight } } }}
                className="px-4 pb-4 pt-2 space-y-1"
              >
                {links.flatMap((link) => (link.children ? link.children : [link])).map((link) => (
                  <m.div
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <Link
                      href={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </m.div>
                ))}
                <m.div
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  className="flex flex-col gap-2 pt-4 border-t border-border mt-2"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link href="/volunteer" onClick={() => setIsOpen(false)}>
                        Volunteer
                      </Link>
                    }
                  />
                  <Button
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link href="/donate" onClick={() => setIsOpen(false)}>
                        Donate
                      </Link>
                    }
                  />
                </m.div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function DesktopDropdown({ link, transparent }: { link: NavLink; transparent: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      onBlur={(e) => {
        // Closes once focus leaves the whole dropdown (button + panel), not
        // on every individual blur — a blur fires between the button and
        // its own panel too.
        if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer",
          transparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary"
        )}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {link.label}
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-48"
          >
            <div className="rounded-md border border-border bg-background shadow-lg p-2">
              {link.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-3 py-2 rounded text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
