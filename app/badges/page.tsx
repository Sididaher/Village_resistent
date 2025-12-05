'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { BadgeGrid, BadgeDisplay } from '@/components/BadgeDisplay';
import LevelDisplay from '@/components/LevelDisplay';
import { getAllBadges } from '@/lib/utils/badgeSystem';
import { getUserStats } from '@/lib/utils/challengeStorage';
import { getUserLevel } from '@/lib/utils/levelSystem';
import { Trophy, Award, TrendingUp } from 'lucide-react';

export default function BadgesPage() {
  const [badges, setBadges] = useState<{ badge: any; earned: boolean; earnedAt?: string }[]>([]);
  const [stats, setStats] = useState(() => {
    // Initialize with default values to match server render
    if (typeof window === 'undefined') {
      return {
        completedChallenges: [],
        totalXP: 0,
        streak: 0,
        lastActivityDate: '',
        earnedBadges: [],
        level: 1
      };
    }
    return getUserStats();
  });
  const [userLevel, setUserLevel] = useState(() => {
    // Initialize with default values to match server render
    if (typeof window === 'undefined') {
      return getUserLevel(0);
    }
    return getUserLevel(stats.totalXP);
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    // Load data from localStorage
    const currentStats = getUserStats();
    const allBadges = getAllBadges();
    const currentLevel = getUserLevel(currentStats.totalXP);
    
    setBadges(allBadges);
    setStats(currentStats);
    setUserLevel(currentLevel);
  }, []);

  const earnedCount = badges.filter(b => b.earned).length;
  const totalBadges = badges.length;

  // Show loading state during hydration to prevent mismatch
  if (!isClient) {
    return (
      <Layout>
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your achievements...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <Trophy className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Your Achievements
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Track your progress, earn badges, and level up as you master NIRD principles!
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
              <TrendingUp className="w-10 h-10 md:w-12 md:h-12 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold mb-1">Level {userLevel.level}</div>
              <div className="text-sm sm:text-base opacity-90">{userLevel.xp} XP</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
              <Award className="w-10 h-10 md:w-12 md:h-12 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold mb-1">{earnedCount}/{totalBadges}</div>
              <div className="text-sm sm:text-base opacity-90">Badges Earned</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-5 md:p-6 shadow-lg">
              <Trophy className="w-10 h-10 md:w-12 md:h-12 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold mb-1">{stats.completedChallenges.length}</div>
              <div className="text-sm sm:text-base opacity-90">Challenges Completed</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Your Level Progress
            </h2>
            <LevelDisplay level={userLevel} showProgress={true} />
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-600" />
                Your Badges
              </h2>
              <div className="text-sm font-semibold text-gray-600">
                {earnedCount} of {totalBadges} unlocked
              </div>
            </div>
            <BadgeGrid badges={badges} showLocked={true} />
          </div>

          {/* Badge Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Earned Badges */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Earned Badges ({earnedCount})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.filter(b => b.earned).map(({ badge }) => (
                  <BadgeDisplay
                    key={badge.id}
                    badge={badge}
                    earned={true}
                    size="sm"
                    showName={true}
                  />
                ))}
                {earnedCount === 0 && (
                  <p className="col-span-full text-center text-gray-600 py-4">
                    Complete challenges to earn your first badge!
                  </p>
                )}
              </div>
            </div>

            {/* Locked Badges */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                Locked Badges ({totalBadges - earnedCount})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.filter(b => !b.earned).map(({ badge }) => (
                  <BadgeDisplay
                    key={badge.id}
                    badge={badge}
                    earned={false}
                    size="sm"
                    showName={true}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* How to Earn Badges */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border-2 border-blue-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              How to Earn Badges
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="font-semibold">🟦 Beginner Explorer</p>
              <p className="text-sm ml-6">Complete your first challenge</p>
              
              <p className="font-semibold">🍃 Eco-Friendly Warrior</p>
              <p className="text-sm ml-6">Complete 3 sustainability challenges</p>
              
              <p className="font-semibold">🌐 Digital Responsibility Champion</p>
              <p className="text-sm ml-6">Reach 300+ XP</p>
              
              <p className="font-semibold">🐧 Linux Hero</p>
              <p className="text-sm ml-6">Complete all Linux-related challenges</p>
              
              <p className="font-semibold">🏆 NIRD Master</p>
              <p className="text-sm ml-6">Complete 15+ challenges and reach Level 10</p>
              
              <p className="font-semibold">🔥 Streak Master</p>
              <p className="text-sm ml-6">Maintain a 7-day streak</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

