'use client'

import { motion } from 'framer-motion'
import { useAppDispatch } from '@/store/hooks'
import { setActiveSection } from '@/store/slices/uiSlice'
import { useGetTrendingMoviesQuery } from '@/store/api/tmdbApi'
import { useGetTrendingSocialQuery } from '@/store/api/socialApi'
import { ContentCard } from '../content-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'

export function TrendingSection() {
  const dispatch = useAppDispatch()
  const { data: moviesData, isLoading: moviesLoading } = useGetTrendingMoviesQuery({ page: 1 })
  const { data: socialData, isLoading: socialLoading } = useGetTrendingSocialQuery({ page: 1, pageSize: 15 })

  const isLoading = moviesLoading || socialLoading
  const trendingContent = [...(moviesData?.slice(0, 10) || []), ...(socialData || [])]

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

  if (isLoading && trendingContent.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-dark-muted mt-4">Loading trending content...</p>
        </div>
      </div>
    )
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
          🔥 Trending Now
        </motion.h1>
        <motion.p
          className="text-dark-muted"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover what's popular across movies, news, and social media
        </motion.p>
      </div>

      {/* Trending Categories */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All Trending', icon: '🔥' },
            { label: 'Movies', icon: '🎬' },
            { label: 'Social', icon: '💬' },
            { label: 'Popular', icon: '⭐' },
          ].map((category) => (
            <Button
              key={category.label}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      {trendingContent.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {trendingContent.map((item, index) => (
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
          <div className="text-6xl mb-4">🔥</div>
          <h3 className="text-xl font-semibold text-dark-text mb-2">No trending content available</h3>
          <p className="text-dark-muted mb-4">
            We couldn't load trending content. This might be due to API limitations in the demo.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}
