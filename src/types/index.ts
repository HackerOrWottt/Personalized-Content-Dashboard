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

export interface UserPreferences {
  categories: string[]
  language: string
  country: string
  darkMode: boolean
  notifications: boolean
  autoRefresh: boolean
  pageSize: number
}

export interface SearchFilters {
  type?: 'all' | 'news' | 'movie' | 'social'
  category?: string
  dateRange?: 'today' | 'week' | 'month' | 'all'
  sortBy?: 'relevance' | 'date' | 'popularity'
}

export interface DragDropItem {
  id: string
  index: number
  type: string
}

export interface NotificationItem {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  timestamp: string
  autoClose?: boolean
  duration?: number
}

export interface ApiError {
  status: number
  message: string
  details?: any
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface Theme {
  mode: 'light' | 'dark'
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  border: string
}
