import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { searchMovies, getPopular, getTopRated, getGenres, discoverMovies } from '../services/tmdb'
import { useSearchContext } from '../context/SearchContext'
import useDebounce from '../hooks/useDebounce'
import useInfiniteMovies from '../hooks/useInfiniteMovies'
import SearchBar from '../components/ui/SearchBar'
import MovieCard from '../components/ui/MovieCard'
import { SkeletonGrid } from '../components/ui/SkeletonCard'
import EmptyState from '../components/ui/EmptyState'
import InfiniteScroll from '../components/ui/InfiniteScroll'

const SORT_OPTIONS = [
  { value: 'popular',   label: 'Most Popular' },
  { value: 'top_rated', label: 'Top Rated'    },
  { value: 'trending',  label: 'Trending'     },
  { value: 'newest',    label: 'Newest'       },
]

const SORT_MAP = {
  popular:   'popularity.desc',
  top_rated: 'vote_average.desc',
  newest:    'release_date.desc',
  trending:  'popularity.desc',
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { query, setQuery }             = useSearchContext()
  const [genres,   setGenres]           = useState([])
  const [sort,     setSort]             = useState(searchParams.get('sort') || 'popular')
  const [activeGenre, setActiveGenre]   = useState(searchParams.get('genre') || '')

  const debouncedQuery = useDebounce(query, 400)

  // Sync URL → state on mount
  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setQuery(q)
  }, [])

  // Load genres
  useEffect(() => {
    getGenres().then((r) => setGenres(r.genres || []))
  }, [])

  // Build fetch fn
  const fetchFn = useCallback((page) => {
    if (debouncedQuery) {
      return searchMovies(debouncedQuery, page)
    }
    if (activeGenre) {
      return discoverMovies({ with_genres: activeGenre, page, sort_by: SORT_MAP[sort] || 'popularity.desc' })
    }
    if (sort === 'top_rated') return getTopRated(page)
    return getPopular(page)
  }, [debouncedQuery, sort, activeGenre])

  const { movies, loading, error, hasMore, loadMore } = useInfiniteMovies(
    fetchFn,
    [debouncedQuery, sort, activeGenre]
  )

  const handleSort = (s) => {
    setSort(s)
    setSearchParams((p) => { p.set('sort', s); p.delete('q'); return p })
    setQuery('')
    setActiveGenre('')
  }

  const handleGenre = (id) => {
    const next = activeGenre === id ? '' : id
    setActiveGenre(next)
    if (next) setSearchParams({ genre: next })
    else setSearchParams({})
    setQuery('')
  }

  const heading = debouncedQuery
    ? `Results for "${debouncedQuery}"`
    : activeGenre
      ? genres.find((g) => String(g.id) === String(activeGenre))?.name || 'Genre'
      : SORT_OPTIONS.find((s) => s.value === sort)?.label || 'Movies'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 animate-fade-in">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar placeholder="Search movies, genres, actors..." large />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Sort */}
        <div className="flex gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button key={opt.value}
              onClick={() => handleSort(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                sort === opt.value && !debouncedQuery && !activeGenre
                  ? 'brand-gradient text-white'
                  : 'bg-dark-700 text-white/50 hover:text-white border border-white/10'
              }`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Chips */}
      {genres.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {genres.map((g) => (
            <button key={g.id}
              onClick={() => handleGenre(String(g.id))}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                activeGenre === String(g.id)
                  ? 'brand-gradient text-white'
                  : 'bg-dark-700 text-white/40 hover:text-white border border-white/10'
              }`}>
              {g.name}
            </button>
          ))}
        </div>
      )}

      {/* Heading */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="section-title">{heading}</h1>
        {movies.length > 0 && (
          <span className="text-sm text-white/30">{movies.length} movies</span>
        )}
      </div>

      {/* Error */}
      {error && <EmptyState type="error" message={error} />}

      {/* Results */}
      {!error && (
        <>
          {loading && movies.length === 0
            ? <SkeletonGrid count={18} />
            : movies.length === 0 && !loading
              ? <EmptyState type="search" />
              : <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
                >
                  {movies.map((m, i) => <MovieCard key={`${m.id}-${i}`} movie={m} index={i} />)}
                </motion.div>
          }

          <InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} loading={loading && movies.length > 0} />
        </>
      )}
    </div>
  )
}
