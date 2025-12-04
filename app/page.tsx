import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-8">
        <div className="mb-6 md:mb-8 animate-bounce">
          <span className="text-6xl sm:text-7xl md:text-9xl">🏰</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent px-4">
          Village Résistant
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 md:mb-4 max-w-2xl px-4">
          Protect your digital village from the tech empire using NIRD&apos;s smart and sustainable solutions
        </p>

        <p className="text-base sm:text-lg text-gray-600 mb-8 md:mb-12 max-w-xl px-4">
          Learn how schools can maintain independence and sustainability with open-source solutions
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4">
          <Link
            href="/game/start"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Start the Game 🎮
          </Link>

          <Link
            href="/scenarios"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Try Scenarios 🎯
          </Link>

          <Link
            href="/learn"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-300 w-full sm:w-auto text-center"
          >
            Learn About NIRD 📚
          </Link>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full px-4">
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-lg">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">🛡️</div>
            <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-900">Digital Independence</h3>
            <p className="text-gray-600 text-xs md:text-sm">
              Break free from vendor lock-in and proprietary systems
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 shadow-lg">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">♻️</div>
            <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-900">Reuse Hardware</h3>
            <p className="text-gray-600 text-xs md:text-sm">
              Give old computers new life with lightweight Linux
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 shadow-lg sm:col-span-2 md:col-span-1">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">🔓</div>
            <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-900">Open Source</h3>
            <p className="text-gray-600 text-xs md:text-sm">
              Use free, transparent, and community-driven software
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
