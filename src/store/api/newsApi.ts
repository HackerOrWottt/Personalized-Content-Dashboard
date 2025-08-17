import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContentItem } from '../slices/contentSlice'

// Mock news data with SVG data URLs instead of external images
const mockNewsData = [
  {
    id: 'news_1',
    type: 'news' as const,
    title: 'Latest Tech Innovations Transform Digital Landscape',
    description: 'Breakthrough technologies including AI, quantum computing, and blockchain are reshaping industries worldwide.',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGMyNjI2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UZWNoIE5ld3M8L3RleHQ+Cjwvc3ZnPg==',
    url: 'https://example.com/tech-news-1',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'TechDaily',
    author: 'Jane Smith',
    category: 'technology',
  },
  {
    id: 'news_2',
    type: 'news' as const,
    title: 'Global Markets React to Economic Policy Changes',
    description: 'Stock markets worldwide show mixed reactions to new economic policies announced by major governments.',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDU5NjY5Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5CdXNpbmVzcyBOZXdzPC90ZXh0Pgo8L3N2Zz4=',
    url: 'https://example.com/business-news-1',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: 'Business Weekly',
    author: 'John Doe',
    category: 'business',
  },
  {
    id: 'news_3',
    type: 'news' as const,
    title: 'Health Breakthrough: New Treatment Shows Promise',
    description: 'Researchers announce promising results from clinical trials of innovative medical treatment.',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGMyNjI2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IZWFsdGggTmV3czwvdGV4dD4KPC9zdmc+',
    url: 'https://example.com/health-news-1',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'Health Today',
    author: 'Dr. Sarah Wilson',
    category: 'health',
  },
]

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
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY
      if (apiKey && apiKey !== 'demo_key') {
        headers.set('X-API-Key', apiKey)
      }
      return headers
    },
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<ContentItem[], NewsParams>({
      queryFn: async ({ category = 'general', country = 'us', page = 1, pageSize = 20 }) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY
          
          if (!apiKey || apiKey === 'demo_key') {
            // Return mock data when no API key is available
            return { data: mockNewsData.filter(item => item.category === category || category === 'general') }
          }

          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}`,
            {
              headers: {
                'X-API-Key': apiKey,
              },
            }
          )

          if (!response.ok) {
            throw new Error('API request failed')
          }

          const data = await response.json()
          const transformedData = data.articles.map((article: any, index: number) => ({
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

          return { data: transformedData }
        } catch (error) {
          // Fallback to mock data on error
          return { data: mockNewsData.filter(item => item.category === category || category === 'general') }
        }
      },
      providesTags: ['News'],
    }),
    searchNews: builder.query<ContentItem[], { q: string; page?: number; pageSize?: number }>({
      queryFn: async ({ q, page = 1, pageSize = 20 }) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY
          
          if (!apiKey || apiKey === 'demo_key') {
            // Return filtered mock data
            const filtered = mockNewsData.filter(item => 
              item.title.toLowerCase().includes(q.toLowerCase()) ||
              item.description.toLowerCase().includes(q.toLowerCase())
            )
            return { data: filtered }
          }

          const response = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&sortBy=relevancy`,
            {
              headers: {
                'X-API-Key': apiKey,
              },
            }
          )

          if (!response.ok) {
            throw new Error('API request failed')
          }

          const data = await response.json()
          const transformedData = data.articles.map((article: any, index: number) => ({
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

          return { data: transformedData }
        } catch (error) {
          // Fallback to filtered mock data
          const filtered = mockNewsData.filter(item => 
            item.title.toLowerCase().includes(q.toLowerCase()) ||
            item.description.toLowerCase().includes(q.toLowerCase())
          )
          return { data: filtered }
        }
      },
      providesTags: ['News'],
    }),
  }),
})

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi
