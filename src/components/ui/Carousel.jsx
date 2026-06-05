import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBackdropUrl, getImageUrl } from '../../services/tmdb'
import RatingBadge from './RatingBadge'
import FavoriteButton from './FavoriteButton'

const FALLBACK_BACKDROP = 'https://via.placeholder.com/1280x720/111118/333?text=No+Image'

export default function Carousel({ movies = [] }) {
  const ref = useRef(null)

  const scroll = (dir) => {
    if (!ref.current) return
    ref.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  if (!movies.length) return null

  return (
    <div className="relative group/carousel">
      {/* Scroll Buttons */}
      <button onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                   w-10 h-10 glass rounded-full flex items-center justify-center
                   opacity-0 group-hover/carousel:opacity-100 transition-all duration-200
                   hover:bg-white/10 hidden md:flex">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                   w-10 h-10 glass rounded-full flex items-center justify-center
                   opacity-0 group-hover/carousel:opacity-100 transition-all duration-200
                   hover:bg-white/10 hidden md:flex">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Container */}
      <div ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {movies.map((movie, i) => (
          <CarouselCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>
    </div>
  )
}

function CarouselCard({ movie, index }) {
  const backdrop = getBackdropUrl(movie.backdrop_path) ||
                   getImageUrl(movie.poster_path, 'w780') || FALLBACK_BACKDROP

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-72 md:w-80"
    >
      <Link to={`/movie/${movie.id}`} className="group block">
        <div className="relative rounded-xl overflow-hidden bg-dark-800 card-hover">
          {/* Backdrop */}
          <div className="aspect-video relative overflow-hidden">
            <img
              src={backdrop}
              alt={movie.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.target.src = FALLBACK_BACKDROP }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />

            {/* Favorite */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <FavoriteButton movie={movie} size="sm" />
            </div>

            {/* Play Icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm leading-tight truncate">{movie.title}</p>
              <p className="text-white/40 text-xs mt-0.5">
                {movie.release_date?.slice(0, 4)}
              </p>
            </div>
            <RatingBadge rating={movie.vote_average} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
