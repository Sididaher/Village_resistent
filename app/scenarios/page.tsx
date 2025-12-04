'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import ScenarioCard from '@/components/ScenarioCard';
import { miniScenarios } from '@/lib/data/scenarios';
import Link from 'next/link';

export default function ScenariosPage() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleScenarioComplete = (earnedXP: number) => {
    const currentScenarioId = miniScenarios[currentScenarioIndex].id;

    setTotalXP(prev => prev + earnedXP);
    setCompletedScenarios(prev => [...prev, currentScenarioId]);

    // Move to next scenario after a delay
    setTimeout(() => {
      if (currentScenarioIndex < miniScenarios.length - 1) {
        setCurrentScenarioIndex(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 4000);
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setCompletedScenarios([]);
    setTotalXP(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
          <div className="max-w-3xl w-full bg-white rounded-xl md:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border-2 md:border-4 border-purple-500 text-center">
            <span className="text-6xl sm:text-7xl md:text-8xl mb-6 block">🎓</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              All Scenarios Complete!
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-6">
              You've completed all {miniScenarios.length} scenarios and gained valuable decision-making experience.
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 md:p-8 mb-8 border-2 border-purple-300">
              <div className="text-5xl sm:text-6xl font-bold text-purple-600 mb-2">
                {totalXP} XP
              </div>
              <div className="text-base sm:text-lg text-gray-700">Total Experience Earned</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-left">
                <p className="text-sm sm:text-base text-gray-700">
                  <strong className="text-blue-900">Key Takeaway:</strong> NIRD principles aren't just theory—they're practical tools for making better, more sustainable decisions about technology.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Try Again 🔄
              </button>
              <Link
                href="/challenges"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
              >
                Explore Challenges 🎯
              </Link>
              <Link
                href="/"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-300 text-center"
              >
                Back to Home 🏠
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentScenario = miniScenarios[currentScenarioIndex];

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <span className="text-4xl sm:text-5xl md:text-6xl mb-3 block">🎮</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Decision-Making Scenarios
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Real-world situations that test your understanding of NIRD principles
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base font-semibold text-gray-700">
                Scenario {currentScenarioIndex + 1} of {miniScenarios.length}
              </span>
              <span className="text-sm sm:text-base font-semibold text-purple-600">
                {totalXP} XP
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 md:h-4">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 md:h-4 rounded-full transition-all duration-500"
                style={{ width: `${((currentScenarioIndex + 1) / miniScenarios.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Scenario */}
          <ScenarioCard
            scenario={currentScenario}
            onComplete={handleScenarioComplete}
          />

          {/* Navigation hint */}
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Choose your answer to proceed to the next scenario
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
