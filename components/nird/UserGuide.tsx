"use client";

import { useState } from "react";
import Button from "./Button";

interface GuideSection {
  id: string;
  title: string;
  icon: string;
  content: React.ReactElement;
}

export default function UserGuide() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);

  const sections: GuideSection[] = [
    {
      id: "overview",
      title: "Vue d'ensemble",
      icon: "🌟",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-3">🎯 Objectif de la plateforme</h3>
            <p className="text-blue-800 leading-relaxed">
              Cette application web interactive vous guide dans la découverte et l'adoption de la démarche NIRD
              (Numérique Inclusif, Responsable et Durable). Elle propose un parcours complet pour libérer
              votre établissement scolaire de la dépendance aux Big Tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-bold text-green-900 mb-3">✅ Pour qui ?</h4>
              <ul className="text-green-800 space-y-2">
                <li>• Directions d'établissements scolaires</li>
                <li>• Enseignants et équipes pédagogiques</li>
                <li>• Collectivités territoriales</li>
                <li>• Responsables informatiques</li>
                <li>• Éco-délégués et élèves engagés</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-3">🚀 Que propose la plateforme ?</h4>
              <ul className="text-purple-800 space-y-2">
                <li>• Diagnostic personnalisé</li>
                <li>• Simulateur d'économies</li>
                <li>• Parcours interactif guidé</li>
                <li>• Success stories inspirantes</li>
                <li>• Défis et mini-jeux éducatifs</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "navigation",
      title: "Navigation",
      icon: "🧭",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-900 mb-4">🗺️ Structure de la plateforme</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">🏠</span>
                <div>
                  <h4 className="font-bold text-gray-900">Page d'accueil</h4>
                  <p className="text-gray-600 text-sm">Vision d'ensemble avec hero section et aperçu des fonctionnalités</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">🎮</span>
                <div>
                  <h4 className="font-bold text-gray-900">Section Défis</h4>
                  <p className="text-gray-600 text-sm">Quiz interactif et mini-jeux pour tester vos connaissances NIRD</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">🗺️</span>
                <div>
                  <h4 className="font-bold text-gray-900">Parcours NIRD</h4>
                  <p className="text-gray-600 text-sm">Parcours guidé en 5 étapes : Accueil → Diagnostic → Simulation → Stories → Action</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-bold text-gray-900">Outils d'évaluation</h4>
                  <p className="text-gray-600 text-sm">Diagnostic personnalisé et simulateur de coûts avec résultats détaillés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "features",
      title: "Fonctionnalités",
      icon: "⚡",
      content: (
        <div className="space-y-6">
          <div className="grid gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Diagnostic Interactif
              </h3>
              <div className="space-y-3">
                <p className="text-purple-800">
                  Évaluez le niveau d'autonomie numérique de votre établissement avec 6 questions expertes.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Comment l'utiliser :</h4>
                  <ol className="text-sm space-y-1 text-gray-700">
                    <li>1. Lancez le diagnostic depuis le parcours NIRD</li>
                    <li>2. Répondez aux 6 questions sur votre infrastructure</li>
                    <li>3. Obtenez votre score et vos recommandations personnalisées</li>
                    <li>4. Utilisez les résultats pour planifier votre transition</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Simulateur de Coûts
              </h3>
              <div className="space-y-3">
                <p className="text-green-800">
                  Calculez vos économies potentielles en adoptant la démarche NIRD.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Paramètres ajustables :</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Nombre d'élèves/étudiants (100-2000)</li>
                    <li>• Nombre d'ordinateurs (20-500)</li>
                    <li>• Nombre de serveurs (1-20)</li>
                    <li>• Période de simulation (1-10 ans)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏫</span>
                Success Stories Lycée Carnot
              </h3>
              <div className="space-y-3">
                <p className="text-orange-800">
                  Découvrez 5 histoires inspirantes du lycée pilote de Bruay-la-Buissière.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">5 catégories d'histoires :</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>• Reconditionnement</div>
                    <div>• Formation Linux</div>
                    <div>• Économies réalisées</div>
                    <div>• Impact écologique</div>
                    <div className="col-span-2">• Innovation pédagogique</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "parcours",
      title: "Parcours Guidé",
      icon: "🗺️",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-900 mb-4">📋 Les 5 étapes du parcours NIRD</h3>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Accueil",
                  icon: "🚀",
                  desc: "Présentation de la démarche NIRD et de ses bénéfices",
                  time: "2 min"
                },
                {
                  step: "2",
                  title: "Diagnostic",
                  icon: "🎯",
                  desc: "Évaluation de votre niveau d'autonomie numérique",
                  time: "5 min"
                },
                {
                  step: "3",
                  title: "Simulation",
                  icon: "💰",
                  desc: "Calcul de vos économies et impact environnemental",
                  time: "3 min"
                },
                {
                  step: "4",
                  title: "Inspiration",
                  icon: "🏫",
                  desc: "Success stories du lycée Carnot",
                  time: "4 min"
                },
                {
                  step: "5",
                  title: "Action",
                  icon: "⚡",
                  desc: "Construction de votre plan d'action personnalisé",
                  time: "1 min"
                }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-100 rounded-lg">
              <p className="text-green-800 text-sm">
                <strong>💡 Conseil :</strong> Le parcours est conçu pour être complété en 15 minutes.
                Vos progrès sont sauvegardés et vous pouvez reprendre à tout moment.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "nird",
      title: "Comprendre NIRD",
      icon: "📚",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-green-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                Numérique Inclusif, Responsable et Durable
              </span>
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-3 text-lg">
                  <span className="mr-2">🤝</span>
                  Inclusif
                </h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Accessible à tous les élèves</li>
                  <li>• Formation des équipes</li>
                  <li>• Réduction de la fracture numérique</li>
                  <li>• Interfaces adaptées</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
                <h4 className="font-bold text-green-900 mb-3 text-lg">
                  <span className="mr-2">🛡️</span>
                  Responsable
                </h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Protection des données</li>
                  <li>• Souveraineté numérique</li>
                  <li>• Transparence des algorithmes</li>
                  <li>• Éthique numérique</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-3 text-lg">
                  <span className="mr-2">🌱</span>
                  Durable
                </h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Reconditionnement d'équipements</li>
                  <li>• Économie circulaire</li>
                  <li>• Réduction de l'empreinte carbone</li>
                  <li>• Sobriété numérique</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <h3 className="text-xl font-bold text-orange-900 mb-4">🏆 Exemple concret : Lycée Carnot</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Résultats obtenus :</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• 120.000€ d'économies en 3 ans</li>
                  <li>• 14 PC reconditionnés pour l'école primaire</li>
                  <li>• 450 élèves formés à Linux</li>
                  <li>• 60% de réduction d'empreinte carbone</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Actions mises en place :</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Migration vers Linux et logiciels libres</li>
                  <li>• Atelier de reconditionnement</li>
                  <li>• Formation des enseignants</li>
                  <li>• Sensibilisation des élèves</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "tips",
      title: "Conseils d'usage",
      icon: "💡",
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Conseils pour optimiser votre expérience
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Avant de commencer</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Préparez quelques informations sur votre établissement</li>
                  <li>• Nombre approximatif d'élèves et d'ordinateurs</li>
                  <li>• Budget informatique annuel (si connu)</li>
                  <li>• Prévoyez 15-20 minutes pour le parcours complet</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">⚡ Pendant l'utilisation</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Utilisez un ordinateur ou tablette pour une meilleure expérience</li>
                  <li>• Activez le son pour les animations interactives</li>
                  <li>• N'hésitez pas à revenir en arrière pour revoir les sections</li>
                  <li>• Prenez des notes sur vos résultats pour les partager</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📋 Après le parcours</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Téléchargez votre rapport personnalisé</li>
                  <li>• Partagez les résultats avec votre équipe</li>
                  <li>• Rejoignez la communauté NIRD pour échanger</li>
                  <li>• Planifiez les premières étapes de transition</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-bold text-green-900 mb-3">🚀 Pour aller plus loin</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-800">Ressources officielles :</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Site officiel NIRD</li>
                  <li>• Documentation technique</li>
                  <li>• Forum communautaire Tchap</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-800">Accompagnement :</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Webinaires de formation</li>
                  <li>• Réseau des établissements pilotes</li>
                  <li>• Support technique disponible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <>
      {/* Guide Button - Always visible */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-full p-4"
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            Guide d'utilisation
          </span>
        </Button>
      </div>

      {/* Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">📚 Guide d'utilisation</h2>
                  <p className="text-blue-100">Tout ce que vous devez savoir sur la plateforme NIRD</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(90vh-120px)]">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-gray-50 border-r overflow-y-auto md:h-full h-1/3">
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-4 sticky top-0 bg-gray-50 z-10">Sommaire</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === section.id
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        <span className="mr-2">{section.icon}</span>
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto md:h-full h-2/3">
                <div className="p-4 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl md:text-4xl">{currentSection?.icon}</span>
                    {currentSection?.title}
                  </h2>
                  {currentSection?.content}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Plateforme NIRD - Nuit de l'Info 2025 • Application créée avec ❤️
              </p>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="border-blue-500 text-blue-600"
              >
                Fermer le guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
