'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleSidebar, toggleMobileMenu } from '@/store/slices/uiSlice'
import { logout } from '@/store/slices/userSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthModal } from '../auth/auth-modal'

export function DashboardHeader() {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  const { sidebarOpen, mobileMenuOpen } = useAppSelector((state) => state.ui)
  const { profile, isAuthenticated } = useAppSelector((state) => state.user)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Search for:', searchQuery)
      // TODO: Implement search functionality
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    setShowProfileMenu(false)
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

          {/* Center section - Search (only show if authenticated) */}
          {isAuthenticated && (
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
          )}

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Mobile search button (only if authenticated) */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            )}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              title="Toggle theme"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </Button>

            {/* Settings (only if authenticated) */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Button>
            )}

            {/* User profile or Sign In */}
            {isAuthenticated && profile ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 hover:bg-dark-bg p-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-red-gradient rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-dark-text text-sm hidden lg:block">
                    {profile.name}
                  </span>
                  <svg className="w-4 h-4 text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-xl z-50">
                    <div className="p-3 border-b border-dark-border">
                      <p className="text-sm font-medium text-dark-text">{profile.name}</p>
                      <p className="text-xs text-dark-muted">{profile.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-dark-text hover:bg-dark-bg rounded-md flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                size="sm" 
                variant="primary"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}
