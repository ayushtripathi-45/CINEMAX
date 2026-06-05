export default function RatingBadge({ rating, size = 'sm' }) {
  const score = parseFloat(rating)
  if (!score) return null

  const color =
    score >= 7.5 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
    score >= 6.0 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                   'bg-red-500/20 text-red-400 border-red-500/30'

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5 font-semibold',
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${color} ${sizes[size]}`}>
      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
      </svg>
      {score.toFixed(1)}
    </span>
  )
}
