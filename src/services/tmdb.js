import api from './api'

// ─── Image Helpers ───────────────────────────────────────────────
const IMG = import.meta.env.VITE_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p'

export const getImageUrl = (path, size = 'w500') =>
  path ? `${IMG}/${size}${path}` : null

export const getBackdropUrl = (path) => getImageUrl(path, 'original')

// ─── Movies ──────────────────────────────────────────────────────
export const getTrending = (timeWindow = 'week') =>
  api.get(`/trending/movie/${timeWindow}`)

export const getPopular = (page = 1) =>
  api.get('/movie/popular', { params: { page } })

export const getTopRated = (page = 1) =>
  api.get('/movie/top_rated', { params: { page } })

export const getNowPlaying = (page = 1) =>
  api.get('/movie/now_playing', { params: { page } })

export const getUpcoming = (page = 1) =>
  api.get('/movie/upcoming', { params: { page } })

export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,similar,videos,keywords' },
  })

export const getSimilarMovies = (id, page = 1) =>
  api.get(`/movie/${id}/similar`, { params: { page } })

export const getMovieCredits = (id) =>
  api.get(`/movie/${id}/credits`)

// ─── Search ──────────────────────────────────────────────────────
export const searchMovies = (query, page = 1) =>
  api.get('/search/movie', { params: { query, page, include_adult: false } })

// ─── Genres ──────────────────────────────────────────────────────
export const getGenres = () =>
  api.get('/genre/movie/list')

export const getMoviesByGenre = (genreId, page = 1, sortBy = 'popularity.desc') =>
  api.get('/discover/movie', {
    params: { with_genres: genreId, page, sort_by: sortBy },
  })

// ─── Discover ────────────────────────────────────────────────────
export const discoverMovies = (params = {}) =>
  api.get('/discover/movie', { params })
