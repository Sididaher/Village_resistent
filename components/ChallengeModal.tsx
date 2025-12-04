'use client';

import { Challenge } from '@/lib/types/challenge';
import { useState } from 'react';

interface ChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (challengeId: number, xpEarned: number) => void;
}

export default function ChallengeModal({ challenge, isOpen, onClose, onComplete }: ChallengeModalProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  if (!isOpen) return null;

  const handleMarkComplete = () => {
    setIsCompleting(true);

    // Award XP and mark as complete
    setTimeout(() => {
      onComplete(challenge.id, challenge.xpReward);
      setIsCompleting(false);
      onClose();
    }, 500);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'easy': 'text-green-600',
      'medium': 'text-yellow-600',
      'hard': 'text-red-600'
    };
    return colors[difficulty as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 sm:p-8 text-white sticky top-0 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">{challenge.icon}</span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Challenge Accepted!
                </h2>
                <p className="text-sm sm:text-base opacity-90">
                  Complete this in real life and come back to claim your XP
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Challenge Details */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {challenge.title}
              </h3>
              <span className={`text-sm font-bold ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty.toUpperCase()}
              </span>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* Instructions Section */}
          <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-200 mb-6">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span className="text-xl">📋</span>
              How to Complete This Challenge
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-blue-900">
              {challenge.category === 'usage' && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Track your current usage baseline for comparison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Implement the changes described in the challenge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Monitor and measure your progress over the challenge period</span>
                  </li>
                </>
              )}
              {challenge.category === 'practice' && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Download and install the required open-source software</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Use it for the specified time period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Note your experience and any challenges you faced</span>
                  </li>
                </>
              )}
              {challenge.category === 'teaching' && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Prepare a presentation or lesson plan about NIRD principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Present to your class, colleagues, or community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Gather feedback and answer questions</span>
                  </li>
                </>
              )}
              {challenge.category === 'community' && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Research the topic thoroughly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Document your findings or contributions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Share your results with the community or school</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Rewards Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-300 mb-6">
            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <span className="text-xl">🎁</span>
              Rewards
            </h4>
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg px-4 py-2 border-2 border-green-400">
                <div className="text-2xl font-bold text-green-600">{challenge.xpReward}</div>
                <div className="text-xs text-gray-600">XP Points</div>
              </div>
              <p className="text-sm sm:text-base text-green-900">
                Complete this challenge to earn XP and deepen your understanding of NIRD principles!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleMarkComplete}
              disabled={isCompleting}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCompleting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Completing...</span>
                </>
              ) : (
                <>
                  <span>✓</span>
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-800 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-gray-300"
            >
              I'll Do This Later
            </button>
          </div>

          {/* Tip */}
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500 italic">
              💡 Tip: Take a screenshot or note when you complete this challenge to remember your achievement!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
