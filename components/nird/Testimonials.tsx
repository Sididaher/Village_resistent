"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Enseignante - Collège Victor Hugo",
    avatar: "👩‍🏫",
    content: "Grâce au Village Numérique, mes élèves ont découvert Linux et les logiciels libres. Leur créativité n'a jamais été aussi stimulée !",
    rating: 5,
  },
  {
    id: 2,
    name: "Jean-Pierre Martin",
    role: "Directeur d'école primaire",
    avatar: "👨‍💼",
    content: "La transition vers le numérique libre a transformé notre établissement. Économies, sécurité et pédagogie innovante au rendez-vous.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie Bernard",
    role: "Formatrice TICE",
    avatar: "👩‍💻",
    content: "Une approche NIRD qui fait sens. Les outils proposés sont accessibles et permettent une vraie autonomie numérique.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucas Petit",
    role: "Élève - Terminale",
    avatar: "🧑‍🎓",
    content: "J'ai appris à coder avec des outils open source. Maintenant je contribue moi-même à des projets libres !",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            Témoignages
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Ce qu&apos;ils en disent
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours d&apos;expérience de notre communauté éducative
          </p>
        </div>

        {/* Carrousel de témoignages */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Témoignage actif */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Guillemets décoratifs */}
              <div className="absolute top-6 left-6 text-8xl text-purple-100 font-serif leading-none">
                &ldquo;
              </div>
              
              <div className="relative z-10">
                {/* Contenu du témoignage */}
                <div className="min-h-[120px] flex items-center justify-center mb-8">
                  <p className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed italic">
                    {testimonials[activeIndex].content}
                  </p>
                </div>

                {/* Étoiles */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <span key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                      ⭐
                    </span>
                  ))}
                </div>

                {/* Auteur */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-800 text-lg">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bordure gradient */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-emerald-500 to-teal-500 opacity-20" style={{ padding: '2px' }} />
            </div>

            {/* Navigation par points */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-purple-500 to-emerald-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>

            {/* Boutons de navigation */}
            <button
              onClick={() => {
                setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                setIsAutoPlaying(false);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-50 transition-colors group"
              aria-label="Témoignage précédent"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
                setIsAutoPlaying(false);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-50 transition-colors group"
              aria-label="Témoignage suivant"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grille de mini-témoignages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => handleDotClick(index)}
              className={`p-4 rounded-2xl transition-all duration-300 text-left ${
                index === activeIndex
                  ? "bg-gradient-to-br from-purple-500 to-emerald-500 text-white shadow-lg scale-105"
                  : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{testimonial.avatar}</span>
                <div>
                  <p className={`font-semibold text-sm ${index === activeIndex ? "text-white" : "text-gray-800"}`}>
                    {testimonial.name}
                  </p>
                </div>
              </div>
              <p className={`text-xs line-clamp-2 ${index === activeIndex ? "text-white/80" : "text-gray-500"}`}>
                {testimonial.content}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
