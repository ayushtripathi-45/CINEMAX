import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl tracking-widest text-white/60 hover:text-white transition-colors">
            CINEMAX
          </Link>
          <p className="text-sm text-white/30">
            Powered by{' '}
            <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer"
              className="text-brand-400 hover:text-brand-500 transition-colors">
              TMDB
            </a>
            {' '}· Built for portfolio purposes
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link to="/search" className="hover:text-white/60 transition-colors">Browse</Link>
            <Link to="/favorites" className="hover:text-white/60 transition-colors">Favorites</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
