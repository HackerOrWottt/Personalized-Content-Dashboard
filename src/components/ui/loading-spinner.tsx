'use client'

import { motion } from 'framer-motion'
import { classNames } from '@/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const colorClasses = {
    primary: 'border-accent-red',
    white: 'border-white',
    gray: 'border-gray-400',
  }

  return (
    <div className={classNames('flex items-center justify-center', className)}>
      <motion.div
        className={classNames(
          'border-2 border-transparent rounded-full',
          sizeClasses[size],
          `border-t-2 ${colorClasses[color]}`
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}
