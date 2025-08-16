import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContentItem } from '../slices/contentSlice'

// Mock movie data for demo purposes
const mockMovieData = [
  {
    id: 'movie_1',
    type: 'movie' as const,
    title: 'Quantum Horizons',
    description: 'A thrilling sci-fi adventure exploring the boundaries of quantum physics and human consciousness in a dystopian future.',
    imageUrl: 'https://via.placeholder.com/500x750/7c3aed/ffffff?text=Quantum+Horizons',
    url: 'https://www.themoviedb.org/movie/1',
    publishedAt: '2024-01-15',
    source: 'TMDB',
    rating: 8.5,
    category: 'entertainment',
  },
  {
    id: 'movie_2',
    type: 'movie' as const,
    title: 'The Digital Divide',
    description: 'A gripping drama about technology\'s impact on human relationships in the modern world.',
    imageUrl: 'https://via.placeholder.com/500x750/dc2626/ffffff?text=Digital+Divide',
    url: 'https://www.themoviedb.org/movie/2',
    publishedAt: '2024-02-20',
    source: 'TMDB',
    rating: 7.8,
    category: 'entertainment',
  },
  {
    id: 'movie_3',
    type: 'movie' as const,
    title: 'Neon Nights',
    description: 'An action-packed cyberpunk thriller set in a neon-lit metropolis where hackers fight for freedom.',
    imageUrl: 'https://via.placeholder.com/500x750/059669/ffffff?text=Neon+Nights',
    url: 'https://www.themoviedb.org/movie/3',
    publishedAt: '2024-03-10',
    source: 'TMDB',
    rating: 9.1,
    category: 'entertainment',
  },
]

interface TMDBParams {
  page?: number
  language?: string
  region?: string
  query?: string
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY
      if (apiKey && apiKey !== 'demo_key') {
        headers.set('Authorization', `Bearer ${apiKey}`)
      }
      return headers
    },
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<ContentItem[], TMDBParams>({
      queryFn: async ({ page = 1, language = 'en-US' }) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY
          
          if (!apiKey || apiKey === 'demo_key') {
            return { data: mockMovieData }
          }

          const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?page=${page}&language=${language}`,
            {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
              },
            }
          )

          if (!response.ok) {
            throw new Error('API request failed')
          }

          const data = await response.json()
          const transformedData = data.results.map((movie: any) => ({
            id: `movie_${movie.id}`,
            type: 'movie' as const,
            title: movie.title,
            description: movie.overview,
            imageUrl: movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : undefined,
            url: `https://www.themoviedb.org/movie/${movie.id}`,
            publishedAt: movie.release_date,
            source: 'TMDB',
            rating: movie.vote_average,
            category: 'entertainment',
          }))

          return { data: transformedData }
        } catch (error) {
          return { data: mockMovieData }
        }
      },
      providesTags: ['Movies'],
    }),
    getPopularMovies: builder.query<ContentItem[], TMDBParams>({
      queryFn: async ({ page = 1, language = 'en-US', region = 'US' }) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY
          
          if (!apiKey || apiKey === 'demo_key') {
            return { data: mockMovieData }
          }

          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?page=${page}&language=${language}&region=${region}`,
            {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
              },
            }
          )

          if (!response.ok) {
            throw new Error('API request failed')
          }

          const data = await response.json()
          const transformedData = data.results.map((movie: any) => ({
            id: `movie_popular_${movie.id}`,
            type: 'movie' as const,
            title: movie.title,
            description: movie.overview,
            imageUrl: movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : undefined,
            url: `https://www.themoviedb.org/movie/${movie.id}`,
            publishedAt: movie.release_date,
            source: 'TMDB',
            rating: movie.vote_average,
            category: 'entertainment',
          }))

          return { data: transformedData }
        } catch (error) {
          return { data: mockMovieData }
        }
      },
      providesTags: ['Movies'],
    }),
    searchMovies: builder.query<ContentItem[], { query: string; page?: number }>({
      queryFn: async ({ query, page = 1 }) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY
          
          if (!apiKey || apiKey === 'demo_key') {
            const filtered = mockMovieData.filter(movie => 
              movie.title.toLowerCase().includes(query.toLowerCase()) ||
              movie.description.toLowerCase().includes(query.toLowerCase())
            )
            return { data: filtered }
          }

          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=en-US`,
            {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
              },
            }
          )

          if (!response.ok) {
            throw new Error('API request failed')
          }

          const data = await response.json()
          const transformedData = data.results.map((movie: any) => ({
            id: `movie_search_${movie.id}`,
            type: 'movie' as const,
            title: movie.title,
            description: movie.overview,
            imageUrl: movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : undefined,
            url: `https://www.themoviedb.org/movie/${movie.id}`,
            publishedAt: movie.release_date,
            source: 'TMDB',
            rating: movie.vote_average,
            category: 'entertainment',
          }))

          return { data: transformedData }
        } catch (error) {
          const filtered = mockMovieData.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.description.toLowerCase().includes(query.toLowerCase())
          )
          return { data: filtered }
        }
      },
      providesTags: ['Movies'],
    }),
  }),
})

export const { 
  useGetTrendingMoviesQuery, 
  useGetPopularMoviesQuery, 
  useSearchMoviesQuery 
} = tmdbApi
