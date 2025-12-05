"use client";

import { useEffect, useState, useRef } from "react";

interface Stat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  gradient: string;
}

interface CreativeStatsProps {
  className?: string;
}

const stats: Stat[] = [
  {
    icon: "💰",
    value: 87,
    suffix: "%",
    label: "Économies réalisées",
    description: "Sur les licences logicielles",
    color: "purple",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    icon: "🎓",
    value: 2000000,
    suffix: "+",
    label: "Étudiants formés",
    description: "À travers le monde",
    color: "emerald",
    gradient: "from-emerald-400 to-teal-400"
  },
  {
    icon: "🏫",
    value: 150,
    suffix: "+",
    label: "Établissements",
    description: "Partenaires actifs",
    color: "teal",
    gradient: "from-teal-400 to-cyan-400"
  },
  {
    icon: "🌍",
    value: 24,
    suffix: "/7",
    label: "Support mondial",
    description: "Communauté active",
    color: "blue",
    gradient: "from-blue-400 to-purple-400"
  },
];

const progressItems = [
  { label: "Adoption Linux", value: 75, icon: "🐧", color: "from-purple-500 to-purple-600" },
  { label: "Formation enseignants", value: 60, icon: "👨‍🏫", color: "from-emerald-500 to-emerald-600" },
  { label: "Projets étudiants", value: 85, icon: "🚀", color: "from-teal-500 to-teal-600" },
  { label: "Satisfaction utilisateurs", value: 92, icon: "⭐", color: "from-amber-500 to-orange-500" },
];

export default function CreativeStats({ className = "" }: CreativeStatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [progressValues, setProgressValues] = useState<{ [key: number]: number }>({});
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer pour déclencher l'animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animation des compteurs
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const steps = 80;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing function pour une animation plus fluide
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const newCounts: { [key: number]: number } = {};
      stats.forEach((stat, index) => {
        newCounts[index] = Math.floor(stat.value * easeOutQuart);
      });
      setCounts(newCounts);

      const newProgress: { [key: number]: number } = {};
      progressItems.forEach((item, index) => {
        newProgress[index] = Math.floor(item.value * easeOutQuart);
      });
      setProgressValues(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Valeurs finales exactes
        const finalCounts: { [key: number]: number } = {};
        stats.forEach((stat, index) => {
          finalCounts[index] = stat.value;
        });
        setCounts(finalCounts);

        const finalProgress: { [key: number]: number } = {};
        progressItems.forEach((item, index) => {
          finalProgress[index] = item.value;
        });
        setProgressValues(finalProgress);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden ${className}`}
    >
      {/* Arrière-plan animé amélioré */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grille de fond */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Cercles lumineux */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Particules flottantes */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Nos Résultats
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-emerald-300 bg-clip-text text-transparent">
              L&apos;Impact du Numérique Libre
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Des chiffres qui témoignent d&apos;une révolution éducative en marche
          </p>
        </div>
        
        {/* Grille de statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative group ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Carte */}
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 h-full">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                
                <div className="relative z-10">
                  {/* Icône */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {stat.icon}
                  </div>
                  
                  {/* Valeur */}
                  <div className="text-center">
                    <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {formatNumber(counts[index] || 0)}{stat.suffix}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {stat.description}
                    </p>
                  </div>
                  
                  {/* Indicateur animé */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.gradient} animate-ping`} />
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.gradient} absolute top-0`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section progression */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-3xl">📊</span>
              <h3 className="text-2xl font-bold text-white">
                Notre progression en 2025
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {progressItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`group ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${(index + 4) * 150}ms` }}
                >
                  <div className="bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-white">{item.label}</span>
                      </div>
                      <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {progressValues[index] || 0}%
                      </span>
                    </div>
                    
                    {/* Barre de progression */}
                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${progressValues[index] || 0}%` }}
                      >
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges de confiance */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
            { icon: "🔒", text: "100% Open Source" },
            { icon: "🌱", text: "Éco-responsable" },
            { icon: "🤝", text: "Communauté active" },
            { icon: "📚", text: "Documentation complète" },
          ].map((badge, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-white/80 text-sm font-medium hover:bg-white/20 transition-all duration-300 cursor-default ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 8) * 100}ms` }}
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Styles CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
