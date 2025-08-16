'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addToFavorites, removeFromFavorites } from '@/store/slices/userSlice'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ContentItem } from '@/types'
import { formatRelativeTime, getContentTypeIcon, getContentTypeColor, truncateText } from '@/utils'

interface ContentCardProps {
  item: ContentItem
  isDraggable?: boolean
}

export function ContentCard({ item, isDraggable = false }: ContentCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.user.favorites)
  const [imageError, setImageError] = useState(false)

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

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}
    >
      <Card className="h-full flex flex-col overflow-hidden group">
        {/* Image */}
        <div className="relative h-48 bg-dark-bg overflow-hidden">
          {item.imageUrl && !imageError ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">{getContentTypeIcon(item.type)}</div>
                <p className="text-dark-muted text-sm">{item.type.toUpperCase()}</p>
              </div>
            </div>
          )}
          
          {/* Content Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getContentTypeColor(item.type)}`}>
              {item.type.toUpperCase()}
            </span>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleFavoriteToggle()
              }}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
            >
              <svg
                className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-accent-red transition-colors duration-200">
            {truncateText(item.title, 80)}
          </CardTitle>
          {item.author && (
            <p className="text-sm text-dark-muted">by {item.author}</p>
          )}
        </CardHeader>

        <CardContent className="flex-1 pb-2">
          <CardDescription className="line-clamp-3">
            {truncateText(item.description, 150)}
          </CardDescription>
          
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {item.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-dark-bg text-dark-muted text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 text-sm text-dark-muted">
              <span>{item.source}</span>
              <span>•</span>
              <span>{formatRelativeTime(item.publishedAt)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.rating && (
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-dark-text">
                    {item.rating.toFixed(1)}
                  </span>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCardClick}
                className="text-accent-red hover:bg-accent-red hover:text-white"
              >
                {item.type === 'movie' ? 'Watch' : 'Read'}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
