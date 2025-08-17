import { ContentItem } from '@/types'

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString()
  }
}

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) {
    return 'Just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays < 7) {
    return `${diffDays}d ago`
  } else {
    return formatDate(dateString)
  }
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

export const getContentTypeIcon = (type: ContentItem['type']): string => {
  switch (type) {
    case 'news':
      return '📰'
    case 'movie':
      return '🎬'
    case 'social':
      return '💬'
    default:
      return '📄'
  }
}

export const getContentTypeColor = (type: ContentItem['type']): string => {
  switch (type) {
    case 'news':
      return 'bg-blue-500'
    case 'movie':
      return 'bg-purple-500'
    case 'social':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    technology: 'bg-blue-500',
    business: 'bg-green-500',
    entertainment: 'bg-purple-500',
    health: 'bg-red-500',
    science: 'bg-indigo-500',
    sports: 'bg-orange-500',
    general: 'bg-gray-500',
  }
  return colors[category] || 'bg-gray-500'
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}

export const getImagePlaceholder = (width: number = 400, height: number = 300): string => {
  return `https://via.placeholder.com/${width}x${height}/dc2626/ffffff?text=No+Image`
}

export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
