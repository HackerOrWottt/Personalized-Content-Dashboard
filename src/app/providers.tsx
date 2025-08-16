'use client'

import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Provider store={store}>
      <div className="dark">
        {children}
      </div>
    </Provider>
  )
}
