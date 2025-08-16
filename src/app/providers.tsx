'use client'

import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { ThemeProvider } from '@/components/theme-provider'
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
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
