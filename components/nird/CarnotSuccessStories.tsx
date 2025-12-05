"use client";

import { useState } from "react";
import Button from "./Button";

interface Story {
  id: string;
  title: string;
  category: "reconditionnement" | "formation" | "économie" | "écologie" | "pédagogie";
  icon: string;
  summary: string;
  content: string;
  metrics: {
    label: string;
    value: string;
    icon: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  images?: string[];
}

const stories: Story[] = [
  {
    id: "reconditionnement",
    title: "14 PC reconditionnés pour l'école primaire",
    category: "reconditionnement",
    icon: "♻️",
    summary: "Les élèves du club informatique ont reconditionné 14 ordinateurs avec PrimTux pour équiper l'école de Fouquières-lès-Béthune.",
    content: `Cette initiative exemplaire montre comment les élèves peuvent devenir acteurs de la transition numérique. Le club informatique du lycée Carnot a transformé d'anciens PC destinés à la casse en machines parfaitement fonctionnelles.

Le processus complet :
• Récupération de matériel obsolète sous Windows
• Diagnostic et réparation par les élèves
• Installation de PrimTux (distribution Linux éducative)
• Tests et validation pédagogique
• Formation des enseignants de l'école primaire
• Livraison et mise en service

Cette démarche illustre parfaitement l'économie circulaire appliquée au numérique éducatif. Les élèves acquièrent des compétences techniques tout en contribuant à l'équipement d'autres établissements.`,
    metrics: [
      { label: "PC sauvés", value: "14", icon: "💻" },
      { label: "Élèves formés", value: "280", icon: "👥" },
      { label: "CO₂ évité", value: "4.2 T", icon: "🌱" },
      { label: "Économies", value: "11.200€", icon: "💰" }
    ],
    testimonial: {
      quote: "Voir mes élèves réparer et donner une seconde vie aux ordinateurs, c'est la plus belle leçon de citoyenneté numérique qu'ils puissent recevoir.",
      author: "M. Dubois",
      role: "Responsable du club informatique"
    }
  },
  {
    id: "formation",
    title: "Formation Linux pour 450 élèves",
    category: "formation",
    icon: "🐧",
    summary: "Tous les élèves du lycée découvrent Linux et les logiciels libres dans leur cursus, développant leur autonomie numérique.",
    content: `Le lycée Carnot a intégré la découverte de Linux dans tous les parcours de formation. Cette approche progressive permet aux élèves de :

Formation par niveaux :
• Seconde : Découverte de l'interface et des logiciels libres
• Première : Personnalisation et administration de base
• Terminale : Projets avancés et contribution aux logiciels libres

Compétences développées :
• Autonomie face aux outils numériques
• Esprit critique sur les technologies
• Compréhension des enjeux de souveraineté numérique
• Capacité à choisir ses outils selon ses besoins

Les élèves deviennent ambassadeurs du libre dans leur famille et leur entourage, créant un effet multiplicateur remarquable.`,
    metrics: [
      { label: "Élèves formés", value: "450", icon: "🎓" },
      { label: "Profs impliqués", value: "25", icon: "👨‍🏫" },
      { label: "Heures/an", value: "200h", icon: "⏰" },
      { label: "Satisfaction", value: "94%", icon: "⭐" }
    ],
    testimonial: {
      quote: "Mes élèves sont maintenant capables de choisir leurs outils en connaissance de cause. Ils comprennent les enjeux derrière leurs choix technologiques.",
      author: "Mme Martin",
      role: "Professeure de technologie"
    }
  },
  {
    id: "economie",
    title: "120.000€ d'économies en 3 ans",
    category: "économie",
    icon: "💰",
    summary: "La migration vers les logiciels libres a permis d'économiser 120.000€ sur les licences, réinvestis dans l'accompagnement.",
    content: `L'analyse économique de la transition NIRD au lycée Carnot révèle des économies substantielles qui transforment l'approche budgétaire :

Économies réalisées :
• Licences Windows/Office : 45.000€ économisés
• Antivirus et sécurité : 18.000€ économisés  
• Logiciels spécialisés : 32.000€ économisés
• Support propriétaire : 25.000€ économisés

Réinvestissements :
• Formation des équipes : 35.000€
• Matériel de reconditionnement : 15.000€
• Projets pédagogiques innovants : 25.000€
• Documentation et ressources : 8.000€

Reste disponible : 37.000€ pour d'autres projets éducatifs

Cette approche démontre que l'investissement initial en formation est rapidement amorti et génère des bénéfices durables.`,
    metrics: [
      { label: "Économies totales", value: "120.000€", icon: "💰" },
      { label: "Économies/an", value: "40.000€", icon: "📊" },
      { label: "ROI formation", value: "3:1", icon: "📈" },
      { label: "Budget libéré", value: "31%", icon: "🎯" }
    ],
    testimonial: {
      quote: "Ces économies nous permettent enfin de financer de vrais projets pédagogiques plutôt que d'enrichir les multinationales du logiciel.",
      author: "M. Durand",
      role: "Gestionnaire de l'établissement"
    }
  },
  {
    id: "ecologie",
    title: "Réduction de 60% de l'empreinte carbone",
    category: "écologie",
    icon: "🌱",
    summary: "Grâce au reconditionnement et à l'optimisation énergétique de Linux, l'établissement divise par 2 son impact environnemental.",
    content: `L'impact écologique de la démarche NIRD dépasse largement les économies financières, contribuant significativement aux objectifs environnementaux :

Réductions mesurées :
• Consommation électrique : -35% (Linux + optimisations)
• Déchets électroniques : -70% (reconditionnement)
• Achats de matériel neuf : -45%
• Transport/logistique : -40% (moins de remplacements)

Actions concrètes :
• Prolongation de 5 ans de la durée de vie du matériel
• Réparation systématique avant remplacement
• Sensibilisation aux éco-gestes numériques
• Partenariats avec des recycleurs locaux

L'établissement est devenu un modèle régional de sobriété numérique, inspirant d'autres lycées à adopter des pratiques similaires.`,
    metrics: [
      { label: "CO₂ évité", value: "12 T/an", icon: "🌍" },
      { label: "Énergie", value: "-35%", icon: "⚡" },
      { label: "E-déchets", value: "-70%", icon: "♻️" },
      { label: "Durée de vie", value: "+5 ans", icon: "⏱️" }
    ],
    testimonial: {
      quote: "Nos élèves sont fiers d'étudier dans un lycée qui respecte l'environnement. C'est aussi une leçon de responsabilité citoyenne.",
      author: "Sarah L.",
      role: "Éco-déléguée, Terminale S"
    }
  },
  {
    id: "pedagogie",
    title: "Innovation pédagogique avec le libre",
    category: "pédagogie",
    icon: "🎓",
    summary: "Les outils libres ouvrent de nouveaux horizons pédagogiques : programmation, créativité, collaboration, pensée critique.",
    content: `L'adoption du logiciel libre au lycée Carnot a révolutionné les pratiques pédagogiques, offrant aux enseignants et élèves des opportunités inédites :

Nouveaux usages pédagogiques :
• Analyse du code source des logiciels utilisés
• Contribution à des projets open source existants
• Création collaborative de ressources éducatives libres
• Projets interdisciplinaires autour du numérique éthique

Compétences transversales développées :
• Esprit critique face aux technologies
• Collaboration et travail en communauté
• Compréhension des modèles économiques numériques
• Sensibilisation aux enjeux de société (RGPD, vie privée...)

Les enseignants témoignent d'un regain de motivation, libérés des contraintes techniques imposées par les logiciels propriétaires.`,
    metrics: [
      { label: "Projets réalisés", value: "42", icon: "🚀" },
      { label: "Outils découverts", value: "150+", icon: "🛠️" },
      { label: "Créations libres", value: "28", icon: "🎨" },
      { label: "Enseignants actifs", value: "25", icon: "👨‍🏫" }
    ],
    testimonial: {
      quote: "Avec les outils libres, je peux enfin adapter mes cours aux besoins réels de mes élèves, sans être contrainte par les licences.",
      author: "Mme Petit",
      role: "Professeure de mathématiques"
    }
  }
];

export default function CarnotSuccessStories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Toutes", icon: "🌟" },
    { id: "reconditionnement", label: "Reconditionnement", icon: "♻️" },
    { id: "formation", label: "Formation", icon: "🐧" },
    { id: "économie", label: "Économie", icon: "💰" },
    { id: "écologie", label: "Écologie", icon: "🌱" },
    { id: "pédagogie", label: "Pédagogie", icon: "🎓" }
  ];

  const filteredStories = activeCategory === "all" 
    ? stories 
    : stories.filter(story => story.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "reconditionnement": return "bg-purple-100 text-purple-700";
      case "formation": return "bg-blue-100 text-blue-700";
      case "économie": return "bg-green-100 text-green-700";
      case "écologie": return "bg-emerald-100 text-emerald-700";
      case "pédagogie": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Décorations de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🏫 Lycée Carnot : Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez les réussites concrètes du lycée pionnier de Bruay-la-Buissière qui inspire la démarche NIRD
          </p>
          
          {/* Badges de présentation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
              🏆 Établissement pilote NIRD
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              🌱 3 ans d'expérience
            </div>
            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold">
              👥 450 élèves bénéficiaires
            </div>
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Grille des stories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedStory(story)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{story.icon}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(story.category)}`}>
                    {story.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {story.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {story.summary}
                </p>

                {/* Métriques preview */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {story.metrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <Button className="w-full text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  📖 Lire l'histoire complète
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA pour devenir pilote */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">🚀 Votre établissement, prochain succès NIRD ?</h3>
            <p className="text-lg opacity-90 mb-6">
              Rejoignez le réseau des établissements pilotes et bénéficiez de l'accompagnement de la communauté NIRD
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-700 hover:bg-gray-100">
                📞 Prendre contact
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                📚 Guide de démarrage
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal détail story */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* En-tête */}
            <div className={`bg-gradient-to-r ${
              selectedStory.category === 'reconditionnement' ? 'from-purple-500 to-purple-600' :
              selectedStory.category === 'formation' ? 'from-blue-500 to-blue-600' :
              selectedStory.category === 'économie' ? 'from-green-500 to-green-600' :
              selectedStory.category === 'écologie' ? 'from-emerald-500 to-emerald-600' :
              'from-orange-500 to-orange-600'
            } text-white p-6 rounded-t-3xl`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedStory.icon}</span>
                  <div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {selectedStory.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedStory.title}</h2>
              <p className="text-white/90">{selectedStory.summary}</p>
            </div>

            {/* Contenu */}
            <div className="p-8">
              {/* Métriques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {selectedStory.metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Histoire détaillée */}
              <div className="prose prose-lg max-w-none mb-8">
                {selectedStory.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Témoignage */}
              {selectedStory.testimonial && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
                  <blockquote className="text-lg italic text-blue-900 mb-4">
                    "{selectedStory.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {selectedStory.testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-blue-900">{selectedStory.testimonial.author}</div>
                      <div className="text-blue-700 text-sm">{selectedStory.testimonial.role}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setSelectedStory(null)}>
                  ← Retour aux stories
                </Button>
                <Button variant="outline" className="border-blue-500 text-blue-600">
                  📤 Partager cette réussite
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
