'use client'

import { motion } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setActiveSection } from '@/store/slices/uiSlice'
import { Card } from '@/components/ui/card'

export function HomeOverview() {
  const dispatch = useAppDispatch()
  const { favorites } = useAppSelector((state) => state.user)
  const { personalizedFeed } = useAppSelector((state) => state.content)

  // Count content by type
  const newsCount = personalizedFeed.filter(item => item.type === 'news').length
  const movieCount = personalizedFeed.filter(item => item.type === 'movie').length
  const favoritesCount = favorites.length

  const sectionCards = [
    {
      id: 'news',
      title: 'News & Articles',
      description: 'Stay updated with latest news from around the world',
      count: newsCount,
      countLabel: 'articles',
      icon: '📰',
      gradient: 'from-blue-600 to-blue-800',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibmV3c0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzI1NjNlYjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWU0MGFmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNuZXdzR3JhZGllbnQpIi8+CiAgPCEtLSBOZXdzcGFwZXIgaWNvbiAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTAsIDYwKSI+CiAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0id2hpdGUiIHJ4PSI4IiBvcGFjaXR5PSIwLjkiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxNSIgd2lkdGg9IjgwIiBoZWlnaHQ9IjQiIGZpbGw9IiMxZTQwYWYiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIyNSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjMiIGZpbGw9IiM2MzY2ZjEiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIzNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjMiIGZpbGw9IiM2MzY2ZjEiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI1MCIgd2lkdGg9IjM1IiBoZWlnaHQ9IjMwIiBmaWxsPSIjOWNhM2FmIi8+CiAgICA8cmVjdCB4PSI1NSIgeT0iNTAiIHdpZHRoPSIzNSIgaGVpZ2h0PSIzIiBmaWxsPSIjNjM2NmYxIi8+CiAgICA8cmVjdCB4PSI1NSIgeT0iNTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzIiBmaWxsPSIjNjM2NmYxIi8+CiAgICA8cmVjdCB4PSI1NSIgeT0iNjAiIHdpZHRoPSIzNSIgaGVpZ2h0PSIzIiBmaWxsPSIjNjM2NmYxIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iOTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzIiBmaWxsPSIjNjM2NmYxIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iOTUiIHdpZHRoPSI2NSIgaGVpZ2h0PSIzIiBmaWxsPSIjNjM2NmYxIi8+CiAgPC9nPgo8L3N2Zz4='
    },
    {
      id: 'movies',
      title: 'Movies & Entertainment',
      description: 'Discover trending movies and entertainment content',
      count: movieCount,
      countLabel: 'movies',
      icon: '🎬',
      gradient: 'from-purple-600 to-purple-800',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibW92aWVHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3YzNhZWQ7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzZkMjhkOTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbW92aWVHcmFkaWVudCkiLz4KICA8IS0tIEZpbG0gcmVlbCBpY29uIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MCwgNzApIj4KICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ1IiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC45Ii8+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmQyOGQ5IiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiM2ZDI4ZDkiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZkMjhkOSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjNmQyOGQ5Ii8+CiAgICA8IS0tIEZpbG0gaG9sZXMgLS0+CiAgICA8Y2lyY2xlIGN4PSIzNSIgY3k9IjM1IiByPSIyIiBmaWxsPSIjNmQyOGQ5Ii8+CiAgICA8Y2lyY2xlIGN4PSI2NSIgY3k9IjM1IiByPSIyIiBmaWxsPSIjNmQyOGQ5Ii8+CiAgICA8Y2lyY2xlIGN4PSI2NSIgY3k9IjY1IiByPSIyIiBmaWxsPSIjNmQyOGQ5Ii8+CiAgICA8Y2lyY2xlIGN4PSIzNSIgY3k9IjY1IiByPSIyIiBmaWxsPSIjNmQyOGQ5Ii8+CiAgPC9nPgo8L3N2Zz4='
    },
    {
      id: 'favorites',
      title: 'Your Favorites',
      description: 'Content you\'ve saved for quick access',
      count: favoritesCount,
      countLabel: 'items',
      icon: '❤️',
      gradient: 'from-red-600 to-red-800',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZmF2R3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZGMyNjI2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5OTFiMWI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2ZhdkdyYWRpZW50KSIvPgogIDwhLS0gSGVhcnQgaWNvbiAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjAsIDgwKSI+CiAgICA8cGF0aCBkPSJNNDAgMTAgQzQwIDUgMzUgMCAyNSAwIFMxMCA1IDEwIDEwIEMxMCAxNSAxNSAyNSAyNSAzNSBTNDAgMTUgNDAgMTAiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjkiLz4KICAgIDxwYXRoIGQ9Ik0zNSA4IEMzNSA0IDMyIDEgMjUgMSBTMTUgNCA1IDggQzE1IDEyIDE4IDIwIDI1IDI4IFMzNSAxMiAzNSA4IiBmaWxsPSIjZGMyNjI2Ii8+CiAgPC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwgNDApIiBvcGFjaXR5PSIwLjMiPgogICAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMyIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMTUiIHI9IjIiIGZpbGw9IndoaXRlIi8+CiAgICA8Y2lyY2xlIGN4PSIzMCIgY3k9IjgiIHI9IjIuNSIgZmlsbD0id2hpdGUiLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjgwLCAxNTApIiBvcGFjaXR5PSIwLjMiPgogICAgPGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjIiIGZpbGw9IndoaXRlIi8+CiAgICA8Y2lyY2xlIGN4PSIxOCIgY3k9IjEyIiByPSIxLjUiIGZpbGw9IndoaXRlIi8+CiAgICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjUiIHI9IjIiIGZpbGw9IndoaXRlIi8+CiAgPC9nPgo8L3N2Zz4='
    }
  ]

  const handleSectionClick = (sectionId: string) => {
    switch (sectionId) {
      case 'news':
        dispatch(setActiveSection('feed'))
        break
      case 'movies':
        dispatch(setActiveSection('trending'))
        break
      case 'favorites':
        dispatch(setActiveSection('favorites'))
        break
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="p-6 min-h-full">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.h1
          className="text-4xl font-bold text-dark-text mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Your Dashboard
        </motion.h1>
        <motion.p
          className="text-dark-muted text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover personalized content across news, entertainment, and your favorite items.
        </motion.p>
      </div>

      {/* Section Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sectionCards.map((section) => (
          <motion.div
            key={section.id}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="h-full cursor-pointer overflow-hidden border-2 border-transparent hover:border-accent-red transition-all duration-300"
              onClick={() => handleSectionClick(section.id)}
            >
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                
                {/* Count Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium">
                    {section.count} {section.countLabel}
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-text mb-2">
                  {section.title}
                </h3>
                <p className="text-dark-muted mb-4">
                  {section.description}
                </p>
                
                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <span className="text-accent-red font-medium">
                    Explore {section.title.toLowerCase()}
                  </span>
                  <svg className="w-5 h-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border text-center">
            <div className="text-3xl font-bold text-accent-red mb-2">
              {personalizedFeed.length}
            </div>
            <div className="text-dark-muted">Total Content Items</div>
          </div>
          
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border text-center">
            <div className="text-3xl font-bold text-accent-red mb-2">
              {favoritesCount}
            </div>
            <div className="text-dark-muted">Favorited Items</div>
          </div>
          
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border text-center">
            <div className="text-3xl font-bold text-accent-red mb-2">
              3
            </div>
            <div className="text-dark-muted">Active Categories</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
