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

// User data structure for persistence
interface UserData {
  email: string
  favorites: string[]
  searchHistory: string[]
  preferences: UserPreferences
}

// Initialize demo account if it doesn't exist
const initializeDemoAccount = () => {
  if (typeof window !== 'undefined') {
    try {
      const users = JSON.parse(localStorage.getItem('dashboard_users') || '[]')
      const demoUser = users.find((u: any) => u.email === 'demo@example.com')

      if (!demoUser) {
        users.push({
          name: 'Demo User',
          email: 'demo@example.com',
          password: 'demo123'
        })
        localStorage.setItem('dashboard_users', JSON.stringify(users))
      }
    } catch (error) {
      console.log('Error initializing demo account:', error)
    }
  }
}

// Save user-specific data to localStorage
const saveUserData = (email: string, data: Partial<UserData>) => {
  if (typeof window !== 'undefined') {
    try {
      const userData = getUserData(email)
      const updatedData = { ...userData, ...data, email }
      localStorage.setItem(`dashboard_user_data_${email}`, JSON.stringify(updatedData))
    } catch (error) {
      console.log('Error saving user data:', error)
    }
  }
}

// Load user-specific data from localStorage
const getUserData = (email: string): UserData => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(`dashboard_user_data_${email}`)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.log('Error loading user data:', error)
    }
  }

  // Return default data if nothing saved
  return {
    email,
    favorites: [],
    searchHistory: [],
    preferences: {
      categories: ['technology', 'business', 'entertainment'],
      language: 'en',
      country: 'us',
      darkMode: true,
      notifications: true,
      autoRefresh: false,
      pageSize: 20,
    }
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      // Initialize demo account
      initializeDemoAccount()
      
      // Check if user was previously logged in
      if (typeof window !== 'undefined') {
        try {
          const savedProfile = localStorage.getItem('dashboard_current_user')
          if (savedProfile) {
            const profile = JSON.parse(savedProfile)
            state.profile = profile
            state.isAuthenticated = true
          }
        } catch (error) {
          console.log('Error loading saved profile:', error)
        }
      }
    },
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
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('dashboard_current_user', JSON.stringify(action.payload))
        } else {
          localStorage.removeItem('dashboard_current_user')
        }
      }
    },
    logout: (state) => {
      state.profile = null
      state.isAuthenticated = false
      state.favorites = []
      state.searchHistory = []
      
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dashboard_current_user')
      }
    },
  },
})

export const {
  initializeAuth,
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
