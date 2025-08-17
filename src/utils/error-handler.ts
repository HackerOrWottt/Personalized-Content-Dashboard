// Global error handling utilities

export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class APIError extends Error {
  constructor(message: string, public status: number, public data?: any) {
    super(message)
    this.name = 'APIError'
  }
}

// Enhanced fetch with error handling
export async function enhancedFetch(
  url: string, 
  options?: RequestInit
): Promise<Response> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new APIError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status
      )
    }

    return response
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Network connection failed. Please check your internet connection.')
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError('Request timed out. Please try again.')
    }

    throw error
  }
}

// Error logging utility
export function logError(error: Error, context?: string) {
  console.error(`[Error${context ? ` - ${context}` : ''}]:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  })
}

// User-friendly error messages
export function getUserFriendlyErrorMessage(error: Error): string {
  if (error instanceof NetworkError) {
    return error.message
  }

  if (error instanceof APIError) {
    if (error.status >= 500) {
      return 'Server error. Please try again later.'
    }
    if (error.status === 404) {
      return 'Content not found.'
    }
    if (error.status === 429) {
      return 'Too many requests. Please wait a moment and try again.'
    }
    return 'An error occurred while loading content.'
  }

  if (error.message.toLowerCase().includes('fetch')) {
    return 'Network error. Please check your connection and try again.'
  }

  return 'An unexpected error occurred. Please try again.'
}

// Retry utility for failed requests
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (i === maxRetries) {
        break
      }

      const delay = baseDelay * Math.pow(2, i)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}
