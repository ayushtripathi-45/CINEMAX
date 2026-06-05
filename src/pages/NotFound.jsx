import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      <span className="font-display text-[120px] leading-none text-white/5 select-none">404</span>
      <h1 className="font-display text-4xl tracking-wider text-white -mt-8 mb-3">PAGE NOT FOUND</h1>
      <p className="text-white/40 text-sm max-w-xs mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </motion.div>
  )
}
