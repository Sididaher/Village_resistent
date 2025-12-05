"use client";

import { useState } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/nird/HeroSection';
import ChallengesSection from '@/components/nird/ChallengesSection';
import InteractiveJourney from '@/components/nird/InteractiveJourney';
import Partners from '@/components/nird/Partners';
import Testimonials from '@/components/nird/Testimonials';
import FAQ from '@/components/nird/FAQ';
import CarnotSuccessStories from '@/components/nird/CarnotSuccessStories';
import CostSimulator from '@/components/nird/CostSimulator';
import DiagnosticQuiz from '@/components/nird/DiagnosticQuiz';

export default function Home() {
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const handleGetStarted = () => {
    const element = document.getElementById('parcours');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiagnosticComplete = (result: any) => {
    console.log("Diagnostic result:", result);
    setShowDiagnostic(false);
    // You could add a toast or redirect here
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section id="home">
          <HeroSection onGetStarted={handleGetStarted} />
        </section>

        {/* Features / Principles Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Les Piliers NIRD
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les fondements d'un numérique libre, éthique et durable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Digital Independence Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🛡️</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Indépendance Numérique</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Libérez-vous des systèmes propriétaires. Prenez le contrôle de votre infrastructure avec des solutions souveraines.
                </p>
              </div>

              {/* Reuse Hardware Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-100 hover:border-emerald-400 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">♻️</div>
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">Durabilité</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Donnez une seconde vie au matériel avec Linux. Réduisez les déchets électroniques et faites des économies.
                </p>
              </div>

              {/* Open Source Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:border-purple-400 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🔓</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Open Source</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  Utilisez des logiciels libres et transparents. Bénéficiez de l'innovation communautaire mondiale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostic & Simulator Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-8">Évaluez votre établissement</h2>
              <button
                onClick={() => setShowDiagnostic(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Lancer le Diagnostic NIRD 🎯
              </button>
            </div>

            {showDiagnostic && (
              <DiagnosticQuiz
                onComplete={handleDiagnosticComplete}
                onClose={() => setShowDiagnostic(false)}
              />
            )}

            <CostSimulator />
          </div>
        </section>

        {/* Challenges Section */}
        <section id="challenges" className="py-20 bg-gray-50">
          <ChallengesSection />
        </section>

        {/* Interactive Journey (Parcours) */}
        <section id="parcours" className="py-20 bg-white">
          <InteractiveJourney />
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gray-50">
          <CarnotSuccessStories />
        </section>

        {/* Partners */}
        <section id="partners" className="py-20 bg-white">
          <Partners />
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-white">
          <FAQ />
        </section>

        {/* Contact / Footer Area */}
        <section id="contact" className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Rejoignez le Village Résistant</h2>
            <p className="text-xl text-gray-300 mb-12">
              Ensemble, construisons un avenir numérique plus libre et plus durable.
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="px-8 py-4 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition-colors">
                Nous Contacter
              </a>
              <a href="https://github.com/Sididaher/Village_resistent" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gray-800 rounded-full font-bold hover:bg-gray-700 transition-colors border border-gray-700">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
