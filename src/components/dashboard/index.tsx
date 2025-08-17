'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addNotification } from '@/store/slices/uiSlice'
import { ProtectedRoute } from '../auth/protected-route'
import { DashboardHeader } from './header'
import { DashboardSidebar } from './sidebar'
import { DashboardContent } from './content'

export function Dashboard() {
  const dispatch = useAppDispatch()
  const { settingsModalOpen } = useAppSelector((state) => state.ui)
  const { isAuthenticated, profile } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated && profile) {
      // Welcome notification for authenticated users
      dispatch(addNotification({
        id: 'welcome',
        type: 'success',
        message: `Welcome back, ${profile.name}! Your dashboard is ready.`
      }))
    }
  }, [dispatch, isAuthenticated, profile])

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header - Always show for branding */}
      <DashboardHeader />
      
      {/* Protected Content */}
      <ProtectedRoute>
        <div className="flex h-[calc(100vh-73px)]">
          {/* Sidebar */}
          <DashboardSidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <DashboardContent />
          </main>
        </div>
      </ProtectedRoute>
    </div>
  )
}
