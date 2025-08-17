'use client'

import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { initializeAuth } from '@/store/slices/userSlice'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Initialize authentication state
    store.dispatch(initializeAuth())
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-dark-muted mt-4">Initializing dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="dark">
          {children}
        </div>
      </Provider>
    </ErrorBoundary>
  )
}
