import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContentItem } from '../slices/contentSlice'

// Mock social media data generator
const generateMockSocialPosts = (count: number = 20, hashtag?: string): ContentItem[] => {
  const mockPosts: ContentItem[] = []
  const hashtags = ['#tech', '#programming', '#react', '#typescript', '#webdev', '#startup', '#ai', '#design']
  const authors = ['@techguru', '@reactdev', '@designpro', '@startuplife', '@codemaster', '@webdevtips']
  const baseTexts = [
    'Just discovered an amazing new feature in',
    'Working on an exciting project with',
    'Great insights about',
    'Learning something new about',
    'Excited to share my thoughts on',
    'Building something cool with',
  ]
  
  for (let i = 0; i < count; i++) {
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)]
    const randomHashtag = hashtag || hashtags[Math.floor(Math.random() * hashtags.length)]
    const randomText = baseTexts[Math.floor(Math.random() * baseTexts.length)]
    
    mockPosts.push({
      id: `social_${Date.now()}_${i}`,
      type: 'social' as const,
      title: `${randomText} ${randomHashtag}`,
      description: `This is a mock social media post about ${randomHashtag}. In a real implementation, this would be fetched from Twitter, Instagram, or other social media APIs.`,
      imageUrl: Math.random() > 0.5 ? `https://via.placeholder.com/400x300?text=Social+Post+${i + 1}` : undefined,
      url: `https://example.com/post/${i + 1}`,
      publishedAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Random time within last week
      source: 'Social Media',
      author: randomAuthor,
      tags: [randomHashtag.replace('#', '')],
      category: 'social',
    })
  }
  
  return mockPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/mock/', // Mock endpoint
  }),
  tagTypes: ['Social'],
  endpoints: (builder) => ({
    getSocialPosts: builder.query<ContentItem[], { hashtag?: string; page?: number; pageSize?: number }>({
      queryFn: ({ hashtag, page = 1, pageSize = 20 }) => {
        // Simulate API delay
        return new Promise((resolve) => {
          setTimeout(() => {
            const startIndex = (page - 1) * pageSize
            const allPosts = generateMockSocialPosts(100, hashtag)
            const paginatedPosts = allPosts.slice(startIndex, startIndex + pageSize)
            
            resolve({ data: paginatedPosts })
          }, 500)
        })
      },
      providesTags: ['Social'],
    }),
    getTrendingSocial: builder.query<ContentItem[], { page?: number; pageSize?: number }>({
      queryFn: ({ page = 1, pageSize = 20 }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const trendingPosts = generateMockSocialPosts(pageSize)
            // Sort by engagement (simulated)
            trendingPosts.sort(() => Math.random() - 0.5)
            
            resolve({ data: trendingPosts })
          }, 300)
        })
      },
      providesTags: ['Social'],
    }),
    searchSocialPosts: builder.query<ContentItem[], { query: string; page?: number; pageSize?: number }>({
      queryFn: ({ query, page = 1, pageSize = 20 }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const searchResults = generateMockSocialPosts(pageSize)
            // Filter results to match query (simple simulation)
            const filteredResults = searchResults.filter(post => 
              post.title.toLowerCase().includes(query.toLowerCase()) ||
              post.description.toLowerCase().includes(query.toLowerCase())
            )
            
            resolve({ data: filteredResults })
          }, 400)
        })
      },
      providesTags: ['Social'],
    }),
  }),
})

export const { 
  useGetSocialPostsQuery, 
  useGetTrendingSocialQuery, 
  useSearchSocialPostsQuery 
} = socialApi
