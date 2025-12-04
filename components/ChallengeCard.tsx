'use client';

import { Challenge } from '@/lib/types/challenge';
import Link from 'next/link';
import { isChallengeCompleted } from '@/lib/utils/challengeStorage';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted?: boolean;
  onAccept?: () => void;
}

export default function ChallengeCard({ challenge, isCompleted: propIsCompleted, onAccept }: ChallengeCardProps) {
  // Check localStorage for completion status
  const localStorageCompleted = isChallengeCompleted(challenge.id);
  const isCompleted = propIsCompleted !== undefined ? propIsCompleted : localStorageCompleted;
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'easy': 'bg-green-100 text-green-800 border-green-300',
      'medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'hard': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'usage': 'from-blue-500 to-cyan-500',
      'practice': 'from-green-500 to-emerald-500',
      'teaching': 'from-purple-500 to-pink-500',
      'community': 'from-orange-500 to-amber-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className={`bg-white rounded-lg md:rounded-xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-102 ${
      isCompleted ? 'border-green-500 opacity-75' : 'border-gray-300'
    }`}>
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${getCategoryColor(challenge.category)} p-4 sm:p-5`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">{challenge.icon}</span>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {challenge.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty.toUpperCase()}
              </span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/20 text-white border border-white/30">
                {challenge.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
          {challenge.description}
        </p>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {challenge.xpReward} XP
            </span>
          </div>

          {isCompleted ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg border-2 border-green-300">
              <span className="text-lg">✓</span>
              <span className="text-sm font-bold">Completed</span>
            </div>
          ) : (
            <Link
              href={`/challenges/${challenge.id}`}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm sm:text-base font-bold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center inline-block"
            >
              Start Challenge
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
