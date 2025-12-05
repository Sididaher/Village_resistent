"use client";

import { useState } from "react";
import Button from "./Button";

interface DiagnosticQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    category: "dependance" | "autonomie" | "sensibilisation";
  }[];
  category: "infrastructure" | "logiciels" | "données" | "formation" | "budget";
}

interface DiagnosticResult {
  score: number;
  level: "Très dépendant" | "Dépendant" | "En transition" | "Autonome" | "Très autonome";
  color: string;
  recommendations: string[];
  nextSteps: string[];
}

interface DiagnosticQuizProps {
  onComplete: (result: DiagnosticResult) => void;
  onClose: () => void;
}

const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 1,
    category: "infrastructure",
    question: "Quel est l'âge moyen du parc informatique de votre établissement ?",
    options: [
      { text: "Plus de 8 ans", score: 1, category: "dependance" },
      { text: "5-8 ans", score: 2, category: "dependance" },
      { text: "3-5 ans", score: 3, category: "sensibilisation" },
      { text: "Moins de 3 ans", score: 4, category: "autonomie" },
      { text: "Parc hétérogène avec reconditionnement", score: 5, category: "autonomie" }
    ]
  },
  {
    id: 2,
    category: "logiciels",
    question: "Quels systèmes d'exploitation utilisez-vous principalement ?",
    options: [
      { text: "100% Windows (licences payantes)", score: 1, category: "dependance" },
      { text: "Majoritairement Windows + quelques Mac", score: 2, category: "dependance" },
      { text: "Windows + début d'exploration d'alternatives", score: 3, category: "sensibilisation" },
      { text: "Mix Windows/Linux selon les besoins", score: 4, category: "autonomie" },
      { text: "Principalement Linux avec distributions éducatives", score: 5, category: "autonomie" }
    ]
  },
  {
    id: 3,
    category: "données",
    question: "Où sont hébergées vos données pédagogiques sensibles ?",
    options: [
      { text: "Exclusivement chez les GAFAM (Google, Microsoft...)", score: 1, category: "dependance" },
      { text: "Majoritairement GAFAM + quelques services français", score: 2, category: "dependance" },
      { text: "Mix services américains/européens", score: 3, category: "sensibilisation" },
      { text: "Principalement en France/UE", score: 4, category: "autonomie" },
      { text: "Serveurs internes + cloud souverain français", score: 5, category: "autonomie" }
    ]
  },
  {
    id: 4,
    category: "formation",
    question: "Quel est le niveau de formation de vos équipes au numérique libre ?",
    options: [
      { text: "Aucune formation, méconnaissance totale", score: 1, category: "dependance" },
      { text: "Quelques personnes intéressées mais non formées", score: 2, category: "dependance" },
      { text: "Sensibilisation générale, formation ponctuelle", score: 3, category: "sensibilisation" },
      { text: "Formation régulière, référents identifiés", score: 4, category: "autonomie" },
      { text: "Équipe experte, formation continue, veille active", score: 5, category: "autonomie" }
    ]
  },
  {
    id: 5,
    category: "budget",
    question: "Quelle part de votre budget numérique va aux licences propriétaires ?",
    options: [
      { text: "Plus de 70% du budget", score: 1, category: "dependance" },
      { text: "50-70% du budget", score: 2, category: "dependance" },
      { text: "30-50% du budget", score: 3, category: "sensibilisation" },
      { text: "10-30% du budget", score: 4, category: "autonomie" },
      { text: "Moins de 10%, budget réorienté vers l'accompagnement", score: 5, category: "autonomie" }
    ]
  },
  {
    id: 6,
    category: "infrastructure",
    question: "Comment gérez-vous l'obsolescence de votre matériel ?",
    options: [
      { text: "Remplacement systématique par du neuf", score: 1, category: "dependance" },
      { text: "Achat neuf + recyclage minimal", score: 2, category: "dependance" },
      { text: "Début de réflexion sur le reconditionnement", score: 3, category: "sensibilisation" },
      { text: "Politique de reconditionnement établie", score: 4, category: "autonomie" },
      { text: "Reconditionnement avec élèves + économie circulaire", score: 5, category: "autonomie" }
    ]
  }
];

const getResultLevel = (score: number): DiagnosticResult => {
  const maxScore = diagnosticQuestions.length * 5;
  const percentage = (score / maxScore) * 100;

  if (percentage >= 80) {
    return {
      score: Math.round(percentage),
      level: "Très autonome",
      color: "bg-green-500",
      recommendations: [
        "🏆 Félicitations ! Votre établissement est exemplaire en matière d'autonomie numérique.",
        "📢 Partagez votre expérience avec d'autres établissements",
        "🤝 Devenez un établissement pilote NIRD",
        "📈 Continuez à innover et à former vos équipes"
      ],
      nextSteps: [
        "Rejoindre le réseau des établissements pilotes NIRD",
        "Organiser des formations pour d'autres établissements",
        "Participer à des conférences et événements",
        "Contribuer aux ressources libres éducatives"
      ]
    };
  } else if (percentage >= 65) {
    return {
      score: Math.round(percentage),
      level: "Autonome",
      color: "bg-blue-500",
      recommendations: [
        "🌟 Très bien ! Vous êtes sur la bonne voie vers l'autonomie numérique.",
        "🎯 Focalisez-vous sur les derniers points de dépendance",
        "📚 Renforcez la formation de vos équipes",
        "🔄 Optimisez vos processus de reconditionnement"
      ],
      nextSteps: [
        "Élaborer un plan de formation continue",
        "Mettre en place des projets élèves-reconditionnement",
        "Rejoindre les forums et communautés NIRD",
        "Planifier la migration des derniers services propriétaires"
      ]
    };
  } else if (percentage >= 45) {
    return {
      score: Math.round(percentage),
      level: "En transition",
      color: "bg-yellow-500",
      recommendations: [
        "⚡ Vous avez entamé la transition ! C'est encourageant.",
        "📋 Établissez un plan de migration progressif",
        "👥 Formez une équipe dédiée au projet NIRD",
        "💰 Réévaluez la répartition de votre budget numérique"
      ],
      nextSteps: [
        "Commencer par migrer 1-2 services vers du libre",
        "Former les référents numériques",
        "Lancer un projet pilote de reconditionnement",
        "Sensibiliser l'équipe pédagogique aux enjeux"
      ]
    };
  } else if (percentage >= 30) {
    return {
      score: Math.round(percentage),
      level: "Dépendant",
      color: "bg-orange-500",
      recommendations: [
        "🚨 Forte dépendance aux solutions propriétaires détectée.",
        "📖 Commencez par vous informer sur les alternatives libres",
        "👨‍🏫 Identifiez des référents motivés dans vos équipes",
        "🔍 Auditez précisément vos coûts et dépendances actuels"
      ],
      nextSteps: [
        "Participer à des webinaires NIRD",
        "Visiter des établissements pilotes",
        "Faire un audit complet des licences",
        "Sensibiliser la direction aux enjeux économiques"
      ]
    };
  } else {
    return {
      score: Math.round(percentage),
      level: "Très dépendant",
      color: "bg-red-500",
      recommendations: [
        "🆘 Dépendance critique aux Big Tech. Action urgente nécessaire !",
        "💡 Découvrez les bénéfices du numérique libre avec notre parcours guidé",
        "🏫 Inspirez-vous du succès du lycée Carnot",
        "⏰ Planifiez dès maintenant votre stratégie de libération numérique"
      ],
      nextSteps: [
        "Suivre le parcours de découverte NIRD complet",
        "Contacter les équipes NIRD pour un accompagnement",
        "Programmer une formation d'initiation",
        "Établir un diagnostic financier détaillé"
      ]
    };
  }
};

export default function DiagnosticQuiz({ onComplete, onClose }: DiagnosticQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Calculer le résultat
      const totalScore = newAnswers.reduce((sum, answerIndex, questionIndex) => {
        return sum + diagnosticQuestions[questionIndex].options[answerIndex].score;
      }, 0);
      
      const result = getResultLevel(totalScore);
      onComplete(result);
    }
  };

  const currentQ = diagnosticQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / diagnosticQuestions.length) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "infrastructure": return "🏗️";
      case "logiciels": return "💻";
      case "données": return "🔒";
      case "formation": return "📚";
      case "budget": return "💰";
      default: return "❓";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <h2 className="text-2xl font-bold">Diagnostic NIRD</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-white/90 mb-4">
              Évaluez le niveau d'autonomie numérique de votre établissement
            </p>
            
            {/* Barre de progression */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm opacity-90">Question {currentQuestion + 1}/{diagnosticQuestions.length}</span>
                <span className="text-sm opacity-90">{Math.round(progress)}% complété</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu de la question */}
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{getCategoryIcon(currentQ.category)}</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold capitalize">
                {currentQ.category}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options de réponse */}
          <div className="grid gap-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } cursor-pointer hover:scale-105`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 ${
                    selectedAnswer === index 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <span className="flex-1 font-medium">{option.text}</span>
                  <div className={`ml-4 px-2 py-1 rounded text-xs font-bold ${
                    option.category === 'autonomie' ? 'bg-green-100 text-green-700' :
                    option.category === 'sensibilisation' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {option.score}/5
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Bouton suivant */}
          <div className="flex justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 ${
                selectedAnswer === null 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              } transition-all duration-300`}
            >
              {currentQuestion < diagnosticQuestions.length - 1 ? (
                <>Question suivante →</>
              ) : (
                <>Voir mon diagnostic 🎯</>
              )}
            </Button>
          </div>

          {/* Aide contextuelle */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 leading-relaxed">
              💡 <strong>Astuce :</strong> Soyez honnête dans vos réponses pour obtenir un diagnostic précis et des recommandations personnalisées adaptées à votre situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
