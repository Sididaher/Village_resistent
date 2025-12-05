"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "Linux" | "Écologie" | "Sécurité" | "Économie";
  points: number;
}

interface QuizGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quel est le principal avantage de Linux face à Windows pour lutter contre l'obsolescence programmée ?",
    options: [
      "Il consomme moins d'électricité",
      "Il peut fonctionner sur du matériel ancien",
      "Il est plus rapide",
      "Il a une meilleure interface"
    ],
    correctAnswer: 1,
    explanation: "Linux permet de donner une seconde vie aux anciens ordinateurs en étant moins exigeant en ressources que Windows 11.",
    category: "Linux",
    points: 100
  },
  {
    id: 2,
    question: "Que signifie l'acronyme NIRD ?",
    options: [
      "Numérique Innovant, Responsable et Durable",
      "Numérique Inclusif, Responsable et Durable", 
      "Nouveau Internet Responsable et Durable",
      "Numérique Intégré, Raisonné et Durable"
    ],
    correctAnswer: 1,
    explanation: "NIRD signifie Numérique Inclusif, Responsable et Durable - les trois piliers de la démarche.",
    category: "Écologie",
    points: 50
  },
  {
    id: 3,
    question: "Quel établissement scolaire a inspiré la démarche NIRD ?",
    options: [
      "Le lycée Voltaire de Paris",
      "Le lycée Carnot de Bruay-la-Buissière",
      "Le collège Marie Curie de Lyon",
      "L'école primaire de Fouquières"
    ],
    correctAnswer: 1,
    explanation: "Le lycée Carnot de Bruay-la-Buissière est à l'origine du projet NIRD que la démarche souhaite voir essaimer.",
    category: "Économie",
    points: 75
  },
  {
    id: 4,
    question: "Quelle est la principale préoccupation concernant les Big Tech dans l'éducation ?",
    options: [
      "Leurs logiciels sont trop complexes",
      "Ils créent une dépendance technologique et stockent les données hors UE",
      "Ils ne supportent pas assez d'appareils",
      "Ils sont moins performants"
    ],
    correctAnswer: 1,
    explanation: "Les Big Tech créent une dépendance structurelle avec des licences coûteuses et un stockage des données hors UE.",
    category: "Sécurité",
    points: 125
  },
  {
    id: 5,
    question: "Comment les élèves du lycée Carnot participent-ils à la démarche NIRD ?",
    options: [
      "En développant des applications",
      "En reconditionnant des PC avec Linux",
      "En donnant des cours d'informatique",
      "En organisant des conférences"
    ],
    correctAnswer: 1,
    explanation: "Les élèves du club informatique reconditionnent des PC avec des distributions Linux comme PrimTux pour les écoles.",
    category: "Linux",
    points: 100
  }
];

export default function QuizGame({ onComplete, onClose }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    const currentQ = questions[currentQuestion];
    const newAnswers = [...answers, selectedAnswer ?? -1];
    setAnswers(newAnswers);

    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(score + currentQ.points);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setShowResult(false);
    } else {
      // Quiz terminé
      const finalScore = selectedAnswer === currentQ.correctAnswer ? score + currentQ.points : score;
      setIsActive(false);
      onComplete(finalScore);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
    setIsActive(false);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Linux": return "bg-blue-500";
      case "Écologie": return "bg-green-500";
      case "Sécurité": return "bg-red-500";
      case "Économie": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <h2 className="text-2xl font-bold">Quiz NIRD</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Barre de progression */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm opacity-90">Question {currentQuestion + 1}/{questions.length}</span>
                <span className="text-sm opacity-90">Score: {score} pts</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Minuteur */}
            <div className="flex items-center justify-center">
              <div className={`w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center ${
                timeLeft <= 10 ? 'animate-pulse border-red-300' : ''
              }`}>
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-200' : ''}`}>
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu de la question */}
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getCategoryColor(currentQ.category)}`}>
                {currentQ.category}
              </span>
              <span className="text-orange-600 font-bold">🏆 {currentQ.points} pts</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options de réponse */}
          <div className="grid gap-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-purple-500 bg-purple-50'
                    : showResult && index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                } ${showResult ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                disabled={showResult}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && (
                    <span className="ml-2">
                      {index === currentQ.correctAnswer ? '✅' : selectedAnswer === index ? '❌' : ''}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explication (visible après avoir répondu) */}
          {showResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <h4 className="font-bold text-blue-900 mb-2">💡 Explication :</h4>
              <p className="text-blue-800">{currentQ.explanation}</p>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-4">
            {!showResult && selectedAnswer !== null && (
              <Button
                onClick={handleShowResult}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                Valider ma réponse
              </Button>
            )}
            
            {showResult && (
              <Button
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 text-white"
              >
                {currentQuestion < questions.length - 1 ? (
                  <>Question suivante 🚀</>
                ) : (
                  <>Voir les résultats 🎯</>
                )}
              </Button>
            )}
            
            {!showResult && selectedAnswer === null && timeLeft > 0 && (
              <div className="flex-1 text-center text-gray-500 py-3">
                Sélectionnez une réponse...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
