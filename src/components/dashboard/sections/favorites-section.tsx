'use client'

import { motion } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setActiveSection } from '@/store/slices/uiSlice'
import { ContentCard } from '../content-card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useGetTopHeadlinesQuery } from '@/store/api/newsApi'
import { useGetTrendingMoviesQuery } from '@/store/api/tmdbApi'
import { useGetSocialPostsQuery } from '@/store/api/socialApi'
import { ContentItem } from '@/types'

export function FavoritesSection() {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.user.favorites)
  const { personalizedFeed } = useAppSelector((state) => state.content)

  // Fetch content from all sources to ensure favorites are available
  const { data: newsData = [], isLoading: newsLoading } = useGetTopHeadlinesQuery({
    category: 'general',
    pageSize: 20,
    country: 'us'
  })

  const { data: moviesData = [], isLoading: moviesLoading } = useGetTrendingMoviesQuery({
    timeWindow: 'day'
  })

  const { data: socialData = [], isLoading: socialLoading } = useGetSocialPostsQuery({
    limit: 20
  })

  const isLoading = newsLoading || moviesLoading || socialLoading

  // Combine all content sources
  const allContent: ContentItem[] = [
    ...personalizedFeed,
    ...newsData,
    ...moviesData,
    ...socialData
  ]

  // Remove duplicates and filter to show only favorites
  const uniqueContent = allContent.reduce((acc: ContentItem[], current) => {
    const exists = acc.find(item => item.id === current.id)
    if (!exists) {
      acc.push(current)
    }
    return acc
  }, [])

  const favoriteContent = uniqueContent.filter(item => favorites.includes(item.id))

  const handleBackToHome = () => {
    dispatch(setActiveSection('home'))
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
      {/* Navigation Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="text-dark-muted hover:text-accent-red mb-4"
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          }
        >
          Back to Dashboard Home
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <motion.h1
          className="text-3xl font-bold text-dark-text mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ❤️ Your Favorites
        </motion.h1>
        <motion.p
          className="text-dark-muted"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Content you've saved for later ({favorites.length} items)
        </motion.p>
      </div>

      {/* Favorites Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark-surface p-4 rounded-lg border border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-gradient rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">❤️</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-text">{favorites.length}</p>
              <p className="text-sm text-dark-muted">Total Favorites</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-surface p-4 rounded-lg border border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📰</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-text">
                {favoriteContent.filter(item => item.type === 'news').length}
              </p>
              <p className="text-sm text-dark-muted">News Articles</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-surface p-4 rounded-lg border border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🎬</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-text">
                {favoriteContent.filter(item => item.type === 'movie').length}
              </p>
              <p className="text-sm text-dark-muted">Movies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-dark-muted">Loading your favorites...</span>
        </div>
      ) : favoriteContent.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {favoriteContent.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ContentCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❤️</div>
          <h3 className="text-xl font-semibold text-dark-text mb-2">No favorites yet</h3>
          <p className="text-dark-muted mb-4">
            Start adding content to your favorites by clicking the heart icon on any content card.
          </p>
          <Button
            onClick={() => dispatch(setActiveSection('feed'))}
          >
            Browse Content
          </Button>
        </div>
      )}
    </div>
  )
}
