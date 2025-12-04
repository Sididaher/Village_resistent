'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import ScoreBadge from '@/components/ScoreBadge';
import { useGame } from '@/lib/context/GameContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultPage() {
  const { gameState, getResult, resetGame } = useGame();
  const router = useRouter();
  const result = getResult();

  useEffect(() => {
    if (!gameState.gameCompleted) {
      router.push('/');
    }
  }, [gameState.gameCompleted, router]);

  if (!gameState.gameCompleted) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Battle Complete!</h1>
          <p className="text-xl text-gray-600">Here&apos;s how your village performed</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ScoreBadge
            score={result.score}
            maxScore={result.maxScore}
            percentage={result.percentage}
          />

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {result.evaluation}
            </h2>

            {result.percentage === 100 && (
              <p className="text-lg text-green-700 mb-6">
                Outstanding! Your school has achieved complete digital independence.
                You&apos;ve shown that sustainable, open-source solutions can handle
                any challenge the tech empire throws at you!
              </p>
            )}

            {result.percentage >= 60 && result.percentage < 100 && (
              <p className="text-lg text-blue-700 mb-6">
                Great job! Your school is well on its way to digital sustainability.
                With a few more strategic choices, you&apos;ll achieve complete independence.
              </p>
            )}

            {result.percentage < 60 && (
              <p className="text-lg text-orange-700 mb-6">
                The tech empire has gained significant influence over your school.
                But it&apos;s not too late! Learn about NIRD principles and try again
                to reclaim your digital independence.
              </p>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">
                Decisions Made:
              </p>
              <div className="flex gap-2 flex-wrap">
                {gameState.selectedChoices.map((isGood, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isGood
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {isGood ? '✓' : '✗'} Attack {index + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Tips for Building a Resistant School
          </h3>
          <ul className="space-y-3">
            {result.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            What is NIRD?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <h4 className="font-bold text-lg mb-2">Digital Independence</h4>
              <p className="text-sm text-gray-700">
                Freedom from vendor lock-in and proprietary control
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">♻️</div>
              <h4 className="font-bold text-lg mb-2">Reuse Hardware</h4>
              <p className="text-sm text-gray-700">
                Extend device lifespan with lightweight open-source systems
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔓</div>
              <h4 className="font-bold text-lg mb-2">Open Source</h4>
              <p className="text-sm text-gray-700">
                Transparent, community-driven, and free software
              </p>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-8 text-white text-center">
          <span className="text-5xl sm:text-6xl mb-4 block">🎯</span>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready for More Challenges?
          </h3>
          <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Test your NIRD knowledge with real-world scenarios and practical challenges!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/scenarios"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
            >
              Try Scenarios 🎮
            </Link>
            <Link
              href="/challenges"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
            >
              View Challenges 🏆
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Play Again 🔄
          </button>

          <Link
            href="/learn"
            className="px-8 py-4 bg-white text-gray-800 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-300 text-center"
          >
            Learn More About NIRD 📚
          </Link>

          <Link
            href="/"
            className="px-8 py-4 bg-gray-100 text-gray-800 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
          >
            Home 🏠
          </Link>
        </div>
      </div>
    </Layout>
  );
}
