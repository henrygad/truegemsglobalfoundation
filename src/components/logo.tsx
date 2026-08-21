import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Logo({ isDark = false, textOnly = false }: { isDark?: boolean; textOnly?: boolean }) {
  return (
    <Link href="/" className="flex items-center space-x-2 font-bold text-base sm:text-xl text-primary">
      {!textOnly && (
        <Image
          src={!isDark ? "/icon-light-32x32.png" : "/icon-dark-32x32.png"}
          alt={`${siteConfig.wordmark} logo`}
          width={38}
          height={32}
          className="object-contain"
        />
      )}
      <span className={isDark ? "text-white" : undefined}>{siteConfig.wordmark}</span>
    </Link>
  );
}
