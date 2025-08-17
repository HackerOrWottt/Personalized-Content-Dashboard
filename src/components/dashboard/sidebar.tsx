'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setActiveSection, setMobileMenuOpen } from '@/store/slices/uiSlice'
import { classNames } from '@/utils'

const sidebarItems = [
  {
    id: 'home' as const,
    name: 'Dashboard Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'feed' as const,
    name: 'Personalized Feed',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    id: 'trending' as const,
    name: 'Trending',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'favorites' as const,
    name: 'Favorites',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'search' as const,
    name: 'Search Results',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
]

const categories = [
  { name: 'Technology', color: 'bg-blue-500' },
  { name: 'Business', color: 'bg-green-500' },
  { name: 'Entertainment', color: 'bg-purple-500' },
  { name: 'Health', color: 'bg-red-500' },
  { name: 'Science', color: 'bg-indigo-500' },
  { name: 'Sports', color: 'bg-orange-500' },
]

export function DashboardSidebar() {
  const dispatch = useAppDispatch()
  const { sidebarOpen, activeSection, mobileMenuOpen } = useAppSelector((state) => state.ui)
  const { favorites } = useAppSelector((state) => state.user)
  const { preferences } = useAppSelector((state) => state.user)

  const handleSectionChange = (section: typeof activeSection) => {
    dispatch(setActiveSection(section))
    // Close mobile menu on section change
    if (mobileMenuOpen) {
      dispatch(setMobileMenuOpen(false))
    }
  }

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-dark-surface border-r border-dark-border">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-dark-muted uppercase tracking-wide mb-3">
            Navigation
          </h2>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={classNames(
                'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                activeSection === item.id
                  ? 'bg-accent-red text-white shadow-lg'
                  : 'text-dark-muted hover:bg-dark-bg hover:text-dark-text'
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
              {item.id === 'favorites' && favorites.length > 0 && (
                <span className="ml-auto bg-accent-red text-white text-xs rounded-full px-2 py-0.5">
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-dark-muted uppercase tracking-wide mb-3">
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className={classNames(
                  'flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-all duration-200',
                  preferences.categories.includes(category.name.toLowerCase())
                    ? 'bg-dark-bg text-dark-text'
                    : 'text-dark-muted hover:bg-dark-bg hover:text-dark-text'
                )}
              >
                <div className={classNames('w-3 h-3 rounded-full mr-3', category.color)} />
                {category.name}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 bg-dark-bg rounded-lg">
          <h3 className="text-sm font-medium text-dark-text mb-2">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-dark-muted">Favorites</span>
              <span className="text-accent-red font-medium">{favorites.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-dark-muted">Categories</span>
              <span className="text-accent-red font-medium">{preferences.categories.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-border">
        <div className="text-xs text-dark-muted text-center">
          <p>Personal Dashboard</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="hidden lg:block w-64 h-full"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(setMobileMenuOpen(false))}
            />
            <motion.aside
              className="lg:hidden fixed inset-y-0 left-0 w-64 z-50"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
