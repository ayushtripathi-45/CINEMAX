import { motion, AnimatePresence } from 'framer-motion'
import useFavorites from '../../hooks/useFavorites'

export default function FavoriteButton({ movie, size = 'md' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(movie.id)

  const sizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }
  const iconSizes = { sm: 'w-3.5 h-3.5', md: 'w-4.5 h-4.5', lg: 'w-5 h-5' }

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(movie) }}
      className={`${sizes[size]} rounded-full glass flex items-center justify-center transition-colors ${
        active ? 'text-brand-400' : 'text-white/50 hover:text-white'
      }`}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <AnimatePresence mode="wait">
        <motion.svg
          key={active ? 'filled' : 'empty'}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={iconSizes[size]}
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </motion.svg>
      </AnimatePresence>
    </motion.button>
  )
}
