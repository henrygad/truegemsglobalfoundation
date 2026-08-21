export default function MediaSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
      <div className="aspect-video w-full" />

      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
