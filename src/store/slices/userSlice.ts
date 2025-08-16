import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserPreferences {
  categories: string[]
  language: string
  country: string
  darkMode: boolean
  notifications: boolean
  autoRefresh: boolean
  pageSize: number
}

export interface UserState {
  preferences: UserPreferences
  favorites: string[]
  searchHistory: string[]
  isAuthenticated: boolean
  profile: {
    name: string
    email: string
    avatar?: string
  } | null
}

const initialState: UserState = {
  preferences: {
    categories: ['technology', 'business', 'entertainment'],
    language: 'en',
    country: 'us',
    darkMode: true,
    notifications: true,
    autoRefresh: false,
    pageSize: 20,
  },
  favorites: [],
  searchHistory: [],
  isAuthenticated: false,
  profile: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload)
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim()
      if (query && !state.searchHistory.includes(query)) {
        state.searchHistory.unshift(query)
        // Keep only last 10 searches
        state.searchHistory = state.searchHistory.slice(0, 10)
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = []
    },
    toggleDarkMode: (state) => {
      state.preferences.darkMode = !state.preferences.darkMode
    },
    setProfile: (state, action: PayloadAction<UserState['profile']>) => {
      state.profile = action.payload
      state.isAuthenticated = !!action.payload
    },
    logout: (state) => {
      state.profile = null
      state.isAuthenticated = false
    },
  },
})

export const {
  updatePreferences,
  addToFavorites,
  removeFromFavorites,
  addToSearchHistory,
  clearSearchHistory,
  toggleDarkMode,
  setProfile,
  logout,
} = userSlice.actions

export default userSlice.reducer
