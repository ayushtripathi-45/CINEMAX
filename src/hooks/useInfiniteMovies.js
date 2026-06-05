import { useState, useEffect, useCallback, useRef } from 'react'

export default function useInfiniteMovies(fetchFn, deps = []) {
  const [movies, setMovies]       = useState([])
  const [page, setPage]           = useState(1)
  const [totalPages, setTotal]    = useState(1)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [hasMore, setHasMore]     = useState(true)
  const isFirstLoad               = useRef(true)

  // Reset when deps (query, genre, sort) change
  useEffect(() => {
    setMovies([])
    setPage(1)
    setHasMore(true)
    isFirstLoad.current = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const load = useCallback(async (pageNum) => {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetchFn(pageNum)
      const results = res.results || []
      setMovies((prev) =>
        pageNum === 1 ? results : [...prev, ...results]
      )
      setTotal(res.total_pages || 1)
      setHasMore(pageNum < (res.total_pages || 1))
    } catch (err) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, ...deps])

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      load(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const loadMore = () => {
    if (!loading && hasMore) {
      const next = page + 1
      setPage(next)
      load(next)
    }
  }

  return { movies, loading, error, hasMore, loadMore, totalPages }
}
