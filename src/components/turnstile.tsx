"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const SCRIPT_ID = "cf-turnstile-script";

function ensureScriptTag() {
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Cloudflare Turnstile widget — no package needed, loads Cloudflare's script
 * directly. Polls for `window.turnstile` rather than relying solely on the
 * script's `load` event: in React 18/19 StrictMode, effects mount twice in
 * dev, and a `load` listener attached on the second mount can miss an event
 * that already fired for the first — polling is the fix that survives that,
 * plus HMR remounts and Fast Refresh, without extra state to get wrong.
 */
export function Turnstile({ onVerify }: { onVerify: (token: string | null) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let pollId: ReturnType<typeof setInterval> | undefined;

    ensureScriptTag();

    function tryRender() {
      if (cancelled || !containerRef.current || !window.turnstile || widgetId.current) return false;
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        callback: (token) => onVerify(token),
        "expired-callback": () => onVerify(null),
        "error-callback": () => onVerify(null),
        // Most real visitors pass silently with no visible widget at all —
        // no iframe box sitting in the page for the mouse to land on and
        // "eat" scroll-wheel input (the newsletter section's stuck-scroll
        // report). Cloudflare only shows the checkbox/challenge UI for the
        // small share of sessions it can't verify passively.
        appearance: "interaction-only",
      });
      return true;
    }

    if (!tryRender()) {
      pollId = setInterval(() => {
        if (tryRender() && pollId) clearInterval(pollId);
      }, 150);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
      if (window.turnstile && widgetId.current) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} />;
}
