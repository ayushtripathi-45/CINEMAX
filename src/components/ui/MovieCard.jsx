import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getImageUrl } from '../../services/tmdb'
import RatingBadge from './RatingBadge'
import GenreTag from './GenreTag'
import FavoriteButton from './FavoriteButton'

const FALLBACK = 'https://via.placeholder.com/500x750/111118/444?text=No+Poster'

export default function MovieCard({ movie, index = 0 }) {
  const {
    id, title, poster_path, vote_average,
    release_date, genre_ids = [],
  } = movie

  const year  = release_date?.slice(0, 4) || '—'
  const poster = getImageUrl(poster_path) || FALLBACK

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Link to={`/movie/${id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl card-hover bg-dark-800">
          {/* Poster */}
          <div className="aspect-[2/3] relative overflow-hidden">
            <img
              src={poster}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.target.src = FALLBACK }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick Preview on Hover */}
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0
                            transition-transform duration-300">
              <p className="text-white font-medium text-sm leading-snug line-clamp-2 mb-2">{title}</p>
              <div className="flex flex-wrap gap-1">
                {genre_ids.slice(0, 2).map((gid) => (
                  <GenreTag key={gid} id={gid} />
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="absolute top-2 left-2">
              <RatingBadge rating={vote_average} />
            </div>

            {/* Favorite */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <FavoriteButton movie={movie} size="sm" />
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-3">
            <p className="text-white/90 font-medium text-sm leading-tight truncate">{title}</p>
            <p className="text-white/40 text-xs mt-0.5">{year}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
