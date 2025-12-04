'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import { useGame } from '@/lib/context/GameContext';
import { useEffect } from 'react';

export default function GameStart() {
  const { resetGame } = useGame();

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
        <div className="max-w-3xl w-full bg-white rounded-xl md:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border-2 md:border-4 border-green-500">
          <div className="text-center mb-6 md:mb-8">
            <span className="text-5xl sm:text-6xl md:text-7xl mb-3 md:mb-4 block">🏰⚔️</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 px-2">
              The Digital Village Under Attack
            </h1>
          </div>

          <div className="space-y-4 md:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
            <p>
              Your school is a small digital village, trying to serve students and teachers
              with limited resources. For years, you&apos;ve managed to keep things running,
              but now you face a new challenge.
            </p>

            <p className="font-semibold text-lg sm:text-xl text-red-700">
              The Tech Empire is attacking!
            </p>

            <p>
              Large technology corporations want to force your village into expensive contracts,
              proprietary software, and planned obsolescence. They claim their solutions are
              the only way forward.
            </p>

            <p className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded text-sm sm:text-base">
              But there&apos;s another path: <strong>NIRD</strong> (Digital Independence,
              Open-source Software, and Hardware Reuse). With smart decisions, you can keep
              your village independent, sustainable, and thriving.
            </p>

            <p className="font-semibold text-lg sm:text-xl text-gray-900">
              Can you defend your digital village?
            </p>

            <p className="text-sm sm:text-base text-gray-600">
              You&apos;ll face {12} different attacks. Each time, you must choose between
              a sustainable NIRD solution or an expensive commercial alternative.
              The options will be presented randomly, so read carefully and think about each choice!
            </p>
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <Link
              href="/game/attack/1"
              className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Start the Battle 🛡️
            </Link>
          </div>

          <div className="mt-6 md:mt-8 bg-blue-50 rounded-lg p-3 md:p-4 text-xs sm:text-sm text-gray-600">
            <p className="font-semibold mb-2">Game Mechanics:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Choose NIRD solutions to gain points and maintain village health</li>
              <li>Commercial solutions will cost you village health (hearts)</li>
              <li>Your final score determines how resistant your school becomes</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
