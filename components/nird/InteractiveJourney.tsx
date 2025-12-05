"use client";

import { useState } from "react";
import Button from "./Button";
import DiagnosticQuiz from "./DiagnosticQuiz";
import CostSimulator from "./CostSimulator";
import CarnotSuccessStories from "./CarnotSuccessStories";

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  component?: "diagnostic" | "simulator" | "stories" | "action";
  completed: boolean;
}

interface DiagnosticResult {
  score: number;
  level: string;
  color: string;
  recommendations: string[];
  nextSteps: string[];
}

export default function InteractiveJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const steps: JourneyStep[] = [
    {
      id: "welcome",
      title: "Bienvenue dans votre parcours NIRD",
      description: "Découvrez comment libérer votre établissement de la dépendance aux Big Tech",
      icon: "🚀",
      completed: journeyStarted
    },
    {
      id: "diagnostic",
      title: "Diagnostic de votre situation",
      description: "Évaluez le niveau d'autonomie numérique de votre établissement",
      icon: "🎯",
      component: "diagnostic",
      completed: diagnosticResult !== null
    },
    {
      id: "simulator",
      title: "Simulez vos économies",
      description: "Calculez les bénéfices financiers et environnementaux de la transition NIRD",
      icon: "💰",
      component: "simulator",
      completed: false
    },
    {
      id: "stories",
      title: "Inspirez-vous du Lycée Carnot",
      description: "Découvrez les success stories concrètes qui prouvent que c'est possible",
      icon: "🏫",
      component: "stories",
      completed: false
    },
    {
      id: "action",
      title: "Passez à l'action",
      description: "Construisez votre plan d'action personnalisé et rejoignez la communauté",
      icon: "⚡",
      component: "action",
      completed: false
    }
  ];

  const handleStartJourney = () => {
    setJourneyStarted(true);
    setCurrentStep(1);
  };

  const handleDiagnosticComplete = (result: DiagnosticResult) => {
    setDiagnosticResult(result);
    setShowDiagnostic(false);
    setActiveComponent(null);
    // Marquer l'étape comme terminée et passer à la suivante
    const updatedSteps = [...steps];
    updatedSteps[1].completed = true;
    setCurrentStep(2);
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === 0 || steps[stepIndex - 1]?.completed) {
      setCurrentStep(stepIndex);

      // Ouvrir le composant associé
      const step = steps[stepIndex];
      if (step.component) {
        setActiveComponent(step.component);
        if (step.component === "diagnostic") {
          setShowDiagnostic(true);
        }
      }
    }
  };

  const getStepStatus = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (step.completed) return "completed";
    if (stepIndex === currentStep) return "current";
    if (stepIndex === 0 || steps[stepIndex - 1]?.completed) return "available";
    return "locked";
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white border-green-500";
      case "current":
        return "bg-blue-500 text-white border-blue-500 ring-4 ring-blue-200";
      case "available":
        return "bg-white text-blue-600 border-blue-500 hover:bg-blue-50 cursor-pointer";
      case "locked":
        return "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed";
      default:
        return "bg-white text-gray-600 border-gray-300";
    }
  };

  return (
    <section id="parcours" className="py-20 bg-gradient-to-b from-purple-50 via-blue-50 to-white relative overflow-hidden scroll-mt-20">
      {/* Décorations de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-300 to-green-300 rounded-full opacity-20 blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            🗺️ Votre Parcours NIRD
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Un parcours guidé et interactif pour découvrir, évaluer et planifier votre transition vers un numérique libre et durable
          </p>
        </div>

        {/* Barre de progression */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            {/* Ligne de progression */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Étapes */}
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <div key={step.id} className="relative">
                  <button
                    onClick={() => handleStepClick(index)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 relative z-10 ${getStepStyles(status)}`}
                    disabled={status === "locked"}
                  >
                    {step.completed ? "✓" : step.icon}
                  </button>

                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center w-32 hidden md:block">
                    <div className={`text-sm font-medium ${status === "current" ? "text-blue-600" :
                        status === "completed" ? "text-green-600" :
                          status === "locked" ? "text-gray-400" : "text-gray-700"
                      }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contenu de l'étape courante */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 0 && (
            <div className="text-center bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Libérez votre établissement des Big Tech !
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Découvrez comment le lycée Carnot a économisé 120.000€ et réduit de 60% son empreinte carbone
                en adoptant la démarche NIRD. Votre établissement peut faire de même !
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-bold text-blue-900 mb-1">Diagnostic</h4>
                  <p className="text-blue-700 text-sm">Évaluez votre situation actuelle</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-bold text-green-900 mb-1">Simulation</h4>
                  <p className="text-green-700 text-sm">Calculez vos économies potentielles</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-bold text-purple-900 mb-1">Action</h4>
                  <p className="text-purple-700 text-sm">Construisez votre plan personnalisé</p>
                </div>
              </div>

              <Button
                onClick={handleStartJourney}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg"
              >
                🗺️ Commencer le parcours (15 min)
              </Button>

              <p className="text-sm text-gray-500 mt-4">
                Parcours gratuit • Résultats personnalisés • Aucune donnée collectée
              </p>
            </div>
          )}

          {currentStep === 1 && !showDiagnostic && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Diagnostic de votre établissement
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  6 questions pour évaluer votre niveau de dépendance aux solutions propriétaires
                  et identifier vos axes d'amélioration prioritaires.
                </p>
              </div>

              {diagnosticResult ? (
                <div className="text-center">
                  <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-bold mb-6 ${diagnosticResult.color}`}>
                    <span className="text-2xl">📊</span>
                    Score: {diagnosticResult.score}% - {diagnosticResult.level}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-bold text-blue-900 mb-4">🎯 Recommandations</h4>
                      <ul className="text-blue-700 text-sm space-y-2">
                        {diagnosticResult.recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl">
                      <h4 className="font-bold text-green-900 mb-4">🚀 Prochaines étapes</h4>
                      <ul className="text-green-700 text-sm space-y-2">
                        {diagnosticResult.nextSteps.slice(0, 3).map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => setShowDiagnostic(true)}
                      variant="outline"
                      className="border-blue-500 text-blue-600"
                    >
                      🔄 Refaire le diagnostic
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="bg-gradient-to-r from-blue-600 to-green-600 text-white"
                    >
                      Continuer vers la simulation 💰
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Button
                    onClick={() => setShowDiagnostic(true)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4"
                  >
                    🎯 Lancer le diagnostic (5 min)
                  </Button>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Simulateur d'économies NIRD
                </h3>
                <p className="text-lg text-gray-600">
                  Personnalisez les paramètres selon votre établissement pour découvrir vos économies potentielles
                </p>
              </div>
              <CostSimulator />

              <div className="text-center mt-8">
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4"
                >
                  Voir les success stories 🏫
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <CarnotSuccessStories />
              <div className="text-center mt-8">
                <Button
                  onClick={() => setCurrentStep(4)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-8 py-4"
                >
                  Construire mon plan d'action ⚡
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Votre plan d'action personnalisé
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Félicitations ! Vous avez terminé le parcours NIRD. Voici vos prochaines étapes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-blue-900 mb-4 text-xl">🎯 Actions immédiates</h4>
                  <ul className="text-blue-700 space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span>Diagnostic NIRD terminé</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span>Simulation économique réalisée</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📋</span>
                      <span>Sensibiliser votre équipe direction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📋</span>
                      <span>Identifier des enseignants motivés</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-bold text-green-900 mb-4 text-xl">🚀 Rejoindre la communauté</h4>
                  <ul className="text-green-700 space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">💬</span>
                      <span>Forum Tchap NIRD</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">🎓</span>
                      <span>Webinaires de formation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">🤝</span>
                      <span>Réseau des établissements pilotes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">📚</span>
                      <span>Ressources et documentation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4">
                  📞 Prendre contact avec NIRD
                </Button>
                <Button variant="outline" className="border-green-500 text-green-600 px-8 py-4">
                  📥 Télécharger mon rapport
                </Button>
                <Button variant="outline" className="border-purple-500 text-purple-600 px-8 py-4">
                  🔄 Recommencer le parcours
                </Button>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-center">
                <h4 className="text-xl font-bold mb-2">🏆 Vous êtes maintenant prêt pour NIRD !</h4>
                <p className="opacity-90">
                  Vous disposez de tous les éléments pour convaincre et lancer votre projet de transformation numérique durable.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal du diagnostic */}
      {showDiagnostic && (
        <DiagnosticQuiz
          onComplete={handleDiagnosticComplete}
          onClose={() => setShowDiagnostic(false)}
        />
      )}
    </section>
  );
}
