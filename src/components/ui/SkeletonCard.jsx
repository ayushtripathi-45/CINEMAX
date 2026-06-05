export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-dark-800 animate-pulse">
      <div className="aspect-[2/3] shimmer-bg" />
      <div className="p-3 space-y-2">
        <div className="h-3.5 shimmer-bg rounded w-4/5" />
        <div className="h-3 shimmer-bg rounded w-1/3" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
