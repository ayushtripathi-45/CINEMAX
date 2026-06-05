import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useFavorites from '../../hooks/useFavorites'
import { useSearchContext } from '../../context/SearchContext'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [searchOpen, setSearch]   = useState(false)
  const [localQ, setLocalQ]       = useState('')
  const { favorites }             = useFavorites()
  const { setQuery }              = useSearchContext()
  const navigate                  = useNavigate()
  const location                  = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!localQ.trim()) return
    setQuery(localQ)
    navigate(`/search?q=${encodeURIComponent(localQ)}`)
    setSearch(false)
    setLocalQ('')
  }

  const navLinks = [
    { to: '/',          label: 'Home'      },
    { to: '/search',    label: 'Browse'    },
    { to: '/favorites', label: 'Favorites' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl tracking-widest text-white group-hover:text-brand-400 transition-colors">
              CINEMAX
            </span>
            <span className="w-1.5 h-1.5 rounded-full brand-gradient mt-0.5" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  location.pathname === to
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {location.pathname === to && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/8 rounded-lg"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setSearch((p) => !p)}
              className="p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Favorites Badge */}
            <Link to="/favorites" className="relative p-2 text-white/60 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 brand-gradient rounded-full text-[10px] font-bold flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="pb-4"
            >
              <form onSubmit={handleSearch}>
                <input
                  autoFocus
                  type="text"
                  value={localQ}
                  onChange={(e) => setLocalQ(e.target.value)}
                  placeholder="Search movies..."
                  className="input-base"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden pb-4"
            >
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
