"use client";

import { Button } from "./index";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond professionnelle */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/80 to-cyan-900/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Digital Education Classroom"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animation de particules */}
      <div className="absolute inset-0 z-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto">
        {/* Badge animé */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 animate-bounce">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Nuit de l'Info 2025 • Innovation Éducative
        </div>

        {/* Titre principal avec effet de frappe */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block mb-2">Le Village</span>
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Numérique Résistant
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
          Transformons l'éducation avec un numérique <strong className="text-emerald-300">libre</strong>,{" "}
          <strong className="text-teal-300">inclusif</strong> et{" "}
          <strong className="text-cyan-300">durable</strong>
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-3">🚀</span>
            Commencer l'aventure
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-emerald-700 backdrop-blur-sm"
          >
            <span className="mr-3">📖</span>
            En savoir plus
          </Button>
        </div>

        {/* Indicateur de défilement */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Découvrir</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
