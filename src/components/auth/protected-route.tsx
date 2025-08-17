'use client'

import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { AuthModal } from './auth-modal'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <>
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="w-24 h-24 bg-red-gradient rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-white font-bold text-3xl">P</span>
              </div>

              {/* Lock Icon */}
              <div className="w-16 h-16 bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-dark-text mb-4">
                Authentication Required
              </h1>
              
              <p className="text-dark-muted mb-8 text-lg">
                Please sign in to access your personalized content dashboard
              </p>

              <div className="space-y-4">
                <Button
                  onClick={() => setShowAuthModal(true)}
                  size="lg"
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to Continue
                </Button>

                <div className="text-sm text-dark-muted">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-accent-red hover:underline font-medium"
                  >
                    Create one now
                  </button>
                </div>
              </div>

              {/* Features Preview */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="bg-dark-surface p-4 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-sm">📰</span>
                  </div>
                  <p className="text-xs text-dark-muted">News Feed</p>
                </div>
                <div className="bg-dark-surface p-4 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-sm">🎬</span>
                  </div>
                  <p className="text-xs text-dark-muted">Movies</p>
                </div>
                <div className="bg-dark-surface p-4 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-sm">❤��</span>
                  </div>
                  <p className="text-xs text-dark-muted">Favorites</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    )
  }

  return <>{children}</>
}
