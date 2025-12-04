'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ChallengeCard from '@/components/ChallengeCard';
import { challenges } from '@/lib/data/challenges';
import { getUserStats } from '@/lib/utils/challengeStorage';
import { BarChart3, Star, Flame } from 'lucide-react';
import Link from 'next/link';

export default function ChallengesPage() {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Load stats from localStorage
    const stats = getUserStats();
    setCompletedChallenges(stats.completedChallenges);
    setTotalXP(stats.totalXP);
    setStreak(stats.streak);
  }, []);

  // Refresh stats when returning from detail page
  useEffect(() => {
    const handleFocus = () => {
      const stats = getUserStats();
      setCompletedChallenges(stats.completedChallenges);
      setTotalXP(stats.totalXP);
      setStreak(stats.streak);
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const easyChall = challenges.filter(c => c.difficulty === 'easy');
  const mediumChall = challenges.filter(c => c.difficulty === 'medium');
  const hardChall = challenges.filter(c => c.difficulty === 'hard');

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <span className="text-5xl sm:text-6xl md:text-7xl mb-4 block">🎯</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              NIRD Challenges
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Put NIRD principles into practice with real-world challenges. Complete them to earn XP and deepen your understanding!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
              <BarChart3 className="w-10 h-10 md:w-12 md:h-12 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold mb-1">{completedChallenges.length}</div>
              <div className="text-sm sm:text-base opacity-90">Challenges Completed</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
              <Star className="w-10 h-10 md:w-12 md:h-12 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold mb-1">{totalXP}</div>
              <div className="text-sm sm:text-base opacity-90">Total XP Earned</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
              <Flame className="w-10 h-10 md:w-12 md:h-12 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold mb-1">{streak}</div>
              <div className="text-sm sm:text-base opacity-90">Day Streak</div>
            </div>
          </div>

          {/* Easy Challenges */}
          <section className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Easy Challenges</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold border-2 border-green-300">
                {easyChall.length} available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {easyChall.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                />
              ))}
            </div>
          </section>

          {/* Medium Challenges */}
          <section className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Medium Challenges</h2>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold border-2 border-yellow-300">
                {mediumChall.length} available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {mediumChall.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                />
              ))}
            </div>
          </section>

          {/* Hard Challenges */}
          <section className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Hard Challenges</h2>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold border-2 border-red-300">
                {hardChall.length} available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {hardChall.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                />
              ))}
            </div>
          </section>

          {/* CTA to scenarios */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-10 text-center text-white shadow-2xl">
            <span className="text-5xl sm:text-6xl mb-4 block">🎮</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ready for Interactive Scenarios?
            </h2>
            <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Test your decision-making skills with real-world situations. Make choices, see consequences, and learn from experience!
            </p>
            <Link
              href="/scenarios"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Try Scenarios 🎯
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
