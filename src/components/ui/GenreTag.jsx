// genreId → name map (offline fallback)
const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
}

export default function GenreTag({ id, name }) {
  const label = name || GENRE_MAP[id] || 'Unknown'
  return (
    <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/8 text-white/60 border border-white/10 whitespace-nowrap">
      {label}
    </span>
  )
}

export { GENRE_MAP }
