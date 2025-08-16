import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContentItem } from '../slices/contentSlice'

interface TMDBMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  popularity: number
}

interface TMDBResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

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
      // For demo purposes, using a mock API key
      headers.set('Authorization', `Bearer ${process.env.TMDB_API_KEY || 'demo_key'}`)
      return headers
    },
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<ContentItem[], TMDBParams>({
      query: ({ page = 1, language = 'en-US' }) => ({
        url: 'trending/movie/day',
        params: {
          page,
          language,
        },
      }),
      transformResponse: (response: TMDBResponse): ContentItem[] => {
        return response.results.map((movie) => ({
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
      },
      providesTags: ['Movies'],
    }),
    getPopularMovies: builder.query<ContentItem[], TMDBParams>({
      query: ({ page = 1, language = 'en-US', region = 'US' }) => ({
        url: 'movie/popular',
        params: {
          page,
          language,
          region,
        },
      }),
      transformResponse: (response: TMDBResponse): ContentItem[] => {
        return response.results.map((movie) => ({
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
      },
      providesTags: ['Movies'],
    }),
    searchMovies: builder.query<ContentItem[], { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: 'search/movie',
        params: {
          query,
          page,
          language: 'en-US',
        },
      }),
      transformResponse: (response: TMDBResponse): ContentItem[] => {
        return response.results.map((movie) => ({
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
