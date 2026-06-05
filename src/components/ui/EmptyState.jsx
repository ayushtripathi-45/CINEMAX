import { motion } from 'framer-motion'

const STATES = {
  search: {
    icon: '🔍',
    title: 'No results found',
    sub: "We couldn't find any movies matching your search. Try different keywords.",
  },
  favorites: {
    icon: '🎬',
    title: 'No favorites yet',
    sub: 'Start exploring movies and add the ones you love to your favorites list.',
  },
  error: {
    icon: '⚠️',
    title: 'Something went wrong',
    sub: 'Failed to load content. Please check your API key and try again.',
  },
  generic: {
    icon: '🎥',
    title: 'Nothing here',
    sub: 'There is no content to display right now.',
  },
}

export default function EmptyState({ type = 'generic', message, action }) {
  const state = STATES[type] || STATES.generic

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center px-4"
    >
      <span className="text-6xl mb-6 block">{state.icon}</span>
      <h3 className="text-xl font-semibold text-white mb-2">{state.title}</h3>
      <p className="text-white/40 text-sm max-w-xs">{message || state.sub}</p>
      {action && (
        <div className="mt-6">{action}</div>
      )}
    </motion.div>
  )
}
