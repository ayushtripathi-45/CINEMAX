import axios from 'axios'



const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
  params: {
    language: 'en-US',
  },
})

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('API Error:', err.response?.data?.status_message || err.message)
    return Promise.reject(err)
  }
)

export default api