'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector } from '@/store/hooks'
import { HomeOverview } from './sections/home-overview'
import { PersonalizedFeed } from './sections/personalized-feed'
import { TrendingSection } from './sections/trending-section'
import { FavoritesSection } from './sections/favorites-section'
import { SearchSection } from './sections/search-section'

export function DashboardContent() {
  const { activeSection } = useAppSelector((state) => state.ui)

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeOverview />
      case 'feed':
        return <PersonalizedFeed />
      case 'trending':
        return <TrendingSection />
      case 'favorites':
        return <FavoritesSection />
      case 'search':
        return <SearchSection />
      default:
        return <HomeOverview />
    }
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
  }

  return (
    <div className="h-full overflow-y-auto bg-dark-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="h-full"
        >
          {renderActiveSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
