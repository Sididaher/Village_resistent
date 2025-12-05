"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  icon: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Qu'est-ce que le Village Numérique ?",
    answer: "Le Village Numérique est une initiative éducative qui promeut l'utilisation de logiciels libres et open source dans les établissements scolaires. Notre objectif est de créer un écosystème numérique éthique, inclusif et durable.",
    icon: "🏘️",
  },
  {
    question: "Qu'est-ce que la démarche NIRD ?",
    answer: "NIRD signifie Numérique Inclusif, Responsable et Durable. C'est une approche holistique qui vise à transformer le numérique éducatif en mettant l'accent sur l'accessibilité, l'éthique et la durabilité environnementale.",
    icon: "🌱",
  },
  {
    question: "Pourquoi choisir les logiciels libres ?",
    answer: "Les logiciels libres offrent transparence, sécurité, économies et indépendance technologique. Ils permettent aux établissements de garder le contrôle sur leurs données et d'adapter les outils à leurs besoins spécifiques.",
    icon: "🐧",
  },
  {
    question: "Comment démarrer avec Linux ?",
    answer: "Nous proposons un parcours progressif adapté à tous les niveaux. Commencez par notre guide d'introduction, testez Linux via une clé USB bootable, puis passez à l'installation avec notre accompagnement personnalisé.",
    icon: "🚀",
  },
  {
    question: "Quels outils sont proposés ?",
    answer: "Nous recommandons une suite complète d'outils libres : LibreOffice pour la bureautique, GIMP pour l'image, Audacity pour l'audio, Scratch et Python pour la programmation, et bien d'autres adaptés à chaque discipline.",
    icon: "🛠️",
  },
  {
    question: "Y a-t-il un accompagnement ?",
    answer: "Oui ! Notre communauté propose des formations, des tutoriels, un forum d'entraide et un accompagnement personnalisé pour les établissements qui souhaitent effectuer leur transition vers le numérique libre.",
    icon: "🤝",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
        
        {/* Grille décorative */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #9333ea 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            Questions Fréquentes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Besoin d&apos;aide ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>

        {/* Liste FAQ */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                openIndex === index ? "ring-2 ring-purple-500 ring-opacity-50" : ""
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {item.question}
                  </h3>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-gradient-to-r from-purple-500 to-emerald-500 rotate-180"
                      : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${
                      openIndex === index ? "text-white" : "text-gray-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="pl-16">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Vous n&apos;avez pas trouvé votre réponse ?
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span>💬</span>
            Contactez-nous
          </button>
        </div>
      </div>
    </section>
  );
}
