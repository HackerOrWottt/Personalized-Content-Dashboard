'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { updateSearchQuery, addToSearchHistory } from '@/store/slices/userSlice'
import { setActiveSection } from '@/store/slices/uiSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { debounce } from '@/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
}

export function SearchModal({ isOpen, onClose, initialQuery = '' }: SearchModalProps) {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState(initialQuery)
  const searchHistory = useAppSelector((state) => state.user.searchHistory)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      dispatch(updateSearchQuery(searchQuery))
      dispatch(addToSearchHistory(searchQuery))
      dispatch(setActiveSection('search'))
      onClose()
    }
  }

  const debouncedSearch = debounce(handleSearch, 300)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery)
    handleSearch(historyQuery)
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-dark-surface rounded-lg shadow-xl w-full max-w-2xl mx-4"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark-text">Search Content</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="mb-6">
                <Input
                  type="text"
                  placeholder="Search news, movies, social posts..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    debouncedSearch(e.target.value)
                  }}
                  autoFocus
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                  className="text-lg py-3"
                />
              </form>

              {/* Search Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-dark-text mb-3">Filter by Type</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'All', value: 'all', icon: '🔍' },
                    { label: 'News', value: 'news', icon: '📰' },
                    { label: 'Movies', value: 'movies', icon: '🎬' },
                    { label: 'Social', value: 'social', icon: '💬' },
                  ].map((filter) => (
                    <Button
                      key={filter.value}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Search History */}
              {searchHistory.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-dark-text mb-3">Recent Searches</h3>
                  <div className="space-y-1">
                    {searchHistory.slice(0, 5).map((historyItem, index) => (
                      <motion.button
                        key={index}
                        className="w-full text-left px-3 py-2 text-sm text-dark-muted hover:bg-dark-bg hover:text-dark-text rounded-md transition-colors duration-150"
                        onClick={() => handleHistoryClick(historyItem)}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{historyItem}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-dark-border">
                <div className="flex justify-between">
                  <div className="text-xs text-dark-muted">
                    Press Enter to search or Esc to close
                  </div>
                  <Button type="submit" size="sm" onClick={() => handleSearch(query)}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
