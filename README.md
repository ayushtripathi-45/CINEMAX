# 🎬 Cinemax — Movie Discovery App

A premium, production-grade movie discovery platform built with React, Tailwind CSS, and the TMDB API.

## ✨ Features
- Hero section with auto-rotating trending movies
- Real-time debounced search with history
- Filter by genre, sort by popularity/rating/year
- Infinite scrolling pagination
- Movie detail pages with cast, trailer, similar movies
- Favorites system with localStorage persistence
- Glassmorphism dark UI with smooth Framer Motion animations
- Fully responsive (mobile → desktop)

## 🚀 Quick Start

### 1. Get your TMDB API Key
1. Sign up at [https://www.themoviedb.org](https://www.themoviedb.org)
2. Go to **Settings → API** and request a free API key

### 2. Setup environment
```bash
cp .env.example .env
# Edit .env and add your TMDB API key
```

### 3. Install & Run
```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Sticky navbar with search + favorites badge
│   │   └── Footer.jsx       # Minimal footer
│   └── ui/
│       ├── MovieCard.jsx     # Card with hover preview
│       ├── SkeletonCard.jsx  # Loading skeleton
│       ├── RatingBadge.jsx   # Color-coded rating pill
│       ├── GenreTag.jsx      # Genre chip
│       ├── FavoriteButton.jsx# Animated heart button
│       ├── SearchBar.jsx     # Search with history dropdown
│       ├── Carousel.jsx      # Horizontal scroll carousel
│       ├── EmptyState.jsx    # Beautiful empty states
│       └── InfiniteScroll.jsx# Intersection Observer scroll
├── pages/
│   ├── Home.jsx             # Hero + trending + popular
│   ├── Search.jsx           # Search + filter + infinite scroll
│   ├── MovieDetail.jsx      # Full detail with cast + similar
│   ├── Favorites.jsx        # Saved movies with sort/filter
│   └── NotFound.jsx         # 404 page
├── hooks/
│   ├── useDebounce.js        # Debounce input
│   ├── useMovies.js          # Generic data fetch hook
│   ├── useInfiniteMovies.js  # Paginated infinite scroll hook
│   ├── useFavorites.js       # Favorites shortcut
│   └── useSearchHistory.js   # History shortcut
├── services/
│   ├── api.js               # Axios instance
│   └── tmdb.js              # All TMDB endpoint helpers
├── context/
│   ├── FavoritesContext.jsx  # Global favorites + localStorage
│   └── SearchContext.jsx     # Global query + history
├── App.jsx                  # Router + providers
├── main.jsx                 # Entry point
└── index.css                # Tailwind + custom classes
```

## 🛠 Tech Stack
- **React 18** + **React Router v6**
- **Tailwind CSS v3** — utility-first styling
- **Framer Motion** — page transitions & animations
- **Axios** — HTTP client
- **TMDB API** — movie data
- **LocalStorage** — favorites & search history persistence

## 🎨 Design Highlights
- Dark theme with `#0a0a0f` base
- `Bebas Neue` display font + `DM Sans` body
- Glassmorphism navbar & cards
- Brand red `#e84040` accent color
- Shimmer skeleton loaders
- CSS custom animations

## 📦 Build
```bash
npm run build   # Production build → dist/
npm run preview # Preview production build
```
