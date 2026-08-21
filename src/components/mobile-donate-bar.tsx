"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartHandshake } from "lucide-react";
import { Button } from "./ui/button";

/**
 * Persistent mobile-only donate CTA (AGENTS brief §6 "Homepage Build" spec).
 * The desktop navbar already carries a Donate button at all times; on mobile
 * it's tucked inside the hamburger menu, so this fills that gap once the
 * visitor has scrolled past the hero — before that point the hero's own
 * "Donate" CTA is already on screen and a second one would be redundant.
 *
 * Hidden on /donate itself (and its success/failed pages) since the visitor
 * is already on the donation flow, and while the footer is in view so it
 * never sits on top of the footer's own content.
 */
export function MobileDonateBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const hideForRoute = pathname.startsWith("/donate");

  useEffect(() => {
    if (hideForRoute) return;

    const hero = document.getElementById("hero");
    let heroObserver: IntersectionObserver | undefined;
    let onScroll: (() => void) | undefined;

    if (hero) {
      heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
        rootMargin: "-64px 0px 0px 0px",
      });
      heroObserver.observe(hero);
    } else {
      // Non-homepage pages have no #hero — approximate "past the hero" as
      // having scrolled a modest amount so the bar isn't there on load.
      onScroll = () => setPastHero(window.scrollY > 400);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const footer = document.querySelector("footer");
    const footerObserver = footer
      ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0 })
      : undefined;
    if (footer && footerObserver) footerObserver.observe(footer);

    return () => {
      heroObserver?.disconnect();
      footerObserver?.disconnect();
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, [hideForRoute, pathname]);

  // Publish this bar's rendered height as a CSS variable so other fixed
  // bottom chrome (the cookie banner) can stack above it instead of being
  // covered by it — both are fixed to the viewport bottom independently.
  useEffect(() => {
    const el = barRef.current;
    if (!el) {
      document.documentElement.style.setProperty("--mobile-donate-bar-h", "0px");
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty("--mobile-donate-bar-h", `${entry.contentRect.height}px`);
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.setProperty("--mobile-donate-bar-h", "0px");
    };
  }, [pastHero, footerVisible, hideForRoute]);

  if (hideForRoute || !pastHero || footerVisible) return null;

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
        <HeartHandshake className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
        Support the work
      </p>
      <Button nativeButton={false} render={<Link href="/donate">Donate</Link>} />
    </div>
  );
}
