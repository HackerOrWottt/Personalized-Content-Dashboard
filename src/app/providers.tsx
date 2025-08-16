'use client'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// Simple store without persistence for now
const simpleStore = configureStore({
  reducer: {
    // Placeholder reducer
    app: (state = { loaded: true }, action) => state
  }
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={simpleStore}>
      <div className="dark">
        {children}
      </div>
    </Provider>
  )
}
