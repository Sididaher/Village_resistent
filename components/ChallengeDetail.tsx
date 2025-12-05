'use client';

import { useState, useEffect } from 'react';
import { Challenge } from '@/lib/types/challenge';
import { getChallengeProgress, saveChallengeProgress, updateUserStats, isChallengeCompleted } from '@/lib/utils/challengeStorage';
import { checkAndAwardBadges, getBadge } from '@/lib/utils/badgeSystem';
import { getUserLevel } from '@/lib/utils/levelSystem';
import Link from 'next/link';

interface ChallengeDetailProps {
  challenge: Challenge;
}

export default function ChallengeDetail({ challenge }: ChallengeDetailProps) {
  const [checklist, setChecklist] = useState(challenge.checklist);
  const [notes, setNotes] = useState('');
  const [reflectionAnswers, setReflectionAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    // Load saved progress
    const saved = getChallengeProgress(challenge.id);
    if (saved) {
      setChecklist(saved.checklist);
      setNotes(saved.notes || '');
      setIsCompleted(saved.completed || false);
      
      // Load reflection answers if any
      if (saved.reflectionAnswers) {
        setReflectionAnswers(saved.reflectionAnswers);
      }
    }
  }, [challenge.id]);

  const handleChecklistToggle = (itemId: number) => {
    const updated = checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    
    // Auto-save progress
    saveChallengeProgress({
      challengeId: challenge.id,
      checklist: updated,
      notes,
      completed: isCompleted,
      reflectionAnswers
    });
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    // Auto-save progress
    saveChallengeProgress({
      challengeId: challenge.id,
      checklist,
      notes: value,
      completed: isCompleted,
      reflectionAnswers
    });
  };

  const handleReflectionChange = (index: number, value: string) => {
    const updated = { ...reflectionAnswers, [index]: value };
    setReflectionAnswers(updated);
    
    // Auto-save progress
    saveChallengeProgress({
      challengeId: challenge.id,
      checklist,
      notes,
      completed: isCompleted,
      reflectionAnswers: updated
    });
  };

  const handleCompleteChallenge = () => {
    if (isSubmitting || isCompleted) return;
    
    setIsSubmitting(true);
    
    // Mark as completed
    const progress = {
      challengeId: challenge.id,
      checklist,
      notes,
      completed: true,
      completedAt: new Date().toISOString(),
      reflectionAnswers
    };
    
    saveChallengeProgress(progress);
    const { newBadges: earnedBadges, levelUp: leveledUp } = updateUserStats(challenge.xpReward, challenge.id);
    
    // Check for badges after stats are updated (localStorage is synchronous, so this works immediately)
    const newlyEarnedBadges = checkAndAwardBadges();
    const allNewBadges = [...earnedBadges, ...newlyEarnedBadges];
    
    setIsCompleted(true);
    setNewBadges(allNewBadges);
    setLevelUp(leveledUp);
    setShowCelebration(true);
    setIsSubmitting(false);
    
    // Hide celebration after 7 seconds (longer if badges/level up)
    setTimeout(() => {
      setShowCelebration(false);
    }, allNewBadges.length > 0 || leveledUp ? 7000 : 5000);
  };

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

  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklist.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/challenges"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all border-2 border-gray-200"
        >
          <span>←</span>
          <span>All Challenges</span>
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <span>📊</span>
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-lg mx-4 animate-bounce">
            <div className="text-7xl md:text-8xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Challenge Complete!
            </h2>
            <div className="text-5xl md:text-6xl font-bold text-green-600 mb-4">
              +{challenge.xpReward} XP
            </div>
            
            {levelUp && (
              <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-400">
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-xl font-bold text-purple-900">LEVEL UP!</p>
                <p className="text-sm text-purple-700">You've reached a new level!</p>
              </div>
            )}
            
            {newBadges.length > 0 && (
              <div className="mb-4 p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl border-2 border-yellow-400">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-lg font-bold text-yellow-900 mb-2">New Badge Earned!</p>
                <div className="space-y-2">
                  {newBadges.map(badgeId => {
                    const badge = getBadge(badgeId);
                    return badge ? (
                      <div key={badgeId} className="flex items-center justify-center gap-2">
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="font-semibold text-yellow-900">{badge.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            <p className="text-lg text-gray-700 mb-6">
              Great job completing this challenge! Your XP has been added to your total.
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Awesome! 🎯
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-gray-200">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl md:text-6xl">{challenge.icon}</span>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {challenge.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              {challenge.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full border-2 ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty.toUpperCase()}
              </span>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full border-2 bg-gradient-to-r ${getCategoryColor(challenge.category)} text-white`}>
                {challenge.category.replace('-', ' ').toUpperCase()}
              </span>
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full border-2 border-yellow-300">
                <span className="text-lg">⭐</span>
                <span className="text-sm font-bold text-yellow-900">
                  {challenge.xpReward} XP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Progress: {completedCount} / {checklist.length} tasks
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 md:h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 md:h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span>📋</span>
          Step-by-Step Instructions
        </h2>
        <ol className="space-y-3">
          {challenge.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <span className="text-base md:text-lg text-gray-700 leading-relaxed pt-1">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Resources Section */}
      {challenge.resources && challenge.resources.length > 0 && (
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span>🔗</span>
            Helpful Resources
          </h2>
          <div className="space-y-3">
            {challenge.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-blue-900 mb-1">{resource.title}</h3>
                <p className="text-sm text-blue-700">{resource.description}</p>
                <span className="text-xs text-blue-600 mt-2 inline-block">🔗 Open link</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Checklist Section */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span>☑️</span>
          Progress Checklist
        </h2>
        <div className="space-y-3">
          {checklist.map((item) => (
            <label
              key={item.id}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                item.completed
                  ? 'bg-green-50 border-green-300'
                  : 'bg-gray-50 border-gray-300 hover:border-blue-400'
              }`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleChecklistToggle(item.id)}
                className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <span className={`flex-1 text-base md:text-lg ${
                item.completed ? 'text-green-900 line-through' : 'text-gray-900'
              }`}>
                {item.text}
              </span>
              {item.completed && (
                <span className="text-2xl">✓</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Reflection Questions */}
      {challenge.reflectionQuestions && challenge.reflectionQuestions.length > 0 && (
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span>💭</span>
            Reflection Questions
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Take a moment to reflect on your experience. Your answers will help you remember what you learned.
          </p>
          <div className="space-y-4">
            {challenge.reflectionQuestions.map((question, index) => (
              <div key={index}>
                <label className="block text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {index + 1}. {question}
                </label>
                <textarea
                  value={reflectionAnswers[index] || ''}
                  onChange={(e) => handleReflectionChange(index, e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes/Journal Section */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span>📝</span>
          Notes & Journal
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Write down your thoughts, challenges, or discoveries as you work through this challenge.
        </p>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Write your notes here... What did you learn? What was challenging? What surprised you?"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
          rows={6}
        />
      </div>

      {/* Complete Button */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 text-center">
        {isCompleted ? (
          <div>
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Challenge Completed!
            </h3>
            <p className="text-white/90 mb-4">
              You earned {challenge.xpReward} XP for completing this challenge.
            </p>
            <Link
              href="/challenges"
              className="inline-block px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Back to Challenges
            </Link>
          </div>
        ) : (
          <div>
            <button
              onClick={handleCompleteChallenge}
              disabled={isSubmitting}
              className="px-8 py-4 bg-white text-green-600 text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : '✓ Mark as Completed'}
            </button>
            <p className="text-white/90 mt-4 text-sm">
              Complete the checklist and reflection to get the full experience!
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/challenges"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
        >
          <span>🎯</span>
          <span>Browse More Challenges</span>
        </Link>
        <Link
          href="/learn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
        >
          <span>📚</span>
          <span>Learn NIRD</span>
        </Link>
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
        >
          <span>📊</span>
          <span>View Progress</span>
        </Link>
      </div>
    </div>
  );
}

