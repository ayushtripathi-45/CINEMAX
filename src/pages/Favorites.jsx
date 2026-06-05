import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useFavorites from '../hooks/useFavorites'
import MovieCard from '../components/ui/MovieCard'
import EmptyState from '../components/ui/EmptyState'

const SORTS = [
  { value: 'added',  label: 'Recently Added' },
  { value: 'rating', label: 'Highest Rated'  },
  { value: 'year',   label: 'Newest First'   },
  { value: 'title',  label: 'A–Z'            },
]

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites()
  const [sort, setSort] = useState('added')
  const [query, setQuery] = useState('')

  const sorted = [...favorites]
    .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'rating') return (b.vote_average || 0) - (a.vote_average || 0)
      if (sort === 'year')   return (b.release_date || '').localeCompare(a.release_date || '')
      if (sort === 'title')  return a.title.localeCompare(b.title)
      return 0 // added order is preserved naturally
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl tracking-wider text-white">MY FAVORITES</h1>
          <p className="text-white/40 text-sm mt-1">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            {/* Filter input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter..."
              className="input-base w-40 py-2 text-sm"
            />
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-base w-auto py-2 text-sm cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <EmptyState
          type="favorites"
          action={
            <Link to="/search" className="btn-primary">Browse Movies</Link>
          }
        />
      )}

      {/* No filter results */}
      {favorites.length > 0 && sorted.length === 0 && (
        <EmptyState type="search" message={`No favorites matching "${query}"`} />
      )}

      {/* Grid */}
      {sorted.length > 0 && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
        >
          {sorted.map((m, i) => (
            <div key={m.id} className="relative group/fav">
              <MovieCard movie={m} index={i} />
              {/* Remove button */}
              <button
                onClick={() => removeFavorite(m.id)}
                className="absolute top-2 left-2 w-7 h-7 rounded-full bg-dark-900/80 text-white/50
                           hover:text-red-400 flex items-center justify-center transition-all
                           opacity-0 group-hover/fav:opacity-100 text-xs"
                title="Remove from favorites"
              >
                ✕
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
