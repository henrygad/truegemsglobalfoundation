"use client";

import CallUs from "@/components/call-us";
import { Footer } from "@/components/footer";
import LoadingPage from "@/components/loading-page";
import { MobileDonateBar } from "@/components/mobile-donate-bar";
import { Navbar } from "@/components/navbar";
import CookieConsent from "@/components/pop-up-cookie";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/login");
  const isHome = pathname === "/";

  useEffect(() => {
    const createNewSession = async () => {
      try {
        await fetch("/api/session-cookie", {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error(error);
      }
    };

    createNewSession();
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Skip to main content
      </a>

      {!isAdmin && <Navbar />}

      {/*
        Navbar is `fixed`, not `sticky` — it never reserves space in flow, so
        every page except the homepage (whose hero is deliberately full-bleed
        under the transparent-over-hero nav) needs top padding equal to the
        nav's height so content doesn't render underneath it.
      */}
      <main
        id="main-content"
        tabIndex={-1}
        className={cn("flex-1 focus:outline-none", !isAdmin && !isHome && "pt-16")}
      >
        {children}
      </main>

      {!isAdmin && <Footer />}
      {!isAdmin && <CallUs />}
      {!isAdmin && <MobileDonateBar />}
      {!isAdmin && <CookieConsent />}
    </Suspense>
  );
}
