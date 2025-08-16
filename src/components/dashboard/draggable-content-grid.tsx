'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { reorderFeed } from '@/store/slices/contentSlice'
import { ContentCard } from './content-card'
import { ContentItem } from '@/types'
import { motion } from 'framer-motion'

interface DraggableContentGridProps {
  items: ContentItem[]
  onReorder?: (newOrder: string[]) => void
}

export function DraggableContentGrid({ items, onReorder }: DraggableContentGridProps) {
  const dispatch = useAppDispatch()
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false)
    
    if (!result.destination) {
      return
    }

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    const newOrder = newItems.map(item => item.id)
    
    if (onReorder) {
      onReorder(newOrder)
    } else {
      dispatch(reorderFeed(newOrder))
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Droppable droppableId="content-grid" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
              snapshot.isDraggingOver ? 'bg-accent-red bg-opacity-5 rounded-lg p-4' : ''
            }`}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? 'rotate-3 scale-105 z-50' : ''} transition-all duration-200`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging 
                        ? `${provided.draggableProps.style?.transform} rotate(3deg) scale(1.05)`
                        : provided.draggableProps.style?.transform,
                    }}
                  >
                    <ContentCard item={item} isDraggable />
                    {snapshot.isDragging && (
                      <div className="absolute -top-2 -right-2 bg-accent-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                        ✋
                      </div>
                    )}
                  </motion.div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
