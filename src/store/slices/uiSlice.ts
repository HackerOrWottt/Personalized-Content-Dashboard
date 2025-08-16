import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  sidebarOpen: boolean
  activeSection: 'feed' | 'trending' | 'favorites' | 'search'
  mobileMenuOpen: boolean
  settingsModalOpen: boolean
  searchModalOpen: boolean
  draggedItemId: string | null
  isDragging: boolean
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    timestamp: string
  }>
}

const initialState: UIState = {
  sidebarOpen: true,
  activeSection: 'feed',
  mobileMenuOpen: false,
  settingsModalOpen: false,
  searchModalOpen: false,
  draggedItemId: null,
  isDragging: false,
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setActiveSection: (state, action: PayloadAction<UIState['activeSection']>) => {
      state.activeSection = action.payload
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload
    },
    toggleSettingsModal: (state) => {
      state.settingsModalOpen = !state.settingsModalOpen
    },
    toggleSearchModal: (state) => {
      state.searchModalOpen = !state.searchModalOpen
    },
    setDraggedItem: (state, action: PayloadAction<string | null>) => {
      state.draggedItemId = action.payload
      state.isDragging = !!action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        timestamp: new Date().toISOString(),
      }
      state.notifications.unshift(notification)
      // Keep only last 5 notifications
      state.notifications = state.notifications.slice(0, 5)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setActiveSection,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSettingsModal,
  toggleSearchModal,
  setDraggedItem,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions

export default uiSlice.reducer
