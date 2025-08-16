import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContentItem } from '../slices/contentSlice'

interface NewsResponse {
  status: string
  totalResults: number
  articles: Array<{
    source: { id: string | null; name: string }
    author: string | null
    title: string
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
  }>
}

interface NewsParams {
  category?: string
  country?: string
  q?: string
  page?: number
  pageSize?: number
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
    prepareHeaders: (headers) => {
      // For demo purposes, using a mock API key
      headers.set('X-API-Key', process.env.NEWS_API_KEY || 'demo_key')
      return headers
    },
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<ContentItem[], NewsParams>({
      query: ({ category = 'general', country = 'us', page = 1, pageSize = 20 }) => ({
        url: 'top-headlines',
        params: {
          category,
          country,
          page,
          pageSize,
        },
      }),
      transformResponse: (response: NewsResponse): ContentItem[] => {
        return response.articles.map((article, index) => ({
          id: `news_${Date.now()}_${index}`,
          type: 'news' as const,
          title: article.title,
          description: article.description || '',
          imageUrl: article.urlToImage || undefined,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name,
          author: article.author || undefined,
          category,
        }))
      },
      providesTags: ['News'],
    }),
    searchNews: builder.query<ContentItem[], { q: string; page?: number; pageSize?: number }>({
      query: ({ q, page = 1, pageSize = 20 }) => ({
        url: 'everything',
        params: {
          q,
          page,
          pageSize,
          sortBy: 'relevancy',
        },
      }),
      transformResponse: (response: NewsResponse): ContentItem[] => {
        return response.articles.map((article, index) => ({
          id: `news_search_${Date.now()}_${index}`,
          type: 'news' as const,
          title: article.title,
          description: article.description || '',
          imageUrl: article.urlToImage || undefined,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name,
          author: article.author || undefined,
        }))
      },
      providesTags: ['News'],
    }),
  }),
})

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi
