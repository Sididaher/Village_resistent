"use client";

import { useState } from "react";

interface CreativeFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export default function CreativeFeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: CreativeFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `slideInScale 0.8s ease-out ${delay}s both`,
      }}
    >
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-emerald-100 to-teal-100" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full filter blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full filter blur-3xl opacity-50" />
      </div>

      {/* Contenu */}
      <div className="relative z-10">
        {/* Icône avec effet 3D */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-emerald-500 rounded-3xl flex items-center justify-center text-white text-3xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
          <span className="transform group-hover:scale-125 transition-transform duration-300">
            {icon}
          </span>
        </div>

        {/* Titre avec effet de brillance */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-purple-700 transition-colors duration-300">
          {title}
        </h3>

        {/* Description avec effet de fade-in */}
        <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Lien "En savoir plus" qui apparaît au survol */}
        <div className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="inline-flex items-center text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors cursor-pointer">
            En savoir plus
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Bordure animée */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl border-2 border-purple-200 animate-pulse" />
      </div>

      {/* Styles CSS */}
      <style jsx>{`
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
