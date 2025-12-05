'use client';

import { Badge } from '@/lib/types/badge';
import { Trophy, Lock } from 'lucide-react';

interface BadgeDisplayProps {
  badge: Badge;
  earned: boolean;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  showDescription?: boolean;
}

export function BadgeDisplay({
  badge,
  earned,
  size = 'md',
  showName = true,
  showDescription = false
}: BadgeDisplayProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl'
  };

  return (
    <div className={`flex flex-col items-center ${earned ? '' : 'opacity-50'}`}>
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full flex items-center justify-center
          border-4 transition-all duration-300
          ${earned
            ? 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-400 shadow-lg hover:scale-110'
            : 'bg-gray-100 border-gray-300'
          }
        `}
        title={badge.description}
      >
        {earned ? (
          <span>{badge.icon}</span>
        ) : (
          <Lock className="w-6 h-6 text-gray-400" />
        )}
      </div>
      {showName && (
        <div className="mt-2 text-center">
          <p className={`text-sm font-semibold ${earned ? 'text-gray-900' : 'text-gray-500'}`}>
            {badge.name}
          </p>
          {showDescription && (
            <p className="text-xs text-gray-600 mt-1 max-w-[150px]">
              {badge.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface BadgeGridProps {
  badges: { badge: Badge; earned: boolean }[];
  showLocked?: boolean;
}

export function BadgeGrid({ badges, showLocked = true }: BadgeGridProps) {
  const displayBadges = showLocked 
    ? badges 
    : badges.filter(b => b.earned);

  if (displayBadges.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>No badges yet. Complete challenges to earn badges!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {displayBadges.map(({ badge, earned }) => (
        <BadgeDisplay
          key={badge.id}
          badge={badge}
          earned={earned}
          size="md"
          showName={true}
        />
      ))}
    </div>
  );
}

