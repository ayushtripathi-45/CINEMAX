import { useEffect, useRef } from 'react'

export default function InfiniteScroll({ onLoadMore, hasMore, loading }) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (!hasMore || loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore()
      },
      { threshold: 0.1, rootMargin: '200px' }
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  return (
    <div ref={sentinelRef} className="flex justify-center py-8">
      {loading && (
        <div className="flex items-center gap-3 text-white/40 text-sm">
          <div className="w-5 h-5 border-2 border-white/20 border-t-brand-500 rounded-full animate-spin" />
          Loading more...
        </div>
      )}
      {!hasMore && !loading && (
        <p className="text-white/20 text-sm">You've reached the end</p>
      )}
    </div>
  )
}
