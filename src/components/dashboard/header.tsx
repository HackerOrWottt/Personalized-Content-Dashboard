'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleSidebar, toggleMobileMenu, toggleSettingsModal } from '@/store/slices/uiSlice'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchModal } from './search-modal'
import { NotificationBell } from './notification-bell'

export function DashboardHeader() {
  const dispatch = useAppDispatch()
  const { theme, toggleTheme } = useTheme()
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { sidebarOpen, mobileMenuOpen } = useAppSelector((state) => state.ui)
  const { profile, isAuthenticated } = useAppSelector((state) => state.user)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchModalOpen(true)
    }
  }

  return (
    <>
      <header className="bg-dark-surface border-b border-dark-border px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>

            {/* Desktop sidebar toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:block"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>

            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-8 h-8 bg-red-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h1 className="text-xl font-bold text-dark-text hidden sm:block">
                Personal Dashboard
              </h1>
            </motion.div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Search news, movies, posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                className="bg-dark-bg border-dark-border focus:border-accent-red"
              />
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSearchModalOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </Button>

            {/* Notifications */}
            <NotificationBell />

            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleSettingsModal())}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>

            {/* User profile */}
            {isAuthenticated && profile ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-dark-text text-sm hidden lg:block">
                  {profile.name}
                </span>
              </div>
            ) : (
              <Button size="sm" variant="primary">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        initialQuery={searchQuery}
      />
    </>
  )
}
