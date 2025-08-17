'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { classNames } from '@/utils'
import { LoadingSpinner } from './loading-spinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      primary: 'bg-accent-red hover:bg-accent-red-dark text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-dark-surface hover:bg-gray-700 text-dark-text border border-dark-border',
      outline: 'border border-accent-red text-accent-red hover:bg-accent-red hover:text-white',
      ghost: 'text-accent-red hover:bg-accent-red hover:bg-opacity-10',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    }

    return (
      <motion.button
        ref={ref}
        className={classNames(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading && <LoadingSpinner size="sm" color="white" className="mr-2" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
