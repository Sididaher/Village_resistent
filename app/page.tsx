import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-10 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6 py-16">
            {/* Icon with enhanced animation */}
            <div className="mb-8 md:mb-12 transform transition-all duration-500 hover:scale-110">
              <div className="relative">
                <span className="text-7xl sm:text-8xl md:text-9xl drop-shadow-2xl animate-bounce">🏰</span>
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse" />
              </div>
            </div>

            {/* Main Title */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Village Résistant
              </h1>
              <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-semibold mb-4 max-w-3xl leading-relaxed">
              Protect your digital village from the tech empire
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
              Learn how schools can maintain independence and sustainability with NIRD&apos;s smart and open-source solutions
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto mb-8">
              <Link
                href="/game/start"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Start the Game
                  <span className="text-2xl">🎮</span>
                </span>
              </Link>

              <Link
                href="/challenges"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Try Challenges
                  <span className="text-2xl">🎯</span>
                </span>
              </Link>

              <Link
                href="/learn"
                className="group relative px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-blue-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Learn About NIRD
                  <span className="text-2xl">📚</span>
                </span>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 animate-bounce">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* NIRD Principles Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                The NIRD Principles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the three pillars of digital independence and sustainability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Digital Independence Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🛡️</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Digital Independence</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Break free from vendor lock-in and proprietary systems. Take control of your digital infrastructure with sovereign solutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">Open Source</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">Freedom</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">Control</span>
                </div>
              </div>

              {/* Reuse Hardware Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-100 hover:border-emerald-400 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">♻️</div>
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">Reuse Hardware</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Give old computers new life with lightweight Linux distributions. Reduce e-waste and save money while maintaining performance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">Sustainable</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">Eco-Friendly</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">Economic</span>
                </div>
              </div>

              {/* Open Source Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:border-purple-400 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🔓</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Open Source</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Use free, transparent, and community-driven software. Benefit from global collaboration and continuous innovation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">Transparent</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">Community</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Real-World Impact
              </h2>
              <p className="text-xl opacity-90">
                See what schools are achieving with NIRD principles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-5xl font-black mb-2">120K€</div>
                <div className="text-lg opacity-90">Saved by Lycée Carnot</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-5xl font-black mb-2">60%</div>
                <div className="text-lg opacity-90">Carbon Reduction</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-5xl font-black mb-2">450+</div>
                <div className="text-lg opacity-90">Students Trained</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Ready to Join the Resistance?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Start your journey towards digital independence and sustainability today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                View Dashboard 📊
              </Link>
              <Link
                href="/challenges"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore Challenges 🎯
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
