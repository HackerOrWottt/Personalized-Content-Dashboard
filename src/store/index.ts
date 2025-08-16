import { configureStore } from '@reduxjs/toolkit'
import { newsApi } from './api/newsApi'
import { tmdbApi } from './api/tmdbApi'
import { socialApi } from './api/socialApi'
import userSlice from './slices/userSlice'
import contentSlice from './slices/contentSlice'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    content: contentSlice,
    ui: uiSlice,
    [newsApi.reducerPath]: newsApi.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      newsApi.middleware,
      tmdbApi.middleware,
      socialApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
