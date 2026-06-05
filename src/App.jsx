import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { FavoritesProvider } from './context/FavoritesContext'
import { SearchProvider } from './context/SearchContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <SearchProvider>
          <div className="min-h-screen flex flex-col bg-dark-900">
            <Navbar />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/movie/:id" element={<MovieDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </SearchProvider>
      </FavoritesProvider>
    </BrowserRouter>
  )
}
