// Utility to migrate existing user data to the new user-specific storage format
// This ensures backwards compatibility with any existing user data

export const migrateUserData = () => {
  if (typeof window === 'undefined') return

  try {
    // Check if there's any old global favorites data
    const oldFavorites = localStorage.getItem('dashboard_favorites')
    const oldSearchHistory = localStorage.getItem('dashboard_search_history')
    const currentUser = localStorage.getItem('dashboard_current_user')
    
    if ((oldFavorites || oldSearchHistory) && currentUser) {
      const profile = JSON.parse(currentUser)
      const userEmail = profile.email
      
      // Check if user-specific data already exists
      const existingUserData = localStorage.getItem(`dashboard_user_data_${userEmail}`)
      
      if (!existingUserData) {
        // Migrate old data to new user-specific format
        const userData = {
          email: userEmail,
          favorites: oldFavorites ? JSON.parse(oldFavorites) : [],
          searchHistory: oldSearchHistory ? JSON.parse(oldSearchHistory) : [],
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
        
        localStorage.setItem(`dashboard_user_data_${userEmail}`, JSON.stringify(userData))
        
        // Clean up old global data
        localStorage.removeItem('dashboard_favorites')
        localStorage.removeItem('dashboard_search_history')
        
        console.log('User data migrated to new format for:', userEmail)
      }
    }
  } catch (error) {
    console.log('Error during user data migration:', error)
  }
}
