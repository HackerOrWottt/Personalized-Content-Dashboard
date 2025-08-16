'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleSettingsModal } from '@/store/slices/uiSlice'
import { updatePreferences } from '@/store/slices/userSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/components/theme-provider'

interface SettingsModalProps {
  isOpen: boolean
}

const availableCategories = [
  'technology',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'general'
]

const availableCountries = [
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'in', name: 'India' },
]

export function SettingsModal({ isOpen }: SettingsModalProps) {
  const dispatch = useAppDispatch()
  const { theme, toggleTheme } = useTheme()
  const preferences = useAppSelector((state) => state.user.preferences)
  
  const [localPreferences, setLocalPreferences] = useState(preferences)

  const handleClose = () => {
    dispatch(toggleSettingsModal())
  }

  const handleSave = () => {
    dispatch(updatePreferences(localPreferences))
    handleClose()
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = localPreferences.categories.includes(category)
      ? localPreferences.categories.filter(c => c !== category)
      : [...localPreferences.categories, category]
    
    setLocalPreferences({
      ...localPreferences,
      categories: newCategories
    })
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
          onClick={handleClose}
        >
          <motion.div
            className="bg-dark-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-dark-text">Settings</h2>
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <div className="space-y-6">
                {/* Theme Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-text mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dark-text font-medium">Dark Mode</p>
                        <p className="text-sm text-dark-muted">Toggle between light and dark themes</p>
                      </div>
                      <Button
                        variant={theme === 'dark' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={toggleTheme}
                      >
                        {theme === 'dark' ? 'Dark' : 'Light'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-text mb-4">Content Preferences</h3>
                  <div className="space-y-4">
                    {/* Categories */}
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Favorite Categories
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableCategories.map((category) => (
                          <Button
                            key={category}
                            variant={localPreferences.categories.includes(category) ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => handleCategoryToggle(category)}
                            className="justify-start"
                          >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Country/Region
                      </label>
                      <select
                        value={localPreferences.country}
                        onChange={(e) => setLocalPreferences({
                          ...localPreferences,
                          country: e.target.value
                        })}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent"
                      >
                        {availableCountries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Language
                      </label>
                      <select
                        value={localPreferences.language}
                        onChange={(e) => setLocalPreferences({
                          ...localPreferences,
                          language: e.target.value
                        })}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>

                    {/* Page Size */}
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Items per Page
                      </label>
                      <Input
                        type="number"
                        min="10"
                        max="100"
                        value={localPreferences.pageSize}
                        onChange={(e) => setLocalPreferences({
                          ...localPreferences,
                          pageSize: parseInt(e.target.value) || 20
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-text mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dark-text font-medium">Push Notifications</p>
                        <p className="text-sm text-dark-muted">Receive notifications for new content</p>
                      </div>
                      <Button
                        variant={localPreferences.notifications ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setLocalPreferences({
                          ...localPreferences,
                          notifications: !localPreferences.notifications
                        })}
                      >
                        {localPreferences.notifications ? 'On' : 'Off'}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dark-text font-medium">Auto Refresh</p>
                        <p className="text-sm text-dark-muted">Automatically refresh content feed</p>
                      </div>
                      <Button
                        variant={localPreferences.autoRefresh ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setLocalPreferences({
                          ...localPreferences,
                          autoRefresh: !localPreferences.autoRefresh
                        })}
                      >
                        {localPreferences.autoRefresh ? 'On' : 'Off'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-dark-border">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
