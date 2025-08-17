import { configureStore } from '@reduxjs/toolkit'
import userReducer, { 
  addToFavorites, 
  removeFromFavorites, 
  setProfile, 
  logout,
  initializeAuth,
  addToSearchHistory,
  updatePreferences
} from '@/store/slices/userSlice'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('UserSlice Data Persistence', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    })
    localStorageMock.clear()
  })

  const testUser = {
    name: 'Test User',
    email: 'test@example.com'
  }

  it('should persist favorites when user signs in', () => {
    // Set up user with some favorites
    store.dispatch(setProfile(testUser))
    store.dispatch(addToFavorites('news-1'))
    store.dispatch(addToFavorites('movie-1'))

    // Check that data is saved to localStorage
    const savedData = JSON.parse(
      localStorage.getItem('dashboard_user_data_test@example.com') || '{}'
    )
    expect(savedData.favorites).toEqual(['news-1', 'movie-1'])
  })

  it('should restore user data when signing in', () => {
    // Pre-populate localStorage with user data
    const userData = {
      email: 'test@example.com',
      favorites: ['news-2', 'movie-2'],
      searchHistory: ['react', 'typescript'],
      preferences: {
        categories: ['sports', 'science'],
        language: 'en',
        country: 'us',
        darkMode: false,
        notifications: false,
        autoRefresh: true,
        pageSize: 15
      }
    }
    localStorage.setItem('dashboard_user_data_test@example.com', JSON.stringify(userData))

    // Sign in user
    store.dispatch(setProfile(testUser))

    const state = store.getState().user
    expect(state.favorites).toEqual(['news-2', 'movie-2'])
    expect(state.searchHistory).toEqual(['react', 'typescript'])
    expect(state.preferences.categories).toEqual(['sports', 'science'])
    expect(state.preferences.darkMode).toBe(false)
  })

  it('should preserve data across logout and signin', () => {
    // Sign in and add some data
    store.dispatch(setProfile(testUser))
    store.dispatch(addToFavorites('news-3'))
    store.dispatch(addToSearchHistory('javascript'))
    store.dispatch(updatePreferences({ darkMode: false, pageSize: 25 }))

    // Logout
    store.dispatch(logout())

    // State should be reset
    let state = store.getState().user
    expect(state.favorites).toEqual([])
    expect(state.searchHistory).toEqual([])
    expect(state.isAuthenticated).toBe(false)

    // Sign in again
    store.dispatch(setProfile(testUser))

    // Data should be restored
    state = store.getState().user
    expect(state.favorites).toEqual(['news-3'])
    expect(state.searchHistory).toEqual(['javascript'])
    expect(state.preferences.darkMode).toBe(false)
    expect(state.preferences.pageSize).toBe(25)
  })

  it('should handle multiple users with separate data', () => {
    const user1 = { name: 'User 1', email: 'user1@example.com' }
    const user2 = { name: 'User 2', email: 'user2@example.com' }

    // User 1 signs in and adds favorites
    store.dispatch(setProfile(user1))
    store.dispatch(addToFavorites('user1-fav-1'))
    store.dispatch(addToSearchHistory('user1-search'))

    // User 1 logs out
    store.dispatch(logout())

    // User 2 signs in and adds different favorites
    store.dispatch(setProfile(user2))
    store.dispatch(addToFavorites('user2-fav-1'))
    store.dispatch(addToSearchHistory('user2-search'))

    // User 2 logs out
    store.dispatch(logout())

    // User 1 signs in again
    store.dispatch(setProfile(user1))
    let state = store.getState().user
    expect(state.favorites).toEqual(['user1-fav-1'])
    expect(state.searchHistory).toEqual(['user1-search'])

    // User 1 logs out, User 2 signs in again
    store.dispatch(logout())
    store.dispatch(setProfile(user2))
    state = store.getState().user
    expect(state.favorites).toEqual(['user2-fav-1'])
    expect(state.searchHistory).toEqual(['user2-search'])
  })

  it('should remove favorites and persist changes', () => {
    store.dispatch(setProfile(testUser))
    store.dispatch(addToFavorites('news-1'))
    store.dispatch(addToFavorites('news-2'))
    store.dispatch(addToFavorites('news-3'))

    // Remove a favorite
    store.dispatch(removeFromFavorites('news-2'))

    const state = store.getState().user
    expect(state.favorites).toEqual(['news-1', 'news-3'])

    // Check persistence
    const savedData = JSON.parse(
      localStorage.getItem('dashboard_user_data_test@example.com') || '{}'
    )
    expect(savedData.favorites).toEqual(['news-1', 'news-3'])
  })
})
