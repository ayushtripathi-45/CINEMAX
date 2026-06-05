import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTrending, getPopular, getTopRated, getGenres, getImageUrl, getBackdropUrl } from '../services/tmdb'
import SearchBar from '../components/ui/SearchBar'
import Carousel from '../components/ui/Carousel'
import MovieCard from '../components/ui/MovieCard'
import { SkeletonGrid } from '../components/ui/SkeletonCard'
import RatingBadge from '../components/ui/RatingBadge'
import GenreTag from '../components/ui/GenreTag'
import FavoriteButton from '../components/ui/FavoriteButton'
import EmptyState from '../components/ui/EmptyState'

export default function Home() {
  const [trending,  setTrending]  = useState([])
  const [popular,   setPopular]   = useState([])
  const [topRated,  setTopRated]  = useState([])
  const [genres,    setGenres]    = useState([])
  const [hero,      setHero]      = useState(null)
  const [heroIndex, setHeroIndex] = useState(0)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  useEffect(() => {
    Promise.all([getTrending(), getPopular(), getTopRated(), getGenres()])
      .then(([t, p, tr, g]) => {
        setTrending(t.results || [])
        setPopular(p.results || [])
        setTopRated(tr.results || [])
        setGenres(g.genres || [])
        setHero((t.results || [])[0] || null)
      })
      .catch((err) => {
        setError(err.response?.data?.status_message || err.message || 'Something went wrong')
      })
      .finally(() => setLoading(false))
  }, [])

  // Auto-rotate hero
  useEffect(() => {
    if (!trending.length) return
    const interval = setInterval(() => {
      setHeroIndex((i) => {
        const next = (i + 1) % Math.min(5, trending.length)
        setHero(trending[next])
        return next
      })
    }, 7000)
    return () => clearInterval(interval)
  }, [trending])

  if (error) {
    return (
      <div className="pt-24 px-4 min-h-[75vh] flex items-center justify-center">
        <EmptyState type="error" message={error} />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <HeroSection hero={hero} trending={trending} heroIndex={heroIndex} setHero={(m, i) => { setHero(m); setHeroIndex(i) }} />

      {/* ── Search ── */}
      <section className="max-w-2xl mx-auto px-4 -mt-8 relative z-10">
        <SearchBar large placeholder="Search thousands of movies..." />
      </section>

      {/* ── Genre Chips ── */}
      {genres.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <Link key={g.id} to={`/search?genre=${g.id}&genre_name=${encodeURIComponent(g.name)}`}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-white/60 border border-white/10
                           hover:bg-white/8 hover:text-white transition-all duration-200 hover:border-white/20">
                {g.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Trending Carousel ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <SectionHeader title="Trending This Week" link="/search?sort=trending" />
        {loading ? <div className="h-48 shimmer-bg rounded-xl" /> : <Carousel movies={trending} />}
      </section>

      {/* ── Popular Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <SectionHeader title="Popular Now" link="/search?sort=popular" />
        {loading
          ? <SkeletonGrid count={12} />
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {popular.slice(0, 12).map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
            </div>
        }
      </section>

      {/* ── Top Rated Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-8">
        <SectionHeader title="Top Rated" link="/search?sort=top_rated" />
        {loading
          ? <SkeletonGrid count={6} />
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {topRated.slice(0, 6).map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
            </div>
        }
      </section>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ hero, trending, heroIndex, setHero }) {
  if (!hero) return <div className="h-[75vh] shimmer-bg" />

  const backdrop = getBackdropUrl(hero.backdrop_path) || getImageUrl(hero.poster_path, 'w1280')

  return (
    <div className="relative h-[75vh] min-h-[500px] overflow-hidden">
      {/* Backdrop */}
      <motion.img
        key={hero.id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        src={backdrop}
        alt={hero.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          key={`content-${hero.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full brand-gradient text-white tracking-widest uppercase">
              Trending
            </span>
            <RatingBadge rating={hero.vote_average} size="md" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-white leading-none mb-3">
            {hero.title}
          </h1>

          <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2 mb-6">
            {hero.overview}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Link to={`/movie/${hero.id}`} className="btn-primary">
              View Details
            </Link>
            <FavoriteButton movie={hero} size="lg" />
          </div>
        </motion.div>

        {/* Hero Dots */}
        <div className="flex gap-2 mt-6">
          {trending.slice(0, 5).map((m, i) => (
            <button key={m.id} onClick={() => setHero(m, i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === heroIndex ? 'w-8 bg-brand-500' : 'w-2 bg-white/30'
              }`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, link }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="section-title">{title}</h2>
      <Link to={link} className="text-sm text-brand-400 hover:text-brand-500 transition-colors font-medium">
        View all →
      </Link>
    </div>
  )
}
