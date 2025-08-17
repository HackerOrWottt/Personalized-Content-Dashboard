'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addToFavorites, removeFromFavorites } from '@/store/slices/userSlice'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ContentItem } from '@/types'
import { formatRelativeTime, getContentTypeIcon } from '@/utils'

interface ContentCardProps {
  item: ContentItem
  isDraggable?: boolean
}

export function ContentCard({ item, isDraggable = false }: ContentCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.user.favorites)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const isFavorite = favorites.includes(item.id)

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id))
    } else {
      dispatch(addToFavorites(item.id))
    }
  }

  const handleCardClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full flex flex-col overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300" onClick={handleCardClick}>
        {/* Image */}
        <div className="relative h-48 bg-dark-bg overflow-hidden">
          {/* Background overlay for interactive effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Interactive floating elements */}
          <motion.div
            className="absolute top-4 left-4 w-3 h-3 bg-accent-red rounded-full z-10"
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute bottom-4 right-4 w-2 h-2 bg-white/40 rounded-full z-10"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              y: isHovered ? [0, -10, 0] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {item.imageUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <motion.div 
                    className="w-8 h-8 border-2 border-accent-red border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                } ${isHovered ? 'scale-110' : 'scale-100'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, ${
                    item.type === 'news' ? '#3b82f6' :
                    item.type === 'movie' ? '#8b5cf6' : '#10b981'
                  } 0%, transparent 50%)`,
                }}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  rotate: isHovered ? [0, 180, 360] : 0,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="text-center z-10">
                <motion.div 
                  className="text-5xl mb-2"
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    rotate: isHovered ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {getContentTypeIcon(item.type)}
                </motion.div>
                <motion.p 
                  className="text-dark-muted text-sm font-medium"
                  animate={{ opacity: isHovered ? [0.7, 1, 0.7] : 0.7 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {item.type.toUpperCase()}
                </motion.p>
              </div>
            </div>
          )}
          
          {/* Content Type Badge with animation */}
          <motion.div 
            className="absolute top-3 left-3 z-20"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
              item.type === 'news' ? 'bg-blue-500' :
              item.type === 'movie' ? 'bg-purple-500' : 'bg-green-500'
            }`}>
              {item.type.toUpperCase()}
            </span>
          </motion.div>

          {/* Interactive Favorite Button */}
          <motion.div 
            className="absolute top-3 right-3 z-20"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleFavoriteToggle()
              }}
              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20 shadow-lg"
            >
              <motion.svg
                className={`w-4 h-4 ${isFavorite ? 'text-red-500' : 'text-white'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </motion.svg>
            </Button>
          </motion.div>

          {/* Hover overlay with content preview */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.8, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {item.title}
              </h4>
              <p className="text-white/80 text-sm mb-3 line-clamp-3">
                {item.description}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-accent-red font-medium">
                  {item.type === 'movie' ? 'Watch Now' : 'Read More'}
                </span>
                <svg className="w-4 h-4 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-dark-text mb-2 line-clamp-2 group-hover:text-accent-red transition-colors duration-200">
            {item.title}
          </h3>
          
          {item.author && (
            <p className="text-sm text-dark-muted mb-2">by {item.author}</p>
          )}

          <p className="text-dark-muted text-sm line-clamp-3 flex-1 mb-4">
            {item.description}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2 text-sm text-dark-muted">
              <span>{item.source}</span>
              <span>•</span>
              <span>{formatRelativeTime(item.publishedAt)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.rating && (
                <motion.div 
                  className="flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-dark-text">
                    {item.rating.toFixed(1)}
                  </span>
                </motion.div>
              )}
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCardClick()
                  }}
                  className="text-accent-red hover:bg-accent-red hover:text-white transition-all duration-200"
                >
                  {item.type === 'movie' ? 'Watch' : 'Read'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
