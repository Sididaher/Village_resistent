"use client";

import { useState } from "react";

interface Image {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}

interface ImageGalleryProps {
  className?: string;
}

const categories = [
  { id: "all", label: "Tout", icon: "🌟" },
  { id: "classroom", label: "Classes", icon: "🏫" },
  { id: "collaboration", label: "Collaboration", icon: "🤝" },
  { id: "technology", label: "Technologie", icon: "💻" },
  { id: "creativity", label: "Créativité", icon: "🎨" },
];

const images: Image[] = [
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Students learning with technology",
    title: "Apprentissage Collaboratif",
    description: "Des étudiants travaillant ensemble avec des outils numériques libres",
    category: "collaboration"
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Modern classroom with computers",
    title: "Classe Moderne",
    description: "Une salle de classe équipée de solutions open source",
    category: "classroom"
  },
  {
    src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Digital transformation in education",
    title: "Transformation Numérique",
    description: "L'avenir de l'éducation avec les technologies libres",
    category: "technology"
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Team collaboration",
    title: "Travail d'Équipe",
    description: "La collaboration au cœur de l'apprentissage numérique",
    category: "collaboration"
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Creative coding session",
    title: "Coding Créatif",
    description: "Apprendre à coder avec des outils libres et ludiques",
    category: "creativity"
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Students in computer lab",
    title: "Laboratoire Informatique",
    description: "Un espace dédié à l'exploration numérique libre",
    category: "classroom"
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Innovation workshop",
    title: "Atelier Innovation",
    description: "Innover ensemble avec les technologies open source",
    category: "technology"
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Student with laptop",
    title: "Autonomie Numérique",
    description: "Développer l'indépendance technologique des élèves",
    category: "creativity"
  },
];

export default function ImageGallery({ className = "" }: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const handleImageLoad = (index: number) => {
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  const openLightbox = (image: Image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section className={`py-24 bg-gradient-to-b from-gray-50 via-white to-purple-50 relative overflow-hidden ${className}`}>
      {/* Décoration de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            Galerie Inspirante
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Inspiration en Images
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment le numérique libre transforme l'éducation à travers le monde
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-emerald-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-md hover:shadow-lg"
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                index === 0 || index === 5 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              onClick={() => openLightbox(image)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Skeleton loader */}
              {isLoading[index] !== false && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                  index === 0 || index === 5 ? "h-80 sm:h-full" : "h-64"
                }`}
                onLoad={() => handleImageLoad(index)}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Contenu au survol */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {categories.find(c => c.id === image.category)?.icon}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    {categories.find(c => c.id === image.category)?.label}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                
                {/* Bouton voir */}
                <div className="mt-4 flex items-center gap-2 text-white/90 text-sm font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Voir en grand
                </div>
              </div>
              
              {/* Badge NIRD */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                NIRD
              </div>
            </div>
          ))}
        </div>

        {/* Compteur d'images */}
        <div className="text-center mt-8">
          <p className="text-gray-500">
            {filteredImages.length} image{filteredImages.length > 1 ? 's' : ''} 
            {activeCategory !== 'all' && ` dans "${categories.find(c => c.id === activeCategory)?.label}"`}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation précédent */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image principale */}
          <div 
            className="max-w-5xl max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              style={{ animation: 'zoomIn 0.3s ease-out' }}
            />
            
            {/* Informations */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">
                  {categories.find(c => c.id === selectedImage.category)?.icon}
                </span>
                <span className="text-white/80 text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                  {categories.find(c => c.id === selectedImage.category)?.label}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.description}</p>
            </div>
          </div>

          {/* Navigation suivant */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicateur de position */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {filteredImages.map((img, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  img.src === selectedImage.src 
                    ? "bg-white w-6" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Styles CSS */}
      <style jsx>{`
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
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
