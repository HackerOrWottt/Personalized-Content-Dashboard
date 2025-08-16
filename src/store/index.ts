import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

import { newsApi } from './api/newsApi'
import { tmdbApi } from './api/tmdbApi'
import { socialApi } from './api/socialApi'
import userSlice from './slices/userSlice'
import contentSlice from './slices/contentSlice'
import uiSlice from './slices/uiSlice'

// Create storage only on client side
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== 'undefined' 
  ? require('redux-persist/lib/storage').default 
  : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'content'], // Only persist user and content data
}

const rootReducer = combineReducers({
  user: userSlice,
  content: contentSlice,
  ui: uiSlice,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [socialApi.reducerPath]: socialApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      newsApi.middleware,
      tmdbApi.middleware,
      socialApi.middleware
    ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
