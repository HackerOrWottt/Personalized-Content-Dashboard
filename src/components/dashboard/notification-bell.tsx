'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeNotification, clearNotifications } from '@/store/slices/uiSlice'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/utils'

export function NotificationBell() {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const notifications = useAppSelector((state) => state.ui.notifications)

  const unreadCount = notifications.length

  const handleRemoveNotification = (id: string) => {
    dispatch(removeNotification(id))
  }

  const handleClearAll = () => {
    dispatch(clearNotifications())
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.405-3.405A6.024 6.024 0 0118 9.75 6 6 0 006 9.75c0 1.855.833 3.513 2.146 4.645L5 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6" />
        </svg>
        {unreadCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 bg-accent-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown */}
            <motion.div
              className="absolute right-0 mt-2 w-80 bg-dark-surface border border-dark-border rounded-lg shadow-xl z-20"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="p-4 border-b border-dark-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-dark-text">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAll}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-dark-border">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className="p-4 hover:bg-dark-bg transition-colors duration-150"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-2 h-2 rounded-full ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'error' ? 'bg-red-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`} />
                              <span className="text-sm text-dark-muted">
                                {formatRelativeTime(notification.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-dark-text">
                              {notification.message}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveNotification(notification.id)}
                            className="ml-2 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <svg className="w-12 h-12 text-dark-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.405-3.405A6.024 6.024 0 0118 9.75 6 6 0 006 9.75c0 1.855.833 3.513 2.146 4.645L5 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6" />
                    </svg>
                    <p className="text-dark-muted">No notifications</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
