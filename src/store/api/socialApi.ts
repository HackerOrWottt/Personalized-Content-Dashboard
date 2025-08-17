import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContentItem } from '../slices/contentSlice'

// Generate SVG data URL for social post placeholders
const generateSocialImageSVG = (postNumber: number): string => {
  const colors = ['#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2']
  const color = colors[postNumber % colors.length]
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy=".3em">Social</text>
    <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy=".3em">Post ${postNumber}</text>
  </svg>`
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

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
      imageUrl: Math.random() > 0.3 ? generateSocialImageSVG(i + 1) : undefined,
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
          }, 300)
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
          }, 200)
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
          }, 250)
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
