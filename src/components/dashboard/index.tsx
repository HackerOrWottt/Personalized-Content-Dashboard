'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addNotification } from '@/store/slices/uiSlice'
import { DashboardHeader } from './header'
import { DashboardSidebar } from './sidebar'
import { DashboardContent } from './content'

export function Dashboard() {
  const dispatch = useAppDispatch()
  const { settingsModalOpen } = useAppSelector((state) => state.ui)

  useEffect(() => {
    // Welcome notification
    dispatch(addNotification({
      id: 'welcome',
      type: 'info',
      message: 'Welcome to your Personalized Content Dashboard!'
    }))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
