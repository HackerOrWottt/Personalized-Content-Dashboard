'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/store/hooks'
import { useSearchNewsQuery } from '@/store/api/newsApi'
import { useSearchMoviesQuery } from '@/store/api/tmdbApi'
import { useSearchSocialPostsQuery } from '@/store/api/socialApi'
import { ContentCard } from '../content-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { debounce } from '@/utils'

export function SearchSection() {
  const { currentSearchQuery } = useAppSelector((state) => state.content)
  const [localQuery, setLocalQuery] = useState(currentSearchQuery)
  const [activeQuery, setActiveQuery] = useState(currentSearchQuery)

  // Search queries
  const { data: newsResults, isLoading: newsLoading } = useSearchNewsQuery(
    { q: activeQuery, pageSize: 8 },
    { skip: !activeQuery }
  )
  
  const { data: movieResults, isLoading: moviesLoading } = useSearchMoviesQuery(
    { query: activeQuery, page: 1 },
    { skip: !activeQuery }
  )
  
  const { data: socialResults, isLoading: socialLoading } = useSearchSocialPostsQuery(
    { query: activeQuery, pageSize: 8 },
    { skip: !activeQuery }
  )

  const isLoading = newsLoading || moviesLoading || socialLoading
  const searchResults = [
    ...(newsResults || []),
    ...(movieResults?.slice(0, 6) || []),
    ...(socialResults || []),
  ]

  const debouncedSearch = debounce((query: string) => {
    setActiveQuery(query)
  }, 500)

  useEffect(() => {
    if (localQuery.trim()) {
      debouncedSearch(localQuery)
    }
  }, [localQuery, debouncedSearch])

  useEffect(() => {
    setLocalQuery(currentSearchQuery)
    setActiveQuery(currentSearchQuery)
  }, [currentSearchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveQuery(localQuery)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          className="text-3xl font-bold text-dark-text mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🔍 Search Results
        </motion.h1>
        <motion.p
          className="text-dark-muted"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {activeQuery ? `Results for "${activeQuery}"` : 'Enter a search term to get started'}
        </motion.p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search news, movies, social posts..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                className="text-lg py-3"
              />
            </div>
            <Button type="submit" size="lg" loading={isLoading}>
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Search Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All Results', count: searchResults.length },
            { label: 'News', count: newsResults?.length || 0 },
            { label: 'Movies', count: movieResults?.length || 0 },
            { label: 'Social', count: socialResults?.length || 0 },
          ].map((filter) => (
            <Button
              key={filter.label}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <span>{filter.label}</span>
              <span className="bg-accent-red text-white px-2 py-0.5 rounded-full text-xs">
                {filter.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && searchResults.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-dark-muted mt-4">Searching...</p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && activeQuery && searchResults.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-dark-text mb-2">No results found</h3>
          <p className="text-dark-muted mb-4">
            Try searching with different keywords or check your spelling.
          </p>
          <Button onClick={() => setLocalQuery('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Results Grid */}
      {searchResults.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {searchResults.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ContentCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!activeQuery && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-dark-text mb-2">Start Searching</h3>
          <p className="text-dark-muted mb-4">
            Enter keywords above to search across news, movies, and social media content.
          </p>
        </div>
      )}
    </div>
  )
}
