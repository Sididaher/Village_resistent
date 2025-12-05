"use client"

import { cn } from '../lib/utils'

interface ProgressBarProps {
  progress: number
  className?: string
  showLabel?: boolean
  label?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export function ProgressBar({ 
  progress, 
  className, 
  showLabel = true, 
  label,
  color = 'blue'
}: ProgressBarProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  }

  const bgColorClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100'
  }

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || `Progression: ${Math.round(progress)}%`}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className={cn(
        "w-full rounded-full h-3 overflow-hidden",
        bgColorClasses[color]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}
