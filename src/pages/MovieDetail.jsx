import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMovieDetails, getImageUrl, getBackdropUrl } from '../services/tmdb'
import RatingBadge from '../components/ui/RatingBadge'
import GenreTag from '../components/ui/GenreTag'
import FavoriteButton from '../components/ui/FavoriteButton'
import MovieCard from '../components/ui/MovieCard'

const PLACEHOLDER_POSTER    = 'https://via.placeholder.com/500x750/111118/444?text=No+Poster'
const PLACEHOLDER_PERSON    = 'https://via.placeholder.com/200x300/1a1a24/444?text=N%2FA'

function formatRuntime(min) {
  if (!min) return '—'
  const h = Math.floor(min / 60), m = min % 60
  return h ? `${h}h ${m}m` : `${m}m`
}

function formatMoney(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(n)
}

export default function MovieDetail() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const [movie, setMovie]   = useState(null)
  const [loading, setLoad]  = useState(true)
  const [error,  setError]  = useState(null)

  useEffect(() => {
    setLoad(true)
    setError(null)
    getMovieDetails(id)
      .then(setMovie)
      .catch(() => setError('Failed to load movie details.'))
      .finally(() => setLoad(false))
  }, [id])

  if (loading) return <DetailSkeleton />
  if (error)   return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-white/50">{error}</p>
      <button onClick={() => navigate(-1)} className="btn-ghost">Go Back</button>
    </div>
  )
  if (!movie) return null

  const backdrop = getBackdropUrl(movie.backdrop_path)
  const poster   = getImageUrl(movie.poster_path) || PLACEHOLDER_POSTER
  const cast     = movie.credits?.cast?.slice(0, 12) || []
  const similar  = movie.similar?.results?.slice(0, 12) || []
  const trailer  = movie.videos?.results?.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      {/* ── Backdrop ── */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        {backdrop && (
          <img src={backdrop} alt={movie.title}
            className="w-full h-full object-cover object-top" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-transparent" />

        {/* Back Button */}
        <button onClick={() => navigate(-1)}
          className="absolute top-20 left-6 glass px-4 py-2 rounded-full text-sm text-white/70 hover:text-white flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-48 md:w-60 mx-auto md:mx-0">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              src={poster}
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl"
              onError={(e) => { e.target.src = PLACEHOLDER_POSTER }}
            />
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 pt-4"
          >
            <h1 className="font-display text-4xl md:text-6xl tracking-wider text-white leading-none mb-1">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-white/40 text-sm italic mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <RatingBadge rating={movie.vote_average} size="lg" />
              <span className="text-white/40 text-sm">{movie.release_date?.slice(0, 4)}</span>
              <span className="text-white/20">·</span>
              <span className="text-white/40 text-sm">{formatRuntime(movie.runtime)}</span>
              {movie.adult && (
                <span className="text-xs px-2 py-0.5 rounded border border-red-500/50 text-red-400">R</span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {(movie.genres || []).map((g) => (
                <Link key={g.id} to={`/search?genre=${g.id}`}>
                  <GenreTag id={g.id} name={g.name} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              {trailer && (
                <a href={`https://youtube.com/watch?v=${trailer.key}`}
                  target="_blank" rel="noreferrer"
                  className="btn-primary flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Trailer
                </a>
              )}
              <FavoriteButton movie={movie} size="lg" />
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">Overview</h3>
              <p className="text-white/70 text-sm leading-relaxed">{movie.overview || 'No overview available.'}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Release',    value: movie.release_date || '—' },
                { label: 'Runtime',    value: formatRuntime(movie.runtime) },
                { label: 'Budget',     value: formatMoney(movie.budget) },
                { label: 'Revenue',    value: formatMoney(movie.revenue) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-dark-700/50 rounded-xl p-3 border border-white/5">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Cast ── */}
        {cast.length > 0 && (
          <section className="mt-14">
            <h2 className="section-title mb-6">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {cast.map((person) => (
                <div key={person.id} className="flex-shrink-0 w-24 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-dark-700 mb-2">
                    <img
                      src={getImageUrl(person.profile_path, 'w200') || PLACEHOLDER_PERSON}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = PLACEHOLDER_PERSON }}
                    />
                  </div>
                  <p className="text-white text-xs font-medium leading-tight truncate">{person.name}</p>
                  <p className="text-white/30 text-xs truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Similar Movies ── */}
        {similar.length > 0 && (
          <section className="mt-14">
            <h2 className="section-title mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {similar.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  )
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[65vh] shimmer-bg" />
      <div className="max-w-7xl mx-auto px-4 -mt-40 relative z-10">
        <div className="flex gap-8">
          <div className="w-60 aspect-[2/3] shimmer-bg rounded-2xl flex-shrink-0" />
          <div className="flex-1 pt-4 space-y-4">
            <div className="h-12 shimmer-bg rounded w-3/4" />
            <div className="h-4 shimmer-bg rounded w-1/4" />
            <div className="h-20 shimmer-bg rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
