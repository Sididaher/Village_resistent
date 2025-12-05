'use client';

import Layout from '@/components/Layout';
import ChallengesSection from '@/components/nird/ChallengesSection';

export default function LearnPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section with enhanced design */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-emerald-50 to-blue-50">
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full opacity-10 blur-3xl" />
          </div>

          <div className="relative text-center py-20 px-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl animate-bounce">🏆</span>
              <span>Nuit de l'Info 2025 • Défi NIRD</span>
              <span className="text-3xl animate-pulse">✨</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-8 leading-tight">
              Plateforme d'Apprentissage NIRD
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 max-w-5xl mx-auto font-semibold leading-relaxed mb-4">
              Découvrez le <span className="text-purple-600 font-black">numérique libre</span>,{' '}
              <span className="text-emerald-600 font-black">inclusif</span> et{' '}
              <span className="text-blue-600 font-black">durable</span>
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Relevez des défis interactifs et devenez un expert des solutions numériques responsables
            </p>

            {/* Stats Cards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-100 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className="relative inline-block mb-4">
                    <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                      120.000€
                    </div>
                    <div className="absolute -inset-2 bg-purple-200 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-700">
                    Économisés par le Lycée Carnot
                  </div>
                  <div className="mt-2 h-1 w-16 mx-auto bg-gradient-to-r from-purple-500 to-purple-300 rounded-full" />
                </div>

                <div className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className="relative inline-block mb-4">
                    <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                      60%
                    </div>
                    <div className="absolute -inset-2 bg-emerald-200 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-700">
                    Réduction Empreinte Carbone
                  </div>
                  <div className="mt-2 h-1 w-16 mx-auto bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" />
                </div>

                <div className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className="relative inline-block mb-4">
                    <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                      450+
                    </div>
                    <div className="absolute -inset-2 bg-blue-200 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-700">
                    Élèves Formés à Linux
                  </div>
                  <div className="mt-2 h-1 w-16 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Challenges NIRD */}
        <ChallengesSection />

        {/* Section Information NIRD - Enhanced Design */}
        <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full opacity-30 blur-3xl" />
            <div className="absolute bottom-40 left-20 w-72 h-72 bg-emerald-100 rounded-full opacity-30 blur-3xl" />
          </div>

          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="text-6xl">🎯</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Qu'est-ce que NIRD ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les trois piliers d'un numérique maîtrisé et responsable
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {/* Numérique Card */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-2xl border-2 border-purple-100 hover:border-purple-400 transition-all duration-500 hover:scale-105 hover:-translate-y-3">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">🎨</div>
                <h3 className="text-3xl font-black text-purple-600 mb-4">Numérique</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Un numérique <span className="font-bold text-purple-600">maîtrisé et souverain</span>, qui respecte votre indépendance technologique et vos données.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border border-purple-200">Souveraineté</span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border border-purple-200">Contrôle</span>
                </div>
              </div>

              {/* Inclusif Card */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-2xl border-2 border-emerald-100 hover:border-emerald-400 transition-all duration-500 hover:scale-105 hover:-translate-y-3">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">🌟</div>
                <h3 className="text-3xl font-black text-emerald-600 mb-4">Inclusif</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Des solutions <span className="font-bold text-emerald-600">accessibles à tous</span>, qui favorisent l'égalité d'accès au numérique et à l'éducation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-200">Accessibilité</span>
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-200">Égalité</span>
                </div>
              </div>

              {/* Responsable & Durable Card */}
              <div className="group relative bg-white rounded-3xl p-10 shadow-2xl border-2 border-blue-100 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:-translate-y-3">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">🌱</div>
                <h3 className="text-3xl font-black text-blue-600 mb-4">Responsable & Durable</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Un numérique <span className="font-bold text-blue-600">éco-responsable</span> qui prolonge la vie du matériel et réduit l'impact environnemental.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-200">Écologie</span>
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-200">Durabilité</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final - Enhanced */}
        <section className="relative py-24 bg-gradient-to-br from-purple-600 via-emerald-600 to-blue-600 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative container mx-auto px-6 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-6xl mb-8 animate-bounce">🚀</div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
                Prêt à relever les défis NIRD ?
              </h2>
              <p className="text-xl md:text-2xl mb-12 opacity-95 leading-relaxed">
                Testez vos connaissances, débloquez des badges et devenez un expert du numérique libre et durable !
              </p>
              <button
                onClick={() => {
                  const section = document.getElementById('challenges');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-10 py-5 bg-white text-purple-700 text-xl font-black rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-3">
                  Commencer maintenant
                  <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
