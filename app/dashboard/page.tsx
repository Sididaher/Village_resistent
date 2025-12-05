'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useGame } from '@/lib/context/GameContext';
import { getUserStats } from '@/lib/utils/challengeStorage';
import { getUserLevel } from '@/lib/utils/levelSystem';
import { getDiscoveredTechnologies, allTechnologies, getTechnologyDetails } from '@/lib/utils/technologies';
import { getEarnedBadges, getAllBadges } from '@/lib/utils/badgeSystem';
import { attacks, MAX_ATTACKS } from '@/lib/data/attacks';
import { Trophy, TrendingUp, Lightbulb, Target, Award, Star, Flame, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { gameState, getResult } = useGame();
  const [stats, setStats] = useState(getUserStats());
  const [discoveredTechs, setDiscoveredTechs] = useState<string[]>([]);
  const [badges, setBadges] = useState(getAllBadges());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadData();
  }, []);

  const loadData = () => {
    setStats(getUserStats());
    setDiscoveredTechs(getDiscoveredTechnologies());
    setBadges(getAllBadges());
  };

  // Calculate game progress
  const gameProgress = gameState.currentAttackIndex > 0 
    ? (gameState.currentAttackIndex / MAX_ATTACKS) * 100 
    : 0;
  
  const gameResult = gameState.gameCompleted ? getResult() : null;
  const gameScore = gameResult ? gameResult.score : gameState.score;
  const gameMaxScore = MAX_ATTACKS;

  // Challenge stats
  const challengeProgress = stats.completedChallenges.length;
  const totalChallenges = 10; // Total challenges available
  const challengePercentage = (challengeProgress / totalChallenges) * 100;

  // Level info
  const levelInfo = getUserLevel(stats.totalXP);
  const earnedBadgesCount = badges.filter(b => b.earned).length;

  // Get technology details
  const discoveredTechDetails = discoveredTechs
    .map(id => getTechnologyDetails(id))
    .filter((tech): tech is NonNullable<typeof tech> => tech !== undefined);

  // Motivational messages
  const getMotivationalMessage = () => {
    if (gameProgress === 100) {
      return "🎉 Perfect! You've completed all attacks! You're a true NIRD champion!";
    }
    if (challengeProgress >= 10) {
      return "🌟 Outstanding! You've completed all challenges! Keep exploring!";
    }
    if (challengeProgress >= 5) {
      return "💪 Great progress! You're halfway through the challenges!";
    }
    if (discoveredTechs.length >= 5) {
      return "🔍 Excellent! You've discovered many sustainable technologies!";
    }
    if (stats.totalXP >= 300) {
      return "⭐ Amazing! You've earned significant XP! Keep learning!";
    }
    return "🚀 Welcome! Start your journey to digital independence!";
  };

  if (!isClient) {
    return (
      <Layout>
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Village Résistant Dashboard
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Track your progress and discover sustainable digital solutions
            </p>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
            <p className="text-lg md:text-xl font-semibold text-gray-900 text-center">
              {getMotivationalMessage()}
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8" />
                <span className="text-sm opacity-90">Game Score</span>
              </div>
              <div className="text-4xl font-bold mb-2">{gameScore}/{gameMaxScore}</div>
              <div className="text-sm opacity-90">
                {gameState.gameCompleted 
                  ? 'Game Completed!' 
                  : `${gameState.currentAttackIndex} attacks completed`}
              </div>
            </div>

            {/* Level Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8" />
                <span className="text-sm opacity-90">Level</span>
              </div>
              <div className="text-4xl font-bold mb-2">Level {levelInfo.level}</div>
              <div className="text-sm opacity-90">{stats.totalXP} XP</div>
            </div>

            {/* Challenges Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8" />
                <span className="text-sm opacity-90">Challenges</span>
              </div>
              <div className="text-4xl font-bold mb-2">{challengeProgress}/{totalChallenges}</div>
              <div className="text-sm opacity-90">Completed</div>
            </div>

            {/* Badges Card */}
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8" />
                <span className="text-sm opacity-90">Badges</span>
              </div>
              <div className="text-4xl font-bold mb-2">{earnedBadgesCount}</div>
              <div className="text-sm opacity-90">Earned</div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Game Progress */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Game Progress
              </h2>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Attacks Completed
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {Math.round(gameProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${gameProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {gameState.currentAttackIndex} out of {MAX_ATTACKS} attacks completed
                </p>
              </div>
              {!gameState.gameCompleted && (
                <Link
                  href="/game/start"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-semibold"
                >
                  Continue Game
                </Link>
              )}
            </div>

            {/* Challenge Progress */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                Challenge Progress
              </h2>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Challenges Completed
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {Math.round(challengePercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${challengePercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {challengeProgress} out of {totalChallenges} challenges completed
                </p>
              </div>
              <Link
                href="/challenges"
                className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all text-sm font-semibold"
              >
                View Challenges
              </Link>
            </div>
          </div>

          {/* Sustainable Technologies Discovered */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8 border-2 border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-green-600" />
              Sustainable Technologies Discovered
            </h2>
            <p className="text-gray-600 mb-6">
              Technologies you've discovered by choosing NIRD solutions during gameplay
            </p>
            
            {discoveredTechDetails.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">No technologies discovered yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Play the game and choose sustainable solutions to discover technologies!
                </p>
                <Link
                  href="/game/start"
                  className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-semibold"
                >
                  Start Playing
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {discoveredTechDetails.map(tech => (
                  <div
                    key={tech.id}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200 hover:border-green-400 transition-all"
                  >
                    <div className="text-4xl mb-2">{tech.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
                    <p className="text-sm text-gray-700">{tech.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* XP Progress */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                XP Progress
              </h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalXP} XP</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${levelInfo.progressPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {levelInfo.xpForNextLevel} XP until Level {levelInfo.level + 1}
              </p>
            </div>

            {/* Streak */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Day Streak
              </h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.streak}</div>
              <p className="text-sm text-gray-600">Consecutive days active</p>
            </div>

            {/* Recent Badges */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                Recent Badges
              </h3>
              <div className="space-y-2">
                {badges.filter(b => b.earned).slice(0, 3).map(({ badge }) => (
                  <div key={badge.id} className="flex items-center gap-2">
                    <span className="text-2xl">{badge.icon}</span>
                    <span className="text-sm font-semibold text-gray-900">{badge.name}</span>
                  </div>
                ))}
                {badges.filter(b => b.earned).length === 0 && (
                  <p className="text-sm text-gray-500">No badges yet</p>
                )}
                {badges.filter(b => b.earned).length > 3 && (
                  <Link
                    href="/badges"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View all badges →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 md:p-8 text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/game/start"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all backdrop-blur-sm"
              >
                <div className="text-3xl mb-2">🎮</div>
                <div className="font-semibold">Play Game</div>
              </Link>
              <Link
                href="/challenges"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all backdrop-blur-sm"
              >
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-semibold">Challenges</div>
              </Link>
              <Link
                href="/community"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all backdrop-blur-sm"
              >
                <div className="text-3xl mb-2">👥</div>
                <div className="font-semibold">Community</div>
              </Link>
              <Link
                href="/badges"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all backdrop-blur-sm"
              >
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-semibold">Badges</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

