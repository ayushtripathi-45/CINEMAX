import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchContext } from '../../context/SearchContext'
import useSearchHistory from '../../hooks/useSearchHistory'

export default function SearchBar({ placeholder = 'Search for movies...', large = false }) {
  const [focused, setFocused]   = useState(false)
  const { query, setQuery }     = useSearchContext()
  const { history, addToHistory, removeFromHistory } = useSearchHistory()
  const navigate                = useNavigate()
  const inputRef                = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    addToHistory(query.trim())
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    inputRef.current?.blur()
    setFocused(false)
  }

  const pickHistory = (term) => {
    setQuery(term)
    addToHistory(term)
    navigate(`/search?q=${encodeURIComponent(term)}`)
    setFocused(false)
  }

  const showDropdown = focused && history.length > 0 && !query

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center ${large ? 'rounded-2xl' : 'rounded-xl'} overflow-hidden
            bg-dark-700 border transition-all duration-200
            ${focused ? 'border-brand-500/50 shadow-[0_0_0_3px_rgba(232,64,64,0.1)]' : 'border-white/10'}`}>
          {/* Search Icon */}
          <span className={`pl-4 text-white/40 ${large ? 'pl-5' : ''}`}>
            <svg className={large ? 'w-5 h-5' : 'w-4 h-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder={placeholder}
            className={`flex-1 bg-transparent text-white placeholder-white/30 outline-none
              ${large ? 'px-4 py-4 text-lg' : 'px-3 py-3 text-sm'}`}
          />

          {/* Clear */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="pr-3 text-white/30 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Submit */}
          <button type="submit"
            className={`btn-primary rounded-none ${large ? 'px-6 py-4 text-base' : 'px-5 py-3 text-sm'}`}>
            Search
          </button>
        </div>
      </form>

      {/* History Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-xl overflow-hidden z-50"
          >
            <p className="text-xs text-white/30 px-4 pt-3 pb-1">Recent Searches</p>
            {history.map((term) => (
              <div key={term}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5 cursor-pointer group">
                <button onClick={() => pickHistory(term)}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white flex-1 text-left">
                  <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {term}
                </button>
                <button onClick={() => removeFromHistory(term)}
                  className="text-white/20 hover:text-white/60 opacity-0 group-hover:opacity-100 transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
