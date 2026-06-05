import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cinemax_favorites') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cinemax_favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => {
    setFavorites((prev) =>
      prev.find((m) => m.id === movie.id) ? prev : [movie, ...prev]
    )
  }

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((m) => m.id !== id))
  }

  const isFavorite = (id) => favorites.some((m) => m.id === id)

  const toggleFavorite = (movie) => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavoritesContext = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavoritesContext must be inside FavoritesProvider')
  return ctx
}
