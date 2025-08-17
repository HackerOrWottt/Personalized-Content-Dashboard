import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ContentItem {
  id: string
  type: 'news' | 'movie' | 'social'
  title: string
  description: string
  imageUrl?: string
  url?: string
  publishedAt: string
  source: string
  category?: string
  rating?: number
  author?: string
  tags?: string[]
}

export interface ContentState {
  personalizedFeed: ContentItem[]
  trendingContent: ContentItem[]
  searchResults: ContentItem[]
  currentSearchQuery: string
  feedOrder: string[]
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
  hasMore: boolean
  currentPage: number
}

const initialState: ContentState = {
  personalizedFeed: [],
  trendingContent: [],
  searchResults: [],
  currentSearchQuery: '',
  feedOrder: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
  hasMore: true,
  currentPage: 1,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setPersonalizedFeed: (state, action: PayloadAction<ContentItem[]>) => {
      state.personalizedFeed = action.payload
      state.feedOrder = action.payload.map(item => item.id)
      state.lastUpdated = new Date().toISOString()
    },
    appendToPersonalizedFeed: (state, action: PayloadAction<ContentItem[]>) => {
      const newItems = action.payload.filter(
        item => !state.personalizedFeed.find(existing => existing.id === item.id)
      )
      state.personalizedFeed.push(...newItems)
      state.feedOrder.push(...newItems.map(item => item.id))
    },
    setTrendingContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.trendingContent = action.payload
    },
    setSearchResults: (state, action: PayloadAction<ContentItem[]>) => {
      state.searchResults = action.payload
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.currentSearchQuery = action.payload
    },
    reorderFeed: (state, action: PayloadAction<string[]>) => {
      state.feedOrder = action.payload
      // Reorder the actual feed based on new order
      const reorderedFeed: ContentItem[] = []
      action.payload.forEach(id => {
        const item = state.personalizedFeed.find(item => item.id === id)
        if (item) {
          reorderedFeed.push(item)
        }
      })
      state.personalizedFeed = reorderedFeed
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },
    incrementPage: (state) => {
      state.currentPage += 1
    },
    resetPage: (state) => {
      state.currentPage = 1
      state.hasMore = true
    },
    clearSearchResults: (state) => {
      state.searchResults = []
      state.currentSearchQuery = ''
    },
  },
})

export const {
  setPersonalizedFeed,
  appendToPersonalizedFeed,
  setTrendingContent,
  setSearchResults,
  updateSearchQuery,
  reorderFeed,
  setLoading,
  setError,
  setHasMore,
  incrementPage,
  resetPage,
  clearSearchResults,
} = contentSlice.actions

export default contentSlice.reducer
