"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-emerald-600 to-teal-600 relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-black/10" />
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl" />
        
        {/* Particules flottantes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icône */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-bounce">
            <span className="text-4xl">📬</span>
          </div>

          {/* Titre */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Restez informé
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Recevez les dernières actualités sur le numérique éducatif libre, 
            des tutoriels exclusifs et des invitations à nos événements.
          </p>

          {/* Formulaire */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
                  ✉️
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi...
                  </>
                ) : (
                  <>
                    S&apos;inscrire
                    <span>🚀</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-xl mx-auto animate-pulse">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Merci pour votre inscription !
              </h3>
              <p className="text-white/80">
                Vous recevrez bientôt nos actualités dans votre boîte mail.
              </p>
            </div>
          )}

          {/* Avantages */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: "🔒", text: "Données protégées" },
              { icon: "📚", text: "Contenu exclusif" },
              { icon: "🎁", text: "Ressources gratuites" },
              { icon: "❌", text: "Pas de spam" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
