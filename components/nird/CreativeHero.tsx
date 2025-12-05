"use client";

import { useState, useEffect } from "react";
import { Button } from "./index";

interface CreativeHeroProps {
  onGetStarted: () => void;
}

// Particules prédéfinies pour éviter l'hydratation mismatch
const STATIC_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 47.3) % 100, // Distribution pseudo-aléatoire mais déterministe
  y: (i * 23.7) % 100,
  size: 1 + (i % 3),
  delay: (i * 0.3) % 5,
  duration: 15 + (i % 10),
}));

export default function CreativeHero({ onGetStarted }: CreativeHeroProps) {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-emerald-900">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-emerald-600/20 to-blue-600/20 animate-pulse" />
      
      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-lg rotate-12 animate-spin-slow" />
        <div className="absolute top-20 right-20 w-24 h-24 border border-emerald-400/30 rounded-full animate-bounce" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-purple-500/20 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-blue-400/30 rotate-6 animate-ping" />
      </div>

      {/* Optimized Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {STATIC_PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-60 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: isClient ? `translate(${mousePosition.x * 0.02 - 1}px, ${mousePosition.y * 0.02 - 1}px)` : 'translate(0, 0)',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-sm font-semibold mb-8 hover:bg-white/15 transition-all duration-300 group">
        
    
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none">
          <div className="mb-4 transform hover:scale-105 transition-transform duration-500">
            Le Village
          </div>
          <div className="relative">
            <span className="bg-gradient-to-r from-purple-400 via-emerald-300 via-blue-300 to-teal-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Numérique
            </span>
            <br />
            <span className="text-white animate-fade-in-up">
              Résistant
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-expand" />
          </div>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed">
          <span className="font-light">David contre Goliath • </span>
          <span className="text-purple-300 font-bold">Astérix</span>
          <span className="font-light"> contre l'</span>
          <span className="text-emerald-300 font-bold">Empire numérique</span>
          <br />
          <span className="text-lg text-gray-300 mt-2 block">
            Libérez votre établissement avec un numérique libre, inclusif et durable
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            onClick={() => {
              const element = document.getElementById('parcours');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 hover:from-purple-700 hover:via-emerald-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-500 px-12 py-6 text-lg font-bold"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex items-center gap-3">
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🚀</span>
              Commencer le parcours NIRD
              <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </Button>
          
          <Button
            onClick={() => {
              window.open('https://nird.forge.apps.education.fr/', '_blank');
            }}
            variant="outline"
            className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-lg px-10 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 hover:rotate-1"
          >
            <span className="flex items-center gap-3">
              <span className="text-xl group-hover:rotate-12 transition-transform duration-300">📖</span>
              Explorer la documentation
            </span>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {[
            { 
              icon: "🎯", 
              title: "Diagnostic Interactif", 
              desc: "Évaluez votre niveau d'autonomie numérique",
              color: "from-purple-500/20 to-purple-600/20",
              delay: "0s"
            },
            { 
              icon: "💰", 
              title: "Simulateur de Coûts", 
              desc: "Calculez vos économies potentielles",
              color: "from-emerald-500/20 to-emerald-600/20",
              delay: "0.2s"
            },
            { 
              icon: "🏫", 
              title: "Success Stories", 
              desc: "Inspirez-vous du Lycée Carnot",
              color: "from-blue-500/20 to-blue-600/20",
              delay: "0.4s"
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-lg border border-white/20 rounded-2xl p-8 transform hover:scale-105 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up`}
              style={{ animationDelay: item.delay }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer">
            <span className="text-sm font-medium mb-3">Découvrir le village</span>
            <div className="relative">
              <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center items-start pt-2">
                <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        
        .bg-300% {
          background-size: 300% 300%;
        }
        
        .animate-expand {
          animation: expand 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes expand {
          0%, 100% { width: 8rem; opacity: 1; }
          50% { width: 12rem; opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(5px) rotate(180deg); }
          75% { transform: translateY(-5px) rotate(270deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
