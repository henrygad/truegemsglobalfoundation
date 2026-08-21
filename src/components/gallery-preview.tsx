"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGallery } from "@/context/gallery-context";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react";
import MediaSkeleton from "./media-skeleton";

const MAX_PREVIEW_ITEMS = 12;

function mediaSrc(url: string) {
  return `${url}?auto=format&fit=crop&w=800&q=80`;
}

function isTallCard(index: number) {
  return index % 3 === 2 || index % 4 === 3;
}

export default function GalleryPreview({
  number = 5,
  displayButtons,
  id,
}: {
  number: number;
  displayButtons: boolean;
  id?: string;
}) {
  const { loading, gallery } = useGallery();
  const [viewMoreImages, setViewMoreImages] = useState(number);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const allItems = useMemo(() => {
    let copy = [...gallery];
    copy = copy.filter((m) => m.category.toLowerCase() !== "business");
    const limit = displayButtons ? viewMoreImages : Math.min(number, MAX_PREVIEW_ITEMS);
    return copy.slice(0, limit);
  }, [gallery, viewMoreImages, number, displayButtons]);

  const activeItem = allItems[activeIndex];

  const openLightbox = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    // Return focus to whatever opened the lightbox, same as a native dialog would.
    triggerRef.current?.focus();
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % allItems.length);
  }, [allItems.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + allItems.length) % allItems.length);
  }, [allItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    // Focus something inside the dialog immediately — without this, Tab from
    // here starts back on whatever's behind the overlay, not the dialog.
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();

      if (e.key === "Tab" && lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], video, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  useEffect(() => {
    if (!lightboxOpen || !activeItem || activeItem.type !== "video") return;
    const timer = window.setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 100);
    return () => window.clearTimeout(timer);
  }, [lightboxOpen, activeIndex, activeItem]);

  if (loading) {
    return (
      <section id={id} className="w-full py-16 md:py-20 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!displayButtons && (
            <div className="mb-10">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 w-64 bg-muted rounded mt-4 animate-pulse" />
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <MediaSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="w-full py-16 md:py-20 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!displayButtons && (
          <div className="mb-10">
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Our community</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">What the work looks like</h2>
          </div>
        )}

        {allItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {allItems.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(i)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isTallCard(i) ? "row-span-2" : ""
                }`}
              >
                {item.type === "image" ? (
                  <Image
                    src={mediaSrc(item.url)}
                    alt={item.description || `Gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <Image
                      src={mediaSrc(item.thumbnail || item.url)}
                      alt={item.description || `Gallery video ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 right-2 z-10 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                      VIDEO
                    </span>
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                        <Play className="h-7 w-7 text-primary fill-primary ml-1" />
                      </div>
                    </div>
                  </>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center">
                  {item.type === "image" ? (
                    <ZoomIn className="h-10 w-10 text-white" aria-hidden />
                  ) : (
                    <Play className="h-10 w-10 text-white fill-white" aria-hidden />
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">Gallery items will appear here once uploaded.</p>
        )}

        {displayButtons && (
          <div className="flex justify-center items-center gap-4 mt-10">
            {viewMoreImages > number && (
              <Button variant="outline" onClick={() => setViewMoreImages(number)} className="hover:opacity-90 transition">
                See Less
              </Button>
            )}
            {viewMoreImages < gallery.filter((m) => m.category.toLowerCase() !== "business").length && (
              <Button variant="ghost" onClick={() => setViewMoreImages((prev) => prev + 10)} className="hover:opacity-90 transition">
                View More
              </Button>
            )}
          </div>
        )}

        {!displayButtons && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground">Want to see more?</p>
            <Link href="/gallery" className="inline-block mt-4 bg-primary text-primary-foreground rounded-full px-8 py-3 font-semibold hover:opacity-90 transition">
              View Full Gallery
            </Link>
            <p className="text-muted-foreground text-sm mt-3">Updated regularly with our latest outreach moments</p>
          </div>
        )}
      </div>

      {lightboxOpen && activeItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 transition"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {allItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition"
                aria-label="Previous item"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition"
                aria-label="Next item"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-white text-sm font-medium">
                {activeIndex + 1} / {allItems.length}
              </p>
            </>
          )}

          <div className="relative w-full max-w-5xl px-4 md:px-16 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {activeItem.type === "image" ? (
              <Image
                src={mediaSrc(activeItem.url)}
                alt={activeItem.description || "Truegems global foundation gallery"}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                sizes="100vw"
                priority
              />
            ) : (
              <video
                ref={videoRef}
                key={activeItem.id}
                src={activeItem.url}
                controls
                autoPlay
                playsInline
                className="w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl aspect-video bg-black"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
