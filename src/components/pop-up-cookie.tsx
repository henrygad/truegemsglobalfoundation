"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Controller from "@/lib/firebase/controller";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookieConsent = async () => {
      try {
        const res = await fetch("/api/visitor-cookie", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await res.json();

        if (!data.cookie_consent) {
          setIsVisible(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    cookieConsent();
  }, []);

  const acceptCookies = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/visitor-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname }),
        credentials: "include",
      });

      const data = await res.json();
      setIsVisible(false);

      Controller.createData("visitors", data.client);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed left-0 right-0 z-50 bg-primary p-4 text-primary-foreground shadow-lg"
      style={{ bottom: "var(--mobile-donate-bar-h, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex-1">
          <h2 className="text-base font-bold">We Value Your Privacy</h2>
          <p className="text-sm">
            This website uses cookies to improve your browsing experience and analyze website traffic. By
            clicking &ldquo;Accept,&rdquo; you consent to the use of{" "}
            <Link href="/cookies" className="underline">
              cookies
            </Link>
            . You may decline non-essential cookies at any time.{" "}
            <Link href="/cookies" className="underline">
              Learn more
            </Link>
          </p>
        </div>
        <Button disabled={loading} onClick={acceptCookies} variant="default">
          Accept Cookies
        </Button>
      </div>
    </div>
  );
}
