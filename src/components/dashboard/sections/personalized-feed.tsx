'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useGetTopHeadlinesQuery } from '@/store/api/newsApi'
import { useGetTrendingMoviesQuery } from '@/store/api/tmdbApi'
import { useGetSocialPostsQuery } from '@/store/api/socialApi'
import { setPersonalizedFeed, setLoading } from '@/store/slices/contentSlice'
import { setActiveSection } from '@/store/slices/uiSlice'
import { ContentCard } from '../content-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'

export function PersonalizedFeed() {
  const dispatch = useAppDispatch()
  const preferences = useAppSelector((state) => state.user.preferences)
  const { personalizedFeed, isLoading } = useAppSelector((state) => state.content)

  // Fetch data from multiple APIs
  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery({
    category: preferences.categories[0] || 'general',
    country: preferences.country,
    pageSize: Math.floor(preferences.pageSize / 3),
  })

  const { data: moviesData, isLoading: moviesLoading } = useGetTrendingMoviesQuery({
    page: 1,
  })

  const { data: socialData, isLoading: socialLoading } = useGetSocialPostsQuery({
    page: 1,
    pageSize: Math.floor(preferences.pageSize / 3),
  })

  const isAnyLoading = newsLoading || moviesLoading || socialLoading

  useEffect(() => {
    dispatch(setLoading(isAnyLoading))
  }, [dispatch, isAnyLoading])

  useEffect(() => {
    if (newsData || moviesData || socialData) {
      const combinedFeed = [
        ...(newsData || []),
        ...(moviesData?.slice(0, 6) || []),
        ...(socialData || []),
      ].sort(() => Math.random() - 0.5) // Shuffle for variety

      dispatch(setPersonalizedFeed(combinedFeed))
    }
  }, [dispatch, newsData, moviesData, socialData])

  const handleBackToHome = () => {
    dispatch(setActiveSection('home'))
  }

  if (isLoading && personalizedFeed.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-dark-muted mt-4">Loading your personalized feed...</p>
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
          Your Personalized Feed
        </motion.h1>
        <motion.p
          className="text-dark-muted"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Content curated based on your preferences: {preferences.categories.join(', ')}
        </motion.p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          }
          loading={isLoading}
        >
          Refresh Feed
        </Button>
      </div>

      {/* Content Grid */}
      {personalizedFeed.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {personalizedFeed.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ContentCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-dark-text mb-2">No content available</h3>
          <p className="text-dark-muted mb-4">
            We couldn't load your personalized feed. This might be due to API limitations in the demo.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {/* Load More */}
      {personalizedFeed.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Content
          </Button>
        </div>
      )}
    </div>
  )
}
