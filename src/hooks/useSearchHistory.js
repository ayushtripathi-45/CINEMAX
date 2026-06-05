import { useSearchContext } from '../context/SearchContext'

export default function useSearchHistory() {
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchContext()
  return { history, addToHistory, removeFromHistory, clearHistory }
}
