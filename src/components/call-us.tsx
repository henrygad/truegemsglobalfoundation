import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CallUs() {
  const telHref = `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="relative">
      <div className="fixed bottom-8 right-0 sm:right-4 -translate-1/2 z-20">
        <Button
          variant="ghost"
          className="h-14 w-14 p-4 border rounded-full shadow-2xl bg-secondary"
          nativeButton={false}
          render={
            <a href={telHref} aria-label={`Call ${siteConfig.contact.phone}`}>
              <Phone size={40} className="text-foreground" />
            </a>
          }
        />
      </div>
    </div>
  );
}
