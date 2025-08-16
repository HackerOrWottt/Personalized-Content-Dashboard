import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

import { newsApi } from './api/newsApi'
import { tmdbApi } from './api/tmdbApi'
import { socialApi } from './api/socialApi'
import userSlice from './slices/userSlice'
import contentSlice from './slices/contentSlice'
import uiSlice from './slices/uiSlice'

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
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
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
