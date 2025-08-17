'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppDispatch } from '@/store/hooks'
import { setProfile } from '@/store/slices/userSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

interface User {
  email: string
  password: string
  name: string
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Reset modal state when opened
  React.useEffect(() => {
    if (isOpen) {
      setMode('signin')
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      setErrors({})
      setIsLoading(false)
    }
  }, [isOpen])

  // Simple local storage based authentication (in production, use proper backend)
  const getUsers = (): User[] => {
    try {
      return JSON.parse(localStorage.getItem('dashboard_users') || '[]')
    } catch {
      return []
    }
  }

  const saveUser = (user: User) => {
    const users = getUsers()
    users.push(user)
    localStorage.setItem('dashboard_users', JSON.stringify(users))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignUp = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    
    // Check if user already exists
    const users = getUsers()
    const existingUser = users.find(u => u.email === formData.email)
    
    if (existingUser) {
      setErrors({ email: 'An account with this email already exists' })
      setIsLoading(false)
      return
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Save new user
    const newUser: User = {
      name: formData.name,
      email: formData.email,
      password: formData.password // In production, this would be hashed
    }
    
    saveUser(newUser)

    // Switch to sign in mode after successful signup
    setIsLoading(false)
    setMode('signin')
    setFormData({ name: '', email: formData.email, password: '', confirmPassword: '' })
    setErrors({})

    // Show success message
    setErrors({
      success: `Account created successfully! Please sign in with your credentials.`
    })
  }

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setErrors({ 
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : ''
      })
      return
    }

    setIsLoading(true)

    // Check if user exists
    const users = getUsers()
    const user = users.find(u => u.email === formData.email && u.password === formData.password)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!user) {
      setErrors({ password: 'Invalid email or password' })
      setIsLoading(false)
      return
    }

    // Sign in successful
    dispatch(setProfile({
      name: user.name,
      email: user.email
    }))

    setIsLoading(false)
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'signin') {
      handleSignIn()
    } else {
      handleSignUp()
    }
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setErrors({})
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.15 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">P</span>
                </div>
                <h2 className="text-2xl font-bold text-dark-text mb-2">
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-dark-muted">
                  {mode === 'signin' 
                    ? 'Sign in to access your personalized dashboard' 
                    : 'Join us to get started with your personalized content'
                  }
                </p>
              </div>

              {/* Success Message */}
              {errors.success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-800 text-sm text-center">{errors.success}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                  />
                )}

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={errors.password}
                />

                {mode === 'signup' && (
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    error={errors.confirmPassword}
                  />
                )}

                <Button
                  type="submit"
                  className="w-full"
                  loading={isLoading}
                  size="lg"
                >
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              {/* Switch Mode */}
              <div className="mt-6 text-center">
                <p className="text-dark-muted">
                  {mode === 'signin' 
                    ? "Don't have an account? " 
                    : "Already have an account? "
                  }
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-accent-red hover:underline font-medium"
                  >
                    {mode === 'signin' ? 'Create one' : 'Sign in'}
                  </button>
                </p>
              </div>

              {/* Demo Account Info */}
              <div className="mt-4 p-3 bg-dark-bg rounded-lg">
                <p className="text-xs text-dark-muted text-center">
                  <strong>Demo:</strong> Create any account to test the system, or use email: demo@example.com, password: demo123
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
