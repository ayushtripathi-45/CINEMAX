import { createContext, useContext, useState, useEffect } from 'react'

const SearchContext = createContext(null)

const MAX_HISTORY = 10

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cinemax_search_history') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cinemax_search_history', JSON.stringify(history))
  }, [history])

  const addToHistory = (term) => {
    if (!term.trim()) return
    setHistory((prev) => {
      const filtered = prev.filter((h) => h !== term)
      return [term, ...filtered].slice(0, MAX_HISTORY)
    })
  }

  const removeFromHistory = (term) => {
    setHistory((prev) => prev.filter((h) => h !== term))
  }

  const clearHistory = () => setHistory([])

  return (
    <SearchContext.Provider
      value={{ query, setQuery, history, addToHistory, removeFromHistory, clearHistory }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearchContext must be inside SearchProvider')
  return ctx
}
