'use client';

import { UserLevel } from '@/lib/types/badge';
import { getLevelName } from '@/lib/utils/levelSystem';
import { TrendingUp } from 'lucide-react';

interface LevelDisplayProps {
  level: UserLevel;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function LevelDisplay({ level, showProgress = true, size = 'md' }: LevelDisplayProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-gray-900">
            Level {level.level}
          </span>
          <span className="text-sm text-gray-600">
            ({getLevelName(level.level)})
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-700">
          {level.xp} / {level.xp + level.xpForNextLevel} XP
        </span>
      </div>
      
      {showProgress && (
        <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-3 md:h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${level.progressPercentage}%` }}
          >
            {level.progressPercentage > 10 && (
              <span className="text-xs font-bold text-white">
                {Math.round(level.progressPercentage)}%
              </span>
            )}
          </div>
        </div>
      )}
      
      {level.level >= 10 && (
        <div className="mt-2 text-center">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm font-bold rounded-full">
            🏆 MAX LEVEL
          </span>
        </div>
      )}
    </div>
  );
}

