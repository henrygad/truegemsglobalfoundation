"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { cn } from "@/lib/utils";
import Logo from "./logo";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/donors", label: "Donors" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/volunteers", label: "Volunteers" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/visitors", label: "Visitors" },
];

export function AdminNav({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await signOut(auth);
    router.push("/login/admin");
    router.refresh();
  }

  const navContent = (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <Logo isDark />
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        {email && <p className="text-xs text-sidebar-foreground/60 truncate mb-2">{email}</p>}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground w-full"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 md:hidden bg-sidebar text-sidebar-foreground p-2 rounded-md"
        aria-label="Open admin menu"
      >
        <Menu className="size-5" />
      </button>

      <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 bg-sidebar text-sidebar-foreground">
        {navContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 flex flex-col bg-sidebar text-sidebar-foreground">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-sidebar-foreground"
              aria-label="Close admin menu"
            >
              <X className="size-5" />
            </button>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
