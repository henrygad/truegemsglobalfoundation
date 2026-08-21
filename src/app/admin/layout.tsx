"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { AdminNav } from "@/components/admin-nav";
import LoadingPage from "@/components/loading-page";
import DonorProvider from "@/context/donor-context";
import MessageProvider from "@/context/message-context";
import NewsletterProvider from "@/context/newsletter-context";
import VisitorProvider from "@/context/visitor-context";
import VolunteerProvider from "@/context/volunteer-context";

/**
 * Client-side gate, matching the legacy app: redirect to /login/admin
 * whenever there's no signed-in Firebase user. `authUser` is `undefined`
 * while onAuthStateChanged hasn't reported back yet, `null` once it has and
 * found nobody signed in, or the user object once it has.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser === null) router.replace("/login/admin");
  }, [authUser, router]);

  if (authUser === undefined || authUser === null) return <LoadingPage />;

  return (
    <DonorProvider>
      <MessageProvider>
        <NewsletterProvider>
          <VisitorProvider>
            <VolunteerProvider>
              <div className="flex min-h-screen bg-background">
                <a
                  href="#admin-main"
                  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
                >
                  Skip to content
                </a>
                <AdminNav email={authUser.email ?? undefined} />
                <main id="admin-main" tabIndex={-1} className="flex-1 min-w-0 p-6 md:p-10 pt-20 md:pt-10 focus:outline-none">
                  {children}
                </main>
              </div>
            </VolunteerProvider>
          </VisitorProvider>
        </NewsletterProvider>
      </MessageProvider>
    </DonorProvider>
  );
}
