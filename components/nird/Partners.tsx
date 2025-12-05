"use client";

import { useEffect, useRef, useState } from "react";

interface Partner {
  name: string;
  logo: string;
  shortDesc: string;
  fullDescription: string;
  docUrl: string;
}

const partners: Partner[] = [
  { 
    name: "Linux Foundation", 
    logo: "🐧", 
    shortDesc: "Fondation Linux",
    fullDescription: "La Linux Foundation est une organisation à but non lucratif qui soutient le développement du noyau Linux et promeut les logiciels open source.",
    docUrl: "https://www.linuxfoundation.org/"
  },
  { 
    name: "Mozilla", 
    logo: "🦊", 
    shortDesc: "Navigateur libre",
    fullDescription: "Mozilla développe Firefox, un navigateur web libre et open source axé sur la confidentialité et la sécurité des utilisateurs.",
    docUrl: "https://developer.mozilla.org/fr/"
  },
  { 
    name: "LibreOffice", 
    logo: "📄", 
    shortDesc: "Suite bureautique",
    fullDescription: "LibreOffice est une suite bureautique libre et gratuite, compatible avec Microsoft Office, incluant traitement de texte, tableur et présentations.",
    docUrl: "https://fr.libreoffice.org/get-help/documentation/"
  },
  { 
    name: "GIMP", 
    logo: "🎨", 
    shortDesc: "Édition d'images",
    fullDescription: "GIMP (GNU Image Manipulation Program) est un éditeur d'images libre et gratuit, alternative puissante à Photoshop.",
    docUrl: "https://www.gimp.org/docs/"
  },
  { 
    name: "Blender", 
    logo: "🎬", 
    shortDesc: "Création 3D",
    fullDescription: "Blender est un logiciel libre de modélisation 3D, d'animation, de rendu et de montage vidéo utilisé par des professionnels du monde entier.",
    docUrl: "https://docs.blender.org/"
  },
  { 
    name: "Audacity", 
    logo: "🎵", 
    shortDesc: "Édition audio",
    fullDescription: "Audacity est un éditeur audio libre et gratuit permettant l'enregistrement, l'édition et le mixage de fichiers audio.",
    docUrl: "https://manual.audacityteam.org/"
  },
  { 
    name: "Python", 
    logo: "🐍", 
    shortDesc: "Programmation",
    fullDescription: "Python est un langage de programmation polyvalent, facile à apprendre, idéal pour l'éducation et utilisé dans l'IA, le web et la science des données.",
    docUrl: "https://docs.python.org/fr/3/"
  },
  { 
    name: "Scratch", 
    logo: "🧩", 
    shortDesc: "Code pour enfants",
    fullDescription: "Scratch est un langage de programmation visuel développé par le MIT, conçu pour initier les enfants à la programmation de manière ludique.",
    docUrl: "https://scratch.mit.edu/ideas"
  },
];

export default function Partners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = scrollContainer.scrollLeft;
    let isPaused = false;

    const animate = () => {
      if (!isPaused && !isDragging) {
        scrollPosition += 0.5;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      isPaused = true;
      scrollPosition = scrollContainer.scrollLeft;
    };
    
    const handleMouseLeave = () => {
      if (!isDragging) {
        isPaused = false;
        scrollPosition = scrollContainer.scrollLeft;
      }
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging]);

  // Gestion du drag manuel
  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainer.offsetLeft);
    setScrollLeft(scrollContainer.scrollLeft);
    scrollContainer.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // Vitesse du scroll
    scrollContainer.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        scrollContainer.style.cursor = 'grab';
      }
    }
  };

  return (
    <section id="partners" className="py-16 bg-gray-50 relative overflow-hidden scroll-mt-20">
      {/* En-tête */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            Écosystème Open Source
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Nos partenaires technologiques
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les outils libres et open source que nous recommandons
          </p>
        </div>
      </div>

      {/* Carrousel infini */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-hidden py-4 select-none"
        style={{ scrollBehavior: "auto", cursor: "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Double les éléments pour l'effet infini */}
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105"
            onClick={() => {
              // Ne pas ouvrir la modal si on vient de faire un drag
              if (!isDragging) {
                setSelectedPartner(partner);
              }
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-emerald-100 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {partner.logo}
              </div>
              <h3 className="font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-500">
                {partner.shortDesc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détails */}
      {selectedPartner && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            {/* En-tête */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-emerald-100 rounded-2xl flex items-center justify-center text-5xl">
                {selectedPartner.logo}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedPartner.name}
                </h3>
                <p className="text-purple-600 font-medium">
                  {selectedPartner.shortDesc}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {selectedPartner.fullDescription}
            </p>

            {/* Lien documentation */}
            <a
              href={selectedPartner.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Voir la documentation
            </a>

            {/* Bouton fermer */}
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Style pour l'animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Gradient de fondu sur les côtés */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
    </section>
  );
}
